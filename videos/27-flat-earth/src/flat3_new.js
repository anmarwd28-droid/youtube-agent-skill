// ===================== "what if the Earth were flat?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
// deep space with the real Milky Way (Solar System Scope, CC BY 4.0)
const milky = (a = .85, x = -920, y = 0, w = 2560) => space(0, '#010208', '#04061a') + `<image href="tex/milky_way.jpg" x="${x}" y="${y}" width="${w}" height="${w / 2}" opacity="${a}" preserveAspectRatio="none"/>`;
// screen point of disc-local (u, v) for a disc at (cx, cy), radius R, tilted by tilt
const DP = (cx, cy, R, tilt, u, v) => [cx + R * u, cy + R * v * Math.cos(tilt)];
function arrow(x0, y0, x1, y1, a, col = '#f4c76b', w = 4) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, h = 12 + w * 2;
  return `<g opacity="${a.toFixed(2)}"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="#000" stroke-opacity=".5" stroke-width="${w + 4}" stroke-linecap="round"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${(x1 - ux * h - uy * h * .55).toFixed(1)},${(y1 - uy * h + ux * h * .55).toFixed(1)} L${(x1 - ux * h + uy * h * .55).toFixed(1)},${(y1 - uy * h - ux * h * .55).toFixed(1)}Z" fill="${col}" stroke="#000" stroke-opacity=".5" stroke-width="2"/></g>`;
}
const noEarth = () => { F.earth = null; F.moon = null; F.sun = null; };
// ---- three.js camera helpers (world units: disc radius 1) ----
const orbit = (d, el, az, tg = [0, .3, 0], fov = 30) => ({ pos: [tg[0] + d * Math.sin(az) * Math.cos(el), tg[1] + d * Math.sin(el), tg[2] + d * Math.cos(az) * Math.cos(el)], look: tg, fov });
const P3 = (u, v, z = .02) => [u, -v, z];   // a point in the disc's flat frame
// project a world point through a camera {pos, look, fov} to screen pixels (720x1280), to place 2D people on 3D ground
function proj3(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 640 / Math.tan(c.fov * Math.PI / 360);
  return [360 + dot(d, r) / z * fp, 640 - dot(d, u) / z * fp, fp / z]; }
