from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms

from Books.models import Book
from User.models import CustomerProxy, Adminuser, EmployeeProxy, Address
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


@admin.register(CustomUser)
class CustomAdmin(UserAdmin):
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


class UserCreationForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        print(self.cleaned_data["password"])
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            print(user.password)
        return user


@admin.register(EmployeeProxy)
class CustomUserAdmin(UserAdmin):
    # The forms to add and change user instances
    add_form = UserCreationForm
    list_display = ("email",)
    ordering = ("email",)

    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username','email', 'password', 'first_name', 'last_name', 'is_superuser', 'is_staff', 'is_active','address',)}
         ),
    )

    filter_horizontal = ()

    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=True, is_superuser=False)


@admin.register(CustomerProxy)
class CustomerAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        return CustomUser.objects.filter(is_staff=False, is_superuser=False)


admin.site.register(Address)

# admin.site.register(EmployeeProxy,CustomUserAdmin)
