from django.db import models
from django.conf import settings

class Notice(models.Model):
    title = models.CharField(max_length=30) # 너무 작은데?
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField()

    def __str__(self):
        return f'{self.author} - {self.title}'
