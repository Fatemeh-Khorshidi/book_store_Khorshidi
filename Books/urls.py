from django.contrib import admin
from django.urls import path
from Books.views import HomeListView, search_results, BookDetaiView, parches

urlpatterns = [
    # home page
    path('', HomeListView.as_view(), name ='homePage'),
    # The page of results in search bar
    path('search_results', search_results, name='search_results'),
    # Book info pages
    path('Book/<int:pk>', BookDetaiView.as_view(), name='BookList'),
    # User cart
    path('parches/', parches, name='parches'),
]

