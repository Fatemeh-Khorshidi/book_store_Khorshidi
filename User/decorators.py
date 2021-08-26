from django.http import HttpResponse
from django.shortcuts import redirect


# https://www.youtube.com/watch?v=eBsc65jTKvw


def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)

    return wrapper_func


def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *wargs, **kwargs):
            Users = request.user
            group = None
            # staff = Users.objects.filter(is_staff=True)
            # if request.user.groups.exists():
            if request.user.is_staff == True and request.user.is_superuser == True :
                user = 'admin'

            elif request.user.is_staff == True and request.user.is_superuser == False :
                user = 'staff'

            else:
                user = 'customer'

            if user in allowed_roles :

                return view_func(request, *wargs, **kwargs)
            else:
                return HttpResponse("کاربر عزیز، با عرض پوزش؛ شما اجازه دسترسی به این بخش را ندارید.")
            # return view_func(request, *wargs, **kwargs)
        return wrapper_func

    return decorator
