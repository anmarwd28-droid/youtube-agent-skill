// nt_a.js (#68): what if people never got tired? A stadium track, runners, a building site, a marathon road, day and night + scenes 0-4
const NTL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arN2 = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// a running person: fast stride, forward lean
const runner = (x, y, s, f, ph, pi, o = {}) => hero(x, y, Object.assign({ s, face: f, shade: 1, walk: ph, amp: .95, lean: 9, aF: undefined }, gp(pi), o));
// the stadium: stands full of people, a red track with white lanes, the infield grass; N = night (floodlights)
function stadium(t, N = 0, o = {}) {
  const sky = [mix('#4a86c6', '#08102a', N), mix('#a8cce8', '#1a2a50', N)];
  let s = `<linearGradient id="stS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#stS)"/>`;
  if (N < .9) s += cumulus(200 + t * 2, 470, 240, 7, { a: .7 * (1 - N) });
  // floodlight towers
  [[60, 420], [660, 420]].forEach(([x, y]) => { s += `<path d="M${x},${y + 30} L${x - 10},800 M${x},${y + 30} L${x + 10},800" stroke="#7a828c" stroke-width="6"/><rect x="${x - 40}" y="${y}" width="80" height="34" fill="#3a4048"/>` + [0, 1, 2, 3].map(i => `<rect x="${x - 34 + i * 18}" y="${y + 6}" width="14" height="22" fill="${N > .3 ? '#fff8e0' : '#c8d0d8'}"/>`).join('') + (N > .3 ? scr(`<circle cx="${x}" cy="${y + 16}" r="120" fill="url(#lampG)" opacity="${(N * .9).toFixed(2)}"/>`) : ''); });
  // the stands: tiers with a dotted crowd
  s += `<path d="M-20,640 L740,640 L740,860 L-20,860Z" fill="${mix('#5a6270', '#1a1e28', N * .6)}"/>`;
  const r = RS(11); for (let row = 0; row < 7; row++) { const y = 660 + row * 30; s += `<rect x="-20" y="${y + 18}" width="760" height="6" fill="#000" opacity=".2"/>`; for (let i = 0; i < 52; i++) { const x = i * 15 - 10 + (row % 2) * 7, c = ['#e85a4a', '#4a8ad8', '#f4f4f0', '#f4c040', '#3a3a40', '#6ac08a'][Math.floor(r() * 6)]; s += `<circle cx="${x}" cy="${y + Math.sin(t * 3 + i) * .8}" r="5" fill="${mix(c, '#000', N * .5)}"/><rect x="${x - 5}" y="${y + 4}" width="10" height="12" fill="${mix(c, '#000', .3 + N * .4)}"/>`; } }
  s += `<rect x="-20" y="860" width="760" height="20" fill="#2a2e36"/>`;
  // the track (seen from the side, slightly from above): eight lanes
  s += `<rect x="-20" y="880" width="760" height="300" fill="#b8483a"/><rect x="-20" y="880" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let i = 0; i <= 8; i++) { const y = 880 + i * 37.5; s += `<path d="M-20,${y} H740" stroke="#f4f0e8" stroke-width="${(1.5 + i * .25).toFixed(1)}" opacity=".85"/>`; }
  s += `<rect x="-20" y="1180" width="760" height="120" fill="#4a8a3a"/><rect x="-20" y="1180" width="760" height="120" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  if (N > .02) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a1030" opacity="${(N * .35).toFixed(2)}"/>`;
  return s;
}
// ---------- 0: hook: a runner on a stadium track keeps going; the lap counter climbs; others stop to rest ----------
function sceneHook(t) {
  const lap = Math.floor(t * 3);
  let s = `<defs>${LDEFS()}</defs>` + stadium(t, 0);
  // two tired runners at the side, hands on knees
  s += hero(120, 1150, Object.assign({ s: .7, face: 1, shade: 1, lean: 28, hF: [150, 1080], hB: [140, 1085] }, gp(2))) + hero(600, 1140, Object.assign({ s: .68, face: -1, shade: 1, lean: 24, hF: [570, 1072], hB: [580, 1076] }, gp(4)));
  // the runner who never tires, centred, the track sliding past (lane lines dashes move)
  for (let i = 0; i < 10; i++) { const x = pmod(i * 90 - t * 520, 900) - 80; s += `<rect x="${x}" y="1030" width="40" height="4" fill="#fff" opacity=".6"/>`; }
  s += runner(360, 1100, .95, 1, t * 11, 1);
  s += `${panel(470, 420, 210, 120)}<text x="575" y="500" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="54" fill="#f4c76b">${arN2(lap + 12)}</text>${NTL(575, 530, 'لفّة', 1, '#fff', 20)}`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: run at full speed and never stop; carry loads all day (a building site, the sun crossing the sky) ----------
function brickStack(x, y, n) { let s = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / 4), c = i % 4; s += `<rect x="${x + c * 34 + (r % 2) * 17}" y="${y - (r + 1) * 16}" width="32" height="14" fill="#b8584a" stroke="#7a3a2a" stroke-width="1.5"/>`; } return s; }
function sceneSite(t) {
  const T = t - (S0(1) - .2), day = clamp((t - WS(1, 5)) / (S0(2) - WS(1, 5))), sa = lerp(-.2, 3.4, day), sx = 360 - Math.cos(sa) * 330, sy = 760 - Math.sin(sa) * 320, N = clamp(-Math.sin(sa) * 2 + .2) * (day > 0 ? 1 : 0);
  let s = `<defs>${LDEFS()}<linearGradient id="siS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a92cc', '#0a1430', N)}"/><stop offset="1" stop-color="${mix('#e8d8b8', '#2a2a48', N)}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#siS)"/>`;
  if (day > 0 && N < .9) s += sun3(sx, sy, .9 * (1 - N));
  if (N > .3) s += `<circle cx="${720 - sx}" cy="${sy}" r="26" fill="#f4f0e0" opacity="${N.toFixed(2)}"/>`;
  // a building going up, a crane, bricks
  const fl = Math.min(7, 2 + Math.floor(day * 6));
  s += farCity(55, 880, mix('#8a96a8', '#1a2032', N));
  for (let i = 0; i < fl; i++) { const y = 860 - i * 70; s += `<rect x="380" y="${y - 70}" width="260" height="70" fill="${mix('#c8b8a0', '#3a3640', N)}" stroke="#7a6a5a" stroke-width="3"/>` + [0, 1, 2, 3].map(k => `<rect x="${400 + k * 60}" y="${y - 54}" width="36" height="36" fill="${N > .4 ? '#ffd88a' : '#4a5a6a'}"/>`).join(''); }
  s += `<path d="M330,880 V240 M330,250 H690 M330,250 L300,290 H330" stroke="#e8b030" stroke-width="12"/><path d="M${560},250 V${430 + Math.sin(t) * 20}" stroke="#3a3a3a" stroke-width="3"/><rect x="${540}" y="${430 + Math.sin(t) * 20}" width="40" height="30" fill="#b8584a"/>`;
  s += `<rect x="-20" y="880" width="760" height="420" fill="${mix('#a89478', '#2a2620', N)}"/><rect x="-20" y="880" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/>` + brickStack(40, 1000, 24) + brickStack(520, 1010, 16);
  // a worker carries bricks back and forth
  const ph = pmod(T * .35, 2), go = ph < 1, u = go ? ph : 2 - ph, x = lerp(180, 470, u), f = go ? 1 : -1;
  s += hero(x, 1180, Object.assign({ s: .95, face: f, shade: 1, walk: T * 5, amp: .45, hF: [x + f * 34, 1180 - 210], hB: [x + f * 2, 1180 - 205] }, gp(3), { top: '#e8a030' }));
  if (go) s += `<g transform="translate(${x + f * 18},${1180 - 222})">${brickStack(-34, 0, 8)}</g>`;
  s += `<path d="M${x - 22},${1180 - 330} q22,-26 44,0Z" fill="#f4c040"/>`;
  s += `<g opacity="${clamp(day * 5).toFixed(2)}">${panel(40, 420, 220, 110)}<text x="150" y="494" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="48" fill="#f4c76b">${arN2(Math.floor(day * 24))} س</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the marathon: about 2 hours today; at sprinters' speed about 1 hour 10 minutes ----------
function sceneMarathon(t) {
  const T = t - (S0(2) - .2), go = ease(ramp(t, WS(2, 8), S0(3) - .5)), b1 = ease(ramp(t, WS(2, 3), WS(2, 6))), b2 = ease(ramp(t, WS(2, 12), WS(2, 16)));
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'mr', top: '' });
  // the race on the road: a marathon runner and a "sprinter" who pulls away
  const xa = lerp(140, 360, go), xb = lerp(160, 640, go);
  for (let i = 0; i < 6; i++) s += `<rect x="${i * 130 - 40}" y="1168" width="20" height="60" fill="#f4f0e8" opacity=".25"/>`;
  s += `<path d="M-20,1165 H740" stroke="#4a8ad8" stroke-width="5" stroke-dasharray="20 12"/>`;
  s += runner(xa, 1250, .82, 1, T * 8, 2) + `<rect x="${xa - 16}" y="${1250 - 220}" width="32" height="24" fill="#fff"/><text x="${xa}" y="${1250 - 202}" text-anchor="middle" font-size="16" font-weight="700" fill="#1a1a1a">42</text>`;
  s += runner(xb, 1230, .8, 1, T * 13, 4, { top: '#e8402a' });
  // two time bars
  const bar = (y, k, w, col, lab, val) => `<g opacity="${clamp(k * 3).toFixed(2)}">${panel(60, y - 52, 600, 120)}<rect x="250" y="${y - 10}" width="${(380 * w * k).toFixed(1)}" height="30" rx="10" fill="${col}"/>${NTL(150, y + 14, lab, 1, '#fff', 22)}${NTL(440, y + 60, val, 1, col, 26)}</g>`;
  s += bar(470, b1, 1, '#8ac0e8', 'الرقمُ القياسيّ', '≈ ساعتان') + bar(620, b2, 1.17 / 2.01, '#f4c76b', 'بلا تعب', '≈ ساعة و١٠ دقائق');
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: factories and farms work day and night; production doubles ----------
function sceneFarm(t) {
  const T = t - (S0(3) - .2), cyc = T * .55, N = clamp(.5 - .5 * Math.cos(cyc * 6.283) + 0) , up = ease(ramp(t, WS(3, 5), WS(3, 7) + .3));
  let s = `<defs>${LDEFS()}<linearGradient id="fdS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a92cc', '#0a1430', N)}"/><stop offset="1" stop-color="${mix('#f0d8b0', '#2a2a48', N)}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#fdS)"/>`;
  const sa = cyc * 6.283 - 1.57, sx = 360 + Math.sin(sa) * 330, sy = 820 - Math.cos(sa) * 340;
  if (N < .9) s += sun3(sx, sy, .9 * (1 - N)); s += `<circle cx="${720 - sx}" cy="${1640 - sy - 820}" r="24" fill="#f4f0e0" opacity="${N.toFixed(2)}"/>`;
  // a factory on the horizon: chimneys with steam, windows that glow at night
  s += `<rect x="400" y="660" width="300" height="200" fill="${mix('#8a7a6a', '#2a2630', N)}"/>` + [440, 520, 600].map(x => `<rect x="${x}" y="540" width="30" height="130" fill="${mix('#9a8a7a', '#2a2630', N)}"/>` + plume(x + 15, 540, .5, t, x, .6)).join('') + [0, 1, 2, 3, 4].map(i => `<rect x="${420 + i * 56}" y="720" width="36" height="40" fill="${mix('#4a5a6a', '#ffd88a', N)}"/>`).join('');
  s += wheatField(t, 880, .9, 21);
  s += tractor(lerp(-120, 760, pmod(T * .12, 1)), 1150, .9) + (N > .4 ? scr(`<ellipse cx="${lerp(-120, 760, pmod(T * .12, 1)) + 150}" cy="1110" rx="140" ry="40" fill="url(#lampG)" opacity="${(N * .8).toFixed(2)}"/>`) : '');
  s += `<g opacity="${up.toFixed(2)}">${panel(60, 420, 240, 120)}<text x="180" y="498" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="56" fill="#f4c76b">×٢</text>${NTL(180, 528, 'الإنتاج', 1, '#fff', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: tiredness is not your enemy: it is an alarm that protects you ----------
function bellI(x, y, s, rot, a) { return `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) rotate(${rot.toFixed(1)}) scale(${s})"><path d="M-60,40 Q-60,-50 0,-60 Q60,-50 60,40 L74,58 H-74Z" fill="#f4c040"/><path d="M-40,30 Q-40,-36 0,-46" stroke="#fff" stroke-width="8" fill="none" opacity=".4"/><circle cx="0" cy="68" r="14" fill="#c89020"/><rect x="-8" y="-76" width="16" height="18" rx="6" fill="#c89020"/></g>`; }
function sceneAlarm(t) {
  const T = t - (S0(4) - .2), b = ease(ramp(t, WS(4, 5), WS(4, 7))), ring = Math.sin(t * 22) * 14 * b;
  let s = `<defs>${LDEFS()}</defs>` + stadium(t, .2);
  s += hero(360, 1160, Object.assign({ s: 1.05, face: 1, shade: 1, lean: 18, hF: [400, 1080], hB: [390, 1084] }, gp(1)));
  s += scr(`<circle cx="360" cy="560" r="${(150 + 20 * Math.sin(t * 8)).toFixed(1)}" fill="#ff3a2a" opacity="${(.25 * b).toFixed(2)}" filter="url(#blur16)"/>`) + bellI(360, 560, 1.3, ring, b);
  for (let i = 0; i < 3; i++) s += `<path d="M${470 + i * 26},${520 - i * 10} q20,40 0,80" stroke="#f4c040" stroke-width="6" fill="none" opacity="${(b * (.5 + .5 * Math.sin(t * 10 + i))).toFixed(2)}"/><path d="M${250 - i * 26},${520 - i * 10} q-20,40 0,80" stroke="#f4c040" stroke-width="6" fill="none" opacity="${(b * (.5 + .5 * Math.sin(t * 10 + i))).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
