# Generated by Django 5.0.7 on 2024-11-14 20:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='completed',
            new_name='is_completed',
        ),
    ]
