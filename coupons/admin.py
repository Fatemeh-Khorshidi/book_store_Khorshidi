from django.contrib import admin
from .models import Coupon
from coupons.models import Coupon, Percentage_discount, Cash_discount


# Register your models here.

class CouponAdmin(admin.ModelAdmin):
    list_display = ['name','num_uses','active',  'code', 'valid_from', 'valid_to', 'discount']
    search_fields = ['code']


admin.site.register(Coupon, CouponAdmin)

admin.site.register(Cash_discount)
admin.site.register(Percentage_discount)
