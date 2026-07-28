import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white">

            {/* Background glow */}

            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />


            <div className="relative mx-auto max-w-7xl px-8">

                {/* CTA */}

                <div className="border-b border-slate-800 py-24">

                    <div className="mx-auto max-w-4xl text-center">

                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                            Start exploring
                        </p>

                        <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
                            Your documents.
                            <br />

                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Finally searchable.
                            </span>
                        </h2>

                        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                            Turn your documents into a knowledge base you can
                            actually talk to. Upload, search and ask questions
                            with Enterprise RAG.
                        </p>

                        <div className="mt-10 flex justify-center gap-4">

                            <Link
                                to="/register"
                                className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-500"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
                            >
                                Sign In
                            </Link>

                        </div>

                    </div>

                </div>


                {/* Main footer */}

                <div className="grid gap-12 py-20 md:grid-cols-12">

                    {/* Brand */}

                    <div className="md:col-span-5">

                        <div className="flex items-center gap-6">

                            {/* Large Logo */}

                            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] border border-blue-400/30 bg-blue-500/10">

                                <div className="h-9 w-9 rounded-full bg-blue-400 shadow-[0_0_40px_rgba(96,165,250,0.9)]" />

                                <span className="absolute left-4 top-4 h-3.5 w-3.5 rounded-full bg-cyan-300" />

                                <span className="absolute bottom-4 right-4 h-3.5 w-3.5 rounded-full bg-blue-500" />

                            </div>

                            <span className="text-3xl font-bold tracking-tight">
                                Enterprise RAG
                            </span>

                        </div>

                        <p className="mt-8 max-w-sm text-lg leading-8 text-slate-400">
                            AI-powered document intelligence for searching,
                            understanding and interacting with your knowledge.
                        </p>

                        <div className="mt-8 flex items-center gap-3">

                            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />

                            <span className="text-sm text-slate-400">
                                AI systems online
                            </span>

                        </div>

                    </div>

                    {/* Product */}

                    <div className="md:col-span-2">

                        <h3 className="mb-5 font-semibold">
                            Product
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">

                            <li>
                                <a href="#features" className="transition hover:text-white">
                                    Features
                                </a>
                            </li>

                            <li>
                                <a href="#how-it-works" className="transition hover:text-white">
                                    How it Works
                                </a>
                            </li>

                            <li>
                                <a href="#preview" className="transition hover:text-white">
                                    Live Preview
                                </a>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="transition hover:text-white"
                                >
                                    Get Started
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Technology */}

                    <div className="md:col-span-2">

                        <h3 className="mb-5 font-semibold">
                            Technology
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">

                            <li>Retrieval-Augmented Generation</li>

                            <li>Semantic Search</li>

                            <li>Vector Embeddings</li>

                            <li>Gemini AI</li>

                        </ul>

                    </div>


                    {/* Connect */}

                    <div className="md:col-span-3">

                        <h3 className="mb-5 font-semibold">
                            Explore
                        </h3>

                        <ul className="space-y-4 text-sm text-slate-400">

                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-white"
                                >
                                    GitHub ↗
                                </a>
                            </li>

                            <li>
                                <Link
                                    to="/login"
                                    className="transition hover:text-white"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="transition hover:text-white"
                                >
                                    Create an account
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>


                {/* Bottom */}

                <div className="flex flex-col gap-5 border-t border-slate-800 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

                    <p>
                        © {new Date().getFullYear()} Enterprise RAG. Built with curiosity and AI.
                    </p>

                    <div className="flex gap-6">

                        <Link
                            to="/privacy"
                            className="transition hover:text-slate-300"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="transition hover:text-slate-300"
                        >
                            Terms
                        </Link>

                        <Link
                            to="/security"
                            className="transition hover:text-slate-300"
                        >
                            Security
                        </Link>

                    </div>
                </div>

            </div>

        </footer>
    );
}