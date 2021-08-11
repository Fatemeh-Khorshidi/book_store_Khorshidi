from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=40)
    category = models.ForeignKey('Category', on_delete=models.DO_NOTHING)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    publish_year = models.DateTimeField('publish_year', null=True)
    image = models.ImageField(upload_to='books/', blank=True)
    book_info = models.TextField('book information', null=True, blank=True)
    inventory = models.IntegerField()
    # create at...
    created = models.DateTimeField(auto_now_add=True)
    # update at...
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} '

class Category(models.Model):
    name = models.CharField(max_length=200)