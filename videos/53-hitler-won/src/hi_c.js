// hi_c.js: scenes 9-12 (fission found in Berlin in 1938, Einstein and Meitner forced to leave, the scientists who fled build the bomb, the end), scene list, chips, UI
const HIDEF3 = `<linearGradient id="labW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3a36"/><stop offset="1" stop-color="#1a2220"/></linearGradient>` +
  `<linearGradient id="woodT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a34"/><stop offset=".15" stop-color="#6a4226"/><stop offset="1" stop-color="#3a2414"/></linearGradient>` +
  `<radialGradient id="lampL" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#ffe0a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffb060" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="harS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a6e"/><stop offset=".55" stop-color="#9a8aa0"/><stop offset=".85" stop-color="#e8b08a"/><stop offset="1" stop-color="#f4c89a"/></linearGradient>` +
  `<linearGradient id="seaD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7890"/><stop offset="1" stop-color="#2a3448"/></linearGradient>` +
  `<radialGradient id="flashG"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".3" stop-color="#fff2b0" stop-opacity=".7"/><stop offset="1" stop-color="#ffb040" stop-opacity="0"/></radialGradient>`;
const HIDEFS3 = () => HIDEFS2() + HIDEF3;

// ---------- 9: the twist: nuclear fission was discovered in Berlin itself, in 1938 ----------
function hahnTable(y) {
  let s = `<rect x="-20" y="${y}" width="760" height="26" fill="#9a6a3e"/><rect x="-20" y="${y + 26}" width="760" height="400" fill="url(#woodT)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M-20,${y + 40 + i * 30} q380,${(i % 2 ? 6 : -6)} 760,0" stroke="#2a180c" stroke-width="2" fill="none" opacity=".35"/>`).join('');
  s += `<rect x="60" y="${y - 120}" width="150" height="120" rx="6" fill="#2a2e2a"/><rect x="72" y="${y - 108}" width="126" height="40" fill="#1a1c1a"/><circle cx="96" cy="${y - 40}" r="14" fill="#4a4e48"/><circle cx="96" cy="${y - 40}" r="5" fill="#c8a868"/><circle cx="140" cy="${y - 40}" r="14" fill="#4a4e48"/><circle cx="180" cy="${y - 40}" r="10" fill="#b83a2a"/><path d="M84,${y - 88} q40,-14 100,0" stroke="#f4e0a0" stroke-width="2" fill="none"/>`;
  s += `<rect x="250" y="${y - 70}" width="60" height="70" fill="#5a3a24"/><rect x="316" y="${y - 70}" width="60" height="70" fill="#5a3a24"/><rect x="250" y="${y - 70}" width="126" height="10" fill="#7a5234"/>` + [264, 296, 330, 362].map(x => `<rect x="${x - 6}" y="${y - 86}" width="12" height="18" fill="#2a2a2e"/>`).join('');
  s += `<rect x="410" y="${y - 30}" width="120" height="30" fill="#f2eee4"/><rect x="410" y="${y - 30}" width="120" height="8" fill="#fff" opacity=".6"/><rect x="440" y="${y - 160}" width="22" height="130" rx="10" fill="#c8d8e0" opacity=".7"/><rect x="444" y="${y - 150}" width="6" height="110" fill="#fff" opacity=".6"/><path d="M451,${y - 160} q0,-60 -120,-60 q-120,0 -190,30" stroke="#8a3a2a" stroke-width="3" fill="none"/>`;
  s += `<rect x="560" y="${y - 140}" width="110" height="140" rx="6" fill="#3a3e44"/><circle cx="615" cy="${y - 90}" r="34" fill="#e8e4d8"/><path d="M615,${y - 90} L640,${y - 108}" stroke="#1a1a1a" stroke-width="3"/><rect x="580" y="${y - 40}" width="70" height="20" fill="#1a1c20"/>`;
  return s; }
