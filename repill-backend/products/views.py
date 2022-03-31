from django.shortcuts import render, get_list_or_404, get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView

from .models import Product, Cart, Review
from .serializers import ProductListSerializer, ProductSerializer, ReviewListSerializer, ReviewSerializer, CartSerializer
from backend.permissions import IsOwnerOrReadOnly, IsOwnerOnly

from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

class ProductList(ListCreateAPIView):
    """
    건강기능식품 제품 관련 view 함수들입니다.
    """
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer

    filter_backends = [SearchFilter]
    search_fields = ['name']


    # def get(self, request):
    #     queryset = self.get_queryset()
    #     serializer = ProductListSerializer(queryset, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        product = request.data
        serializer = ProductSerializer(product)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class ProductDetail(APIView):
    "개별 건강기능식품 관련 view 함수들입니다."

    permission_classes = [AllowAny]

    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ReviewList(ListCreateAPIView):
    """
    제품 리뷰 API입니다.
    """
    permission_classes = [AllowAny]
    queryset = Review.objects.all()
    serializer_class = ReviewListSerializer
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product']

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        review = request.data
        serializer = ReviewSerializer(review)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class ReviewDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class CartList(ListCreateAPIView):
    """
    장바구니 목록 조회 / 생성 APIView입니다.
    요청을 보낸 사용자의 장바구니만 확인할 수 있습니다.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer
    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

    def post(self, request):
        cart = Cart.objects.get(user=request.user, product=request.data.get('product'))
        if cart:
            serializer = CartSerializer(instance=cart, data=request.data)
        else:
            serializer = CartSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            if cart:
                # 장바구니에 이미 존재하는 상품이라면 상품 개수를 새 요청의 개수만큼 증가시킵니다.
                new_quantity = cart.quantity + int(request.data.get('quantity'))
                serializer.save(user=request.user, quantity=new_quantity)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

class CartDetail(RetrieveUpdateDestroyAPIView):
    """
    장바구니 내역을 개별조회 / 수정 / 삭제할 수 있는 APIView입니다.
    해당 장바구니 내역의 사용자나 관리자만 개별조회 / 수정 / 삭제할 수 있습니다.
    """

    # 장바구니 내역 수정 시 개별조회 기능은 사용하지 않게 될 가능성이 높아 추후에 삭제하여도 무방할 것 같습니다.
    # 주의: 자기 소유가 아닌 장바구니 내역을 조회하면 403이 아닌 404 에러를 반환합니다. 추후에 수정할 예정입니다.
    permission_classes = [IsOwnerOnly]
    serializer_class = CartSerializer
    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user.pk)
