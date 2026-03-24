"use client";

import * as THREE from "three";

export function Feather() {
  return (
    <group position={[0, 0.1, 0]} rotation={[0.2, 0.35, -0.45]}>
      <mesh castShadow>
        <planeGeometry args={[0.06, 0.52]} />
        <meshPhysicalMaterial
          color="#f8f3ea"
          emissive="#fff8e8"
          emissiveIntensity={0.28}
          metalness={0.02}
          roughness={0.48}
          transmission={0.38}
          thickness={0.12}
          ior={1.35}
          transparent
          opacity={0.97}
          side={THREE.DoubleSide}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh castShadow position={[0.04, 0.02, 0.01]} rotation={[0, 0, 0.15]}>
        <planeGeometry args={[0.05, 0.4]} />
        <meshPhysicalMaterial
          color="#ebe4d8"
          emissive="#f2ead8"
          emissiveIntensity={0.18}
          metalness={0.02}
          roughness={0.52}
          transmission={0.28}
          thickness={0.1}
          ior={1.32}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          envMapIntensity={0.45}
        />
      </mesh>
      <mesh position={[0, 0.22, 0.02]}>
        <boxGeometry args={[0.02, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#ffe08a"
          emissiveIntensity={0.55}
          metalness={0.88}
          roughness={0.22}
          envMapIntensity={0.9}
        />
      </mesh>
    </group>
  );
}
