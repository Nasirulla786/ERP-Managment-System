from django.urls import path
from .views import CreateHODProfile, CreateSubject , GetCurrentHOD, GetSubjects, MyFaculty, MyStudents


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

]
