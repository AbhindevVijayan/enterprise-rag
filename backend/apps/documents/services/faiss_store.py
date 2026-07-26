import os
import faiss
import numpy as np
from apps.documents.models import DocumentChunk
from apps.documents.services.embedding_service import generate_embedding

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

INDEX_PATH = os.path.join(
    BASE_DIR,
    "faiss_index.bin",
)


def load_index(dimension=384):
    print("FAISS INDEX PATH:", INDEX_PATH)
    
    if os.path.exists(INDEX_PATH):
        return faiss.read_index(INDEX_PATH)

    return faiss.IndexFlatL2(dimension)


def save_index(index):
    faiss.write_index(index, INDEX_PATH)


def add_embedding(embedding):
    """
    Add one embedding to the FAISS index.
    """

    index = load_index(
        len(embedding)
    )
    print("Index dimension:", index.d)
    print("Embedding dimension:", len(embedding))
    
    embedding = np.array(
        [embedding],
        dtype="float32",
    )

    index.add(embedding)

    save_index(index)


def search_index(query_embedding, k=5):
    """
    Search the stored FAISS index.
    """

    index = load_index(
        len(query_embedding)
    )

    query_embedding = np.array(
        [query_embedding],
        dtype="float32",
    )

    distances, indices = index.search(
        query_embedding,
        k,
    )

    return distances, indices

def rebuild_index():
    """
    Rebuild the entire FAISS index from all stored document chunks.
    """

    chunks = DocumentChunk.objects.all().order_by("id")

    if not chunks.exists():
        index = faiss.IndexFlatL2(384)
        save_index(index)
        return

    embeddings = []

    for chunk in chunks:

        if chunk.embedding:
            embeddings.append(
                np.array(
                    chunk.embedding,
                    dtype="float32",
                )
            )
        else:
            embedding = generate_embedding(
               chunk.content
           )

            chunk.embedding = embedding
            chunk.save()

            embeddings.append(
                np.array(
                    embedding,
                    dtype="float32",
                )
            )

    index = faiss.IndexFlatL2(
        len(embeddings[0])
    )

    index.add(
        np.array(
            embeddings,
            dtype="float32",
        )
    )

    save_index(index)