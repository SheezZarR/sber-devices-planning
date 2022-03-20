from django.urls import path
from . import views

urlpatterns = [
    path('api/tasks/get', views.tasksGetAPIresponce, name='get_tasks'),
    path('api/tasks/put', views.tasksPutAPIresponce, name='put_tasks'),
    path('api/tasks/post', views.tasksPostAPIresponce, name='post_tasks'),
    path('api/tasks/delete', views.tasksDeleteAPIresponce, name='delete_tasks'),
    path('api/profile/get', views.profileGetAPIresponce, name='get_profile')
]
