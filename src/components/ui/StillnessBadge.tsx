"use client";

import { useEffect, useRef, useState } from "react";
import { useDuatStore } from "@/lib/store";

const THRESH = 0.08;
const TICK_MS = 120;
const SHOW_AFTER_SEC = 2.1;

export function StillnessBadge() {
  const locale = useDuatStore((s) => s.prefs.locale);
  const [sec, setSec] = useState(0);
  const accRef = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      const { balance, locked } = useDuatStore.getState();
      if (!locked && Math.abs(balance) < THRESH) {
        accRef.current += TICK_MS / 1000;
      } else {
        accRef.current = 0;
      }
      setSec(accRef.current);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  if (sec < SHOW_AFTER_SEC) return null;

  return (
    <p
      className="text-[10px] tracking-[0.2em] text-emerald-800/90"
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      aria-live="polite"
    >
      {locale === "zh"
        ? `止息 ${sec.toFixed(1)}s — 秤梁近乎忘记倾斜`
        : `Still ${sec.toFixed(1)}s — the beam nearly forgets tilt`}
    </p>
  );
}
