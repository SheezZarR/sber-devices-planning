# Generated by Django 4.0.4 on 2022-06-09 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plannerApi', '0002_task_task_category_taskstype_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='User',
        ),
        migrations.AddField(
            model_name='task',
            name='sber_user_id',
            field=models.CharField(default='', max_length=255),
        ),
    ]
