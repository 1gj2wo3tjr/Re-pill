from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.urls import path


schema_view = get_schema_view(
    openapi.Info(
        title='Re:pill API',
        default_version='v1',
        description='Hello!',
        terms_of_service='',
        contact=openapi.Contact(email='noreply@i6a503.ssafy.io'),
        license=openapi.License(name='BSD License'),
    ),
    public=True,
    permission_classes=[AllowAny],
)

schema_url_patterns = [
    path('swagger-ui/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('swagger-redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='swagger-redoc'),
]