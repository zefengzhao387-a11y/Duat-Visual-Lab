"use client";

import {
  Bloom,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type EffectsProps = {
  balance: number;
};

export function Effects({ balance }: EffectsProps) {
  const stress = Math.min(1, Math.abs(balance));
  const hueShift = stress * -0.12;
  const saturation = stress * 0.45;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.82}
        luminanceSmoothing={0.25}
        mipmapBlur
        intensity={1.15}
        radius={0.72}
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        premultiply
        opacity={0.035}
      />
      <HueSaturation hue={hueShift} saturation={saturation} />
      <Vignette
        eskil={false}
        offset={0.12}
        darkness={0.82 + stress * 0.1}
      />
    </EffectComposer>
  );
}
