from django.utils import timezone
from time import timezone
from django.contrib.auth.models import User
from rest_framework.views import APIView, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



from hod.models import Subject
from hod.serializer import SubjectSerializer
from student.models import StudentProfile
from student.serializer import StudentProfileSerializer
from .models import Attendance, FacultyProfile
from utils import upload_image
from .serializer import AttendanceSerialize, FacultyProfileSerializer


class CreateFacultyProfile(APIView):
    def post(self, request):
        data = request.data.copy()
        image = request.FILES.get("image")
        image_url = None
        if image:
            image_url = upload_image(image)
            data["image"] = image_url
        serialize = FacultyProfileSerializer(data = data)
        if serialize.is_valid():
            serialize.save(profile = request.user.user_profile)
            return Response(
                {
                    "message": "Faculty profile created successfully",
                    "data": serialize.data
                },
                status=201
            )

        print(serialize.errors)




class GetCurrentFaculty(APIView):
    def get(self , request):
        profile = request.user.user_profile
        student = FacultyProfile.objects.get(profile = profile)
        serializer = FacultyProfileSerializer(student)

        return Response(
                    {
                        "data":serializer.data
                    },
                    status=201
                )




class UpdateSubject(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):

        print(id)

        subject = request.data.get("subject")
        print(subject)

        if not subject:
            return Response(
                {
                    "message": "Subject is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            faculty = FacultyProfile.objects.get(id=id)
            print(faculty)

        except FacultyProfile.DoesNotExist:
            return Response(
                {
                    "message": "Faculty not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        faculty.assigned_subject = subject
        faculty.save()

        return Response(
            {
                "message": "Subject assigned successfully",
                "data": {
                    "id": faculty.id,
                    "name": faculty.name,
                    "assigned_subject": faculty.assigned_subject
                }
            },
            status=status.HTTP_200_OK
        )




class MyStudents(APIView):
    def get(self , request):
        faculty = FacultyProfile.objects.get(profile = request.user.user_profile)

        students = StudentProfile.objects.filter(department = faculty.department)
        serialize = StudentProfileSerializer(students , many=True)
        return Response(serialize.data, status=200)



class GetMyDepartmentSubjects(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        hod = FacultyProfile.objects.get(profile = request.user.user_profile)

        subjects = Subject.objects.filter(department=hod.department).order_by("-created_at")

        serializer = SubjectSerializer(
            subjects,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class CreateAttendance(APIView):

    def post(self, request):

        print(request.data)

        serializer = AttendanceSerialize(
            data=request.data,
            many=True
        )
        # print(serializer)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Attendance marked successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            print(serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class GetAttendance(APIView):
    def get(self , request , subject):
        date = request.GET.get("date")
        myAttendance = Attendance.objects.filter(subject=subject ,date=date)
        serialize = AttendanceSerialize(myAttendance , many=True)
        return Response(
            serialize.data,
        )



class AttendanceHistory(APIView):

    def get(self, request):

        attendance = Attendance.objects.all().order_by("-date")

        serializer = AttendanceSerialize(
            attendance,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
