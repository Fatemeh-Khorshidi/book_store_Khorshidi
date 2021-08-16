from django.db import models


# Create your models here.
from User.models import BaseModel


class Book(BaseModel):
    """
    book model
    """
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=40)
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING, related_name='category')
    #داده های مالی
    price = models.PositiveBigIntegerField(default=0)
    publish_year = models.DateTimeField(null=True, blank=False)
    image = models.ImageField(upload_to='media/', blank=True)
    book_info = models.TextField(null=True, blank=True)
    inventory = models.IntegerField(default=0)
    # create at...
    # created = models.DateTimeField(auto_now_add=True)
    # update at...
    # updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'کتاب'
        verbose_name_plural = 'کتاب ها'

    def __str__(self):
        return f'{self.title} '


class Category(models.Model):
    """
    category model
    """
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'
