from django.urls import path, include
from .views import UserProfileView, UserAuthView, GoodView, TokenView, ReviewView




urlpatterns = [
    path('productlist', GoodView.goods, name='goods'),
    path('alluserproductlist/<int:id>', GoodView.all_user_goods, name='user_goods'),
    path('userproductlist/<int:id>', GoodView.user_goods, name='user_goods'),
    path('register', UserAuthView.register, name='api_register'),
    path('login', UserAuthView.login, name='login'),
    path('tokencheck', TokenView.token_check, name='token_check'),
    path('testoken', UserProfileView.ifLogin, name='testoken'),
    path('user/<int:id>/update', UserProfileView.update_profile, name='update_profile'),
    path('add_good', GoodView.add_good, name='testoken'),
    path('product/<int:id>', GoodView.product_detail, name='product_detail'),
    path('user/<int:id>', UserProfileView.userData, name='userData'),
    path('review/userreviews/<int:id>', ReviewView.user_reviews, name='review_get'),
    path('review/post', ReviewView.post, name='review_post'),
    path('review/profilereviews/<int:id>', ReviewView.profile_reviews, name='goods_reviews'),

]