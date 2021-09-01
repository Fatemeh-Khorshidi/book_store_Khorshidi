from django import forms
from django.forms import ModelForm

from Books.models import Book, Category


class AddBookForm(ModelForm):
    class Meta:
        model = Book
        fields = '__all__'

        widgets = {
            forms.Textarea(attrs={'placeholder': "توضیح کتاب", 'cols': 100, 'rows': 8})
        }

class EditBookForm(ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'price', 'image', 'inventory','book_info']

        widgets = {
            forms.Textarea(attrs={'placeholder': "توضیح کتاب", 'cols': 100, 'rows': 8})
        }


class AddCategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = '__all__'

    def clean(self):
        # data from the form is fetched using super function
        super(AddCategoryForm, self).clean()

        # extract the title and text field from the data
        name = self.cleaned_data.get('name')
        return self.cleaned_data


