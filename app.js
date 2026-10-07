// The style library. `kind: "product"` entries are shipped products; the rest
// are registers we design in. Every entry redraws the same review card.
const STYLES = [
  { id: "swiss", name: "Swiss Minimal", line: "Grid, flush-left type, one red. Information first.",
    best: "Dashboards, finance, documentation", type: "Inter Tight", palette: ["#ffffff", "#111111", "#e30613", "#e9e9e9"] },
  { id: "brutal", name: "Neo-Brutalism", line: "Hard borders, offset shadows, loud flat colour.",
    best: "Creator tools, Gen Z brands, launches", type: "Archivo Black + Space Grotesk", palette: ["#ffe14d", "#ff5ca8", "#8ae9ff", "#000000"] },
  { id: "glass", name: "Glassmorphism", line: "Frosted layers floating over colour.",
    best: "Media players, OS-style widgets, crypto", type: "Inter", palette: ["#1e1b4b", "#ff7a59", "#6366f1", "#2dd4bf"] },
  { id: "neu", name: "Neumorphism", line: "Soft extruded controls carved from one surface.",
    best: "Smart-home, calculators, wellness", type: "Nunito", palette: ["#e3e7ee", "#c1c7d2", "#6c7cff", "#2f3747"] },
  { id: "editorial", name: "Editorial Luxury", line: "Italic serifs, hairlines, generous margins.",
    best: "Hospitality, fashion, med-spas, real estate", type: "Cormorant Garamond + Inter", palette: ["#efe9df", "#fbf8f2", "#9c7a3c", "#1b1a17"] },
  { id: "bento", name: "Bento Grid", line: "Content split into tiles of different weight.",
    best: "Product pages, profiles, feature tours", type: "Inter", palette: ["#f2f2f5", "#ffffff", "#111111", "#a3e635"] },
  { id: "terminal", name: "Retro Terminal", line: "Phosphor green, scanlines, typed prompts.",
    best: "Developer tools, CLIs, hacker events", type: "VT323 + IBM Plex Mono", palette: ["#050805", "#0a120b", "#1fae45", "#39ff6a"] },
  { id: "clay", name: "Claymorphism", line: "Puffy, toy-like shapes with inner light.",
    best: "Kids, education, onboarding, games", type: "Nunito Black", palette: ["#c9e4ff", "#7c6cff", "#ffb547", "#ffd6e7"] },
  { id: "saas", name: "Dark SaaS", line: "Gradient edges and glow on deep ink.",
    best: "AI products, dev platforms, analytics", type: "Inter", palette: ["#07070b", "#7c5cff", "#38bdf8", "#ededf2"] },
  { id: "portiq", name: "Portiq", kind: "product", line: "Shipped product. Calm black, one blue for state.",
    best: "Meeting intelligence", type: "Inter", palette: ["#000000", "#0b0b0b", "#3b82f6", "#22c55e"] },
  { id: "mirage", name: "Mirage", kind: "product", line: "Shipped product. Drafting-table ink and a teal signal.",
    best: "Floor plan to 3D home", type: "Geist + Geist Mono + Doto", palette: ["#0a0b0c", "#111315", "#edebe4", "#5bf0d1"] },
];

const specMarkup = () => `
  <div class="spec">
    <div class="spec-top"><span class="spec-tag">Design review</span><span class="spec-time">Thu 4:30 PM</span></div>
    <h4 class="spec-title">Checkout redesign</h4>
    <p class="spec-body">3 of 5 screens approved</p>
    <div class="spec-bar" role="progressbar" aria-label="Screens approved" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"><i></i></div>
    <div class="spec-foot">
      <div class="spec-avatars" aria-hidden="true"><b>AK</b><b>JM</b><b>SS</b></div>
      <div class="spec-actions"><button type="button" class="spec-btn">Comment</button><button type="button" class="spec-btn primary">Approve</button></div>
    </div>
  </div>`;

/* ---------- hero switcher ---------- */
const heroStage = document.getElementById("hero-stage");
const heroName = document.getElementById("hero-name");
const heroLine = document.getElementById("hero-line");
const chipRow = document.getElementById("chips");
let current = 0;
let auto = !matchMedia("(prefers-reduced-motion: reduce)").matches;
let timer;

function show(i) {
  current = (i + STYLES.length) % STYLES.length;
  const s = STYLES[current];
  heroStage.dataset.style = s.id;
  heroStage.innerHTML = specMarkup();
  heroName.textContent = s.name;
  heroLine.textContent = `${String(current + 1).padStart(2, "0")} / ${STYLES.length} · ${s.line}`;
  chipRow.querySelectorAll(".chip").forEach((c, k) => c.setAttribute("aria-pressed", String(k === current)));
}

STYLES.forEach((s, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip" + (s.kind === "product" ? " product" : "");
  b.id = `chip-${s.id}`;
  b.textContent = s.name;
  b.addEventListener("click", () => { auto = false; clearInterval(timer); show(i); });
  chipRow.appendChild(b);
});
show(0);
if (auto) timer = setInterval(() => show(current + 1), 2600);

/* ---------- style library ---------- */
const library = document.getElementById("library");
STYLES.filter((s) => s.kind !== "product").forEach((s, i) => {
  const card = document.createElement("article");
  card.className = "style-card";
  card.innerHTML = `
    <div class="stage" data-style="${s.id}">${specMarkup()}</div>
    <div class="style-info">
      <header><h3>${s.name}</h3><span class="mono num">No. ${String(i + 1).padStart(2, "0")}</span></header>
      <p>${s.line}</p>
      <dl><dt>Best for</dt><dd>${s.best}</dd><dt>Type</dt><dd>${s.type}</dd></dl>
      <div class="mini-sw" aria-label="Palette">${s.palette.map((c) => `<i style="background:${c}" title="${c}"></i>`).join("")}</div>
    </div>`;
  library.appendChild(card);
});

/* ---------- Mirage mock: time of day ---------- */
const scan = document.getElementById("m-scan");
const tints = { morning: "rgba(255,236,190,.05)", golden: "rgba(255,170,90,.10)", night: "rgba(40,60,140,.18)" };
document.querySelectorAll(".m-times button").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".m-times button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    scan.querySelectorAll(".room").forEach((r) => (r.style.fill = tints[b.dataset.t]));
  });
});
document.getElementById("m-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const log = document.getElementById("m-log");
  const v = document.getElementById("m-input").value.trim() || "make the master bedroom cosier";
  log.innerHTML = `&gt; ${v.replace(/[<>&]/g, "")}<br>&gt; warmer lamps, linen throw, rug added<br><span class="ok">&gt; applied · undo anytime</span>`;
});

/* ---------- Portiq waveform ---------- */
const wave = document.getElementById("p-wave");
for (let i = 0; i < 48; i++) {
  const bar = document.createElement("i");
  bar.style.animationDelay = `${(i * 97) % 1200}ms`;
  wave.appendChild(bar);
}
