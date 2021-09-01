from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, CustomerProxy, Address


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('first_name', 'last_name','age','email', 'phone')


class CustomUserChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        # fields = UserChangeForm.Meta.fields
        fields = ['first_name', 'last_name','age','email', 'phone']


class UserProfileEdite(forms.ModelForm):
    class Meta:
        model = CustomerProxy
        fields = ['username', 'first_name', 'last_name', 'age', 'email', 'phone']


class AddAddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['city', 'country', 'postal_code', 'address']
        widgets = {

            'address': forms.Textarea(attrs={'placeholder': " آدرس دقیق خود را وارد کنید", 'cols': 40, 'rows': 3}),
        }

        def __init__(self , *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields['city'].widget.attrs.update(
                {"class": "form-control mb-2 account-form", "placeholder": "شهر خود را وارد کنید"}
            )
