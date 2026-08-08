from rest_framework import serializers
from django.contrib.auth.models import User
from . models import Profile


class RoleSerlizer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id","role" ]



class CurrentUserSerializer(serializers.ModelSerializer):
    user_profile = RoleSerlizer(read_only=True)
    class Meta:
        model = User
        fields = ["id","username","email" ,"first_name" , "user_profile"]
