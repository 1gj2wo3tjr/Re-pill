from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
    uid = models.CharField(max_length=20, null=True)  # 카카오톡 유저 ID
    name = models.CharField(max_length=50, null=True)  # 카카오톡 등록 이름
    email = models.EmailField()  # 카카오톡 이메일, validation check 필요
    profile_img = models.TextField(null=True)  # 카카오톡 프로필 이미지 URL
    # 회원가입 일시는 AbstractUser의 date_joined 필드에 저장
    updated_time = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  # 계정 삭제 여부
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.uid}'


# 주문 모델
class Order(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True, default=timezone.now)
    address = models.CharField(max_length=80)
    # 0: 주문 취소, 1: 결제 완료, 2: 배송준비중, 3: 배송중, 4: 배송 완료
    order_status = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)])
    order_receive = models.CharField()

    def __str__(self):
        return f'{id}번 주문'