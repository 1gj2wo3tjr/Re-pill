from rest_framework import serializers
from .models import SurveyHistory, SurveyQuestion, SurveyQuestionChoices, SurveyResponse
from django.contrib.auth import get_user_model

class SurveyHistoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = SurveyHistory
        fields = '__all__'


class ResponsesSerializer(serializers.ModelSerializer):
        class Meta:
            model = SurveyResponse
            fields = ['question', 'answer_choice', 'answer_text']

class SurveyHistorySerializer(serializers.ModelSerializer):
    
    # responses = serializers.StringRelatedField(many=True)
    responses = ResponsesSerializer(many=True)
    respondent = serializers.StringRelatedField(read_only=True)




    class Meta:
        model = SurveyHistory
        fields = '__all__'
        
    def create(self, validated_data):
        responses = validated_data.pop('responses')
        survey = SurveyHistory.objects.create(**validated_data)

        for response in responses:
            SurveyResponse.objects.create(**response, survey=survey)

        return survey