from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView, DetailView

import Books
from Books.models import Book, Category


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
        context['second_group'] = Book.objects.filter(category__id=1).values('image')
        context['third_group'] = Book.objects.filter(category__id=2)
        context['forth_group'] = Book.objects.filter(category__id=3)
        context['fifth_group'] = Book.objects.filter(category__id=4)
        context['sixth_group'] = Book.objects.filter(category__id=5)
        context['seventh_group'] = Book.objects.filter(category__id=6)
        context['categories'] = Category.objects.all()
        print(context['second_group'])
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
    model = Book
    template_name = 'Book_info.html'



def parches(reguest):
    return render(reguest, 'Cart.html', {})
