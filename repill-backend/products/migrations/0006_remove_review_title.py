# Generated by Django 4.0.3 on 2022-03-31 01:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_merge_0003_cart_0004_product_thumbnail_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='title',
        ),
    ]