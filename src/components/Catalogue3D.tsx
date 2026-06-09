"use client";

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { DustField, Effects, StudioEnv, useConcreteMaps } from "./three/utils";
import { useTheme } from "@/lib/useTheme";

type Prog = MutableRefObject<number>;

function useMaterialize(
  progress: Prog,
  solid: MutableRefObject<THREE.Material | null>,
  wire: MutableRefObject<THREE.Material | null>
) {
  useFrame(() => {
    const b = Math.max(0, Math.min(1, progress.current / 0.34));
    const e = b * b * (3 - 2 * b);
    if (solid.current) {
      (solid.current as THREE.MeshStandardMaterial).opacity = e;
      solid.current.transparent = e < 0.99;
    }
    if (wire.current) {
      (wire.current as THREE.MeshBasicMaterial).opacity = (1 - e) * 0.5 + 0.05;
    }
  });
}

function ConcreteMat({
  matRef,
  c,
}: {
  matRef: MutableRefObject<THREE.Material | null>;
  c: ReturnType<typeof useConcreteMaps>;
}) {
  return (
    <meshStandardMaterial
      ref={matRef as never}
      map={c.map}
      normalMap={c.normalMap}
      roughnessMap={c.roughnessMap}
      normalScale={new THREE.Vector2(0.8, 0.8)}
      color="#cfcabf"
      roughness={1}
      metalness={0}
      envMapIntensity={0.7}
      side={THREE.DoubleSide}
      transparent
      opacity={0}
    />
  );
}

