from rest_framework import serializers
from .models import StudentProfile
from accounts.models import Profile
from django.contrib.auth.models  import User



class UserSerlizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username" ,"email" ]

class ProfileSerilzer(serializers.ModelSerializer):
    user = UserSerlizer(read_only=True)
    class Meta:
        model  = Profile
        fields = ["role" , "user"]


class StudentProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerilzer(read_only=True)
    class Meta:
        model = StudentProfile
        fields = [
            "id",
            "enrollment_no",
            "phone",
            "date_of_birth",
            "course",
            "department",
            "semester",
            "admission_date",
            "image",
            "profile"
        ]
