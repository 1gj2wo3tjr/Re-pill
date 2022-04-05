from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.views import View
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, DeliveryAddress, Order, Subscription
from products.models import Review
from .serializers import DeliveryAddressSerializer, OrderSerializer, SubscriptionSerializer

from datetime import date, timedelta
import os
import requests
import uuid


# SimpleJWT 토큰 생성
def get_tokens(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


# Create your views here.
class KakaoLogin(View):
    def get(self, request):
        # frontend에서 받은 인가 코드와 함께 카카오 API로 요청을 보내 access token 받기
        auth_code = request.GET.get("code")
        kakao_token_api = "https://kauth.kakao.com/oauth/token"
        data = {
            "grant_type": "authorization_code",
            "client_id": os.environ.get("REACT_APP_REST_API_KEY"), 
            "redirection_uri": os.environ.get("REACT_APP_REDIRECT_URI"),
            "code": auth_code,
        }

        # 받은 access token을 활용해 카카오 API로부터 사용자 정보를 가져오기
        token_response = requests.post(kakao_token_api, data = data).json()

        kakao_access_token = token_response.get("access_token")
        headers = ({"Authorization": f"Bearer {kakao_access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"  # 회원 정보 확인을 위한 카카오 API 주소
        social_user = requests.request("POST", url, headers=headers).json()

        if User.objects.filter(username = social_user.get("id")).exists():  # DB에 회원정보 있으면 로그인
            user_info = User.objects.get(username = social_user["id"])
            jwt_token = get_tokens(user_info)['access']  # JWT 발행

        else:  # DB에 회원정보 없으면 회원가입
            user_info = User(username = social_user["id"],
                name = social_user["properties"]["nickname"],
                email = social_user["properties"].get("email", "no email"),
                profile_img = social_user["properties"].get("profile_image", None)
            )
            user_info.save()
            jwt_token = get_tokens(user_info)['access']

        # access_token과 함께 필요한 회원 정보 반환
        return JsonResponse({"access_token": jwt_token,
            "username": user_info.username,
            "name": user_info.name,
            "email": user_info.email,
            "profile_img": user_info.profile_img,
            "is_admin": user_info.is_admin,
            "is_staff": user_info.is_staff
        }, status=200)


# 배송지 관련 API
class AddressList(APIView):
    # 특정 사용자의 배송지 전체 조회
    @swagger_auto_schema(operation_description="특정 사용자의 모든 배송지를 조회합니다.")
    def get(self, request):
        addresses = DeliveryAddress.objects.filter(user=request.user)
        serializer = DeliveryAddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 배송지 저장
    @swagger_auto_schema(operation_description="신규 배송지를 저장합니다.",
        request_body=DeliveryAddressSerializer,
        responses={201: DeliveryAddressSerializer, 400: "올바르지 않은 데이터값"})
    def post(self, request):
        serializer = DeliveryAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressDetail(APIView):
    # 특정 배송지 조회
    @swagger_auto_schema(operation_description="특정 배송지를 조회합니다.",
        responses={200: DeliveryAddressSerializer, 403: "조회 권한이 없음 (사용자 불일치)", 404: "해당 배송지를 찾을 수 없음"})
    def get(self, request, address_pk):
        try:
            address = get_object_or_404(DeliveryAddress, pk=address_pk)
            serializer = DeliveryAddressSerializer(address)
            if address.user == request.user:
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # 배송지 정보 수정
    @swagger_auto_schema(operation_description="특정 배송지를 수정합니다.",
        request_body=DeliveryAddressSerializer,
        responses={200: DeliveryAddressSerializer, 400: "올바르지 않은 데이터값", 404: "해당 배송지를 찾을 수 없음"})
    def put(self, request, address_pk):
        try:
            address = get_object_or_404(DeliveryAddress, pk=address_pk)
            serializer = DeliveryAddressSerializer(address, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # 배송지 삭제
    @swagger_auto_schema(operation_description="특정 배송지를 삭제합니다.",
        responses={204: "배송지가 성공적으로 삭제됨", 403: "배송지 삭제 권한이 없음", 404: "해당 배송지를 찾을 수 없음"})
    def delete(self, request, address_pk):
        try: 
            address = get_object_or_404(DeliveryAddress, pk=address_pk)
            if address.user == request.user or request.user.is_staff:
                address.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(status=status.HTTP_403_FORBIDDEN)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    

# 주문 관련 API
class OrderList(APIView):
    # 특정 사용자의 주문 전체 조회
    @swagger_auto_schema(operation_description="특정 사용자의 모든 주문 내역을 조회합니다.",
        responses={200: OrderSerializer(many=True), 401: "인증된 유저가 아님 (로그인 필요)"})
    def get(self, request):
        if request.user.is_authenticated:    
            orders = Order.objects.filter(user=request.user)
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 주문 접수
    @swagger_auto_schema(operation_description="주문을 생성합니다.", request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT, 
        properties={
            'products':openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Items(type="dict", format="number: 상품번호, quantity: 상품개수"), description="제품 번호 및 수량"),
            'address': openapi.Schema(type=openapi.TYPE_STRING, description='주소'),
            'order_status': openapi.Schema(type=openapi.TYPE_STRING, description='주문 상태'),
            'order_receive': openapi.Schema(type=openapi.TYPE_STRING, description='수령인')
            },
        ),
        responses={201: OrderSerializer(many=True), 400: "올바르지 않은 데이터값", 401: "인증된 유저가 아님 (로그인 필요)"}
    )
    def post(self, request):
        order_data = []

        if request.user.is_authenticated:
            order_number = int(str(uuid.uuid4().time_low) + str(uuid.uuid4().time_mid))

            # 한 주문에 여러 제품을 주문할 수 있으므로 각 제품에 대해 serializer를 만들고 DB에 저장
            for product in request.data.get("products"):
                updated_data = {**request.data, "product": product["number"], "quantity": product["quantity"]}
                serializer = OrderSerializer(data=updated_data)
                if serializer.is_valid():
                    if Review.objects.filter(user=request.user).filter(product=request.data.get("product")).exists():
                        serializer.save(user=request.user, order_number=order_number, order_status=1, has_review=True)
                    else:
                        serializer.save(user=request.user, order_number=order_number, order_status=1, has_review=False)
                    order_data.append(serializer.data)  # 각 제품에 대한 정보를 order_data에 추가 (최종적으로 order_data를 한 번에 반환)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(order_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class OrderDetail(APIView):
    # 특정 주문 조회
    @swagger_auto_schema(operation_description="특정 주문을 조회합니다.",
        responses={200: OrderSerializer, 401: "인증된 유저가 아님 (로그인 필요)", 404: "해당 주문을 찾을 수 없음"})
    def get(self, request, order_pk):
        if request.user.is_authenticated:
            try:
                orders = Order.objects.filter(user=request.user).filter(order_number=order_pk)
                serializer = OrderSerializer(orders, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    '''
    주문 수정 (배송지 변경, 주문 상태 변경 등)
    주문 취소도 PUT 요청으로 (order_status를 0으로 변경)
    '''
    @swagger_auto_schema(operation_description="주문을 수정합니다.",
        request_body=OrderSerializer,
        responses={200: OrderSerializer, 401: "인증된 유저가 아님 (로그인 필요)", 404: "해당 배송지를 찾을 수 없음"})
    def put(self, request, order_pk):
        if request.user.is_authenticated:
            try:
                order_part = Order.objects.filter(order_number=order_pk).filter(product=request.data.get("product")).first()
                if not request.user.is_staff and not request.user == order_part.user:
                    return Response(status=status.HTTP_403_FORBIDDEN)    
                else:    
                    serializer = OrderSerializer(order_part, data=request.data)
                    if serializer.is_valid():
                        if Review.objects.filter(user=request.user).filter(product=request.data.get("product")).exists():
                            serializer.save(has_review=True)
                        else:
                            serializer.save(has_review=False)
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 주문 기록 삭제 (관리자)
    @swagger_auto_schema(operation_description="주문 기록을 삭제합니다 (관리자 전용 기능)",
        responses={204: "주문 기록 성공적으로 삭제", 403: "관리자 권한이 없음"})
    def delete(self, request, order_pk):
        if request.user.is_staff:
            orders = get_list_or_404(Order, pk=order_pk)
            for order in orders:
                order.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)


# 구독 관련 API
class SubscriptionList(APIView):
    # 특정 사용자의 구독 전체 조회
    @swagger_auto_schema(operation_description="특정 사용자의 모든 구독을 조회합니다.",
        responses={200: SubscriptionSerializer(many=True), 401: "인증된 유저가 아님 (로그인 필요)"})
    def get(self, request):
        if request.user.is_authenticated:
            subscriptions = Subscription.objects.filter(user=request.user)
            serializer = SubscriptionSerializer(subscriptions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 구독 신청
    @swagger_auto_schema(operation_description="특정 상품의 구독을 신청합니다.",
        request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT, 
            properties={
            'product': openapi.Schema(type=openapi.TYPE_INTEGER, description='상품 번호'),
            'period': openapi.Schema(type=openapi.TYPE_INTEGER, description='구독 간격 (일수)'),
            'subscribe_times': openapi.Schema(type=openapi.TYPE_INTEGER, description='수령인')
            },
        ),
        responses={201: SubscriptionSerializer, 400: "올바른 데이터값이 아님", 401: "인증된 유저가 아님 (로그인 필요)"})
    def post(self, request):
        if request.user.is_authenticated:
            serializer = SubscriptionSerializer(data=request.data)
            if serializer.is_valid():

                subscribe_dates = dict()

                prev_date = date.today()
                subscribe_dates["0"] = str(prev_date)

                for idx in range(1, int(request.data.get("subscribe_times"))):
                    next_date = prev_date + timedelta(days=request.data.get("period"))
                    subscribe_dates[str(idx)] = str(next_date)
                    prev_date = next_date

                serializer.save(user=request.user, subscribe_dates=subscribe_dates)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SubscriptionDetail(APIView):
    # 특정 상품 구독 조회
    @swagger_auto_schema(operation_description="특정 사용자의 특정 상품 구독을 조회합니다.",
        responses={200: SubscriptionSerializer, 401: "인증된 유저가 아님 (로그인 필요)", 404: "해당 상품의 구독 정보가 없음"})
    def get(self, request, product_pk):
        if request.user.is_authenticated:
            try:
                subscription = get_object_or_404(Subscription, user=request.user, product=product_pk)
                serializer = SubscriptionSerializer(subscription)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 상품 구독 수정
    @swagger_auto_schema(operation_description="특정 사용자의 특정 상품 구독을 조회합니다.",
        request_body = SubscriptionSerializer,
        responses={200: SubscriptionSerializer, 400: "올바르지 않은 데이터값", 401: "인증된 유저가 아님 (로그인 필요)", 404: "해당 상품의 구독 정보가 없음"})
    def put(self, request, product_pk):
        if request.user.is_authenticated:
            try:
                subscription = get_object_or_404(Subscription, user=request.user, product=product_pk)
                serializer = SubscriptionSerializer(subscription, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 상품 구독 취소
    @swagger_auto_schema(operation_description="특정 사용자의 구독을 취소합니다.",
    responses={204: "구독 취소 성공", 401: "인증된 유저가 아님 (로그인 필요)", 404: "해당 상품의 구독 정보가 없음"})
    def delete(self, request, product_pk):
        if request.user.is_authenticated:
            try:
                subscription = get_object_or_404(Subscription, user=request.user, product=product_pk)
                subscription.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
