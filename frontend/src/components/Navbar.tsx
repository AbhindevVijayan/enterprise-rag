import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show navbar at the very top
            if (currentScrollY < 50) {
                setVisible(true);
            }
            // Scrolling down → hide
            else if (currentScrollY > lastScrollY) {
                setVisible(false);
            }
            // Scrolling up → show
            else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -100 }}
            transition={{
                duration: 0.25,
                ease: "easeOut",
            }}
            className="fixed top-0 z-50 w-full"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

                {/* Brand */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    {/* Logo */}

                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">

                        <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />

                        <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />

                        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />

                    </div>

                    <span className="text-lg font-semibold tracking-tight text-white">
                        Enterprise RAG
                    </span>

                </Link>


                {/* Navigation */}

                <div className="flex items-center gap-9 text-sm text-slate-400">

                    <a
                        href="#features"
                        className="transition-colors hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        className="transition-colors hover:text-white"
                    >
                        How It Works
                    </a>

                    <Link
                        to="/login"
                        className="rounded-lg border border-slate-700/70 px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:border-slate-500 hover:bg-white/[0.04] hover:text-white"
                    >
                        Login
                    </Link>

                </div>

            </div>
        </motion.nav>
    );
}