from datetime import datetime

from django.db import models

# Create your models here.
# فاکتور
from Payment.managers import DiscountBaseManager


class Invoice(models.Model):
    customer = models.ForeignKey('Books', on_delete=models.DO_NOTHING, related_name='invoices')
    invoice_date = models.DateTimeField()
    billing_address = models.ForeignKey('Address', on_delete=models.CASCADE)
    total = models.BigIntegerField()

    def order(self):
        pass
        # if state = 'سفارش'
        # else:
        #     state = 'ثبت'

class InvoiceLine(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.PROTECT)
    book = models.ForeignKey('Books', on_delete=models.DO_NOTHING)
    unit_price = models.IntegerField()
    count = models.IntegerField()


# مدل تخفیف
class Discount(models.Model):
    name = models.CharField( max_length=100)
    code = models.CharField( max_length=30,
                            blank=True, null=False,
                           )
    is_active = models.BooleanField(default=True)
    valid_from = models.DateTimeField(default=datetime.now)
    valid_until = models.DateTimeField( blank=True, null=True)

    num_uses = models.IntegerField(_('Number of times already used'),
                                   default=0)

    objects = DiscountBaseManager()

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name


# مدل سبد خرید
class Cart(models.Model):
    customer = models.OneToOneField('Customer', null=True, on_delete=models.CASCADE)
    books = models.ManyToManyField('Book')