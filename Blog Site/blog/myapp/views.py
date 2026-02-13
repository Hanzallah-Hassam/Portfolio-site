from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from .models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .forms import EmailPostForm, CommentForm, ContactForm
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Q
from django.views.generic import ListView

# Create your views here.
def about(request):
    return render(request, 'myapp/about.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            name = form.cleaned_data['name']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)
            return redirect('Contact')
    else:
        form = ContactForm()
        
    context = {
        'form': form,
    }
    return render(request, 'myapp/contact.html', context)

def post_list(request):
    post_list = Post.objects.order_by('-published')
    paginator = Paginator(post_list, 2)
    page_number = request.GET.get('page', 1)
    try:
        posts = paginator.page(page_number)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    if request.method == 'POST':
        form = EmailPostForm(request.POST)
        if form.is_valid():
            # Get data from the form
            email = form.cleaned_data['email']
            
            # Extract the first letter of the email as the name
            name = email.split('@')[0].capitalize()

            # Compose the email message
            subject = 'Thanks for subscribing!'
            message = f'Thank you, {name}, for subscribing to our newsletter.'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)

            # Optionally, you can redirect to a success page or display a success message.
            # For example, redirect to a 'subscription-success' page:
            return redirect('post_list')
    else:
        form = EmailPostForm()
        

    
    context = {
        'form': form,
        'posts': posts,
    }
    return render(request, 'myapp/index.html', context)
    
class SearchResultsListView(ListView): 
    model = Post
    context_object_name = "post_list"
    template_name = "myapp/search_results.html"
    
    def get_queryset(self):
        if q := self.request.GET.get('q'):
            return Post.objects.filter(title__icontains=q) | Post.objects.filter(subtitle__icontains=q)
        else:
            return Post.objects.none()



def email(request):
    subject = 'Thank you for registering to our site'
    message = ' it  means a world to us '
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['receiver@gmail.com',]
    send_mail( subject, message, email_from, recipient_list )
    return redirect('index.html')


def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    
    if request.method == 'POST':
        forms = CommentForm(data=request.POST)
        if forms.is_valid():
            comment = forms.save(commit=False)
            comment.post = post
            comment.save()
    else:
        forms = CommentForm()

    # Retrieve comments associated with the post
    comments = Comment.objects.filter(post=post)
    related_posts = Post.objects.filter(categories__in=post.categories.all()).exclude(id=post.id).distinct()

    return render(request, 'myapp/post.html', {'post': post, 'forms': forms, 'comments': comments, 'related_posts': related_posts })



@require_POST
def post_comment(request, slug):
    post = get_object_or_404(Post, slug=slug, status=Post.Status.PUBLISHED)
    comment = None
    
    form = CommentForm(data=request.POST)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.post = post
        comment.save()
    return render(request, 'myapp/post.html',{'post': post, 'form': form, 'comment': comment})