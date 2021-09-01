from django.contrib import admin
from django.utils.html import format_html

import Books
from Books.models import *


class MyModelAdmin(admin.ModelAdmin):
    # برای ایجاد ستون کاستوم

    @admin.display(description='edit')
    def edit_btn(self, obj):
        return format_html(
            '<span class="button">edit</span>'
        )

    # فیلتر مرتب سازی بر اساس تعداد
    date_hierarchy = 'created_time'

    # نمایش ستون های دلخواه در ادمین

    list_display = ('title', 'author', 'category', 'price', 'image', 'inventory', 'created_time','edit_btn')

    # لینک دار شدن ستون جهت رفتن به صفحه ادیت
    list_display_links = ('edit_btn',)
    list_editable = ('price', 'category')
    search_fields = ('title', 'author', 'percentage_discount', 'cash_sale')

    list_filter = ('percentage_discount', 'cash_sale')

    save_on_top = True


admin.site.register(Book, MyModelAdmin)


# class CategoryInline(admin.StackedInline):
#     model = Book.category_set.related.through


class MyCategoryModelAdmin(admin.ModelAdmin):

    @admin.display(description='edit')
    def edit_btn(self, obj):
        return format_html(
            '<span class="button">edit</span>'
        )

    list_display = ('name', 'edit_btn')
    list_display_links = ('edit_btn',)
    list_editable = ['name']
    search_fields = ['name']
    list_filter = ['name']
    # Inlines = [CategoryInline]


admin.site.register(Category, MyCategoryModelAdmin)
