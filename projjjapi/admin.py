from django.contrib import admin
from .models import Good

# @admin.register(Users)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'email', 'seller_status', 'created_at')
#     search_fields = ('username', 'email')
#     list_filter = ('seller_status',)

@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    list_display = ('id', 'namegoods', 'user', 'price')
    search_fields = ('namegoods',)
    list_filter = ('user',)

# @admin.register(Comment)
# class CommentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'good')
#     search_fields = ('user__username',)
#     list_filter = ('user',)