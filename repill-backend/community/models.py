from django.db import models
from django.conf import settings


class Notice(models.Model):
    title = models.CharField(max_length=30)             # 30은 너무 적지 않나...?
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.PositiveIntegerField(default=0)      # 조회수를 저장하는 데에는 어떤 자료형이 적절할까?

    def __str__(self):
        return f'{self.author} - {self.title}'
