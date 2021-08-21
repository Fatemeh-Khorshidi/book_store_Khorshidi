from django.db import models
from Books.models import Book
# Create your models here.
from User.models import BaseModel, Address


class Order(BaseModel):
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    # address = models.CharField(max_length=80)
    # password = models.CharField(max_length=10)
    phone = models.CharField(max_length=24, blank=True, null=True)
    email = models.EmailField()
    address = models.ForeignKey('User.Address', on_delete=models.CASCADE, null=True, related_name='useraddress')
    paid = models.BooleanField(default=False)

    class Meta:
        pass

    def __srt__(self):
        return 'Order {}'.format(self.id)

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey('Order', related_name='items', on_delete=models.PROTECT)
    book = models.ForeignKey('Books.Book', on_delete=models.DO_NOTHING, related_name='order_books')
    unit_price = models.IntegerField()
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.unit_price * self.quantity


def __srt__(self):
    return '{}'.format(self.id)
