from decimal import Decimal
from coupons.models import Coupon
from Books.models import Book
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Order(models.Model):
    """
    Order model
    """
    user = models.ForeignKey('User.CustomUser', on_delete=models.CASCADE, null=True, related_name='order_user')
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    # address = models.CharField(max_length=80)
    # password = models.CharField(max_length=10)
    phone = models.CharField(max_length=24, blank=True, null=True)
    email = models.EmailField()
    address = models.ForeignKey('User.Address', on_delete=models.CASCADE, null=True, related_name='order_address')
    paid = models.BooleanField(default=False)
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)
    # total_paid = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    coupon = models.ForeignKey(Coupon, related_name='orders', null=True, blank=True, on_delete=models.DO_NOTHING)
    discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], null=True)

    class Meta:
        ordering = ('-created',)
        verbose_name = 'سفارش'
        verbose_name_plural = 'سفارشات'

    def __srt__(self):
        return 'Order {}'.format(self.id)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_total_cost(self):
        total_cost = sum(item.get_cost() for item in self.items.all())
        return total_cost - total_cost * (self.discount / Decimal('100'))


class OrderItem(models.Model):
    """
    OrderItem model
    """
    order = models.ForeignKey('Order', related_name='items', on_delete=models.PROTECT)
    book = models.ForeignKey('Books.Book', on_delete=models.DO_NOTHING, related_name='order_books')
    unit_price = models.IntegerField()
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.unit_price * self.quantity

    def __srt__(self):
        return '{}'.format(self.id)