function PipeModel({ progress }: { progress: Prog }) {
  const spin = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Material | null>(null);
  const wire = useRef<THREE.Material | null>(null);
  const c = useConcreteMaps(2);
  const profile = useMemo(() => {
    const y0 = -1.0, y1 = 1.0, ri = 0.52, ro = 0.66, rb = 0.8, rs = 0.6;
    return [
      new THREE.Vector2(rs, y0),
      new THREE.Vector2(ro, y0 + 0.12),
      new THREE.Vector2(ro, y1 - 0.34),
      new THREE.Vector2(rb - 0.02, y1 - 0.12),
      new THREE.Vector2(rb, y1),
      new THREE.Vector2(ri, y1),
      new THREE.Vector2(ri, y0),
      new THREE.Vector2(rs, y0),
    ];
  }, []);
  useMaterialize(progress, solid, wire);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.5;
  });
  return (
    <group ref={spin} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <latheGeometry args={[profile, 130]} />
        <ConcreteMat matRef={solid} c={c} />
      </mesh>
      <mesh scale={1.006}>
        <latheGeometry args={[profile, 36]} />
        <meshBasicMaterial ref={wire} color="#7fb0e0" wireframe transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CulvertModel({ progress }: { progress: Prog }) {
  const spin = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Material | null>(null);
  const wire = useRef<THREE.Material | null>(null);
  const c = useConcreteMaps(2);
  const geo = useMemo(() => {
    const o = 1.5, i = 1.02;
    const shape = new THREE.Shape();
    shape.moveTo(-o / 2, -o / 2);
    shape.lineTo(o / 2, -o / 2);
    shape.lineTo(o / 2, o / 2);
    shape.lineTo(-o / 2, o / 2);
    shape.lineTo(-o / 2, -o / 2);
    const hole = new THREE.Path();
    const h = i / 2, ch = 0.16; // chamfered (haunched) inner corners
    hole.moveTo(-h + ch, -h);
    hole.lineTo(h - ch, -h);
    hole.lineTo(h, -h + ch);
    hole.lineTo(h, h - ch);
    hole.lineTo(h - ch, h);
    hole.lineTo(-h + ch, h);
    hole.lineTo(-h, h - ch);
    hole.lineTo(-h, -h + ch);
    hole.lineTo(-h + ch, -h);
    shape.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 1.7,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
    });
    g.center();
    return g;
  }, []);
  useMaterialize(progress, solid, wire);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.45;
  });
  return (
    <group ref={spin} rotation={[0.1, 0.5, 0]}>
      <mesh geometry={geo}>
        <ConcreteMat matRef={solid} c={c} />
      </mesh>
      <mesh geometry={geo} scale={1.01}>
        <meshBasicMaterial ref={wire} color="#7fb0e0" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function ManholeModel({ progress }: { progress: Prog }) {
  const spin = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Material | null>(null);
  const wire = useRef<THREE.Material | null>(null);
  const c = useConcreteMaps(2);
  const profile = useMemo(() => {
    const ro = 0.92, ri = 0.74, rn = 0.42, rni = 0.3;
    return [
      new THREE.Vector2(ri, -1.0),
      new THREE.Vector2(ri, 0.2),
      new THREE.Vector2(rni, 0.85),
      new THREE.Vector2(rni, 1.12),
      new THREE.Vector2(rn, 1.12),
      new THREE.Vector2(rn, 0.85),
      new THREE.Vector2(ro, 0.2),
      new THREE.Vector2(ro, -1.0),
      new THREE.Vector2(ri, -1.0),
    ];
  }, []);
  useMaterialize(progress, solid, wire);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.4;
  });
  return (
    <group ref={spin}>
      <mesh>
        <latheGeometry args={[profile, 110]} />
        <ConcreteMat matRef={solid} c={c} />
      </mesh>
      {/* cover lid */}
      <mesh position={[0, 1.16, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.08, 40]} />
        <meshStandardMaterial map={c.map} normalMap={c.normalMap} roughnessMap={c.roughnessMap} color="#b9b4a9" roughness={1} metalness={0.05} />
      </mesh>
      <mesh scale={1.006}>
        <latheGeometry args={[profile, 30]} />
        <meshBasicMaterial ref={wire} color="#7fb0e0" wireframe transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

const ITEMS = [
  { Model: PipeModel, label: "RC Pipe", angle: 0 },
  { Model: CulvertModel, label: "Box Culvert", angle: (Math.PI * 2) / 3 },
  { Model: ManholeModel, label: "Manhole", angle: (Math.PI * 4) / 3 },
];

function Carousel({ progress, light }: { progress: Prog; light: boolean }) {
  const ring = useRef<THREE.Group>(null);
  const R = 2.5;
  useFrame((state, dt) => {
    if (!ring.current) return;
    ring.current.rotation.y += dt * 0.12 + progress.current * 0.012;
    ring.current.position.x = 0.85;
    ring.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });
  return (
    <group ref={ring} scale={1.08}>
      {ITEMS.map(({ Model, label, angle }, i) => (
        <group key={i} position={[Math.sin(angle) * R, 0, Math.cos(angle) * R]}>
          <Model progress={progress} />
          <Html position={[0, 1.4, 0]} center distanceFactor={11} pointerEvents="none">
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase", color: light ? "#1a1c1f" : "#f3f1ec", whiteSpace: "nowrap",
              border: light ? "1px solid rgba(26,23,18,0.16)" : "1px solid rgba(255,255,255,0.18)",
              background: light ? "rgba(255,255,255,0.7)" : "rgba(10,11,13,0.6)",
              backdropFilter: "blur(6px)", padding: "5px 12px", borderRadius: 999,
            }}>
              <span style={{ color: "#ed5a1e" }}>◆</span>&nbsp;{label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

/** repaint the opaque scene background + fog when the theme flips */
function Backdrop({ light }: { light: boolean }) {
  const { scene } = useThree();
  useEffect(() => {
    const hex = light ? "#eceae3" : "#0a0b0d";
    scene.background = new THREE.Color(hex);
    scene.fog = new THREE.Fog(hex, 9, 17);
  }, [light, scene]);
  return null;
}

function Floor({ c, light }: { c: ReturnType<typeof useConcreteMaps>; light: boolean }) {
  const nor = useMemo(() => {
    const t = c.normalMap.clone();
    t.repeat.set(9, 9);
    t.needsUpdate = true;
    return t;
  }, [c]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <circleGeometry args={[12, 64]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.4}
        mixStrength={light ? 1.1 : 1.6}
        blur={[320, 90]}
        roughness={0.85}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color={light ? "#d7d2c6" : "#0d0f13"}
        metalness={0.25}
        normalMap={nor}
        normalScale={new THREE.Vector2(0.18, 0.18)}
      />
    </mesh>
  );
}

function Scene({ progress, light }: { progress: Prog; light: boolean }) {
  const c = useConcreteMaps(2);
  return (
    <>
      <Backdrop light={light} />
      <StudioEnv intensity={light ? 0.85 : 0.5} />
      {light && <ambientLight intensity={0.5} color="#fff7ee" />}
      <directionalLight position={[-5, 7, 5]} intensity={2.0} color="#fff2e2" />
      <pointLight position={[5, 3, 2]} intensity={34} color="#ed5a1e" distance={20} />
      <pointLight position={[-5, 1, -4]} intensity={16} color="#6fa4d6" distance={22} />
      <Carousel progress={progress} light={light} />
      <Floor c={c} light={light} />
      <DustField count={240} radius={8} color={light ? "#8f8b7d" : "#d8d2c6"} />
    </>
  );
}

export default function Catalogue3D({
  progress,
  active = true,
}: {
  progress: Prog;
  active?: boolean;
}) {
  const light = useTheme();
  return (
    <Canvas
      dpr={[1, 1.9]}
      camera={{ position: [0, 1.6, 7.4], fov: 42 }}
      gl={{ antialias: true }}
      frameloop={active ? "always" : "never"}
    >
      <Suspense fallback={null}>
        <Scene progress={progress} light={light} />
      </Suspense>
      <Effects bloom={light ? 0.55 : 1.0} vignette grain vignetteDarkness={light ? 0.1 : 0.78} />
    </Canvas>
  );
}
