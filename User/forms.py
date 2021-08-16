from django import forms
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from User.models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields + ('first_name','last_name','age','address','phone','email' )



class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields

# class UserForm(forms.ModelForm):
#     password = forms.CharField(widget=forms.PasswordInput)
#     class Meta:
#         model = Customer
#         # fields
#
#     def clean_email(self):
#         email = self.cleaned_data.get('email')
#
#         if '@' not in email:
#             raise forms.ValidationError('@ not in email')
#         return email
