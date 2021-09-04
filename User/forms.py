from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, CustomerProxy, Address


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('first_name', 'last_name', 'age', 'email', 'phone')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = "نام کاربری"
        self.fields['first_name'].label = "نام"
        self.fields['last_name'].label = "نام خانوادگی"
        self.fields['age'].label = "سن"
        self.fields['email'].label = "ایمیل"
        self.fields['phone'].label = "تلفن"
        self.fields['password1'].label = "رمز عبور"
        self.fields['password2'].label = "تکرار رمز عبور"
        self.fields['username'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl",
             "placeholder": "نام کاربری خود را وارد کنید"}
        )
        self.fields['username'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "نام کاربری خود را وارد کنید"}
        )
        self.fields['first_name'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "نام خود را وارد کنید"}
        )
        self.fields['last_name'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "نام خانوادگی خود را وارد کنید"}
        )
        self.fields['age'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "سن خود را وارد کنید"}
        )
        self.fields['email'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "ایمیل خود را وارد کنید"}
        )
        self.fields['phone'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "تلفن خود را وارد کنید"}
        )
        self.fields['password1'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "رمز عبور خود را وارد کنید"}
        )
        self.fields['password2'].widget.attrs.update(
            {"class": "form-control mb-2 account-form", "style": "direction:rtl", "placeholder": "رمز عبور خود را تکرار کنید"}
        )


class CustomUserChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        # fields = UserChangeForm.Meta.fields
        fields = ['first_name', 'last_name', 'age', 'email', 'phone']


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

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields['city'].label = "شهر"
            self.fields['country'].label = "کشور"
            self.fields['postal_code'].label = "کد پستی"
            self.fields['address'].label = "نشانی"
            self.fields['city'].widget.attrs.update(
                {"class": "form-control mb-2 account-form", "placeholder": "شهر خود را وارد کنید"}
            )
            self.fields['country'].widget.attrs.update(
                {"class": "form-control mb-2 account-form", "style": "direction:rtl",
                 "placeholder": "کشور خود را وارد کنید"}
            )
            self.fields['postal_code'].widget.attrs.update(
                {"class": "form-control mb-2 account-form", "style": "direction:rtl",
                 "placeholder": "کد پستی خود را وارد کنید"}
            )
            self.fields['address'].widget.attrs.update(
                {"class": "form-control mb-2 account-form", "style": "direction:rtl",
                 "placeholder": "نشانی دقیق خود را وارد کنید"}
            )
