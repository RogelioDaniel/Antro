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
import { BlogSection } from "@/components/site/blog-section";
import { NewsletterSection } from "@/components/site/newsletter-section";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { ReservationModal } from "@/components/site/reservation-modal";
import { VipListModal } from "@/components/site/vip-list-modal";
import { DressCodeModal } from "@/components/site/dress-code-modal";
import { PrivateEventsModal } from "@/components/site/private-events-modal";
import { AvailabilityModal } from "@/components/site/availability-modal";
import { CookieConsent } from "@/components/site/cookie-consent";
import { SectionDivider } from "@/components/site/section-divider";
import { KineticMarquee } from "@/components/site/kinetic-marquee";
import { WowSection } from "@/components/site/wow-section";
import { PatternCtaSection } from "@/components/site/pattern-cta-section";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { useT } from "@/lib/lang-store";

export default function Home() {
  const t = useT();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CinematicLoader />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <KineticMarquee phrase={t.kinetic.marquee.experience} />
        <ExperienceSection />
        <KineticMarquee phrase={t.kinetic.marquee.menu} reverse />
        <MenuSection />
        <KineticMarquee phrase={t.kinetic.marquee.gallery} />
        <GallerySection />
        <WowSection />
        <KineticMarquee phrase={t.kinetic.marquee.events} reverse />
        <EventsSection />
        <VoicesSection />
        <KineticMarquee phrase={t.kinetic.marquee.privateEvents} />
        <PrivateEventsSection />
        <SectionDivider label="Find Us" />
        <LocationSection />
        <SectionDivider label="The Journal" />
        <BlogSection />
        <PatternCtaSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <ReservationModal />
      <VipListModal />
      <DressCodeModal />
      <PrivateEventsModal />
      <AvailabilityModal />
      <CookieConsent />
    </div>
  );
}
