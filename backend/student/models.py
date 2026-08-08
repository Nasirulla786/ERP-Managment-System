from secrets import choice
from django.db import models
from accounts.models import Profile


class StudentProfile(models.Model):
    profile = models.OneToOneField(Profile , on_delete=models.CASCADE , related_name="student_profile")


    image = models.URLField()


    enrollment_no = models.CharField(
        max_length=50,
        unique=True
    )

    phone = models.CharField(
        max_length=10,
        blank=True
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True
    )

    course = models.CharField(
        max_length=100
    )

    department = models.CharField(
        max_length=100
    )

    semester = models.PositiveIntegerField()

    admission_date = models.DateField(
        auto_now_add=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.enrollment_no}"




