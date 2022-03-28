from django.http import JsonResponse
from django.shortcuts import render
from django.views import View

from accounts.models import User

import os
import jwt
import requests


# Create your views here.
class KakaoLogin(View):
    def get(self, request):
        auth_code = request.GET.get("code")
        kakao_token_api = "https://kauth.kakao.com/oauth/token"
        data = {
            "grant_type": "authorization_code",
            "client_id": os.environ.get("REACT_APP_REST_API_KEY"), 
            "redirection_uri": os.environ.get("REACT_APP_REDIRECT_URI"),
            "code": auth_code,
        }

        token_response = requests.post(kakao_token_api, data = data).json()

        kakao_access_token = token_response.get("access_token")
        headers = ({"Authorization": f"Bearer {kakao_access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"  # 회원 정보 확인을 위한 카카오 API 주소
        social_user = requests.request("POST", url, headers=headers).json()

        if User.objects.filter(uid = social_user.get("id")).exists():  # DB에 회원정보 있으면 로그인
            user_info = User.objects.get(uid = social_user["id"])
            jwt_token = jwt.encode({"uid": social_user["id"]}, "secret_key")  # JWT 발행

        else:  # DB에 회원정보 없으면 회원가입
            user_info = User(uid = social_user["id"],
                name = social_user["properties"]["nickname"],
                email = social_user["properties"].get("email", "no email"),
                profile_img = social_user["properties"].get("profile_image", None)
            )
            user_info.save()
            jwt_token = jwt.encode({"uid": user_info.id}, "secret_key")

        # access_token과 함께 필요한 회원 정보 반환
        return JsonResponse({"access_token": jwt_token.decode("UTF-8"),
            "uid": user_info.uid,
            "name": user_info.name,
            "email": user_info.email,
            "profile_img": user_info.profile_img
        }, status=200)
