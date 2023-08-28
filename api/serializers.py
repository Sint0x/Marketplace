from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework import serializers, viewsets, status
from .models import Good, User



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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'profile_description', 'rating')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
