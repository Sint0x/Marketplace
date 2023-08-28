from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    profile_description = models.TextField(blank=True)
    email = models.EmailField('email address', blank=True)

    
class Good(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description_goods = models.JSONField()
    price = models.FloatField()
    images = models.ImageField(upload_to='goods/')
    namegoods = models.CharField(max_length=255)
    afrom = models.CharField(max_length=255)