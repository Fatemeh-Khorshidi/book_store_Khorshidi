from django.db import models
from coupons.models import Percentage_discount,Cash_discount

# Create your models here.
from User.models import BaseModel


class Book(BaseModel):
    """
    book model
    """
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=40)
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING, related_name='category')
    # داده های مالی
    price = models.PositiveBigIntegerField(default=0)
    # new_price = models.PositiveBigIntegerField(default=0,null=True, blank=True )
    publish_year = models.DateTimeField(null=True, blank=True)
    image = models.ImageField(upload_to="media/")
    book_info = models.TextField(null=True, blank=True)
    inventory = models.IntegerField(default=0)

    percentage_discount = models.ForeignKey('coupons.Percentage_discount', on_delete=models.DO_NOTHING, null=True, blank=True,
                                            related_name='percentage_discount')
    cash_sale = models.ForeignKey('coupons.Cash_discount', on_delete=models.DO_NOTHING, null=True, blank=True,
                                  related_name='cash_sale')

    class Meta:
        verbose_name = 'کتاب'
        verbose_name_plural = 'کتاب ها'
    @property
    def have_discount(self):
        if self.percentage_discount == 'Null' and self.percentage_discount == 'Null':
            return False
        return True


    def Percentage_sale(self):
        """
        Calculate cost with the percentage discount
        """
        if self.cash_sale:
            new_price = self.price - self.cash_sale.amount
            return new_price
        elif self.percentage_discount:
            new_price = int(self.price * (100 - self.percentage_discount.percentage)/ 100)
            return new_price



    def __str__(self):
        return f'{self.title} '

    def have_inventory(self):
        return int(self.inventory)


class Category(models.Model):
    """
    category model
    """
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'

    def __str__(self):
        return f'{self.name} '