const blank = () => `<rect width="720" height="1280" fill="#000"/>`;
// 0: the real globe flattens into a disc
function sceneHook(t) {
  const m = 1 - ease(ramp(t, WS(0, 3) - .1, WS(0, 6) + .3));
  F.w = { set: 'space', cam: orbit(9.4 - .6 * (1 - m), .5 + .12 * (1 - m), .2 + t * .03), L: [-.6, .9, .5], disc: { m, spin: .3 + t * .05, clouds: .7 } };
  F.ov = ''; return blank();
}
// 1: gravity pulls any Earth-sized body into a ball: inward 3D arrows, then the disc folds into a sphere
function sceneRound(t) {
  const ar = ease(ramp(t, WS(1, 4) - .2, WS(1, 5) + .3)), m = ease(ramp(t, WS(1, 9) - .3, WS(1, 14) + .4)), fa = ar * (1 - ease(ramp(t, WS(1, 9) - .3, WS(1, 9) + .3)));
  const arrows = Array.from({ length: 10 }, (_, i) => { const th = i / 10 * 6.283 + .2; return { from: P3(Math.sin(th) * 1.32, Math.cos(th) * 1.32, .04), to: P3(Math.sin(th) * 1.04, Math.cos(th) * 1.04, .04), a: fa }; });
  F.w = { set: 'space', cam: orbit(9.0, .62 - .2 * m, .25 + t * .03), L: [-.6, .9, .5], disc: { m, spin: .4 + t * .05, clouds: .7 }, arrows };
  F.ov = ''; return blank();
}
// 2: on a disc, gravity points to the centre of the disc, not straight down
function scenePull(t) {
  const ar = ease(ramp(t, WS(2, 7) - .2, WS(2, 10) + .3)), dn = ease(ramp(t, WS(2, 11) - .1, WS(2, 13) + .2));
  const pts = [[.85, .3], [.85, 1.9], [.85, 3.4], [.85, 4.9], [.55, 1.1], [.55, 4.3]], arrows = [];
  pts.forEach(([r, th], i) => { const a = ar * ease(ramp(t, WS(2, 7) + i * .12, WS(2, 7) + i * .12 + .4)); arrows.push({ from: P3(Math.sin(th) * r, Math.cos(th) * r, .05), to: P3(Math.sin(th) * r * .42, Math.cos(th) * r * .42, .05), a });
    arrows.push({ from: P3(Math.sin(th) * r, Math.cos(th) * r, .42), to: P3(Math.sin(th) * r, Math.cos(th) * r, .06), a: dn * .95, kind: 1 }); });
  F.w = { set: 'space', cam: orbit(8.4, .72, .9 + t * .02, [0, .2, 0]), L: [-.5, .9, .6], disc: { m: 0, spin: .9 + t * .02, clouds: .6 }, arrows };
  F.ov = ''; return blank();
}
// 3: away from the centre the ground tilts: a 3D street rolls, people climb, a ball rolls back
function sceneSlope(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 4) - .2, WS(3, 10) + .5)), ang = 13 * k, rad = ang * Math.PI / 180;
  const cam = { pos: [-1.2 + T * .12, 1.7, 11], look: [0, 4.2, -10], fov: 55 };
  F.w = { set: 'street', tilt: rad, ball: 2.6 - 5.5 * k * k - T * .15 * k, cam };
  const tiltP = (x, y, z) => { const dy = y - .15; return [x * Math.cos(rad) - dy * Math.sin(rad), .15 + x * Math.sin(rad) + dy * Math.cos(rad), z]; };
  const walk = (x0, c, sp, ph) => { const wx = x0 + T * sp * (1 - .55 * k), [x, y, fz] = proj3(cam, tiltP(wx, .15, -7.6)), sc = 1.75 / 316 * fz; return `<g transform="rotate(${(ang * .35).toFixed(2)},${x.toFixed(1)},${y.toFixed(1)})">` + castSh(x, y, sc) + onWalk(x, y, CROWD[c], sc, 1, t, { moving: 1, phase: t * (6 - 2.5 * k) + ph, amp: .7 + .15 * k }) + `</g>`; };
  let o = walk(-4.4, 0, .9, 0) + walk(-1.2, 2, .75, 1.3) + walk(2.4, 3, .65, 2.4);
  o += `<g transform="translate(150,520)" opacity="${ease(ramp(t, WS(3, 7) - .2, WS(3, 7) + .3)).toFixed(2)}"><rect x="-110" y="-70" width="220" height="130" rx="18" fill="#0a0e1c" opacity=".88"/><path d="M-80,30 L80,30" stroke="#8a93b8" stroke-width="3"/><path d="M-80,30 L${-80 + 160 * Math.cos(rad * 2)},${30 - 160 * Math.sin(rad * 2)}" stroke="#f4c76b" stroke-width="5" stroke-linecap="round"/>` + lbl(0, -36, 'ميلٌ يزداد', 1, '#cfd8ff', 20) + `</g>`;
  F.ov = o; return blank();
}
// 4: oceans and air slide to the middle: a vast central sea, dry airless rims
function sceneSea(t) {
  const sea = ease(ramp(t, WS(4, 0) - .2, WS(4, 8) + .4)), dry = ease(ramp(t, WS(4, 1), WS(4, 12) + .3));
  F.w = { set: 'space', cam: orbit(8.0, .66, 1.1 + t * .025, [0, .15, 0]), L: [-.5, .9, .5], disc: { m: 0, spin: 1.1 + t * .03, sea, dry, clouds: .65 * (1 - dry * .6) } };
  F.ov = ''; return blank();
}
// 5: when the Sun rises over the disc, the whole disc lights up at the same moment
function sceneDay(t) {
  const up = ease(ramp(t, WS(5, 8) - .2, WS(5, 12) + .3)), sp = [.55, lerp(-1.4, 1.25, up), -3.4];
  F.w = { set: 'space', cam: orbit(9.0, .36, .15 + (t - S0(5)) * .02, [0, .55, 0]), L: [sp[0], sp[1] + 1.2, sp[2]], sun: { pos: sp, r: .22, a: .3 + .7 * up }, disc: { m: 0, spin: 1.4 + t * .03, sunI: .04 + .96 * up, lights: 1 - up * .9, clouds: .6 } };
  F.ov = ''; return blank();
}
// 6: ships don't sink below the horizon: the 3D container ship only shrinks until haze hides it (the camera follows it)
function sceneShip(t) {
  const k = ease(ramp(t, WS(6, 1) - .4, WS(6, 10) + .4)), fog = ramp(t, WS(6, 7), WS(6, 10) + .4), hd = .72, yaw = Math.PI / 2 - hd, d = 5200 * Math.pow(k, 1.4);
  const sx = -90 + Math.sin(hd) * d, sz = -360 - Math.cos(hd) * d;
  F.w = { set: 'sea', ship: { x: sx, z: sz, yaw }, fog: .00004 + .0009 * fog, cam: { pos: [0, 7 + (t - S0(6)) * .08, 40], look: [sx * .92 + 25, 4, sz], fov: 36 } };
  F.ov = ''; return blank();
}
// 7: the edge: the camera flies off the rock plateau, past the rim, and looks down the cliff into space
function sceneEdge(t) {
  const st = S0(7) - .2, k = ease(clamp((t - st) / (S0(8) - st)));
  F.w = { set: 'edge', cam: { pos: [-16 + 62 * k, 3.4 + 5 * k, 16 + 14 * k], look: [lerp(4, -12, k), lerp(-4, -26, k), -36], fov: 55 } };
  F.ov = ''; return blank();
}
// 8: we know it's a ball: in every lunar eclipse Earth's shadow on the 8K Moon is round
function sceneEclipse(t) {
  const k = ease(ramp(t, WS(8, 3) - .3, WS(8, 11) + .4)), out = ease(ramp(t, WS(8, 10), WS(8, 12) + .2));
  F.w = { set: 'space', cam: { pos: [0, 0, 10.5], look: [0, -.25, 0], fov: 30 }, L: [.25, .15, 1], moon: { pos: [0, 0, 0], L: [.25, .15, 1], shC: [-3.75 + 1.75 * k, .15, 0], shR: 2.7, ring: .85 * out } };
  F.ov = ''; return blank();
}
// 9: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  F.w = { set: 'space', cam: orbit(9.6, .52, 2 + t * .04, [0, .1, 0]), L: [-.5, .9, .6], disc: { m: 0, spin: 2 + t * .08, clouds: .7 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7), WS(9, 7) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return blank();
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneRound }, { s: S0(2) - .2, f: scenePull }, { s: S0(3) - .2, f: sceneSlope }, { s: S0(4) - .2, f: sceneSea },
  { s: S0(5) - .2, f: sceneDay }, { s: S0(6) - .2, f: sceneShip }, { s: S0(7) - .2, f: sceneEdge }, { s: S0(8) - .2, f: sceneEclipse }, { s: S0(9) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneHook, sceneRound, scenePull, sceneSlope, sceneSea, sceneDay, sceneShip, sceneEdge, sceneEclipse]);
const XF = .5;
const TLI = [['جاذبيّة نحو المركز', S0(2)], ['أرضٌ مائلة', S0(3)], ['بحرٌ في الوسط', S0(4)], ['نهارٌ واحد', S0(5)]];
const LIST_ON = new Set([scenePull, sceneSlope, sceneSea, sceneDay]);
const CHIPS = [
  ['c1', 'الجاذبيّة تصنعُ الكُرات', 360, 330, 'big', WS(1, 12), S0(2) - .3],
  ['c2', 'نحوَ المركز', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c3', 'نهارٌ واحدٌ للجميع', 360, 330, 'big', WS(5, 11), S0(6) - .3],
  ['c4', 'ظلٌّ دائريٌّ دائماً', 360, 330, 'big', WS(8, 11), S0(9) - .3],
  ['c5', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">أرضٌ مسطّحة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
