import api from "../api/axios";

export interface Document {
    id: number;
    title: string;
    file: string;
    file_size: number;
    content_type: string;
    status: string;
    created_at: string;
}

export const getDocuments = async (): Promise<Document[]> => {

    const response = await api.get(
        "documents/"
    );

    return response.data;
};

export const uploadDocument = async (
    title: string,
    file: File,
) => {

    const formData = new FormData();

    formData.append(
        "title",
        title,
    );

    formData.append(
        "file",
        file,
    );

    const response = await api.post(
        "documents/upload/",
        formData,
    );

    return response.data;
};

export const deleteDocument = async (
    id: number,
) => {

    await api.delete(
        `documents/${id}/`
    );
};

export const searchDocument = async (
    question: string,
    document_id?: number,
) => {

    const response = await api.post(
        "documents/search/",
        {
            question,
            document_id,
        }
    );

    return response.data;
};