from django.shortcuts import render, redirect, get_object_or_404
from Books.models import Book
from .cart import Cart
from Discount.forms import CouponApplyForm
from .forms import CartAddBookForm


# Create your views here.

def cart_add(request, book_id):
    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    form = CartAddBookForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            cd = form.cleaned_data
            cart.add(book=book,
                     quantity=cd['quantity'],
                     update_quantity=cd['update'])
        return redirect('Cart')


def cart_remove(request, book_id):
    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    cart.remove(book)
    return redirect('Cart')


def cart_detail(request):
    cart = Cart(request)
    for item in cart:
        item['update_count_form'] = CartAddBookForm(initial={'quantity': item['count'],
                                                             'update': True})
    discount_apply_form = CouponApplyForm()
    return render(request, 'Cart.html', {'cart': cart, 'discount_apply_form': discount_apply_form})
