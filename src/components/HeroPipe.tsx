"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DustField, Effects, StudioEnv, useConcreteMaps } from "./three/utils";
import { useTheme } from "@/lib/useTheme";

function Pipe() {
  const pose = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const c = useConcreteMaps(2.2);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bell-and-spigot pipe profile (wall thickness + socket flare one end, spigot step the other)
  const profile = useMemo(() => {
    const y0 = -1.7, y1 = 1.7, ri = 0.8, ro = 1.0, rb = 1.2, rs = 0.92;
    return [
      new THREE.Vector2(rs, y0),
      new THREE.Vector2(ro, y0 + 0.18),
      new THREE.Vector2(ro, y1 - 0.55),
      new THREE.Vector2(ri + 0.04, y1 - 0.5),
      new THREE.Vector2(rb - 0.03, y1 - 0.2),
      new THREE.Vector2(rb, y1 - 0.1),
      new THREE.Vector2(rb, y1),
      new THREE.Vector2(ri, y1),
      new THREE.Vector2(ri, y0),
      new THREE.Vector2(rs, y0),
    ];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    if (spin.current) spin.current.rotation.y += delta * 0.13;
    if (pose.current) {
      const ty = 0.62 + state.pointer.x * 0.22 + Math.sin(t * 0.32) * 0.04 + s * 0.5;
      const tx = 0.16 - state.pointer.y * 0.14 + s * 0.25;
      pose.current.rotation.y += (ty - pose.current.rotation.y) * 0.06;
      pose.current.rotation.x += (tx - pose.current.rotation.x) * 0.06;
      pose.current.position.y = Math.sin(t * 0.5) * 0.05 - s * 0.6;
      pose.current.position.x = 0.2 + s * 1.2;
    }
  });

  return (
    <group ref={pose} rotation={[0.16, 0.62, 1.46]} scale={1.22} position={[0.2, 0, 0]}>
      <group ref={spin}>
        <mesh>
          <latheGeometry args={[profile, 220]} />
          <meshStandardMaterial
            map={c.map}
            normalMap={c.normalMap}
            roughnessMap={c.roughnessMap}
            normalScale={new THREE.Vector2(0.9, 0.9)}
            color="#cfcabf"
            roughness={1}
            metalness={0}
            envMapIntensity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* glowing bore light at the far end (blooms) */}
        <mesh position={[0, -1.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.74, 48]} />
          <meshBasicMaterial color="#ff7a38" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroPipe({ active = true }: { active?: boolean }) {
  const light = useTheme();
  return (
    <Canvas
      dpr={[1, 1.9]}
      camera={{ position: [0, 0.2, 6], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      frameloop={active ? "always" : "never"}
    >
      <Suspense fallback={null}>
        <StudioEnv intensity={light ? 0.8 : 0.55} />
        {light && <ambientLight intensity={0.45} color="#fff7ee" />}
        <directionalLight position={[-4, 5, 6]} intensity={2.1} color="#fff2e2" />
        <pointLight position={[1, 1, 5]} intensity={8} color="#ffe9d6" distance={20} />
        <pointLight position={[4, 2.5, 1.5]} intensity={24} color="#ed5a1e" distance={16} />
        <pointLight position={[-5, -2, -4]} intensity={9} color="#6fa4d6" distance={20} />
        <DustField count={300} radius={7} color={light ? "#9a988f" : "#d8d2c6"} />
        <Pipe />
      </Suspense>
      <Effects bloom={light ? 0.5 : 0.85} />
    </Canvas>
  );
}
