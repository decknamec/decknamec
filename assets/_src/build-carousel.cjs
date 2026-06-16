// Generates assets/tech-stack.svg — the scrolling tech-stack marquee.
// Run:  node assets/_src/build-carousel.cjs   (icons are vendored in ./icons)
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'icons');
const OUT = path.join(__dirname, '..');

const ICONS = [
  ['typescript', 'TypeScript'], ['react', 'React'], ['nextdotjs', 'Next.js'],
  ['vuedotjs', 'Vue'], ['tailwindcss', 'Tailwind CSS'], ['radixui', 'Radix UI'],
  ['reactquery', 'TanStack Query'], ['expo', 'React Native / Expo'], ['tauri', 'Tauri'],
  ['rust', 'Rust'], ['supabase', 'Supabase'], ['postgresql', 'PostgreSQL'],
  ['nodedotjs', 'Node.js'], ['stripe', 'Stripe'], ['amazonwebservices', 'AWS'],
  ['anthropic', 'Claude (Anthropic)'], ['ollama', 'Ollama'], ['deepgram', 'Deepgram'],
  ['vitest', 'Vitest'], ['playwright', 'Playwright'], ['git', 'Git'],
  ['githubactions', 'GitHub Actions'], ['jira', 'Jira'],
];

const W = 880, H = 116;
const CELL = 72, ICON = 30, SCALE = ICON / 24;
const PAD_X = (CELL - ICON) / 2, Y = (H - ICON) / 2;
const STRIP = ICONS.length * CELL;
const FADE = (0.07).toFixed(3), FADE2 = (0.93).toFixed(3);

const pathFor = (slug) => {
  const m = fs.readFileSync(`${DIR}/${slug}.svg`, 'utf8').match(/ d="([^"]+)"/);
  if (!m) throw new Error('no path: ' + slug);
  return m[1];
};

const strip = ICONS.map(([slug, label], i) => {
  const x = i * CELL + PAD_X;
  return `      <g transform="translate(${x}, ${Y}) scale(${SCALE})"><title>${label}</title><path fill="currentColor" d="${pathFor(slug)}"/></g>`;
}).join('\n');
const altList = ICONS.map(([, l]) => l).join(', ');

