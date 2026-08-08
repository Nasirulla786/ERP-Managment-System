from rest_framework import serializers
from .models import Attendance, FacultyProfile
from student.serializer import ProfileSerilzer, StudentProfileSerializer


class FacultyProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerilzer(read_only=True)
    class Meta:
        model = FacultyProfile
        fields = [
            "id",
            "name",
            "faculty_id",
            "image",
            "salary",
            "interested_subject",
            "profile",
             "department",
             "assigned_subject"

        ]



class AttendanceSerialize(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["id" ,"student","subject" ,"date" ,"is_present"]
