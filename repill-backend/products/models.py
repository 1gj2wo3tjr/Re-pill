from django.db import models


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
    content = models.TextField()                # 제품 설명
    ingrediants = models.ManyToManyField(Ingrediant, through='Included')

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