const LIGHT = `--bg1:#eef1f7;--bg2:#dfe5ef;--ic:#222831;--accent:#2f64f0;--stroke:rgba(20,26,48,.10);--frost:rgba(255,255,255,.60);--sweepGlow:#3f74ff;--auroraO:.50`;
const DARK = `--bg1:#080b16;--bg2:#10162c;--ic:#ffffff;--accent:#5ce1ff;--stroke:rgba(255,255,255,.10);--frost:rgba(8,11,22,.42);--sweepGlow:#7fe9ff;--auroraO:.85`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tech-Stack: ${altList}">
  <title>Tech-Stack: ${altList}</title>
  <style>
  svg{${LIGHT}}
  @media (prefers-color-scheme:dark){svg{${DARK}}}
  .gs1{stop-color:var(--bg1)} .gs2{stop-color:var(--bg2)}
  .glowStop{stop-color:var(--sweepGlow)}
  .panel{fill:url(#bgGrad);stroke:var(--stroke);stroke-width:1}
  .frost{fill:var(--frost)}
  .aurora{opacity:var(--auroraO)}
  .b1,.b2,.b3,.b4{transform-box:fill-box;transform-origin:center}
  .track{animation:marquee 40s linear infinite}
  .b1{animation:d1 24s ease-in-out infinite}.b2{animation:d2 31s ease-in-out infinite}
  .b3{animation:d3 19s ease-in-out infinite}.b4{animation:d2 27s ease-in-out infinite reverse}
  .sweep{animation:sweep 9s cubic-bezier(.4,0,.15,1) infinite}
  @keyframes marquee{to{transform:translateX(-${STRIP}px)}}
  @keyframes sweep{0%{transform:translateX(-340px);opacity:0}10%{opacity:1}40%{transform:translateX(920px);opacity:1}47%{opacity:0}100%{transform:translateX(920px);opacity:0}}
  @keyframes d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(80px,-22px) scale(1.18)}}
  @keyframes d2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-66px,20px) scale(1.12)}}
  @keyframes d3{0%,100%{transform:translate(0,0)}50%{transform:translate(54px,16px)}}
  @media (prefers-reduced-motion:reduce){.track,.b1,.b2,.b3,.b4{animation:none}.sweep{animation:none;opacity:0}}
  </style>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0.7" y2="1"><stop class="gs1" offset="0"/><stop class="gs2" offset="0.55"/><stop class="gs1" offset="1"/></linearGradient>
    <radialGradient id="aGreen"><stop offset="0" stop-color="#3FCF8E" stop-opacity=".9"/><stop offset="1" stop-color="#3FCF8E" stop-opacity="0"/></radialGradient>
    <radialGradient id="aBlue"><stop offset="0" stop-color="#3178C6" stop-opacity=".9"/><stop offset="1" stop-color="#3178C6" stop-opacity="0"/></radialGradient>
    <radialGradient id="aViolet"><stop offset="0" stop-color="#7C5CFF" stop-opacity=".9"/><stop offset="1" stop-color="#7C5CFF" stop-opacity="0"/></radialGradient>
    <radialGradient id="aCoral"><stop offset="0" stop-color="#D97757" stop-opacity=".85"/><stop offset="1" stop-color="#D97757" stop-opacity="0"/></radialGradient>
    <linearGradient id="bandG"><stop offset="0" stop-color="#000"/><stop offset="0.5" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <linearGradient id="glowG"><stop class="glowStop" offset="0" stop-opacity="0"/><stop class="glowStop" offset="0.5" stop-opacity=".8"/><stop class="glowStop" offset="1" stop-opacity="0"/></linearGradient>
    <linearGradient id="fadeG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0"><stop offset="0" stop-color="#000"/><stop offset="${FADE}" stop-color="#fff"/><stop offset="${FADE2}" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="26"/></filter>
    <filter id="glow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="2.1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <clipPath id="clip"><rect x="0" y="0" width="${W}" height="${H}" rx="20"/></clipPath>
    <mask id="edge"><rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeG)"/></mask>
    <mask id="band" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect class="sweep" x="0" y="0" width="300" height="${H}" fill="url(#bandG)"/></mask>
    <g id="strip">
${strip}
    </g>
  </defs>
  <rect class="panel" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="20"/>
  <g clip-path="url(#clip)"><g class="aurora" filter="url(#soft)">
    <g class="b1"><circle cx="170" cy="60" r="92" fill="url(#aGreen)"/></g>
    <g class="b2"><circle cx="450" cy="30" r="120" fill="url(#aBlue)"/></g>
    <g class="b3"><circle cx="690" cy="86" r="104" fill="url(#aViolet)"/></g>
    <g class="b4"><circle cx="320" cy="96" r="86" fill="url(#aCoral)"/></g>
  </g></g>
  <rect class="frost" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="20" clip-path="url(#clip)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="20" fill="url(#gloss)" clip-path="url(#clip)"/>
  <g clip-path="url(#clip)" mask="url(#edge)"><g class="track" style="color:var(--ic)"><use href="#strip" xlink:href="#strip"/><use href="#strip" xlink:href="#strip" x="${STRIP}"/></g></g>
  <g clip-path="url(#clip)"><rect class="sweep" x="0" y="0" width="300" height="${H}" fill="url(#glowG)"/></g>
  <g clip-path="url(#clip)" mask="url(#edge)"><g mask="url(#band)"><g class="track" style="color:var(--accent)" filter="url(#glow)"><use href="#strip" xlink:href="#strip"/><use href="#strip" xlink:href="#strip" x="${STRIP}"/></g></g></g>
</svg>
`;

fs.writeFileSync(path.join(OUT, 'tech-stack.svg'), svg);
console.log('wrote tech-stack.svg');
