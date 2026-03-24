import type { Metadata } from "next";
import Link from "next/link";
import { journalFragments } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: "简记",
  description: "杜阿特视觉实验室 — 短章与碎片。",
};

export default function JournalPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <p
          className="text-[10px] uppercase tracking-[0.45em] text-amber-700/75"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Journal / 简记
        </p>
        <h1
          className="mt-2 text-3xl text-amber-50 sm:text-4xl"
          style={{ fontFamily: "var(--font-noto-sc), var(--font-cinzel), serif" }}
        >
          沙上短章
        </h1>
        <p
          className="mt-4 text-sm text-neutral-500"
          style={{ fontFamily: "var(--font-noto-sc), serif" }}
        >
          非教程、非教义，只是与称量厅同主题的随笔句子。可随时离开，不必读完。
        </p>
      </header>

      <ol className="space-y-10 border-l border-amber-950/25 pl-6 sm:pl-8">
        {journalFragments.map((frag, i) => (
          <li key={frag.id} className="relative">
            <span
              className="absolute -left-6 top-1 font-mono text-[10px] text-amber-900/50 sm:-left-8"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className="text-base leading-[1.9] text-neutral-300"
              style={{ fontFamily: "var(--font-noto-sc), serif" }}
            >
              {frag.zh}
            </p>
            <p
              className="mt-3 text-sm leading-relaxed text-neutral-600"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              {frag.en}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap gap-4 border-t border-white/5 pt-10">
        <Link
          href="/hall"
          className="border border-amber-800/40 px-5 py-2 text-xs tracking-widest text-amber-200/90 transition hover:bg-amber-950/30"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
          prefetch
        >
          进入称量厅 →
        </Link>
        <Link
          href="/lore"
          className="text-xs text-neutral-600 transition hover:text-neutral-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          文献 →
        </Link>
        <Link
          href="/"
          className="text-xs text-neutral-600 transition hover:text-neutral-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          ← 门廊
        </Link>
      </div>
    </div>
  );
}
