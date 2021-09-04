from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from coupons.forms import CouponApplyForm
from Books.models import Book
from .cart import Cart
from .forms import CartAddBookForm


@require_POST
def cart_add(request, book_id):
    """
    add books to basket
    :param request:
    :param book_id:
    :return:
    """
    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    form = CartAddBookForm(request.POST, id)
    if book.inventory > 0:
        if form.is_valid():
            cd = form.cleaned_data
            if cd['quantity'] < book.inventory:

                cart.add(book=book,
                         quantity=cd['quantity'],
                         update_quantity=cd['update'])
            else:
                return HttpResponse("کتاب مورد نظر موجود نیست")
        return redirect('cart_detail')

    else:
        return HttpResponse("کتاب مورد نظر موجود نیست")


def cart_remove(request, book_id):
    """
        remove books from basket
        :param request:
        :param book_id:
        :return:
    """
    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    cart.remove(book)
    return redirect('cart_detail')


def cart_detail(request):
    """
        final basket view
        :param request:
        :param book_id:
        :return:
        """
    cart = Cart(request)
    for item in cart:
        item['update_count_form'] = CartAddBookForm(initial={'quantity': item['quantity'],
                                                             'update': True})
    discount_apply_form = CouponApplyForm()
    return render(request, 'cart/cart_detail.html', {'cart': cart, 'discount_apply_form': discount_apply_form})
