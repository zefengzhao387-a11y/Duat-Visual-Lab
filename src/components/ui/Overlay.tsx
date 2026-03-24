"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useDuatStore } from "@/lib/store";
import { getHints, getStatusLine, pickNarrative } from "@/lib/copy";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";
import { StillnessBadge } from "@/components/ui/StillnessBadge";

type Props = {
  settingsOpen: boolean;
  onOpenSettings: () => void;
};

function Reticle({ stress, reduce }: { stress: number; reduce: boolean }) {
  const skew = stress * 6 * (reduce ? 0.25 : 1);
  return (
    <div
      className="pointer-events-none fixed left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div
        className="relative h-14 w-14 opacity-[0.14]"
        style={{
          transform: `rotate(${skew}deg)`,
          transition: reduce ? "none" : "transform 0.4s ease-out",
        }}
      >
        <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-amber-200/80 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-7 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" />
        <div className="absolute right-0 top-1/2 h-px w-7 -translate-y-1/2 bg-gradient-to-l from-transparent via-amber-200/80 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-7 w-px -translate-x-1/2 bg-gradient-to-t from-transparent via-amber-200/80 to-transparent" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/25" />
    </div>
  );
}

export function Overlay({ settingsOpen, onOpenSettings }: Props) {
  const balance = useDuatStore((s) => s.balance);
  const locked = useDuatStore((s) => s.locked);
  const locale = useDuatStore((s) => s.prefs.locale);
  const motionPref = useDuatStore((s) => s.prefs.motion);
  const reduce = useEffectiveReducedMotion(motionPref);

  const [narrativeTick, setNarrativeTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setNarrativeTick((n) => n + 1), 14000);
    return () => window.clearInterval(t);
  }, []);

  const stress = Math.min(1, Math.abs(balance));
  const narrative = pickNarrative(locale, balance, narrativeTick);
  const status = getStatusLine(locale, balance, locked);
  const hints = getHints(locale);

  const titleMotion: ReactNode = reduce ? (
    <span className="inline-block">DUAT 𓇽</span>
  ) : (
    <span className="duat-title-breathe inline-block">DUAT 𓇽</span>
  );

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-10">
        <header className="flex flex-col gap-2 pr-14">
          <h1
            className="text-2xl tracking-[0.35em] text-amber-100/90 md:text-3xl"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {titleMotion}
          </h1>
          <p
            className="max-w-md text-xs uppercase tracking-widest text-neutral-500"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {locale === "zh" ? "玛阿特之厅" : "Hall of Maat"}
          </p>
          {locked && (
            <p
              className="text-[10px] tracking-widest text-amber-500/80"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {locale === "zh" ? "● 冻结" : "● FROZEN"}
            </p>
          )}
          <StillnessBadge />
        </header>

        <Reticle stress={stress} reduce={reduce} />

        <footer className="pointer-events-none flex max-w-xl flex-col gap-4">
          <div
            className={`space-y-2 border-l border-white/10 pl-4 transition-colors duration-500 ${
              stress > 0.28 ? "border-red-900/40" : ""
            }`}
          >
            <p
              className={`text-[11px] uppercase tracking-[0.25em] ${
                stress > 0.45 ? "text-red-300/90" : "text-amber-200/70"
              }`}
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              {narrative.title}
            </p>
            <p
              className={`text-sm leading-relaxed md:text-[15px] ${
                stress > 0.35 ? "text-red-200/85" : "text-neutral-300"
              }`}
              style={{
                fontFamily:
                  locale === "zh"
                    ? "var(--font-noto-sc), var(--font-cinzel), serif"
                    : "var(--font-cinzel), serif",
              }}
            >
              {narrative.verse}
            </p>
          </div>
          <p
            className={`text-xs leading-relaxed transition-colors duration-300 md:text-sm ${
              stress > 0.25 ? "text-red-400/95" : "text-neutral-500"
            }`}
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            aria-live="polite"
            aria-atomic="true"
          >
            {status}
          </p>
          <p
            className="max-w-lg text-[10px] leading-relaxed text-neutral-600"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {hints}
          </p>
        </footer>
      </div>

      <button
        type="button"
        onClick={onOpenSettings}
        className="pointer-events-auto fixed right-5 top-5 z-20 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-widest text-neutral-400 backdrop-blur-sm transition hover:border-amber-900/50 hover:text-amber-100/90"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        aria-haspopup="dialog"
        aria-expanded={settingsOpen}
      >
        {locale === "zh" ? "设定" : "Set"}
      </button>
    </>
  );
}
