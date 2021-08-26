# from User.views import profileView, profileEdit
from django.urls import path

from .views import SignUpView, Dashboard, StaffDashboard, UserProfile, delete

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('dashboard/', Dashboard, name='dashboard'),
    path('staff_dashboard/', StaffDashboard, name='StaffDashboard'),
    path('user_profile/', UserProfile, name='UserProfile'),
    path('delete/<int:id>/', delete, name='delete_book'),
]