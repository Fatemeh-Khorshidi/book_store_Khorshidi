from datetime import datetime

from django.db import models

# Create your models here.
from Discount.managers import DiscountBaseManager
from User.models import BaseModel


class Discount(models.Model):
    """
    Base model of all type of discounts
    """
    name = models.CharField(max_length=100, null=True, blank=True)
    valid_from = models.DateTimeField(default=datetime.now)
    valid_until = models.DateTimeField(blank=True, null=True)
    num_uses = models.IntegerField(('Number of times already used'), default=0)

    objects = DiscountBaseManager()

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name

    class Meta:
        abstract = True


class Cash_discount(BaseModel, Discount):
    """
    discount model:
    we have 3 type of discount in this project, this is a first type: cash discount
    """
    amount = models.PositiveBigIntegerField(default=0)

    class Meta:
        verbose_name = 'تخفیف نقدی'
        verbose_name_plural = 'تخفیفات نقدی'


class Percentage_discount(BaseModel, Discount):
    """
    discount model:
    we have 3 type of discount in this project, this is a first type: percentage discount
    """
    percentage = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'تخفیف درصدی'
        verbose_name_plural = 'تخفیفات درصدی'


class Code_discount(BaseModel, Discount):
    """
    discount model:
    we have 3 type of discount in this project, this is a first type: code discount
    """
    code = models.CharField(max_length=30, blank=True, null=False, )
    percentage = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'کد تخفیف '
        # verbose_name_plural = 'تخفیفات '
