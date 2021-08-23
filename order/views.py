from django.shortcuts import render
from .models import OrderItem
from .forms import OrderCreationForm
from cart.cart import Cart
# Create your views here.


def order_create(request):
    cart = Cart(request)
    if request.method=='POST':
        form = OrderCreationForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
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
                # launch asynchronous task
                # order_created.delay(order.id)

                return render(request, 'create.html', {'order':order})
    else:
        form = OrderCreationForm()
        return render(request, 'create.html', {'form': form})


def final_step(request) :
    if request.method=='POST':
        form = OrderCreationForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            return render(request, 'created.html', {'order':order,'form':form})

    else:
        form = OrderCreationForm()
        return render(request, 'created.html', {'form':form})
