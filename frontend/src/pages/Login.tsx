import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../services/authService";
import GridBackground from "../components/GridBackground";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const data = await login({
                email,
                password,
            });

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            navigate("/dashboard");

        } catch (error: any) {
            console.log(error.response);

            alert(
                JSON.stringify(error.response?.data)
            );
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

            <GridBackground />

            {/* Background glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

            {/* Login Card */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

                    {/* Logo */}

                    <div className="mb-8 flex justify-center">

                        <Link
                            to="/"
                            className="flex items-center gap-3"
                        >

                            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">

                                <div className="h-3.5 w-3.5 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]" />

                                <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />

                                <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-500" />

                            </div>

                            <span className="text-xl font-semibold tracking-tight text-white">
                                Enterprise RAG
                            </span>

                        </Link>

                    </div>


                    {/* Heading */}

                    <div className="mb-8 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            Sign in to access your knowledge base.
                        </p>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>


                        {/* Login */}

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
                        >
                            Sign in
                        </button>

                    </form>


                    {/* Register */}

                    <p className="mt-7 text-center text-sm text-slate-400">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-medium text-blue-400 transition hover:text-blue-300"
                        >
                            Create one
                        </Link>

                    </p>

                </div>


                {/* Back to home */}

                <div className="mt-6 text-center">

                    <Link
                        to="/"
                        className="text-sm text-slate-500 transition hover:text-slate-300"
                    >
                        ← Back to home
                    </Link>

                </div>

            </motion.div>

        </div>
    );
}