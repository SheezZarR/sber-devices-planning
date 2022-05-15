from django.forms import model_to_dict
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListCreateAPIView
from .models import *
from rest_framework.response import Response
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TaskViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        temp = Task.objects.all().order_by('completion_date')
        temp_set = set()
        for item in temp:
            # tmp_date = item.completion_date..split('T')[0]
            # tmp_date = tmp_date.split('-')
            temp_set.add("tmp_date")

        t_dict = dict()
        for item in temp_set:
            t_dict[item] = list(temp.filter(completion_date=item))
        return (t_dict)


class TasksTypeViewset(viewsets.ModelViewSet):
    queryset = TasksType.objects.all()
    serializer_class = TaskTypeSerializer



class SubtasksViewset(viewsets.ModelViewSet):
    queryset = Subtasks.objects.all()
    serializer_class = SubtasksSerializer


class LogTasksViewset(viewsets.ModelViewSet):
    queryset = LogTasks.objects.all()
    serializer_class = LogTasksSerializer


class LogHabitsViewset(viewsets.ModelViewSet):
    queryset = LogHabits.objects.all()
    serializer_class = LogHabitsSerializer


class HabitsViewset(viewsets.ModelViewSet):
    queryset = Habits.objects.all()
    serializer_class = HabitsSerializer


# class UserGiveAllAPIView(ListCreateAPIView):
#
#
#
# class UserApiView(RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
# class TasksApiView(APIView):
#
#     def get(self, request):
#         inp = Task.objects.all()
#         return Response({'Tasks': TaskSerializer(inp, many=True).data})
#
#     def post(self, request):
#         serializer = TaskSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post': serializer.data})
#
#     def put(self, request, *args, **kwargs):
#         pk = kwargs.get("pk", None)
#         if not pk:
#             return Response({'error': 'Method PUT not allowed'})
#
#         try:
#             instance = Task.objects.get(pk=pk)
#         except:
#             return Response({'error': 'Object does not exist'})
#
#         serializer = TaskSerializer(data=request.data, instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post':serializer.data})
#
#     def delete(self, request, *args, **kwargs):
#         pk = kwargs.get("pk", None)
#         if not pk:
#             return Response({'error': 'Method DELETE not allowed'})
#
#         try:
#             instance = Task.objects.get(pk=pk)
#         except:
#             return Response({'error': 'Object does not exist'})
#
#         instance.delete()
#         # Check delete!!!
#
#         return Response({'post': f'Post {pk} deleted'})
#
#
# def profileGetAPIresponce(request):
#     data = {'get': "Всё ок"}
#     return JsonResponse(data)

# Category_task Для делета параметр new_cat = None  и рассмотреть 2 сценария
