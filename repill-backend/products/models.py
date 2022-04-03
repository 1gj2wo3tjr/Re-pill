from django.db import models
from django.conf import settings

class Ingrediant(models.Model):
    name = models.CharField(max_length=30)      # 성분명
    content = models.TextField()                # 해당 성분에 대한 설명
    dose_recomm = models.PositiveIntegerField()    # 일일 섭취 권장량
    dose_recomm_metrics = models.CharField(max_length=10)     # 권장량 표기 단위

    def __str__(self):
        return f'{self.name}'


class Product(models.Model):
    name = models.CharField(max_length=50)      # 제품명
    company = models.CharField(max_length=50)   # 제조사
    price = models.PositiveIntegerField()       # 가격
    content = models.TextField(blank=True)                # 제품 설명
    ingrediants = models.ManyToManyField(Ingrediant, through='Included')
    thumbnail_url = models.URLField(max_length=200, blank=True)    # 제품 이미지 URL

    def __str__(self):
        return f'{self.name}'


# 영양 성분 - 영양제 중개 테이블
class Included(models.Model):
    # 참조를 위한 정보
    product = models.ForeignKey(Product, on_delete=models.CASCADE)          # 영양제 
    ingrediant = models.ForeignKey(Ingrediant, on_delete=models.CASCADE)    # 영양성분

    # 부가 정보
    dose = models.PositiveIntegerField()                                    # 함유량
    dose_metrics = models.CharField(max_length=10)                          # 함유량 표기 단위

# 상품 리뷰
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()

    RATING_CHOICES = [(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')]
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES)

class Cart(models.Model):
    """
    장바구니 모델입니다.
    
    user: 사용자
    product: 대상 상품
    quantity: 수량
    delivery_fee: 배송료

    한 사용자의 전체 장바구니 == user.id가 같은 모든 장바구니 목록
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    # delivery_fee = models.PositiveIntegerField()
