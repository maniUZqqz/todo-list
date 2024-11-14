from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('add-task/', views.add_task, name='add_task'),
    path('edit-task/<int:task_id>/', views.edit_task, name='edit_task'),
    path('delete-task/<int:task_id>/', views.delete_task, name='delete_task'),
    path('toggle-complete/<int:task_id>/', views.toggle_complete, name='toggle_complete'),

]