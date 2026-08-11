from django.urls import path
from .views import CreateFacultyProfile , GetCurrentFaculty, UpdateSubject , MyStudents , GetMyDepartmentSubjects , CreateAttendance , GetAttendance , AttendanceHistory

urlpatterns = [
    path("faculty-profile/", CreateFacultyProfile.as_view()),
    path("get-current-faculty/" ,GetCurrentFaculty.as_view() , name="current_faculty"),
    path("assigned-subject/<int:id>/" , UpdateSubject.as_view() ),
    path("my-students/" ,MyStudents.as_view() ),
       path(
        "get-dep-subjects/",
        GetMyDepartmentSubjects.as_view()
    ),
    path("mark-attendance/", CreateAttendance.as_view()),
    path("get-attendance/<str:subject>/" ,GetAttendance.as_view()),
    path("attendance-history/" ,AttendanceHistory.as_view()),

]
