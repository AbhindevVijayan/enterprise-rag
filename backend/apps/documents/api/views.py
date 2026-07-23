from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from .serializers import (
    DocumentUploadRequestSerializer,
    DocumentSerializer,
)


@extend_schema(
    request=DocumentUploadRequestSerializer,
    responses=DocumentSerializer,
)
class DocumentUploadView(generics.CreateAPIView):
    serializer_class = DocumentUploadRequestSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = (
        MultiPartParser,
        FormParser,
    )