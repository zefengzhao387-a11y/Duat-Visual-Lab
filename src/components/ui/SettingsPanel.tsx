"use client";

import type { ReactNode } from "react";
import { useDuatStore, type Quality } from "@/lib/store";

type Props = {
  open: boolean;
  onClose: () => void;
};

const qualityOpts: { v: Quality; zh: string; en: string }[] = [
  { v: "low", zh: "低（性能）", en: "Low" },
  { v: "balanced", zh: "平衡", en: "Balanced" },
  { v: "high", zh: "高", en: "High" },
];

export function SettingsPanel({ open, onClose }: Props) {
  const prefs = useDuatStore((s) => s.prefs);
  const setPref = useDuatStore((s) => s.setPref);
  const zh = prefs.locale === "zh";

  if (!open) return null;

  const row = (label: string, child: ReactNode) => (
    <div className="flex flex-col gap-2 border-b border-white/5 py-3 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-neutral-500">
        {label}
      </span>
      {child}
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-[2px]"
        aria-label={zh ? "关闭设置" : "Close settings"}
        onClick={onClose}
      />
      <aside
        className="fixed bottom-0 right-0 top-0 z-[200] w-[min(100%,22rem)] overflow-y-auto border-l border-white/10 bg-neutral-950/95 p-5 shadow-2xl shadow-black/80"
        role="dialog"
        aria-modal="true"
        aria-labelledby="duat-settings-title"
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2
            id="duat-settings-title"
            className="text-sm tracking-[0.2em] text-amber-100/90"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            {zh ? "仪式设定" : "Ritual settings"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-white/10 px-2 py-1 text-[10px] text-neutral-400 hover:border-amber-900/40 hover:text-amber-200/90"
          >
            ESC
          </button>
        </div>

        {row(
          zh ? "语言" : "Language",
          <div className="flex gap-2">
            {(["zh", "en"] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setPref("locale", loc)}
                className={`rounded px-3 py-1.5 text-xs ${
                  prefs.locale === loc
                    ? "bg-amber-900/40 text-amber-100"
                    : "bg-white/5 text-neutral-400 hover:bg-white/10"
                }`}
              >
                {loc === "zh" ? "中文" : "EN"}
              </button>
            ))}
          </div>,
        )}

        {row(
          zh ? "动态效果" : "Motion",
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["system", zh ? "跟随系统" : "System"],
                ["reduce", zh ? "减少动态" : "Reduce"],
                ["full", zh ? "全开" : "Full"],
              ] as const
            ).map(([v, lab]) => (
              <button
                key={v}
                type="button"
                onClick={() => setPref("motion", v)}
                className={`rounded px-2.5 py-1 text-[11px] ${
                  prefs.motion === v
                    ? "bg-amber-900/35 text-amber-100"
                    : "bg-white/5 text-neutral-500 hover:bg-white/10"
                }`}
              >
                {lab}
              </button>
            ))}
          </div>,
        )}

        {row(
          zh ? "画质" : "Quality",
          <div className="flex flex-col gap-1.5">
            {qualityOpts.map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setPref("quality", o.v)}
                className={`rounded px-3 py-2 text-left text-xs ${
                  prefs.quality === o.v
                    ? "bg-amber-900/30 text-amber-50"
                    : "bg-white/[0.03] text-neutral-400 hover:bg-white/10"
                }`}
              >
                {zh ? o.zh : o.en}
              </button>
            ))}
          </div>,
        )}

        {row(
          zh ? "氛围音效" : "Atmosphere audio",
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.audioEnabled}
              onChange={(e) => setPref("audioEnabled", e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black accent-amber-600"
            />
            <span className="text-xs text-neutral-400">
              {zh
                ? "启用（首次点击 / 滚轮 / 移动指针后生效）"
                : "Enable (after click, wheel, or pointer move)"}
            </span>
          </label>,
        )}

        {row(
          zh ? "音量" : "Volume",
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={prefs.audioVolume}
            onChange={(e) => setPref("audioVolume", Number(e.target.value))}
            className="w-full accent-amber-600"
            disabled={!prefs.audioEnabled}
          />,
        )}

        {row(
          zh ? "辉光" : "Bloom",
          <input
            type="range"
            min={0}
            max={1.4}
            step={0.05}
            value={prefs.bloom}
            onChange={(e) => setPref("bloom", Number(e.target.value))}
            className="w-full accent-amber-600"
          />,
        )}

        {row(
          zh ? "胶片噪点" : "Film noise",
          <input
            type="range"
            min={0}
            max={1.4}
            step={0.05}
            value={prefs.noise}
            onChange={(e) => setPref("noise", Number(e.target.value))}
            className="w-full accent-amber-600"
          />,
        )}

        {row(
          zh ? "暗角" : "Vignette",
          <input
            type="range"
            min={0}
            max={1.4}
            step={0.05}
            value={prefs.vignette}
            onChange={(e) => setPref("vignette", Number(e.target.value))}
            className="w-full accent-amber-600"
          />,
        )}

        <p
          className="mt-6 text-[10px] leading-relaxed text-neutral-600"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {zh
            ? "偏好已写入本机浏览器。"
            : "Preferences are saved in this browser."}
        </p>
      </aside>
    </>
  );
}
