# Generated by Django 4.0.3 on 2022-03-30 06:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0003_alter_surveyresponse_answer_choice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surveyresponse',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='survey.surveyhistory'),
        ),
    ]