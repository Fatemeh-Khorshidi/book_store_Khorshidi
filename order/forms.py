from django import forms

from User.models import Address
from .models import Order


class OrderCreationForm(forms.ModelForm):

    address = forms.ModelChoiceField(queryset=Address.objects.all())

    class Meta:
        model = Order
        fields = ['first_name', 'last_name', 'email', 'address']
