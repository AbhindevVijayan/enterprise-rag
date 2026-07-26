import { useEffect, useState } from "react";
import {
    getDocuments,
    type Document,

} from "../services/documentService";

import { useRef } from "react";
import { uploadDocument } from "../services/documentService";


export default function Dashboard() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
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



    return (
        <div className="min-h-screen bg-slate-100">

            <header className="flex items-center justify-between bg-white px-8 py-4 shadow">

                <h1 className="text-2xl font-bold">
                    Enterprise RAG
                </h1>

                <button
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
                                        className="rounded border p-3"
                                    >

                                        <h3 className="font-medium">
                                            {doc.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                        </p>

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
                    />

                    <button
                        className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                    >
                        Ask AI
                    </button>

                    <div className="mt-6 rounded bg-slate-100 p-4">

                        <h3 className="mb-2 font-semibold">
                            Answer
                        </h3>

                        <p className="text-gray-500">
                            AI answer will appear here.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );




}


