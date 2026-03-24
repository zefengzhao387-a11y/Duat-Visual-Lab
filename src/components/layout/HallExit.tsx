"use client";

import Link from "next/link";

export function HallExit() {
  return (
    <Link
      href="/"
      className="pointer-events-auto fixed left-4 top-4 z-[120] rounded border border-amber-900/40 bg-black/50 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-amber-200/80 backdrop-blur-sm transition hover:border-amber-700/50 hover:bg-black/70 hover:text-amber-50 sm:left-6 sm:top-6 sm:text-[11px]"
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      prefetch
    >
      ← 门廊
    </Link>
  );
}
