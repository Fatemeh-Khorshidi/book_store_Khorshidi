from django.contrib import admin
from django.utils.html import format_html

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['book']


class OrderAdmin(admin.ModelAdmin):
    date_hierarchy = 'created'
    list_display = ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'paid', 'created']
    list_filter = ['paid', 'created', 'updated']
    search_fields = ('title', 'author', 'percentage_discount', 'cash_sale')
    inlines = [OrderItemInline]
    save_on_top = True


admin.site.register(Order, OrderAdmin)
