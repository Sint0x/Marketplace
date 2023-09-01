from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from .serializers import LoginRequestSerializer, TokenSeriazliser, GoodSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework import serializers, viewsets, status
from .models import Good
from django.shortcuts import get_object_or_404



class UserProfileView:
    @staticmethod
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    @authentication_classes([TokenAuthentication])
    def userData(request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    @authentication_classes([TokenAuthentication])
    def update_profile(request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    @authentication_classes([TokenAuthentication])
    def ifLogin(request: Request):
        return Response({
            'message': "passed"
        })

class UserAuthView:
    @staticmethod
    @api_view(['POST'])
    def register(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'username': user.username}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def login(request):
        serializer = LoginRequestSerializer(data=request.data)
        if serializer.is_valid():
            authenticated_user = authenticate(**serializer.validated_data)
            try:
                token = Token.objects.get(user=authenticated_user)
                token.delete()
            except Token.DoesNotExist:
                pass
            token = Token.objects.create(user=authenticated_user)
            return Response(TokenSeriazliser(token).data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoodView:
    @staticmethod
    @api_view(['GET'])
    def goods(request):
        data = GoodSerializer(Good.objects.all(), many=True).data
        return Response(data)


    @authentication_classes([TokenAuthentication])
    @permission_classes([AllowAny])
    @api_view(['GET'])
    def product_detail(request, id):
        good = get_object_or_404(Good, pk=id)
        data = {
            'user': good.user.username,
            'description_goods': good.description_goods,
            'price': good.price,
            'images': good.images.url if good.images else None,
            'namegoods': good.namegoods,
            'afrom': good.afrom
        }
        return Response(data)


    @api_view(['POST'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def add_good(request):
        user = request.user
        description_goods = request.data.get('description_goods')
        price = request.data.get('price')
        images = request.FILES.get('images')
        namegoods = request.data.get('namegoods')
        afrom = request.data.get('afrom')

        good = Good.objects.create(
            user=user,
            description_goods=description_goods,
            price=price,
            images=images,
            namegoods=namegoods,
            afrom=afrom
        )

        return Response({'message': 'Товар успешно добавлен'}, status=status.HTTP_201_CREATED)


    @api_view(['POST'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def add_good(request):
        user = request.user
        description_goods = request.data.get('description_goods')
        price = request.data.get('price')
        images = request.FILES.get('images')
        namegoods = request.data.get('namegoods')
        afrom = request.data.get('afrom')

        good = Good.objects.create(
            user=user,
            description_goods=description_goods,
            price=price,
            images=images,
            namegoods=namegoods,
            afrom=afrom
        )

        return Response({'message': 'Товар успешно добавлен'}, status=status.HTTP_201_CREATED)

class TokenView:
    @staticmethod
    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([AllowAny])
    def token_check(request):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Token '):
            token = auth_header.split(' ')[1]
            user_token = Token.objects.get(user=request.user).key # получение токена пользователя из базы данных
            if token == user_token:
                data = request.user.username
                return Response({'result': True, 'username': data})
            else:
                return Response({'result': False})
        else:
            return Response({'result': False})