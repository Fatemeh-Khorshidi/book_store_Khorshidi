# Generated by Django 3.2.4 on 2021-08-30 11:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ('-created',), 'verbose_name': 'سفارش', 'verbose_name_plural': 'سفارشات'},
        ),
    ]
