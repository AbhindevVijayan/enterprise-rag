import os
import faiss
import numpy as np
from apps.documents.models import DocumentChunk , Document
from apps.documents.services.embedding_service import generate_embedding


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

INDEX_DIR = os.path.join(
    BASE_DIR,
    "storage",
    "faiss_indexes",
)

os.makedirs(INDEX_DIR, exist_ok=True)

def get_index_path(document_id):
    return os.path.join(
        INDEX_DIR,
        f"{document_id}.bin",
    )


def load_index(document_id, dimension=384):

    index_path = get_index_path(document_id)

    if os.path.exists(index_path):
        return faiss.read_index(index_path)

    return faiss.IndexFlatL2(dimension)


def save_index(index, document_id):
    print("Saving index to:", get_index_path(document_id))
    faiss.write_index(
        index,
        get_index_path(document_id),
    )
    
def add_embedding(document_id, embedding):
    """
    Add one embedding to a document-specific FAISS index.
    """

    index = load_index(
        document_id,
        len(embedding)
    )
    print("Index dimension:", index.d)
    print("Embedding dimension:", len(embedding))
    
    embedding = np.array(
        [embedding],
        dtype="float32",
    )

    index.add(embedding)

    save_index(index,  document_id,)


def search_index(document_id, query_embedding, k=5):
    """
    Search a document-specific FAISS index.
    """

    index_path = get_index_path(document_id)

    if not os.path.exists(index_path):
        return (
            np.array([[]], dtype="float32"),
            np.array([[]], dtype="int64"),
        )

    index = load_index(
        document_id,
        len(query_embedding),
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
    Rebuild a separate FAISS index for every document.
    """

    for document in Document.objects.all():

        chunks = DocumentChunk.objects.filter(
            document=document
        ).order_by("id")

        if not chunks.exists():
            continue

        embeddings = []

        for chunk in chunks:

            if chunk.embedding:
                embedding = chunk.embedding
            else:
                embedding = generate_embedding(chunk.content)
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

        save_index(
            index,
            document.id,
        )