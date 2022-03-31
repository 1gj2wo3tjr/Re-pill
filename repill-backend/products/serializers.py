from rest_framework import serializers
from .models import Included, Product, Ingrediant, Review, Cart


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


class ReviewListSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    content = serializers.CharField(allow_blank=True, trim_whitespace=False, write_only=True)
    class Meta:
        model = Review
        fields = ('id', 'user', 'product', 'title', 'content', 'rating')


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    content = serializers.CharField(allow_blank=True, trim_whitespace=False)

    class Meta:
        model = Review
        fields = '__all__'
        
class CartSerializer(serializers.ModelSerializer):
    """
    장바구니를 직렬화하는 serializer입니다.

    장바구니 모델의 특성상 List, Detail이 별개의 serializer를 필요로 하지 않습니다.
    """
    user = serializers.StringRelatedField(read_only=True)
    delivery_fee = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = '__all__'