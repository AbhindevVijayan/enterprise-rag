from apps.documents.models import DocumentChunk
from apps.documents.services.embedding_service import generate_embedding
from apps.documents.services.faiss_store import search_index


def semantic_search(question: str, k: int = 5, document_id=None):

    queryset = DocumentChunk.objects.order_by("id")

    if document_id:
        queryset = queryset.filter(document_id=document_id)

    chunks = list(queryset)

    if not chunks:
        return []

    query_embedding = generate_embedding(question)

    distances, indices = search_index(
        document_id=document_id,
        query_embedding=query_embedding,
        k=min(k, len(chunks)),
    )

    results = []

    for distance, idx in zip(distances[0], indices[0]):

        if idx < 0 or idx >= len(chunks):
            continue

        chunk = chunks[idx]

        results.append({
            "chunk_index": chunk.chunk_index,
            "score": float(distance),
            "content": chunk.content,
        })

    return results