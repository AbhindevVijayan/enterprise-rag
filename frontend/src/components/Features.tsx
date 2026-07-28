import { motion } from "framer-motion";
import {
    BrainCircuit,
    FileText,
    ShieldCheck,
    Search,
    Database,
    Sparkles,
} from "lucide-react";

const features = [
    {
        title: "AI Question Answering",
        description:
            "Ask natural language questions and receive grounded answers from your documents.",
        icon: BrainCircuit,
        span: "col-span-2 row-span-2",
    },
    {
        title: "Semantic Search",
        description:
            "Find information based on meaning instead of keywords.",
        icon: Search,
        span: "",
    },
    {
        title: "Secure Authentication",
        description:
            "JWT based authentication with protected APIs.",
        icon: ShieldCheck,
        span: "",
    },
    {
        title: "Vector Database",
        description:
            "Fast embedding search using FAISS.",
        icon: Database,
        span: "",
    },
    {
        title: "Multi Document Support",
        description:
            "Upload books, reports, manuals and contracts.",
        icon: FileText,
        span: "",
    },
    {
        title: "Powered by Gemini",
        description:
            "Generate accurate contextual answers using Google's latest AI.",
        icon: Sparkles,
        span: "col-span-2",
    },
];

export default function Features() {
    return (
        <section className="bg-slate-900 py-32">

            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-20 text-center">

                    <p className="font-semibold uppercase tracking-widest text-blue-500">
                        Features
                    </p>

                    <h2 className="mt-4 text-5xl font-bold text-white">
                        Everything you need for Enterprise AI Search
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                        Designed for companies, students, researchers and
                        developers who work with thousands of pages every day.
                    </p>

                </div>

                <div className="grid auto-rows-[250px] grid-cols-3 gap-6">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                }}
                                className={`${feature.span}
                                group rounded-3xl border border-slate-800
                                bg-slate-950 p-8 transition
                                hover:border-blue-500`}
                            >

                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

                                    <Icon className="text-white" size={28} />

                                </div>

                                <h3 className="mb-4 text-2xl font-bold text-white">

                                    {feature.title}

                                </h3>

                                <p className="leading-7 text-slate-400">

                                    {feature.description}

                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}