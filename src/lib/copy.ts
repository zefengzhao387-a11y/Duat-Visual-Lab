import type { Locale } from "./store";

type Zone = "still" | "calm" | "tension" | "severe";

function zoneFor(balance: number): Zone {
  const a = Math.abs(balance);
  if (a < 0.08) return "still";
  if (a < 0.28) return "calm";
  if (a < 0.55) return "tension";
  return "severe";
}

const narrative: Record<
  Locale,
  Record<Zone, { title: string; verse: string }[]>
> = {
  zh: {
    still: [
      {
        title: "寂静称量",
        verse: "羽毛与心脏同重，时间在此停驻一瞬。",
      },
      {
        title: "玛阿特",
        verse: "真理如水平线，不升不降，只映照你的呼吸。",
      },
      {
        title: "屏息刻度",
        verse: "若你能在此停留数秒，秤梁会忘记你的名字——只剩均匀的微光。",
      },
    ],
    calm: [
      {
        title: "微风之偏",
        verse: "秤梁轻颤，像远处有人低声念诵你的名字。",
      },
      {
        title: "余量",
        verse: "失衡尚浅，仍可被原谅为一次迟疑。",
      },
      {
        title: "偏移练习",
        verse: "不必急着回中。先看清自己习惯倒向哪一侧，再谈原谅。",
      },
    ],
    tension: [
      {
        title: "审判临近",
        verse: "光柱收紧，阴影爬上秤盘——你听见自己的回声变重。",
      },
      {
        title: "警告",
        verse: "杜阿特不审判意图，只称量后果的分量。",
      },
    ],
    severe: [
      {
        title: "秤锤倾斜",
        verse: "深渊在底部亮起暗红，像沉睡之物正在翻身。",
      },
      {
        title: "终局之问",
        verse: "你的心是否比一根羽毛更轻？此刻，秤在替你回答。",
      },
    ],
  },
  en: {
    still: [
      {
        title: "Quiet Weighing",
        verse: "Feather and heart share one weight; time hesitates.",
      },
      {
        title: "Maat",
        verse: "Truth is a level line—neither rising nor falling.",
      },
      {
        title: "Held Breath",
        verse: "Linger a few seconds in the middle—the beam forgets your name; only even light remains.",
      },
    ],
    calm: [
      {
        title: "A Slight Lean",
        verse: "The beam trembles like a distant voice speaking your name.",
      },
      {
        title: "Margin",
        verse: "The tilt is still forgivable as hesitation.",
      },
      {
        title: "Practice of Bias",
        verse: "No need to rush upright. Notice which side you favor—then talk about mercy.",
      },
    ],
    tension: [
      {
        title: "Verdict Near",
        verse: "Light tightens; shadow climbs the pans—you hear your echo gain mass.",
      },
      {
        title: "Warning",
        verse: "Duat does not weigh intent—only the mass of consequence.",
      },
    ],
    severe: [
      {
        title: "The Beam Gives Way",
        verse: "Abyss glows ember-red below, as if something slept and turned.",
      },
      {
        title: "The Final Question",
        verse: "Is your heart lighter than a feather? The scales answer for you.",
      },
    ],
  },
};

const statusLine: Record<
  Locale,
  (balance: number, locked: boolean) => string
> = {
  zh: (balance, locked) => {
    if (locked) return "称量已冻结 — 空格解除锁定";
    const a = Math.abs(balance);
    const pct = (a * 100).toFixed(0);
    if (a < 0.08) return "平衡 — 指针与羽毛对齐";
    if (balance > 0) return `向东倾斜 — 余量 ${pct}%`;
    return `向西倾斜 — 亏欠 ${pct}%`;
  },
  en: (balance, locked) => {
    if (locked) return "Weighing frozen — Space to release";
    const a = Math.abs(balance);
    const pct = (a * 100).toFixed(0);
    if (a < 0.08) return "Equilibrium — feather and heart align";
    if (balance > 0) return `Tilts east — excess ${pct}%`;
    return `Tilts west — deficit ${pct}%`;
  },
};

const hints: Record<Locale, string> = {
  zh: "移动指针 · 滚轮微调 · 双击重置 · 空格冻结 · ←→ 轻推 · R 归零 · 短文见 /journal",
  en: "Pointer · Wheel · Double-click reset · Space freeze · Arrows · R reset · Fragments at /journal",
};

export function pickNarrative(
  locale: Locale,
  balance: number,
  tick: number,
): { title: string; verse: string } {
  const z = zoneFor(balance);
  const pool = narrative[locale][z];
  const i = Math.floor(tick) % pool.length;
  return pool[i]!;
}

export function getStatusLine(
  locale: Locale,
  balance: number,
  locked: boolean,
): string {
  return statusLine[locale](balance, locked);
}

export function getHints(locale: Locale): string {
  return hints[locale];
}
