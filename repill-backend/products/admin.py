from django.contrib import admin
from .models import Product, Ingrediant, Included, Review

# Register your models here.
admin.site.register(Product)
admin.site.register(Ingrediant)
admin.site.register(Included)
admin.site.register(Review)
