from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Task, User
from rest_framework.response import Response
from .serializers import TaskSerializer


class TasksApiView(APIView):

    def get(self, request):
        inp = Task.objects.all()
        return Response({'Tasks': TaskSerializer(inp, many=True).data})

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({'error': 'Method PUT not allowed'})

        try:
            instance = Task.objects.get(pk=pk)
        except:
            return Response({'error': 'Object does not exist'})

        serializer = TaskSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'post':serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({'error': 'Method DELETE not allowed'})

        try:
            instance = Task.objects.get(pk=pk)
        except:
            return Response({'error': 'Object does not exist'})

        instance.delete()
        # Check delete!!!

        return Response({'post': f'Post {pk} deleted'})


def profileGetAPIresponce(request):
    data = {'get': "Всё ок"}
    return JsonResponse(data)
