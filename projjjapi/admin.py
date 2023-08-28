from django.contrib import admin
from .models import Good, User
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('profile_description',)}),
    )

@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    list_display = ('id', 'namegoods', 'user', 'price')
    search_fields = ('namegoods',)
    list_filter = ('user',)
