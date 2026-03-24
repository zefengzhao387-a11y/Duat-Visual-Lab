/** 站点级文案 — 文献 / 仪式页 */

export const loreSections = [
  {
    id: "duat",
    titleZh: "杜阿特",
    titleEn: "Duat",
    bodyZh:
      "古埃及人相信，亡魂在抵达永恒的芦苇原之前，须穿越杜阿特——一片由黑夜、门阈与河流组成的地下疆域。这里没有太阳的日常秩序，只有星图、守门者与反复出现的试炼。",
    bodyEn:
      "Before reaching the Field of Reeds, the dead cross the Duat: a night country of gates, rivers, and trials beneath the ordered day.",
  },
  {
    id: "maat",
    titleZh: "玛阿特与天平",
    titleEn: "Maat and the Scales",
    bodyZh:
      "玛阿特既是真理、正义与宇宙节律的人格化，也是称量时所用的「正确标准」。心脏与真理之羽同重，则得以前行；若心重于羽，便面临吞噬与再生的险途。称量不是惩罚的仪式，而是存在是否仍与宇宙和弦相合的判读。",
    bodyEn:
      "Maat names truth, justice, and cosmic measure. The heart must balance the feather; the trial reads whether one still rings true with the world’s chord.",
  },
  {
    id: "lab",
    titleZh: "本实验室在做什么",
    titleEn: "What this lab is",
    bodyZh:
      "「杜阿特视觉实验室」是一个交互式场景：你用指针与滚轮扰动一架象征性的天平，让光、颗粒与后期着色随之倾斜。它没有宗教裁判的意图，只是一面借神话语法搭建的镜子——失衡时，画面与声场会一起变得紧张；归位时，氛围也随之松弛。",
    bodyEn:
      "This lab is an interactive hall: pointer and wheel tilt a symbolic beam; light, grain, and grade follow. It mirrors tension and release—not a verdict, but a grammar borrowed from myth.",
  },
] as const;

export const ritualBlocks = {
  zh: {
    intro:
      "在称量厅中，你的身体成为隐形的砝码。下列操作可在桌面端使用；触控设备以单指拖动为主，滚轮类微调可能不可用。",
    shortcuts: [
      { keys: "鼠标移动", desc: "驱动天平主读数（左右为负正方向）。" },
      { keys: "滚轮", desc: "叠加「余量微调」，与指针位置相加后限制在 ±1。" },
      { keys: "空格", desc: "冻结 / 解冻当前读数（指针仍记录，解冻后恢复）。" },
      { keys: "← / →", desc: "轻推指针。" },
      { keys: "↑ / ↓", desc: "模拟滚轮微调。" },
      { keys: "R", desc: "归零：指针、滚轮偏移与锁定一并清除。" },
      { keys: "双击画面", desc: "与 R 相同，归零。" },
      { keys: "Esc", desc: "关闭设置侧栏（若已打开）。" },
    ],
    settingsHint:
      "右上角「设定」可切换语言、减少动态、画质、氛围音效与后期强度；偏好写在本机浏览器。",
    audioHint:
      "音效在首次点击、按键、滚轮或移动指针后才会启动（浏览器策略）。若无声，请确认「氛围音效」已勾选并把音量滑条拉高。",
  },
  en: {
    intro:
      "In the Hall, your hand becomes an invisible weight. Shortcuts below are for desktop; touch relies mainly on drag.",
    shortcuts: [
      { keys: "Pointer", desc: "Drives the main balance (left / right maps to sign)." },
      { keys: "Wheel", desc: "Adds trim to the reading, clamped together to ±1." },
      { keys: "Space", desc: "Freeze / release the reading." },
      { keys: "← / →", desc: "Nudge the pointer." },
      { keys: "↑ / ↓", desc: "Wheel-like trim." },
      { keys: "R", desc: "Full reset." },
      { keys: "Double-click", desc: "Same as reset." },
      { keys: "Esc", desc: "Close settings panel if open." },
    ],
    settingsHint:
      "Use Set for locale, motion, quality, audio, and post strength; saved locally.",
    audioHint:
      "Audio starts after click, key, wheel, or pointer move (browser policy). If silent, enable atmosphere audio and raise volume.",
  },
} as const;

/** 简记 — 短章，可独立阅读 */
export const journalFragments = [
  {
    id: "gate",
    zh: "每一扇冥界的门都向内开：你先交出方向感，才看得见新的坐标。",
    en: "Every gate in the Duat opens inward: you yield your sense of bearing before new coordinates appear.",
  },
  {
    id: "feather",
    zh: "羽毛不是轻蔑，是刻度——它问的不是你够不够重，而是你还愿不愿意对齐。",
    en: "The feather is not mockery but a gauge—it asks not if you are heavy enough, but if you still consent to align.",
  },
  {
    id: "echo",
    zh: "失衡时，画面替你出声：那不是警告，是回声在找墙壁。",
    en: "When you tilt, the frame speaks for you—not as warning, but as echo seeking a wall.",
  },
  {
    id: "reset",
    zh: "双击归零不是逃避，是把实验台擦干净，再称一次。",
    en: "Double-click reset is not escape—it wipes the bench so you may weigh again.",
  },
  {
    id: "night",
    zh: "星图在称量厅里退得很远，像在说：近处的事交给你，远处的事交给时间。",
    en: "The starfield recedes, as if to say: the near is yours; the far belongs to time.",
  },
  {
    id: "listen",
    zh: "若声场变紧，不必解释——先听三秒，再决定要不要推回中间。",
    en: "If the sound tightens, do not explain—listen three seconds, then choose whether to return to center.",
  },
] as const;
