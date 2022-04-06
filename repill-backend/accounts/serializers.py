from asyncore import read
from django.shortcuts import get_list_or_404
from rest_framework import serializers
from .models import DeliveryAddress, Order, Subscription
from django.contrib.auth import get_user_model

from products.models import Product, Review

class DeliveryAddressUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'name')

class DeliveryAddressSerializer(serializers.ModelSerializer):
    user = DeliveryAddressUserSerializer(read_only=True)
    class Meta:
        model = DeliveryAddress
        fields = '__all__'

class OrderUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'name')

class OrderSerializer(serializers.ModelSerializer):

    user = OrderUserSerializer(read_only=True)
    
    # has_review = serializers.BooleanField(read_only=True)
    has_review = serializers.SerializerMethodField()

    def get_has_review(self, obj):
        review = Review.objects.filter(user=obj.user, product=obj.product).first()
        return review.id if review else False

    class Meta:
        model = Order
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Subscription
        fields = '__all__'