from django.contrib import admin

# Register your models here.
from Discount.models import Code_discount, Percentage_discount, Cash_discount

admin.site.register(Cash_discount)
admin.site.register(Percentage_discount)
admin.site.register(Code_discount)
