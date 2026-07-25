from apps.documents.models import DocumentChunk
from apps.documents.services.embedding_service import generate_embedding
from apps.documents.services.vector_service import (
    create_index,
    add_embeddings,
    search,
)


def semantic_search(question: str, k: int = 5):
    """
    Perform semantic search over all document chunks.
    """

    chunks = list(
        DocumentChunk.objects.all().order_by("id")
    )

    if not chunks:
        return []

    embeddings = [
        generate_embedding(chunk.content)
        for chunk in chunks
    ]

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