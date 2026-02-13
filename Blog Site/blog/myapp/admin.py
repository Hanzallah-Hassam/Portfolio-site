from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Category)



@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'published']
    list_filter = ['published']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published'
    ordering = ['published', 'updated_at']
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'post', 'created']
    list_filter = [ 'created', 'updated']
    search_fields = ['name', 'email', 'body']