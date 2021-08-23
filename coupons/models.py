from datetime import datetime

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
from coupons.managers import DiscountBaseManager
from User.models import BaseModel


class Discount(models.Model):
    """
    Base model of all type of discounts
    """
    name = models.CharField(max_length=100, null=True, blank=True)
    valid_from = models.DateTimeField(default=datetime.now)
    valid_to = models.DateTimeField(blank=True, null=True)
    num_uses = models.IntegerField(('Number of times already used'), default=0)
    active = models.BooleanField()
    objects = DiscountBaseManager()

    def __unicode__(self):
        return self.get_name()

    def get_name(self):
        return self.name

    class Meta:
        abstract = True


class Coupon(BaseModel, Discount):
    """
    discount model:
    we have 3 type of discount in this project, this is a first type: code discount
    """
    code = models.CharField(max_length=50, unique=True)
    discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'کد تخفیف '
        verbose_name_plural = 'کد های تخفیف'


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
