from django.contrib import admin
from .models import User, DeliveryAddress

# Register your models here.
admin.site.register(User)
admin.site.register(DeliveryAddress)