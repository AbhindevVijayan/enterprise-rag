import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";

import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="bg-slate-950 text-white">
            <Navbar />
            <Hero />
            <HowItWorks />
            <Features />
            <DashboardPreview />

            <Footer />
        </div>
    );
}