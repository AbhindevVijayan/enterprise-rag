import { useEffect, useState } from "react";

export default function AnimatedDashboard() {
    const [scene, setScene] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScene((prev) => (prev + 1) % 7);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white shadow-2xl">

            <h2 className="mb-6 text-2xl font-bold">
                Enterprise Dashboard
            </h2>

            {scene >= 1 && (
                <div className="mb-4 rounded-lg bg-slate-800 p-4">
                    📄 Bravo Two Zero.pdf
                </div>
            )}

            {scene >= 2 && (
                <div className="mb-4 text-blue-400">
                    ✓ Selected
                </div>
            )}

            {scene >= 3 && (
                <div className="mb-4 rounded-lg bg-slate-800 p-4">
                    🔍 What is SAS?
                </div>
            )}

            {scene >= 4 && (
                <div className="mb-4 text-yellow-400">
                    🤖 Thinking...
                </div>
            )}

            {scene >= 5 && (
                <div className="rounded-lg bg-blue-600 p-4">
                    SAS stands for Special Air Service...
                </div>
            )}

            {scene >= 6 && (
                <div className="mt-4 text-green-400">
                    ✓ Source: Page 42
                </div>
            )}

        </div>
    );
}