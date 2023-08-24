from django.urls import path
from projjjapi import views

urlpatterns = [
    path('testcontent/', views.goods, name='goods'),
    path('register/', views.register, name='api_register'),
    path('login/', views.login, name='login'),
    path('tokencheck/', views.token_check, name='token_check'),
    path('profile/', views.userData, name='create_user'),
    path('testoken/', views.ifLogin, name='testoken'),
]