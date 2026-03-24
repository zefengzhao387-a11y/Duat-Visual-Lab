"use client";

import { useEffect, useRef, useState } from "react";
import { HallOfMaatGate } from "@/components/scene/HallOfMaatGate";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Overlay } from "@/components/ui/Overlay";
import { SettingsPanel } from "@/components/ui/SettingsPanel";
import { MaatAudio } from "@/components/MaatAudio";
import { useDuatStore } from "@/lib/store";

export function DuatExperience() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsOpenRef = useRef(settingsOpen);
  settingsOpenRef.current = settingsOpen;

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      useDuatStore.getState().addScrollTrim(e.deltaY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setSettingsOpen(false);
        return;
      }
      if (settingsOpenRef.current) return;
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t instanceof HTMLSelectElement
      ) {
        return;
      }
      const st = useDuatStore.getState();
      if (e.code === "Space") {
        e.preventDefault();
        st.toggleLock();
        return;
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        st.nudgePointer(-0.065);
        return;
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        st.nudgePointer(0.065);
        return;
      }
      if (e.code === "ArrowUp") {
        e.preventDefault();
        st.addScrollTrim(-18);
        return;
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        st.addScrollTrim(18);
        return;
      }
      if (e.code === "KeyR" && !e.metaKey && !e.ctrlKey) {
        st.resetInteraction();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 cursor-crosshair overflow-hidden bg-black outline-none"
      onDoubleClick={() => useDuatStore.getState().resetInteraction()}
      role="application"
      aria-label="Duat Visual Lab"
    >
      <HallOfMaatGate />
      <LoadingOverlay />
      <MaatAudio />
      <Overlay
        settingsOpen={settingsOpen}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
