import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    Enterprise RAG
                </Link>

                <div className="flex items-center gap-8 text-slate-300">

                    <a href="#features" className="hover:text-white">
                        Features
                    </a>

                    <a href="#how-it-works" className="hover:text-white">
                        How it Works
                    </a>

                    <Link
                        to="/login"
                        className="rounded-lg border border-slate-700 px-5 py-2 hover:bg-slate-800"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}