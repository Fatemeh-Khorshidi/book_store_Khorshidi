# Generated by Django 3.2.4 on 2021-08-17 14:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'دسته بندی',
                'verbose_name_plural': 'دسته بندی ها',
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(db_index=True, default=True, help_text='Designates whether this item should be treated as active. Unselected this instead of deleting.', verbose_name='Active status')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='Creation On')),
                ('updated_time', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Modified On')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=40)),
                ('price', models.PositiveBigIntegerField(default=0)),
                ('publish_year', models.DateTimeField(null=True)),
                ('image', models.ImageField(blank=True, upload_to='media/')),
                ('book_info', models.TextField(blank=True, null=True)),
                ('inventory', models.IntegerField(default=0)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='category', to='Books.category')),
            ],
            options={
                'verbose_name': 'کتاب',
                'verbose_name_plural': 'کتاب ها',
            },
        ),
    ]
