from django.db import models
from django.contrib.auth.models import AbstractUser


# from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.
#
class BaseModel(models.Model):
    """
    the fields of this model are in all of models
    """
    is_active = models.BooleanField(
        default=True,
        verbose_name="Active status",
        db_index=True,
        help_text="Designates whether this item should be treated as active. "
                  "Unselected this instead of deleting.",
    )
    # A timestamp representing when this object was created.
    created_time = models.DateTimeField(
        verbose_name=_("Creation On"), auto_now_add=True
    )
    # A timestamp reprensenting when this object was last updated.
    updated_time = models.DateTimeField(
        verbose_name="Modified On", auto_now=True, db_index=True
    )
    objects = models.Manager()

    class Meta:
        abstract = True


class CustomUser(AbstractUser):
    # is_staff =
    # is_superuser =
    age = models.PositiveIntegerField(null=True, blank=True)
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    # username = models.CharField(max_length=80)
    # password = models.CharField(max_length=10)
    address = models.ForeignKey('Address', on_delete=models.CASCADE)
    phone = models.CharField(max_length=24, blank=True, null=True)
    email = models.EmailField()


class CustomerProxy(CustomUser, BaseModel):
    """
    customer model:
    every users have to registers by this model fields
    """

    class Meta:
        proxy = True
        verbose_name = 'مشتری'
        verbose_name_plural = 'مشتری ها'


# str نشون بدیم
# class Customer(models.Model):
#     """
#     customer model:
#     every users have to registers by this model fields
#     """
#
#     # create at...
#     created = models.DateTimeField(auto_now_add=True)
#     # update at...
#     updated = models.DateTimeField(auto_now=True)
#
#     class Meta:
#         verbose_name = 'مشتری'
#         verbose_name_plural = 'مشتری ها'
#
#     @property
#     def full_name(self):
#         return f'{self.first_name} {self.last_name}'
#
#     def status(self):
#         # آیا مشتری لاگین است یا خیر
#         pass
#
#     def __str__(self):
#         return f'{self.full_name}'


class AdminProxy(CustomUser, BaseModel):
    name = models.CharField(max_length=40)

    class Meta:
        proxy = True
        verbose_name = 'ادمین'
        # verbose_name_plural = 'کارمندان'


class EmployeeProxy(CustomUser, BaseModel):
    """
    Employee model:

    """
    name = models.CharField(max_length=40)

    class Meta:
        proxy = True
        verbose_name = 'کارمند'
        verbose_name_plural = 'کارمندان'


class Address(models.Model):
    """
    address model: all customer have on or more address
    """
    # abstract nabasheeee, In Line
    address = models.CharField(max_length=70)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=40, blank=True, null=True)
    country = models.CharField(max_length=40, blank=True, null=True)
    postal_code = models.CharField(max_length=10)
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)

    # class Meta:
    #     abstract = True

    def __str__(self):
        return f'{self.address} in {self.city} city'
