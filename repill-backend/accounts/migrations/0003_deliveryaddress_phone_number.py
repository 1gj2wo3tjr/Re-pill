# Generated by Django 4.0.3 on 2022-03-31 01:39

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_deliveryaddress'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliveryaddress',
            name='phone_number',
            field=models.CharField(default='000-0000-0000', max_length=13, validators=[django.core.validators.RegexValidator(regex='^(0)\\d{1,2}-?\\d{3,4}-?\\d{4}')]),
        ),
    ]
