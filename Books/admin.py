from django.contrib import admin

# Register your models here.
from Books.models import *
from Payment.models import *
from User.models import *


admin.site.register(Book)
admin.site.register(Category)
admin.site.register(Invoice)
admin.site.register(InvoiceLine)
admin.site.register(Discount)
admin.site.register(Cart)
admin.site.register(Customer)
admin.site.register(Boss)
admin.site.register(Employee)
