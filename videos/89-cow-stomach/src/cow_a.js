// cow_a.js (#89): what if you had a cow's stomach? Built on the #88 chain (streetD, hero, heroX, glE/gW, treeR, meadow, farCity, sun3, cumulus, studio, bench).
const c1 = v => (+v).toFixed(1);
const cAR = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const CL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const CWD = `<linearGradient id="cwSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a74ba"/><stop offset=".62" stop-color="#9cc4e6"/><stop offset="1" stop-color="#eee6cc"/></linearGradient>
<linearGradient id="cwHide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient>
<linearGradient id="cwSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
<radialGradient id="cwRum" cx=".45" cy=".38" r=".7"><stop offset="0" stop-color="#b8e08a"/><stop offset=".65" stop-color="#6aa04a"/><stop offset="1" stop-color="#3e6a2a"/></radialGradient>
<radialGradient id="cwRet" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffd09a"/><stop offset=".7" stop-color="#e0904a"/><stop offset="1" stop-color="#a85a22"/></radialGradient>
<radialGradient id="cwOma" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#e8c4f2"/><stop offset=".7" stop-color="#ae78c4"/><stop offset="1" stop-color="#6e3a86"/></radialGradient>
<radialGradient id="cwAbo" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffb8c0"/><stop offset=".7" stop-color="#e0647a"/><stop offset="1" stop-color="#9a2a40"/></radialGradient>
<radialGradient id="cwHum" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffc8b8"/><stop offset=".7" stop-color="#e07a6a"/><stop offset="1" stop-color="#a03a34"/></radialGradient>
<radialGradient id="cwXr" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#14304e"/><stop offset="1" stop-color="#040a16"/></radialGradient>
<radialGradient id="cwBel" cx=".66" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></radialGradient>
<radialGradient id="cwGas" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f4fbe8" stop-opacity=".62"/><stop offset=".55" stop-color="#d8ecc4" stop-opacity=".3"/><stop offset="1" stop-color="#c8e0b0" stop-opacity="0"/></radialGradient>
<radialGradient id="cwFluid" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#8a9a4a"/><stop offset=".7" stop-color="#5a6a2a"/><stop offset="1" stop-color="#2e3814"/></radialGradient>
<radialGradient id="cwGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4c8" stop-opacity=".85"/><stop offset=".45" stop-color="#f4c76b" stop-opacity=".3"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="cwHeat" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ff7a3a" stop-opacity="0"/><stop offset=".78" stop-color="#ff7a3a" stop-opacity=".35"/><stop offset="1" stop-color="#ff5a2a" stop-opacity="0"/></radialGradient>
<linearGradient id="cwDrum" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a4a6a"/><stop offset=".35" stop-color="#6a9ac4"/><stop offset=".5" stop-color="#9ac4e4"/><stop offset=".75" stop-color="#3a648a"/><stop offset="1" stop-color="#1e3450"/></linearGradient>
<linearGradient id="cwBot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9ac8e4" stop-opacity=".55"/><stop offset=".4" stop-color="#e8f6ff" stop-opacity=".8"/><stop offset="1" stop-color="#7ab0d4" stop-opacity=".55"/></linearGradient>
<linearGradient id="cwFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3448"/><stop offset="1" stop-color="#121826"/></linearGradient>
<linearGradient id="cwTher" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f4c76b"/><stop offset="1" stop-color="#e53935"/></linearGradient>
<filter id="cwXg" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="bnBone" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbf6ea"/><stop offset=".6" stop-color="#e8dabe"/><stop offset="1" stop-color="#bba684"/></radialGradient>
<filter id="bnGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
const CWDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${HIDEF2}${CBDEF}${SCDEF}${CWD}`;
const cwSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
const XR = { top: '#4a86c0', pants: '#3a6ea8', skin: '#5a96cc', hair: '#4a80b8' };
// ---------- the skeleton of a hero() pose (from #80 bn_a.js), for the X-ray views ----------
function heroJ(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1, lean = (o.lean || 0) * Math.PI / 180, rotD = o.rot || 0, pv = o.pv || 0;
  let lF = o.lF || [.1, .06], lB = o.lB || [-.1, -.14], aF = o.aF || [.05, .3], aB = o.aB || [-.05, .25], hipY = o.hipY;
  if (o.walk != null) { const p = o.walk, A = o.amp || .6, leg = ph => { const a = Math.sin(ph) * A, bend = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - bend]; }, sw = -Math.sin(p) * A * .85;
    lB = leg(p + Math.PI); lF = leg(p); aB = [-sw - .05, -sw + .25]; aF = [sw + .05, sw + .3]; hipY = -150 - Math.abs(Math.cos(p)) * 4; }
  const dyL = l => 76 * Math.cos(l[0]) + 74 * Math.cos(l[1]); if (hipY == null) hipY = -Math.max(dyL(lF), dyL(lB));
  const ty = hipY - 112, shX = 2, shY = ty + 14, hx = 6, hy = ty - 34;
  const toLocal = (wx, wy) => { const px = wx - x, py = wy - y - pv, a = -rotD * Math.PI / 180, qx = px * Math.cos(a) - py * Math.sin(a), qy = px * Math.sin(a) + py * Math.cos(a) + pv, lx = qx / (f * s), ly = qy / s - hipY;
    return [lx * Math.cos(-lean) - ly * Math.sin(-lean), lx * Math.sin(-lean) + ly * Math.cos(-lean) + hipY]; };
  if (o.hF) { const p = toLocal(o.hF[0], o.hF[1]); aF = ik(shX, shY, p[0], p[1], 60, 56, o.bendF ?? -1); }
  if (o.hB) { const p = toLocal(o.hB[0], o.hB[1]); aB = ik(shX - 4, shY, p[0], p[1], 60, 56, o.bendB ?? -1); }
  const fw = (lx, ly, ln = 1) => { if (ln) { const dx = lx, dy = ly - hipY; lx = dx * Math.cos(lean) - dy * Math.sin(lean); ly = dx * Math.sin(lean) + dy * Math.cos(lean) + hipY; }
    const px = lx * f * s, py = ly * s - pv, a = rotD * Math.PI / 180; return [x + px * Math.cos(a) - py * Math.sin(a), y + pv + px * Math.sin(a) + py * Math.cos(a)]; };
  return { s, f, lean, rotD, pv, lF, lB, aF, aB, hipY, ty, shX, shY, hx, hy, tilt: -16 * (o.lookUp || 0), fw };
}
function bnBone(x1, y1, x2, y2, w, c) {
  const k = (x, y, r) => `<circle cx="${c1(x)}" cy="${c1(y)}" r="${c1(r)}" fill="${c}"/>`;
  return `<path d="M${c1(x1)},${c1(y1)} L${c1(x2)},${c1(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` + k(x1, y1, w * .82) + k(x2, y2, w * .82);
}
function skel(x, y, o, o2 = {}) {
  const J = heroJ(x, y, o), c = o2.col || '#f2f8ff', B = (a, b, cc, d, w) => bnBone(a, b, cc, d, w, c);
  const { hipY, ty, shX, shY, hx, hy } = J;
  const leg = l => { const kx = Math.sin(l[0]) * 76, ky = hipY + Math.cos(l[0]) * 76, ax = kx + Math.sin(l[1]) * 74, ay = ky + Math.cos(l[1]) * 74;
    return B(0, hipY, kx, ky, 11) + B(kx, ky, ax, ay, 8.5) + `<path d="M${c1(ax - 7)},${c1(ay + 1)} L${c1(ax + 24)},${c1(ay + 4)} M${c1(ax + 6)},${c1(ay + 2)} L${c1(ax + 26)},${c1(ay - 1)}" stroke="${c}" stroke-width="4.2" stroke-linecap="round"/>` + `<ellipse cx="${c1(kx + 7)}" cy="${c1(ky - 2)}" rx="5" ry="6.5" fill="${c}"/>`; };
  const arm = (sx, l) => { const ex = sx + Math.sin(l[0]) * 60, ey = shY + Math.cos(l[0]) * 60, wx = ex + Math.sin(l[1]) * 54, wy = ey + Math.cos(l[1]) * 54;
    return B(sx, shY, ex, ey, 7.5) + B(ex, ey, wx, wy, 4.4) + `<path d="M${c1(wx)},${c1(wy)} l${c1(Math.sin(l[1]) * 10)},${c1(Math.cos(l[1]) * 10)} M${c1(wx + 3)},${c1(wy)} l${c1(Math.sin(l[1] + .3) * 9)},${c1(Math.cos(l[1] + .3) * 9)}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`; };
  let sp = ''; const N = 13;
  for (let i = 0; i < N; i++) { const q = i / (N - 1), yy = lerp(hipY - 22, ty + 6, q), xx = -13 + 3.5 * Math.sin(q * Math.PI * 1.4); sp += `<rect x="${c1(xx - 6)}" y="${c1(yy - 3.6)}" width="12" height="6.4" rx="2.4" fill="${c}"/>`; }
  for (let i = 0; i < 4; i++) { const q = i / 3; sp += `<rect x="${c1(lerp(-9, hx - 8, q) - 4)}" y="${c1(lerp(ty + 2, hy + 18, q) - 3)}" width="9" height="5" rx="2" fill="${c}"/>`; }
  let rb = ''; for (let j = 0; j < 7; j++) { const yy = ty + 16 + j * 9.5; rb += `<path d="M-9,${c1(yy)} Q12,${c1(yy - 8 + j)} 21,${c1(yy + 8 + j * 1.6)}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; }
  rb += `<path d="M22,${c1(ty + 12)} L24,${c1(ty + 72)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
  const pel = `<path d="M-24,${c1(hipY - 34)} Q-34,${c1(hipY - 8)} -12,${c1(hipY + 8)} Q4,${c1(hipY + 13)} 19,${c1(hipY + 3)} Q27,${c1(hipY - 16)} 14,${c1(hipY - 30)} Q-4,${c1(hipY - 20)} -24,${c1(hipY - 34)}Z" fill="${c}" opacity=".55" stroke="${c}" stroke-width="4"/>`;
  const sk = `<g transform="rotate(${c1(J.tilt)},${hx},${hy + 14})"><ellipse cx="${hx - 2}" cy="${hy - 4}" rx="19.5" ry="20.5" fill="${c}"/><path d="M${hx + 3},${hy + 1} L${hx + 19},${hy + 1} L${hx + 18},${hy + 12} L${hx + 4},${hy + 14}Z" fill="${c}"/>` +
    `<path d="M${hx - 9},${hy + 7} L${hx - 5},${hy + 22} L${hx + 16},${hy + 22} L${hx + 18},${hy + 15}" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round"/><ellipse cx="${hx + 10}" cy="${hy - 2}" rx="5.6" ry="5" fill="#0a1626" opacity=".85"/></g>`;
  const up = `<g transform="rotate(${c1(J.lean * 57.29578)},0,${c1(hipY)})">`;
  const body = `<g opacity=".55">${up}${arm(shX - 4, J.aB)}</g>${leg(J.lB)}</g>` + up + sp + rb + pel + sk + `</g>` + leg(J.lF) + up + arm(shX, J.aF) + `</g>`;
  return `<g opacity="${c1(o2.a ?? 1)}" filter="url(#bnGlow)"><g transform="translate(${c1(x)},${c1(y)}) rotate(${c1(J.rotD)},0,${J.pv}) scale(${(J.f * J.s).toFixed(4)},${J.s})">${body}</g></g>`;
}
// ---------- the four compartments, in the cow's local frame (facing +x, hooves on y = 0); hl = [rumen, reticulum, omasum, abomasum] highlight 0..1 ----------
const CW_RUM = 'M100,-222 C104,-256 70,-272 20,-273 C-60,-275 -150,-271 -190,-246 C-216,-229 -213,-199 -196,-186 C-216,-170 -214,-130 -186,-114 C-140,-99 -40,-104 26,-112 C74,-118 96,-134 96,-160 C108,-180 98,-200 100,-222Z';
const CW_ABO = 'M150,-142 C164,-122 150,-102 112,-99 C70,-96 20,-98 -16,-104 C-40,-108 -44,-122 -26,-126 C8,-128 50,-118 90,-128 C112,-134 128,-150 150,-142Z';
const CW_BODY = 'M-232,-258 C-232,-282 -212,-298 -180,-299 C-150,-296 -120,-288 -80,-287 C-10,-285 40,-288 80,-294 C110,-300 136,-308 156,-302 C186,-292 206,-266 214,-236 C222,-200 216,-150 202,-120 C186,-98 156,-92 124,-95 C70,-92 10,-86 -50,-90 C-110,-94 -160,-102 -198,-122 C-230,-144 -242,-200 -232,-258Z';
const CW_NECK = 'M116,-298 C168,-308 226,-292 258,-268 L278,-206 C270,-186 252,-170 234,-156 C222,-146 214,-132 206,-120 C198,-160 176,-200 128,-228Z';
const CW_HEAD = 'M252,-272 C268,-284 294,-280 304,-262 C314,-238 328,-198 338,-168 C344,-150 340,-132 324,-127 C308,-124 292,-132 284,-144 C272,-168 260,-202 250,-234Z';
const CW_FL = 'M136,-150 C134,-110 146,-80 150,-52 C152,-40 150,-20 150,-8 L178,-8 C178,-22 176,-40 178,-52 C182,-86 192,-118 198,-150Z';
const CW_HL = 'M-150,-212 C-128,-182 -128,-140 -142,-112 C-150,-96 -158,-84 -160,-66 C-160,-44 -156,-22 -156,-8 L-182,-8 C-184,-26 -186,-46 -192,-60 C-206,-72 -222,-92 -230,-120 C-240,-160 -236,-200 -226,-226Z';
function cwOrgans(t, hl = [0, 0, 0, 0], o = {}) {
  const gl = (k, d) => k > 0 ? `<path d="${d}" fill="none" stroke="#fff4c8" stroke-width="${c1(3 + 5 * k)}" opacity="${c1(.75 * k)}" filter="url(#cwXg)"/>` : '';
  const op = k => c1(.62 + .38 * k);
  // the oesophagus from the mouth to the cardia
  let g = `<path d="M306,-150 C276,-186 226,-238 176,-242 C146,-244 124,-236 108,-220" stroke="#e8a090" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/><path d="M306,-150 C276,-186 226,-238 176,-242 C146,-244 124,-236 108,-220" stroke="#ffd0c0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
  // rumen: dorsal and ventral sacs, grass inside
  g += `<g opacity="${op(hl[0])}"><path d="${CW_RUM}" fill="url(#cwRum)"/><clipPath id="cwRc${o.id || ''}"><path d="${CW_RUM}"/></clipPath><g clip-path="url(#cwRc${o.id || ''})">`;
  const r = RS(91); for (let i = 0; i < 70; i++) { const x = -200 + r() * 300, y = -265 + r() * 160, a = r() * 3.1, L = 10 + r() * 16, w = Math.sin(t * 1.3 + i) * 2;
    g += `<path d="M${c1(x)},${c1(y + w)} l${c1(Math.cos(a) * L)},${c1(Math.sin(a) * L)}" stroke="${r() < .5 ? '#d8f0a0' : '#3e6a22'}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`; }
  g += `<rect x="-220" y="-180" width="330" height="90" fill="#2e4a1a" opacity=".22"/></g><path d="M-196,-186 C-140,-180 -60,-192 0,-176 C40,-168 70,-170 96,-160" stroke="#2e4a1a" stroke-width="4" fill="none" opacity=".55"/><path d="M-160,-262 C-90,-272 0,-268 60,-258" stroke="#fff" stroke-width="5" fill="none" opacity=".25" stroke-linecap="round"/><path d="${CW_RUM}" fill="none" stroke="#2e4a1a" stroke-width="2.5" opacity=".6"/></g>` + gl(hl[0], CW_RUM);
  // reticulum: the honeycomb
  const RX = 132, RY = -150, RR = 34; let hc = '';
  for (let q = -3; q <= 3; q++) for (let p = -3; p <= 3; p++) { const cx = RX + p * 12 + (q % 2) * 6, cy = RY + q * 10.4; hc += `<path d="M${c1(cx - 6)},${c1(cy)} l3,-5.2 h6 l3,5.2 l-3,5.2 h-6Z" fill="none" stroke="#8a4a1a" stroke-width="1.4" opacity=".55"/>`; }
  g += `<g opacity="${op(hl[1])}"><circle cx="${RX}" cy="${RY}" r="${RR}" fill="url(#cwRet)"/><clipPath id="cwHc${o.id || ''}"><circle cx="${RX}" cy="${RY}" r="${RR - 2}"/></clipPath><g clip-path="url(#cwHc${o.id || ''})">${hc}</g><circle cx="${RX}" cy="${RY}" r="${RR}" fill="none" stroke="#8a4a1a" stroke-width="2.5" opacity=".7"/><ellipse cx="${RX - 10}" cy="${RY - 14}" rx="12" ry="6" fill="#fff" opacity=".3"/></g>` + gl(hl[1], `M${RX - RR},${RY} a${RR},${RR} 0 1,0 ${2 * RR},0 a${RR},${RR} 0 1,0 ${-2 * RR},0`);
  // omasum: the leaves
  const OX = 96, OY = -192, OR = 30; let lv = '';
  for (let k = 0; k < 7; k++) { const a = -1.2 + k * .4; lv += `<path d="M${c1(OX - Math.cos(a) * OR * .9)},${c1(OY - Math.sin(a) * OR * .9)} Q${OX},${c1(OY + (k - 3) * 2)} ${c1(OX + Math.cos(a) * OR * .9)},${c1(OY + Math.sin(a) * OR * .9)}" stroke="#4a1e5a" stroke-width="1.6" fill="none" opacity=".55"/>`; }
  g += `<g opacity="${op(hl[2])}"><circle cx="${OX}" cy="${OY}" r="${OR}" fill="url(#cwOma)"/>${lv}<circle cx="${OX}" cy="${OY}" r="${OR}" fill="none" stroke="#4a1e5a" stroke-width="2.5" opacity=".7"/><ellipse cx="${OX - 9}" cy="${OY - 13}" rx="10" ry="5" fill="#fff" opacity=".3"/></g>` + gl(hl[2], `M${OX - OR},${OY} a${OR},${OR} 0 1,0 ${2 * OR},0 a${OR},${OR} 0 1,0 ${-2 * OR},0`);
  // abomasum: the true stomach, with folds; then the start of the small intestine
  g += `<g opacity="${op(hl[3])}"><path d="${CW_ABO}" fill="url(#cwAbo)"/>` + [0, 1, 2, 3, 4].map(k => `<path d="M${120 - k * 30},-136 q-6,14 2,30" stroke="#7a1a30" stroke-width="1.6" fill="none" opacity=".45"/>`).join('') +
    `<path d="${CW_ABO}" fill="none" stroke="#7a1a30" stroke-width="2.5" opacity=".7"/><path d="M-30,-116 C-60,-112 -70,-128 -96,-122 C-120,-116 -110,-100 -136,-104" stroke="#e8a0a8" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/></g>` + gl(hl[3], CW_ABO);
  // connections: rumen-reticulum, reticulum-omasum, omasum-abomasum
  g += `<path d="M112,-176 L118,-170 M110,-198 L116,-176 M100,-163 L120,-140" stroke="#fff" stroke-width="0" />`;
  return g;
}
// the food path through the compartments (a glowing bolus), k 0..1: mouth -> rumen -> reticulum -> (up again) -> omasum -> abomasum
const CW_PATH = [[306, -150], [250, -214], [176, -242], [108, -220], [20, -210], [-90, -200], [-150, -170], [-60, -140], [60, -150], [132, -150], [110, -180], [96, -192], [118, -150], [100, -120], [40, -112], [-20, -112]];
function cwBolus(k) { const n = CW_PATH.length - 1, u = clamp(k) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i, a = CW_PATH[i], b = CW_PATH[i + 1]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; }
// ---------- a Holstein cow, side view. o: face, graze (0..1 head down), chew (phase), xr (draw the X-ray version), hl, bolus, id, legs (walk phase) ----------
function cowB(x, y, s, o = {}) {
  const f = o.face || 1, gz = o.graze || 0, id = o.id || 'c', ch = o.chew != null ? Math.sin(o.chew) : 0;
  const ang = gz * 58, dy = gz * 40, hg = `<g transform="translate(0,${c1(dy)}) rotate(${c1(ang)},150,-250)">`;
  const sw = o.walk != null ? Math.sin(o.walk) * 7 : 0;
  const leg = (d, c, dx, rot) => `<g transform="translate(${dx},0) rotate(${c1(rot)},${d === CW_FL ? 166 : -184},-150)"><path d="${d}" fill="${c}"/><path d="M${d === CW_FL ? 146 : -186},-9 L${d === CW_FL ? 181 : -153},-9 L${d === CW_FL ? 185 : -150},1 L${d === CW_FL ? 143 : -189},1Z" fill="#1a1612"/></g>`;
  if (o.xr) {
    const bl = '#5a96cc';
    let g = `<path d="${CW_FL}" fill="${bl}" opacity=".22" transform="translate(-24,0)"/><path d="${CW_HL}" fill="${bl}" opacity=".22" transform="translate(20,0)"/>` +
      `<path d="${CW_BODY}" fill="${bl}" opacity=".3"/><path d="${CW_FL}" fill="${bl}" opacity=".3"/><path d="${CW_HL}" fill="${bl}" opacity=".3"/>` + hg + `<path d="${CW_NECK}" fill="${bl}" opacity=".3"/><path d="${CW_HEAD}" fill="${bl}" opacity=".3"/></g>` +
      `<g fill="none" stroke="#9ad4ff" stroke-width="2.5" opacity=".75"><path d="${CW_BODY}"/><path d="${CW_FL}"/><path d="${CW_HL}"/></g>` + hg + `<g fill="none" stroke="#9ad4ff" stroke-width="2.5" opacity=".75"><path d="${CW_NECK}"/><path d="${CW_HEAD}"/></g></g>`;
    // faint spine and ribs
    g += `<g opacity=".45" filter="url(#bnGlow)"><path d="M-226,-262 C-150,-278 -40,-276 60,-282 C110,-286 140,-290 160,-284" stroke="#e8f4ff" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="9 4"/>` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${150 - i * 22},-282 q-14,60 4,${c1(150 - i * 4)}" stroke="#e8f4ff" stroke-width="3" fill="none" opacity=".55"/>`).join('') + `</g>`;
    g += cwOrgans(o.t || 0, o.hl || [0, 0, 0, 0], { id });
    if (o.bolus != null && o.bolus > 0 && o.bolus < 1) { const [bx, by] = cwBolus(o.bolus); g += `<circle cx="${c1(bx)}" cy="${c1(by)}" r="16" fill="url(#cwGlow)"/><circle cx="${c1(bx)}" cy="${c1(by)}" r="6" fill="#d8f0a0" stroke="#3e6a22" stroke-width="2"/>`; }
    return `<g transform="translate(${c1(x)},${c1(y)}) scale(${c1(f * s * 100) / 100},${c1(s * 100) / 100})">${g}</g>`;
  }
  const W = '#f2efe8', K = '#1e1a18', farC = '#cfcac0';
  let g = `<ellipse cx="-10" cy="2" rx="250" ry="16" fill="#000" opacity=".28" filter="url(#blur5)"/>`;
  // far legs (darker), tail
  g += leg(CW_FL, farC, -24, -sw) + leg(CW_HL, farC, 20, sw);
  g += `<path d="M-230,-262 C-246,-230 -244,-170 -238,-110" stroke="#d8d2c6" stroke-width="7" fill="none" stroke-linecap="round" transform="rotate(${c1(Math.sin((o.t || 0) * 1.7) * 4)},-230,-262)"/><path d="M-238,-112 l-6,22 l10,-2 l4,-20Z" fill="${K}" transform="rotate(${c1(Math.sin((o.t || 0) * 1.7) * 4)},-230,-262)"/>`;
  // body + near legs with spots
  const clip = `<clipPath id="cwB${id}"><path d="${CW_BODY}"/><path d="${CW_HL}"/><path d="${CW_FL}"/></clipPath>`;
  g += clip + `<path d="${CW_BODY}" fill="${W}"/>` + leg(CW_HL, W, 0, -sw) + leg(CW_FL, W, 0, sw);
  g += `<g clip-path="url(#cwB${id})"><path d="M-200,-300 C-150,-310 -100,-280 -110,-240 C-120,-200 -170,-200 -200,-190 C-230,-180 -250,-260 -200,-300Z M-60,-300 C0,-305 40,-280 30,-240 C20,-196 -40,-170 -70,-200 C-100,-230 -110,-292 -60,-300Z M70,-300 C120,-312 160,-300 170,-262 C176,-230 150,-206 120,-216 C90,-226 60,-280 70,-300Z M-170,-150 C-140,-160 -110,-140 -120,-112 C-130,-92 -170,-96 -186,-112 C-196,-128 -190,-146 -170,-150Z M40,-150 C70,-152 90,-130 80,-108 C70,-92 30,-94 20,-110 C10,-130 20,-148 40,-150Z" fill="${K}"/>` +
    `<rect x="-260" y="-320" width="500" height="340" fill="url(#cwHide)"/><rect x="-260" y="-320" width="500" height="340" fill="url(#cwSide)"/><rect x="-260" y="-320" width="500" height="340" fill="#000" filter="url(#grainR)" opacity=".12"/></g>`;
  // udder, folds, hip bone highlight
  g += `<path d="M-62,-96 C-58,-70 -76,-56 -98,-56 C-122,-56 -134,-72 -130,-98Z" fill="#e8b4a8"/><path d="M-118,-92 C-114,-72 -104,-62 -90,-60" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/>` + [-76, -97, -118].map(tx => `<rect x="${tx - 3}" y="-60" width="6" height="12" rx="3" fill="#d89a8e"/>`).join('') +
    `<path d="M140,-280 C120,-230 128,-170 150,-140" stroke="#000" stroke-width="3" fill="none" opacity=".14"/><path d="M-150,-200 C-140,-170 -150,-140 -170,-120" stroke="#000" stroke-width="3" fill="none" opacity=".14"/><ellipse cx="-176" cy="-292" rx="18" ry="6" fill="#fff" opacity=".3"/>`;
  // neck and head
  const jaw = ch * 3;
  g += hg + `<path d="${CW_NECK}" fill="${W}"/><path d="${CW_NECK}" fill="url(#cwHide)"/><path d="M226,-168 C214,-150 210,-136 206,-122" stroke="#000" stroke-width="3" fill="none" opacity=".12"/>` +
    `<path d="M258,-250 C240,-266 216,-268 206,-256 C218,-244 240,-238 258,-240Z" fill="${K}"/><path d="M252,-250 C238,-258 224,-258 216,-254 C228,-248 240,-246 252,-246Z" fill="#e8a8a0" opacity=".6"/>` +
    `<path d="M264,-272 C264,-286 272,-294 282,-294 C278,-286 276,-278 276,-270Z" fill="#e8dcc0"/>` +
    `<path d="${CW_HEAD}" fill="${W}"/><path d="M252,-272 C268,-284 294,-280 304,-262 C310,-248 314,-234 316,-222 C300,-226 280,-224 262,-212 C256,-226 252,-250 252,-272Z" fill="${K}"/><path d="${CW_HEAD}" fill="url(#cwSide)"/>` +
    `<g transform="translate(0,${c1(jaw)})"><path d="M318,-160 C334,-160 344,-148 340,-134 C336,-124 318,-122 306,-130 C300,-142 306,-158 318,-160Z" fill="#d8aaa0"/><path d="M312,-128 q10,4 24,0" stroke="#7a4a44" stroke-width="2" fill="none"/></g><ellipse cx="331" cy="-147" rx="4.5" ry="3" fill="#4a2a26"/>` +
    `<ellipse cx="284" cy="-226" rx="6" ry="5" fill="#120c0a"/><circle cx="286" cy="-228" r="1.6" fill="#fff" opacity=".8"/><path d="M276,-232 q8,-6 16,0" stroke="#000" stroke-width="1.6" fill="none" opacity=".5"/>`;
  if (o.grass) g += Array.from({ length: 6 }, (_, i) => `<path d="M330,-128 q${8 + i * 3},${10 + i * 2} ${16 + i * 4},${18 - i * 5}" stroke="${i % 2 ? '#5a9a3a' : '#7ab84a'}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');
  g += `</g>`;
  return `<g transform="translate(${c1(x)},${c1(y)}) scale(${c1(f * s * 100) / 100},${c1(s * 100) / 100})">${g}</g>`;
}
// a point of the cow's local frame on screen
const cwPt = (x, y, s, f, lx, ly) => [x + f * lx * s, y + ly * s];
// ---------- you, with a cow's stomach: hero() with a belly (k: 0 none .. 1 big .. 1.7 barrel); xr: the X-ray version with the organs inside ----------
const cwBelP = (L, k) => { const P = 26 + 36 * k, top = L.ty + 44, bot = L.hipY + 14, mid = lerp(top, bot, .58), h = bot - top;
  return { P, top, bot, mid, h, d: `M14,${c1(top)} C${c1(14 + P * .6)},${c1(top - 4)} ${c1(P)},${c1(mid - h * .35)} ${c1(P)},${c1(mid)} C${c1(P)},${c1(mid + h * .32)} ${c1(14 + P * .55)},${c1(bot + 4)} 12,${c1(bot)}Z` }; };
function youB(x, y, o, k, xr = 0, t = 0, extra) {
  const P = Object.assign({ shade: 1 }, YOU, o);
  const mid = L => { if (k <= 0) return ''; const B = cwBelP(L, k);
    if (xr) { const sc = B.P * 1.05 / 345; return `<path d="${B.d}" fill="#5a96cc" opacity=".45"/><path d="${B.d}" fill="none" stroke="#9ad4ff" stroke-width="2"/>` +
      `<g transform="translate(${c1(B.P * .5 + 6)},${c1(B.mid)}) scale(${sc.toFixed(3)}) translate(40,184)">${cwOrgans(t, [0, 0, 0, 0], { id: 'y' + Math.round(x) })}</g>`; }
    return `<path d="${B.d}" fill="${P.top}"/><path d="${B.d}" fill="url(#cwBel)"/><path d="M${c1(20)},${c1(B.bot - 2)} Q${c1(B.P * .6)},${c1(B.bot + 2)} ${c1(B.P * .92)},${c1(B.mid + B.h * .28)}" stroke="#000" stroke-width="3" fill="none" opacity=".2"/>` +
      `<path d="M${c1(B.P * .55)},${c1(B.top + 6)} Q${c1(B.P * .92)},${c1(B.mid - B.h * .3)} ${c1(B.P * .96)},${c1(B.mid)}" stroke="#fff" stroke-width="3" fill="none" opacity=".25" stroke-linecap="round"/>`; };
  return heroX(x, y, xr ? Object.assign({}, P, XR, { shade: 0, noShadow: 1 }) : P, mid, extra);
}
// a tuft of grass held in the hand / leaves
const cwTuft = (x, y, s = 1, a = 0) => `<g transform="translate(${c1(x)},${c1(y)}) rotate(${c1(a)}) scale(${s})">` + Array.from({ length: 9 }, (_, i) => { const q = (i - 4) * .22; return `<path d="M0,0 q${c1(Math.sin(q) * 14)},${c1(-14)} ${c1(Math.sin(q) * 30)},${c1(-30 - (i % 3) * 6)}" stroke="${i % 2 ? '#5a9a3a' : '#86c04e'}" stroke-width="3" fill="none" stroke-linecap="round"/>`; }).join('') + `</g>`;
const leafS = (x, y, a, s = 1, c = '#4e8a32') => `<g transform="translate(${c1(x)},${c1(y)}) rotate(${c1(a)}) scale(${s})"><path d="M0,0 C8,-10 26,-10 34,0 C26,10 8,10 0,0Z" fill="${c}"/><path d="M0,0 L32,0" stroke="#2e5a1e" stroke-width="1.4"/></g>`;
// a park: sky, a far city, trees, a meadow
function park(t, o = {}) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#cwSky)"/>` + sun3(o.sx ?? 600, o.sy ?? 520, .85) + cumulus(200 + t * 4, 500, 240, 61, { a: .75 }) + cumulus(560 + t * 3, 590, 170, 63, { a: .6 });
  s += farCity(o.seed || 67, 868, '#a8b4c4', { hk: .55 }) + `<rect x="-20" y="780" width="760" height="90" fill="#eee6cc" opacity=".25"/>`;
  s += forestR(880, 34, 22, 70, 71, '#4a7a3a', { haze: .4, hazeCol: '#c8d4c4' });
  (o.trees || [[70, 930, 300, 73], [640, 920, 340, 75]]).forEach(([tx, ty, h, sd]) => { s += treeR(tx, ty, h, sd, t); });
  s += meadow(880, 1300, t);
  if (o.path !== 0) s += `<path d="M-20,1000 C200,980 520,990 740,970 L740,1010 C520,1030 200,1022 -20,1044Z" fill="#cdbf9e"/><path d="M-20,1000 C200,980 520,990 740,970 L740,1010 C520,1030 200,1022 -20,1044Z" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  return s;
}
// ---------- 0: hook: you in a park eating grass next to a grazing cow; an X-ray band shows a cow's four-part stomach inside you ----------
function sceneHook(t) {
  const YX = 220, YY = 1196, YS = 1.32, mouth = [YX + 30 * YS, YY - 278 * YS], bob = Math.sin(t * 7) * 2;
  const yo = { s: YS, face: 1, hF: [mouth[0] + 6, mouth[1] + 10 + bob], lookUp: .05 };
  const CX = 500, CY = 1100, CS = .62;
  let s = `<defs>${CWDEFS()}</defs>` + park(t, { trees: [[60, 940, 310, 73], [690, 930, 330, 75]] });
  s += cowB(CX, CY, CS, { face: -1, graze: 1, t, chew: t * 6, id: 'h' }) + meadow(1080, 1300, t + 3).replace(/<rect[^>]*>/, '');
  const me = () => youB(YX, YY, yo, 1, 0, t, L => `<g transform="translate(${c1(L.hx + 16)},${c1(L.hy + 14 + bob / YS)})"><ellipse rx="5" ry="${c1(3 + 1.5 * Math.abs(Math.sin(t * 7)))}" fill="#7a3a2a" opacity=".5"/></g>`);
  s += me();
  s += cwTuft(yo.hF[0] + 2, yo.hF[1] + 8, 1, 60);
  // the X-ray band
  const bx = lerp(-180, 900, ramp(t, .5, 3.6)), BW = 270;
  if (bx > -170 && bx < 890) {
    let xr = `<rect x="${c1(bx - BW / 2)}" y="-20" width="${BW}" height="1320" fill="url(#cwXr)"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M-20,${i * 44} H740" stroke="#3a7ab8" stroke-width="1" opacity=".18"/>`).join('');
    xr += cowB(CX, CY, CS, { face: -1, graze: 1, xr: 1, t, id: 'hx' }) + youB(YX, YY, yo, 1, 1, t) + skel(YX, YY, yo, { a: .8 });
    s += `<clipPath id="cwBand"><rect x="${c1(bx - BW / 2)}" y="-20" width="${BW}" height="1320"/></clipPath><g clip-path="url(#cwBand)">${xr}</g>` +
      [-1, 1].map(d => `<rect x="${c1(bx + d * BW / 2 - 3)}" y="-20" width="6" height="1320" fill="#9ae0ff" opacity=".9" filter="url(#blur2)"/><rect x="${c1(bx + d * BW / 2 - 1)}" y="-20" width="2" height="1320" fill="#fff"/>`).join('');
  }
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: the four compartments, named one by one ----------
function sceneParts(t) {
  const st = S0(1) - .2, X = 392, Y = 1120, S = 1.06, f = -1, rv = ease(ramp(t, st + .1, WS(1, 3)));
  const hl = [ease(ramp(t, WS(1, 4) - .15, WS(1, 4) + .3)), ease(ramp(t, WS(1, 5) - .15, WS(1, 5) + .3)), ease(ramp(t, WS(1, 6) - .15, WS(1, 6) + .3)), ease(ramp(t, WS(1, 8) - .15, WS(1, 8) + .3))];
  const cur = t < WS(1, 5) - .15 ? 0 : t < WS(1, 6) - .15 ? 1 : t < WS(1, 8) - .15 ? 2 : 3;
  const hk = hl.map((h, i) => h * (i === cur ? 1 : .35));
  let s = `<defs>${CWDEFS()}</defs>` + studio('cwS1', '#1a2c44', '#040a14', 5) + `<rect x="-20" y="${Y}" width="760" height="200" fill="#0a1220" opacity=".6"/><ellipse cx="${X - 40}" cy="${Y + 4}" rx="330" ry="20" fill="#000" opacity=".5" filter="url(#blur5)"/>`;
  const top = lerp(660, Y + 30, rv);
  s += `<clipPath id="cwRv1"><rect x="-20" y="-20" width="760" height="${c1(top + 20)}"/></clipPath><clipPath id="cwRv2"><rect x="-20" y="${c1(top)}" width="760" height="1400"/></clipPath>`;
  s += `<g clip-path="url(#cwRv2)">${cowB(X, Y, S, { face: f, t, id: 'p0' })}</g><g clip-path="url(#cwRv1)">${Array.from({ length: 30 }, (_, i) => `<path d="M-20,${i * 44} H740" stroke="#3a7ab8" stroke-width="1" opacity=".14"/>`).join('')}${cowB(X, Y, S, { face: f, xr: 1, t, hl: hk, id: 'p1', bolus: ramp(t, WS(1, 4), S0(2) - .3) })}</g>`;
  if (rv > 0 && rv < 1) s += `<rect x="-20" y="${c1(top - 3)}" width="760" height="6" fill="#9ae0ff" filter="url(#blur2)"/><rect x="-20" y="${c1(top - 1)}" width="760" height="2" fill="#fff"/>`;
  // labels with leader lines (positions from the local frame)
  const P = (lx, ly) => cwPt(X, Y, S, f, lx, ly);
  const L = [['الكَرِش', P(-60, -200), [560, 560], WS(1, 4), '#b8e08a'], ['الشَّبَكيّة', P(132, -150), [140, 1206], WS(1, 5), '#ffc08a'], ['أمُّ التلافيف', P(96, -192), [170, 600], WS(1, 6), '#e0b8f0'], ['الإنْفَحة', P(70, -114), [470, 1206], WS(1, 8), '#ffa8b4']];
  L.forEach(([tx, p, [lx, ly], t0, col], i) => { const a = ease(ramp(t, t0 - .2, t0 + .2)); if (a <= 0) return; const ey = ly < 900 ? ly + 18 : ly - 40;
    s += `<g opacity="${c1(a)}"><path d="M${c1(p[0])},${c1(p[1])} L${lx},${ey}" stroke="${col}" stroke-width="2.6"/><circle cx="${c1(p[0])}" cy="${c1(p[1])}" r="7" fill="${col}"/><circle cx="${c1(p[0])}" cy="${c1(p[1])}" r="14" fill="none" stroke="${col}" stroke-width="2" opacity=".6"/>${panel(lx - 115, ly - 36, 230, i === 3 ? 92 : 56)}${CL(lx, ly + 4, tx, 1, col, 32)}${i === 3 ? CL(lx, ly + 44, 'المعدةُ الحقيقيّة', 1, '#fff', 22) : ''}</g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: 150 litres (a barrel) against your 1 litre ----------
function rumenSack(x, y, w, h, lev, t, id) {   // the rumen shape on the floor, filling to lev 0..1
  const d = `M${x - w * .5},${y - h * .2} C${x - w * .56},${y - h * .7} ${x - w * .3},${y - h * 1.02} ${x + w * .05},${y - h} C${x + w * .4},${y - h * .98} ${x + w * .56},${y - h * .72} ${x + w * .48},${y - h * .45} C${x + w * .56},${y - h * .25} ${x + w * .45},${y - h * .02} ${x + w * .1},${y} C${x - w * .2},${y + h * .02} ${x - w * .46},${y - h * .02} ${x - w * .5},${y - h * .2}Z`;
  const ly = lerp(y, y - h * .98, lev), wv = Math.sin(t * 3) * 4;
  return `<defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><ellipse cx="${x}" cy="${y + 4}" rx="${w * .55}" ry="12" fill="#000" opacity=".45" filter="url(#blur5)"/><path d="${d}" fill="#6aa04a" opacity=".22"/>` +
    `<g clip-path="url(#${id})"><path d="M${x - w},${c1(ly)} Q${x - w / 2},${c1(ly - 8 + wv)} ${x},${c1(ly)} T${x + w},${c1(ly)} V${y + 20} H${x - w}Z" fill="url(#cwRum)"/>` +
    Array.from({ length: 40 }, (_, i) => { const r = RS(300 + i), px = x - w * .5 + r() * w, py = lerp(ly, y, r()), a = r() * 3; return py > ly + 6 ? `<path d="M${c1(px)},${c1(py)} l${c1(Math.cos(a) * 14)},${c1(Math.sin(a) * 14)}" stroke="#d8f0a0" stroke-width="2.2" opacity=".6"/>` : ''; }).join('') + `</g>` +
    `<path d="${d}" fill="none" stroke="#b8e08a" stroke-width="4"/><path d="M${x - w * .42},${y - h * .7} C${x - w * .3},${y - h * .9} ${x - w * .1},${y - h * .96} ${x + w * .1},${y - h * .94}" stroke="#fff" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/>`;
}
const HUM_ST = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-6,-112 C-6,-96 -4,-84 -8,-70 C-22,-40 -34,-6 -20,22 C-4,52 46,56 66,26 C76,12 68,-2 54,4 C40,10 30,18 16,8 C2,-4 6,-46 14,-70 C18,-86 12,-100 12,-112Z" fill="url(#cwHum)"/><path d="M-6,-112 C-6,-96 -4,-84 -8,-70 C-22,-40 -34,-6 -20,22 C-4,52 46,56 66,26 C76,12 68,-2 54,4 C40,10 30,18 16,8 C2,-4 6,-46 14,-70 C18,-86 12,-100 12,-112Z" fill="none" stroke="#7a2a24" stroke-width="3"/><path d="M-16,-30 C-20,0 -6,26 20,30" stroke="#fff" stroke-width="4" fill="none" opacity=".3"/></g>`;
function sceneSize(t) {
  const st = S0(2) - .2, a = ease(ramp(t, st, st + .5)), lev = ease(ramp(t, WS(2, 2) - .1, WS(2, 6) + .2)), br = ease(ramp(t, WS(2, 8) - .3, WS(2, 9) + .2)), hu = ease(ramp(t, WS(2, 11) - .2, WS(2, 11) + .4));
  const FL = 1150;
  let s = `<defs>${CWDEFS()}</defs>` + studio('cwS2', '#22304a', '#060a14', 9) + `<rect x="-20" y="${FL}" width="760" height="200" fill="url(#cwFloor)"/><path d="M-20,${FL} H740" stroke="#4a5a74" stroke-width="2"/>`;
  // the rumen filling, with its count
  s += `<g opacity="${c1(a)}">${rumenSack(180, FL, 260, 270, lev, t, 'cwSk')}</g>`;
  const n = Math.round(150 * lev);
  s += `<g opacity="${c1(a)}">${panel(58, 690, 244, 120)}<text x="180" y="770" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="#f4c76b">${cAR(n)}</text>${CL(180, 800, 'لتراً', 1, '#fff', 24)}</g>` + CL(180, 860, 'الكَرِش', a, '#b8e08a', 30);
  // the barrel (159 L), true scale with the rumen (about 4 px per cm: 88 cm tall, 57 cm wide)
  if (br > 0) { const bx = 560 + (1 - br) * 260, bw = 228, bh = 352, by = FL - bh;
    s += `<g opacity="${c1(br)}"><ellipse cx="${bx}" cy="${FL + 4}" rx="130" ry="12" fill="#000" opacity=".45" filter="url(#blur5)"/><rect x="${bx - bw / 2}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="url(#cwDrum)"/>` +
      [.12, .5, .88].map(q => `<rect x="${bx - bw / 2 - 3}" y="${c1(by + bh * q - 7)}" width="${bw + 6}" height="14" rx="5" fill="url(#cwDrum)"/><path d="M${bx - bw / 2},${c1(by + bh * q + 7)} H${bx + bw / 2}" stroke="#000" stroke-width="2" opacity=".3"/>`).join('') +
      `<ellipse cx="${bx}" cy="${by}" rx="${bw / 2}" ry="14" fill="#4a7aa4"/><ellipse cx="${bx}" cy="${by}" rx="${bw / 2 - 8}" ry="10" fill="#2a4a6a"/><circle cx="${bx + 50}" cy="${by - 1}" r="7" fill="#1a2a3a"/><rect x="${bx - bw / 2}" y="${by}" width="${bw}" height="${bh}" fill="#000" filter="url(#grainR)" opacity=".15"/>` +
      `${panel(bx - 110, by - 112, 220, 84)}${CL(bx, by - 76, 'برميل', 1, '#9ac4e4', 30)}${CL(bx, by - 40, '≈ ١٥٩ لتراً', 1, '#fff', 24)}</g>`; }
  // your stomach and a 1-litre bottle, at the same scale, in front
  if (hu > 0) { const k = .7 + .3 * hu;
    s += `<g opacity="${c1(hu)}"><ellipse cx="400" cy="1222" rx="70" ry="8" fill="#000" opacity=".5" filter="url(#blur2)"/>${HUM_ST(372, 1196, .5 * k)}` +
      `<g transform="translate(436,1222) scale(${c1(k * 100) / 100})"><rect x="-16" y="-120" width="32" height="120" rx="10" fill="url(#cwBot)"/><rect x="-16" y="-70" width="32" height="70" rx="8" fill="#7ab8e8" opacity=".6"/><rect x="-7" y="-134" width="14" height="16" rx="3" fill="#2a6aa8"/><rect x="-11" y="-110" width="5" height="90" rx="2" fill="#fff" opacity=".4"/></g>` +
      `${panel(322, 960, 156, 92)}${CL(400, 996, 'معدتُك', 1, '#ffb0a0', 28)}${CL(400, 1034, '≈ ١ لتر', 1, '#fff', 26)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: the street: your belly is now as big as a barrel ----------
const CWBLK = [[-14, 150, 470, '#9a7a62', 891, 2], [136, 160, 400, '#5e7a8e', 892, 0], [296, 150, 500, '#c8b896', 893, 1], [446, 150, 430, '#7e6a7a', 894, 2], [596, 160, 480, '#6a8a6e', 895, 0]];
const CWSHOP = [[-4, 140, 'خضار', '#3a7a3a'], [146, 140, 'مكتبة', '#5a3a2a'], [306, 130, 'مخبز', '#8a5a2a'], [456, 130, 'زهور', '#7a3a5a'], [606, 140, 'مقهى', '#2a4a6a']];
function sceneBelly(t) {
  const st = S0(3) - .2, T = t - st, k = lerp(1, 1.7, ease(ramp(t, WS(3, 1) - .1, WS(3, 2) + .2))), gh = ease(ramp(t, WS(3, 5) - .2, WS(3, 5) + .3)) * (1 - ease(ramp(t, S0(4) - .6, S0(4) - .25)));
  const x = 150 + 40 * T, y = 1088, sc = .95, wk = T * 2.4;
  const L = [];
  L.push([y, youB(x, y, { s: sc, face: 1, walk: wk, amp: .4, lean: -4 }, k)]);
  [[520, 1070, -1, 1, .82, 1.2], [640, 1096, -1, 4, .86, 2.6]].forEach(([x0, yy, f, pi, s2, ph]) => { L.push([yy, hero(x0 + f * 26 * T, yy, Object.assign({ s: s2, face: f, shade: 1, walk: T * 2.2 + ph, amp: .45, lookUp: .05 }, gp(pi)))]); });
  L.push([1060, hero(40, 1060, Object.assign({ s: .8, face: 1, shade: 1, lookUp: 0 }, gp(2)))]);
  let s = `<defs>${CWDEFS()}</defs><g transform="translate(360,1060) scale(1.1) translate(-360,-1060)">` + streetD(t, { id: 'cb', blocks: CWBLK, shops: CWSHOP, top: cwSort(L) }) + `</g>`;
  // a ghost barrel outline over the belly
  if (gh > 0) { const yo = { s: sc, face: 1, walk: wk, amp: .4, lean: -4 }, J = heroJ(x, y, yo), B = cwBelP(J, k), c = J.fw(B.P * .5 + 8, B.mid), bx = (c[0] - 360) * 1.1 + 360, by = (c[1] - 1060) * 1.1 + 1060, bw = B.P * 1.15 * sc * 1.1, bh = B.h * 1.3 * sc * 1.1;
    s += `<g opacity="${c1(gh)}"><rect x="${c1(bx - bw / 2)}" y="${c1(by - bh / 2)}" width="${c1(bw)}" height="${c1(bh)}" rx="10" fill="none" stroke="#9ae0ff" stroke-width="4" stroke-dasharray="12 8"/>` + [.2, .8].map(q => `<path d="M${c1(bx - bw / 2)},${c1(by - bh / 2 + bh * q)} H${c1(bx + bw / 2)}" stroke="#9ae0ff" stroke-width="3" stroke-dasharray="8 8"/>`).join('') + CL(bx - 40, by - bh / 2 - 16, '≈ برميل', 1, '#9ae0ff', 28) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: inside the rumen: microbes break down cellulose; your body cannot ----------
function microbe(x, y, kind, a, s = 1) {
  if (kind === 0) return `<g transform="translate(${c1(x)},${c1(y)}) rotate(${c1(a)}) scale(${s})"><rect x="-14" y="-5" width="28" height="10" rx="5" fill="#e8c46a"/><rect x="-12" y="-4" width="10" height="4" rx="2" fill="#fff" opacity=".45"/><rect x="-14" y="-5" width="28" height="10" rx="5" fill="none" stroke="#7a5a1a" stroke-width="1.4"/></g>`;
  if (kind === 1) return `<g transform="translate(${c1(x)},${c1(y)}) scale(${s})"><circle r="6" fill="#d88a5a"/><circle cx="-2" cy="-2" r="2" fill="#fff" opacity=".5"/><circle r="6" fill="none" stroke="#6a3a1a" stroke-width="1.2"/></g>`;
  // a ciliate protozoan: an oval body with a fringe of cilia and a mouth groove
  return `<g transform="translate(${c1(x)},${c1(y)}) rotate(${c1(a)}) scale(${s})">` + Array.from({ length: 26 }, (_, i) => { const q = i / 26 * 6.283, w = Math.sin(q * 3 + a * .2) * 2; return `<path d="M${c1(Math.cos(q) * 30)},${c1(Math.sin(q) * 20)} l${c1(Math.cos(q) * (7 + w))},${c1(Math.sin(q) * (7 + w))}" stroke="#cfe8f0" stroke-width="1.4" opacity=".8"/>`; }).join('') +
    `<ellipse rx="30" ry="20" fill="#a8d4dc" opacity=".85"/><ellipse cx="-6" cy="-4" rx="14" ry="8" fill="#e8f8fa" opacity=".5"/><ellipse cx="8" cy="3" rx="7" ry="5" fill="#5a8a9a" opacity=".7"/><path d="M24,-6 q6,6 0,12" stroke="#3a6a7a" stroke-width="2" fill="none"/><ellipse rx="30" ry="20" fill="none" stroke="#3a6a7a" stroke-width="1.6"/></g>`;
}
const hexU = (x, y, r, c, a = 1) => `<path d="M${c1(x - r)},${c1(y)} l${c1(r / 2)},${c1(-r * .87)} h${c1(r)} l${c1(r / 2)},${c1(r * .87)} l${c1(-r / 2)},${c1(r * .87)} h${c1(-r)}Z" fill="${c}" opacity="${c1(a)}" stroke="#000" stroke-opacity=".3" stroke-width="1"/>`;
function sceneMicro(t) {
  const st = S0(4) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), dg = ease(ramp(t, WS(4, 4) - .1, WS(4, 8))), hb = ease(ramp(t, WS(4, 9) - .2, WS(4, 9) + .3));
  let s = `<defs>${CWDEFS()}</defs>` + studio('cwS4', '#1e2e28', '#050a08', 21);
  const CX = 360, CY = 680, R = 250;
  let inn = `<circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#cwFluid)"/>`;
  // grass fibres: long ribbons, eaten from the ends as dg grows
  [[-230, -120, 230, -60, 0], [-240, 40, 220, 120, 1], [-200, 190, 240, 150, 2], [-220, -210, 120, -240, 3]].forEach(([x0, y0, x1, y1, i]) => { const cut = dg * .42;
    const ax = lerp(x0, x1, cut), ay = lerp(y0, y1, cut), bx = lerp(x1, x0, cut * .8), by = lerp(y1, y0, cut * .8);
    inn += `<path d="M${c1(CX + ax)},${c1(CY + ay)} L${c1(CX + bx)},${c1(CY + by)}" stroke="#4e8a2a" stroke-width="30" stroke-linecap="round"/><path d="M${c1(CX + ax)},${c1(CY + ay - 6)} L${c1(CX + bx)},${c1(CY + by - 6)}" stroke="#9ad06a" stroke-width="6" stroke-linecap="round" opacity=".6"/>` +
      Array.from({ length: 5 }, (_, q) => `<path d="M${c1(CX + ax)},${c1(CY + ay - 10 + q * 5)} L${c1(CX + bx)},${c1(CY + by - 10 + q * 5)}" stroke="#2e5a1a" stroke-width="1.2" opacity=".5"/>`).join('');
    // bacteria at work on the ends
    for (let q = 0; q < 6; q++) { const e = q < 3 ? [ax, ay] : [bx, by], r = RS(400 + i * 10 + q); inn += microbe(CX + e[0] + (r() - .5) * 36, CY + e[1] + (r() - .5) * 30, q % 2, r() * 180 + T * 20, 1); }
    // glucose units set free, drifting away
    for (let q = 0; q < 7; q++) { const r = RS(500 + i * 10 + q), life = clamp(dg * 7 - q), e = q % 2 ? [ax, ay] : [bx, by];
      if (life > 0) inn += hexU(CX + e[0] + (r() - .5) * 60 + Math.sin(T * 2 + q) * 8, CY + e[1] - 30 - life * 40 * r(), 7, '#f4c76b', .9); } });
  // free-swimming bacteria and ciliates
  for (let i = 0; i < 22; i++) { const r = RS(600 + i), x = CX + (r() - .5) * 2 * R * .85 + Math.sin(T * .8 + i) * 14, y = CY + (r() - .5) * 2 * R * .85 + Math.cos(T * .7 + i) * 10; if (Math.hypot(x - CX, y - CY) < R - 20) inn += microbe(x, y, i % 2, r() * 180 + T * 30, .9); }
  [[CX - 120, CY + 60, 0], [CX + 140, CY - 130, 1], [CX + 60, CY + 200, 2]].forEach(([x, y, i]) => { inn += microbe(x + Math.sin(T * .9 + i) * 26, y + Math.cos(T * .6 + i) * 16, 2, 20 * i + T * 12, 1.05); });
  inn += `<circle cx="${CX - 80}" cy="${CY - 110}" r="${R * .7}" fill="#fff" opacity=".05"/>`;
  s += `<g opacity="${c1(a)}"><defs><clipPath id="cwMc"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath></defs><circle cx="${CX}" cy="${CY}" r="${R + 8}" fill="#0a0e1c" opacity=".6"/><g clip-path="url(#cwMc)">${inn}</g><circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="6"/></g>`;
  // labels
  s += `<g opacity="${c1(ease(ramp(t, WS(4, 2) - .2, WS(4, 2) + .3)))}">${panel(500, 400, 190, 52)}${CL(595, 436, 'ميكروبات', 1, '#e8c46a', 28)}</g>`;
  const ca = ease(ramp(t, WS(4, 5) - .2, WS(4, 5) + .3)); s += `<g opacity="${c1(ca)}">${panel(40, 946, 210, 52)}${CL(145, 982, 'السِّليلوز', 1, '#9ad06a', 28)}<path d="M160,946 L${CX - 150},${CY + 150}" stroke="#9ad06a" stroke-width="2.5"/></g>`;
  s += `<g opacity="${c1(ease(ramp(t, WS(4, 6) + .2, WS(4, 7) + .3)))}">${panel(470, 946, 210, 52)}${hexU(500, 972, 10, '#f4c76b')}${CL(590, 982, 'سكّرٌ وطاقة', 1, '#f4c76b', 26)}</g>`;
  // your body today: the cellulose chain passes through untouched
  if (hb > 0) { let ch = ''; for (let i = 0; i < 9; i++) ch += hexU(150 + i * 26 + ((T * 30) % 26), 1128 + (i % 2) * 8, 11, '#9ad06a');
    s += `<g opacity="${c1(hb)}">${panel(50, 1024, 620, 196)}${CL(360, 1066, 'جسمُك اليوم', 1, '#ffb0a0', 30)}<clipPath id="cwCh"><rect x="120" y="1100" width="300" height="60"/></clipPath><g clip-path="url(#cwCh)">${ch}</g>` +
      `<path d="M430,1130 H520" stroke="#cfd8e4" stroke-width="4"/><path d="M520,1130 l-12,-8 v16Z" fill="#cfd8e4"/>${CL(590, 1140, 'لا يهضمُه ✗', 1, '#ff7a6a', 28)}${CL(270, 1194, 'يخرجُ أليافاً كما هو', 1, '#cfd8e4', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 5a: in any park: you eat grass and leaves ----------
function scenePark(t) {
  const st = S0(5) - .2, T = t - st;
  const L = [];
  // you at a low branch, pulling leaves to your mouth
  const YX = 430, YY = 1180, YS = 1.1, m = [YX + 30 * YS, YY - 278 * YS], chew = Math.sin(t * 7) * 2;
  const br = `<path d="M740,600 C640,640 560,700 ${m[0] + 40},${m[1] - 30}" stroke="#5a4030" stroke-width="12" fill="none" stroke-linecap="round"/>` + Array.from({ length: 14 }, (_, i) => { const q = i / 13, bx = lerp(740, m[0] + 40, q) + Math.sin(i * 2.1) * 10, by = lerp(600, m[1] - 30, q) + Math.cos(i * 1.7) * 14; return leafS(bx, by, i * 47 % 360, 1.3, i % 3 ? '#4e8a32' : '#6aa63e'); }).join('');
  L.push([YY, youB(YX, YY, { s: YS, face: 1, hF: [m[0] + 22, m[1] - 4 + chew], hB: [m[0] + 30, m[1] - 30], lookUp: .25 }, 1.05) + leafS(m[0] + 12, m[1] + 2, 190, 1.2) + leafS(m[0] + 16, m[1] - 6, 160, 1.1, '#6aa63e')]);
  // someone sitting on the grass, eating a handful of grass
  const SX = 150, SY = 1120, SS = .9, sm = [SX + 30 * SS, SY - 120 * SS];
  L.push([SY, youB(SX, SY, Object.assign({ s: SS, face: 1, lF: [2.0, .45], lB: [1.85, .32], lean: 8, hF: [SX + 34 * SS, SY - 196 * SS + chew], lookUp: .05 }, gp(5)), .5) + cwTuft(SX + 38 * SS, SY - 186 * SS, .8, 70)]);
  // far people doing the same
  L.push([1010, hero(620, 1010, Object.assign({ s: .5, face: -1, shade: 1, lean: 50, lF: [.3, .1], lB: [-.1, -.2], hF: [596, 1000] }, gp(1))) + cwTuft(594, 1004, .5, 0)]);
  let s = `<defs>${CWDEFS()}</defs>` + park(t, { trees: [[90, 950, 360, 77]], seed: 69 }) + treeR(790, 1010, 520, 85, t) + br + cwSort(L);
  noEarth(); F.ov = ''; return s;
}
// ---------- 5b: grasslands cover about 40% of the land; hunger could fall ----------
function cwDonut(x, y, R, k, col, a) {
  const e = k * 6.2832 - 1.5708, lg = k > .5 ? 1 : 0, ex = x + R * Math.cos(e), ey = y + R * Math.sin(e);
  return `<g opacity="${c1(a)}"><circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="#3a4250" stroke-width="26"/>${k > .001 ? `<path d="M${x},${y - R} A${R},${R} 0 ${lg} 1 ${c1(ex)},${c1(ey)}" fill="none" stroke="${col}" stroke-width="26" stroke-linecap="round"/>` : ''}</g>`;
}
function sceneGrass(t) {
  const st = WS(5, 7) - .25, T = t - st;
  const G = glE(t, { d: 9.2, el: .12, lon: 10 + T * 5, clouds: .3, lights: .2, tg: [0, .12, 0] });
  const k = ease(ramp(t, WS(5, 9) - .1, WS(5, 14))), pa = ease(ramp(t, st + .1, st + .5)), hg = ease(ramp(t, WS(5, 15) - .2, WS(5, 16) + .3));
  let ov = `<defs>${CWD}</defs><g opacity="${c1(pa)}">${panel(40, 1000, 300, 230)}${cwDonut(130, 1115, 60, .4 * k, '#8ad05a', 1)}<text x="130" y="1128" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">${cAR(Math.round(40 * k))}٪</text>${CL(262, 1092, 'مراعٍ', 1, '#8ad05a', 30)}${CL(262, 1134, 'من', 1, '#cfd8e4', 22)}${CL(262, 1170, 'اليابسة', 1, '#cfd8e4', 26)}</g>`;
  if (hg > 0) ov += `<g opacity="${c1(hg)}">${panel(380, 1000, 300, 230)}${CL(530, 1050, 'الجوعُ في العالم', 1, '#ffd27a', 28)}<rect x="440" y="${c1(1080 + 0)}" width="60" height="${c1(120)}" rx="6" fill="#c84a3a" opacity=".85"/><rect x="560" y="${c1(1200 - 120 * lerp(1, .45, hg))}" width="60" height="${c1(120 * lerp(1, .45, hg))}" rx="6" fill="#5a9a6a"/><path d="M510,1110 L548,${c1(1150)}" stroke="#fff" stroke-width="4"/><path d="M548,1150 l-14,-2 l10,-10Z" fill="#fff"/>${CL(470, 1222, 'اليوم', 1, '#cfd8e4', 20)}${CL(590, 1222, 'قد يقلّ', 1, '#9cf0b0', 20)}</g>`;
  F.ov = ov; return space(t);
}
// ---------- 6: chewing the cud: back up from the belly to the mouth, about 8 hours a day ----------
function sceneCud(t) {
  const st = S0(6) - .2, T = t - st, up = ramp(t, WS(6, 1) - .1, WS(6, 6) + .1), chew = t > WS(6, 6) ? Math.sin(t * 8) : 0, hrs = ease(ramp(t, WS(6, 10) - .3, WS(6, 14) + .4));
  const sx = lerp(600, 130, hrs), sy = 560 - Math.sin(hrs * Math.PI) * 140;
  let s = `<defs>${CWDEFS()}</defs>` + park(t, { sx, sy, trees: [[640, 940, 340, 79]], seed: 71 });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ff8a3a" opacity="${c1(.14 * hrs)}"/>`;
  // you on a bench, chewing
  const BX = 260, BY = 1150, YS = 1.25;
  s += bench(BX + 30, BY - 4);
  s += youB(BX, BY, { s: YS, face: 1, lF: [1.5708, 0], lB: [1.45, -.1], aF: [.4, -.4], aB: [.3, -.3], lookUp: .05 }, 1.05, 0, t, L => `<g transform="translate(${c1(L.hx + 14)},${c1(L.hy + 15 + chew * 2)})"><ellipse rx="7" ry="${c1(3.5 + 1.5 * Math.abs(chew))}" fill="#a86a50" opacity=".55"/></g>`);
  // the X-ray inset: the cud travels up the oesophagus to the mouth
  const IX = 520, IY = 700, IR = 170, ia = ease(ramp(t, st + .2, st + .6));
  if (ia > 0) { const io = { s: 1.05, face: 1, aF: [.1, .2], aB: [-.1, .2] }, PX = 0, PY = 150, J = heroJ(PX, PY, io);
    const mouth = J.fw(J.hx + 12, J.hy + 14), bel = J.fw(40, J.hipY - 46), k = ease(up);
    const ctl = [mouth[0] - 4, lerp(mouth[1], bel[1], .5)], bx = (1 - k) * (1 - k) * bel[0] + 2 * (1 - k) * k * ctl[0] + k * k * mouth[0], by = (1 - k) * (1 - k) * bel[1] + 2 * (1 - k) * k * ctl[1] + k * k * mouth[1];
    let inn = `<rect x="-200" y="-200" width="400" height="400" fill="url(#cwXr)"/>` + youB(PX, PY, io, 1.05, 1, t) + skel(PX, PY, io, { a: .6 }) + `<path d="M${c1(bel[0] - 10)},${c1(bel[1] - 30)} Q${c1(ctl[0])},${c1(ctl[1])} ${c1(mouth[0])},${c1(mouth[1])}" stroke="#e8a090" stroke-width="7" fill="none" opacity=".85"/>`;
    if (up > 0 && up < 1) inn += `<circle cx="${c1(bx)}" cy="${c1(by)}" r="18" fill="url(#cwGlow)"/><circle cx="${c1(bx)}" cy="${c1(by)}" r="7" fill="#d8f0a0" stroke="#3e6a22" stroke-width="2"/>`;
    s += `<g opacity="${c1(ia)}" transform="translate(${IX},${IY})"><defs><clipPath id="cwIc"><circle r="${IR}"/></clipPath></defs><circle r="${IR + 6}" fill="#0a0e1c" opacity=".6"/><g clip-path="url(#cwIc)"><g transform="translate(-20,40) scale(1.25)">${inn}</g></g><circle r="${IR}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>` +
      CL(IX, IY + IR + 40, up < 1 ? 'من البطنِ إلى الفم' : 'مضغٌ من جديد', ia, '#f4c76b', 26); }
  // the clock: about 8 hours of chewing a day
  if (hrs > 0) { const ca = ease(ramp(t, WS(6, 10) - .4, WS(6, 10) + .1)), an = hrs * 8 / 12 * 6.2832;
    s += `<g opacity="${c1(ca)}" transform="translate(140,560)"><circle r="86" fill="#0a0e1c" opacity=".85"/><circle r="72" fill="#fffaf0"/><path d="M0,0 L0,-72 A72,72 0 ${an > Math.PI ? 1 : 0} 1 ${c1(Math.sin(an) * 72)},${c1(-Math.cos(an) * 72)}Z" fill="#f4c76b" opacity=".55"/>` +
      Array.from({ length: 12 }, (_, i) => `<path d="M${c1(Math.sin(i * .5236) * 62)},${c1(-Math.cos(i * .5236) * 62)} L${c1(Math.sin(i * .5236) * 70)},${c1(-Math.cos(i * .5236) * 70)}" stroke="#3a3a40" stroke-width="3"/>`).join('') +
      `<path d="M0,0 L${c1(Math.sin(an) * 56)},${c1(-Math.cos(an) * 56)}" stroke="#2a2a30" stroke-width="6" stroke-linecap="round"/><circle r="7" fill="#e53935"/><circle r="72" fill="none" stroke="#f4c76b" stroke-width="5"/></g>` +
      CL(140, 700, Math.round(hrs * 8) >= 3 ? `${cAR(Math.round(hrs * 8))} ساعات` : 'ساعاتُ المضغ', ca, '#ffe08a', 32); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: the twist: you burp methane, about 100 kg a year, like a cow ----------
function ch4(x, y, s, a) { if (a <= 0) return ''; const H = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  return `<g opacity="${c1(a)}" transform="translate(${c1(x)},${c1(y)}) scale(${s})">` + H.map(([p, q]) => `<path d="M0,0 L${p * 14},${q * 12}" stroke="#cfd8e4" stroke-width="3"/>`).join('') + `<circle r="10" fill="#3a3a44"/><circle cx="-3" cy="-3" r="3" fill="#fff" opacity=".4"/>` + H.map(([p, q]) => `<circle cx="${p * 14}" cy="${q * 12}" r="6" fill="#f2f4f8" stroke="#8a929e" stroke-width="1"/>`).join('') + `</g>`; }
function cwGasC(x, y, k, t, seed, dir = 1) { if (k <= 0) return ''; let g = ''; const r = RS(seed);
  for (let i = 0; i < 16; i++) { const q = r(), px = x + dir * (q - .15) * 170 * k + Math.sin(t * 1.1 + i) * 8, py = y - r() * 180 * k - 10, rx = (22 + r() * 34) * (.5 + k * .8), ry = rx * (.5 + r() * .3); g += `<ellipse cx="${c1(px)}" cy="${c1(py)}" rx="${c1(rx)}" ry="${c1(ry)}" fill="${i % 3 ? "#dfe9cf" : "#c4d6b2"}" opacity=".8"/>`; }
  g = `<g filter="url(#smB)" opacity="${c1(Math.min(1, k * 1.6) * .95)}">${g}</g>`;
  for (let i = 0; i < 5; i++) { const px = x + dir * (r() - .1) * 130 * k, py = y - 20 - r() * 170 * k; g += ch4(px + Math.sin(t * 2 + i) * 5, py - ((t * 18 + i * 11) % 30), .9, Math.min(1, k * 1.5) * .95); }
  return g; }
function sceneBurp(t) {
  const st = S0(7) - .2, T = t - st, b = ramp(t, WS(7, 1) - .05, WS(7, 1) + .9), kb = ease(clamp(b * 1.4)), kg = ease(ramp(t, WS(7, 4) - .1, WS(7, 8) + .2)), cw = ease(ramp(t, WS(7, 9) - .4, WS(7, 9) + .2)), cb = ramp(t, WS(7, 10) - .1, WS(7, 10) + .9);
  let s = `<defs>${CWDEFS()}</defs>` + park(t, { trees: [[60, 940, 320, 81], [690, 930, 320, 83]], seed: 73 });
  const YX = 210, YY = 1170, YS = 1.25, burp = kb > 0 && kb < 1 ? Math.sin(b * Math.PI) : 0;
  s += cowB(560, 1110, .55 * (.9 + .1 * cw), { face: -1, t, id: 'bc', chew: t * 5 }).replace('<g transform', `<g opacity="${c1(cw)}" transform`);
  s += youB(YX, YY, { s: YS, face: 1, lookUp: .2 + .3 * burp, lean: -6 * burp, aF: [.3, -.6], aB: [.2, -.5] }, 1.05, 0, t, L => `<ellipse cx="${c1(L.hx + 17)}" cy="${c1(L.hy + 15)}" rx="${c1(2.5 + 2.5 * burp)}" ry="${c1(1.5 + 3 * burp)}" fill="#5a2a22" opacity=".7"/>`);
  const mx = YX + 32 * YS, my = YY - 290 * YS;
  s += cwGasC(mx + 30, my + 10, kb, t, 801) + cwGasC(560 - 330 * .55, 1110 - 170 * .55, ease(clamp(cb * 1.4)), t, 803, -.6);
  s += `<g opacity="${c1(ease(ramp(t, WS(7, 3) - .2, WS(7, 3) + .3)))}">${panel(410, 440, 270, 60)}${CL(545, 480, 'ميثان CH₄', 1, '#e8f4d8', 30)}</g>` + CL(545, 532, 'غازٌ لا لونَ له', ease(ramp(t, WS(7, 3), WS(7, 3) + .4)), '#cfd8e4', 22);
  if (kg > 0) s += `<g opacity="${c1(Math.min(1, kg * 4))}">${panel(40, 520, 300, 140)}<text x="190" y="600" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="#f4c76b">${cAR(Math.round(100 * kg))} كغ</text>${CL(190, 642, 'في السنة', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: 8 billion people would burp like five times the world's cows; the climate warms faster ----------
function sceneWorld(t) {
  const st = S0(8) - .2, T = t - st;
  const G = glE(t, { d: 9.6, el: .3, lon: 60 + T * 4, clouds: .4, lights: .3, tg: [0, .2, 0] });
  const pa = ease(ramp(t, WS(8, 0) - .2, WS(8, 2) + .2)), ca = ease(ramp(t, WS(8, 7) - .2, WS(8, 8) + .2)), x5 = ease(ramp(t, WS(8, 5) - .2, WS(8, 6) + .2)), ht = ease(ramp(t, WS(8, 9) - .2, WS(8, 11) + .3));
  let ov = `<defs>${CWD}</defs>`;
  // warm haze on the rim and methane rising
  if (ht > 0) ov += `<circle cx="${c1(G.c0[0])}" cy="${c1(G.c0[1])}" r="${c1(G.R * 1.35)}" fill="url(#cwHeat)" opacity="${c1(ht)}"/>`;
  // bars: people vs cattle
  const bw = 520, hp = 8, hc = 1.5, sc = bw / hp;
  ov += `<g opacity="${c1(pa)}">${panel(40, 960, 640, 260)}${CL(560, 1010, '٨ مليارات إنسان', 1, '#ffd27a', 28)}<rect x="${c1(660 - sc * hp * pa)}" y="1026" width="${c1(sc * hp * pa)}" height="40" rx="8" fill="#e85a2a"/>` +
    `<g opacity="${c1(ca)}">${CL(560, 1114, '١٫٥ مليار بقرة', 1, '#e8e2d6', 26)}<rect x="${c1(660 - sc * hc * ca)}" y="1130" width="${c1(sc * hc * ca)}" height="40" rx="8" fill="#e8e2d6"/></g>` +
    `<g opacity="${c1(x5)}"><text x="200" y="1150" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#f4c76b">× ٥</text></g></g>`;
  // the thermometer
  if (ht > 0) ov += `<g opacity="${c1(ht)}" transform="translate(84,790)"><rect x="-22" y="-150" width="44" height="210" rx="22" fill="#0a0e1c" opacity=".85"/><rect x="-9" y="-136" width="18" height="170" rx="9" fill="#2a3240"/><rect x="-9" y="${c1(34 - 170 * lerp(.35, .85, ht))}" width="18" height="${c1(170 * lerp(.35, .85, ht))}" rx="9" fill="url(#cwTher)"/><circle cy="54" r="22" fill="#e53935"/><circle cx="-6" cy="48" r="6" fill="#fff" opacity=".4"/></g>` + CL(110, 900, 'المناخُ يسخن', ht, '#ff9a7a', 24);
  F.ov = ov; return space(t);
}
// ---------- 9: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  const k = ease(ramp(t, S0(9) - .2, S0(9) + 1.6)), lonT = 60 + (t - (S0(8) - .2)) * 4;
  glE(t, { d: lerp(9.6, 9.8, k), el: lerp(.3, .32, k), lon: lerp(lonT, 70 + (t - S0(9)) * 2, k), clouds: lerp(.4, .45, k), lights: lerp(.3, .4, k), tg: [0, lerp(.2, .64, k), 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 8) - .3, WS(9, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneParts }, { s: S0(2) - .2, f: sceneSize }, { s: S0(3) - .2, f: sceneBelly }, { s: S0(4) - .2, f: sceneMicro },
  { s: S0(5) - .2, f: scenePark }, { s: WS(5, 7) - .25, f: sceneGrass }, { s: S0(6) - .2, f: sceneCud }, { s: S0(7) - .2, f: sceneBurp }, { s: S0(8) - .2, f: sceneWorld }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneParts, sceneSize, sceneMicro, sceneGrass, sceneWorld]);
const XF = .5;
const TLI = [['الأجزاء', S0(1)], ['الحجم', S0(2)], ['الهضم', S0(4)], ['العشب', S0(5)], ['المضغ', S0(6)], ['الميثان', S0(7)]];
const LIST_ON = new Set([sceneBelly, scenePark]);
const CHIPS = [
  ['c0', 'معدةُ بقرة', 360, 330, 'big', WS(0, 4), S0(1) - .3],
  ['c1', '٤ أجزاء', 360, 330, 'big', WS(1, 2), S0(2) - .3],
  ['c2', '١٥٠ لتراً ≈ برميل', 360, 330, 'big', WS(2, 5), S0(3) - .3],
  ['c3', 'بطنٌ بحجمِ برميل', 360, 330, 'red big', WS(3, 2), S0(4) - .3],
  ['c4', 'تهضمُ السِّليلوز', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c5', 'العشبُ طعامُك', 360, 330, 'big', WS(5, 1), WS(5, 7) - .25],
  ['c5b', '≈ ٤٠٪ من اليابسة', 360, 330, 'big', WS(5, 10), S0(6) - .3],
  ['c6', '≈ ٨ ساعاتٍ مضغاً يومياً', 360, 330, 'big', WS(6, 10), S0(7) - .3],
  ['c7', '≈ ١٠٠ كغ ميثان سنوياً', 360, 330, 'red big', WS(7, 4), S0(8) - .3],
  ['c8', '× ٥ أبقارِ العالم', 360, 330, 'red big', WS(8, 4), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">معدةُ بقرة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
