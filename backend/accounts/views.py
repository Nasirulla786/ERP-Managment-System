from logging import exception
from django.contrib.auth.decorators import permission_required
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializer import CurrentUserSerializer , RoleSerlizer
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from django.contrib.auth import login

class RegisterView(APIView):
    def post(self , request):
        username = request.data.get("username")
        password = request.data.get("password")
        email  =  request.data.get("email")

        if not username or not email or not password:
            return Response({"message":"Require all fields"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response(
                {"message":"Username already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"message":"Email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )


        user = User.objects.create_user(
            username = username,
            password = password,
            email = email
        )



        response = Response({"message":"register Successfully"} ,status=status.HTTP_201_CREATED)

        refresh = RefreshToken.for_user(user)

        response.set_cookie(
            key="access",
            value=str(refresh.access_token),
            httponly=True,
        )

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
        )

        return response







class LoginView(APIView):
    def post(self , request):
        username = request.data.get("username")
        password = request.data.get("password")


        if not username or not password:
            return Response(
                {
                    "message": "Username and password required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        alreadyUser = User.objects.filter(username=username).first()
        print(alreadyUser)
        if  alreadyUser is None:
              return Response(
                {
                    "message": "User does not exits"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username , password = password)
        if user is None:
               return Response(
                {
                    "message": "Invalid credentials"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        response = Response({"message":"Login Successfully"} , status= status.HTTP_200_OK)

        refresh = RefreshToken.for_user(user)

        response.set_cookie(
            key="access",
            value=str(refresh.access_token),
            httponly=True,
        )

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
        )

        return response




class CurrentUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self , request):
        user = request.user
        serialize = CurrentUserSerializer(user)
        return Response({"user":serialize.data})



class ProfileView(APIView):
    def post(self , request):
        try:
            role = request.data.get("role")
            if role not in ["student", "faculty", "hod"]:
                return Response(
                    {"message": "Invalid role"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            profile = Profile.objects.create(
                role = role,
                user = request.user
            )

            serialize = RoleSerlizer(profile)

            return Response({"data":serialize.data} , status = status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"message":"Internal server error"})
