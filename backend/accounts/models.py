from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Profile(models.Model):

    class RoleChoices(models.TextChoices):
        STUDENT = 'student' , 'Student'
        FACULTY = 'faculty' , 'Faculty'
        HOD = 'hod' , 'Hod'

    user = models.OneToOneField(User, on_delete=models.CASCADE , related_name = "user_profile")
    role = models.CharField(max_length=30 , choices = RoleChoices.choices)
