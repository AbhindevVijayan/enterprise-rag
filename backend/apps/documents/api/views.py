from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from apps.documents.services.search_service import semantic_search
from rest_framework.response import Response
from .serializers import SearchRequestSerializer
from .serializers import (
    DocumentUploadRequestSerializer,
    DocumentSerializer,
)
from apps.documents.services.llm_service import generate_answer
from apps.documents.services.faiss_store import rebuild_index
from apps.documents.models import Document


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
        document_id = serializer.validated_data.get("document_id")

        results = semantic_search(question, document_id=document_id,)

        context = "\n\n".join(
            item["content"]
            for item in results
        )

        try:
            answer = generate_answer(
                question,
                context,
            )
        except Exception as e:
            answer = "Unable to generate AI answer."
            print(e)

        return Response({
            "answer": answer,
            "results": results,
        })
        
        


class DocumentDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(
            owner=self.request.user
        )

    def perform_destroy(self, instance):
        instance.delete()

        rebuild_index()