from django.db import models
from accounts.models import Profile
from student.models import StudentProfile


class FacultyProfile(models.Model):

    profile = models.OneToOneField(
        Profile,
        on_delete=models.CASCADE,
        related_name="faculty_profile"
    )

    department = models.CharField(
        max_length=100,
        null=True
    )


    name = models.CharField(
        max_length=100
    )

    faculty_id = models.CharField(
        max_length=50,
        unique=True
    )

    image = models.URLField()

    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    interested_subject = models.CharField(
        max_length=100
    )

    assigned_subject = models.CharField(
        max_length=100,null=True , blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


class Attendance(models.Model):

    student = models.ForeignKey(StudentProfile , on_delete=models.CASCADE , related_name="student_attendance")

    subject = models.CharField(max_length=100)
    date = models.DateField()
    is_present = models.BooleanField(max_length=20  )
