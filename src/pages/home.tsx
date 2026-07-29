import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Hero from "@/components/sections/Hero";
import OurProducts from "@/components/sections/OurProducts";
import ContactSection from "@/components/sections/ContactSection";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground pb-20 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <OurProducts />
        <ContactSection />
        <LocationSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
