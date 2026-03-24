"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { NoToneMapping } from "three";
import { useDuatStore } from "@/lib/store";
import { Scales } from "./Scales";
import { Effects } from "./Effects";
import { BackgroundHall } from "./BackgroundHall";

function BalancePlane() {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const setPointer = useDuatStore((s) => s.setPointer);

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
          setPointer(x);
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
  const quality = useDuatStore((s) => s.prefs.quality);
  const shadowSize = quality === "low" ? 1024 : 2048;

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
      shadow-mapSize={[shadowSize, shadowSize]}
      shadow-bias={-0.00015}
    />
  );
}

function Scene() {
  const balance = useDuatStore((s) => s.balance);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#030204", 16, 58]} />

      <ambientLight intensity={0.075} color="#1c2230" />
      <KeyLight />
      <pointLight
        position={[0, -3.1, 0.8]}
        intensity={2.5}
        distance={17}
        decay={2}
        color="#4a0606"
      />
      <pointLight
        position={[-5.5, 2.2, 2]}
        intensity={0.35}
        distance={20}
        decay={2}
        color="#1a2040"
      />

      <Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.11} />
      </Suspense>

      <BackgroundHall />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.25, 0]}
        receiveShadow
      >
        <planeGeometry args={[96, 96]} />
        <meshStandardMaterial
          color="#050505"
          roughness={0.88}
          metalness={0.22}
          envMapIntensity={0.35}
        />
      </mesh>

      <Scales balance={balance} />
      <BalancePlane />
      <Effects balance={balance} />
    </>
  );
}

export function HallOfMaat() {
  const quality = useDuatStore((s) => s.prefs.quality);
  const dpr =
    quality === "low"
      ? ([1, 1] as [number, number])
      : quality === "high"
        ? ([1, 2.25] as [number, number])
        : ([1, 2] as [number, number]);

  useEffect(() => {
    return () => {
      useDuatStore.getState().setSceneReady(false);
    };
  }, []);

  return (
    <div className="h-full w-full touch-none">
      <Canvas
        shadows
        dpr={dpr}
        gl={{
          antialias: quality !== "low",
          toneMapping: NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 2.1, 7.8], fov: 40, near: 0.1, far: 96 }}
        onCreated={() => {
          useDuatStore.getState().setSceneReady(true);
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
