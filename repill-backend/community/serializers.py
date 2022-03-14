from rest_framework import serializers
from .models import Notice
from django.contrib.auth import get_user_model

class NoticeListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notice
        fields = '__all__'
        # fields = ('id', 'title', 'author', 'created_at', 'views')