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

    def clean(self):
        # data from the form is fetched using super function
        super(AddBookForm, self).clean()

        # extract the title and text field from the data
        title = self.cleaned_data.get('title')
        book_info = self.cleaned_data.get('book_info')
        return self.cleaned_data


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


