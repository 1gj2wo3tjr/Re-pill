# Generated by Django 4.0.3 on 2022-04-04 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_merge_0006_merge_20220403_1908_0007_order_has_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_number',
            field=models.BigIntegerField(default=0),
        ),
    ]