from django import forms

from Books.models import Book


def AddBookQuantity(id):
    book = Book.objects.get(id=id)
    a = book.inventory
    print(a)
    return a


# PRODUCT_QUANTITY_CHOICES = [(i, str(i)) for i in range(1, max(Book.objects.get()))]
PRODUCT_QUANTITY_CHOICES = [(i, str(i)) for i in range(1, 100)]


class CartAddBookForm(forms.Form):
    # quantity = forms.ModelMultipleChoiceField(queryset=Book.objects.get(id).values('inventory'))
    # quantity = forms.ModelMultipleChoiceField(queryset=Book.objects.get(pk).values(''))
    quantity = forms.TypedChoiceField(choices=PRODUCT_QUANTITY_CHOICES , coerce=int)
    update = forms.BooleanField(required=False, initial=False, widget=forms.HiddenInput)
    # quantity = forms.ModelMultipleChoiceField(queryset=Book.objects.values('inventory'))

    # def __init__(self, inventory, *args, **kwargs):
    #     super(CartAddBookForm, self).__init__(*args, **kwargs)
    #     self.fields['quantity'].queryset = Book.objects.filter(inventory=inventory)
