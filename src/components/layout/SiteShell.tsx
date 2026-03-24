"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", labelZh: "门廊", labelEn: "Threshold" },
  { href: "/hall", labelZh: "称量厅", labelEn: "Hall" },
  { href: "/lore", labelZh: "文献", labelEn: "Lore" },
  { href: "/journal", labelZh: "简记", labelEn: "Journal" },
  { href: "/ritual", labelZh: "仪式", labelEn: "Rite" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="duat-site-grain min-h-full bg-[#030204] text-neutral-200">
      <a
        href="#site-main"
        className="duat-skip focus:not-sr-only sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:border focus:border-amber-700/50 focus:bg-black focus:px-3 focus:py-2 focus:text-xs focus:text-amber-100"
      >
        跳过导航
      </a>
      <header className="sticky top-0 z-40 border-b border-amber-950/30 bg-black/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            href="/"
            className="group flex items-baseline gap-3 transition hover:text-amber-100"
          >
            <span
              className="text-lg tracking-[0.28em] text-amber-100/95"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              DUAT
            </span>
            <span className="text-amber-200/40 transition group-hover:text-amber-200/70">
              𓇽
            </span>
            <span
              className="hidden text-[10px] uppercase tracking-[0.35em] text-neutral-600 sm:inline"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Visual Lab
            </span>
          </Link>
          <nav
            className="flex flex-wrap gap-1 sm:gap-2"
            aria-label="站点导航"
          >
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded border px-3 py-1.5 text-xs transition sm:text-[13px] ${
                    active
                      ? "border-amber-800/50 bg-amber-950/25 text-amber-100"
                      : "border-transparent text-neutral-500 hover:border-amber-900/30 hover:text-amber-200/90"
                  }`}
                  style={{ fontFamily: "var(--font-noto-sc), serif" }}
                >
                  <span className="sm:hidden">{item.labelZh}</span>
                  <span className="hidden sm:inline">
                    {item.labelZh}
                    <span
                      className="ml-1.5 text-[10px] uppercase tracking-widest text-neutral-600"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      {item.labelEn}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main
        id="site-main"
        className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14"
        tabIndex={-1}
      >
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.4em] text-neutral-600"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Duat Visual Lab · 神话语法 · 交互镜像
        </p>
      </footer>
    </div>
  );
}
