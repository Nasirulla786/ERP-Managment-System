from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from student.serializer import StudentProfileSerializer
from student.models import StudentProfile
from faculty.serializer import FacultyProfileSerializer
from utils import upload_image

from .models import HODProfile, Subject
from .serializer import HODProfileSerializer, SubjectSerializer
from faculty.models import FacultyProfile



class CreateHODProfile(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request):

        data = request.data.copy()

        image = request.FILES.get("image")


        if image:
            image_url = upload_image(image)
            data["image"] = image_url



        serializer = HODProfileSerializer(
            data=data
        )


        if serializer.is_valid():

            serializer.save(
                profile=request.user.user_profile
            )


            return Response(
                {
                    "message":"HOD profile created successfully",
                    "data":serializer.data
                },
                status=201
            )


        return Response(
            serializer.errors,
            status=400
        )



class GetCurrentHOD(APIView):
    def get(self , request):
        profile = request.user.user_profile

        HOD = HODProfile.objects.get(profile = profile)

        faculty = FacultyProfile.objects.filter(
                department=HOD.department
            )
        students = StudentProfile.objects.filter(department = HOD.department)

        facultyCount = faculty.count()
        studentCount = students.count()


        if not HOD:
            return Response({"message":"You should have Profile"})
        serializer = HODProfileSerializer(HOD)

        return Response(
                    {
                        "data":serializer.data,
                        "facultyCount":facultyCount,
                        "studentCount":studentCount
                    },
                    status=201
                )




class MyFaculty(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            hod = HODProfile.objects.get(profile=request.user.user_profile)

            faculty = FacultyProfile.objects.filter(
                department=hod.department
            )

            serializer = FacultyProfileSerializer(faculty, many=True)

            return Response(serializer.data, status=200)

        except HODProfile.DoesNotExist:
            return Response(
                {"message": "HOD profile not found"},
                status=404
            )

class MyStudents(APIView):
    def get(self , request):
        hod = HODProfile.objects.get(profile = request.user.user_profile)

        students = StudentProfile.objects.filter(department = hod.department)
        serialize = StudentProfileSerializer(students , many=True)
        return Response(serialize.data, status=200)







class CreateSubject(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.user.user_profile.role != "hod":
            return Response(
                {
                    "message": "Only HOD can create subject."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        data = request.data

        serializer = SubjectSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Subject created successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )




class GetSubjects(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        hod = HODProfile.objects.get(profile = request.user.user_profile)

        subjects = Subject.objects.filter(department=hod.department).order_by("-created_at")

        serializer = SubjectSerializer(
            subjects,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
