from django.contrib import admin

# Register your models here.
from Books.models import *
# from Payment.models import *
from User.models import *


admin.site.register(Book)
admin.site.register(Category)
# admin.site.register(Invoice)
# admin.site.register(InvoiceLine)
# admin.site.register(Cart)
