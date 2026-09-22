import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Hero from "@/components/sections/Hero";
import OurProducts from "@/components/sections/OurProducts";
import ContactSection from "@/components/sections/ContactSection";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";
import SettingsDrawer from "@/components/layout/SettingsDrawer";
import RoyalBackground from "@/components/layout/RoyalBackground";
import { useState } from "react";

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <RoyalBackground />
      <div className="royal-app">
        <Navbar onSettings={() => setSettingsOpen(true)} />
        <main className="flex-grow">
          <Hero />
          <OurProducts />
          <ContactSection />
          <LocationSection />
        </main>
        <Footer />
        <MobileBottomNav onSettings={() => setSettingsOpen(true)} />
        <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </>
  );
}