const NUC = (() => { const r = RS(235), o = []; for (let i = 0; i < 64; i++) { const a = i * 2.39996, d = Math.sqrt(i / 64) * 108; o.push([Math.cos(a) * d + (r() - .5) * 6, Math.sin(a) * d + (r() - .5) * 6, r() < .4 ? 'p' : 'n']); } return o.sort((p, q) => p[1] - q[1]); })();
function nucleus(x, y, k, t) {
  let s = ''; const sp = ease(k), shake = k <= 0 ? Math.sin(t * 50) * 2 * ramp(t, WS(9, 1) - .4, WS(9, 1) + .1) : 0;
  NUC.forEach(([dx, dy, q], i) => { const side = dx + dy * .3 > 0 ? 1 : -1, ox = side * sp * 170, oy = side * sp * -40, wob = (1 - sp) * 0 + Math.sin(i) * 3 * sp;
    s += `<circle cx="${(x + dx * (1 - .15 * sp) + ox + shake).toFixed(1)}" cy="${(y + dy * (1 - .15 * sp) + oy + wob).toFixed(1)}" r="16" fill="url(#${q}G)"/>`; });
  if (k > 0) { [[-.3, 1], [1.6, 1.1], [3.4, .9]].forEach(([a, v], i) => { const d = 60 + sp * 420 * v; s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="14" fill="url(#nG)"/><path d="M${(x + Math.cos(a) * (d - 60)).toFixed(1)},${(y + Math.sin(a) * (d - 60)).toFixed(1)} L${(x + Math.cos(a) * (d - 18)).toFixed(1)},${(y + Math.sin(a) * (d - 18)).toFixed(1)}" stroke="#cfe0ff" stroke-width="3" opacity=".6" stroke-linecap="round"/>`; });
    const fl = 1 - ramp(k, 0, .5); if (fl > 0) s = `<circle cx="${x}" cy="${y}" r="${(120 + 300 * k).toFixed(1)}" fill="url(#flashG)" opacity="${fl.toFixed(2)}"/>` + s; }
  return s; }
function sceneFission(t) {
  const t0 = S0(9) - .2, T = t - t0, nk = ease(ramp(t, WS(9, 1) - .5, WS(9, 1))) * (1 - ease(ramp(t, WS(9, 4) - .1, WS(9, 4) + .3))), sp = ramp(t, WS(9, 1) + .3, WS(9, 3) + .2);
  let s = `<defs>${HIDEFS3()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#labW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  s += `<rect x="440" y="420" width="240" height="330" fill="#121a2e"/><rect x="440" y="420" width="240" height="330" fill="none" stroke="#5a4a36" stroke-width="14"/><path d="M560,420 V750 M440,585 H680" stroke="#5a4a36" stroke-width="8"/>`;
  s += `<path d="M446,740 L446,660 L480,640 L520,660 L520,620 L556,600 L560,740Z M564,740 L564,640 L600,612 L640,640 L640,600 L676,620 L676,740Z" fill="#0a0e18"/>` + [[470, 690], [600, 670], [650, 700]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="12" fill="#f4c76b" opacity=".7"/>`).join('');
  s += `<path d="M120,-20 L120,330" stroke="#1a1a1a" stroke-width="3"/><path d="M80,330 L160,330 L140,300 L100,300Z" fill="#2a3a30"/><path d="M100,330 L140,330 L420,1000 L-180,1000Z" fill="#ffe0a0" opacity=".1" filter="url(#blur9)"/><ellipse cx="120" cy="990" rx="300" ry="40" fill="#ffd090" opacity=".12" filter="url(#blur9)"/>`;
  s += hahnTable(980) + lbl(360, 1210, 'مختبرُ أوتو هان — برلين', ease(ramp(t, WS(9, 4), WS(9, 5))), '#f4e0c0', 28);
  if (nk > 0) { s += `<rect x="-20" y="-20" width="760" height="1320" fill="#05070e" opacity="${(.82 * nk).toFixed(2)}"/><g opacity="${nk.toFixed(2)}">${nucleus(360, 760, sp, t)}` +
      lbl(360, 960, 'نواةُ يورانيوم', 1 - ramp(t, WS(9, 1) + .3, WS(9, 1) + .6), '#cfd6e0', 30) + lbl(360, 1060, 'انشطار!', ease(ramp(t, WS(9, 1) + .5, WS(9, 2) + .2)), '#f4c76b', 44) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: Hitler's laws forced many of the top scientists to leave: Einstein, Lise Meitner ----------
function einstein(x, y, o = {}) {
  const c = Object.assign({ top: '#5a5c62', pants: '#3a3c42', skin: '#eac8aa', hair: '#e8e8ea', shade: 1 }, o), s = o.s || 1, f = o.face || 1;
  const body = hero(x, y, c), [hx, hy] = HP.head, P = (lx, ly) => `${(hx + lx * f * s).toFixed(1)},${(hy + ly * s).toFixed(1)}`;
  let w = ''; [[-22, -18, 13], [-10, -28, 12], [6, -30, 11], [18, -20, 9], [-26, -2, 11], [-24, 12, 8], [-14, -20, 10]].forEach(([dx, dy, r]) => w += `<circle cx="${P(dx, dy).split(',')[0]}" cy="${P(dx, dy).split(',')[1]}" r="${(r * s).toFixed(1)}" fill="#f2f2f4"/>`);
  w += `<path d="M${P(-30, -6)} q${-6 * f * s},${-10 * s} ${-2 * f * s},${-20 * s} M${P(-6, -38)} q${4 * f * s},${-8 * s} ${10 * f * s},${-6 * s}" stroke="#d8d8dc" stroke-width="${(2.4 * s).toFixed(1)}" fill="none"/>`;
  const mu = `<path d="M${P(8, 10)} q${6 * f * s},${-4 * s} ${14 * f * s},${0} q${-6 * f * s},${6 * s} ${-14 * f * s},${0}Z" fill="#c8c8cc"/>`;
  const HH = Object.assign({}, HP); return w + body + mu + ((HP = HH), '');
}
function meitner(x, y, o = {}) {
  const c = Object.assign({ top: '#3a3448', pants: '#2a2632', skin: '#ecc8a8', hair: '#4a3a30', shade: 1 }, o), s = o.s || 1, f = o.face || 1;
  const body = hero(x, y, c), H = Object.assign({}, HP), [hx, hy] = H.head, px = (H.hip[0] - x) / (f * s), py = (H.hip[1] - y) / s;
  const bun = `<circle cx="${(hx - 24 * f * s).toFixed(1)}" cy="${(hy - 4 * s).toFixed(1)}" r="${(12 * s).toFixed(1)}" fill="${c.hair}"/><path d="M${(hx - 26 * f * s).toFixed(1)},${(hy - 12 * s).toFixed(1)} q${4 * f * s},${-4 * s} ${10 * f * s},${-2 * s}" stroke="#7a6252" stroke-width="${(1.6 * s).toFixed(1)}" fill="none"/>`;
  const sk = `<path d="M${(px - 26).toFixed(1)},${(py - 6).toFixed(1)} L${(px + 26).toFixed(1)},${(py - 6).toFixed(1)} L${(px + 44).toFixed(1)},${(py + 112).toFixed(1)} Q${px.toFixed(1)},${(py + 120).toFixed(1)} ${(px - 44).toFixed(1)},${(py + 112).toFixed(1)}Z" fill="${mix(c.top, '#000000', .1)}"/><path d="M${(px + 4).toFixed(1)},${py.toFixed(1)} L${(px + 12).toFixed(1)},${(py + 114).toFixed(1)} M${(px - 14).toFixed(1)},${(py + 4).toFixed(1)} L${(px - 26).toFixed(1)},${(py + 112).toFixed(1)}" stroke="#000" stroke-width="2" opacity=".22"/>`;
  const k = body.lastIndexOf('<g transform="rotate('), b2 = k > 0 ? body.slice(0, k) + sk + body.slice(k) : body + sk;
  HP = H; return b2 + bun;
}
const suitcase = (H, s, col = '#5a3a24') => `<rect x="${(H[0] - 22 * s).toFixed(1)}" y="${(H[1] - 4 * s).toFixed(1)}" width="${(44 * s).toFixed(1)}" height="${(34 * s).toFixed(1)}" rx="${(4 * s).toFixed(1)}" fill="${col}"/><rect x="${(H[0] - 22 * s).toFixed(1)}" y="${(H[1] + 12 * s).toFixed(1)}" width="${(44 * s).toFixed(1)}" height="${(3 * s).toFixed(1)}" fill="#2a1a10"/><path d="M${(H[0] - 6 * s).toFixed(1)},${(H[1] - 4 * s).toFixed(1)} q${6 * s},${-7 * s} ${12 * s},0" stroke="#2a1a10" stroke-width="${(2.4 * s).toFixed(1)}" fill="none"/>`;
function liner(x, y, s) {
  let g = `<path d="M-420,-60 L420,-60 L380,40 L-400,40Z" fill="#141418"/><path d="M-410,-34 L410,-34" stroke="#c8302a" stroke-width="10"/><path d="M-420,-60 L420,-60 L414,-48 L-416,-48Z" fill="#f2f0ea"/>`;
  g += `<rect x="-330" y="-130" width="560" height="70" fill="#f2f0ea"/><rect x="-280" y="-180" width="420" height="50" fill="#e8e6e0"/>` + Array.from({ length: 26 }, (_, i) => `<circle cx="${-316 + i * 21}" cy="-96" r="5" fill="#f4c76b" opacity=".8"/>`).join('') + Array.from({ length: 18 }, (_, i) => `<rect x="${-266 + i * 22}" y="-166" width="12" height="16" fill="#f4c76b" opacity=".6"/>`).join('');
  [-180, -40, 100].forEach(fx => g += `<path d="M${fx - 30},-180 L${fx - 24},-300 L${fx + 30},-300 L${fx + 36},-180Z" fill="#c8302a"/><rect x="${fx - 25}" y="-300" width="56" height="26" fill="#141418"/>`);
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`; }
function sceneLeave(t) {
  const t0 = S0(10) - .2, T = t - t0;
  let s = `<defs>${HIDEFS3()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#harS)"/><circle cx="560" cy="820" r="320" fill="url(#sunW)" opacity=".6"/>` + cumulus(200 + T * 3, 360, 300, 6, { a: .6 });
  s += `<rect x="-20" y="820" width="760" height="200" fill="url(#seaD)"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${-20 + ((i * 97 + T * 14) % 760)},${840 + i * 20} h${60 + i * 6}" stroke="#ffd8b0" stroke-width="2" opacity=".35"/>`).join('');
  s += liner(250, 880, .78);
  s += `<path d="M150,836 L360,936 L360,946 L150,846Z" fill="#4a3e34"/><path d="M150,812 L360,912 M150,812 L150,840 M220,845 L220,873 M290,878 L290,906 M360,912 L360,940" stroke="#d8d2c8" stroke-width="3"/>`;
  s += `<rect x="-20" y="930" width="760" height="370" fill="#6a645c"/><rect x="-20" y="930" width="760" height="18" fill="#8a847a"/><rect x="-20" y="930" width="760" height="370" fill="#000" filter="url(#grainR)" opacity=".22"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${990 + i * 54} H740" stroke="#4a443e" stroke-width="2" opacity=".5"/>`).join('');
  [[60, 940], [690, 940]].forEach(([x, y]) => s += `<rect x="${x - 14}" y="${y - 26}" width="28" height="30" rx="6" fill="#2a2624"/>`);
  const w1 = 560 - T * 30, w2 = 680 - T * 30, s1 = .82, s2 = .78, ea = ease(ramp(t, WS(10, 11) - .4, WS(10, 11))), ma = ease(ramp(t, WS(10, 12) - .3, WS(10, 12) + .1));
  let p = einstein(w1, 1130, { s: s1, face: -1, walk: w1 / (30 * s1) }); p += suitcase(HP.handB, s1); s += p;
  let q = meitner(w2, 1150, { s: s2, face: -1, walk: w2 / (30 * s2) + 1 }); q += suitcase(HP.handB, s2, '#3a4a5a'); s += q;
  s += `<g opacity="${ea.toFixed(2)}">${panel(w1 - 160, 640, 200, 84, 1)}${lbl(w1 - 60, 676, 'أينشتاين', 1, '#f4c76b', 30)}${lbl(w1 - 60, 708, 'غادرَ عام ١٩٣٣', 1, '#cfd6e0', 20)}</g>`;
  s += `<g opacity="${ma.toFixed(2)}">${panel(Math.min(w2 - 40, 510), 750, 200, 84, 1)}${lbl(Math.min(w2 - 40, 510) + 100, 786, 'ليزه مايتنر', 1, '#f4c76b', 30)}${lbl(Math.min(w2 - 40, 510) + 100, 818, 'هربت عام ١٩٣٨', 1, '#cfd6e0', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 11: his enemies built the bomb with the help of scientists who had fled him ----------
function sceneFled(t) {
  const t0 = S0(11) - .2, T = t - t0;
  const G = gAt(t, 360, 760, { d: 6.2, el: .72, lon: -66 + T * .5, clouds: .3, lights: .3, off: -.9 });
  const LA = [35.9, -106.3], SC = [[[41.9, 12.5], 'فيرمي', WS(11, 0)], [[47.5, 19.0], 'سيلارد', WS(11, 1)], [[48.5, 9.05], 'بيته', WS(11, 2)], [[48.2, 16.4], 'فريش', WS(11, 3)]];
  let o = `<defs>${HIDEFS3()}</defs>`;
  SC.forEach(([A, nm, ts], i) => { const k = ease(ramp(t, ts - .2, ts + 1.4)); o += flight(G, A, LA, k, 1); });
  SC.forEach(([A, nm, ts], i) => { o += pin(G, A[0] + [-5, 3.5, 5.5, -2.5][i], A[1] + [-3, 11, -9, 12][i], nm, ease(ramp(t, ts - .2, ts + .2)), '#fff', 24); });
  o += pin(G, LA[0] - 4, LA[1] + 15, 'لوس ألاموس', ease(ramp(t, WS(11, 4) - .2, WS(11, 4) + .2)), '#f4c76b', 28);
  F.ov = o; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 0 - (t - S0(12)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 10) - .3, WS(12, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneEurope }, { s: S0(2) - .2, f: sceneStalingrad }, { s: S0(3) - .2, f: sceneMemorial }, { s: S0(4) - .2, f: sceneUN }, { s: S0(5) - .2, f: sceneV2 },
  { s: S0(6) - .2, f: sceneSaturn }, { s: S0(7) - .2, f: sceneWeapons }, { s: S0(8) - .2, f: sceneManhattan }, { s: S0(9) - .2, f: sceneFission }, { s: S0(10) - .2, f: sceneLeave }, { s: S0(11) - .2, f: sceneFled }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneEurope, sceneSaturn, sceneWeapons, sceneFled]);
const XF = .5;
const TLI = [['الإبادة', S0(3)], ['بلا أممٍ متّحدة', S0(4)], ['صواريخُ حرب', S0(7)], ['القنبلة', S0(8)]];
const LIST_ON = new Set([sceneUN, sceneWeapons, sceneManhattan]);
const CHIPS = [
  ['c1', 'عام ١٩٤٢', 360, 330, 'big', WS(1, 0), S0(2) - .3],
  ['c2', 'ستالينغراد ١٩٤٣', 360, 330, 'red big', WS(2, 2), S0(3) - .3],
  ['c3', '٦ ملايين يهوديّ', 360, 330, 'red big', WS(3, 7), WS(3, 12) - .1],
  ['c3b', 'تهجيرُ عشراتِ الملايين', 360, 330, 'red big', WS(3, 12), S0(4) - .3],
  ['c4', 'لا أممَ متّحدة', 360, 330, 'red big', WS(4, 2), S0(5) - .3],
  ['c5', '١٧٦ كم — ١٩٤٤', 360, 330, 'big', WS(5, 8), S0(6) - .3],
  ['c6', 'ساتورن ٥ — ١٩٦٩', 360, 330, 'big', WS(6, 12), S0(7) - .3],
  ['c7', 'أسلحةٌ فقط؟', 360, 330, 'red big', WS(7, 6), S0(8) - .3],
  ['c8', 'مشروع مانهاتن ١٩٤٢', 360, 330, 'big', WS(8, 3), S0(9) - .3],
  ['c9', 'والمفاجأة؟', 360, 330, 'big', S0(9), WS(9, 5) - .1],
  ['c9b', 'برلين ١٩٣٨', 360, 330, 'big', WS(9, 5), S0(10) - .3],
  ['c10', 'أُجبِروا على الرحيل', 360, 330, 'red big', WS(10, 3), S0(11) - .3],
  ['c11', 'علماءُ هربوا منه', 360, 330, 'big', WS(11, 4), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">لو انتصرَ هتلر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
