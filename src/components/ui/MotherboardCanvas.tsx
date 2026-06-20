"use client";

import { useEffect, useRef, useState } from "react";

interface Point3D {
  u: number;
  v: number;
  w: number;
}

interface ServerCube {
  u: number;
  v: number;
  w: number;
  su: number;
  sv: number;
  sw: number;
  color: "cyan" | "purple";
  pulseOffset: number;
}

interface DataPacket {
  pathIndex: number;
  segment: number;
  t: number; // progress (0 to 1) along current segment
  speed: number;
  color: string;
  trail: { x: number; y: number }[];
  maxTrailLength: number;
}

// 6 Circuit Paths traversing the motherboard mesh
const CIRCUIT_PATHS: Point3D[][] = [
  // Path 0: Center Stack -> Right Grid
  [
    { u: 0, v: 0, w: 0 },
    { u: 120, v: 0, w: 0 },
    { u: 120, v: 160, w: 0 },
    { u: 320, v: 160, w: 0 },
    { u: 320, v: 300, w: 0 }
  ],
  // Path 1: Center Stack -> Left Grid
  [
    { u: 0, v: 0, w: 0 },
    { u: 0, v: -140, w: 0 },
    { u: -160, v: -140, w: 0 },
    { u: -160, v: -280, w: 0 },
    { u: -320, v: -280, w: 0 }
  ],
  // Path 2: Left Server -> Top Mesh
  [
    { u: -160, v: 80, w: 0 },
    { u: -160, v: 220, w: 0 },
    { u: 80, v: 220, w: 0 },
    { u: 80, v: 360, w: 0 }
  ],
  // Path 3: Right Server -> Bottom Mesh
  [
    { u: 160, v: -120, w: 0 },
    { u: 160, v: -260, w: 0 },
    { u: -80, v: -260, w: 0 },
    { u: -80, v: -400, w: 0 }
  ],
  // Path 4: Deep BG Left -> Bottom Center
  [
    { u: -280, v: -180, w: 0 },
    { u: -100, v: -180, w: 0 },
    { u: -100, v: 120, w: 0 },
    { u: 120, v: 120, w: 0 },
    { u: 120, v: -50, w: 0 }
  ],
  // Path 5: Deep BG Right -> Left Center
  [
    { u: 240, v: 240, w: 0 },
    { u: 60, v: 240, w: 0 },
    { u: 60, v: 60, w: 0 },
    { u: -100, v: 60, w: 0 },
    { u: -100, v: -80, w: 0 }
  ]
];

// Server Cubes representing processing microservices
const SERVERS: ServerCube[] = [
  // Center main stack
  { u: -25, v: -25, w: 0, su: 50, sv: 50, sw: 35, color: "purple", pulseOffset: 0 },
  { u: -20, v: -20, w: 38, su: 40, sv: 40, sw: 25, color: "cyan", pulseOffset: Math.PI / 3 },
  // Scattered nodes
  { u: -175, v: 65, w: 0, su: 30, sv: 30, sw: 50, color: "cyan", pulseOffset: Math.PI * 0.7 },
  { u: 145, v: -135, w: 0, su: 30, sv: 30, sw: 45, color: "purple", pulseOffset: Math.PI * 1.2 },
  { u: -295, v: -195, w: 0, su: 30, sv: 30, sw: 60, color: "purple", pulseOffset: Math.PI * 0.2 },
  { u: 225, v: 225, w: 0, su: 30, sv: 30, sw: 50, color: "cyan", pulseOffset: Math.PI * 1.5 }
];

