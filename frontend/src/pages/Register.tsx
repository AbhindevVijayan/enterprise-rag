import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import GridBackground from "../components/GridBackground";
export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            await register(formData);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("Registration failed.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">

            {/* Background */}

            <GridBackground />

            <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />

            <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />


            {/* Register Card */}

            <div className="relative z-10 w-full max-w-md">

                {/* Brand */}

                <Link
                    to="/"
                    className="mb-8 flex items-center justify-center gap-3"
                >

                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">

                        <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />

                        <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />

                        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />

                    </div>

                    <span className="text-xl font-semibold tracking-tight text-white">
                        Enterprise RAG
                    </span>

                </Link>


                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl">

                    {/* Heading */}

                    <div className="mb-8">

                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                            Get started
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Start building your private AI-powered knowledge base.
                        </p>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <label className="mb-2 block text-xs font-medium text-slate-400">
                                    First name
                                </label>

                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                                    required
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-xs font-medium text-slate-400">
                                    Last name
                                </label>

                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                                    required
                                />

                            </div>

                        </div>


                        <div>

                            <label className="mb-2 block text-xs font-medium text-slate-400">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block text-xs font-medium text-slate-400">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block text-xs font-medium text-slate-400">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-3 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>

                    </form>


                    {/* Login */}

                    <div className="mt-7 border-t border-slate-800 pt-6 text-center">

                        <p className="text-sm text-slate-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-medium text-blue-400 transition hover:text-blue-300"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>


                {/* Footer text */}

                <p className="mt-6 text-center text-xs text-slate-600">
                    Your documents. Your knowledge. Your AI.
                </p>

            </div>

        </div>
    );
}