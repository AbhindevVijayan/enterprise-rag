import { Link, useLocation } from "react-router-dom";
import GridBackground from "../components/GridBackground";

const content = {
    privacy: {
        label: "Privacy",
        title: "Your data stays yours.",
        description:
            "We believe your documents and knowledge should remain private. Enterprise RAG is designed around responsible handling of the information you choose to upload.",
        sections: [
            {
                title: "Information we collect",
                text:
                    "Enterprise RAG may collect account information such as your name, username, email address, and authentication details. We may also process documents, questions, and other content that you intentionally provide to the platform."
            },
            {
                title: "How we use your information",
                text:
                    "Your information is used to provide authentication, document processing, search, retrieval, and AI-powered question answering. We do not use your private documents for purposes unrelated to providing the service."
            },
            {
                title: "Your documents",
                text:
                    "Documents uploaded to Enterprise RAG are used to provide the functionality you request, including indexing, semantic search, retrieval, and generating answers based on your content."
            },
            {
                title: "Third-party services",
                text:
                    "Some features may rely on third-party infrastructure or AI services. Information sent to those services is limited to what is necessary to provide the requested functionality."
            },
            {
                title: "Data retention",
                text:
                    "We aim to retain information only for as long as it is necessary to provide the service or fulfill legitimate operational requirements. You should avoid uploading highly sensitive information unless the deployment is configured to handle it appropriately."
            },
            {
                title: "Your control",
                text:
                    "You are responsible for the information you upload. If you want to remove your account or associated information, contact the project administrator."
            }
        ]
    },

    terms: {
        label: "Terms",
        title: "Simple rules. Responsible use.",
        description:
            "By using Enterprise RAG, you agree to use the platform responsibly and only for purposes you have the right to pursue.",
        sections: [
            {
                title: "Using Enterprise RAG",
                text:
                    "You may use Enterprise RAG to upload, search, analyze, and interact with documents that you own or have permission to use."
            },
            {
                title: "Your account",
                text:
                    "You are responsible for maintaining the security of your account credentials and for activity performed through your account."
            },
            {
                title: "Your content",
                text:
                    "You retain responsibility for the documents and information you upload. You must have the necessary rights or permissions to process that content."
            },
            {
                title: "AI-generated responses",
                text:
                    "AI responses are generated from available information and may contain mistakes or incomplete information. Enterprise RAG should not be treated as a replacement for professional, legal, financial, medical, or other expert advice."
            },
            {
                title: "Prohibited use",
                text:
                    "You must not use the platform to violate laws, infringe another person's rights, attempt unauthorized access, distribute malicious content, or interfere with the operation of the service."
            },
            {
                title: "Service availability",
                text:
                    "Enterprise RAG may be updated, modified, temporarily unavailable, or discontinued as the project evolves. We do not guarantee uninterrupted availability."
            }
        ]
    },

    security: {
        label: "Security",
        title: "Built with security in mind.",
        description:
            "Enterprise RAG is designed with practical security principles across authentication, data handling, and application access.",
        sections: [
            {
                title: "Authentication",
                text:
                    "User accounts are protected through authenticated access. Authentication tokens are used to prevent unauthenticated access to protected application functionality."
            },
            {
                title: "Protected resources",
                text:
                    "Authenticated application endpoints are designed to restrict access to authorized users and their permitted resources."
            },
            {
                title: "Document access",
                text:
                    "Documents are intended to remain associated with their respective user or workspace context rather than being publicly exposed."
            },
            {
                title: "Secure communication",
                text:
                    "When deployed in production, Enterprise RAG should be served over HTTPS so information exchanged between users and the application is encrypted in transit."
            },
            {
                title: "Secrets and credentials",
                text:
                    "Application secrets, database credentials, API keys, and other sensitive configuration values should be stored outside source code and protected through environment configuration."
            },
            {
                title: "Responsible disclosure",
                text:
                    "If you discover a potential security issue, please report it privately to the project administrator rather than publicly exposing the vulnerability."
            }
        ]
    }
};

export default function LegalPage() {

    const location = useLocation();

    const type =
        location.pathname.includes("privacy")
            ? "privacy"
            : location.pathname.includes("security")
                ? "security"
                : "terms";

    const page = content[type];

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

            <GridBackground />

            {/* Ambient glow */}

            <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]" />

            <div className="pointer-events-none absolute -right-40 top-[40%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />


            {/* Navigation */}

            <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">

                        <div className="h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />

                        <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />

                        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />

                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                        Enterprise RAG
                    </span>

                </Link>

                <Link
                    to="/"
                    className="text-sm text-slate-400 transition hover:text-white"
                >
                    Back to home
                </Link>

            </nav>


            {/* Header */}

            <main className="relative z-10 mx-auto max-w-5xl px-8 pb-24 pt-20">

                <div className="mb-16 max-w-3xl">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                        {page.label}
                    </p>

                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                        {page.title}
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        {page.description}
                    </p>

                    <p className="mt-5 text-sm text-slate-600">
                        Last updated: July 2026
                    </p>

                </div>


                {/* Content */}

                <div className="space-y-4">

                    {page.sections.map((section, index) => (

                        <section
                            key={section.title}
                            className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-7 backdrop-blur-xl"
                        >

                            <div className="flex gap-6">

                                <span className="mt-1 text-sm font-medium text-blue-500">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div>

                                    <h2 className="text-xl font-semibold text-white">
                                        {section.title}
                                    </h2>

                                    <p className="mt-3 leading-7 text-slate-400">
                                        {section.text}
                                    </p>

                                </div>

                            </div>

                        </section>

                    ))}

                </div>


                {/* Bottom */}

                <div className="mt-16 border-t border-slate-800 pt-8">

                    <Link
                        to="/"
                        className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                    >
                        ← Back Home
                    </Link>

                </div>

            </main>

        </div>
    );
}