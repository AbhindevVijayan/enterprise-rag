import { useEffect, useState } from "react";
import {
    getDocuments,
    type Document,
    deleteDocument,

} from "../services/documentService";
interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

import { useRef } from "react";
import { uploadDocument } from "../services/documentService";
import { askQuestion } from "../services/searchService";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Dashboard() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [loading, setLoading] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
    useEffect(() => {

        getDocuments()
            .then((docs) => {
                setDocuments(docs);
            })
            .catch(console.error);

    }, []);

    const handleUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        try {

            await uploadDocument(
                file.name.replace(".pdf", ""),
                file,
            );

            const docs = await getDocuments();

            setDocuments(docs);

            alert("Document uploaded successfully!");

        } catch (err) {

            console.error(err);

            alert("Upload failed.");

        }
    };
    const handleDelete = async (
        id: number
    ) => {

        const confirmed = window.confirm(
            "Delete this document?"
        );

        if (!confirmed) return;

        try {

            await deleteDocument(id);

            const docs = await getDocuments();

            setDocuments(docs);

            if (selectedDocument === id) {
                setSelectedDocument(null);

            }

        } catch (err) {

            console.error(err);

            alert("Failed to delete document.");
        }
    };

    const handleAsk = async () => {

        if (!question.trim()) return;

        setLoading(true);

        try {



            const data = await askQuestion(
                question,
                selectedDocument
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "user",
                    content: question,
                },
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);



            setQuestion("");

        } catch (error) {

            console.log(error);



        } finally {

            setLoading(false);

        }
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    };



    return (
        <div className="min-h-screen bg-slate-100">

            <header className="flex items-center justify-between bg-white px-8 py-4 shadow">

                <h1 className="text-2xl font-bold">
                    Enterprise RAG
                </h1>

                <button
                    onClick={handleLogout}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Logout
                </button>

            </header>

            <div className="grid grid-cols-3 gap-6 p-6">

                <div className="rounded-xl bg-white p-6 shadow">

                    <h2 className="mb-4 text-xl font-semibold">
                        Documents
                    </h2>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-6 w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
                    >
                        Upload PDF
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleUpload}
                    />

                    <div>

                        {documents.length === 0 ? (

                            <p className="text-gray-500">
                                No documents uploaded.
                            </p>

                        ) : (

                            <div className="space-y-3">

                                {documents.map((doc) => (

                                    <div
                                        key={doc.id}
                                        onClick={() => setSelectedDocument(doc.id)}
                                        className={`cursor-pointer rounded border p-3 transition
                    ${selectedDocument === doc.id
                                                ? "border-blue-600 bg-blue-50"
                                                : "hover:bg-gray-50"
                                            }`}
                                    >

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <h3 className="font-medium">
                                                    {doc.title}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                                </p>

                                                {selectedDocument === doc.id && (
                                                    <p className="mt-2 text-sm font-medium text-blue-600">
                                                        ✓ Selected
                                                    </p>
                                                )}

                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(doc.id);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete document"
                                            >
                                                🗑️
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

                <div className="col-span-2 rounded-xl bg-white p-6 shadow">

                    <h2 className="mb-4 text-xl font-semibold">
                        AI Chat
                    </h2>

                    <textarea
                        className="mb-4 h-32 w-full rounded border p-3"
                        placeholder="Ask a question..."
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                    />

                    <button
                        onClick={handleAsk}
                        disabled={loading}
                        className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? "Thinking..." : "Ask AI"}
                    </button>

                    <div className="mt-6 rounded bg-slate-100 p-4">

                        <h3 className="mb-4 text-xl font-semibold">
                            Conversation
                        </h3>

                        <div className="space-y-6">

                            {messages.map((message, index) => (

                                <div
                                    key={index}
                                    className={
                                        message.role === "user"
                                            ? "rounded-lg bg-blue-100 p-4"
                                            : "rounded-lg border bg-white p-4"
                                    }
                                >

                                    <div className="mb-2 font-semibold">

                                        {message.role === "user"
                                            ? "👤 You"
                                            : "🤖 AI"}

                                    </div>

                                    {message.role === "assistant" ? (

                                        <div className="prose max-w-none">
                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>

                                    ) : (

                                        <p>{message.content}</p>

                                    )}

                                </div>

                            ))}

                        </div>


                    </div>

                </div>
            </div>

        </div>
    );




}


