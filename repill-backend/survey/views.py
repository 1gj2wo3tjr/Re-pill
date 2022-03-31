from urllib import request
from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from backend.permissions import IsOwnerOnly
from .models import SurveyHistory
from .serializers import ResponsesSerializer, SurveyHistoryListSerializer, SurveyHistorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class SurveyList(APIView):
    permission_classes = [IsOwnerOnly]
    serializer_class = SurveyHistoryListSerializer
    pagination_class = PageNumberPagination

    # 자신이 응답한 설문 기록만 볼 수 있습니다.
    def get_queryset(self):
        user = self.request.user
        return get_list_or_404(SurveyHistory, respondent=user.id)

    def get(self, request):
        surveys = self.get_queryset()
        paginator = self.pagination_class()
        paginator.page_size = 10
        page = paginator.paginate_queryset(surveys, request)
        serializer = self.serializer_class(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = SurveyHistorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(respondent=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class Survey(APIView):
    permission_classes = [IsOwnerOnly]
    serializer_class = SurveyHistorySerializer
    
    def get(self, request, uuid):
        print(uuid)
        survey = SurveyHistory.objects.get(id=uuid)
        serializer = SurveyHistorySerializer(survey)
        return Response(serializer.data)
    
    