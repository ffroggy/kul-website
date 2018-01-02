from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('ajax/skill/<str:skill_id>', views.ajax_skill),
    path('ajax/project/<str:proj_id>', views.ajax_project),
]
