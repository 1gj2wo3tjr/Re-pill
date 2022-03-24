from rest_framework import serializers
from .models import Included, Product, Ingrediant


class IngrediantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediant
        fields = '__all__'

class IncludedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Included
        # fields = ('ingrediant_id', 'ingrediant', 'dose', 'dose_metrics')
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        depth = 1

