"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const svgRef = useRef<SVGSVGElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const kiteRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const thread = threadRef.current;
    const kite = kiteRef.current;
    if (!svg || !thread || !kite) return;

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

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      smoothX += (mouseX - smoothX) * 0.35;
      smoothY += (mouseY - smoothY) * 0.35;

      const kx = smoothX;
      const ky = smoothY;
      const ax = w;
      const ay = h;

      const dx = ax - kx;
      const dy = ay - ky;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);

      const midX = (kx + ax) / 2;
      const midY = (ky + ay) / 2;

      const perpX = -dy / dist;
      const perpY = dx / dist;

      const curve = Math.max(dist * 0.14, 18);
      const sway = Math.sin(frame * 0.018) * 6;
      const sag = Math.min(dist * 0.06, 25);

      const ctrlX = midX + perpX * (curve + sway);
      const ctrlY = midY + perpY * (curve + sway) + sag;

      thread.setAttribute(
        "d",
        `M ${kx} ${ky + 14} Q ${ctrlX} ${ctrlY} ${ax} ${ay}`
      );

      const wobble = Math.sin(frame * 0.022) * 7;
      kite.setAttribute(
        "transform",
        `translate(${kx}, ${ky}) rotate(${wobble})`
      );

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
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.5)" />
          <stop offset="100%" stopColor="rgba(124,58,237,0.15)" />
        </linearGradient>
      </defs>
      <path ref={threadRef} className="kite-thread" fill="none" />
      <g ref={kiteRef} className="kite-shape">
        <path
          d="M0,-12 L7,0 L0,16 L-7,0 Z"
          fill="url(#kiteGradient)"
          stroke="#4F46E5"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <line x1="0" y1="-12" x2="0" y2="16" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
      </g>
    </svg>
  );
}
