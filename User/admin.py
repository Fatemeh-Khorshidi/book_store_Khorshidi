from django.contrib import admin
from User.models import CustomerProxy, CustomUser, AdminProxy, EmployeeProxy
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    list_display = ['first_name', 'last_name', 'age', 'address', 'phone', 'email', 'is_staff', ]
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('age', 'first_name', 'last_name', 'age', 'address', 'phone', 'email')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('age', 'first_name', 'last_name', 'age', 'address', 'phone', 'email')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)


# Register your models here.

@admin.register(CustomerProxy)
class CustomerAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=False, is_superuser=False)


@admin.register(AdminProxy)
class CustomerAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=True, is_superuser=False)


@admin.register(EmployeeProxy)
class CustomerAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=False, is_superuser=True)
