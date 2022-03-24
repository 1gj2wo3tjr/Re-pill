from django.shortcuts import render, get_list_or_404, get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView

from .models import Product
from .serializers import ProductListSerializer, ProductSerializer


from rest_framework.filters import SearchFilter

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