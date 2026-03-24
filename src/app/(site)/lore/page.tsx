import type { Metadata } from "next";
import Link from "next/link";
import { loreSections } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: "文献",
  description: "杜阿特、玛阿特与实验室说明。",
};

export default function LorePage() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <p
          className="text-[10px] uppercase tracking-[0.45em] text-amber-700/75"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Archive / 文献
        </p>
        <h1
          className="mt-2 text-3xl text-amber-50 sm:text-4xl"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          杜阿特简牍
        </h1>
        <p
          className="mt-4 text-sm text-neutral-500"
          style={{ fontFamily: "var(--font-noto-sc), serif" }}
        >
          以下为创作性阐释，非学术定本。中英并列，便于不同语境下的阅读。
        </p>
      </header>

      <div className="space-y-16">
        {loreSections.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="scroll-mt-28 border-t border-white/5 pt-10 first:border-0 first:pt-0"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span
                className="text-[10px] text-neutral-600"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className="text-2xl text-amber-100/90"
                style={{ fontFamily: "var(--font-noto-sc), var(--font-cinzel), serif" }}
              >
                {s.titleZh}
              </h2>
              <span
                className="text-sm text-amber-800/60"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {s.titleEn}
              </span>
            </div>
            <p
              className="mt-5 max-w-3xl text-base leading-[1.85] text-neutral-300"
              style={{ fontFamily: "var(--font-noto-sc), serif" }}
            >
              {s.bodyZh}
            </p>
            <p
              className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-500"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              {s.bodyEn}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-8">
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
          href="/"
          className="text-xs text-neutral-600 transition hover:text-neutral-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          ← 返回门廊
        </Link>
      </div>
    </div>
  );
}
