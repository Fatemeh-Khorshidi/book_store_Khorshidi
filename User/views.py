from django.shortcuts import render, get_object_or_404

# Create your views here.
# from User.forms import UserForm
# from User.models import Customer
from django.urls import reverse_lazy
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



class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'