from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Good, Review

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('profile_description', 'rating', 'profile_image' )}),
    )

@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    list_display = ('id', 'namegoods', 'user', 'price')
    search_fields = ('namegoods',)
    list_filter = ('user',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'good', 'title', 'rating')