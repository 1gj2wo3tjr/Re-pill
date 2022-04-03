from rest_framework import serializers
from .models import DeliveryAddress, Order
from django.contrib.auth import get_user_model

class DeliveryAddressUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('uid', 'name')

class DeliveryAddressSerializer(serializers.ModelSerializer):
    user = DeliveryAddressUserSerializer(read_only=True)
    class Meta:
        model = DeliveryAddress
        fields = '__all__'

class OrderUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('uid', 'name')

class OrderSerializer(serializers.ModelSerializer):
    user = OrderUserSerializer(read_only=True)
    has_review = serializers.BooleanField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
