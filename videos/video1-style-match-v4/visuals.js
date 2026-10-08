const tl = gsap.timeline({ paused: true });

const beats = [
  ["beat-01", 0.2, 2.2],
  ["beat-02", 2.25, 4.0],
  ["beat-03", 4.0, 5.95],
  ["beat-04", 9.05, 10.45],
  ["beat-05", 10.45, 13.9],
  ["beat-06", 14.2, 18.8],
  ["beat-07", 18.8, 21.9],
  ["beat-08", 22.4, 26.0],
  ["beat-09", 28.8, 32.6],
  ["beat-10", 32.6, 34.9],
  ["beat-11", 35.1, 38.05],
  ["beat-12", 38.1, 41.2],
  ["beat-13", 43.7, 47.0],
  ["beat-14", 47.0, 50.8],
  ["beat-15", 51.5, 54.5],
  ["beat-16", 54.5, 58.5],
  ["beat-17", 61.3, 64.5],
  ["beat-18", 64.5, 68.9],
  ["beat-20", 72.0, 77.3],
  ["beat-21", 77.5, 80.8],
  ["beat-22", 80.8, 84.9],
  ["beat-23", 85.0, 88.8],
  ["beat-24", 88.8, 91.0],
];

function lineEntrance(id, start, options = {}) {
  const lines = gsap.utils.toArray(`#${id} .hf-line`);
  const stagger = options.stagger ?? 0.1;
  const duration = options.duration ?? 0.32;
  const fromX = options.x ?? 0;
  const fromY = options.y ?? 24;
  const ease = options.ease ?? "power3.out";

  lines.forEach((line, index) => {
    tl.fromTo(
      line,
      {
        opacity: 0,
        "--hf-line-x": `${fromX}px`,
        "--hf-line-y": `${fromY}px`,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        "--hf-line-x": "0px",
        "--hf-line-y": "0px",
        filter: "blur(0px)",
        duration,
        ease,
        immediateRender: false,
      },
      options.timings?.[index] ?? start + index * stagger,
    );
  });
}

function exitBeat(id, end) {
  tl.to(
    `#${id} .overlay-inner`,
    { opacity: 0, y: -10, duration: 0.22, ease: "power2.in" },
    end - 0.22,
  );
}

function drawChecks(id, start, timings = []) {
  const checks = gsap.utils.toArray(`#${id} .hf-check`);
  checks.forEach((check, index) => {
    const at = timings[index] ?? start + index * 0.12;
    const svg = check.querySelector("svg");
    const path = check.querySelector("path");

    tl.fromTo(
      check,
      { opacity: 0, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out", immediateRender: false },
      at,
    );
    tl.fromTo(
      svg,
      {
        opacity: 0,
        "--hf-check-scale": 0.72,
        "--hf-check-rotate": "-10deg",
        "--hf-check-blur": "5px",
      },
      {
        opacity: 1,
        "--hf-check-scale": 1,
        "--hf-check-rotate": "0deg",
        "--hf-check-blur": "0px",
        duration: 0.3,
        ease: "power3.out",
        immediateRender: false,
      },
      at,
    );
    tl.fromTo(
      path,
      { "--hf-check-dash": 36 },
      { "--hf-check-dash": 0, duration: 0.34, ease: "power2.out", immediateRender: false },
      at + 0.1,
    );
  });
}

beats.forEach(([id, start, end]) => {
  const options = {};
  if (id === "beat-01" || id === "beat-12" || id === "beat-22") {
    options.stagger = 0.12;
  }
  if (id === "beat-07" || id === "beat-17") {
    options.y = 18;
    options.duration = 0.35;
  }
  if (id === "beat-11") {
    options.x = -76;
    options.y = 0;
    options.duration = 0.36;
    options.ease = "expo.out";
  }
  if (id === "beat-21") {
    options.x = -34;
    options.y = 0;
  }

  const cueTimes = {
    "beat-04": [9.12, 10.4],
    "beat-05": [11.09, 11.62],
    "beat-09": [31.42, 32.03],
    "beat-10": [33.0, 33.81],
    "beat-12": [38.17, 39.06, 39.88],
    "beat-13": [43.77, 45.0, 46.42],
    "beat-14": [47.0, 48.46],
    "beat-16": [54.85, 55.6, 56.35],
    "beat-18": [64.85, 65.85, 66.85],
    "beat-20": [72.01, 73.87, 75.82],
  };
  if (cueTimes[id]) {
    options.timings = cueTimes[id];
  }

  lineEntrance(id, start, options);
  exitBeat(id, end);
});

tl.fromTo(
  "#beat-01 .material-chip-label",
  { letterSpacing: "0.055em" },
  { letterSpacing: "-0.025em", duration: 0.48, stagger: 0.1, ease: "power3.out", immediateRender: false },
  0.2,
);

tl.fromTo(
  "#beat-03 .punch-core",
  { scale: 1.04 },
  { scale: 1, duration: 0.32, ease: "power3.out", immediateRender: false },
  4.18,
);

drawChecks("beat-04", 9.12, [9.12, 10.4]);
drawChecks("beat-05", 11.09, [11.09, 11.62]);

tl.fromTo(
  "#beat-08 .wipe-reveal",
  { clipPath: "inset(0 100% 0 0)" },
  { clipPath: "inset(0 0% 0 0)", duration: 0.42, ease: "power3.out", immediateRender: false },
  22.4,
);
tl.fromTo(
  "#beat-08 .accent-rule",
  { scaleX: 0 },
  { scaleX: 1, duration: 0.38, ease: "power2.out", immediateRender: false },
  22.62,
);

tl.fromTo(
  "#beat-09 .measure-item:first-child",
  { x: -44 },
  { x: 0, duration: 0.34, ease: "power3.out", immediateRender: false },
  31.42,
);
tl.fromTo(
  "#beat-09 .measure-item:last-child",
  { x: 44 },
  { x: 0, duration: 0.34, ease: "power3.out", immediateRender: false },
  32.03,
);

tl.fromTo(
  "#beat-11 .reel-rule",
  { scaleY: 0 },
  { scaleY: 1, duration: 0.34, ease: "power3.out", immediateRender: false },
  35.1,
);

drawChecks("beat-13", 46.68);

tl.fromTo(
  "#beat-14 .accent-rule",
  { scaleX: 0 },
  { scaleX: 1, duration: 0.34, ease: "power2.out", immediateRender: false },
  47.22,
);

tl.fromTo(
  "#beat-15 .punch-core",
  { scale: 1.04 },
  { scale: 1, duration: 0.32, ease: "power3.out", immediateRender: false },
  51.68,
);

tl.fromTo(
  "#beat-17 .slow-push",
  { scale: 0.98 },
  { scale: 1, duration: 1.35, ease: "power1.out", immediateRender: false },
  61.3,
);

drawChecks("beat-20", 76.95);

tl.fromTo(
  "#beat-21 .quantity-wide",
  { scaleX: 0.9 },
  { scaleX: 1, duration: 0.42, ease: "power3.out", immediateRender: false },
  77.68,
);

tl.fromTo(
  "#beat-23 .headline--question",
  { x: -26 },
  { x: 0, duration: 0.34, ease: "expo.out", immediateRender: false },
  85.16,
);

tl.fromTo(
  "#beat-24 .phone",
  { scale: 1.03 },
  { scale: 1, duration: 0.38, ease: "power3.out", immediateRender: false },
  88.92,
);

window.__visualTimeline = tl;
