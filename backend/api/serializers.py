# from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserTextInput, ModelPrediction, UserCorrection
from .models import ModelName, TaskName, DefinedUser


class ModelNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelName
        fields = ['id', 'title', 'userinputs_count']
    userinputs_count = serializers.IntegerField(
        read_only=True
    )


class TaskNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskName
        fields = ['id', 'title', 'userinputs_count']
    userinputs_count = serializers.IntegerField(
        read_only=True
    )


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id", "username", "email", "password"]
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

class DefinedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefinedUser
        fields = [
            "id", "username", "email", "password",
            "userinputs_count"
        ]
        extra_kwargs = {"password": {"write_only": True}}
    userinputs_count = serializers.IntegerField(
        read_only=True
    )


class UserTextInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTextInput
        fields = [
            'id', 'input_text', 'created_at',
            'user', 'model_name', 'task_name'
        ]
        # extra_kwargs = {'': {'read_only': True}}


class ModelPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelPrediction
        fields = [
            'id', 'input_text', 'prediction', 'created_at'
        ]


class UserCorrectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCorrection
        fields = [
            'id', 'prediction', 'correction', 'created_at'
        ]
