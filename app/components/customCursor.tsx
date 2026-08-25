"use client";

import { useEffect, useRef } from "react";

const SEGMENTS = 14;

type Point = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  pinned: boolean;
};

export default function CustomCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const kiteRef = useRef<SVGGElement>(null);
  const tailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const thread = threadRef.current;
    const kite = kiteRef.current;
    const tail = tailRef.current;
    if (!svg || !thread || !kite || !tail) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let smoothX = mouseX;
    let smoothY = mouseY;
    let raf = 0;
    let frame = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    };
    resize();

    // --- Verlet physics thread ---
    const points: Point[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const t = i / (SEGMENTS - 1);
      const px = mouseX + (window.innerWidth - mouseX) * t;
      const py = mouseY + (window.innerHeight - mouseY) * t;
      points.push({ x: px, y: py, ox: px, oy: py, pinned: false });
    }
    points[0].pinned = true;
    points[SEGMENTS - 1].pinned = true;

    const gravity = 0.12;
    const damping = 0.94;
    const iterations = 4;

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // smooth kite follow
      smoothX += (mouseX - smoothX) * 0.32;
      smoothY += (mouseY - smoothY) * 0.32;

      const kx = smoothX;
      const ky = smoothY;
      const ax = w;
      const ay = h;

      // pin endpoints
      points[0].x = kx;
      points[0].y = ky + 14;
      points[SEGMENTS - 1].x = ax;
      points[SEGMENTS - 1].y = ay;

      // add gentle wind to non-pinned points
      const wind = Math.sin(frame * 0.012) * 0.15;

      // verlet integration
      for (let i = 1; i < SEGMENTS - 1; i++) {
        const p = points[i];
        const vx = (p.x - p.ox) * damping + wind;
        const vy = (p.y - p.oy) * damping + gravity;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx;
        p.y += vy;
      }

      // constraint satisfaction
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < SEGMENTS - 1; i++) {
          const a = points[i];
          const b = points[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
          const restDist = Math.max(
            Math.sqrt((ax - kx) ** 2 + (ay - ky) ** 2) / (SEGMENTS - 1),
            8
          );
          const diff = (dist - restDist) / dist;
          const ox = dx * 0.5 * diff;
          const oy = dy * 0.5 * diff;
          if (!a.pinned) {
            a.x += ox;
            a.y += oy;
          }
          if (!b.pinned) {
            b.x -= ox;
            b.y -= oy;
          }
        }
      }

      // build smooth path through points
      let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let i = 1; i < SEGMENTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        d += ` Q ${prev.x.toFixed(1)} ${prev.y.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)}`;
      }
      d += ` L ${points[SEGMENTS - 1].x.toFixed(1)} ${points[SEGMENTS - 1].y.toFixed(1)}`;
      thread.setAttribute("d", d);

      // kite wobble — gentle banking like a real kite
      const wobble = Math.sin(frame * 0.016) * 6 + Math.sin(frame * 0.007) * 3;
      kite.setAttribute(
        "transform",
        `translate(${kx.toFixed(1)}, ${ky.toFixed(1)}) rotate(${wobble.toFixed(1)})`
      );

      // kite tail — wavy streamer hanging below the kite
      const tailLen = 38;
      const tailSegs = 6;
      let td = "M 0 16";
      for (let i = 1; i <= tailSegs; i++) {
        const t = i / tailSegs;
        const ty = 16 + t * tailLen;
        const tx = Math.sin(frame * 0.025 + t * 4.5) * (4 + t * 3);
        td += ` L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
      }
      tail.setAttribute("d", td);

      frame++;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnter = () => svg.classList.add("kite-active");
    const onLeave = () => svg.classList.remove("kite-active");

    const interactive = document.querySelectorAll(
      "a, button, [role='button'], input, select, textarea, .magnetic, .card-glow"
    );

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={svgRef} className="kite-cursor" aria-hidden="true">
      <defs>
        <linearGradient id="kiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="tailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <path ref={threadRef} className="kite-thread" fill="none" />
      <g ref={kiteRef} className="kite-shape">
        <path
          d="M0,-12 L7,0 L0,16 L-7,0 Z"
          fill="url(#kiteGradient)"
          stroke="#0F766E"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <line x1="0" y1="-12" x2="0" y2="16" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
        <path ref={tailRef} fill="none" stroke="url(#tailGradient)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
