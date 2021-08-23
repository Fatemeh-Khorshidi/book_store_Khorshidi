from django.conf.urls import url
from django.urls import path

from cart import views
from cart.views import cart_add, cart_remove
from . import views
from .views import order_create

urlpatterns = [
    # order page
    # url(r'^create/$', views.order_create, name ='order_create'),
    path('create/', order_create, name ='order_create'),
    # The page of
    # path('add/', cart_add, name ='cart_add'),
    #
    # path('remove/', cart_remove, name ='cart_remove'),


]
