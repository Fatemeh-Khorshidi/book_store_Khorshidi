from django.contrib import admin
from .models import Coupon
from coupons.models import Coupon, Percentage_discount, Cash_discount


# Register your models here.

class CouponAdmin(admin.ModelAdmin):
    date_hierarchy = 'valid_to'
    list_display = ['name', 'num_uses', 'active', 'code', 'valid_from', 'valid_to', 'discount']
    search_fields = ['code']
    list_editable = ('code', 'num_uses', 'valid_from', 'valid_to', 'discount')
    list_filter = ['active']
    save_on_top = True


admin.site.register(Coupon, CouponAdmin)


class CashDiscountAdmin(admin.ModelAdmin):
    date_hierarchy = 'valid_to'
    list_display = ['name', 'num_uses', 'active', 'amount', 'valid_from', 'valid_to']
    search_fields = ['amount']
    list_editable = ('amount', 'num_uses', 'valid_from', 'valid_to')
    list_filter = ['active']
    save_on_top = True


admin.site.register(Cash_discount, CashDiscountAdmin)


class PercentageDiscountAdmin(admin.ModelAdmin):
    date_hierarchy = 'valid_to'
    list_display = ['name', 'num_uses', 'active', 'percentage', 'valid_from', 'valid_to']
    search_fields = ['percentage']
    list_editable = ('percentage', 'num_uses', 'valid_from', 'valid_to')
    list_filter = ['active']
    save_on_top = True


admin.site.register(Percentage_discount, PercentageDiscountAdmin)
