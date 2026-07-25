from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from apps.documents.services.search_service import semantic_search
from .serializers import SearchRequestSerializer
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
    
    
class SearchView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SearchRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question = serializer.validated_data["question"]

        results = semantic_search(question)

        return Response(
           {
                "results": results
           }
    )