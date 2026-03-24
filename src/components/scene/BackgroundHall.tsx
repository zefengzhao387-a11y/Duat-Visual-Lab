"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLS = 14;
const STAR_COUNT = 900;

export function BackgroundHall() {
  const stars = useRef<THREE.Points>(null);

  const starGeom = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 28 + Math.random() * 42;
      const θ = Math.random() * Math.PI * 2;
      const φ = Math.acos(2 * Math.random() - 1);
      const yBias = 0.35 + Math.random() * 0.65;
      pos[i * 3] = r * Math.sin(φ) * Math.cos(θ);
      pos[i * 3 + 1] = r * Math.cos(φ) * yBias + 6;
      pos[i * 3 + 2] = r * Math.sin(φ) * Math.sin(θ) - 18;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);

  const columns = useMemo(() => {
    const items: {
      x: number;
      z: number;
      h: number;
      w: number;
      d: number;
      rot: number;
    }[] = [];
    for (let i = 0; i < COLS; i++) {
      const a = (i / COLS) * Math.PI * 2 + (i % 2) * 0.2;
      const r = 9 + (i % 3) * 0.6;
      items.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r - 10,
        h: 5.5 + (i % 4) * 0.8,
        w: 0.35 + (i % 2) * 0.08,
        d: 0.35 + (i % 3) * 0.06,
        rot: a + Math.PI / 2,
      });
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (stars.current) {
      stars.current.rotation.y = clock.elapsedTime * 0.012;
    }
  });

  return (
    <group>
      {columns.map((c, i) => (
        <mesh
          key={i}
          position={[c.x, -1.25 + c.h / 2, c.z]}
          rotation={[0, c.rot, 0]}
          castShadow={false}
          receiveShadow
        >
          <boxGeometry args={[c.w, c.h, c.d]} />
          <meshStandardMaterial
            color="#07060a"
            metalness={0.2}
            roughness={0.92}
            emissive="#0a0812"
            emissiveIntensity={0.04}
          />
        </mesh>
      ))}
      <points ref={stars} geometry={starGeom}>
        <pointsMaterial
          size={0.045}
          color="#9ecfff"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <mesh position={[0, 4.5, -26]} rotation={[0.15, 0, 0]}>
        <planeGeometry args={[120, 36]} />
        <meshBasicMaterial
          color="#040308"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
