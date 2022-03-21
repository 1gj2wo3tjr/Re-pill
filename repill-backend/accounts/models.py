from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    uid = models.CharField(max_length = 20, null = True)  # 카카오톡 유저 ID
    name = models.CharField(max_length = 50, null = True)  # 카카오톡 등록 이름
    email = models.CharField(max_length = 30, null = True)  # 카카오톡 이메일, validation check 필요
    profile_img = models.TextField(null = True)  # 카카오톡 프로필 이미지 URL
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)  # 계정 삭제 여부
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f'uid'
