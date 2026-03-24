"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo } from "react";
import { Vector2 } from "three";
import { useDuatStore } from "@/lib/store";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";

type EffectsProps = {
  balance: number;
};

export function Effects({ balance }: EffectsProps) {
  const bloomM = useDuatStore((s) => s.prefs.bloom);
  const noiseM = useDuatStore((s) => s.prefs.noise);
  const vignetteM = useDuatStore((s) => s.prefs.vignette);
  const motionPref = useDuatStore((s) => s.prefs.motion);
  const reduce = useEffectiveReducedMotion(motionPref);

  const stress = Math.min(1, Math.abs(balance));
  const motionScale = reduce ? 0.35 : 1;
  const hueShift = stress * -0.12 * motionScale;
  const saturation = stress * 0.45 * motionScale;

  const chromaOffset = useMemo(() => {
    const s = stress * motionScale * vignetteM;
    return new Vector2(s * 0.00165, s * 0.00105);
  }, [stress, motionScale, vignetteM]);

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.82}
        luminanceSmoothing={0.25}
        mipmapBlur
        intensity={1.12 * bloomM * (reduce ? 0.78 : 1)}
        radius={0.72}
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        premultiply
        opacity={0.034 * noiseM * (reduce ? 0.4 : 1)}
      />
      <HueSaturation hue={hueShift} saturation={saturation} />
      <Vignette
        eskil={false}
        offset={0.12}
        darkness={(0.82 + stress * 0.1) * vignetteM}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={chromaOffset}
        radialModulation
        modulationOffset={0.13}
      />
    </EffectComposer>
  );
}
