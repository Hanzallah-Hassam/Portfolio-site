from django.db import models
from django.contrib.auth.models import User
from froala_editor.fields import FroalaField
from django.urls import reverse
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Post(models.Model):
    slug = models.SlugField(max_length=250, unique=True)
    title = models.CharField("Title", max_length=75)
    subtitle = models.CharField("Subtitle", max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator")
    categories = models.ManyToManyField(Category)
    content = FroalaField()
    published = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    cover_image = models.ImageField(upload_to="media")
    class Meta:
        ordering = ["-published"]
        indexes = [
            models.Index(fields=["-published"]),
        ]
    def __str__(self):
        categories_str = ', '.join(category.name for category in self.categories.all())
        return f"{self.title} - {categories_str}"
    
    def get_absolute_url(self):
        return reverse('blog:post_detail', args=[str(self.slug)])
    
class Comment(models.Model):
    post = models.ForeignKey(Post,
    on_delete=models.CASCADE,
    related_name='comments')
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['created']
        indexes = [
        models.Index(fields=['created']),
    ]
    def __str__(self):
        return f'Comment by {self.name} on {self.post}'