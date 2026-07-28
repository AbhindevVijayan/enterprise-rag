import { motion } from "framer-motion";
import {
    Upload,
    Database,
    Search,
    Bot,
} from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Documents",
        description:
            "Upload PDFs, books, reports, contracts and manuals.",
    },
    {
        icon: Database,
        title: "AI Indexing",
        description:
            "Documents are chunked, embedded and indexed automatically.",
    },
    {
        icon: Search,
        title: "Semantic Retrieval",
        description:
            "Relevant information is retrieved using vector search.",
    },
    {
        icon: Bot,
        title: "AI Response",
        description:
            "Gemini generates accurate answers grounded in your documents.",
    },
];

export default function HowItWorks() {
    return (
        <section className="relative bg-slate-950 py-32">

            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-20 text-center">

                    <p className="text-blue-500 font-semibold uppercase tracking-widest">
                        Workflow
                    </p>

                    <h2 className="mt-4 text-5xl font-bold text-white">
                        How Enterprise RAG Works
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                        Upload your knowledge once. Search it forever.
                        Enterprise RAG turns thousands of pages into
                        instant answers.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-4">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="relative rounded-3xl border border-slate-800 bg-slate-900 p-8 transition"
                            >

                                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">

                                    <Icon
                                        size={30}
                                        className="text-white"
                                    />

                                </div>

                                <h3 className="mb-4 text-2xl font-bold text-white">
                                    {step.title}
                                </h3>

                                <p className="leading-7 text-slate-400">
                                    {step.description}
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}