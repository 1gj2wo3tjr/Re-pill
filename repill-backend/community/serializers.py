from rest_framework import serializers
from .models import Notice
from django.contrib.auth import get_user_model

class NoticeAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'name')

class NoticeListSerializer(serializers.ModelSerializer):
    author = NoticeAuthorSerializer(read_only=True)
    class Meta:
        model = Notice
        fields = ('id', 'title', 'author', 'created_at', 'views')

class NoticeSerializer(serializers.ModelSerializer):
    author = NoticeAuthorSerializer(read_only=True)
    class Meta:
        model = Notice
        fields = '__all__'