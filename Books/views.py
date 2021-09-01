from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from django.urls import reverse
from django.views.generic import ListView, DetailView

import Books
from Books.forms import AddBookForm
from Books.models import Book, Category
# from Cart.forms import CartAddBookForm
from cart.forms import CartAddBookForm


class HomeListView(ListView):
    """
    show books of different categories in sliders of home page
    context['categories']=   top menu shows all book categories with this class view
    """
    model = Category
    context_object_name = 'books_list'
    template_name = 'index.html'

    # queryset =
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(HomeListView, self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk')
        context['first_group'] = Book.objects.filter(category__id=0)
        # context['second_group'] = Book.objects.filter(category__id=1)
        context['second_group'] = Book.objects.filter(category__id=1)
        context['third_group'] = Book.objects.filter(category__id=2)
        context['forth_group'] = Book.objects.filter(category__id=3)
        context['fifth_group'] = Book.objects.filter(category__id=4)
        context['sixth_group'] = Book.objects.filter(category__id=5)
        context['seventh_group'] = Book.objects.filter(category__id=6)
        context['categories'] = Category.objects.all()
        print(context['second_group'])
        return context

# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
class MenuView(ListView):
    """
    show books of different categories in sliders of home page
    context['categories']=   top menu shows all book categories with this class view
    """
    model = Category
    context_object_name = 'books_list'
    template_name = 'base.html'

    # queryset =
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(MenuView, self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk')
        context['categories'] = Category.objects.all()

        return context


def search_results(request):
    """
    :param request:
    :return: books that contain the user searched items
    """
    if request.method == "POST":
        searched = request.POST['searched']
        results = Book.objects.filter(title__contains=searched)
        return render(request, 'search_results.html', {'searched': searched, 'results': results})

    else:
        return render(request, 'search_results.html', {})


class BookDetaiView(DetailView):
    """
    Display details of each books; include title, author, image category and price.
    """
    # cart_book_form = CartAddBookForm()
    model = Book
    template_name = 'Book_info.html'

    def get_context_data(self, **kwargs):
        context = super(BookDetaiView, self).get_context_data(**kwargs)
        context['cart_book_form'] = CartAddBookForm
        return context


class CategoryListView(ListView):
    """
    Display every books from each categories in separate html pages
    this categories linked in top menu
    """
    model = Category
    template_name = 'categories.html'
    context_object_name = 'categories_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        pk = self.kwargs.get('pk')
        print(pk)
        context['Cat_Book'] =  Book.objects.filter(category__id =pk)

        return context

