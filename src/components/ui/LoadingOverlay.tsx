"use client";

import { useEffect, useState } from "react";
import { useDuatStore } from "@/lib/store";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";

const MIN_MS = 720;

export function LoadingOverlay() {
  const sceneReady = useDuatStore((s) => s.sceneReady);
  const motionPref = useDuatStore((s) => s.prefs.motion);
  const locale = useDuatStore((s) => s.prefs.locale);
  const reduce = useEffectiveReducedMotion(motionPref);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!sceneReady) {
      setVisible(true);
      return;
    }
    const t = window.setTimeout(() => setVisible(false), MIN_MS);
    return () => window.clearTimeout(t);
  }, [sceneReady]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black transition-opacity duration-700 ${
        sceneReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={!sceneReady}
    >
      <div
        className={`text-5xl text-amber-100/90 md:text-6xl ${
          reduce ? "" : "duat-pulse-glyph"
        }`}
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        𓇽
      </div>
      <p
        className="text-xs tracking-[0.4em] text-neutral-500"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {locale === "zh" ? "杜阿特视觉实验室" : "DUAT VISUAL LAB"}
      </p>
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
      <p
        className="max-w-xs text-center text-[11px] leading-relaxed text-neutral-600"
        style={{
          fontFamily:
            locale === "zh"
              ? "var(--font-noto-sc), var(--font-cinzel), serif"
              : "var(--font-cinzel), serif",
        }}
      >
        {locale === "zh"
          ? "正在唤醒称量之厅…"
          : "Awakening the Hall of Maat…"}
      </p>
    </div>
  );
}
