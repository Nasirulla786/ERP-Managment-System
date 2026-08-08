from random import choice
from django.db import models
from accounts.models import Profile

class HODProfile(models.Model):

    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
        related_name="hod_profile"
    )


    name = models.CharField(
        max_length=100
    )


    department = models.CharField(
        max_length=100
    )


    image = models.URLField()


    hod_id = models.CharField(
        max_length=50,
        unique=True
    )


    def __str__(self):
        return self.name


from django.db import models





class Subject(models.Model):

    class SubjectType(models.TextChoices):
        CORE = "core", "Core"
        ADDITIONAL = "additional" , "Additional"

    name = models.CharField(
        max_length=100
    )

    subject_code = models.CharField(
        max_length=20,
        unique=True
    )

    course = models.CharField(
        max_length=100
    )

    department = models.CharField(
        max_length=100
    )

    semester = models.PositiveIntegerField()

    total_marks = models.PositiveIntegerField(
        default=100
    )


    subject_type = models.CharField(
        max_length = 50 , choices = SubjectType.choices
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.subject_code} - {self.name}"
