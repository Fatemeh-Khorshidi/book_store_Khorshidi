from django.shortcuts import render
from .models import OrderItem
from .forms import OrderCreationForm
from Cart.cart import Cart
# Create your views here.


def order_create(request):
    cart = Cart(request)
    if request.method=='POST':
        form = OrderCreationForm(request.POST)
        if form.is_valid():
            order = form.save()
            if cart.discount:
                order.coupon = cart.discount
                order.discount = cart.discount.discount
                order.save()
            for item in cart:
                OrderItem.objects.create(order=order,
                                         book=item['book'],
                                         price=item['price'],
                                         quantity=item['quantity'])

                # clear the cart
                cart.clear()
                # launch asynchronous task
                # order_created.delay(order.id)
                return render(request, 'create.html', {'order':order})
    else:
        form = OrderCreationForm()