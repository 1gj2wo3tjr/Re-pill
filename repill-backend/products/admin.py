from django.contrib import admin
from .models import Product, Ingrediant, Included, Review, Cart

# Register your models here.
admin.site.register(Product)
admin.site.register(Ingrediant)
admin.site.register(Included)
admin.site.register(Review)
admin.site.register(Cart)
