from django.shortcuts import render, redirect

from Book_Store_DjangoPrj import settings
from User.models import Address
from .models import OrderItem, Order
from .forms import OrderCreationForm
from cart.cart import Cart
from django.contrib.auth.decorators import login_required


# Create your views here.

@login_required(login_url='/users/login/')
def order_create(request):
    cart = Cart(request)
    if request.method == 'POST':
        # form = OrderCreationForm(request.POST)
        address = Address.objects.filter(user=request.user, default=True)
        user_id = request.user.id
        order = Order.objects.create(user_id=user_id, full_name='Full_name', address=address,
                                     phone='phone')
        # if form.is_valid():
        #     order = form.save(commit=False)
        if cart.coupon:
            order.coupon = cart.coupon
            order.discount = cart.coupon.discount
        order.save()
        for item in cart:
            OrderItem.objects.create(order=order,
                                     book=item['book'],
                                     price=item['price'],
                                     quantity=item['quantity'])

        # clear the cart
        cart.clear()
        # save to db
        request.session['order_id'] = order.id

        return render(request, 'cart/create.html', {'order': order})

    # form = OrderCreationForm()
    return render(request, 'cart/create.html', {})


@login_required
def final_step(request):
    if request.method == 'POST':
        # form = OrderCreationForm(request.POST)
        # if form.is_valid():
        # ---------------------------------------------------------
        address = Address.objects.filter(user=request.user, default=True)
        user_id = request.user.id
        order = Order.objects.create(user_id=user_id, full_name='Full_name', address=address,
                                     phone='phone')
        # order_id = order.pk

        # for item in cart:
        #     OrderItem.objects.create(user_id=user_id, full_name='Full_name', address=address,
        #                              phone='phone', order_id=order_id, product=item['product'], price=item['price'],
        #                              quantity=item['qty'])
        # ---------------------------------------------------------
        # order = form.save(commit=False)
        Order.objects.filter(user=request.user, paid=False).update(paid=True)
        return render(request, 'cart/created.html', {'order': order, })

    else:
        form = OrderCreationForm()
        return render(request, 'cart/created.html', {'form': form})


