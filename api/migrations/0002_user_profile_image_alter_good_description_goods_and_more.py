# Generated by Django 4.2.3 on 2023-09-01 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, upload_to='frontend/src/images/avatars'),
        ),
        migrations.AlterField(
            model_name='good',
            name='description_goods',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='good',
            name='images',
            field=models.ImageField(upload_to='frontend/src/goods/images'),
        ),
    ]