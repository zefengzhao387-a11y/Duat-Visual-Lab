"use client";

import { useEffect, useState } from "react";
import type { MotionPreference } from "@/lib/store";

export function useEffectiveReducedMotion(
  motionPref: MotionPreference,
): boolean {
  const [systemReduce, setSystemReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduce(mq.matches);
    const on = () => setSystemReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (motionPref === "reduce") return true;
  if (motionPref === "full") return false;
  return systemReduce;
}
