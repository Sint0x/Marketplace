from projjjapi import views
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/testcontent', views.goods, name='my_view'),
    path('api/register/', views.register, name='api_register'),
    path('api/login', views.login, name='login'),
    path('api/tokencheck', views.token_check, name='token_check'),
    path('api/profile', views.userData, name='create_user'),
    path('api/testoken', views.ifLogin, name='testoken'),
]

