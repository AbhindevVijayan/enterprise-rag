import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Link } from "react-router-dom";

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

            localStorage.setItem(
                "access",
                data.access
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

            navigate("/dashboard");

        } catch (error: any) {
            console.log(error.response);

            alert(
                JSON.stringify(error.response?.data)
            );

        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="w-96 rounded-xl bg-white p-8 shadow-lg"
            >

                <h1 className="mb-6 text-center text-3xl font-bold">
                    Enterprise RAG
                </h1>

                <input
                    type="email"
                    className="mb-4 w-full rounded border p-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    className="mb-6 w-full rounded border p-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
                >
                    Login
                </button>
                <p className="mt-6 text-center text-sm">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}