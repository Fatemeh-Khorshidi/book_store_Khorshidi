from django.contrib import admin
from .models import Order,OrderItem
# Register your models here.


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['book']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id','first_name' , 'last_name', 'email', 'address']
    list_filter = ['paid']
    inlines = [OrderItemInline]


admin.site.register(Order,OrderAdmin)