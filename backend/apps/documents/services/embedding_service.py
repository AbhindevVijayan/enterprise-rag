from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embedding(text: str) -> list[float]:
    """
    Generate an embedding for the given text.
    """
    embedding = model.encode(text)
    print(len(embedding))
    return embedding.tolist()