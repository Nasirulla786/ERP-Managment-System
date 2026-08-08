from django.urls import path
from . import views

urlpatterns = [
    path("student-profile/" , views.CreateStudentProfile.as_view() , name="student_profile"),
    path("get-current-student/" , views.GetCurrentStudent.as_view() , name="current_student")

]
