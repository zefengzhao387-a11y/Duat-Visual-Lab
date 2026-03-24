"use client";

import * as THREE from "three";

export function Feather() {
  return (
    <group position={[0, 0.1, 0]} rotation={[0.2, 0.35, -0.45]}>
      <mesh castShadow>
        <planeGeometry args={[0.06, 0.52]} />
        <meshStandardMaterial
          color="#f5f0e6"
          emissive="#fff8e8"
          emissiveIntensity={0.35}
          metalness={0.05}
          roughness={0.65}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
        />
      </mesh>
      <mesh castShadow position={[0.04, 0.02, 0.01]} rotation={[0, 0, 0.15]}>
        <planeGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial
          color="#ebe4d8"
          emissive="#f2ead8"
          emissiveIntensity={0.22}
          metalness={0.05}
          roughness={0.7}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0, 0.22, 0.02]}>
        <boxGeometry args={[0.02, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#ffe08a"
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}
