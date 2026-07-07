"use client";

import { useEffect, useRef } from "react";

const IMPULSE_PATHS = [
  {
    d: "M 3 18 C 18 12, 26 30, 42 24 C 58 18, 68 36, 84 30 C 92 27, 97 20, 100 18",
    cls: "impulse-field__path impulse-field__path--a",
    dur: "5.2s",
  },
  {
    d: "M 2 64 C 16 58, 22 72, 36 68 C 52 62, 62 48, 74 52 C 86 56, 93 70, 100 66",
    cls: "impulse-field__path impulse-field__path--b",
    dur: "7.1s",
  },
  {
    d: "M 0 42 C 12 44, 24 24, 36 28 C 48 32, 58 54, 70 50 C 82 46, 90 30, 100 34",
    cls: "impulse-field__path impulse-field__path--c",
    dur: "9.4s",
  },
  {
    d: "M 8 82 C 20 70, 30 88, 44 80 C 58 72, 70 64, 82 70 C 90 74, 96 84, 100 88",
    cls: "impulse-field__path impulse-field__path--d",
    dur: "6.3s",
  },
  {
    d: "M 0 8 C 14 16, 20 4, 34 10 C 48 16, 58 24, 72 20 C 86 16, 94 6, 100 10",
    cls: "impulse-field__path impulse-field__path--e",
    dur: "8.5s",
  },
];

export default function ImpulseField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const dpr = window.devicePixelRatio || 1;
    const anchors = [
      [0.03, 0.18], [0.32, 0.18], [0.72, 0.26], [0.18, 0.42], [0.64, 0.54], [0.9, 0.66],
      [0.58, 0.1], [0.88, 0.24], [0.48, 0.36], [0.08, 0.48], [0.38, 0.58], [0.72, 0.74],
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      return { width: rect.width, height: rect.height };
    };

    let metrics = resize();
    const pulses = Array.from({ length: 14 }, (_, index) => ({
      from: index % anchors.length,
      to: (index * 3 + 4) % anchors.length,
      progress: Math.random(),
      speed: 0.07 + Math.random() * 0.14,
      color: index % 2 === 0 ? "15,109,98" : "180,79,44",
    }));

    let frame = 0;
    let last = 0;

    const onResize = () => {
      metrics = resize();
    };

    const animate = (time) => {
      if (!last) last = time;
      const dt = Math.min(0.033, (time - last) / 1000);
      last = time;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, metrics.width, metrics.height);

      pulses.forEach((pulse) => {
        const from = anchors[pulse.from];
        const to = anchors[pulse.to];
        const x1 = from[0] * metrics.width;
        const y1 = from[1] * metrics.height;
        const x2 = to[0] * metrics.width;
        const y2 = to[1] * metrics.height;
        const x = x1 + (x2 - x1) * pulse.progress;
        const y = y1 + (y2 - y1) * pulse.progress;
        const tx = x1 + (x2 - x1) * Math.max(0, pulse.progress - 0.12);
        const ty = y1 + (y2 - y1) * Math.max(0, pulse.progress - 0.12);

        context.strokeStyle = `rgba(${pulse.color},0.48)`;
        context.lineWidth = 2.1;
        context.beginPath();
        context.moveTo(tx, ty);
        context.lineTo(x, y);
        context.stroke();

        context.fillStyle = `rgba(${pulse.color},0.92)`;
        context.beginPath();
        context.arc(x, y, 4.4, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(255,255,255,0.94)";
        context.beginPath();
        context.arc(x, y, 1.7, 0, Math.PI * 2);
        context.fill();

        pulse.progress += pulse.speed * dt;
        if (pulse.progress >= 1) {
          pulse.from = pulse.to;
          pulse.to = (pulse.to + 1 + Math.floor(Math.random() * (anchors.length - 1))) % anchors.length;
          pulse.progress = 0;
          pulse.speed = 0.07 + Math.random() * 0.14;
        }
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="impulse-field" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="presentation">
        <defs>
          <linearGradient id="impulseA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(15,109,98)" stopOpacity="0.08" />
            <stop offset="45%" stopColor="rgb(15,109,98)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="rgb(180,79,44)" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="impulseB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(180,79,44)" stopOpacity="0.08" />
            <stop offset="45%" stopColor="rgb(180,79,44)" stopOpacity="0.74" />
            <stop offset="100%" stopColor="rgb(231,193,106)" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {IMPULSE_PATHS.map((item, index) => (
          <g key={item.d}>
            <path id={`impulse-path-${index}`} d={item.d} className="impulse-field__track" pathLength="1000" />
            <path
              d={item.d}
              className={item.cls}
              pathLength="1000"
              style={{ animationDuration: item.dur }}
            />
            <circle className="impulse-field__pulse impulse-field__pulse--glow" r="1.15">
              <animateMotion dur={item.dur} repeatCount="indefinite">
                <mpath href={`#impulse-path-${index}`} />
              </animateMotion>
            </circle>
            <circle className="impulse-field__pulse impulse-field__pulse--core" r="0.52">
              <animateMotion dur={item.dur} repeatCount="indefinite">
                <mpath href={`#impulse-path-${index}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </svg>
      <canvas ref={canvasRef} className="impulse-field__canvas" />
      <div className="impulse-field__nodes">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={`impulse-field__node impulse-field__node--${(index % 6) + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
