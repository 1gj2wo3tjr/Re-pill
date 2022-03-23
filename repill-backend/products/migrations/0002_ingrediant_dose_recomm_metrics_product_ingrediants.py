# Generated by Django 4.0.3 on 2022-03-23 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingrediant',
            name='dose_recomm_metrics',
            field=models.CharField(default='mg', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='ingrediants',
            field=models.ManyToManyField(through='products.Included', to='products.ingrediant'),
        ),
    ]
