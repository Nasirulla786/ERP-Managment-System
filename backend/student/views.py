from django.contrib.auth.decorators import permission_required
from django.http import response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

from faculty.serializer import AttendanceSerialize
from faculty.models import Attendance
from hod.models import Subject
from hod.serializer import SubjectSerializer
from utils import upload_image
from .serializer import StudentProfileSerializer
from .models import StudentProfile



class CreateStudentProfile(APIView):
    def post(self,request):
        profile = request.user.user_profile

        data = request.data.dict()
        image = request.FILES.get("image")

        image_url = None
        if image:
            image_url = upload_image(image)
            data["image"] = image_url

        serializer = StudentProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save(profile = profile)
            return Response(
                    {
                        "message":"Student profile created",
                        "data":serializer.data
                    },
                    status=201
                )
        else:
            return Response(
                    {
                        "message":serializer.error_messages

                    },
                    status=400
                )

        return Response(
            serializer.errors,
            status=400
        )



class GetCurrentStudent(APIView):
    def get(self , request):
        profile = request.user.user_profile
        student = StudentProfile.objects.get(profile = profile)
        serializer = StudentProfileSerializer(student)

        return Response(
                    {
                        "data":serializer.data
                    },
                    status=201
                )



class MySubjects(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        student = StudentProfile.objects.get(
            profile=request.user.user_profile
        )

        subjects = Subject.objects.filter(
            department=student.department
        ).order_by("-created_at")

        serializer = SubjectSerializer(
            subjects,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class MyAttendance(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        student = StudentProfile.objects.get(
            profile=request.user.user_profile
        )

        attendance = Attendance.objects.filter(
            student=student
        ).order_by("-date")

        serializer = AttendanceSerialize(
            attendance,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
