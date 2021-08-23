from decimal import Decimal

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from coupons.models import Coupon
from Books.models import Book


# Create your models here.


class Order(models.Model):
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    # address = models.CharField(max_length=80)
    # password = models.CharField(max_length=10)
    phone = models.CharField(max_length=24, blank=True, null=True)
    email = models.EmailField()
    address = models.CharField(max_length=24, blank=True, null=True)
    paid = models.BooleanField(default=False)
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)
    coupon = models.ForeignKey(Coupon, related_name='orders' , null=True, blank=True , on_delete=models.DO_NOTHING)
    discount= models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], null=True)


    class Meta:
        ordering = ('-created',)

    def __srt__(self):
        return 'Order {}'.format(self.id)

    def get_total_cost(self):
        total_cost =  sum(item.get_cost() for item in self.items.all())
        return total_cost - total_cost *(self.discount / Decimal('100'))

class OrderItem(models.Model):
    order = models.ForeignKey('Order', related_name='items', on_delete=models.PROTECT)
    book = models.ForeignKey('Books.Book', on_delete=models.DO_NOTHING, related_name='order_books')
    unit_price = models.IntegerField()
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.unit_price * self.quantity

    def __srt__(self):
        return '{}'.format(self.id)


from django.db import models

# Create your models here.
