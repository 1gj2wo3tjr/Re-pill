from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from backend.permissions import IsOwnerOnly
from .models import ChoicesIngrediant, Recommend, SurveyHistory, SurveyQuestion, SurveyQuestionChoices, SurveyResponse
from .serializers import RecommendSerializer, ResponsesSerializer, SurveyHistoryListSerializer, SurveyHistorySerializer, SurveyQuestionListSerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .train import load, knn
from products.models import Review, Product
from django.contrib.auth import get_user_model

import pickle
from pandas import read_pickle
from scipy.sparse import csr_matrix
import numpy as np
from .loadresult import post_recomm

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
        survey = SurveyHistorySerializer(data={"respondent": request.user.pk})
        if survey.is_valid(raise_exception=True):
            history = survey.save()
        respondent = request.data.get('results')
        response = ResponsesSerializer()

        for key, value in respondent.items():
            print(key, value)
            if isinstance(value, list):
                for v in value:
                    data = {"question": int(key), "answer_choice": int(v), "answer_text": None, "survey": history.id}
                    print(data)
                    response = ResponsesSerializer(data=data)
                    if response.is_valid(raise_exception=True):
                        response.save()
            else:
                data = {"question": int(key), "answer_choice": None, "answer_text": str(value), "survey": history.id}
                print(data)
                response = ResponsesSerializer(data=data)
                if response.is_valid(raise_exception=True):
                    response.save()

        # serializer = SurveyHistorySerializer(data=request.data)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save(respondent=request.user)
        return Response(survey.data, status=status.HTTP_201_CREATED)

class Survey(APIView):
    permission_classes = [IsOwnerOnly]
    serializer_class = SurveyHistorySerializer
    
    def get(self, request, uuid):
        print(uuid)
        survey = SurveyHistory.objects.get(id=uuid)
        serializer = SurveyHistorySerializer(survey)
        return Response(serializer.data)
    

class Questions(APIView):
    permission_classes = [AllowAny]
    serializer_class = SurveyQuestionListSerializer

    def get(self, request):
        questions = SurveyQuestion.objects.all()
        serializer = SurveyQuestionListSerializer(questions, many=True)
        return Response(serializer.data)


    
class RecommAlgorithm(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    def get(self, request):
        """추천 데이터 받아오기"""
        user = request.user
        recomms = get_list_or_404(Recommend.objects.order_by('-rating'), user=user)
        serializer = RecommendSerializer(recomms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        """
        추천 데이터 생성하기
        1. 요청 받기
        2. 현재 리뷰 정보를 추천 알고리즘에 전달
        3. 알고리즘의 협업 필터링 결과를 Recommend로 전달
        4. 저장
        5. 응답 출력
        """

        if not request.user.is_authenticated:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)


        # 1
        reviews = Review.objects.values_list('user', 'product', 'rating')
        num_users = get_user_model().objects.last().pk
        num_products = Product.objects.last().pk

        A_reviews = np.zeros((num_users+1, num_products+1))
        for (r, c, score) in reviews:
            A_reviews[r][c] = score
        R_reviews = csr_matrix(A_reviews)

        # 2
        self.run_KNN(request, R_reviews)
        
        return self.get(request)
        

    def run_KNN(self, request, R_train):
        k = 5
        R_predicted = knn.predict(R_train, k)
        # 3
        self.recommend(R_train, R_predicted, '')
        post_recomm()


    def recommend(self, R_train, R_predicted, output_path):
    # write train ratings
        train_path = output_path + 'train_ratings.txt'
        with open(train_path, 'w', encoding='latin-1') as f:
            r, c = R_train.nonzero()
            for row, col in zip(r, c):
                f.write('%d::%s::%.1f\n' % (row, col, R_train[row, col]))

                # R_predicted에서 R_train에 의해 이미 train의 대상이 된 데이터는 0으로 기록
                R_predicted[row, col] = 0

        # write recommend ratings
        recomm_path = output_path + 'recommend_ratings.txt'
        with open(recomm_path, 'w', encoding='latin-1') as f:
            # .shape: 행렬 차원 (shape[0]:행, shape[1]:열)
            # 참고: .reshape(): 차원 변경
            for i in range(R_predicted.shape[0]):
                for j in range(R_predicted.shape[1]):
                    if R_predicted[i, j] >= 1:
                        f.write('%d::%s::%.3f\n' % (i, j, R_predicted[i, j]))


# 가장 최근에 진행한 설문조사를 바탕으로 추천 상품을 받아옵니다.
class SurveyRecommend(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        survey = SurveyHistory.objects.filter(respondent=request.user).last()  # 가장 최근 진행한 설문조사를 가져옵니다.
        responses = get_list_or_404(SurveyResponse, survey=survey)
        responses_serializer = ResponsesSerializer(responses, many=True)  # 해당 설문조사의 답변을 가져옵니다.
        required_ingrediants = dict()

        for response in responses_serializer.data:
            try:
                choice = get_object_or_404(SurveyQuestionChoices, 
                question_id=response.get("question"), number=response.get("answer_choice"))

                choices_ingrediant_objs = get_list_or_404(ChoicesIngrediant, choice=choice.pk)
                for obj in choices_ingrediant_objs:
                    # 각 답변 (증상)과 연관된 영양 성분의 ID값을 찾아 required_ingrediants에 기록합니다.
                    ingrediant_pk = str(obj.ingrediant.pk)
                    if ingrediant_pk not in required_ingrediants:
                        required_ingrediants[ingrediant_pk] = 1  # 해당 성분을 처음 기록할 때는 가중치를 1로 두며
                    else:
                        required_ingrediants[ingrediant_pk] += 1  # 이후 다시 기록될 경우 가중치를 1씩 높여줍니다.
                        # 가중치는 서비스 고도화 단계에서 수정이 가능할 것 같습니다.
            except:
                continue
        
        # 가장 가중치가 높은 영양 성분을 최대 5개까지 가져옵니다.
        max_ingrediants = min(len(required_ingrediants), 5)
        best_ingrediants = sorted(required_ingrediants, key=required_ingrediants.get, reverse=True)[:max_ingrediants]
        recomm_products = []

        # 해당 영양 성분이 포함된 상품 중 최신 20개를 가져옵니다.
        for best_ingrediant in best_ingrediants:
            recomm_products.extend(Product.objects.filter(ingrediants=best_ingrediant).order_by("-pk")[:20])
            
        serializer = ProductSerializer(recomm_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
