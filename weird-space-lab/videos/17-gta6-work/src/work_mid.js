// ===================== Weird Space Lab: how long you'd work on minimum wage to buy GTA 6 ($79.99) =====================
// no game art or logos: real 3D Earth, flags, our own UI. Hours = 79.99 USD at mid-Nov 2026 rates / national minimum wage
const D2R = Math.PI / 180;
const rotFor = (lon, t) => -(lon + 90) * D2R - t * .03;
function proj(lat, lon, e, t) {
  const u = (lon + 180) / 360, la = lat * D2R;
  let x = -Math.cos(2 * Math.PI * u) * Math.cos(la), y = Math.sin(la), z = Math.sin(2 * Math.PI * u) * Math.cos(la);
  const ry = (e.rot ?? .6) + t * .03, rx = e.tx ?? 0, rz = e.tilt ?? .41;
  [x, z] = [x * Math.cos(ry) + z * Math.sin(ry), -x * Math.sin(ry) + z * Math.cos(ry)];
  [y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
  [x, y] = [x * Math.cos(rz) - y * Math.sin(rz), x * Math.sin(rz) + y * Math.cos(rz)];
  return { x: e.x + e.r * x, y: e.y - e.r * y, vis: z > .05 };
}
// flags, 90 x 60
const FLAG = {
  DE: () => `<rect width="90" height="20" fill="#000"/><rect y="20" width="90" height="20" fill="#dd0000"/><rect y="40" width="90" height="20" fill="#ffce00"/>`,
  UK: () => `<rect width="90" height="60" fill="#012169"/><path d="M0,0 L90,60 M90,0 L0,60" stroke="#fff" stroke-width="12"/><path d="M0,0 L90,60 M90,0 L0,60" stroke="#c8102e" stroke-width="4"/><path d="M45,0 V60 M0,30 H90" stroke="#fff" stroke-width="18"/><path d="M45,0 V60 M0,30 H90" stroke="#c8102e" stroke-width="10"/>`,
  US: () => Array.from({ length: 13 }, (_, i) => `<rect y="${i * 60 / 13}" width="90" height="${60 / 13}" fill="${i % 2 ? '#fff' : '#b22234'}"/>`).join('') + `<rect width="38" height="${7 * 60 / 13}" fill="#3c3b6e"/>` +
    Array.from({ length: 20 }, (_, i) => `<circle cx="${4 + (i % 5) * 7.5}" cy="${4 + Math.floor(i / 5) * 7.6}" r="1.4" fill="#fff"/>`).join(''),
  BR: () => `<rect width="90" height="60" fill="#009c3b"/><path d="M45,6 L84,30 L45,54 L6,30Z" fill="#ffdf00"/><circle cx="45" cy="30" r="13" fill="#002776"/><path d="M33,27 Q45,24 57,32" stroke="#fff" stroke-width="2.5" fill="none"/>`,
  EG: () => `<rect width="90" height="20" fill="#ce1126"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#000"/><path d="M45,23 l5,6 l-5,8 l-5,-8Z" fill="#c09300"/>`,
  NG: () => `<rect width="30" height="60" fill="#008751"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#008751"/>`,
};
const flag = (k, x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-2" y="-2" width="94" height="64" rx="4" fill="#000" opacity=".4"/><g>${FLAG[k]()}</g><rect width="90" height="60" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/></g>`;
// hours of minimum-wage work for $79.99, and how to say it
const C = {
  DE: { n: 'Germany', h: 5.2, lat: 51, lon: 10, sub: '≈ 5 hours' },
  UK: { n: 'United Kingdom', h: 4.8, lat: 54, lon: -2, sub: '≈ 5 hours' },
  US: { n: 'United States', h: 11, lat: 39, lon: -98, sub: '≈ 11 hours' },
  BR: { n: 'Brazil', h: 62, lat: -10, lon: -52, sub: '≈ 8 work days' },
  EG: { n: 'Egypt', h: 128, lat: 26.8, lon: 30.8, sub: '≈ 16 work days' },
  NG: { n: 'Nigeria', h: 267, lat: 9, lon: 8, sub: '≈ 1.5 months' },
};
const HMAX = 267, BW = 470;
// one country row: flag, name, a bar in hours on a shared scale, the hours count and the plain-language length
function row(k, x, y, q, o = {}) {
  const c = C[k], w = Math.max(6, BW * c.h / HMAX * q), col = c.h > 100 ? '#e53935' : c.h > 20 ? '#ff9a3c' : '#4fc36a';
  return flag(k, x, y, o.fs || .8) + EN(c.n, x + 86, y + 18, o.ns || 24, '#fff', 'start', 800) +
    `<rect x="${x + 86}" y="${y + 30}" width="${BW}" height="18" rx="9" fill="rgba(255,255,255,.1)"/><rect x="${x + 86}" y="${y + 30}" width="${w}" height="18" rx="9" fill="${col}"/>` +
    EN(`${Math.round(c.h * q)} h`, x + 86 + BW, y + 18, 24, col, 'end', 800) + (o.sub !== false ? `<g opacity="${ramp(q, .8, 1)}">` + EN(c.sub, x + 86, y + 78, 22, 'rgba(255,255,255,.8)', 'start', 700) + `</g>` : '');
}
const earthAt = (t, lat, lon, o = {}) => { const e = { x: 360, y: o.y ?? 760, r: o.r ?? 360, a: o.a ?? 1, sunI: 1, lights: .15, rot: rotFor(lon, t), tx: lat * D2R * .9, tilt: 0 }; F.earth = e; F.light = [-300, 200]; F.moon = null; return e; };
// 0: Germany five hours vs Nigeria a month and a half
function sceneHook(t) {
  earthAt(t, 30, 9, { a: 1, y: 1300, r: 520 });
  const a = ease(ramp(t, WS(0, 5), WS(0, 9))), b = ease(ramp(t, WS(0, 11), WS(0, 17) + .3));
  F.ov = `<rect x="30" y="430" width="660" height="330" rx="24" fill="rgba(6,10,26,.82)"/>` + row('DE', 60, 470, a) + `<g opacity="${ramp(t, WS(0, 10), WS(0, 11))}">` + row('NG', 60, 620, b) + `</g>` +
    EN('$79.99 = how many hours of work?', 360, 720, 22, '#f4c76b', 'middle', 700);
  F.flash = 0; return space(t, '#02040c', '#060a1e');
}
// 1: the price, and a worker on minimum wage
function scenePrice(t) {
  const k = ease(ramp(t, WS(1, 2), WS(1, 4))), w = ease(ramp(t, WS(1, 10), WS(1, 13)));
  let s = wStreet(t, { id: 'p1' }) + castSh(300, 1094, .56) + onWalk(300, 1094, CROWD[1], .56, 1, t, { lookUp: .4 });
  F.ov = `<g opacity="${k}" transform="translate(470,620) rotate(-6)"><path d="M-130,-70 L120,-70 L170,0 L120,70 L-130,70Z" fill="#f4c76b"/><circle cx="130" cy="0" r="12" fill="#1a1a1a"/>` + EN('$79.99', -30, 26, 70, '#1a1a1a', 'middle', 800) + `</g>` +
    `<g opacity="${w}"><rect x="40" y="440" width="300" height="80" rx="16" fill="rgba(8,12,30,.85)"/>` + EN('minimum wage', 190, 492, 28, '#fff', 'middle', 800) + `</g>`;
  F.flash = 0; return s;
}
// 2–6: the Earth turns to each country; the row fills in
function countryScene(t, keys, line, iTxt) {
  const st = S0(line) - .2, k0 = keys[0], c = C[k0], prev = PREV[line];
  const m = ease(ramp(t, st, st + 1.1)), lat = lerp(prev[0], c.lat, m), lon = lerp(prev[1], c.lon, m);
  const e = earthAt(t, lat, lon, { y: 700, r: 330 });
  let pins = ''; keys.forEach(kk => { const p = proj(C[kk].lat, C[kk].lon, e, t); if (p.vis) pins += `<circle cx="${p.x}" cy="${p.y}" r="26" fill="#f4c76b" opacity=".25"/><circle cx="${p.x}" cy="${p.y}" r="9" fill="#f4c76b" stroke="#fff" stroke-width="3"/>`; });
  const q = ease(ramp(t, WS(line, iTxt) - .3, WS(line, iTxt) + 1.2));
  F.ov = pins + `<rect x="30" y="${keys.length > 1 ? 1010 : 1060}" width="660" height="${keys.length > 1 ? 250 : 160}" rx="24" fill="rgba(6,10,26,.85)"/>` +
    keys.map((kk, i) => row(kk, 60, (keys.length > 1 ? 1040 : 1090) + i * 110, q, { sub: keys.length === 1 })).join('') + (keys.length > 1 ? `<g opacity="${ramp(q, .8, 1)}">` + EN('≈ 5 hours each', 360, 1250, 22, 'rgba(255,255,255,.8)', 'middle', 700) + `</g>` : '');
  F.flash = 0; return space(t, '#02040c', '#060a1e');
}
const PREV = { 2: [20, 40], 3: [52, 4], 4: [39, -98], 5: [-10, -52], 6: [26.8, 30.8] };
const sceneDEUK = t => countryScene(t, ['DE', 'UK'], 2, 5), sceneUS = t => countryScene(t, ['US'], 3, 9), sceneBR = t => countryScene(t, ['BR'], 4, 3),
  sceneEG = t => countryScene(t, ['EG'], 5, 3), sceneNG = t => countryScene(t, ['NG'], 6, 3);
// 7: the full leaderboard
function sceneBoard(t) {
  const st = S0(7) - .2; F.earth = null; F.moon = null;
  F.ov = `<rect x="30" y="420" width="660" height="760" rx="24" fill="rgba(6,10,26,.88)"/>` + EN('HOURS OF MINIMUM-WAGE WORK FOR GTA 6', 360, 470, 20, 'rgba(255,255,255,.6)', 'middle', 700, 'letter-spacing="1.5"') +
    ['UK', 'DE', 'US', 'BR', 'EG', 'NG'].map((k, i) => row(k, 60, 510 + i * 108, ease(ramp(t, st + i * .25, st + i * .25 + .8)), { sub: false })).join('') +
    EN('$79.99 at mid-Nov 2026 exchange rates · local store prices vary', 360, 1160, 16, 'rgba(255,255,255,.5)', 'middle', 500);
  F.flash = 0; return space(t, '#02040c', '#060a1e');
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(8, 0), WS(8, 10)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePrice }, { s: S0(2) - .2, f: sceneDEUK }, { s: S0(3) - .2, f: sceneUS }, { s: S0(4) - .2, f: sceneBR },
  { s: S0(5) - .2, f: sceneEG }, { s: S0(6) - .2, f: sceneNG }, { s: S0(7) - .2, f: sceneBoard }, { s: S0(8) - .2, f: sceneEnd },
];
const XF = .4;
const TLI = [['Germany · UK', S0(2)], ['USA', S0(3)], ['Brazil', S0(4)], ['Egypt', S0(5)], ['Nigeria', S0(6)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'Less than one work day', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c2', '$7.25 an hour', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c3', 'More than half a month', 360, 330, 'red', WS(5, 7), S0(6) - .3],
  ['c4', 'For ONE game', 360, 330, 'red', WS(6, 11), S0(7) - .3],
  ['c5', 'Weird Space Lab', 360, 1200, 'dark', WS(8, 10), 999],
];
setupUI('HOURS OF WORK', TLI, CHIPS);
