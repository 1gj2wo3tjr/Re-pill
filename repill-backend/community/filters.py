from django_filters import FilterSet
from .models import Notice

class NoticeFilter(FilterSet):
    class Meta:
        model = Notice
        fields = ['author', 'title', 'content']