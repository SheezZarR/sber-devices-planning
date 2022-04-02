from django.db import models
from django.contrib.auth.models import User
from .views import id


# Create your models here.
class TasksType(models.Model):
    task_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)


class Task(models.Model):
    ID_Task = models.AutoField(primary_key=True)
    ID_User = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_task_date = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateTimeField(auto_now=True)
    task_category = models.ForeignKey(to='TasksType', default=id(), on_delete=models.CASCADE)
    completion = models.BooleanField(default=None)


class Subtasks(models.Model):
    ID_Task = models.ForeignKey(to='Task',  on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    completion = models.BooleanField(default=None)


class LogTasks(models.Model):
    ID_Task = models.ForeignKey(to='Task', to_field='ID_Task', on_delete=models.CASCADE)
    date = models.DateTimeField()


class Habits(models.Model):
    ID_Habits = models.AutoField(primary_key=True)
    ID_User = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    creation_date = models.DateTimeField(auto_now_add=True)
    next_day_offset = models.DateTimeField()
    completion_date = models.DateTimeField()


class LogHabits(models.Model):
    ID_Habits = models.ForeignKey(to='Habits', to_field='ID_Habits', on_delete=models.CASCADE)
