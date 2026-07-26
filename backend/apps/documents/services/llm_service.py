import os

from google import genai


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_answer(question, context):
    """
    Generate an answer using the retrieved document context.
    """

    if not context.strip():
        return "I couldn't find any relevant information in the uploaded document."

    prompt = f"""
You are a helpful AI assistant for document question answering.

Your job is to answer ONLY from the supplied document context.

Rules:
1. Use ONLY the provided context.
2. Do NOT use outside knowledge.
3. If the answer is not present in the context, reply exactly:
   "I couldn't find that information in the uploaded document."
4. Keep answers concise and accurate.
5. When appropriate, summarize instead of copying long passages.

Context:
--------------------
{context}
--------------------

Question:
{question}

Answer:
"""

    try:
        print("Calling Gemini...")
        response = client.models.generate_content(
            model="models/gemini-3.6-flash",
            contents=prompt,
        )
        print("========== GEMINI RESPONSE ==========")
        print(response)
        print("=====================================")
        print("Response text:", getattr(response, "text", None))

        if response and getattr(response, "text", None):
           return response.text.strip()

        print("No text returned by Gemini.")
        return "I couldn't generate an answer."
  
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Gemini Error: {e}"