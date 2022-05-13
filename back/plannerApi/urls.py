from django.urls import path, include
from . import views

from rest_framework import routers

user_router = routers.SimpleRouter()
user_router.register(r'user', views.UserViewSet)

task_router = routers.SimpleRouter()
task_router.register(r'tasks', views.TaskViewset)

task_type_router = routers.SimpleRouter()
task_type_router.register(r'task_type', views.TasksTypeViewset)

subtasks_router = routers.SimpleRouter()
subtasks_router.register(r'subtasks', views.SubtasksViewset)

log_tasks_router = routers.SimpleRouter()
log_tasks_router.register(r'log_tasks', views.LogTasksViewset)

log_habits_router = routers.SimpleRouter()
log_habits_router.register(r'log_habits', views.LogHabitsViewset)

habits_router = routers.SimpleRouter()
habits_router.register(r'habits', views.HabitsViewset)

urlpatterns = [
    path('api/', include(user_router.urls)),
    path('api/', include(task_router.urls)),
    path('api/', include(task_type_router.urls)),
    path('api/', include(subtasks_router.urls)),
    path('api/', include(log_tasks_router.urls)),
    path('api/', include(log_habits_router.urls)),
    path('api/', include(habits_router.urls)),
    # path('api/tasks/', views.TasksApiView.as_view(), name='get_tasks'),
    # path('api/tasks/', views.TasksApiView.as_view(), name='post_tasks'),
    # path('api/tasks/', views.TasksApiView.as_view(), name='delete_tasks'),
    # path('api/profile/get', views.profileGetAPIresponce, name='get_profile'),
    # path('api/user/', views.UserGiveAllAPIView.as_view(), name='all_users'),
    # path('api/tasks/<int:pk>/', views.TasksApiView.as_view(), name='put_delete_tasks'), #Check Num5 9:12
    # path('api/user/<int:pk>/', views.UserApiView.as_view(), name='put_delete_user'),

]
