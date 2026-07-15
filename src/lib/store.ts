/**
 * Global UI state for LA NEGRA.
 * Manages modal visibility (Reservation, VIP List), mobile drawer, active menu tab,
 * and the cinematic loader. Zustand keeps everything client-side and reactive.
 */
import { create } from "zustand";
import type { MenuCategory } from "@/lib/constants";

export type ModalKind = "reservation" | "vip" | null;

interface UIState {
  // Cinematic loader
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;

  // Modals
  openModal: ModalKind;
  openReservation: () => void;
  openVip: () => void;
  closeModal: () => void;

  // Mobile drawer
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;

  // Menu active tab
  activeTab: MenuCategory;
  setActiveTab: (t: MenuCategory) => void;
}

export const useUIStore = create<UIState>((set) => ({
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),

  openModal: null,
  openReservation: () => set({ openModal: "reservation" }),
  openVip: () => set({ openModal: "vip" }),
  closeModal: () => set({ openModal: null }),

  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  activeTab: "mezcal",
  setActiveTab: (t) => set({ activeTab: t }),
}));
