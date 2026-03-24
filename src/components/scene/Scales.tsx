"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Feather } from "./Feather";
import { Soul } from "./Soul";

const BEAM_HALF = 1.15;
const MAX_TILT = 0.42;

type ScalesProps = {
  balance: number;
};

export function Scales({ balance }: ScalesProps) {
  const beamGroup = useRef<THREE.Group>(null);
  const leftPan = useRef<THREE.Group>(null);
  const rightPan = useRef<THREE.Group>(null);
  const angleRef = useRef(0);

  useFrame((_, delta) => {
    const target = THREE.MathUtils.clamp(balance, -1, 1) * MAX_TILT;
    const t = 1 - Math.exp(-10 * delta);
    angleRef.current = THREE.MathUtils.lerp(angleRef.current, target, t);
    const a = angleRef.current;
    if (beamGroup.current) beamGroup.current.rotation.z = a;
    if (leftPan.current) leftPan.current.rotation.z = -a;
    if (rightPan.current) rightPan.current.rotation.z = -a;
  });

  const stoneMat = (
    <meshStandardMaterial
      color="#2a2418"
      metalness={0.68}
      roughness={0.32}
      envMapIntensity={0.55}
    />
  );

  const goldMat = (
    <meshPhysicalMaterial
      color="#c9a227"
      emissive="#f0d060"
      emissiveIntensity={0.82}
      metalness={0.92}
      roughness={0.18}
      clearcoat={0.85}
      clearcoatRoughness={0.18}
      envMapIntensity={1.1}
    />
  );

  return (
    <group position={[0, -0.35, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.55, 0.72, 0.22, 48]} />
        {stoneMat}
      </mesh>
      <mesh castShadow position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1.35, 24]} />
        {stoneMat}
      </mesh>
      <group ref={beamGroup} position={[0, 1.62, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, BEAM_HALF * 2 + 0.2, 16]} />
          {goldMat}
        </mesh>
        <group ref={leftPan} position={[-BEAM_HALF, 0, 0]}>
          <mesh position={[0, -0.42, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.72, 8]} />
            <meshStandardMaterial color="#1a1510" metalness={0.3} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.82, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.38, 0.06, 32]} />
            {stoneMat}
          </mesh>
          <group position={[0, -0.82, 0]}>
            <Feather />
          </group>
        </group>
        <group ref={rightPan} position={[BEAM_HALF, 0, 0]}>
          <mesh position={[0, -0.42, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.72, 8]} />
            <meshStandardMaterial color="#1a1510" metalness={0.3} roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.82, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.38, 0.06, 32]} />
            {stoneMat}
          </mesh>
          <group position={[0, -0.82, 0]}>
            <Soul />
          </group>
        </group>
      </group>
    </group>
  );
}
