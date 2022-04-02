from django.urls import path
from . import views

urlpatterns = [
    path('api/tasks/', views.TasksApiView.as_view(), name='get_tasks'),
    path('api/tasks/', views.TasksApiView.as_view(), name='post_tasks'),
    path('api/tasks/', views.TasksApiView.as_view(), name='delete_tasks'),
    path('api/profile/get', views.profileGetAPIresponce, name='get_profile'),
    path('api/tasks/<int:pk>/', views.TasksApiView.as_view(), name='put_delete_tasks') #Check Num5 9:12
]
