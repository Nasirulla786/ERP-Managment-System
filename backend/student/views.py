from django.contrib.auth.decorators import permission_required
from django.http import response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

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
