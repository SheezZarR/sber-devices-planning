# Generated by Django 4.0.3 on 2022-04-01 15:33

from django.db import migrations, models
import django.db.models.deletion
import plannerApi.views


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Habits',
            fields=[
                ('ID_Habits', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('next_day_offset', models.DateTimeField()),
                ('completion_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='TasksType',
            fields=[
                ('task_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('ID_Task', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('start_task_date', models.DateTimeField(auto_now_add=True)),
                ('completion_date', models.DateTimeField(auto_now=True)),
                ('completion', models.BooleanField(default=None)),
                ('subtask', models.BooleanField()),
                ('ID_User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plannerApi.user')),
                ('task_category', models.ForeignKey(default=None, on_delete=models.SET(plannerApi.views.id), to='plannerApi.taskstype')),
            ],
        ),
        migrations.CreateModel(
            name='Subtasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('completion', models.BooleanField(default=None)),
                ('ID_Task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plannerApi.task')),
            ],
        ),
        migrations.CreateModel(
            name='LogTasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('ID_Task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plannerApi.task')),
            ],
        ),
        migrations.CreateModel(
            name='LogHabits',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ID_Habits', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plannerApi.habits')),
            ],
        ),
        migrations.AddField(
            model_name='habits',
            name='ID_User',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plannerApi.user'),
        ),
    ]
