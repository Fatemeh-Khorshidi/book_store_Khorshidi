# from User.views import profileView, profileEdit
from django.urls import path

from .views import SignUpView, Dashboard, StaffDashboard, UserEditView, delete, view_address, \
    add_address, edit_address, delete_address, set_default, BookUpdateView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('dashboard/', Dashboard, name='dashboard'),
    path('staff_dashboard/', StaffDashboard, name='StaffDashboard'),
    # path('user_profile/', UserProfileView.as_view(), name='UserProfileView'),
    # path('profile/', UserEditView.as_view(), name='UserEditView'),
    path('profile/<int:pk>/', UserEditView.as_view(), name='UserEditView'),
    path('delete/<int:id>/', delete, name='delete_book'),
    path('<int:pk>/book/edit/',
         BookUpdateView.as_view(), name='book_edit'),
    # ---------------------addresses------------------
    path("addresses/", view_address, name="addresses"),
    path("add_address/", add_address, name="add_address"),
    path("addresses/edit/<int:id>/", edit_address, name="edit_address"),
    path("addresses/delete/<int:id>/", delete_address, name="delete_address"),
    path("addresses/set_default/<int:id>/", set_default, name="set_default"),
]
