from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework import serializers, viewsets, status
from .models import Good, User, Review



class LoginRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']

class GoodSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    rating = serializers.CharField(source='user.rating', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    class Meta:
        model = Good
        fields = ( 'user_id', 'id', 'username', 'first_name', 'last_name', 'rating', 'description_goods', 'price', 'images', 'namegoods', 'afrom')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'profile_description', 'rating', 'profile_image' )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ReviewSerializer(serializers.ModelSerializer):
    description_goods = serializers.CharField(source='good.description_goods', read_only=True)
    price = serializers.CharField(source='good.price', read_only=True)
    images = serializers.CharField(source='good.images', read_only=True)
    namegoods = serializers.CharField(source='good.namegoods', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'user', 'good', 'title', 'text', 'rating', 'description_goods', 'price', 'images', 'namegoods', 'username')