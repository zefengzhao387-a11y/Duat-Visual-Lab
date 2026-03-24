import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-[#030204] px-6 text-center">
      <p
        className="text-[10px] uppercase tracking-[0.5em] text-amber-800/80"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        404
      </p>
      <h1
        className="text-2xl text-amber-100/90"
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        此门未开
      </h1>
      <p
        className="max-w-sm text-sm text-neutral-500"
        style={{ fontFamily: "var(--font-noto-sc), serif" }}
      >
        路径不存在，或已被沙埋。返回门廊重新开始。
      </p>
      <Link
        href="/"
        className="border border-amber-800/40 px-5 py-2 text-xs tracking-widest text-amber-200/90 transition hover:bg-amber-950/30"
        style={{ fontFamily: "var(--font-cinzel), serif" }}
      >
        门廊
      </Link>
    </div>
  );
}
