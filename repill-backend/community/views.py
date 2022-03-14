# from django.shortcuts import render

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_list_or_404

from .models import Notice
from .serializers import NoticeListSerializer
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_notice_list(request):
    notices = get_list_or_404(Notice.objects.order_by('-pk'))
    
    serializer = NoticeListSerializer(data=notices, many=True)

    if serializer.is_valid():
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    return Response(status=status.HTTP_400_BAD_REQUEST)