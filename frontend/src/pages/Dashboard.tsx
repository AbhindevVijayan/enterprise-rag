import { useEffect, useState, useRef } from "react";
import {
    getDocuments,
    type Document,
    deleteDocument,
    uploadDocument,
} from "../services/documentService";
import { askQuestion } from "../services/searchService";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import GridBackground from "../components/GridBackground";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export default function Dashboard() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [documents, setDocuments] = useState<Document[]>([]);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<number | null>(null);

    const navigate = useNavigate();

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
                file
            );

            const docs = await getDocuments();

            setDocuments(docs);

            alert("Document uploaded successfully!");
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }
    };

    const handleDelete = async (id: number) => {
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

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

            <GridBackground />

            {/* Background glow */}

            <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />


            {/* Header */}

            <header className="relative z-20 border-b border-slate-800/70 bg-slate-950/60 backdrop-blur-xl">

                <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5">

                    {/* Brand */}

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-3"
                    >

                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">

                            <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />

                            <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />

                            <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />

                        </div>

                        <div className="text-left">

                            <p className="text-lg font-semibold tracking-tight">
                                Enterprise RAG
                            </p>

                            <p className="text-xs text-slate-500">
                                Knowledge Workspace
                            </p>

                        </div>

                    </button>


                    {/* Right */}

                    <div className="flex items-center gap-5">

                        <div className="hidden items-center gap-2 sm:flex">

                            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]" />

                            <span className="text-sm text-slate-400">
                                AI systems online
                            </span>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-slate-700/80 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-white/[0.04] hover:text-white"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </header>


            {/* Main */}

            <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-8 lg:px-8">

                <div className="grid min-h-[calc(100vh-130px)] gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">


                    {/* Documents */}

                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl"
                    >

                        <div className="border-b border-slate-800/80 p-6">

                            <div className="mb-1 flex items-center justify-between">

                                <h2 className="text-lg font-semibold">
                                    Documents
                                </h2>

                                <span className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-400">
                                    {documents.length}
                                </span>

                            </div>

                            <p className="text-sm text-slate-500">
                                Select a document to search
                            </p>

                        </div>


                        {/* Upload */}

                        <div className="p-5">

                            <button
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-blue-500/40 bg-blue-600/10 px-4 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-400/60 hover:bg-blue-600/20 hover:text-blue-200"
                            >

                                <span className="text-lg transition group-hover:-translate-y-0.5">
                                    +
                                </span>

                                Upload PDF

                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleUpload}
                            />

                        </div>


                        {/* Document list */}

                        <div className="flex-1 overflow-y-auto px-4 pb-5">

                            {documents.length === 0 ? (

                                <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">

                                    <div className="mb-3 text-3xl opacity-50">
                                        ◫
                                    </div>

                                    <p className="text-sm text-slate-500">
                                        No documents uploaded yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-2">

                                    {documents.map((doc) => (

                                        <motion.div
                                            key={doc.id}
                                            whileHover={{ x: 2 }}
                                            onClick={() =>
                                                setSelectedDocument(doc.id)
                                            }
                                            className={`group cursor-pointer rounded-xl border p-4 transition-all ${selectedDocument === doc.id
                                                    ? "border-blue-500/40 bg-blue-500/10 shadow-[0_0_25px_rgba(37,99,235,0.08)]"
                                                    : "border-transparent bg-slate-950/30 hover:border-slate-800 hover:bg-slate-800/40"
                                                }`}
                                        >

                                            <div className="flex items-start gap-3">

                                                <div
                                                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selectedDocument === doc.id
                                                            ? "bg-blue-500/15 text-blue-400"
                                                            : "bg-slate-800 text-slate-500"
                                                        }`}
                                                >
                                                    PDF
                                                </div>


                                                <div className="min-w-0 flex-1">

                                                    <div className="flex items-start justify-between gap-2">

                                                        <h3 className="truncate text-sm font-medium text-slate-200">
                                                            {doc.title}
                                                        </h3>

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(doc.id);
                                                            }}
                                                            className="shrink-0 text-xs text-slate-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                                                            title="Delete document"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                                    </p>

                                                    {selectedDocument === doc.id && (

                                                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-400">

                                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                                                            Selected

                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        </motion.div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </motion.aside>


                    {/* AI Workspace */}

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex min-h-[700px] flex-col rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl"
                    >

                        {/* Workspace header */}

                        <div className="border-b border-slate-800/80 px-7 py-5">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                                        AI Workspace
                                    </p>

                                    <h1 className="mt-1 text-xl font-semibold text-white">
                                        Ask your knowledge base
                                    </h1>

                                </div>

                                {selectedDocument !== null && (

                                    <div className="hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-xs text-blue-300 sm:block">
                                        Document selected
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* Conversation */}

                        <div className="flex-1 overflow-y-auto px-7 py-8">

                            {messages.length === 0 ? (

                                <div className="flex min-h-[420px] items-center justify-center">

                                    <div className="max-w-lg text-center">

                                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl text-blue-400 shadow-[0_0_35px_rgba(37,99,235,0.12)]">
                                            ✦
                                        </div>

                                        <h2 className="text-2xl font-semibold text-white">
                                            Ask anything about your documents
                                        </h2>

                                        <p className="mt-3 leading-7 text-slate-500">
                                            Select a document or search across your
                                            knowledge base. Enterprise RAG will
                                            retrieve the relevant information and
                                            generate a grounded answer.
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="mx-auto max-w-4xl space-y-8">

                                    {messages.map((message, index) => (

                                        <div
                                            key={index}
                                            className={
                                                message.role === "user"
                                                    ? "flex justify-end"
                                                    : "flex justify-start"
                                            }
                                        >

                                            {message.role === "user" ? (

                                                <div className="max-w-[75%]">

                                                    <div className="mb-2 text-right text-xs text-slate-600">
                                                        You
                                                    </div>

                                                    <div className="rounded-2xl rounded-tr-md border border-blue-500/20 bg-blue-600/15 px-5 py-4 text-sm leading-7 text-slate-200">
                                                        {message.content}
                                                    </div>

                                                </div>

                                            ) : (

                                                <div className="max-w-[85%]">

                                                    <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">

                                                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                                            ✦
                                                        </span>

                                                        Enterprise AI

                                                    </div>

                                                    <div className="rounded-2xl rounded-tl-md border border-slate-800 bg-slate-950/70 px-5 py-4 text-sm leading-7 text-slate-300">

                                                        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400">
                                                            <ReactMarkdown>
                                                                {message.content}
                                                            </ReactMarkdown>
                                                        </div>

                                                    </div>

                                                </div>

                                            )}

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>


                        {/* Composer */}

                        <div className="border-t border-slate-800/80 p-5">

                            <div className="mx-auto max-w-4xl">

                                {selectedDocument !== null && (

                                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">

                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                                        Searching selected document

                                    </div>

                                )}

                                <div className="relative rounded-2xl border border-slate-700/80 bg-slate-950/70 p-2 transition focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(37,99,235,0.08)]">

                                    <textarea
                                        className="min-h-[90px] w-full resize-none bg-transparent px-4 py-3 pr-20 text-sm leading-6 text-white outline-none placeholder:text-slate-600"
                                        placeholder="Ask a question about your documents..."
                                        value={question}
                                        onChange={(e) =>
                                            setQuestion(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                handleAsk();
                                            }
                                        }}
                                    />

                                    <button
                                        onClick={handleAsk}
                                        disabled={loading || !question.trim()}
                                        className="absolute bottom-3 right-3 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
                                    >
                                        {loading ? "Thinking..." : "Ask AI"}
                                    </button>

                                </div>

                                <p className="mt-2 text-center text-xs text-slate-600">
                                    Press Enter to ask · Shift + Enter for a new line
                                </p>

                            </div>

                        </div>

                    </motion.section>

                </div>

            </main>

        </div>
    );
}