from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.Serializer):
    ID_Task_id = serializers.IntegerField()
    ID_User_id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(default=None)
    start_task_date = serializers.DateTimeField(read_only=True)
    completion_date = serializers.DateTimeField()
    task_category = serializers.IntegerField()
    completion = serializers.BooleanField(default=None)

    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ID_Task_id = validated_data.get("ID_Task_id", instance.ID_Task_id)
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.start_task_date = validated_data.get("start_task_date", instance.start_task_date)
        instance.completion_date = validated_data.get("completion_date", instance.completion_date)
        instance.task_category = validated_data.get("task_category", instance.task_category)
        instance.completion = validated_data.get("completion", instance.complcompletionetion)
        instance.save()
        return instance