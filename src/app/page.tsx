"use client";

import { CinematicLoader } from "@/components/site/cinematic-loader";
import { Navbar } from "@/components/site/navbar";
import { HeroSection } from "@/components/site/hero-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { MenuSection } from "@/components/site/menu-section";
import { GallerySection } from "@/components/site/gallery-section";
import { EventsSection } from "@/components/site/events-section";
import { VoicesSection } from "@/components/site/voices-section";
import { PrivateEventsSection } from "@/components/site/private-events-section";
import { LocationSection } from "@/components/site/location-section";
import { NewsletterSection } from "@/components/site/newsletter-section";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { ReservationModal } from "@/components/site/reservation-modal";
import { VipListModal } from "@/components/site/vip-list-modal";
import { DressCodeModal } from "@/components/site/dress-code-modal";
import { PrivateEventsModal } from "@/components/site/private-events-modal";
import { SectionDivider } from "@/components/site/section-divider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CinematicLoader />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SectionDivider label="Experience" />
        <ExperienceSection />
        <SectionDivider label="The Menu" />
        <MenuSection />
        <SectionDivider label="Gallery" />
        <GallerySection />
        <SectionDivider label="The Night's List" />
        <EventsSection />
        <VoicesSection />
        <SectionDivider label="Private Events" />
        <PrivateEventsSection />
        <SectionDivider label="Find Us" />
        <LocationSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <ReservationModal />
      <VipListModal />
      <DressCodeModal />
      <PrivateEventsModal />
    </div>
  );
}
