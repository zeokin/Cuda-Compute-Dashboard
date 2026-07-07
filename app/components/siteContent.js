export const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/live", label: "Live Data" },
  { href: "/guide", label: "Guide" },
  { href: "/resources", label: "Resources" },
];

export const audienceCards = [
  {
    eyebrow: "For miners",
    title: "Submit measured improvements",
    body: "Open a PR with a scorecard.",
    href: "/guide",
    cta: "Read the contribution flow",
  },
  {
    eyebrow: "For contributors",
    title: "Fixes and strategy work both matter",
    body: "Fix and feat lanes differ.",
    href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/CONTRIBUTING.md",
    cta: "Open CONTRIBUTING.md",
    external: true,
  },
  {
    eyebrow: "For researchers",
    title: "Track the operator class, not just one benchmark",
    body: "Track matmul to attention.",
    href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/docs/whitepaper.md",
    cta: "Read the whitepaper",
    external: true,
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Read the rule",
    body: "All cost axes must drop while accuracy holds.",
  },
  {
    step: "02",
    title: "Build or fix",
    body: "Add, tune, or fix.",
  },
  {
    step: "03",
    title: "Run the scorer",
    body: "Produce one scorecard.",
  },
  {
    step: "04",
    title: "Publish and verify",
    body: "Queue, replay, verify.",
  },
];

export const guideCards = [
  {
    eyebrow: "One rule",
    title: "Every cost axis down, accuracy held",
    body: "No tradeoff averaging.",
  },
  {
    eyebrow: "Fix lane",
    title: "CPU-safe validation only",
    body: "No GPU score needed.",
  },
  {
    eyebrow: "Feat lane",
    title: "GPU scorecard required",
    body: "CPU checks plus GPU proof.",
  },
];

export const resourceGroups = [
  {
    title: "Core docs",
    items: [
      {
        title: "Whitepaper",
        body: "Vision and roadmap.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/docs/whitepaper.md",
      },
      {
        title: "Contributing guide",
        body: "PR lanes and checks.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/CONTRIBUTING.md",
      },
      {
        title: "Benchmarks",
        body: "How results are made.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/BENCHMARKS.md",
      },
    ],
  },
  {
    title: "Technical notes",
    items: [
      {
        title: "Eval README",
        body: "Scorer and queue flow.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/eval/README.md",
      },
      {
        title: "Spectral token mixing",
        body: "Why spectral matters.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/docs/spectral-mixing.md",
      },
      {
        title: "Spectral vs. matmul explained",
        body: "Tradeoffs and context.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/docs/spectral-vs-matmul-explained.md",
      },
    ],
  },
  {
    title: "Related pages",
    items: [
      {
        title: "CCO intro",
        body: "Public overview.",
        href: "https://zeokin.github.io/Cuda-Compute-OSS/index/index.html",
      },
      {
        title: "GitHub repository",
        body: "Code, docs, eval.",
        href: "https://github.com/zeokin/Cuda-Compute-OSS",
      },
      {
        title: "Gittensor",
        body: "SN74 context.",
        href: "https://gittensor.io/",
      },
    ],
  },
];

export const footerLinks = [
  { href: "https://github.com/zeokin/Cuda-Compute-OSS", label: "GitHub" },
  { href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/docs/whitepaper.md", label: "Whitepaper" },
  { href: "https://github.com/zeokin/Cuda-Compute-OSS/blob/main/CONTRIBUTING.md", label: "Contribute" },
  { href: "https://zeokin.github.io/Cuda-Compute-OSS/index/index.html", label: "CCO Intro" },
];
