from django.db import models
from django import forms
from django.contrib.auth.forms import UserCreationForm, User


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    avatar = forms.ImageField(required=False, help_text='Optional.')
    profile_description = forms.CharField(widget=forms.Textarea, required=False, help_text='Optional.')

    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ('email', 'first_name', 'last_name', 'avatar', 'profile_description')
# class Users(models.Model):
#     SELLER_STATUS_CHOICES = (
#         # Add your seller status choices here
#     )
#     seller_status = models.CharField(max_length=255, choices=SELLER_STATUS_CHOICES, blank=True)
#     username = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)
#     email = models.EmailField()
#     socials = models.CharField(max_length=255, blank=True)
#     phone_number = models.IntegerField(null=True)
#     password = models.CharField(max_length=255)
#     avatar = models.ImageField(upload_to='avatars/', blank=True)
#     description = models.TextField(blank=True)
#     seller_address = models.CharField(max_length=255, blank=True)
#     rating = models.FloatField(null=True)

class Good(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description_goods = models.JSONField()
    price = models.FloatField()
    images = models.ImageField(upload_to='goods/')
    namegoods = models.CharField(max_length=255)
    afrom = models.CharField(max_length=255)

# class Comment(models.Model):
#     user = models.ForeignKey(Users, on_delete=models.CASCADE)
#     good = models.ForeignKey(Good, on_delete=models.CASCADE)