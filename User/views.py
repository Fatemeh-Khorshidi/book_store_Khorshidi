from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404

from Books.forms import AddBookForm, AddCategoryForm
from Books.models import Book
from order.models import Order
from .models import CustomerProxy
from .decorators import *
# Create your views here.
# from User.forms import UserForm
# from User.models import Customer
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView
from .forms import CustomUserCreationForm

# def profileView(request):
#     """
#     each user can see her/his profile
#     """
#     # data = Customer.objects.get(user=request.user)
#     data = get_object_or_404(Customer, username=request.user)
#     context = {'username': data.username, 'full_name': data.full_name, 'email': data.email, 'phone': data.phone}
#     return render(request, 'profile.html', context)


# def profileEdit(request):
#     """
#         each user can edit her/his profile
#     """
#     if request.method == 'POST':
#         form = UserForm(request.POST)
#         if form.is_valid():
#             form.save()
#         else:
#             return render(request, 'profile_edit.html')
#     else:
#         form = UserForm()
#         return render(request, 'profile_edit.html', {'form': form})


from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from .forms import CustomUserCreationForm


class SignUpView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

@login_required(login_url='login')
@allowed_users(allowed_roles=['admin'])
def Dashboard(request):
    orders = Order.objects.all()
    customers = CustomerProxy.objects.all()

    total_customers = customers.count()
    total_orders = orders.count()
    solds = orders.filter(paid='True')
    pending = orders.filter(paid='False')
    context = {'orders': orders, 'customers': customers, 'total_customers': total_customers,
               'total_orders': total_orders, 'solds': solds, 'pending': pending}

    return render(request, 'AdminPanel/dashboard.html', context)

@login_required(login_url='login')
# @allowed_users(allowed_roles=['staff'])
def StaffDashboard(request):
    unavailable_Books = Book.objects.filter(inventory='0').count()
    category_form = AddCategoryForm(request.POST or None)
    Books = Book.objects.all()
    num_books = Books.count()
    form = AddBookForm(request.POST or None)
    confirm = False

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            confirm = True

        if category_form.is_valid():
            category_form.save()
            confirm = True

    context = {
        'category_form':category_form,
        'unavailable_Books':unavailable_Books,
        'num_books':num_books,
        'Books': Books,
        'form': form,
        'confirm': confirm,
    }

    return render(request, 'AdminPanel/staff_dashboard.html', context)


def delete(request, id):
    if Book.objects.filter(id=id).delete():

        return redirect(reverse('StaffDashboard'))
    else:
        return HttpResponse("You are not allowed to access this resource")


def UserProfile(request):
    pass