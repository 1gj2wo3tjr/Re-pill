from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from products.models import Product, Ingrediant
import uuid

# Create your models here.
class SurveyHistory(models.Model):
    """
    사용자와 답변 기록들을 이어주는 설문 기록 모델입니다.
    id = 일반적인 id와 다르게 임의의 UUID를 부여받습니다. (개인 설문기록 유출 방지 차원)
    respondent = 응답자 (User)
    created_at = 응답일시
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    respondent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)



class SurveyQuestion(models.Model):
    """
    설문 문항 모델입니다.
    number: id와는 별개인 문항 번호
    content: 문항
    is_descriptive: 이 문항이 서술형인지 여부
    """
    number = models.PositiveSmallIntegerField()
    content = models.CharField(max_length=200)
    is_descriptive = models.BooleanField()

    def __str__(self):
        return f'Q{self.number}: {self.content}'

class SurveyResponse(models.Model):
    """
    설문 기록의 문항 답변 기록 모델입니다.
    survey = 해당 응답이 속한 설문
    question = 답변한 문항
    answer_choice = 사용자가 응답한 선택지 번호
    answer_text = 사용자가 응답한 서술형 답변
    """
    survey = models.ForeignKey(SurveyHistory, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE)
    answer_choice = models.PositiveSmallIntegerField(blank=True, null=True)
    answer_text = models.CharField(max_length=50, blank=True, null=True)

    # 객관식이나 주관식 둘 중 하나는 반드시 응답하도록 하는 Validation Check를 추가합니다.
    def clean(self):
        super().clean()
        if self.answer_choice is None and self.answer_text is None:
            raise ValidationError('Survey question cannot be left unanswered')

    def __str__(self):
        return f'{self.question}: {self.answer_choice} / {self.answer_text}'

class SurveyQuestionChoices(models.Model):
    """
    설문조사 선택지 모델입니다.
    number: id와는 별개인, 답안 번호
    question: 이 선택지가 해당된 문제
    content: 선택지 설명
    related_ingrediant: 해당 설문과 유관한 성분
    """
    number = models.PositiveSmallIntegerField()
    question = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE, related_name='choices')
    content = models.CharField(max_length=200)
    # related_ingrediant = models.ForeignKey(Ingrediant, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f'A{self.number}: {self.content}'


class Recommend(models.Model):
    """
    제품 추천 협업 필터링을 위한 모델입니다.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.FloatField()

class ChoicesIngrediant(models.Model):
    """
    응답 - 영양소 중개 테이블입니다.
    """
    choice = models.ForeignKey(SurveyQuestionChoices, on_delete=models.CASCADE, related_name='related_ingrediants')
    ingrediant = models.ForeignKey(Ingrediant, on_delete=models.CASCADE, related_name='related_choices')