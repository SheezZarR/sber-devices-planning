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


# Gives default ID to planerApi.models.Task.Task_category
def id():
    return 1
