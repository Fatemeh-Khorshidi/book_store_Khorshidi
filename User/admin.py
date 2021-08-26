from django.contrib import admin
from User.models import CustomerProxy, CustomUser, Adminuser, Adminuser, EmployeeProxy, Address
from django.contrib.auth.admin import UserAdmin
# from .forms import CustomUserCreationForm, CustomUserChangeForm

# admin.site.register(CustomUser, CustomUserAdmin)


# Register your models here.

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'username', 'age', 'is_staff', ]  # new
    fieldsets = UserAdmin.fieldsets + (  # new
        (None, {'fields': ('age', 'address', 'phone')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (  # new
        (None, {'fields': ('age', 'address', 'phone')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Address)


@admin.register(CustomerProxy)
class CustomerAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=False, is_superuser=False)


# admin.site.register(CustomerProxy, CustomerAdmin)


@admin.register(Adminuser)
class EmployeeAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=True, is_superuser=True)


# admin.site.register(Adminuser, EmployeeAdmin)


@admin.register(EmployeeProxy)
class SupperAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=True, is_superuser=False)


# admin.site.register(EmployeeProxy, SupperAdmin)
