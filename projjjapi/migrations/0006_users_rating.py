# Generated by Django 4.2.3 on 2023-08-06 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projjjapi', '0005_alter_users_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='rating',
            field=models.FloatField(null=True),
        ),
    ]
