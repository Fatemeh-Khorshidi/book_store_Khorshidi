from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
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
    path('orders/', include('order.urls')),
    # Cart pages
    path('cart/', include('cart.urls')),
    # Payment app urls
    path('coupons/', include('coupons.urls')),
    #
    path('', TemplateView.as_view(template_name='base.html'),
    name='home'),
]

# for see the static files in browser
urlpatterns += staticfiles_urlpatterns()

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)