from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views.generic import UpdateView, CreateView

from Books.forms import AddBookForm, AddCategoryForm, EditBookForm
from Books.models import Book
from order.models import Order
from . import forms
from .models import CustomerProxy, CustomUser, Address
from .decorators import *
from django.urls import reverse_lazy, reverse
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.urls import reverse_lazy
from .forms import CustomUserCreationForm, UserProfileEdite, AddAddressForm, CustomUserChangeForm


# --------------------> customer profile  <--------------------
# @allowed_users(allowed_roles=['customer'])
class UserEditView(UpdateView):
    model = CustomUser
    form_class = CustomUserChangeForm
    success_url = reverse_lazy('profile')
    template_name = 'profile/profile.html'

    def get_object(self, queryset=None):
        # print("-------->",self.request.user)
        return get_object_or_404(self.model, pk=self.request.user.id)

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(UserEditView, self).get_context_data(**kwargs)
        user = self.request.user
        context['data'] = get_object_or_404(CustomUser, email=user.email)
        # context['parches'] = Order.objects.filter(paid='True')
        # context['orders'] = Order.objects.filter(paid='False')
        context['addresses'] = Address.objects.filter(user_id=user.id)
        # print(context('orders'))
        return context

    def get_success_url(self):
        return reverse('UserEditView', kwargs={
            'pk': self.request.user.id,
        })

    def get(self, request, *args, **kwargs):
        self.referer = request.META.get("HTTP_REFERER", "")
        request.session["login_referer"] = self.referer
        return super().get(request, *args, **kwargs)


class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


# --------------------> admin panel  <--------------------

@login_required(login_url='login')
@allowed_users(allowed_roles=['admin'])
def Dashboard(request ):
    orders = Order.objects.all()
    customers = CustomerProxy.objects.filter(is_staff='False', is_superuser = 'False').count()
    unavailable_Books = Book.objects.filter(inventory='0').count()
    all_books =Book.objects.all().count()
    Books = Book.objects.all()
    total_orders = orders.count()
    solds = orders.filter(paid='True')
    pending = orders.filter(paid='False')
    # current_book = Book.objects.get(id = )
    category_form = AddCategoryForm(request.POST or None)
    form = AddBookForm(request.POST or None)
    confirm = False
    # book = get_object_or_404(Book, id = book.id)
    # EditForm = EditBookForm(instance=book)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            confirm = True

        if category_form.is_valid():
            category_form.save()
            confirm = True

        # EditForm = EditBookForm(request.POST, instance=book)

        # if form.is_valid():
        #     EditForm.save()

    context = {'orders': orders,
               'customers': customers,
               'total_orders': total_orders,
               'solds': solds,
               'pending': pending,
               'unavailable_Books':unavailable_Books,
               'all_books':all_books,
               'category_form': category_form,
               'Books': Books,
               'form': form,
               # 'EditForm':EditForm,
               'confirm': confirm,

               }

    return render(request, 'AdminPanel/dashboard.html', context)

class BookUpdateView(UpdateView):
    model = Book
    fields = ('title', 'author', 'category', 'price', 'image', 'inventory','book_info',)
    template_name ='AdminPanel/edit_book.html'
# --------------------> staff panel  <--------------------

@login_required(login_url='login')
@allowed_users(allowed_roles=['staff'])
def StaffDashboard(request, id):
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
        'unavailable_Books': unavailable_Books,
        'num_books': num_books,
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


# --------------------> Addresses  <--------------------
@login_required
def view_address(request):
    addresses = Address.objects.filter(user=request.user)
    return render(request, "profile/addresses.html", {"addresses": addresses})


@login_required
def add_address(request):
    if request.method == "POST":
        address_form = AddAddressForm(data=request.POST)
        if address_form.is_valid():
            address_form = address_form.save(commit=False)
            address_form.user = request.user
            address_form.save()
            return HttpResponseRedirect(reverse("addresses"))
    else:
        address_form = AddAddressForm()
    return render(request, "profile/edit_addresses.html", {"form": address_form})


@login_required
def edit_address(request, id):
    if request.method == "POST":
        address = Address.objects.get(pk=id, user=request.user)
        address_form = AddAddressForm(instance=address, data=request.POST)
        if address_form.is_valid():
            address_form.save()
            return HttpResponseRedirect(reverse("addresses"))
    else:
        address = Address.objects.get(pk=id, user=request.user)
        address_form = AddAddressForm(instance=address)
    return render(request, "profile/edit_addresses.html", {"form": address_form})


@login_required
def delete_address(request, id):
    address = Address.objects.filter(pk=id, user=request.user).delete()
    return redirect("addresses")


@login_required
def set_default(request, id):
    Address.objects.filter(user=request.user, default=True).update(default=False)
    Address.objects.filter(pk=id, user=request.user).update(default=True)
    return redirect("addresses")
