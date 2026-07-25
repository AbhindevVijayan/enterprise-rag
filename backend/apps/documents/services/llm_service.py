import os

from google import genai


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(question, context):
    prompt = f"""
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer is not in the context, say:

"I couldn't find that information in the uploaded document."

Context:
-------------------
{context}
-------------------

Question:
{question}
"""

    response = client.models.generate_content(
        model="models/gemini-3.6-flash",
        contents=prompt,
    )

    return response.text