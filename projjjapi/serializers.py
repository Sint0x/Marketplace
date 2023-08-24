from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework import serializers, viewsets, status
from .models import Good, CustomUserCreationForm



class LoginRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']

class GoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = ('user', 'description_goods', 'price', 'images', 'namegoods', 'afrom')



class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(max_length=30, required=False)
    last_name = serializers.CharField(max_length=30, required=False)
    avatar = serializers.ImageField(required=False)
    profile_description = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'avatar', 'profile_description')        