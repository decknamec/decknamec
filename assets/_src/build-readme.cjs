// Generates the README chrome: hero, divider, section headers, contact chips.
// Run:  node assets/_src/build-readme.cjs   (icons are vendored in ./icons)
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'icons');
const OUT = path.join(__dirname, '..');

const FONT = "'Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif";
const pathFor = (s) => {
  const m = fs.readFileSync(`${DIR}/${s}.svg`, 'utf8').match(/ d="([^"]+)"/);
  if (!m) throw new Error('no path ' + s); return m[1];
};

const L = `--bg1:#eef1f7;--bg2:#dde4ef;--ink:#1f2630;--mut:#5b6473;--accent:#2f5fe6;--stroke:rgba(20,26,48,.12);--frost:rgba(255,255,255,.60);--glow:#3f74ff;--auroraO:.46;--chip:#ffffff;--chipBd:rgba(20,26,48,.14)`;
const D = `--bg1:#080b16;--bg2:#10162c;--ink:#f3f6fc;--mut:#aab3c5;--accent:#5ce1ff;--stroke:rgba(255,255,255,.12);--frost:rgba(8,11,22,.42);--glow:#7fe9ff;--auroraO:.70;--chip:rgba(255,255,255,.06);--chipBd:rgba(255,255,255,.16)`;
const vars = () => `svg{${L}}@media (prefers-color-scheme:dark){svg{${D}}}`;

const auroraDefs = `
    <radialGradient id="aG"><stop offset="0" stop-color="#3FCF8E" stop-opacity=".9"/><stop offset="1" stop-color="#3FCF8E" stop-opacity="0"/></radialGradient>
    <radialGradient id="aB"><stop offset="0" stop-color="#3178C6" stop-opacity=".9"/><stop offset="1" stop-color="#3178C6" stop-opacity="0"/></radialGradient>
    <radialGradient id="aV"><stop offset="0" stop-color="#4F66E0" stop-opacity=".9"/><stop offset="1" stop-color="#4F66E0" stop-opacity="0"/></radialGradient>
    <radialGradient id="aC"><stop offset="0" stop-color="#D97757" stop-opacity=".85"/><stop offset="1" stop-color="#D97757" stop-opacity="0"/></radialGradient>
    <filter id="soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="30"/></filter>`;

function open(w, h, label, css) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <title>${label}</title>
  <style>
  ${vars()}
  text{font-family:${FONT}}
