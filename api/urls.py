from django.urls import path
from .views import UserProfileView, UserAuthView, GoodView, TokenView

urlpatterns = [
    path('testcontent', GoodView.goods, name='goods'),
    path('register', UserAuthView.register, name='api_register'),
    path('login', UserAuthView.login, name='login'),
    path('tokencheck', TokenView.token_check, name='token_check'),
    path('profile', UserProfileView.userData, name='create_user'),
    path('testoken', UserProfileView.ifLogin, name='testoken'),
    path('profile/update', UserProfileView.update_profile, name='update_profile'),
    path('add_good', GoodView.add_good, name='add_goods'),
]