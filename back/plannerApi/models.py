from django.db import models
from django.contrib.auth.models import User


# Gives default ID to .models.Task.Task_category
def id():
    if TasksType.objects.all():
        return TasksType.objects.all()[0]
    else:
        return 1


class TasksType(models.Model):
    task = models.AutoField(primary_key=True)
    User = models.ForeignKey(to=User, default=None, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)


class Task(models.Model):
    Task = models.AutoField(primary_key=True)
    sber_user_id = models.CharField(max_length=255, default="")
    title = models.CharField(max_length=255)
    description = models.TextField(default=None, null=True)
    start_task_date = models.DateField(auto_now_add=True)
    completion_date = models.DateField(default=None, null=True)
    task_category = models.ForeignKey(to='TasksType', default=None, null=True, on_delete=models.CASCADE, related_name='type_task')
    completion = models.BooleanField(default=None)


class Subtasks(models.Model):
    Task = models.ForeignKey(to='Task', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    completion = models.BooleanField(default=None)


class LogTasks(models.Model):
    Task = models.ForeignKey(to='Task', to_field='Task', on_delete=models.CASCADE)
    date = models.DateTimeField()


class Habits(models.Model):
    Habits = models.AutoField(primary_key=True)
    User = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    creation_date = models.DateTimeField(auto_now_add=True)
    next_day_offset = models.DateTimeField()
    completion_date = models.DateTimeField()


class LogHabits(models.Model):
    Habits = models.ForeignKey(to='Habits', to_field='Habits', on_delete=models.CASCADE)
    date = models.DateTimeField(default=None)


# Check date in LogHabits
# В типе задач нам нужно запизнуть юзера