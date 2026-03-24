import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "门廊",
  description:
    "杜阿特视觉实验室入口 — 玛阿特称量厅、文献与仪式说明。",
};

export default function ThresholdPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="relative overflow-hidden rounded-sm border border-amber-950/25 bg-gradient-to-b from-amber-950/10 via-black/40 to-black px-6 py-14 sm:px-10 sm:py-20">
        <div
          className="pointer-events-none absolute -right-8 top-0 text-[10rem] leading-none text-amber-500/[0.04] sm:text-[14rem]"
          aria-hidden
        >
          𓇽
        </div>
        <p
          className="mb-4 text-[10px] uppercase tracking-[0.5em] text-amber-700/70"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Threshold / 门阈
        </p>
        <h1
          className="max-w-2xl text-3xl leading-tight text-amber-50 sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-noto-sc), var(--font-cinzel), serif" }}
        >
          在称量之前，
          <span className="text-amber-200/55">先经过</span>
          一扇只向内侧开的门。
        </h1>
        <p
          className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400"
          style={{ fontFamily: "var(--font-noto-sc), serif" }}
        >
          这里不是神庙的复制品，而是一间借埃及冥界语法搭建的交互暗室。你可以进入称量厅扰动天平，也可以先读文献、查键位与仪式说明。
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/hall"
            className="inline-flex items-center justify-center border border-amber-600/50 bg-amber-950/40 px-8 py-3 text-sm tracking-[0.2em] text-amber-50 transition hover:border-amber-400/60 hover:bg-amber-900/35"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
            prefetch
          >
            进入称量厅
          </Link>
          <Link
            href="/ritual"
            className="inline-flex items-center justify-center border border-white/10 px-6 py-3 text-xs tracking-widest text-neutral-400 transition hover:border-amber-900/40 hover:text-amber-100/90"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            prefetch
          >
            仪式与键位
          </Link>
          <Link
            href="/lore"
            className="inline-flex items-center justify-center border border-white/10 px-6 py-3 text-xs tracking-widest text-neutral-400 transition hover:border-amber-900/40 hover:text-amber-100/90"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            prefetch
          >
            杜阿特文献
          </Link>
          <Link
            href="/journal"
            className="inline-flex items-center justify-center border border-white/10 px-6 py-3 text-xs tracking-widest text-neutral-400 transition hover:border-amber-900/40 hover:text-amber-100/90"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            prefetch
          >
            沙上简记
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article className="duat-card border border-white/5 p-6">
          <h2
            className="text-xs uppercase tracking-[0.35em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Hall
          </h2>
          <p
            className="mt-3 text-lg text-neutral-200"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            全屏 WebGL 场景：光、雾、柱廊与天平。指针与滚轮改变读数，画面与声场随之倾斜。
          </p>
        </article>
        <article className="duat-card border border-white/5 p-6">
          <h2
            className="text-xs uppercase tracking-[0.35em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Lore
          </h2>
          <p
            className="mt-3 text-lg text-neutral-200"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            杜阿特、玛阿特与「本实验室在做什么」——用散文而非法条，交代这条视觉管道的神话借喻。
          </p>
        </article>
        <article className="duat-card border border-white/5 p-6">
          <h2
            className="text-xs uppercase tracking-[0.35em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Rite
          </h2>
          <p
            className="mt-3 text-lg text-neutral-200"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            键盘、滚轮、双击与设置侧栏；减少动态与画质档位，方便不同设备与感官需求。
          </p>
        </article>
        <article className="duat-card border border-white/5 p-6">
          <h2
            className="text-xs uppercase tracking-[0.35em] text-amber-700/80"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Journal
          </h2>
          <p
            className="mt-3 text-lg text-neutral-200"
            style={{ fontFamily: "var(--font-noto-sc), serif" }}
          >
            短章与碎片句子，与称量同题——可读可跳过，像沙上字迹，风一吹就散。
          </p>
        </article>
      </section>

      <section className="border-l-2 border-amber-900/40 pl-6 sm:pl-8">
        <p
          className="text-sm italic leading-relaxed text-neutral-500 sm:text-base"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          “The feather does not judge — it measures what still listens.”
        </p>
        <p
          className="mt-3 text-xs text-neutral-600"
          style={{ fontFamily: "var(--font-noto-sc), serif" }}
        >
          羽毛并不审判——它只称量，还有什么仍在倾听。
        </p>
      </section>
    </div>
  );
}
