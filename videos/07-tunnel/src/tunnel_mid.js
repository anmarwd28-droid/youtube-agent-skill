// ---------- scenes ----------
let F = {};
const ar = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// 0: a giant round shaft in a green plain; a person at the edge, then jumps in
function shaft(cx, cy, rx, ry, depthCol = '#000') {
  let s = `<defs><radialGradient id="shG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${depthCol}"/><stop offset=".55" stop-color="#05070a"/><stop offset=".85" stop-color="#2a2e34"/><stop offset="1" stop-color="#6a6e74"/></radialGradient></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.12}" ry="${ry * 1.18}" fill="#3a3a3a"/>` +
    Array.from({ length: 24 }, (_, i) => { const a0 = i / 24 * 6.283, a1 = (i + .5) / 24 * 6.283; return `<path d="M${cx + Math.cos(a0) * rx * 1.12},${cy + Math.sin(a0) * ry * 1.18} A${rx * 1.12},${ry * 1.18} 0 0 1 ${cx + Math.cos(a1) * rx * 1.12},${cy + Math.sin(a1) * ry * 1.18} L${cx + Math.cos(a1) * rx * 1.02},${cy + Math.sin(a1) * ry * 1.05} A${rx * 1.02},${ry * 1.05} 0 0 0 ${cx + Math.cos(a0) * rx * 1.02},${cy + Math.sin(a0) * ry * 1.05}Z" fill="#e8c020"/>`; }).join('');
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shG)"/>`;
  for (let k = 1; k < 9; k++) { const u = Math.pow(.78, k); s += `<ellipse cx="${cx}" cy="${cy + (1 - u) * ry * .25}" rx="${rx * u}" ry="${ry * u}" fill="none" stroke="#8a9098" stroke-width="${3 * u + .5}" opacity="${.6 * u}"/>`;
    for (let j = 0; j < 8; j++) { const a = j / 8 * 6.283; s += `<circle cx="${cx + Math.cos(a) * rx * u}" cy="${cy + (1 - u) * ry * .25 + Math.sin(a) * ry * u}" r="${3 * u + .6}" fill="#bfe6ff" opacity="${.9 * u}"/>`; } }
  return s;
}
function sceneHook(t) {
  const jump = W(0, 8)[1], jk = ease(ramp(t, jump, jump + .8));
  let s = `<defs><linearGradient id="skH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86c8"/><stop offset="1" stop-color="#cfe4f4"/></linearGradient>` +
    `<filter id="grassT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".06 .4" numOctaves="3" seed="6"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .2  0 0 0 0 .05  0 0 0 -1.5 .95"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>` +
    `<rect width="720" height="1280" fill="url(#skH)"/>`;
  s += `<g filter="url(#blur2)" opacity=".9">` + Array.from({ length: 5 }, (_, i) => { const rr = R(i * 991 + 3); rr(); const cx = pmod(rr() * 900 + t * 10, 900) - 90, cy = 300 + rr() * 160, w = 70 + rr() * 50;
    return Array.from({ length: 7 }, (_, k) => { const u = k / 6; return `<circle cx="${cx - w + u * 2 * w}" cy="${cy - Math.sin(u * Math.PI) * w * .35}" r="${w * (.25 + .3 * Math.sin(u * Math.PI))}" fill="#fff"/>`; }).join(''); }).join('') + `</g>`;
  s += `<path d="M-20,560 C160,540 300,555 420,548 C560,540 640,552 740,545 L740,600 L-20,600Z" fill="#6a8aa0" opacity=".6"/>`;
  s += `<rect y="580" width="720" height="700" fill="#4a7a2a"/><rect y="580" width="720" height="700" fill="#fff" filter="url(#grassT)" opacity=".8"/>`;
  s += shaft(360, 860, 260, 120);
  // floodlight towers
  [[90, 700], [630, 700]].forEach(([x, y]) => { s += `<rect x="${x - 4}" y="${y - 180}" width="8" height="180" fill="#3a3e44"/><rect x="${x - 22}" y="${y - 196}" width="44" height="18" rx="4" fill="#2a2e34"/><circle cx="${x}" cy="${y - 186}" r="40" fill="#fff6d8" opacity=".35" filter="url(#blur2)"/>`; });
  // the person at the rim, then a jump into the shaft
  const px = lerp(360, 360, jk), py = lerp(752, 900, jk) - Math.sin(jk * Math.PI) * 80, sc = lerp(.7, .35, jk);
  s += `<g opacity="${1 - ramp(t, jump + .5, jump + .9)}">` + person(px, py, { s: sc, face: 1, top: '#c8482a', pants: '#2a2e3a', skin: '#b07a55', hair: '#1d1612', moving: jk > 0 && jk < 1, phase: t * 6, amp: .5, t }) + `</g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// 1: the tunnel through the real Earth, end to end
function sceneLine(t) {
  const st = S0(1) - .2, k = ease(ramp(t, st + .3, st + 2.2));
  let s = space(t, '#03050f', '#0a0f2c');
  const ex = 360, ey = 720, er = 300;
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .3, rot: .3, tilt: .41 }; F.light = [-900, 200]; F.moon = null;
  F.ov = `<line x1="${ex}" y1="${ey - er - 30}" x2="${ex}" y2="${ey - er - 30 + (2 * er + 60) * k}" stroke="#ffd27a" stroke-width="6" stroke-dasharray="14 10" stroke-dashoffset="${-t * 40}"/>` +
    `<circle cx="${ex}" cy="${ey}" r="${10 * k}" fill="#ffb04a"/><circle cx="${ex}" cy="${ey}" r="${30 * k}" fill="#ffb04a" opacity=".3" filter="url(#blur2)"/>`;
  return s;
}
// 2: the deepest hole ever drilled is a hairline in the crust
function sceneDrill(t) {
  const st = S0(2) - .2, zoom = ease(ramp(t, WS(2, 6), S0(3) - .3));
  let s = `<defs><linearGradient id="skDr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa4c0"/><stop offset="1" stop-color="#e8eef2"/></linearGradient>` +
    `<linearGradient id="crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5a44"/><stop offset=".35" stop-color="#5a4a3a"/><stop offset=".7" stop-color="#4a3e36"/><stop offset="1" stop-color="#3a2e28"/></linearGradient>` +
    `<filter id="rockT2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".03 .12" numOctaves="4" seed="14"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .04  0 0 0 0 .03  0 0 0 -1.6 1"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`;
  const sc = lerp(1, .05, zoom), top = lerp(560, 520, zoom);
  s += `<rect width="720" height="1280" fill="url(#skDr)"/>`;
  // crust slab with strata (shrinks as we zoom out to the whole Earth)
  s += `<g transform="translate(360,${top}) scale(${sc}) translate(-360,-${top})"><rect x="-4000" y="${top}" width="9000" height="16000" fill="url(#crust)"/><rect x="-4000" y="${top}" width="9000" height="16000" fill="#fff" filter="url(#rockT2)" opacity=".6"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M-4000,${top + 60 + i * 80} ${Array.from({ length: 20 }, () => 'q225,-14 450,0').join(' ')}" stroke="#2a2018" stroke-width="3" fill="none" opacity=".35"/>`).join('') +
    `<rect x="356" y="${top}" width="8" height="620" fill="#0a0806"/><text x="380" y="${top + 640}" font-family="Space Grotesk" font-weight="700" font-size="26" fill="#fff">${ar(12)} km</text>` +
    `<path d="M300,${top} L330,${top - 240} L390,${top - 240} L420,${top}" stroke="#8a2a1a" stroke-width="8" fill="none"/><path d="M315,${top - 120} L405,${top - 120} M322,${top - 180} L398,${top - 180}" stroke="#8a2a1a" stroke-width="6"/><rect x="340" y="${top - 270}" width="40" height="30" fill="#c8a040"/>` +
    `<rect x="200" y="${top - 60}" width="90" height="60" fill="#6a6e74"/><rect x="440" y="${top - 50}" width="110" height="50" fill="#7a7e84"/></g>`;
  // zoomed out: the hole is a scratch on a 6,371 km ball
  if (zoom > 0) { const r = lerp(9000, 330, zoom), cy = top + r; s += `<circle cx="360" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="2" opacity="${zoom * .6}"/>`; }
  F.ov = '';
  return s;
}
// 3–4: falling through the layers: crust, glowing mantle that flows like dough, then the white-hot core
function sceneLayers(t) {
  const st = S0(3) - .2, d = ease(ramp(t, st, S0(5) - .4)), core = ease(ramp(t, S0(4) - .3, S0(4) + .6));
  const temp = Math.round(d < .5 ? lerp(15, 3500, d * 2) : lerp(3500, 6000, (d - .5) * 2));
  let s = `<defs><radialGradient id="ly" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".19" stop-color="#ffd27a"/><stop offset=".2" stop-color="#ffa030"/><stop offset=".53" stop-color="#d0501a"/><stop offset=".55" stop-color="#b8501e"/><stop offset=".97" stop-color="#6a2a14"/><stop offset=".975" stop-color="#5a4a3a"/><stop offset="1" stop-color="#3a3a30"/></radialGradient>` +
    `<filter id="mantleT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="4" seed="${3 + Math.floor(t * 2) % 40}"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .5  0 0 0 0 .1  0 0 0 -1.4 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`;
  s += space(t, '#05050a', '#100808');
  // big half cross-section of the Earth, camera slides down toward the centre
  const R0 = 1500, cy = lerp(1900, 980, d), cx = 360;
  s += `<circle cx="${cx}" cy="${cy}" r="${R0}" fill="url(#ly)"/><circle cx="${cx}" cy="${cy}" r="${R0 * .97}" fill="#fff" filter="url(#mantleT)" opacity=".35" clip-path="url(#mc)"/><defs><clipPath id="mc"><circle cx="${cx}" cy="${cy}" r="${R0 * .97}"/></clipPath></defs>`;
  // convection arrows in the mantle
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .22, rr = R0 * .76, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr, ph = (t * .4 + i) % 6.28;
    s += `<path d="M${x - 40},${y + 20} q40,${-60} 80,0" stroke="#ffe2a0" stroke-width="5" fill="none" opacity=".55" stroke-dasharray="12 10" stroke-dashoffset="${-t * 20}" transform="rotate(${a * 57.3 + 90},${x},${y})"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="${R0 * .19}" fill="#fff8e0" opacity="${.6 + .4 * core}" filter="url(#blur2)"/><circle cx="${cx}" cy="${cy}" r="${R0 * .3}" fill="#ffd27a" opacity="${.3 * core}" filter="url(#soft)"/>`;
  // the tunnel and the faller
  s += `<rect x="${cx - 7}" y="${cy - R0 - 10}" width="14" height="${R0}" fill="#0a0806" opacity=".8"/><circle cx="${cx}" cy="${lerp(cy - R0 + 40, 620, d)}" r="10" fill="#fff"/><circle cx="${cx}" cy="${lerp(cy - R0 + 40, 620, d)}" r="26" fill="#bfe6ff" opacity=".3" filter="url(#blur2)"/>`;
  // sun comparison at the core
  if (core > 0) s += `<g opacity="${ease(ramp(t, WS(4, 11) - .2, WS(4, 11) + .4))}"><circle cx="600" cy="460" r="70" fill="url(#fireGlow)"/><circle cx="600" cy="460" r="36" fill="#fff4d0"/></g>`;
  F.ov = ''; F.temp = temp;
  return s;
}
// 5: assume a safe, airless tube
function sceneTube(t) {
  const st = S0(5) - .2;
  let s = `<rect width="720" height="1280" fill="#03060c"/>`;
  for (let k = 0; k < 16; k++) { const u = pmod(k / 16 + (t - st) * .25, 1), sc = Math.pow(u, 2.2), rx = 40 + sc * 620, ry = 40 + sc * 620;
    s += `<ellipse cx="360" cy="640" rx="${rx}" ry="${ry}" fill="none" stroke="#7a8a9a" stroke-width="${2 + sc * 18}" opacity="${.15 + .6 * u}"/>`;
    for (let j = 0; j < 12; j++) { const a = j / 12 * 6.283; s += `<circle cx="${360 + Math.cos(a) * rx}" cy="${640 + Math.sin(a) * ry}" r="${1.5 + sc * 9}" fill="#6ad0ff" opacity="${.3 + .7 * u}"/>`; } }
  s += `<circle cx="360" cy="640" r="60" fill="#ffd27a" opacity=".25" filter="url(#soft)"/>`;
  F.ov = '';
  return s;
}
// 6–7 + 9: the fall as a diagram: speed builds to ~8 km/s at the centre, then slows to zero at the far rim
function speedDial(x, y, v) {
  const a0 = -210, a1 = 30, a = lerp(a0, a1, clamp(v / 10)) * Math.PI / 180;
  let s = `<g transform="translate(${x},${y})"><circle r="120" fill="rgba(8,12,30,.8)" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>`;
  for (let i = 0; i <= 10; i++) { const b = lerp(a0, a1, i / 10) * Math.PI / 180; s += `<line x1="${Math.cos(b) * 96}" y1="${Math.sin(b) * 96}" x2="${Math.cos(b) * 110}" y2="${Math.sin(b) * 110}" stroke="#fff" stroke-width="${i % 2 ? 2 : 4}"/>` + (i % 2 ? '' : `<text x="${Math.cos(b) * 76}" y="${Math.sin(b) * 76 + 7}" text-anchor="middle" font-family="Space Grotesk" font-size="18" fill="#cfd8e8">${ar(i)}</text>`); }
  s += `<path d="M${Math.cos(a0 * Math.PI / 180) * 103},${Math.sin(a0 * Math.PI / 180) * 103} A103,103 0 ${a - a0 * Math.PI / 180 > Math.PI ? 1 : 0} 1 ${Math.cos(a) * 103},${Math.sin(a) * 103}" stroke="#f4c76b" stroke-width="6" fill="none"/>`;
  s += `<line x1="0" y1="0" x2="${Math.cos(a) * 92}" y2="${Math.sin(a) * 92}" stroke="#ff6a3a" stroke-width="5" stroke-linecap="round"/><circle r="10" fill="#ff6a3a"/>` +
    `<text x="0" y="58" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#fff">${ar(v.toFixed(1))}</text><text x="0" y="86" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="18" fill="#f4c76b">كم/ثانية</text></g>`;
  return s;
}
function sceneFall(t) {
  const st = S0(6) - .2, a = S0(6), b = W(7, 11)[1];
  const osc = t > S0(9) - .2;
  let ph = osc ? (t - (S0(9) - .2)) * 1.4 : clamp((t - a) / (b - a)) * Math.PI;
  const v = 7.9 * Math.abs(Math.sin(ph));
  let s = `<defs><radialGradient id="ly2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe0"/><stop offset=".19" stop-color="#ffd27a"/><stop offset=".2" stop-color="#ffa030"/><stop offset=".53" stop-color="#d0501a"/><stop offset=".55" stop-color="#b8501e"/><stop offset=".97" stop-color="#6a2a14"/><stop offset=".975" stop-color="#5a4a3a"/><stop offset="1" stop-color="#3a3a30"/></radialGradient></defs>`;
  s += space(t, '#03050f', '#0a0f2c');
  const ex = 250, ey = 720, er = 380;
  s += `<circle cx="${ex}" cy="${ey}" r="${er}" fill="url(#ly2)"/><circle cx="${ex}" cy="${ey}" r="${er * .19}" fill="#fff8e0" opacity=".7" filter="url(#blur2)"/>`;
  s += `<rect x="${ex - 9}" y="${ey - er - 6}" width="18" height="${2 * er + 12}" fill="#0a0806"/><rect x="${ex - 9}" y="${ey - er - 6}" width="18" height="${2 * er + 12}" fill="none" stroke="#bfe6ff" stroke-width="2" opacity=".5"/>`;
  const py = ey - Math.cos(ph) * (er - 14);
  // motion trail
  for (let k = 1; k < 10; k++) { const p2 = osc ? ph - k * .05 : Math.max(0, ph - k * .05); s += `<circle cx="${ex}" cy="${ey - Math.cos(p2) * (er - 14)}" r="${9 - k * .7}" fill="#bfe6ff" opacity="${.5 - k * .05}"/>`; }
  s += `<circle cx="${ex}" cy="${py}" r="12" fill="#fff"/><circle cx="${ex}" cy="${py}" r="30" fill="#bfe6ff" opacity=".35" filter="url(#blur2)"/>`;
  s += `<line x1="${ex + er + 20}" y1="${ey}" x2="${ex + 30}" y2="${ey}" stroke="#fff" stroke-width="2" stroke-dasharray="6 6" opacity=".5"/><text x="${ex + er + 26}" y="${ey + 8}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" opacity=".8">المركز</text>`;
  s += speedDial(560, 400, v);
  if (osc) s += `<text x="560" y="1020" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="120" fill="#f4c76b" opacity="${ease(ramp(t, WS(9, 7), WS(9, 7) + .5))}">∞</text>`;
  F.ov = '';
  return s;
}
// 7b: arrival at the far rim: the head pops out and stops
function sceneRim(t) {
  const st = W(7, 9)[1] - .3, up = ease(ramp(t, st, W(7, 13)[1]));
  let s = `<defs><linearGradient id="skR2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2a5a"/><stop offset=".6" stop-color="#e88a5a"/><stop offset="1" stop-color="#f8c890"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR2)"/>`;
  s += `<rect y="640" width="720" height="640" fill="#7a6a5a"/><rect y="640" width="720" height="640" fill="#fff" filter="url(#grassT2)" opacity=".5"/><defs><filter id="grassT2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05 .3" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .15  0 0 0 0 .1  0 0 0 -1.5 .95"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`;
  s += shaft(360, 900, 240, 100, '#1a0a04');
  const hy = lerp(1060, 820, up);
  s += `<defs><clipPath id="rimC"><rect x="0" y="0" width="720" height="${hy > 900 ? 2000 : 2000}"/></clipPath></defs>` + person(360, hy + 160, { s: .9, face: 1, top: '#c8482a', pants: '#2a2e3a', skin: '#b07a55', hair: '#1d1612', lookUp: .3, t }) +
    `<path d="M120,900 A240,100 0 0 0 600,900 L600,1300 L120,1300Z" fill="#7a6a5a"/><path d="M120,900 A240,100 0 0 0 600,900" stroke="#e8c020" stroke-width="12" fill="none"/>`;
  s += speedDial(560, 400, 7.9 * (1 - up));
  F.ov = '';
  return s;
}
// 8: 42 minutes on a stopwatch
function sceneClock(t) {
  const st = S0(8) - .2, k = ease(ramp(t, st + .3, WS(8, 8) + .3)), mins = k * 42;
  let s = `<defs><radialGradient id="wF" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c8ccd4"/></radialGradient><linearGradient id="wB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8eaee"/><stop offset=".5" stop-color="#8a8e96"/><stop offset="1" stop-color="#3a3e46"/></linearGradient></defs>`;
  s += space(t, '#04060f', '#0e1232');
  s += `<g transform="translate(360,700)"><rect x="-34" y="-330" width="68" height="70" rx="12" fill="url(#wB)"/><circle r="290" fill="url(#wB)"/><circle r="262" fill="url(#wF)"/>`;
  for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283 - Math.PI / 2; s += `<line x1="${Math.cos(a) * (i % 5 ? 240 : 222)}" y1="${Math.sin(a) * (i % 5 ? 240 : 222)}" x2="${Math.cos(a) * 252}" y2="${Math.sin(a) * 252}" stroke="#1a1e26" stroke-width="${i % 5 ? 2 : 5}"/>`; }
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 - Math.PI / 2; s += `<text x="${Math.cos(a) * 190}" y="${Math.sin(a) * 190 + 12}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#1a1e26">${ar(i * 5)}</text>`; }
  const ma = mins / 60 * 6.283 - Math.PI / 2, sa = (mins * 60 % 60) / 60 * 6.283 - Math.PI / 2;
  s += `<path d="M0,0 L${Math.cos(-Math.PI / 2) * 230},${Math.sin(-Math.PI / 2) * 230} A230,230 0 ${mins > 30 ? 1 : 0} 1 ${Math.cos(ma) * 230},${Math.sin(ma) * 230}Z" fill="#f4c76b" opacity=".35"/>`;
  s += `<line x1="0" y1="0" x2="${Math.cos(ma) * 200}" y2="${Math.sin(ma) * 200}" stroke="#1a1e26" stroke-width="10" stroke-linecap="round"/><line x1="0" y1="30" x2="${Math.cos(sa) * 236}" y2="${Math.sin(sa) * 236}" stroke="#e53935" stroke-width="3"/><circle r="14" fill="#1a1e26"/><circle r="6" fill="#e53935"/>` +
    `<ellipse cx="-90" cy="-140" rx="120" ry="60" fill="#fff" opacity=".25" transform="rotate(-30,-90,-140)"/></g>`;
  F.ov = ''; F.mins = mins;
  return s;
}
// 10: CTA: looking up out of the shaft at a circle of sky with a question mark
function sceneCTA(t) {
  const st = S0(10), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = `<defs><radialGradient id="upG" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#9fcaf0"/><stop offset=".3" stop-color="#5a8ac8"/><stop offset=".34" stop-color="#3a3e46"/><stop offset=".6" stop-color="#14161a"/><stop offset="1" stop-color="#020203"/></radialGradient></defs><rect width="720" height="1280" fill="url(#upG)"/>`;
  for (let i = 0; i < 9; i++) { const r = 220 + i * 70; s += `<circle cx="360" cy="540" r="${r}" fill="none" stroke="#5a6068" stroke-width="${4 + i * 2}" opacity="${.5 - i * .04}"/>` + Array.from({ length: 10 }, (_, j) => { const a = j / 10 * 6.283 + i * .3; return `<circle cx="${360 + Math.cos(a) * r}" cy="${540 + Math.sin(a) * r}" r="${3 + i}" fill="#6ad0ff" opacity="${.7 - i * .06}"/>`; }).join(''); }
  s += `<g opacity="${k}"><text x="360" y="630" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="260" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.6))">؟</text></g>`;
  F.ov = `<g opacity="${ramp(t, WS(10, 4), WS(10, 4) + .4)}" transform="translate(360,${1020 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneLine }, { s: S0(2) - .2, f: sceneDrill }, { s: S0(3) - .2, f: sceneLayers }, { s: S0(5) - .2, f: sceneTube },
  { s: S0(6) - .2, f: sceneFall }, { s: W(7, 9)[1] - .3, f: sceneRim }, { s: S0(8) - .2, f: sceneClock }, { s: S0(9) - .2, f: sceneFall }, { s: S0(10) - .2, f: sceneCTA },
];
const XF = .5;

// ---------- UI ----------
const CHIPS = [
  ['c1', '١٢٬٧٠٠ كم', 560, 720, 'big', WS(1, 4), S0(2)],
  ['c2', '١٢ كم فقط', 360, 320, 'big red', WS(2, 9), S0(3)],
  ['c3', '', 140, 360, 'big', S0(3), S0(5) - .3], ['c4', 'الوشاح', 160, 470, 'dark', WS(3, 6), WS(4, 1)], ['c5', 'اللبّ', 360, 1040, 'dark', WS(4, 1), S0(5)], ['c6', '≈ سطح الشمس', 600, 560, '', WS(4, 11), S0(5)],
  ['c7', 'فراغ — بلا هواء', 360, 330, 'big', WS(5, 6), S0(6)],
  ['c8', '≈ ٨ كم في الثانية', 560, 600, 'big', WS(6, 7), W(7, 9)[1] - .3],
  ['c9', '٠ كم/ثانية', 360, 700, 'dark', W(7, 11)[1], S0(8)],
  ['c10', '', 360, 1110, 'big', WS(8, 4), S0(9)],
  ['c11', 'إلى الأبد', 560, 1120, 'dark', WS(9, 11), S0(10)],
  ['c12', '@MadhaLawLab', 360, 1120, 'dark', WS(10, 6), 999],
];
$('ui').innerHTML = CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  if (F.temp !== undefined) $('c3').textContent = ar(F.temp) + '°م';
  if (F.mins !== undefined) $('c10').textContent = ar(Math.floor(F.mins)) + ' دقيقة';
  $('note').style.opacity = 0;
}