${css}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}}
  </style>`;
}

/* HERO — aurora drift + waving hand + slow gentle name glint */
function hero() {
  const W = 880, H = 200, R = 24;
  const css = `
  .gs1{stop-color:var(--bg1)}.gs2{stop-color:var(--bg2)}
  .panel{fill:url(#bg);stroke:var(--stroke);stroke-width:1}
  .frost{fill:var(--frost)}.aurora{opacity:var(--auroraO)}
  .b1,.b2,.b3,.b4{transform-box:fill-box;transform-origin:center}
  .b1{animation:d1 26s ease-in-out infinite}.b2{animation:d2 33s ease-in-out infinite}
  .b3{animation:d3 21s ease-in-out infinite}.b4{animation:d2 29s ease-in-out infinite reverse}
  .name{font-size:46px;font-weight:800;letter-spacing:-.6px}
  .sub{font-size:18px;font-weight:500}.acc{fill:var(--accent);font-weight:700}
  .tag{font-size:13.5px;font-weight:500;fill:var(--mut)}
  .plab{font-size:12px;font-weight:700;fill:var(--accent);letter-spacing:.4px}
  .wave{transform-box:fill-box;transform-origin:62% 80%;animation:wave 2.8s ease-in-out infinite}
  .glint{opacity:0;animation:glint 10s ease-in-out infinite}
  @keyframes wave{0%,58%,100%{transform:rotate(0)}66%{transform:rotate(15deg)}74%{transform:rotate(-7deg)}82%{transform:rotate(13deg)}90%{transform:rotate(-3deg)}}
  @keyframes glint{0%{transform:translateX(-540px);opacity:0}14%{opacity:.62}46%{transform:translateX(${W}px);opacity:.62}56%{opacity:0}100%{transform:translateX(${W}px);opacity:0}}
  @keyframes d1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(70px,-20px) scale(1.18)}}
  @keyframes d2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-60px,18px) scale(1.12)}}
  @keyframes d3{0%,100%{transform:translate(0,0)}50%{transform:translate(48px,14px)}}`;
  return open(W, H, 'Hey, ich bin Moritz. Software Developer @ Relationflow', css) + `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1"><stop class="gs1" offset="0"/><stop class="gs2" offset="0.55"/><stop class="gs1" offset="1"/></linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="glintG"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    ${auroraDefs}
    <clipPath id="clip"><rect x="0" y="0" width="${W}" height="${H}" rx="${R}"/></clipPath>
    <mask id="glintM" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect class="glint" x="0" y="0" width="300" height="${H}" fill="url(#glintG)"/></mask>
  </defs>
  <rect class="panel" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${R}"/>
  <g clip-path="url(#clip)"><g class="aurora" filter="url(#soft)">
    <g class="b1"><circle cx="150" cy="60" r="96" fill="url(#aG)"/></g>
    <g class="b2"><circle cx="470" cy="36" r="128" fill="url(#aB)"/></g>
    <g class="b3"><circle cx="740" cy="150" r="120" fill="url(#aV)"/></g>
    <g class="b4"><circle cx="300" cy="170" r="96" fill="url(#aC)"/></g>
  </g></g>
  <rect class="frost" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${R}" clip-path="url(#clip)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${R}" fill="url(#gloss)" clip-path="url(#clip)"/>
  <text class="name" x="56" y="92" fill="var(--ink)">Hey, ich bin Moritz</text>
  <g clip-path="url(#clip)" mask="url(#glintM)"><text class="name" x="56" y="92" fill="var(--glow)">Hey, ich bin Moritz</text></g>
  <text class="wave" x="506" y="92" style="font-size:42px">👋</text>
  <text class="sub" x="58" y="128" fill="var(--mut)">Software Developer @ <tspan class="acc">Relationflow</tspan><tspan fill="var(--mut)">  ·  24</tspan></text>
  <g font-family="${FONT}">
    <rect x="58" y="150" width="44" height="26" rx="13" fill="var(--chip)" stroke="var(--chipBd)"/><text class="plab" x="80" y="167" text-anchor="middle">DE</text>
    <rect x="108" y="150" width="44" height="26" rx="13" fill="var(--chip)" stroke="var(--chipBd)"/><text class="plab" x="130" y="167" text-anchor="middle">EN</text>
    <rect x="158" y="150" width="44" height="26" rx="13" fill="var(--chip)" stroke="var(--chipBd)"/><text class="plab" x="180" y="167" text-anchor="middle">NO</text>
    <text class="tag" x="218" y="167">offen für spannende Projekte</text>
  </g>
</svg>
`;
}

/* DIVIDER — static aurora-gradient hairline */
function divider() {
  const W = 880, H = 16, y = 8;
  const css = `
  .s0{stop-color:var(--accent);stop-opacity:0}.s1{stop-color:var(--accent);stop-opacity:.5}
  .gs{stop-color:var(--glow)}`;
  return open(W, H, '', css) + `
  <defs>
    <linearGradient id="ln" x1="0" x2="${W}" gradientUnits="userSpaceOnUse"><stop class="s0" offset="0"/><stop class="s1" offset=".5"/><stop class="s0" offset="1"/></linearGradient>
    <radialGradient id="cd"><stop class="gs" offset="0" stop-opacity=".8"/><stop class="gs" offset="1" stop-opacity="0"/></radialGradient>
  </defs>
  <rect x="0" y="${y - 0.5}" width="${W}" height="1.5" rx="1" fill="url(#ln)"/>
  <ellipse cx="${W / 2}" cy="${y}" rx="70" ry="6" fill="url(#cd)"/>
</svg>
`;
}

/* SECTION HEADER — static accent mark + gradient underline */
function header(title) {
  const W = title.length * 17 + 60, H = 52;
  const tw = title.length * 16 + 24;
  const css = `
  .ttl{font-size:27px;font-weight:800;letter-spacing:-.4px;fill:var(--ink)}
  .u0{stop-color:var(--accent);stop-opacity:.95}.u1{stop-color:var(--accent);stop-opacity:0}
  .mark{fill:var(--accent)}`;
  return open(W, H, title, css) + `
  <defs><linearGradient id="ul" x1="0" x2="${tw}" gradientUnits="userSpaceOnUse"><stop class="u0" offset="0"/><stop class="u1" offset="1"/></linearGradient></defs>
  <path class="mark" d="M11 14 l7 12 l-7 12 l-3.4 -2 l5.2 -10 l-5.2 -10 z"/>
  <text class="ttl" x="30" y="34">${title}</text>
  <rect x="30" y="44" width="${tw}" height="2.4" rx="1.2" fill="url(#ul)"/>
</svg>
`;
}

/* CONTACT CHIP — static, per-brand icon colour */
function chip(label, slug, icL, icD, customIcon) {
  const W = 200, H = 54, R = 14;
  const icon = customIcon || `<path fill="currentColor" d="${pathFor(slug)}"/>`;
  const css = `
  .pill{fill:var(--chip);stroke:var(--chipBd)}
  .lab{font-size:15.5px;font-weight:650;fill:var(--ink)}
  .ic{color:${icL}}
  @media (prefers-color-scheme:dark){.ic{color:${icD}}}`;
  return open(W, H, label, css) + `
  <defs>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="clip"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${R}"/></clipPath>
  </defs>
  <rect class="pill" x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${R}"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${R}" fill="url(#gloss)" clip-path="url(#clip)"/>
  <g class="ic" transform="translate(18, ${H / 2 - 11}) scale(0.92)">${icon}</g>
  <text class="lab" x="50" y="${H / 2 + 5}">${label}</text>
</svg>
`;
}

const globe = `<g stroke="currentColor" stroke-width="1.7" fill="none"><circle cx="12" cy="12" r="9.4"/><ellipse cx="12" cy="12" rx="4" ry="9.4"/><path d="M2.7 12h18.6M4.2 7h15.6M4.2 17h15.6"/></g>`;

const files = {
  'hero.svg': hero(),
  'divider.svg': divider(),
  'hdr-stack.svg': header('Tech-Stack'),
  'hdr-about.svg': header('Über mich'),
  'hdr-contact.svg': header('Kontakt'),
  'chip-linkedin.svg': chip('LinkedIn', 'linkedin', '#0A66C2', '#4eb0f2'),
  'chip-github.svg': chip('GitHub', 'github', 'var(--ink)', 'var(--ink)'),
  'chip-xing.svg': chip('XING', 'xing', '#0E7C7B', '#2fd4c9'),
  'chip-web.svg': chip('Website', null, 'var(--accent)', 'var(--accent)', globe),
};
for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(OUT, name), content);
console.log('wrote', Object.keys(files).length, 'README SVGs');
