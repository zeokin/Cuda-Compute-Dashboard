"use client";

const PATH_A =
  "M0 205 C110 150, 200 128, 300 150 S500 262, 620 246 S840 124, 980 146 S1120 230, 1200 210";
const PATH_B =
  "M0 245 C120 270, 220 250, 320 214 S520 126, 640 144 S860 270, 1000 246 S1120 158, 1200 176";
const PATH_C =
  "M0 178 C90 170, 170 194, 260 220 S450 260, 560 224 S760 122, 900 154 S1100 246, 1200 226";

export default function FourierBackground() {
  return (
    <div className="fourier-background" aria-hidden="true">
      <svg viewBox="0 0 1200 420" preserveAspectRatio="none" role="presentation">
        <g className="fourier-background__axes">
          <line className="fourier-background__axis fourier-background__axis--y" x1="660" y1="78" x2="660" y2="336" />
          <line className="fourier-background__axis fourier-background__axis--x" x1="72" y1="210" x2="1148" y2="210" />
          {[176, 210, 244].map((y) => (
            <line
              key={`y-${y}`}
              className="fourier-background__tick"
              x1="652"
              y1={y}
              x2="660"
              y2={y}
            />
          ))}
          {[132, 312, 492, 660, 840, 1020, 1112].map((x) => (
            <line
              key={`x-${x}`}
              className="fourier-background__tick"
              x1={x}
              y1="210"
              x2={x}
              y2="218"
            />
          ))}
        </g>
        <path className="fourier-background__wave fourier-background__wave--a" d={PATH_A} pathLength="1000" />
        <path className="fourier-background__wave fourier-background__wave--b" d={PATH_B} pathLength="1000" />
        <path className="fourier-background__wave fourier-background__wave--c" d={PATH_C} pathLength="1000" />
      </svg>
    </div>
  );
}
