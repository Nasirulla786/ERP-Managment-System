from django.urls import path
from .views import CreateDepartmentNotice, CreateHODProfile, CreateSubject, CreateTimetable, DeleteTimetable, DepartmentTimetable , GetCurrentHOD, GetDepartmentNotices, GetSubjects, MyFaculty, MyStudents


urlpatterns = [

    path("hod-profile/",CreateHODProfile.as_view()),
    path("get-current-hod/" , GetCurrentHOD.as_view()),
    path("get-my-faculties/",MyFaculty.as_view() ),
    path("get-my-students/",MyStudents.as_view()),
       path(
        "create-subject/",
        CreateSubject.as_view()
    ),
      path(
        "get-subjects/",
        GetSubjects.as_view()
    ),
       path(
        "create-department-notice/",
        CreateDepartmentNotice.as_view()
    ),

    path(
        "department-notices/",
        GetDepartmentNotices.as_view()
    ),

    path(
    "create-timetable/",
    CreateTimetable.as_view()
),

path(
    "department-timetable/",
    DepartmentTimetable.as_view()
),
path(
    "timetable/<int:id>/",
    DeleteTimetable.as_view()
),

]
