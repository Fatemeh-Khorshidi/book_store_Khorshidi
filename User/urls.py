# from User.views import profileView, profileEdit
from django.urls import path
from django.contrib.auth import views as auth_views
from .views import Dashboard, StaffDashboard, UserEditView, delete, view_address, \
    add_address, edit_address, delete_address, set_default, BookUpdateView, VerificationView, RegistrationView, \
    SetNewPasswordView

urlpatterns = [
    # ---------------------signup------------------
    path('signup/', RegistrationView.as_view(), name='signup'),
    # path('signup/', RegistrationView.as_view(), name='signup'),

    # ---------------------panels------------------
    path('dashboard/', Dashboard, name='dashboard'),
    path('staff_dashboard/', StaffDashboard, name='StaffDashboard'),
    path('profile/<int:pk>/', UserEditView.as_view(), name='UserEditView'),
    path('delete/<int:id>/', delete, name='delete_book'),
    path('<int:pk>/book/edit/', BookUpdateView.as_view(), name='book_edit'),
    # path('set-new-password/<uidb64>/<token>', SetNewPasswordView.as_view(), name='set-new-password'),
    path('activate/<uidb64>/<token>', VerificationView.as_view(), name='activate'),

    # ---------------------Reset password------------------
    path('reset_password/',
         auth_views.PasswordResetView.as_view(template_name="registration/password_reset.html"),
         name="reset_password"),

    path('reset_password_sent/',
         auth_views.PasswordResetDoneView.as_view(template_name="registration/password_reset_done.html"),
         name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name="registration/password_reset_confirm.html"),
         name="password_reset_confirm"),

    path('reset_password_complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name="registration/password_reset_done.html"),
         name="password_reset_complete"),

    # ---------------------addresses------------------
    path("addresses/", view_address, name="addresses"),
    path(" add_address/", add_address, name="add_address"),
    path("addresses/edit/<int:id>/", edit_address, name="edit_address"),
    path("addresses/delete/<int:id>/", delete_address, name="delete_address"),
    path("addresses/set_default/<int:id>/", set_default, name="set_default"),
]



"""
1-submit email form                      // PasswordResetView
2-Email sent success message             // PasswordResetDoneView
3-link to password reset form in email   // PasswordResetConfirmView
4-password successfully change message   // PasswordResetCompleteView

"""