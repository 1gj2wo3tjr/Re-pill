from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        if request.user.is_authenticated:
            if hasattr(obj, 'user'):
                return obj.user.id == request.user.id            

            if hasattr(obj, 'author'):
                return obj.author.id == request.user.id
        
        return False


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True

        if request.method in SAFE_METHODS:
            return True

        if request.user.is_authenticated:
            if hasattr(obj, 'user'):
                return obj.user.id == request.user.id            

            if hasattr(obj, 'author'):
                return obj.author.id == request.user.id
        
        return False