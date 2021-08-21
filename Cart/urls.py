from django.urls import path

from Cart.views import cart_add, cart_detail, cart_remove
urlpatterns = [
    # cart page
    path('', cart_detail, name ='cart_detail'),
    # The page of
    path('add/', cart_add, name ='cart_add'),
    #
    path('remove/', cart_remove, name ='cart_remove'),


]
