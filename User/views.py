from django.views.generic import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views.generic import UpdateView, CreateView
from Books.forms import AddBookForm, AddCategoryForm, EditBookForm
from Books.models import Book
from order.models import Order
from .models import CustomerProxy, CustomUser, Address
from .decorators import *
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy, reverse
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.urls import reverse_lazy
from .forms import CustomUserCreationForm, UserProfileEdite, AddAddressForm, CustomUserChangeForm
# Email Authentication
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from .utils import generate_token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib import messages

import threading


# --------------------> customer profile  <--------------------
# @allowed_users(allowed_roles=['customer'])
class UserEditView(UpdateView):
    """
    user can edit profile and submit new infos
    and add new address
    see orders
    """
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
        context['parches'] = Order.objects.filter(paid='True')
        context['orders'] = Order.objects.filter(paid='False')
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


class RegistrationView(View):
    """
    custom register view for send authentication email to customer
    """
    def get(self, request):
        form_class = CustomUserCreationForm
        return render(request, 'registration/signup.html', {'form': form_class})

    def post(self, request):
        form_class = CustomUserCreationForm
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password1']

        context = {
            'fieldValues': request.POST
        }

        if not CustomUser.objects.filter(username=username).exists():
            if not CustomUser.objects.filter(email=email).exists():
                if len(password) < 6:
                    messages.error(request, 'Password too short')
                    return render(request, 'registration/signup.html', context)

                user = CustomUser.objects.create_user(username=username, email=email)
                user.set_password(password)
                user.is_active = False
                user.save()
                current_site = get_current_site(request)
                email_body = {
                    'user': user,
                    'domain': current_site.domain,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': generate_token.make_token(user),
                }

                link = reverse('activate', kwargs={
                    'uidb64': email_body['uid'], 'token': email_body['token']})

                email_subject = 'Activate your account'

                activate_url = 'http://' + current_site.domain + link

                email = EmailMessage(
                    email_subject,
                    'Hi ' + user.username + ', Please the link below to activate your account \n' + activate_url,
                    'noreply@semycolon.com',
                    [email],
                )
                email.send(fail_silently=False)
                messages.success(request, 'Account successfully created')
                return redirect('login')

        return redirect('login')


class SetNewPasswordView(View):
    def get(self, request, uidb64, token):
        context = {
            'uidb64': uidb64,
            'token': token
        }

        try:
            user_id = force_text(urlsafe_base64_decode(uidb64))

            user = CustomUser.objects.get(pk=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                messages.info(
                    request, 'Password reset link, is invalid, please request a new one')
                return render(request, 'registration/password_reset_confirm.html')

        except DjangoUnicodeDecodeError as identifier:
            messages.success(
                request, 'Invalid link')
            return render(request, 'registration/password_reset_confirm.html')

        return render(request, 'registration/password_reset_confirm.html', context)

    def post(self, request, uidb64, token):
        context = {
            'uidb64': uidb64,
            'token': token,
            'has_error': False
        }

        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        if len(password) < 6:
            messages.add_message(request, messages.ERROR,
                                 'passwords should be at least 6 characters long')
            context['has_error'] = True
        if password != password2:
            messages.add_message(request, messages.ERROR,
                                 'passwords don`t match')
            context['has_error'] = True

        if context['has_error'] == True:
            return render(request, 'registration/password_reset_confirm.html', context)

        try:
            user_id = force_text(urlsafe_base64_decode(uidb64))

            user = CustomUser.objects.get(pk=user_id)
            user.set_password(password)
            user.save()

            messages.success(
                request, 'Password reset success, you can login with new password')

            return redirect('login')

        except DjangoUnicodeDecodeError as identifier:
            messages.error(request, 'Something went wrong')
            return render(request, 'registration/password_reset_confirm.html', context)

        # return render(request, 'registration/password_reset_confirm.html', context)


class LoginView(View):
    def get(self, request):
        return render(request, 'registration/login.html')

    def post(self, request):
        context = {
            'data': request.POST,
            'has_error': False
        }
        email = request.POST.get('email')
        password = request.POST.get('password')
        if email == '':
            messages.add_message(request, messages.ERROR,
                                 'email is required')
            context['has_error'] = True
        if password == '':
            messages.add_message(request, messages.ERROR,
                                 'Password is required')
            context['has_error'] = True
        user = authenticate(request, username=email, password=password)

        if not user and not context['has_error']:
            messages.add_message(request, messages.ERROR, 'Invalid login')
            context['has_error'] = True

        if context['has_error']:
            return render(request, 'registration/login.html', status=401, context=context)
        login(request, user)
        return redirect('home')


class VerificationView(View):
    def get(self, request, uidb64, token):
        try:
            id = force_text(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=id)

            if not generate_token.check_token(user, token):
                return redirect('login' + '?message=' + 'User already activated')

            if user.is_active:
                return redirect('login')
            user.is_active = True
            user.save()

            messages.success(request, 'Account activated successfully')
            return redirect('login')

        except Exception as ex:
            pass

        return redirect('login')


# --------------------> admin panel  <--------------------
@login_required(login_url='login')
@allowed_users(allowed_roles=['admin'])
def Dashboard(request):
    """
    custom admin panel
    :param request:
    :return:
    """
    orders = Order.objects.all()
    customers = CustomerProxy.objects.filter(is_staff='False', is_superuser='False').count()
    unavailable_Books = Book.objects.filter(inventory='0').count()
    all_books = Book.objects.all().count()
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
               'unavailable_Books': unavailable_Books,
               'all_books': all_books,
               'category_form': category_form,
               'Books': Books,
               'form': form,
               # 'EditForm':EditForm,
               'confirm': confirm,

               }

    return render(request, 'AdminPanel/dashboard.html', context)


class BookUpdateView(UpdateView):
    model = Book
    fields = ('title', 'author', 'category', 'price', 'image', 'inventory', 'book_info',)
    template_name = 'AdminPanel/edit_book.html'


# --------------------> staff panel  <--------------------

@login_required(login_url='login')
@allowed_users(allowed_roles=['staff'])
def StaffDashboard(request):
    """
    custom staff panel
    staff can add, edit and delete books
    and add categories
    :param request:
    :return:
    """
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
        'category_form': category_form,
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

# --------------------> Reset Password  <--------------------
