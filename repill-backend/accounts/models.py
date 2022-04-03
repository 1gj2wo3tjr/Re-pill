from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from products.models import Product

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


class DeliveryAddress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address_name = models.CharField(max_length=30, default="기본 배송지")
    address = models.CharField(max_length=50, null=True)
    # 0으로 시작하는 2~3자리 + 3~4자리 + 3~4자리, 하이픈은 추가/무시 상관 없음
    phone_number = models.CharField(max_length=13,
        validators=[RegexValidator(regex='^(0)\d{1,2}-?\d{3,4}-?\d{4}')],
        default="000-0000-0000"
    )
    detailed_address = models.TextField(null=True)
    zipcode = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.user}님 ({self.phone_number})의 배송지 {self.address_name}: {self.address} {self.detailed_address}'


# 주문 모델
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_number = models.PositiveIntegerField(default=0)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField(default=1)
    order_date = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=80)
    # 0: 주문 취소, 1: 결제 완료, 2: 배송준비중, 3: 배송중, 4: 배송 완료
    order_status = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)])
    order_receive = models.CharField(max_length=20)

    def __str__(self):
        return f'{id}번 주문'
