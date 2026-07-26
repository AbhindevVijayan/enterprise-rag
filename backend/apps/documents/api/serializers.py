from rest_framework import serializers

from apps.documents.models import Document
from apps.documents.services.pdf_service import extract_text_from_pdf
from apps.documents.models import (
    Document,
    DocumentChunk,
)

from apps.documents.services.chunk_service import split_text
from apps.documents.services.embedding_service import generate_embedding
from apps.documents.services.faiss_store import add_embedding


class DocumentUploadRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    file = serializers.FileField()

    def validate_file(self, file):
        if file.content_type != "application/pdf":
            raise serializers.ValidationError(
                "Only PDF files are allowed."
            )

        if file.size > 20 * 1024 * 1024:
            raise serializers.ValidationError(
                "Maximum file size is 20 MB."
            )

        return file





    def create(self, validated_data):
        uploaded_file = validated_data["file"]

        document = Document.objects.create(
            owner=self.context["request"].user,
            title=validated_data["title"],
            file=uploaded_file,
            file_size=uploaded_file.size,
            content_type=uploaded_file.content_type,
        )

        text = extract_text_from_pdf(document.file.path)

        document.extracted_text = text
        document.save()

        chunks = split_text(text)
        
        print(f"Total chunks: {len(chunks)}")
        
        for index, chunk in enumerate(chunks):
            print(f"Creating chunk {index}")
           
            embedding = generate_embedding(chunk)
            
            DocumentChunk.objects.create(
                 document=document,
                 chunk_index=index,
                 content=chunk,
                 embedding=embedding.tolist(),
            )

            add_embedding(embedding)

        return document








class DocumentSerializer(serializers.ModelSerializer):
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
        
        

class SearchRequestSerializer(serializers.Serializer):
    question = serializers.CharField()
    document_id = serializers.IntegerField(required=False)


class SearchResultSerializer(serializers.Serializer):
    chunk_index = serializers.IntegerField()
    score = serializers.FloatField()
    content = serializers.CharField()