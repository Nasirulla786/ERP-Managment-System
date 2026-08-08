from rest_framework import serializers
from .models import HODProfile , Subject
from student.serializer import ProfileSerilzer


class HODProfileSerializer(serializers.ModelSerializer):

    profile = ProfileSerilzer(read_only=True)

    class Meta:
        model = HODProfile

        fields = [
            "id",
            "name",
            "hod_id",
            "image",
            "department",
            "profile"
        ]



class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = [
            "id",
            "name",
            "subject_code",
            "course",
            "department",
            "semester",
            "total_marks",
            "subject_type",
        ]
