

from django.shortcuts import render
from django.utils import timezone

from .models import *
from .forms import CouponApplyForm
# Create your views here.


def coupon_apply(request):
    now = timezone.now()
    form = CouponApplyForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            code = form.cleaned_data['Code_discount']
            try:
                discount = Code_discount.objects.get(code__iexact=code,
                                                     valid_from__lte=now,
                                                     valid_to__gte=now
                                                     )
                request.session['code_discount_id']= discount.id
            except Cash_discount.DoesNotExist:
                request.session['code_discount_id']= None
        return credits('Cart')

