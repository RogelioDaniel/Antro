"use client";

import { CinematicLoader } from "@/components/site/cinematic-loader";
import { Navbar } from "@/components/site/navbar";
import { HeroSection } from "@/components/site/hero-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { MenuSection } from "@/components/site/menu-section";
import { EventsSection } from "@/components/site/events-section";
import { LocationSection } from "@/components/site/location-section";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { ReservationModal } from "@/components/site/reservation-modal";
import { VipListModal } from "@/components/site/vip-list-modal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CinematicLoader />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSection />
        <MenuSection />
        <EventsSection />
        <LocationSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <ReservationModal />
      <VipListModal />
    </div>
  );
}
