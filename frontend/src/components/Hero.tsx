import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GridBackground from "./GridBackground";
import heroBg from "../assets/hero-bg.jpg";
import { useEffect, useState } from "react";
import AnimatedDashboard from "./AnimatedDashboard";
export default function Hero() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {

        const move = (e: MouseEvent) => {

            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };

    }, []);
    return (
        <section

            className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${heroBg})`,
            }}
        >
            <GridBackground />
            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />

            {/* Blue Glow */}
            <motion.div
                animate={{
                    x: mousePosition.x - 250,
                    y: mousePosition.y - 250,
                }}
                transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 20,
                }}
                className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[170px]"
            />


            <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center grid-cols-2 gap-20 px-16">

                {/* Left */}

                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >

                    <p className="mb-4 text-blue-400">
                        AI Powered Enterprise Search
                    </p>

                    <h1 className="text-7xl font-black leading-[0.95] tracking-tight text-white">

                        Understand

                        <br />

                        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">

                            Every Document

                        </span>

                        <br />

                        Instantly.

                    </h1>

                    <p className="mb-10 max-w-xl text-lg leading-8 text-slate-300">
                        Enterprise Retrieval-Augmented Generation for research,
                        contracts, books, reports and internal knowledge bases.

                        Find answers in seconds—not hours.

                    </p>

                    <div className="flex gap-5">

                        <Link
                            to="/register"
                            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="rounded-xl border border-slate-600 px-8 py-4 text-white hover:bg-slate-800"
                        >
                            Login
                        </Link>

                    </div>

                </motion.div>

                {/* Right */}

                {/* Right */}

                <div className="relative flex items-center justify-center">

                    <AnimatedDashboard />

                </div>


            </div>

        </section>

    );

}
