"""Book_Store_DjangoPrj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),  # new
    path('accounts/', include('django.contrib.auth.urls')),  # new
    # Books app urls
    path('', include('Books.urls')),
    # Users app urls
    path('users/', include('User.urls')),
    # Payment app urls
    # path('payments/', include('Payment.urls')),
    path('', TemplateView.as_view(template_name='base.html'),
    name='home'),
]
