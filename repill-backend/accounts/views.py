from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from django.views import View
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, DeliveryAddress, Order
from products.models import Review
from .serializers import DeliveryAddressSerializer, OrderSerializer

import os
import requests


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
    def get(self, request):
        addresses = DeliveryAddress.objects.filter(user=request.user)
        serializer = DeliveryAddressSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 배송지 저장
    def post(self, request):
        serializer = DeliveryAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddressDetail(APIView):
    # 특정 배송지 조회
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
    def put(self, request, address_pk):
        address = DeliveryAddress.objects.get(pk=address_pk)
        serializer = DeliveryAddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 배송지 삭제
    def delete(self, request, address_pk):
        address = DeliveryAddress.objects.get(pk=address_pk)
        if address.user == request.user:
            address.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)
    

# 주문 관련 API
class OrderList(APIView):
    # 특정 사용자의 주문 전체 조회
    def get(self, request):
        if request.user.is_authenticated:    
            orders = Order.objects.filter(user=request.user)
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 주문 접수
    def post(self, request):
        if request.user.is_authenticated:
            serializer = OrderSerializer(data=request.data)
            if serializer.is_valid():
                if Review.objects.filter(user=request.user, product=request.data.get("product")).exists():
                    serializer.save(user=request.user, order_status=1, has_review=True)
                else:
                    serializer.save(user=request.user, order_status=1, has_review=False)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class OrderDetail(APIView):
    # 특정 주문 조회
    def get(self, request, order_pk):
        if request.user.is_authenticated:
            try:
                orders = Order.objects.filter(order_number=order_pk)
                serializer = OrderSerializer(orders, many=True)
                if serializer.data[0].get("user") == request.user:
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    '''
    주문 수정 (배송지 변경, 주문 상태 변경 등)
    주문 취소도 PUT 요청으로 (order_status를 0으로 변경)
    '''
    def put(self, request, order_pk):
        if request.user.is_authenticated:
            try:
                order = get_object_or_404(Order, pk=order_pk, product=request.data.get("product"))
                serializer = OrderSerializer(order, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    # 주문 기록 삭제 (관리자)
    def delete(self, request, order_pk):
        if request.user.is_staff:
            order = get_list_or_404(Order, pk=order_pk)
            order.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)
