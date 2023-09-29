from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg


class User(AbstractUser):
    profile_description = models.TextField(blank=True)
    email = models.EmailField('email address', blank=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    profile_image = models.ImageField(upload_to='frontend/src/images/avatars', blank=True)
    

class Good(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description_goods = models.CharField(max_length=300)
    price = models.FloatField()
    images = models.ImageField(upload_to='frontend/src/goods/images')
    namegoods = models.CharField(max_length=255)
    afrom = models.CharField(max_length=255)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    good = models.ForeignKey(Good, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    text = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Сначала сохраняем отзыв
        # Затем обновляем рейтинг пользователя
        new_rating = Review.objects.filter(good__user=self.good.user).aggregate(Avg('rating'))['rating__avg']
        self.good.user.rating = new_rating
        self.good.user.save()