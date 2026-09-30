/* ==========================================================================
   Candy Client — landing page behaviour
   Edit the CONFIG block below with your real links, then commit. That's all.
   ========================================================================== */
const CONFIG = {
  // Where the two downloads live.
  // - The Candy Client .jar is small, so it ships right inside the site
  //   (website/downloads/) and works the moment you deploy.
  // - The optimizer .exe is 13 MB, so keep it out of the Pages repo: upload it
  //   as a GitHub Release and point the link at the asset (recommended), or drop
  //   it in website/downloads/ and use "downloads/CandyUltimate.exe".
  clientDownload:    "downloads/candy-client.jar",
  optimizerDownload: "https://github.com/YOURNAME/candy-client/releases/latest/download/CandyUltimate.exe",
  githubRepo:        "https://github.com/YOURNAME/candy-client",
  discord:           "",   // paste your invite; leave "" to hide the link

  compliments: [
    "you make hard combos look easy.",
    "your aim's been unfair lately.",
    "the lobby's lucky you showed up.",
    "certified problem for the other team.",
    "you clutch when it counts.",
    "movement's looking clean today.",
    "built different, frames included.",
    "they're not ready for you.",
    "your builds are basically art.",
    "cracked, and humble about it.",
  ],
};

/* ---- wire up links ---- */
(function links(){
  const set = (id, href, {hideIfEmpty=false}={}) => {
    const el = document.getElementById(id);
    if(!el) return;
    if(hideIfEmpty && !href){ el.style.display="none"; return; }
    el.href = href || "#";
  };
  set("dlClient", CONFIG.clientDownload);
  set("dlOptimizer", CONFIG.optimizerDownload);
  set("ghLink", CONFIG.githubRepo);
  set("ghLink2", CONFIG.githubRepo);
  set("discordLink", CONFIG.discord, {hideIfEmpty:true});
  const y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
})();

/* ---- mobile menu ---- */
(function menu(){
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if(!burger||!menu) return;
  const close = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded","false"); };
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
})();

/* ---- slider fills follow their handles ---- */
document.querySelectorAll(".slider__track").forEach(tr => {
  const h = tr.querySelector("i");
  if(h) tr.style.setProperty("--w", h.style.left || "50%");
});

/* ---- rotating compliment on the splash mock ---- */
(function compliment(){
  const el = document.getElementById("complimentText");
  if(!el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % CONFIG.compliments.length;
    el.style.opacity = 0;
    setTimeout(() => { el.textContent = CONFIG.compliments[i]; el.style.opacity = 1; }, 300);
  }, 3200);
  el.style.transition = "opacity .3s ease";
})();

/* ---- live-ish FPS readout in the hero mock ---- */
(function fps(){
  const num = document.getElementById("fpsNum");
  const delta = document.getElementById("fpsDelta");
  const bar = document.getElementById("fpsBar");
  if(!num) return;
  const base = 86; // "vanilla"
  let cur = 247;
  setInterval(() => {
    const target = 230 + Math.round(Math.random()*70);   // 230-300
    cur += Math.round((target - cur) * 0.5);
    num.textContent = cur;
    if(delta) delta.textContent = "+" + (cur - base);
    if(bar) bar.style.width = Math.min(100, Math.round((cur/320)*100)) + "%";
  }, 900);
})();

/* ---- count-up stats when scrolled into view ---- */
(function stats(){
  const nums = document.querySelectorAll(".stat__num[data-count]");
  if(!nums.length) return;
  const run = el => {
    const to = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1100; const t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0)/dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
  }, {threshold:.6});
  nums.forEach(n => io.observe(n));
})();

/* ---- reveal-on-scroll ---- */
(function reveal(){
  const targets = document.querySelectorAll(".showcase__row, .feat, .dcard, .qa, .cta__inner, .stats");
  targets.forEach(t => t.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12});
  targets.forEach(t => io.observe(t));
})();

/* ---- preset chips in the hero mock are clickable for feel ---- */
document.querySelectorAll(".presetrow").forEach(row => {
  row.querySelectorAll(".chip").forEach(c => c.addEventListener("click", () => {
    row.querySelectorAll(".chip").forEach(x => x.classList.remove("chip--active"));
    c.classList.add("chip--active");
  }));
});
