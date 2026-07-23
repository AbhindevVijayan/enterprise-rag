from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import DocumentUploadSerializer


class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentUploadSerializer
    permission_classes = [IsAuthenticated]