from rest_framework import serializers
from .models import Attendance, FacultyProfile
from student.serializer import ProfileSerilzer, StudentProfileSerializer
from student.models import StudentProfile


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
    student = serializers.PrimaryKeyRelatedField(queryset=StudentProfile.objects.all())

    class Meta:
        model = Attendance
        fields = ["id", "student", "subject", "date", "is_present"]

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['student'] = StudentProfileSerializer(instance.student).data
    #     return data
