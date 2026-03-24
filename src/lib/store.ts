import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export type Locale = "zh" | "en";
export type MotionPreference = "system" | "reduce" | "full";
export type Quality = "low" | "balanced" | "high";

export type DuatPreferences = {
  locale: Locale;
  motion: MotionPreference;
  audioEnabled: boolean;
  audioVolume: number;
  bloom: number;
  noise: number;
  vignette: number;
  quality: Quality;
};

export const defaultPrefs: DuatPreferences = {
  locale: "zh",
  motion: "system",
  audioEnabled: true,
  audioVolume: 0.55,
  bloom: 1,
  noise: 1,
  vignette: 1,
  quality: "balanced",
};

export type DuatStore = {
  balance: number;
  pointer: number;
  scrollTrim: number;
  locked: boolean;
  sceneReady: boolean;
  prefs: DuatPreferences;

  setPointer: (p: number) => void;
  addScrollTrim: (deltaY: number) => void;
  nudgePointer: (delta: number) => void;
  resetInteraction: () => void;
  toggleLock: () => void;
  setSceneReady: (v: boolean) => void;
  setPref: <K extends keyof DuatPreferences>(
    key: K,
    value: DuatPreferences[K],
  ) => void;
};

export const useDuatStore = create<DuatStore>()(
  persist(
    (set, get) => ({
      balance: 0,
      pointer: 0,
      scrollTrim: 0,
      locked: false,
      sceneReady: false,
      prefs: { ...defaultPrefs },

      setPointer: (p) => {
        const pointer = clamp(p, -1, 1);
        const s = get();
        if (s.locked) {
          set({ pointer });
          return;
        }
        set({
          pointer,
          balance: clamp(pointer + s.scrollTrim, -1, 1),
        });
      },

      addScrollTrim: (deltaY) => {
        const s = get();
        const scrollTrim = clamp(s.scrollTrim + deltaY * 0.055, -0.42, 0.42);
        if (s.locked) {
          set({ scrollTrim });
          return;
        }
        set({
          scrollTrim,
          balance: clamp(s.pointer + scrollTrim, -1, 1),
        });
      },

      nudgePointer: (delta) => {
        const s = get();
        const pointer = clamp(s.pointer + delta, -1, 1);
        if (s.locked) return;
        set({
          pointer,
          balance: clamp(pointer + s.scrollTrim, -1, 1),
        });
      },

      resetInteraction: () =>
        set({
          pointer: 0,
          scrollTrim: 0,
          locked: false,
          balance: 0,
        }),

      toggleLock: () => {
        const s = get();
        if (s.locked) {
          const balance = clamp(s.pointer + s.scrollTrim, -1, 1);
          set({ locked: false, balance });
        } else {
          set({ locked: true });
        }
      },

      setSceneReady: (v) => set({ sceneReady: v }),

      setPref: (key, value) =>
        set((state) => ({
          prefs: { ...state.prefs, [key]: value },
        })),
    }),
    {
      name: "duat-visual-lab-prefs",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ prefs: state.prefs }),
    },
  ),
);
