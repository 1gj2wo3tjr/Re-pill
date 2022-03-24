# from django.shortcuts import render
from tkinter.messagebox import NO
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from django.http import JsonResponse
from .models import Notice
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import NoticeListSerializer, NoticeSerializer

from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination
# from rest_framework.viewsets import ModelViewSet

# class NoticeViewSet(ModelViewSet):
#     queryset = Notice.objects.all()
#     serializer_class = NoticeSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]

#     def list(self, request, pk=None):
#         notices = self.get_queryset()
#         serializer = NoticeListSerializer(notices, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method='POST',
    # request_body=NoticeSerializer,
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(
                title='title',
                type=openapi.TYPE_STRING,
            ),
            'content': openapi.Schema(
                title='content',
                type=openapi.TYPE_STRING
            ),
        }
    )
)
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def notice_list(request):

    def get_notice_list(request):  

        paginator = PageNumberPagination()
        paginator.page_size = 10
        

        # 공지를 PK 역순으로 표시
        notices = Notice.objects.order_by('-pk')

        
        query = request.GET.get('search', None)
        if query:
            notices = get_list_or_404(notices.filter(title__contains=query))
        else:
            notices = get_list_or_404(notices)
        
        page = paginator.paginate_queryset(notices, request)
        serializer = NoticeListSerializer(page, many=True)


        return paginator.get_paginated_response(serializer.data)

    def post_notice(request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        author = request.user
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # 참고: raise_exception이 True이므로 if 미실행 시 부분을 작성하지 않아도 됩니다.
        

    # 위에서 정의한 method별 함수를 여기에서 실행합니다.
    if request.method == 'POST':
        return post_notice(request)
    elif request.method == 'GET':
        return get_notice_list(request)
        
    # 이 부분은 사실 없어도 됩니다. (Decorator가 처리 - 추후 삭제)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def notice_detail(request, pk):
    notice = get_object_or_404(Notice, pk=pk)
    
    def get_notice_detail():

        next = Notice.objects.filter(pk__gt=notice.pk).order_by('pk').first()
        prev = Notice.objects.filter(pk__lt=notice.pk).order_by('-pk').first()

        cursor = {
            'next': NoticeSerializer(next).data if next else None,
            'previous': NoticeSerializer(prev).data if prev else None,
            }

        serializer = NoticeSerializer(notice)
        data = serializer.data
        data['cursor'] = cursor
        return Response(data, status=status.HTTP_200_OK)

    @permission_classes([IsAuthenticated])
    def update_notice():
        if request.user == notice.author:
            serializer = NoticeSerializer(instance=notice, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    @permission_classes([IsAuthenticated])
    def delete_notice():
        if request.user == notice.author:
            notice.delete()
            return Response({'id': pk}, status=status.HTTP_204_NO_CONTENT)
            
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


    if request.method == 'GET':
        return get_notice_detail()
    elif request.method == 'PUT':
        return update_notice()
    elif request.method == 'DELETE':
        return delete_notice()
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    