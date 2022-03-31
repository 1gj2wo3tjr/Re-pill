from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('login/', views.KakaoLogin.as_view()),
    path('address/', views.AddressList.as_view()),
    path('address/<int:address_pk>/', views.AddressDetail.as_view()),
]
