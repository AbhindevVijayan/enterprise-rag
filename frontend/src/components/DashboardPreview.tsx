import { motion } from "framer-motion";
import videoVideo from "../assets/video.mp4"
export default function DashboardPreview() {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-32">

            <div className="mx-auto max-w-7xl px-8">

                {/* Heading */}

                <div className="mb-16 text-center">

                    <p className="font-semibold uppercase tracking-widest text-blue-500">
                        Live Preview
                    </p>

                    <h2 className="mt-4 text-5xl font-bold text-white">
                        Experience Enterprise RAG
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                        Upload documents, ask questions, and receive grounded AI
                        answers instantly.
                    </p>

                </div>


                {/* Video Showcase */}

                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto w-[92%] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                >

                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="block h-auto w-full"
                    >
                        <source src={videoVideo} type="video/mp4" />
                    </video>

                </motion.div>

            </div>

        </section>
    );
}