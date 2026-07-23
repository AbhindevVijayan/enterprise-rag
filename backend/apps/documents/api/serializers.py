from rest_framework import serializers
from apps.documents.models import Document


class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            "id",
            "title",
            "file",
            "file_size",
            "content_type",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "file_size",
            "content_type",
            "status",
            "created_at",
        ]

    def create(self, validated_data):
        uploaded_file = validated_data["file"]

        return Document.objects.create(
            owner=self.context["request"].user,
            title=validated_data["title"],
            file=uploaded_file,
            file_size=uploaded_file.size,
            content_type=uploaded_file.content_type,
        )
        