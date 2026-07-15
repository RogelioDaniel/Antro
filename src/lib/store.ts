/**
 * Global UI state for LA NEGRA.
 * Manages modal visibility (Reservation, VIP List, Dress Code, Private Events),
 * mobile drawer, active menu tab, lightbox, and the cinematic loader.
 */
import { create } from "zustand";
import type { MenuCategory } from "@/lib/constants";

export type ModalKind =
  | "reservation"
  | "vip"
  | "dresscode"
  | "private-events"
  | "availability"
  | null;

export interface LightboxState {
  open: boolean;
  index: number;
}

interface UIState {
  // Cinematic loader
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;

  // Modals
  openModal: ModalKind;
  openReservation: (preselectedDate?: string) => void;
  openVip: () => void;
  openDressCode: () => void;
  openPrivateEvents: () => void;
  openAvailability: () => void;
  closeModal: () => void;

  // Pre-selected reservation date (passed from availability calendar)
  preselectedDate: string | null;
  clearPreselectedDate: () => void;

  // Mobile drawer
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;

  // Menu active tab
  activeTab: MenuCategory;
  setActiveTab: (t: MenuCategory) => void;

  // Gallery lightbox
  lightbox: LightboxState;
  openLightbox: (index: number) => void;
  setLightboxIndex: (i: number) => void;
  closeLightbox: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),

  openModal: null,
  openReservation: (preselectedDate) =>
    set({ openModal: "reservation", preselectedDate: preselectedDate ?? null }),
  openVip: () => set({ openModal: "vip" }),
  openDressCode: () => set({ openModal: "dresscode" }),
  openPrivateEvents: () => set({ openModal: "private-events" }),
  openAvailability: () => set({ openModal: "availability" }),
  closeModal: () => set({ openModal: null }),

  preselectedDate: null,
  clearPreselectedDate: () => set({ preselectedDate: null }),

  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  activeTab: "mezcal",
  setActiveTab: (t) => set({ activeTab: t }),

  lightbox: { open: false, index: 0 },
  openLightbox: (index) => set({ lightbox: { open: true, index } }),
  setLightboxIndex: (i) => set((s) => ({ lightbox: { ...s.lightbox, index: i } })),
  closeLightbox: () => set({ lightbox: { open: false, index: 0 } }),
}));
