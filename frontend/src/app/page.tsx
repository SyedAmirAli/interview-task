import Assets from "@/assets";
import { AnimatedButton } from "@/components/AnimatedButton";
import CompaniesAndPartner from "@/components/CompaniesAndPartner";
import DigitalPartner from "@/components/DigitalPartner";
import ExperienceTexts from "@/components/ExperienceTexts";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import InteractiveMenu from "@/components/InteractiveMenu";
import { Navigation } from "@/components/Navigation";
import ParallaxImage from "@/components/ParallaxImage";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/testimonials";
import { Preloader } from "@/components/ui/preloader";
import WorksView from "@/components/work-section";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
    return (
        <div className="w-full">
            <Navigation />
            <Preloader />

            <HeroSection />

            <WorksView />

            <InteractiveMenu />
            <DigitalPartner />
            <ParallaxImage />

            <CompaniesAndPartner />
            <StatsSection />

            <ExperienceTexts />
            <ServicesSection />

            <div className="relative max-h-screen overflow-hidden">
                <TestimonialsSection />
            </div>
            <FooterSection />
        </div>
    );
}
