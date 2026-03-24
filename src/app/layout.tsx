import type { Metadata } from "next";
import { Cinzel, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Duat Visual Lab",
  description: "Hall of Maat — balance visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${geistMono.variable}`}>
      <body className={cinzel.className}>{children}</body>
    </html>
  );
}
