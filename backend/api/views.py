from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserTextInput, ModelPrediction, UserCorrection, DefinedUser, ModelName, TaskName
# from .serializers import UserSerializer
from .serializers import DefinedUserSerializer, UserTextInputSerializer
from .serializers import ModelPredictionSerializer, UserCorrectionSerializer
from .serializers import  ModelNameSerializer, TaskNameSerializer
# Create your views here.


# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]


# @api_view(["GET", "POST"])
# def get_users(request):
#     queryset = DefinedUser.objects.all()
#     serialized = DefinedUserSerializer(
#         queryset, many=True,
#         context={
#             'request': request
#         }
#     )
#     return Response(serialized.data)


class UserViewSet(ModelViewSet):
    queryset = DefinedUser.objects.annotate(
        userinputs_count=Count('userinputs')
    )
    serializer_class = DefinedUserSerializer

    def get_serializer_context(self):
        return {"request": self.request}


# @api_view()
# def get_model_names(request):
#     queryset = ModelName.objects.all()
#     serialized = ModelNameSerializer(
#         queryset, many=True,
#         context={
#             'request': request
#         }
#     )
#     return Response(serialized.data)

# @api_view()
# def get_task_names(request):
#     queryset = TaskName.objects.all()
#     serialized = TaskNameSerializer(
#         queryset, many=True,
#         context={
#             'request': request
#         }
#     )
#     return Response(serialized.data)


class ModelNameViewSet(ModelViewSet):
    queryset = ModelName.objects.annotate(
        userinputs_count=Count('userinputs')
    )
    serializer_class = ModelNameSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class TaskNameViewSet(ModelViewSet):
    queryset = TaskName.objects.annotate(
        userinputs_count=Count('userinputs')
    )
    serializer_class = TaskNameSerializer

    def get_serializer_context(self):
        return {"request": self.request}


# @api_view(["GET", 'POST'])
# def text_input_list(request):
#     if request.method == "GET":
#         queryset = UserTextInput.objects.all()
#         serialized = UserTextInputSerializer(
#             queryset, many=True,
#             context={'request': request}
#         )
#         return Response(serialized.data)
#     elif request.method == "POST":
#         serializer = UserTextInputSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         print(serializer.data['id'])
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserInputViewSet(ModelViewSet):
    queryset = UserTextInput.objects.all()
    serializer_class = UserTextInputSerializer


# @api_view(["POST"])
# def save_model_prediction(request):
#     serializer = ModelPredictionSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     serializer.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)

class SaveModelPredictionView(ModelNameViewSet):
    queryset = ModelPrediction.objects.all()
    serializer_class = ModelPredictionSerializer
