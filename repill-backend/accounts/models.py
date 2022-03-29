from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

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
    detailed_address = models.TextField(null=True)
    zipcode = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.user}님의 배송지 {self.address_name}: {self.address} {self.detailed_address}'
