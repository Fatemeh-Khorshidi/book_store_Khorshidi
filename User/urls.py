from User.views import profileView, profileEdit
from django.urls import path

urlpatterns = [
    # profile pages
    path('profile/', profileView, name='profileView'),
    path('profile_edit/', profileEdit, name='profile_edit'),

]
