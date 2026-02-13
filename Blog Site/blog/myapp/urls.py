from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path("", views.post_list, name="post_list"),
    path("about", views.about, name="About"),
    path("contact", views.contact, name="Contact"),
    path("search/", SearchResultsListView.as_view(), name="search_results"), 
    path("<slug:slug>/", views.post_detail, name="post_detail"),
]