export default function MotherboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const parent = canvasRef.current.parentElement;
      if (parent) {
        setDimensions({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Support high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Coordinate variables
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2.3; // slightly offset vertically for visual center

    // Isometric Projection vectors (30 degree angles)
    const ux = Math.cos(Math.PI / 6);
    const uy = Math.sin(Math.PI / 6);
    const vx = -Math.cos(Math.PI / 6);
    const vy = Math.sin(Math.PI / 6);

    const project = (u: number, v: number, w: number = 0) => {
      return {
        x: cx + u * ux + v * vx,
        y: cy + u * uy + v * vy - w
      };
    };

    // Instantiate packets
    const packets: DataPacket[] = [];
    const spawnPacket = (pathIdx: number) => {
      const isCyan = Math.random() > 0.45;
      return {
        pathIndex: pathIdx,
        segment: 0,
        t: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: isCyan ? "#06b6d4" : "#d946ef",
        trail: [],
        maxTrailLength: 10 + Math.floor(Math.random() * 10)
      };
    };

    // Prepopulate packets on all paths
    for (let i = 0; i < CIRCUIT_PATHS.length; i++) {
      packets.push(spawnPacket(i));
      // randomize initial segment & progress
      const p = packets[packets.length - 1];
      p.segment = Math.floor(Math.random() * (CIRCUIT_PATHS[i].length - 1));
      p.t = Math.random();
    }

    let animationId = 0;
    const startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const time = (Date.now() - startTime) * 0.001;

      // 1. Draw Subtle Background Isometric Grid Dots
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      const gridSpacing = 40;
      for (let u = -600; u <= 600; u += gridSpacing) {
        for (let v = -600; v <= 600; v += gridSpacing) {
          const pt = project(u, v, 0);
          // Only draw points within screen bounds
          if (pt.x >= 0 && pt.x <= dimensions.width && pt.y >= 0 && pt.y <= dimensions.height) {
            ctx.fillRect(pt.x - 0.5, pt.y - 0.5, 1, 1);
          }
        }
      }

      // 2. Draw Circuit Pathway Tracks
      ctx.lineWidth = 1;
      CIRCUIT_PATHS.forEach((path) => {
        ctx.beginPath();
        const start = project(path[0].u, path[0].v, path[0].w);
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i < path.length; i++) {
          const pt = project(path[i].u, path[i].v, path[i].w);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "rgba(139, 92, 246, 0.07)";
        ctx.stroke();
      });

      // 3. Draw Junction Nodes with pulsing radial glows
      CIRCUIT_PATHS.forEach((path) => {
        path.forEach((node, nodeIdx) => {
          // Skip start and endpoints sometimes for cleaner connections
          if (nodeIdx === 0 || nodeIdx === path.length - 1) return;

          const pt = project(node.u, node.v, node.w);
          const color = (node.u + node.v) % 2 === 0 ? "#06b6d4" : "#d946ef";
          const pulse = Math.sin(time * 2.5 + node.u * 0.02 + node.v * 0.02);
          const size = 1.5 + 0.8 * pulse;
          const glowRad = 4.5 + 2.5 * pulse;

          // Radial Glow
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowRad);
          grad.addColorStop(0, color === "#06b6d4" ? "rgba(6, 182, 212, 0.3)" : "rgba(217, 70, 239, 0.3)");
          grad.addColorStop(1, "transparent");
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, glowRad, 0, Math.PI * 2);
          ctx.fill();

          // Core Node Dot
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // 4. Update and Draw Moving Data Packets
      packets.forEach((packet, idx) => {
        const path = CIRCUIT_PATHS[packet.pathIndex];
        const segStart = path[packet.segment];
        const segEnd = path[packet.segment + 1];

        // Interpolate position along current segment
        const u = segStart.u + (segEnd.u - segStart.u) * packet.t;
        const v = segStart.v + (segEnd.v - segStart.v) * packet.t;
        const w = segStart.w + (segEnd.w - segStart.w) * packet.t;

        const pt = project(u, v, w);

        // Store trail point
        packet.trail.push({ x: pt.x, y: pt.y });
        if (packet.trail.length > packet.maxTrailLength) {
          packet.trail.shift();
        }

        // Draw Packet Trail
        if (packet.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(packet.trail[0].x, packet.trail[0].y);
          for (let i = 1; i < packet.trail.length; i++) {
            ctx.lineTo(packet.trail[i].x, packet.trail[i].y);
          }
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = packet.color + "33"; // Hex alpha 20%
          ctx.stroke();

          // draw core trail path
          ctx.beginPath();
          ctx.moveTo(packet.trail[Math.floor(packet.trail.length / 2)].x, packet.trail[Math.floor(packet.trail.length / 2)].y);
          ctx.lineTo(pt.x, pt.y);
          ctx.lineWidth = 2;
          ctx.strokeStyle = packet.color;
          ctx.stroke();
        }

        // Draw Packet Core glow
        const glowRadius = 5 + 3 * Math.sin(time * 6 + idx);
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowRadius);
        grad.addColorStop(0, packet.color === "#06b6d4" ? "rgba(6, 182, 212, 0.8)" : "rgba(217, 70, 239, 0.8)");
        grad.addColorStop(1, "transparent");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Update packet progress
        packet.t += packet.speed;
        if (packet.t >= 1) {
          packet.t = 0;
          packet.segment++;
          if (packet.segment >= path.length - 1) {
            // Path complete, recycle/respawn
            packets[idx] = spawnPacket(packet.pathIndex);
          }
        }
      });

      // 5. Draw 3D Server Blocks (Isometric Cuboids)
      SERVERS.forEach((cube) => {
        const pulseVal = 0.5 + 0.5 * Math.sin(time * 3 + cube.pulseOffset);
        const activeColor = cube.color === "cyan" ? "#06b6d4" : "#d946ef";

        // Vertices helper
        const getProj = (du: number, dv: number, dw: number) => {
          return {
            x: cx + (cube.u + du) * ux + (cube.v + dv) * vx,
            y: cy + (cube.u + du) * uy + (cube.v + dv) * vy - (cube.w + dw)
          };
        };

        // Projected corners
        const p000 = getProj(0, 0, 0);
        const p100 = getProj(cube.su, 0, 0);
        const p010 = getProj(0, cube.sv, 0);
        const p110 = getProj(cube.su, cube.sv, 0);

        const p001 = getProj(0, 0, cube.sw);
        const p101 = getProj(cube.su, 0, cube.sw);
        const p011 = getProj(0, cube.sv, cube.sw);
        const p111 = getProj(cube.su, cube.sv, cube.sw);

        // --- DRAW FACES ---

        // Left Face
        ctx.beginPath();
        ctx.moveTo(p000.x, p000.y);
        ctx.lineTo(p010.x, p010.y);
        ctx.lineTo(p011.x, p011.y);
        ctx.lineTo(p001.x, p001.y);
        ctx.closePath();
        ctx.fillStyle = "rgba(10, 8, 22, 0.95)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.stroke();

        // Right Face
        ctx.beginPath();
        ctx.moveTo(p000.x, p000.y);
        ctx.lineTo(p100.x, p100.y);
        ctx.lineTo(p101.x, p101.y);
        ctx.lineTo(p001.x, p001.y);
        ctx.closePath();
        ctx.fillStyle = "rgba(16, 13, 33, 0.95)";
        ctx.fill();
        ctx.stroke();

        // Top Face
        ctx.beginPath();
        ctx.moveTo(p001.x, p001.y);
        ctx.lineTo(p101.x, p101.y);
        ctx.lineTo(p111.x, p111.y);
        ctx.lineTo(p011.x, p011.y);
        ctx.closePath();
        ctx.fillStyle = "rgba(24, 20, 50, 0.95)";
        ctx.fill();
        ctx.stroke();

        // --- DRAW SERVER DETAILS & LEDS ---

        // Glowing vertical highlight line on the front edge
        ctx.beginPath();
        ctx.moveTo(p000.x, p000.y);
        ctx.lineTo(p001.x, p001.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = activeColor === "#06b6d4" ? "rgba(6, 182, 212, 0.2)" : "rgba(217, 70, 239, 0.2)";
        ctx.stroke();

        // Horizontal circuit band (active computing strip)
        const b000 = getProj(0, 0, cube.sw * 0.35);
        const b100 = getProj(cube.su, 0, cube.sw * 0.35);
        const b010 = getProj(0, cube.sv, cube.sw * 0.35);

        const b001 = getProj(0, 0, cube.sw * 0.55);
        const b101 = getProj(cube.su, 0, cube.sw * 0.55);
        const b011 = getProj(0, cube.sv, cube.sw * 0.55);

        // Left Band fill
        ctx.beginPath();
        ctx.moveTo(b000.x, b000.y);
        ctx.lineTo(b010.x, b010.y);
        ctx.lineTo(b011.x, b011.y);
        ctx.lineTo(b001.x, b001.y);
        ctx.closePath();
        ctx.fillStyle = activeColor;
        ctx.globalAlpha = 0.08 + 0.16 * pulseVal;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Right Band fill
        ctx.beginPath();
        ctx.moveTo(b000.x, b000.y);
        ctx.lineTo(b100.x, b100.y);
        ctx.lineTo(b101.x, b101.y);
        ctx.lineTo(b001.x, b001.y);
        ctx.closePath();
        ctx.fillStyle = activeColor;
        ctx.globalAlpha = 0.12 + 0.22 * pulseVal;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Blinking system status lights on the top lid
        const led1 = getProj(cube.su * 0.3, cube.sv * 0.3, cube.sw);
        const led2 = getProj(cube.su * 0.7, cube.sv * 0.3, cube.sw);
        const led3 = getProj(cube.su * 0.5, cube.sv * 0.7, cube.sw);

        // Status 1 (Activity)
        ctx.fillStyle = Math.sin(time * 5 + cube.u) > 0 ? "#22c55e" : "#166534";
        ctx.beginPath();
        ctx.arc(led1.x, led1.y, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Status 2 (Network link)
        ctx.fillStyle = Math.cos(time * 8 + cube.v) > 0.2 ? activeColor : "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.arc(led2.x, led2.y, 1.0, 0, Math.PI * 2);
        ctx.fill();

        // Status 3 (Heartbeat)
        ctx.fillStyle = pulseVal > 0.6 ? "#eab308" : "#854d0e"; // yellow pulsing
        ctx.beginPath();
        ctx.arc(led3.x, led3.y, 1.0, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ opacity: 0.65 }}
    />
  );
}
