from rest_framework import serializers
from .models import DeliveryAddress
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
