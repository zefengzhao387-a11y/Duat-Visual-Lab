import type { Metadata } from "next";
import Link from "next/link";
import { ritualBlocks } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: "仪式",
  description: "称量厅操作说明与设置提示。",
};

export default function RitualPage() {
  const zh = ritualBlocks.zh;
  const en = ritualBlocks.en;

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <p
          className="text-[10px] uppercase tracking-[0.45em] text-amber-700/75"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Rite / 仪式
        </p>
        <h1
          className="mt-2 text-3xl text-amber-50 sm:text-4xl"
          style={{ fontFamily: "var(--font-noto-sc), var(--font-cinzel), serif" }}
        >
          键位与仪轨
        </h1>
        <p
          className="mt-4 text-sm text-neutral-500"
          style={{ fontFamily: "var(--font-noto-sc), serif" }}
        >
          {zh.intro}
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <h2
            className="mb-6 border-b border-amber-950/30 pb-2 text-xs uppercase tracking-[0.3em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            中文
          </h2>
          <ShortcutTable rows={zh.shortcuts} />
          <p
            className="mt-8 text-sm leading-relaxed text-neutral-400"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            {zh.settingsHint}
          </p>
          <p
            className="mt-3 text-sm leading-relaxed text-neutral-500"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            {zh.audioHint}
          </p>
        </section>
        <section>
          <h2
            className="mb-6 border-b border-amber-950/30 pb-2 text-xs uppercase tracking-[0.3em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            English
          </h2>
          <ShortcutTable rows={en.shortcuts} lang="en" />
          <p
            className="mt-8 text-sm leading-relaxed text-neutral-400"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {en.settingsHint}
          </p>
          <p
            className="mt-3 text-sm leading-relaxed text-neutral-500"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {en.audioHint}
          </p>
        </section>
      </div>

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
          href="/journal"
          className="text-xs text-neutral-600 transition hover:text-neutral-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          简记 →
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

function ShortcutTable({
  rows,
  lang = "zh",
}: {
  rows: readonly { keys: string; desc: string }[];
  lang?: "zh" | "en";
}) {
  return (
    <ul className="space-y-0 divide-y divide-white/5 rounded border border-white/5">
      {rows.map((row) => (
        <li
          key={row.keys}
          className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6"
        >
          <span
            className="shrink-0 text-[11px] uppercase tracking-wider text-amber-600/90"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {row.keys}
          </span>
          <span
            className="text-sm text-neutral-400"
            style={
              lang === "zh"
                ? { fontFamily: "var(--font-noto-sc), serif" }
                : { fontFamily: "var(--font-cinzel), serif" }
            }
          >
            {row.desc}
          </span>
        </li>
      ))}
    </ul>
  );
}
