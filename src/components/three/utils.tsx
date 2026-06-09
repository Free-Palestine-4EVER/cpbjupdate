"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/** real CC0 concrete PBR scan (Poly Haven · concrete_wall_008) */
export function useConcreteMaps(repeat = 2) {
  const maps = useTexture({
    map: "/assets/concrete/diff.jpg",
    normalMap: "/assets/concrete/nor.jpg",
    roughnessMap: "/assets/concrete/rough.jpg",
    aoMap: "/assets/concrete/ao.jpg",
  });
  useMemo(() => {
    maps.map.colorSpace = THREE.SRGBColorSpace;
    [maps.map, maps.normalMap, maps.roughnessMap, maps.aoMap].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeat, repeat);
      t.anisotropy = 8;
    });
  }, [maps, repeat]);
  return maps;
}

/** image-based lighting from a studio HDRI (subtle, lets brand lights lead) */
export function StudioEnv({ intensity = 0.5 }: { intensity?: number }) {
  return (
    <Environment
      files="/assets/hdri/studio.hdr"
      environmentIntensity={intensity}
    />
  );
}

/** procedural concrete texture (color + bump + roughness) */
export function concreteTexture(repeat = 3) {
  if (typeof document === "undefined") return null;
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#9a968d";
  ctx.fillRect(0, 0, s, s);
  const img = ctx.getImageData(0, 0, s, s);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 46;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  for (let k = 0; k < 900; k++) {
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(58,56,52,0.5)" : "rgba(212,206,196,0.4)";
    ctx.beginPath();
    ctx.arc(Math.random() * s, Math.random() * s, Math.random() * 1.7, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  return tex;
}

/** drifting concrete-dust particle field */
export function DustField({
  count = 320,
  radius = 7,
  color = "#d8d2c6",
}: {
  count?: number;
  radius?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * radius * 2;
      a[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      a[i * 3 + 2] = (Math.random() - 0.5) * radius * 1.4;
    }
    return a;
  }, [count, radius]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.015;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** cinematic post: bloom (+ optional vignette/grain) */
export function Effects({
  bloom = 0.8,
  vignette = false,
  grain = false,
  vignetteDarkness = 0.78,
}: {
  bloom?: number;
  vignette?: boolean;
  grain?: boolean;
  vignetteDarkness?: number;
}) {
  // NOTE: keep the pass list STABLE across renders. Toggling a pass in/out at
  // runtime (e.g. on theme change) forces the EffectComposer to rebuild and can
  // crash mid-rebuild on a lost context — vary numeric props instead.
  const passes = [
    <Bloom
      key="bloom"
      intensity={bloom}
      luminanceThreshold={0.22}
      luminanceSmoothing={0.35}
      radius={0.86}
      mipmapBlur
    />,
  ];
  if (vignette)
    passes.push(
      <Vignette key="vig" offset={0.28} darkness={vignetteDarkness} eskil={false} />
    );
  if (grain)
    passes.push(
      <Noise key="noise" blendFunction={BlendFunction.OVERLAY} opacity={0.16} />
    );
  return <EffectComposer multisampling={0}>{passes}</EffectComposer>;
}
