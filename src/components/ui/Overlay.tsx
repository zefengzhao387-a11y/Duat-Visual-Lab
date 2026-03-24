"use client";

import { useBalanceStore } from "@/lib/store";

function balanceLabel(balance: number): string {
  const a = Math.abs(balance);
  if (a < 0.08) return "Equilibrium — the feather and the heart align.";
  if (balance > 0) return `Maat tilts east — excess ${(a * 100).toFixed(0)}%.`;
  return `Maat tilts west — deficit ${(a * 100).toFixed(0)}%.`;
}

export function Overlay() {
  const balance = useBalanceStore((s) => s.balance);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-10"
      aria-hidden
    >
      <header className="flex flex-col gap-1">
        <h1
          className="text-2xl tracking-[0.35em] text-amber-100/90 md:text-3xl"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          DUAT 𓇽
        </h1>
        <p
          className="max-w-md text-xs uppercase tracking-widest text-neutral-500"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Hall of Maat
        </p>
      </header>

      <footer className="max-w-lg">
        <p
          className={`text-sm leading-relaxed transition-colors duration-300 md:text-base ${
            Math.abs(balance) > 0.25
              ? "text-red-400/95"
              : "text-neutral-400"
          }`}
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {balanceLabel(balance)}
        </p>
      </footer>
    </div>
  );
}
