
from django.urls import path
from django.conf.urls import url
from . import views
from .views import coupon_apply

urlpatterns = [

    # url(r'^apply/$', views.coupon_apply, name='apply'),
    path('apply/', coupon_apply, name='apply')


]


