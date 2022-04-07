from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('login/', views.KakaoLogin.as_view()),
    path('address/', views.AddressList.as_view()),
    path('address/<int:address_pk>/', views.AddressDetail.as_view()),
    path('order/', views.OrderList.as_view()),
    path('order/<int:order_pk>/', views.OrderDetail.as_view()),
    path('subscription/', views.SubscriptionList.as_view()),
    path('subscription/<int:product_pk>/', views.SubscriptionDetail.as_view()),
    path('payment/ready/', views.kakaoPay),
]
