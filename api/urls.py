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
    path('userproductlist', GoodView.user_goods, name='user_goods'),
    path('alluserproductlist/<int:id>', GoodView.all_user_goods, name='user_goods'),
    path('review/get', ReviewView.get, name='review_get'),
    path('review/post', ReviewView.post, name='review_post'),
    path('review/goodsreviews', ReviewView.goods_reviews, name='goods_reviews'),
]