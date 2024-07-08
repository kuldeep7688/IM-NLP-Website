from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users),
    path('textinputs/', views.text_input_list),
    path('modelnames/', views.get_model_names),
    path('tasknames/', views.get_task_names),
    path('savemodelprediction/', views.save_model_prediction),

]