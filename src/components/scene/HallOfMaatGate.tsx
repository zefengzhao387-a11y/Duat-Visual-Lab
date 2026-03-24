"use client";

import dynamic from "next/dynamic";

const HallOfMaat = dynamic(
  () =>
    import("./HallOfMaat").then((mod) => ({
      default: mod.HallOfMaat,
    })),
  { ssr: false },
);

export function HallOfMaatGate() {
  return <HallOfMaat />;
}
