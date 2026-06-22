"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import LiveCodeTerminal from "./LiveCodeTerminal";

// 3D wireframe boxes floating in space
function WireframeBox({ position, size, speed, color }: { position: [number, number, number]; size: [number, number, number]; speed: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.15 * speed;
      meshRef.current.rotation.y = time * 0.2 * speed;
      // organic floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8 * speed) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial
        wireframe
        color={color}
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

// Global particle cache to satisfy React 19 render purity rules
const PARTICLE_COUNT = 1000;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const PARTICLE_COLORS = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  PARTICLE_POSITIONS[i * 3] = (Math.random() - 0.5) * 24;     // x
  PARTICLE_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 24; // y
  PARTICLE_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 35; // z

  const mix = Math.random();
  PARTICLE_COLORS[i * 3] = mix * 0.6 + 0.1;      // R (magenta tint)
  PARTICLE_COLORS[i * 3 + 1] = (1 - mix) * 0.5 + 0.2;  // G (cyan tint)
  PARTICLE_COLORS[i * 3 + 2] = 0.9;              // B (blue base)
}

// Drifting dust particles field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = time * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[PARTICLE_COLORS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Neural network nodes and links
function NeuralNetworkMesh() {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(-4, 3, -6),
      new THREE.Vector3(-2, 1, -8),
      new THREE.Vector3(-5, -2, -7),
      new THREE.Vector3(4, -3, -8),
      new THREE.Vector3(3, 2, -6),
      new THREE.Vector3(5, 4, -7),
      new THREE.Vector3(0, -4, -9),
      new THREE.Vector3(-1, 3, -12),
      new THREE.Vector3(2, -1, -11),
    ];
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Connect node positions within range
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 7) {
          positions.push(points[i].x, points[i].y, points[i].z);
          positions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#06b6d4" : "#d946ef"} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

// Scroll-based camera controller
function CameraController({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame((state) => {
    // 1. Scroll flythrough interpolation (Z Position)
    // Calculate global scroll progress of page
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const maxScroll = typeof window !== "undefined" ? (document.documentElement.scrollHeight - window.innerHeight) || 1000 : 1000;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    // Camera moves forward from Z=6 to Z=-15
    const targetZ = 6 - scrollProgress * 25;
    /* eslint-disable react-hooks/immutability */
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // 2. Mouse parallax coordinates (X and Y coordinates)
    const targetX = mouse.current.x * 2.5;
    const targetY = -mouse.current.y * 2.2;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

    // Always look slightly forward along the scene depth
    camera.lookAt(0, 0, camera.position.z - 5);
    /* eslint-enable react-hooks/immutability */
  });

  return null;
}

// 3D Glass panel wrapping HTML terminals
interface FloatingPanelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  codeLines: string[];
  title: string;
  lang: string;
  glowColor: "cyan" | "purple";
}

function Floating3DPanel({ position, rotation, scale, codeLines, title, lang, glowColor }: FloatingPanelProps) {
  const panelRef = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(1);

  useFrame((state) => {
    if (panelRef.current) {
      const time = state.clock.getElapsedTime();
      // slow floating rotation
      panelRef.current.rotation.y = rotation[1] + Math.sin(time * 0.4) * 0.05;
      panelRef.current.rotation.z = rotation[2] + Math.cos(time * 0.3) * 0.02;

      // Dynamically fade out panel if it is behind the camera
      const cameraZ = state.camera.position.z;
      const distance = cameraZ - position[2];
      if (distance < 1 && distance > -2) {
        // fade out as camera flies past
        setOpacity(Math.max(0, distance));
      } else if (distance <= -2) {
        setOpacity(0);
      } else {
        setOpacity(1);
      }
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={panelRef} position={position} rotation={rotation}>
      {/* 3D Glass pane mesh backing */}
      <mesh>
        <planeGeometry args={[7, 4.5]} />
        <meshBasicMaterial
          color="#050212"
          transparent
          opacity={0.3 * opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Embedded HTML Code Terminal */}
      <Html
        transform
        distanceFactor={6.5}
        position={[0, 0, 0.01]}
        scale={scale}
        occlude="blending"
      >
        <div style={{ opacity: opacity }} className="w-80 select-none">
          <LiveCodeTerminal
            codeLines={codeLines}
            title={title}
            lang={lang}
            positionClass="relative top-0 left-0"
            glowColor={glowColor}
            opacity={opacity * 0.85}
          />
        </div>
      </Html>
    </group>
  );
}

// Code snippets
const AUTH_CODE_SNIPPET = [
  "import NextAuth from 'next-auth';",
  "export const authOptions = {",
  "  providers: [ CredentialsProvider({ ... }) ],",
  "  secret: process.env.NEXTAUTH_SECRET,",
  "  session: { strategy: 'jwt' },",
  "  callbacks: {",
  "    async session({ session, token }) {",
  "      session.user.id = token.sub;",
  "      return session;",
  "    }",
  "  }",
  "};"
];

const ANIMATION_CODE_SNIPPET = [
  "// Framer Motion spring presets",
  "export const itemVariants = {",
  "  hidden: { y: 24, opacity: 0 },",
  "  visible: {",
  "    y: 0,",
  "    opacity: 1,",
  "    transition: {",
  "      type: 'spring',",
  "      stiffness: 85,",
  "      damping: 16",
  "    }",
  "  }",
  "};"
];

const DB_CODE_SNIPPET = [
  "// User Database Schema",
  "const db = await mongoose.connect(URI);",
  "const Schema = mongoose.Schema;",
  "const ClientSchema = new Schema({",
  "  domain: { type: String, required: true },",
  "  apiKey: { type: String, unique: true },",
  "  status: { type: String, default: 'active' }",
  "});",
  "export const Client = model('Client', ClientSchema);"
];

const SERVICE_MESH_SNIPPET = [
  "# Gateway Route Orchestrator",
  "class MeshGateway:",
  "    def __init__(self, routes):",
  "        self.routes = routes",
  "        self.healthy_nodes = []",
  "    async def forward(self, req, dest):",
  "        node = self.select_node(dest)",
  "        return await node.dispatch(req)"
];

export default function Hero3DScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        
        {/* Particle dust */}
        <ParticleField />
        
        {/* Floating meshes */}
        <WireframeBox position={[-5, 2.5, -4]} size={[1.8, 1.8, 1.8]} speed={0.9} color="#06b6d4" />
        <WireframeBox position={[4.5, -2, -5]} size={[1.5, 1.5, 1.5]} speed={1.1} color="#d946ef" />
        <WireframeBox position={[-2.5, -3, -8]} size={[2.2, 2.2, 2.2]} speed={0.7} color="#8b5cf6" />
        
        {/* Node connections */}
        <NeuralNetworkMesh />

        {/* Floating HTML Terminals mapped in 3D */}
        <Floating3DPanel
          position={[-3, 1, -1]}
          rotation={[0, 0.2, 0]}
          scale={0.9}
          codeLines={AUTH_CODE_SNIPPET}
          title="auth_gateway.ts"
          lang="TypeScript"
          glowColor="cyan"
        />
        <Floating3DPanel
          position={[3.2, -1.2, -3]}
          rotation={[0, -0.2, 0]}
          scale={0.9}
          codeLines={ANIMATION_CODE_SNIPPET}
          title="ux_interactions.ts"
          lang="TypeScript"
          glowColor="purple"
        />
        <Floating3DPanel
          position={[-3.5, -2, -5.5]}
          rotation={[0.1, 0.3, -0.05]}
          scale={0.85}
          codeLines={DB_CODE_SNIPPET}
          title="client_model.js"
          lang="JavaScript"
          glowColor="purple"
        />
        <Floating3DPanel
          position={[2.8, 1.8, -8]}
          rotation={[-0.05, -0.3, 0]}
          scale={0.85}
          codeLines={SERVICE_MESH_SNIPPET}
          title="mesh_gateway.py"
          lang="Python"
          glowColor="cyan"
        />

        {/* Scroll and mouse tracking controller */}
        <CameraController mouse={mouse} />
      </Canvas>
    </div>
  );
}
