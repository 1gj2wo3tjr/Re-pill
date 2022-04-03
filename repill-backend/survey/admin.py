from django.contrib import admin
from .models import SurveyHistory, SurveyQuestion, SurveyQuestionChoices, SurveyResponse

# Register your models here.
admin.site.register(SurveyHistory)
admin.site.register(SurveyQuestion)
admin.site.register(SurveyQuestionChoices)
admin.site.register(SurveyResponse)
