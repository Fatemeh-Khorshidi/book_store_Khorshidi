from django import forms

from Books.models import Book


def AddBookQuantity(id):
    book = Book.objects.get(id=id)
    a = book.inventory
    print(a)
    return a


# PRODUCT_QUANTITY_CHOICES = [(i, str(i)) for i in range(1, max(AddBookQuantity(id)))]
PRODUCT_QUANTITY_CHOICES = [(i, str(i)) for i in range(1, 3)]


class CartAddBookForm(forms.Form):
    quantity = forms.TypedChoiceField(choices=PRODUCT_QUANTITY_CHOICES, coerce=int)
    update = forms.BooleanField(required=False, initial=False, widget=forms.HiddenInput)
