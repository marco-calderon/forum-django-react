# Generated by Django 3.1.5 on 2021-01-28 02:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forumapp', '0010_activity_type_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='activity',
            old_name='type',
            new_name='model',
        ),
        migrations.RenameField(
            model_name='activity',
            old_name='type_id',
            new_name='model_id',
        ),
    ]
