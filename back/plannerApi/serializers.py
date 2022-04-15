from rest_framework import serializers
from .models import *


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TaskTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasksType
        fields = "__all__"


class SubtasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtasks
        fields = "__all__"


class LogTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogTasks
        fields = "__all__"


class LogHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogHabits
        fields = "__all__"


class HabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits
        fields = "__all__"



