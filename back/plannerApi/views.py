import calendar
import locale

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *

locale.setlocale(locale.LC_TIME, 'ru_RU')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def rebuild_sber_user_id(broken_id: str) -> str:
    repaired_id = ""

    for i in broken_id.split(' '):
        repaired_id += f"{i}+"

    repaired_id = repaired_id[:-1]

    return repaired_id


class TaskDictTimeQueryset(APIView):

    def get(self, request):
        tasks_by_date = None
        task_amount = 0

        if 'sber_user_id' in request.GET and request.GET['sber_user_id'] != "null":
            sber_user_id = rebuild_sber_user_id(request.GET['sber_user_id'])
            tasks_by_user = Task.objects.filter(sber_user_id=sber_user_id)
            task_amount = len(list(tasks_by_user))

            if 'isCompleted' in request.GET:
                tasks_by_date = tasks_by_user.filter(completion=request.GET['isCompleted']).order_by('completion_date')

                if 'date' in request.GET:
                    tasks_by_date = tasks_by_date.filter(completion_date=request.GET['date'])

                if 'date_start_range' in request.GET and 'date_end_range' in request.GET:
                    tasks_by_date = tasks_by_date.filter(completion_date__range=(
                            request.GET['date_start_range'],
                            request.GET['date_end_range']
                        )
                    )

            else:
                return Response(data={"task_amount": task_amount, "tasks": []}, status=200)

            if not list(tasks_by_user):
                return Response(data={"task_amount": task_amount, "tasks": []}, status=200)

            distinct_dates = tasks_by_date.values('completion_date').distinct().order_by('completion_date')

            lookup_dates = []
            month_dict = dict((index, month) for index, month in enumerate(calendar.month_name) if month)

            for date in distinct_dates:
                tmp_date = str(date['completion_date']).rsplit(' ')[0]
                date_split = tmp_date.split('-')
                if not date_split[0] == 'None':
                    lookup_dates.append({"year": date_split[0], "month": date_split[1], "day": date_split[2]})

            tasks_grouped_by_date = []
            tasks_group = []
            if 'isCompleted' in request.GET:
                query_set_filtered = Task.objects.filter(
                    sber_user_id=sber_user_id,
                    completion_date=None,
                    completion=request.GET['isCompleted']
                )

                if query_set_filtered:
                    for item in query_set_filtered:
                        tasks_group.append(TaskSerializer(item).data)

                    tasks_grouped_by_date.append({
                        "date": "Без даты",
                        "tasks": tasks_group
                    })

            for date in lookup_dates:
                tasks_group = []
                query_set_filtered = tasks_by_date.filter(
                    completion_date__year=date['year'],
                    completion_date__month=date['month'],
                    completion_date__day=date['day']
                )

                for item in query_set_filtered:
                    tasks_group.append(TaskSerializer(item).data)

                date_str = f"{date['day']} {month_dict[int(date['month'])]} {date['year']}"
                tasks_grouped_by_date.append({
                    "date": date_str,
                    "tasks": tasks_group
                })

            return Response(data={"task_amount": task_amount, "tasks": tasks_grouped_by_date}, status=200)

        return Response(data={"task_amount": task_amount, "tasks": []}, status=403)


class TaskViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer



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
