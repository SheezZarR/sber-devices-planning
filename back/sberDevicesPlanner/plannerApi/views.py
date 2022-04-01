from django.shortcuts import render
from django.http import JsonResponse


def tasksGetAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)


def tasksPutAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)


def tasksPostAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)


def tasksDeleteAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)


def profileGetAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)


# Gives ID in table, when delete(plannerApi.Task.task_category.on_delete)
def id():
    return 1
