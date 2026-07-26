from apps.documents.models import DocumentChunk
from apps.documents.services.embedding_service import generate_embedding
from apps.documents.services.vector_service import (
    create_index,
    add_embeddings,
    search,
)
import numpy as np

def semantic_search(
    question: str,
    k: int = 5,
    document_id=None,
):
    """
    Perform semantic search over document chunks.
    """

    queryset = DocumentChunk.objects.all()

    if document_id:
        queryset = queryset.filter(
            document_id=document_id
        )

    chunks = list(
        queryset.order_by("id")
    )

    if not chunks:
        return []

    embeddings = []

    for chunk in chunks:
        if chunk.embedding:
           embeddings.append(
            np.array(chunk.embedding, dtype="float32")
        )
    else:
        embeddings.append(
            np.array(
                generate_embedding(chunk.content),
                dtype="float32",
            )
        )
    index = create_index()

    add_embeddings(index, embeddings)

    query_embedding = generate_embedding(question)

    distances, indices = search(
        index,
        query_embedding,
        k=min(k, len(chunks)),
    )

    results = []

    for distance, idx in zip(
        distances[0],
        indices[0],
    ):
        chunk = chunks[idx]

        results.append(
            {
                "chunk_index": chunk.chunk_index,
                "score": float(distance),
                "content": chunk.content,
            }
        )

    return results