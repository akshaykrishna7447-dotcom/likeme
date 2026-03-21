import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AIStyleAdvisor } from "@/components/sections/AIStyleAdvisor";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Pricing } from "@/components/sections/Pricing";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Booking } from "@/components/sections/Booking";
import { Stylists } from "@/components/sections/Stylists";
import { Footer } from "@/components/layout/Footer";
import { MagneticCursor } from "@/components/effects/MagneticCursor";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MagneticCursor />
      <Navbar />
      <Hero />
      <div className="space-y-32">
        <Services />
        <WhyChooseUs />
        <BeforeAfter />
        <Pricing />
        <Stylists />
        <Booking />
      </div>
      <AIStyleAdvisor />
      <Footer />
    </main>
  );
}
