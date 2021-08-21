from django.urls import path

from Cart.views import cart_add, cart_remove
from Payment import views
from .views import order_create

urlpatterns = [
    # order page
    path('create/', order_create, name ='order_create'),
    # The page of
    path('add/', cart_add, name ='cart_add'),
    #
    path('remove/', cart_remove, name ='cart_remove'),


]
