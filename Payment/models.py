from datetime import datetime
from decimal import Decimal
from time import timezone

from django.db import models
from Discount.models import Code_discount
import User
from Books.models import *
from User.models import *

# Create your models here.
# فاکتور
class Invoice(models.Model):
    """
    invoice model
    """
    CHOICE_FIELDS = [(0,'سفارش'),(1,'ثبت سفارش')]
    customer = models.ForeignKey('User.CustomUser', on_delete=models.DO_NOTHING, related_name='customer')
    invoice_date = models.DateTimeField()
    # billing_address = models.ForeignKey('User.Address', on_delete=models.CASCADE)
    total = models.BigIntegerField()
    status = models.IntegerField(choices=CHOICE_FIELDS)
    code_sale = models.ForeignKey('Discount.Code_discount' , on_delete=models.DO_NOTHING, null=True, blank=True, related_name='code_sale')
    # create at...
    # created = models.DateTimeField(auto_now_add=True, default=timezone.now)
    # update at...
    # updated = models.DateTimeField(auto_now=True)
    # status

    class Meta:
        verbose_name = 'ٌصورت حساب'
        verbose_name_plural = 'صورت حساب ها'

    def order(self):
        pass
        # if state = 'سفارش'
        # else:
        #     state = 'ثبت'

    # def get_total_cost(self):
    #     total_cost =  sum(item.get_cost() for item in self.items.all())
    #     return total_cost - total_cost * (self.discount/Decimal('100'))

class InvoiceLine(models.Model):
    """
    invoiceline model
    """
    invoice = models.ForeignKey('Invoice', on_delete=models.PROTECT, related_name='invoice')
    book = models.ForeignKey('Books.Book', on_delete=models.DO_NOTHING, related_name='book')
    unit_price = models.IntegerField()
    count = models.IntegerField()

    class Meta:
        verbose_name = ''
        verbose_name_plural = ''






# مدل سبد خرید
class Cart(models.Model):
    """
    Cart model:
    All books purchased by the customer
    """
    customer = models.OneToOneField('User.CustomUser', null=True, on_delete=models.CASCADE)
    books = models.ManyToManyField('Books.Book')
