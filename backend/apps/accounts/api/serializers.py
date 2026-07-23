from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.accounts.services.auth_service import create_user

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
        ]

    def create(self, validated_data):
        return create_user(**validated_data)