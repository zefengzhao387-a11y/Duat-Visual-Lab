import type { Metadata } from "next";
import { Cinzel, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const notoSc = Noto_Serif_SC({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Duat Visual Lab — 杜阿特视觉实验室",
    template: "%s · Duat Visual Lab",
  },
  description: "Hall of Maat — 玛阿特之厅 · 杜阿特视觉实验室",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${cinzel.variable} ${geistMono.variable} ${notoSc.variable}`}
    >
      <body className={cinzel.className}>{children}</body>
    </html>
  );
}
