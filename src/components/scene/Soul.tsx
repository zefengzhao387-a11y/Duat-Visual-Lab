"use client";

import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDuatStore } from "@/lib/store";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";

const COUNT = 180;

export function Soul() {
  const points = useRef<THREE.Points>(null);
  const core = useRef<THREE.Mesh>(null);
  const motionPref = useDuatStore((s) => s.prefs.motion);
  const reduce = useEffectiveReducedMotion(motionPref);

  const particleGeom = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 0.08 + Math.random() * 0.22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const mScale = reduce ? 0.35 : 1;
    if (points.current) {
      points.current.rotation.y = t * 0.35 * mScale;
      const m = points.current.material as THREE.PointsMaterial;
      const base = reduce ? 0.42 : 0.45;
      const amp = reduce ? 0.02 : 0.08;
      m.opacity = base + Math.sin(t * 1.2) * amp;
    }
    if (core.current) {
      core.current.rotation.y = t * 0.5 * mScale;
      core.current.rotation.x = Math.sin(t * 0.4) * 0.12 * mScale;
    }
  });

  const inner = (
    <group position={[0, 0.12, 0]}>
      <mesh ref={core} castShadow>
        <icosahedronGeometry args={[0.14, 1]} />
        <meshStandardMaterial
          color="#7ec8e8"
          emissive="#4af"
          emissiveIntensity={reduce ? 1.05 : 1.4}
          metalness={0.2}
          roughness={0.15}
          transparent
          opacity={0.92}
          envMapIntensity={0.85}
        />
      </mesh>
      <points ref={points} geometry={particleGeom}>
        <pointsMaterial
          size={0.035}
          color="#a8f0ff"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );

  if (reduce) {
    return inner;
  }

  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.2}>
      {inner}
    </Float>
  );
}
