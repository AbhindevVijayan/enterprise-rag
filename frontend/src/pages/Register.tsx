import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

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

        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-6 text-center text-3xl font-bold">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        required
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}