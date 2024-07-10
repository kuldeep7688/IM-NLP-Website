from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

router.register(
    r'users', views.UserViewSet, basename='users'
)
router.register(
    r'textinputs', views.UserInputViewSet, basename='usertextinputs'
)
router.register(
    r'modelnames', views.ModelNameViewSet
)
router.register(
    r'tasknames', views.TaskNameViewSet
)
router.register(
    r'modelprediction', views.ModelPredictionView,
    basename='modelprediction'
)
router.register(
    r'usercorrection', views.UserCorrectionView,
    basename='usercorrection'
)

# print(router.urls)
urlpatterns = router.urls

# urlpatterns = [
#     path('users/', views.get_users),
#     path('textinputs/', views.text_input_list),
#     path('modelnames/', views.ModelNameViewSet.as_view({'get': 'list', 'p'}), name='models-detail'),
#     path('tasknames/', views.TaskNameViewSet.as_view({'get': 'list'}), name='task_details'),
#     path('savemodelprediction/', views.save_model_prediction),

# ]
