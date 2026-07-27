import api from "../api/axios";

export interface SearchResponse {
    answer: string;
    results: {
        chunk_index: number;
        score: number;
        content: string;
    }[];
}

export const askQuestion = async (
    question: string,
    documentId: number | null
): Promise<SearchResponse> => {

    const response = await api.post(
        "documents/search/",
        {
            question,
            document_id: documentId,
        }
    );

    return response.data;
};