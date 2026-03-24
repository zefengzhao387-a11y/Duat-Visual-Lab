"use client";

import { useEffect, useRef } from "react";
import { useDuatStore } from "@/lib/store";

/**
 * 氛围低频 + 紧张层。必须在用户手势后创建上下文并 resume()，否则浏览器会一直保持 suspended。
 * 启动条件：点击、按键、滚轮、触摸、或第一次在称量区移动指针（很多人只移鼠标不点按）。
 */
export function MaatAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const tensionRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const startedRef = useRef(false);

  const balance = useDuatStore((s) => s.balance);
  const audioOn = useDuatStore((s) => s.prefs.audioEnabled);
  const volume = useDuatStore((s) => s.prefs.audioVolume);
  const stress = Math.min(1, Math.abs(balance));

  useEffect(() => {
    const boot = () => {
      if (startedRef.current) return;
      const AC =
        window.AudioContext ||
        (
          window as unknown as {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;
      if (!AC) return;

      startedRef.current = true;
      const ctx = new AC();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      masterRef.current = master;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      filter.Q.value = 0.7;
      filter.connect(master);
      filterRef.current = filter;

      const oscA = ctx.createOscillator();
      oscA.type = "sine";
      oscA.frequency.value = 55;
      oscA.connect(filter);

      const oscB = ctx.createOscillator();
      oscB.type = "sine";
      oscB.frequency.value = 110.25;
      oscB.connect(filter);

      const tension = ctx.createGain();
      tension.gain.value = 0.0001;
      const oscT = ctx.createOscillator();
      oscT.type = "triangle";
      oscT.frequency.value = 196;
      oscT.connect(tension);
      tension.connect(filter);
      tensionRef.current = tension;

      oscA.start();
      oscB.start();
      oscT.start();

      const applyGainRamp = () => {
        const t0 = ctx.currentTime;
        const t1 = t0 + 0.6;
        const m = master.gain;
        m.cancelScheduledValues(t0);
        m.setValueAtTime(Math.max(0.0001, m.value), t0);
        const peak = Math.max(0.06, volume * 0.42);
        m.linearRampToValueAtTime(peak, t1);
      };

      void ctx.resume().then(applyGainRamp);
    };

    const opts = { capture: true, passive: true } as const;
    const moveOnce = () => {
      boot();
      window.removeEventListener("pointermove", moveOnce, opts);
    };

    window.addEventListener("pointerdown", boot, opts);
    window.addEventListener("keydown", boot, opts);
    window.addEventListener("wheel", boot, opts);
    window.addEventListener("touchstart", boot, opts);
    window.addEventListener("pointermove", moveOnce, opts);

    return () => {
      window.removeEventListener("pointerdown", boot, opts);
      window.removeEventListener("keydown", boot, opts);
      window.removeEventListener("wheel", boot, opts);
      window.removeEventListener("touchstart", boot, opts);
      window.removeEventListener("pointermove", moveOnce, opts);
    };
  }, [volume]);

  useEffect(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    const tension = tensionRef.current;
    const filt = filterRef.current;
    if (!ctx || !master || !tension || !filt) return;

    void ctx.resume();

    const now = ctx.currentTime;
    const drone =
      audioOn && startedRef.current
        ? Math.max(0.05, volume * 0.45)
        : 0.0001;

    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), now);
    master.gain.linearRampToValueAtTime(drone, now + 0.4);

    const tTarget = audioOn ? stress * volume * 0.22 : 0.0001;
    tension.gain.cancelScheduledValues(now);
    tension.gain.setValueAtTime(Math.max(0.0001, tension.gain.value), now);
    tension.gain.linearRampToValueAtTime(tTarget, now + 0.25);

    const fq = 380 + (1 - stress) * 220;
    filt.frequency.cancelScheduledValues(now);
    filt.frequency.setValueAtTime(filt.frequency.value, now);
    filt.frequency.linearRampToValueAtTime(fq, now + 0.28);
  }, [audioOn, volume, stress]);

  return null;
}
