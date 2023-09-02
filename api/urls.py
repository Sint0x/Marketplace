from django.urls import path
from .views import UserProfileView, UserAuthView, GoodView, TokenView




urlpatterns = [
    path('productlist', GoodView.goods, name='goods'),
    path('register', UserAuthView.register, name='api_register'),
    path('login', UserAuthView.login, name='login'),
    path('tokencheck', TokenView.token_check, name='token_check'),
    path('testoken', UserProfileView.ifLogin, name='testoken'),
    path('user/<int:id>/update', UserProfileView.update_profile, name='update_profile'),
    path('add_good', GoodView.add_good, name='testoken'),
    path('user/<int:id>', UserProfileView.userData, name='userData'),
    path('product/<int:id>/', GoodView.product_detail, name='product_detail'),
]