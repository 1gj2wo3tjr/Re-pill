"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from . import views

urlpatterns = [
    path('items/', views.ProductList.as_view()),
    path('items/<int:pk>/', views.ProductDetail.as_view()),

    path('reviews/', views.ReviewList.as_view()),
    path('reviews/<int:pk>', views.ReviewDetail.as_view()),
    
    path('cart/', views.CartList.as_view()),
    path('cart/<int:pk>', views.CartDetail.as_view()),
]
