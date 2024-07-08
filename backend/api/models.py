from django.db import models
# from django.contrib.auth.models import User


# Create your models here.
# user model  already provided by django

class DefinedUser(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

class ModelName(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class TaskName(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

# user input model
class UserTextInput(models.Model):
    user = models.ForeignKey(
        # User, on_delete=models.DO_NOTHING
        DefinedUser, on_delete=models.DO_NOTHING
        # default="Nolan"
    )
    input_text = models.TextField()
    model_name = models.ForeignKey(
        ModelName, on_delete=models.DO_NOTHING
        # default=
    )
    task_name = models.ForeignKey(
        TaskName, on_delete=models.DO_NOTHING
        # default="task1"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.input_text[:20]
    

# prediction model
class ModelPrediction(models.Model):
    input_text = models.ForeignKey(
        UserTextInput, on_delete=models.DO_NOTHING
    )
    prediction = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)


class UserCorrection(models.Model):
    prediction = models.OneToOneField(ModelPrediction, on_delete=models.CASCADE)
    correction = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
