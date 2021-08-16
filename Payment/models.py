from datetime import datetime
from time import timezone

from django.db import models

import User
from Books.models import *
from User.models import *

# Create your models here.
# فاکتور
from Payment.managers import DiscountBaseManager


class Invoice(models.Model):
    """
    invoice model
    """
    customer = models.ForeignKey('User.CustomUser', on_delete=models.DO_NOTHING, related_name='customer')
    invoice_date = models.DateTimeField()
    # billing_address = models.ForeignKey('User.Address', on_delete=models.CASCADE)
    total = models.BigIntegerField()
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


# مدل تخفیف
class Discount(models.Model):
    """
    discount model:
    we have 3 type of discount in this project
    """
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=30,blank=True, null=False,)
    is_active = models.BooleanField(default=True)
    valid_from = models.DateTimeField(default=datetime.now)
    valid_until = models.DateTimeField(blank=True, null=True)

    num_uses = models.IntegerField(('Number of times already used'), default=0)

    objects = DiscountBaseManager()

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name


# مدل سبد خرید
class Cart(models.Model):
    """
    Cart model:
    All books purchased by the customer
    """
    customer = models.OneToOneField('User.CustomUser', null=True, on_delete=models.CASCADE)
    books = models.ManyToManyField('Books.Book')
