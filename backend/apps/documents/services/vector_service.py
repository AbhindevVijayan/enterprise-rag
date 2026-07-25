import faiss
import numpy as np


def create_index(dimension: int = 384):
    """
    Create a FAISS index.
    """
    return faiss.IndexFlatL2(dimension)


def add_embeddings(index, embeddings):
    """
    Add embeddings to the index.
    """
    vectors = np.array(
        embeddings,
        dtype="float32",
    )

    index.add(vectors)

    return index

def search(index, embedding, k=3):
    query = np.array(
        [embedding],
        dtype="float32",
    )

    distances, indices = index.search(query, k)

    return distances, indices