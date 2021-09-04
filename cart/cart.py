from decimal import Decimal
from django.conf import settings
from django.http import HttpResponse

from Books.models import Book
from coupons.models import Coupon


class Cart(object):

    def __init__(self, request):
        """
        Initialize the cart.
        :param request:
        """
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in the session
            cart = self.session[settings.CART_SESSION_ID] = {}

        self.cart = cart
        self.coupon_id = self.session.get('coupon_id')

    def __len__(self):
        """
        count all items in the cart.
        :return:
        """
        return sum(item['quantity'] for item in self.cart.values())

    def __iter__(self):
        """
        Iterate over the items in the cart and get the books from the database.
        :return:
        """
        book_id = self.cart.keys()
        # get the book objects and add them to the cart
        books = Book.objects.filter(id__in=book_id)
        for book in books:
            self.cart[str(book.id)]['book'] = book
        for item in self.cart.values():
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['quantity']

            yield item

    def add(self, book, quantity=1, update_quantity=False):
        """
        Add a book to the cart or update its count.
        :param book:
        :param count:
        :param update_count:
        :return:
        """
        # books= Book.objects.get(book.id)
        # print(books)
        # book_id = self.cart.keys()
        book_id = str(book.id)
        if book_id not in self.cart:
            # if books.inventory >0:
            self.cart[book_id] = {'quantity': 0,
                                  'price': str(book.price)}
            # else:
            # return HttpResponse("کتاب مورد نظر موجود نیست")
        if update_quantity:
            # if books.inventory > 0:
            self.cart[book_id]['quantity'] = quantity

        else:
            # if books.inventory > 0:
            self.cart[book_id]['quantity'] += quantity

        book.inventory = book.inventory - self.cart[book_id]['quantity']
        book.save()
        self.save()

    def remove(self, book):
        """
        Remove a book from the cart
        """
        # book_id = self.cart.keys()
        book_id = str(book.id)
        if book_id in self.cart:
            del self.cart[book_id]
            self.save()

    def save(self):
        # update the session cart
        self.session[settings.CART_SESSION_ID] = self.cart
        # mark the session as "modified" to make sure it is saved
        self.session.modified = True

    def clear(self):
        # Remove basket from session
        del self.session[settings.BASKET_SESSION_ID]
        self.session.modified = True
        self.save()

    # def clear(self):
    #     # empty cart
    #     self.session[settings.CART_SESSION_ID] = {}
    #     self.session.modified = True

    def get_total_price(self):
        return sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values())

    @property
    def coupon(self):
        if self.coupon_id:
            return Coupon.objects.get(id=self.coupon_id)
        return None

    def get_discount(self):
        if self.coupon:
            return (self.coupon.discount / Decimal('100')) * self.get_total_price()
        return Decimal('0')

    def get_total_price_after_discount(self):
        return self.get_total_price() - self.get_discount()
