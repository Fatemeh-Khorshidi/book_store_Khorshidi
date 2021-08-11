from django.db import models

# Create your models here.

class Address(models.Model):
    class Meta:
        abstract = True
    address= models.CharField(max_length=70)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=40, blank=True, null=True)
    country = models.CharField(max_length=40, blank=True, null=True)
    postal_code = models.CharField(max_length=10)
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.address} in {self.city} city'


class Customer(Address):
    first_name = models.CharField(max_length=40 ,blank=True, null=True)
    last_name = models.CharField(max_length=20 ,blank=True, null=True)
    username = models.CharField(max_length=80)
    password = models.CharField(max_length=10)
    address = models.ForeignKey('Address' , on_delete=models.CASCADE)
    phone = models.CharField(max_length=24, blank=True, null=True)
    email = models.EmailField()
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def status(self):
        # آیا مشتری لاگین است یا خیر
        pass

    def login(self):
        pass

    def forget_password(self):
        pass

    def __str__(self):
        return f'{self.full_name}'




class Boss(models.Model):
    name = models.CharField(max_length=40)

class Employee(models.Model):
    name = models.CharField(max_length=40)
