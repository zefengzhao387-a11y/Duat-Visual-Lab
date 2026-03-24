"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { NoToneMapping } from "three";
import { useBalanceStore } from "@/lib/store";
import { Scales } from "./Scales";
import { Effects } from "./Effects";

function BalancePlane() {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const setBalance = useBalanceStore((s) => s.setBalance);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    g.position.copy(camera.position);
    g.quaternion.copy(camera.quaternion);
    g.translateZ(-4);
  });

  return (
    <group ref={group}>
      <mesh
        onPointerMove={(e) => {
          const u = e.uv?.x ?? 0.5;
          const x = (1 - u) * 2 - 1;
          setBalance(Math.max(-1, Math.min(1, x)));
        }}
      >
        <planeGeometry args={[28, 20]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function KeyLight() {
  const ref = useRef<THREE.SpotLight>(null);
  const { scene } = useThree();

  useLayoutEffect(() => {
    const L = ref.current;
    if (!L) return;
    L.target.position.set(0, 0.9, 0);
    scene.add(L.target);
    return () => {
      scene.remove(L.target);
    };
  }, [scene]);

  return (
    <spotLight
      ref={ref}
      castShadow
      position={[4.2, 7.2, 5.5]}
      angle={Math.PI / 6}
      penumbra={0.72}
      intensity={48}
      color="#ffd6a8"
      distance={40}
      decay={1.5}
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.00015}
    />
  );
}

function Scene() {
  const balance = useBalanceStore((s) => s.balance);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#030204", 14, 52]} />

      <ambientLight intensity={0.07} color="#1c2230" />
      <KeyLight />
      <pointLight
        position={[0, -3.1, 0.8]}
        intensity={2.4}
        distance={16}
        decay={2}
        color="#4a0606"
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.25, 0]}
        receiveShadow
      >
        <planeGeometry args={[96, 96]} />
        <meshStandardMaterial
          color="#060606"
          roughness={0.94}
          metalness={0.12}
        />
      </mesh>

      <Scales balance={balance} />
      <BalancePlane />
      <Effects balance={balance} />
    </>
  );
}

export function HallOfMaat() {
  return (
    <div className="h-full w-full touch-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 2.1, 7.8], fov: 40, near: 0.1, far: 90 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
