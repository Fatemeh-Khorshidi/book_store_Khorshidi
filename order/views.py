from django.shortcuts import render, redirect
from cart.cart import Cart
from django.contrib.auth.decorators import login_required
from Book_Store_DjangoPrj import settings
from Books.models import Book
from User.models import Address
from .models import OrderItem, Order
from .forms import OrderCreationForm


# Create your views here.

@login_required(login_url='/users/login/')
def order_create(request):
    """
    add books from cart to order
    :param request:
    :return:
    """
    cart = Cart(request)
    try:
        order = Order.objects.get(user=request.user, paid=False)
        print(order)
    except Order.DoesNotExist:
        order = Order.objects.create(user=request.user)
        print('------', order)
    if request.method == 'POST':
        form = OrderCreationForm(request.POST)
        print(request.user)
        print(request.user.username)
        address = Address.objects.filter(user=request.user, default=True)
        print(address)
        user_id = request.user.id
        order_id = request.POST.get('id')
        # carttotal = cart.get_total_price()

        # Check if order exists
        if Order.objects.filter(order_id=order_id).exists():
            pass
        else:
            order = Order.objects.create(user=request.user, first_name='request.user.first_name', last_name='last_name',
                                         address=address,
                                         # total_paid=carttotal,
                                         phone='phone')

            order_id = order.pk
        if form.is_valid():
            order = form.save(commit=False)

            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = cart.coupon.discount

            for item in cart:
                OrderItem.objects.create(order_id=order_id, order=order,
                                         book=item['book'],
                                         price=item['price'],
                                         quantity=item['quantity'])
                book = Book.objects.get(book=item['book'])
                book.inventory = book.inventory - item['quantity']
                book.save()

            order.paid = 'True'
            order.save()
            # clear the cart
            cart.clear()
            # save to db
            # request.session['order_id'] = order_id
            Order.objects.filter(user=request.user, paid=False).update(paid=True)

            return render(request, 'cart/create.html', {'order': order})

    form = OrderCreationForm()
    return render(request, 'cart/create.html', {'form': form})


@login_required
def final_step(request):
    if request.method == 'POST':
        form = OrderCreationForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            Order.objects.filter(user=request.user, paid=False).update(paid=True)

            return render(request, 'cart/created.html', {'order': order})

    else:
        form = OrderCreationForm()
        return render(request, 'cart/created.html', {'form': form})


@login_required
def user_orders(request):
    user_id = request.user.id
    orders = Order.objects.filter(user_id=user_id).filter(paid=True)
    return orders
