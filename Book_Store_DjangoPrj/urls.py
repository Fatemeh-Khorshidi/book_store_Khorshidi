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
from django.template.context_processors import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from Book_Store_DjangoPrj import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # new
    path('users/', include('django.contrib.auth.urls')),
    # Books app urls
    path('', include('Books.urls')),
    # Users app urls
    path('users/', include('User.urls')),
    # Order pages
    path('orders/', include('Order.urls')),
    # Cart pages
    path('cart/', include('Cart.urls')),
    # Payment app urls
    # path('payments/', include('Payment.urls')),
    #
    path('', TemplateView.as_view(template_name='base.html'),
    name='home'),
]

# for see the static files in browser
# for see the static files in browser
urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

