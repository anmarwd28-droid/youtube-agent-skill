// hair_a.js (#90): what if your hair grew 100 times faster? Built on the #89 chain (streetD, hero, heroX, glE/gW, treeR, studio, sun3, cumulus, farCity).
const h1 = v => (+v).toFixed(1);
const hAR = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const HRL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
// hair colours: [deep shadow, base, light, sheen]
const HRC = { br: ['#24140a', '#4a2c18', '#7e5030', '#c08a56'], bk: ['#0a0807', '#1c1612', '#3c322a', '#7a6a5e'], au: ['#34120a', '#6a2814', '#a04a24', '#e08a54'], bl: ['#5a4020', '#9a7640', '#cca468', '#f2dca6'], gr: ['#3a3a3c', '#6e6c6a', '#a8a6a2', '#e4e2de'] };
const HRD = `<linearGradient id="hrSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b49a"/><stop offset="1" stop-color="#d89a84"/></linearGradient>
<linearGradient id="hrDerm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c8b6"/><stop offset="1" stop-color="#e4ac9a"/></linearGradient>
<linearGradient id="hrAir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2a40"/><stop offset="1" stop-color="#2e4462"/></linearGradient>
<linearGradient id="hrShaft" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e120a"/><stop offset=".35" stop-color="#5a3620"/><stop offset=".55" stop-color="#9a6a44"/><stop offset="1" stop-color="#2a180c"/></linearGradient>
<radialGradient id="hrBulb" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#7a4a30"/><stop offset="1" stop-color="#3a2014"/></radialGradient>
<radialGradient id="hrPap" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ff8a8a"/><stop offset="1" stop-color="#b83a44"/></radialGradient>
<radialGradient id="hrFat" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#e8c470"/></radialGradient>
<linearGradient id="hrWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8d0c0"/><stop offset="1" stop-color="#b8ae9c"/></linearGradient>
<linearGradient id="hrWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c89a5a"/><stop offset=".5" stop-color="#e8c48a"/><stop offset="1" stop-color="#b8864a"/></linearGradient>
<linearGradient id="hrSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa4ae"/><stop offset=".45" stop-color="#6a747e"/><stop offset="1" stop-color="#3a424a"/></linearGradient>
<linearGradient id="hrBrass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a2a"/><stop offset=".4" stop-color="#f0d27a"/><stop offset=".6" stop-color="#d8b050"/><stop offset="1" stop-color="#7a5a1e"/></linearGradient>
<linearGradient id="hrEl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
<linearGradient id="hrSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a74ba"/><stop offset=".65" stop-color="#9cc4e6"/><stop offset="1" stop-color="#eee6cc"/></linearGradient>
<linearGradient id="hrFac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".18"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
<linearGradient id="hrBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4c76b"/><stop offset="1" stop-color="#e8a03a"/></linearGradient>
<linearGradient id="hrLobeR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<linearGradient id="hrLobeL" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
<radialGradient id="hrGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4c8" stop-opacity=".8"/><stop offset=".5" stop-color="#f4c76b" stop-opacity=".25"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>`;
const HRDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${HIDEF2}${CBDEF}${SCDEF}${HRD}`;
const hrSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
function hrSmooth(P) {
  if (!P || P.length < 2) return ''; let d = `M${h1(P[0][0])},${h1(P[0][1])}`;
  for (let i = 1; i < P.length - 1; i++) d += ` Q${h1(P[i][0])},${h1(P[i][1])} ${h1((P[i][0] + P[i + 1][0]) / 2)},${h1((P[i][1] + P[i + 1][1]) / 2)}`;
  const l = P[P.length - 1]; return d + ` L${h1(l[0])},${h1(l[1])}`;
}
// layered strands: deep shadow lock, base strand, light strand, broken sheen
function hrDraw(S, C, w = 1) {
  let a = '', b = '', c = '', d = '';
  S.forEach(({ P, r }, i) => { const p = hrSmooth(P); if (!p) return; const pb = P.length > 6 ? hrSmooth(P.slice(0, Math.floor(P.length * .82))) : p;
    a += `<path d="${pb}" stroke="${C[0]}" stroke-width="${h1((4 + r() * 2) * w)}" opacity=".8"/><path d="${pb}" stroke="${mix(C[0], C[1], .5)}" stroke-width="${h1((2.8 + r() * 1.4) * w)}"/>`;
    b += `<path d="${p}" stroke="${C[1]}" stroke-width="${h1((1.6 + r() * 1.2) * w)}" opacity=".95"/>`;
    if (i % 2 === 0) c += `<path d="${p}" stroke="${C[2]}" stroke-width="${h1(1.3 * w)}" opacity=".8" stroke-dasharray="${h1(24 + r() * 50)} ${h1(10 + r() * 26)}" stroke-dashoffset="${h1(r() * 60)}"/>`;
    if (i % 3 === 1) d += `<path d="${p}" stroke="${C[3]}" stroke-width="${h1(.9 * w)}" opacity=".55" stroke-dasharray="${h1(10 + r() * 20)} ${h1(26 + r() * 50)}" stroke-dashoffset="${h1(r() * 40)}"/>`; });
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">${a}${b}${c}${d}</g>`;
}
// ---------- long hair in the hero() local frame (face +x, feet on y = 0). cm = hair length; hp: {col, seed, n, vol, sw (sway), ph, wind, gy (ground y)} ----------
function hrStrands(L, cm, t, hp) {
  const N = hp.n || 58, out = [], seed = hp.seed || 1, { hx, hy, ty } = L, gy = hp.gy ?? -2;
  for (let i = 0; i < N; i++) {
    const r = RS(seed * 977 + i * 13), u = Math.pow(r(), .8), th0 = lerp(-1.05, -3.4, u), rad = 1.04 + r() * .12; let thB = lerp(-2.55, -3.6, r()); if (thB > th0 - .15) thB = th0 - .15;
    let Ls = (cm * 1.85 + 22) * (.86 + .14 * r()); const P = []; let th = th0, prev = null;
    while (th > thB && Ls > 0) { const p = [hx + 20 * rad * Math.cos(th), hy + 24 * rad * Math.sin(th)]; if (prev) Ls -= Math.hypot(p[0] - prev[0], p[1] - prev[1]); P.push(p); prev = p; th -= .16; }
    if (Ls > 0 && prev) { const x0 = prev[0], y0 = prev[1], spr = (r() - .2) * (hp.vol ?? 34), lift = r() * 6, gyo = r() * 9, ph = r() * 6.28; let xg = null, dg = 0;
      for (let d = 6; d <= Ls + 6; d += 7) { const dd = Math.min(d, Ls); let y = y0 + dd, x = x0 - 2 - lift * Math.min(1, dd / 30) - spr * Math.sqrt(Math.min(1, dd / 160)) - (hp.wind || 0) * dd * .4 + 2.5 * Math.sin(dd * .045 + ph) + (hp.sw || 0) * Math.sin((hp.ph || 0) + t * 2.2 - dd * .02 + ph * .2) * Math.min(1, dd / 90);
        x = Math.min(x, lerp(hx - 17, -28, clamp((y - (ty - 14)) / 26)));
        if (y > gy) { if (xg == null) { xg = x; dg = dd; } const o = dd - dg; x = xg - o * .96 + Math.sin(o * .05 + ph) * 3 - (r() - .5) * 0; y = gy - 1 - gyo - Math.abs(Math.sin(o * .03 + ph)) * 2.5; }
        P.push([x, y]); if (dd >= Ls) break; } }
    out.push({ P, r: RS(seed * 31 + i) });
  }
  return out;
}
const hrBack = (L, cm, t, C, hp) => hrDraw(hrStrands(L, cm, t, hp), C, hp.w || 1);
// the crown: strands that follow the scalp over the top and back of the head (drawn over the head, never over the face)
function hrCrown(L, cm, t, C, hp) {
  const { hx, hy } = L, r = RS(400 + (hp.seed || 1)), S = [], k = clamp(cm / 8);
  const shell = `M${h1(hx + 20 * .86 * Math.cos(-1.05))},${h1(hy + 24 * .86 * Math.sin(-1.05))}` + Array.from({ length: 16 }, (_, i) => { const th = lerp(-1.05, -3.45, i / 15); return ` L${h1(hx + 20 * (1.06 + .03 * k) * Math.cos(th))},${h1(hy + 24 * (1.06 + .03 * k) * Math.sin(th))}`; }).join('') +
    Array.from({ length: 16 }, (_, i) => { const th = lerp(-3.45, -1.05, i / 15); return ` L${h1(hx + 20 * .84 * Math.cos(th))},${h1(hy + 24 * .84 * Math.sin(th))}`; }).join('') + 'Z';
  for (let i = 0; i < 20; i++) { const rad = .86 + r() * .26, a0 = -1.0 - r() * .4, a1 = -3.0 - r() * .45, P = [];
    for (let q = 0; q <= 12; q++) { const th = lerp(a0, a1, q / 12); P.push([hx + 20 * rad * Math.cos(th), hy + 24 * rad * Math.sin(th)]); } S.push({ P, r: RS(500 + i) }); }
  // sheen band on the crown
  const sh = `<path d="M${h1(hx + 20 * 1.02 * Math.cos(-1.5))},${h1(hy + 24 * 1.02 * Math.sin(-1.5))} A${h1(20 * 1.02)},${h1(24 * 1.02)} 0 0 0 ${h1(hx + 20 * 1.02 * Math.cos(-2.5))},${h1(hy + 24 * 1.02 * Math.sin(-2.5))}" stroke="${C[3]}" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>`;
  return `<path d="${shell}" fill="${C[1]}"/>` + hrDraw(S, C, .5) + sh;
}
// a beard that grows with cm (roots along the jaw and chin, plus a moustache), drawn over the chest
function hrBeard(L, cm, t, C, hp) {
  const { hx, hy } = L, r = RS(77 + (hp.seed || 0)), S = [], len = cm * 2.0;
  const base = `<path d="M${hx - 13},${hy + 2} C${hx - 6},${hy + 12} ${hx + 6},${hy + 14} ${hx + 13},${hy + 11} L${hx + 20},${hy + 12} C${hx + 21},${hy + 18} ${hx + 18},${hy + 24} ${hx + 10},${hy + 26} C${hx},${hy + 27} ${hx - 10},${hy + 20} ${hx - 13},${hy + 2}Z" fill="${C[1]}"/>`;
  for (let i = 0; i < 26; i++) { const q = i / 25, rx = lerp(hx - 11, hx + 18, q), ry = lerp(hy + 8, hy + 22, Math.sqrt(q)), Ls = Math.max(4, len * (.7 + .3 * r()) * (.5 + .5 * Math.sin(q * 2.6 + .3))), P = [[rx, ry]];
    for (let d = 5; d <= Ls; d += 5) P.push([rx + (q - .35) * d * .14 + Math.sin(d * .07 + i) * 1.4 + (hp.sw || 0) * .5 * Math.sin(t * 2 + d * .03) * Math.min(1, d / 40), ry + d]);
    S.push({ P, r: RS(700 + i) }); }
  const mo = `<path d="M${hx + 12},${hy + 11} Q${hx + 18},${hy + 9} ${hx + 22},${hy + 14}" stroke="${C[0]}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  return base + hrDraw(S, C, .62) + mo;
}
// the house person with long hair: hero() + back hair behind everything + crown and beard over the head
function hrHero(x, y, o, cm, t, hp = {}) {
  const C = HRC[hp.col || 'br'], P = Object.assign({ shade: 1 }, YOU, o, { hair: C[1] }), tilt = -16 * (P.lookUp || 0); let LL = null;
  const g = heroX(x, y, P, L => { LL = L; return `<g transform="rotate(${h1(tilt)},${L.hx},${L.hy + 14})">${hrCrown(L, cm, t, C, hp)}</g>` + (hp.beard ? hrBeard(L, hp.beard, t, C, hp) : '') + (hp.mid ? hp.mid(L) : ''); }, hp.end);
  const m0 = g.match(/^<g transform="([^"]+)">/), lean = P.lean || 0;
  return `<g transform="${m0[1]}"><g transform="rotate(${h1(lean)},0,${h1(LL.hipY)})">${hrBack(LL, cm, t, C, hp)}</g></g>` + g;
}
// a barber pole (international sign of a barber shop), stripes moving
function hrPole(x, y, h, t) { let st = ''; for (let k = -6; k < 10; k++) { const yy = y - h + ((k * 18 + t * 30) % 288) - 20; st += `<path d="M${x - 9},${h1(yy)} L${x + 9},${h1(yy - 12)} L${x + 9},${h1(yy - 4)} L${x - 9},${h1(yy + 8)}Z" fill="${k % 2 ? '#d83a3a' : '#2a5aa8'}"/>`; }
  return `<rect x="${x - 3}" y="${y - h - 18}" width="6" height="10" fill="#8a8a90"/><ellipse cx="${x}" cy="${y - h - 6}" rx="11" ry="7" fill="#d8d8de"/><clipPath id="hrPc${x}"><rect x="${x - 9}" y="${y - h}" width="18" height="${h}" rx="4"/></clipPath><rect x="${x - 9}" y="${y - h}" width="18" height="${h}" rx="4" fill="#f4f4f4"/><g clip-path="url(#hrPc${x})">${st}</g><rect x="${x - 9}" y="${y - h}" width="18" height="${h}" rx="4" fill="url(#hrFac)"/><rect x="${x - 5}" y="${y - h}" width="3" height="${h}" fill="#fff" opacity=".45"/><ellipse cx="${x}" cy="${y + 4}" rx="11" ry="7" fill="#d8d8de"/>`; }
// scissors (open/close k 0..1)
function hrSciss(x, y, s, k, a = 0) { const o = 14 * (1 - k);
  const blade = sg => `<g transform="rotate(${h1(sg * o)})"><path d="M0,0 L70,${-sg * 4} Q78,${-sg * 2} 70,${sg * 3} L0,${sg * 6}Z" fill="#cfd6de" stroke="#6a727a" stroke-width="1.5"/><path d="M0,${sg * 2} L66,${-sg * 2}" stroke="#fff" stroke-width="1.4" opacity=".7"/><path d="M0,0 L-26,${sg * 18}" stroke="#2a2a30" stroke-width="7" stroke-linecap="round"/><ellipse cx="-36" cy="${sg * 26}" rx="15" ry="11" fill="none" stroke="#e53935" stroke-width="6"/></g>`;
  return `<g transform="translate(${h1(x)},${h1(y)}) rotate(${a}) scale(${s})">${blade(1)}${blade(-1)}<circle r="4" fill="#4a4a50"/></g>`; }
function hrBrush(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s}) rotate(-20)"><rect x="-70" y="-7" width="110" height="14" rx="7" fill="#3a9ad8"/><rect x="-66" y="-4" width="60" height="4" rx="2" fill="#fff" opacity=".45"/><rect x="40" y="-9" width="36" height="8" rx="3" fill="#e8eef4"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${42 + i * 4.5},-9 v-18" stroke="${i % 2 ? '#fff' : '#9ad4ff'}" stroke-width="3" stroke-linecap="round"/>`).join('') + `</g>`; }
// ---------- a skin cross-section with a follicle and a hair shaft; surface at y = 0; shaft = length above the skin in px; fall 0..1 (the shaft is shed) ----------
function hrFoll(t, o = {}) {
  const sh = o.shaft || 0, fl = o.fall || 0, W = o.w || 600, x0 = -W / 2, x1 = W / 2;
  let g = `<rect x="${x0}" y="-430" width="${W}" height="430" fill="url(#hrAir)"/>`;
  // skin layers: epidermis, dermis with collagen and capillaries, fat
  const surf = `M${x0},0 ` + Array.from({ length: 31 }, (_, i) => `L${h1(x0 + i * W / 30)},${h1(Math.sin(i * 1.3) * 2.5)}`).join(' ');
  g += `<path d="${surf} L${x1},420 L${x0},420Z" fill="url(#hrDerm)"/><path d="${surf} L${x1},34 L${x0},34Z" fill="url(#hrSkin)"/><path d="M${x0},34 ` + Array.from({ length: 31 }, (_, i) => `L${h1(x0 + i * W / 30)},${h1(34 + Math.sin(i * 2.1) * 6)}`).join(' ') + `" stroke="#a86a5a" stroke-width="3" fill="none" opacity=".6"/>`;
  const r = RS(9); for (let i = 0; i < 46; i++) { const x = x0 + r() * W, y = 60 + r() * 200, a = r() * 3.1; g += `<path d="M${h1(x)},${h1(y)} q${h1(Math.cos(a) * 20)},${h1(Math.sin(a) * 8 - 6)} ${h1(Math.cos(a) * 40)},${h1(Math.sin(a) * 14)}" stroke="#d89a8a" stroke-width="2" fill="none" opacity=".55"/>`; }
  g += `<path d="M${x0},150 C${x0 + 120},120 ${x0 + 200},190 ${x0 + 330},150 S${x1 - 80},120 ${x1},160" stroke="#d84a4a" stroke-width="5" fill="none" opacity=".7"/><path d="M${x0},230 C${x0 + 160},250 ${x0 + 300},200 ${x1},240" stroke="#5a6ad0" stroke-width="5" fill="none" opacity=".55"/>`;
  for (let i = 0; i < 18; i++) { const x = x0 + 20 + (i % 9) * W / 9 + (r() - .5) * 20, y = 300 + Math.floor(i / 9) * 62 + r() * 10, rr = 30 + r() * 8; g += `<circle cx="${h1(x)}" cy="${h1(y)}" r="${h1(rr)}" fill="url(#hrFat)" stroke="#c8a050" stroke-width="2"/>`; }
  g += `<rect x="${x0}" y="0" width="${W}" height="420" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  // follicles: [x at the surface, depth, angle, shaft above the skin, main]
  const F = o.foll || [[-200, 210, .12, sh * .7, 0], [0, 250, .1, sh, 1], [200, 200, .14, sh * .85, 0]];
  F.forEach(([fx, dep, an, sl, main]) => { const bx = fx - Math.sin(an) * dep, by = Math.cos(an) * dep, sc = main ? 1 : .8;
    g += `<path d="M${h1(fx - 14 * sc)},2 L${h1(bx - 18 * sc)},${h1(by - 30)} Q${h1(bx - 26 * sc)},${h1(by + 4)} ${h1(bx)},${h1(by + 20 * sc)} Q${h1(bx + 26 * sc)},${h1(by + 4)} ${h1(bx + 18 * sc)},${h1(by - 30)} L${h1(fx + 14 * sc)},2Z" fill="#c88a78" stroke="#9a5a4a" stroke-width="2"/>` +
      `<ellipse cx="${h1(bx - 22 * sc)}" cy="${h1(dep * .32)}" rx="${h1(16 * sc)}" ry="${h1(24 * sc)}" fill="#f4e2a8" stroke="#c8a860" stroke-width="2" transform="rotate(${h1(an * 57)},${h1(bx - 22 * sc)},${h1(dep * .32)})"/>` +
      `<path d="M${h1(bx + 16 * sc)},${h1(by - 60)} L${h1(fx + 60 * sc)},${h1(40)}" stroke="#d87a7a" stroke-width="${h1(7 * sc)}" stroke-linecap="round" opacity=".55"/>` +
      `<path d="M${h1(bx - 16 * sc)},${h1(by - 4)} Q${h1(bx)},${h1(by + 26 * sc)} ${h1(bx + 16 * sc)},${h1(by - 4)} Q${h1(bx)},${h1(by - 20)} ${h1(bx - 16 * sc)},${h1(by - 4)}Z" fill="url(#hrBulb)"/><ellipse cx="${h1(bx)}" cy="${h1(by + 4)}" rx="${h1(8 * sc)}" ry="${h1(9 * sc)}" fill="url(#hrPap)"/>`;
    // the shaft inside the skin and above it
    const fall = main ? fl : 0, dy = -fall * 330, rot = -fall * 22;
    const inn = `<path d="M${h1(bx)},${h1(by - 10)} L${h1(fx)},0" stroke="#3a2214" stroke-width="${h1(9 * sc)}" stroke-linecap="round"/>`;
    const top = sl > 0 ? (() => { const tx = fx + Math.sin(an) * sl * .4 + Math.sin(sl * .004) * 8, ty = -sl; let cu = ''; for (let k = 18; k < sl; k += 16) { const q = k / sl, cx = lerp(fx, tx, q), cy = lerp(0, ty, q); cu += `<path d="M${h1(cx - 4 * sc)},${h1(cy + 3)} L${h1(cx)},${h1(cy)} L${h1(cx + 4 * sc)},${h1(cy + 3)}" stroke="#c8966a" stroke-width="1" fill="none" opacity=".55"/>`; }
      return `<path d="M${fx},0 Q${h1(lerp(fx, tx, .5) + 6)},${h1(ty * .5)} ${h1(tx)},${h1(ty)}" stroke="#2a180c" stroke-width="${h1(10 * sc)}" fill="none" stroke-linecap="round"/><path d="M${fx},0 Q${h1(lerp(fx, tx, .5) + 6)},${h1(ty * .5)} ${h1(tx)},${h1(ty)}" stroke="#8a5a36" stroke-width="${h1(3.5 * sc)}" fill="none" stroke-linecap="round" opacity=".8" transform="translate(-2,0)"/>${cu}`; })() : '';
    g += fall > 0 ? `<g opacity="${h1(1 - fall * .85)}" transform="translate(${h1(-fall * 90)},${h1(dy)}) rotate(${h1(rot)},${fx},0)">${inn}${top}</g>` : inn + top;
    if (main && o.newHair) g += `<path d="M${h1(bx)},${h1(by - 10)} L${h1(lerp(bx, fx, o.newHair))},${h1(lerp(by - 10, 0, o.newHair))}" stroke="#4a2c18" stroke-width="7" stroke-linecap="round"/>`; });
  return g;
}
// a better elephant (African, side view; local frame faces +x, feet on y = 0, about 300 units at the shoulder)
function hrEleph(x, y, s, f = 1, t = 0) {
  const C = '#8c8780', D = '#6e6962', ears = Math.sin(t * 1.6) * 4;
  const leg = (lx, c, w = 56) => `<path d="M${lx - w / 2},-170 C${lx - w / 2 - 4},-100 ${lx - w / 2 + 2},-40 ${lx - w / 2 - 2},-4 Q${lx},4 ${lx + w / 2 + 2},-4 C${lx + w / 2 - 2},-40 ${lx + w / 2 + 4},-100 ${lx + w / 2},-170Z" fill="${c}"/>` + [0, 1, 2].map(k => `<path d="M${lx - w / 2 + 4 + k * 16},-4 q6,-7 12,0" fill="#d8d2c4" opacity=".7"/>`).join('') + [0, 1, 2, 3].map(k => `<path d="M${lx - w / 2 + 2},${-40 - k * 26} q${w / 2},6 ${w - 4},0" stroke="#000" stroke-width="1.6" fill="none" opacity=".18"/>`).join('');
  let g = `<ellipse cx="0" cy="2" rx="240" ry="16" fill="#000" opacity=".3" filter="url(#blur5)"/>` + leg(-120, D) + leg(110, D);
  const body = `M-200,-150 C-214,-230 -170,-292 -60,-300 C20,-306 90,-318 140,-300 C190,-282 200,-220 186,-160 C176,-120 140,-104 80,-102 C20,-96 -60,-98 -130,-104 C-176,-110 -196,-126 -200,-150Z`;
  g += `<path d="M-196,-200 C-214,-170 -218,-130 -212,-96" stroke="${D}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-214,-100 l-6,22 l12,-2 l4,-20Z" fill="#2a2622"/>`;
  g += `<clipPath id="hrEb${Math.round(x)}"><path d="${body}"/></clipPath><path d="${body}" fill="${C}"/><g clip-path="url(#hrEb${Math.round(x)})"><rect x="-220" y="-330" width="430" height="240" fill="url(#hrEl)"/><rect x="-220" y="-330" width="430" height="240" fill="#000" filter="url(#grainR)" opacity=".22"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${-170 + i * 36},-118 q10,-40 -2,-80" stroke="#000" stroke-width="1.8" fill="none" opacity=".14"/>`).join('') + `</g>`;
  g += leg(-90, C, 60) + leg(130, C, 60);
  // head, trunk, tusk, ear, eye
  g += `<path d="M150,-300 C200,-320 250,-300 262,-250 C270,-216 262,-190 250,-170 C246,-120 250,-70 262,-30 C266,-16 280,-10 290,-14 C298,-18 300,-6 288,0 C266,6 246,-8 238,-30 C224,-70 216,-120 214,-160 C190,-170 168,-196 160,-230Z" fill="${C}"/>` +
    Array.from({ length: 11 }, (_, i) => `<path d="M${226 + i * 2},${-150 + i * 13} q14,3 26,-2" stroke="#000" stroke-width="1.6" fill="none" opacity=".2"/>`).join('') +
    `<path d="M236,-176 C262,-170 290,-180 304,-200 C296,-186 276,-176 250,-168Z" fill="#f2ead8" stroke="#b8ac94" stroke-width="1.5"/>` +
    `<path d="M${120 + ears * .3},-296 C${70 + ears},-300 ${40 + ears},-250 ${46 + ears},-200 C${52 + ears},-150 ${88 + ears},-120 ${130 + ears * .4},-128 C${150},-150 ${172},-200 ${176},-250 C${172},-280 ${150},-298 ${120 + ears * .3},-296Z" fill="${D}"/>` +
    `<path d="M${118 + ears * .3},-284 C${80 + ears},-284 ${58 + ears},-246 ${62 + ears},-204 C${66 + ears},-162 ${94 + ears},-140 ${126},-144" stroke="#a8a098" stroke-width="2.5" fill="none" opacity=".5"/>` +
    [0, 1, 2].map(k => `<path d="M${90 + k * 18 + ears * .6},-270 q${-8 + k * 3},50 ${4 + k * 4},120" stroke="#000" stroke-width="1.6" fill="none" opacity=".18"/>`).join('') +
    `<ellipse cx="222" cy="-238" rx="5" ry="4" fill="#1a1410"/><path d="M212,-246 q10,-6 20,0" stroke="#000" stroke-width="1.5" fill="none" opacity=".4"/><path d="M160,-300 C200,-318 240,-306 256,-276" stroke="#fff" stroke-width="4" fill="none" opacity=".18" stroke-linecap="round"/>`;
  return `<g transform="translate(${h1(x)},${h1(y)}) scale(${h1(f * s * 100) / 100},${h1(s * 100) / 100})">${g}</g>`;
}
// a hanging braid between two points (three plaited strands)
function hrBraid(x0, y0, x1, y1, w, C, t) {
  const n = Math.max(6, Math.round(Math.hypot(x1 - x0, y1 - y0) / (w * 1.15))), dx = (x1 - x0) / n, dy = (y1 - y0) / n; let g = `<path d="M${h1(x0)},${h1(y0)} L${h1(x1)},${h1(y1)}" stroke="${C[0]}" stroke-width="${h1(w * .55)}" stroke-linecap="round"/>`;
  for (let i = 0; i < n; i++) { const cx = x0 + dx * (i + .5), cy = y0 + dy * (i + .5), sg = i % 2 ? 1 : -1, ww = w * (i > n - 3 ? .85 : 1), r = RS(880 + i);
    const lobe = `M${h1(cx - sg * ww * .52)},${h1(cy - dy * .75)} C${h1(cx + sg * ww * .62)},${h1(cy - dy * .45)} ${h1(cx + sg * ww * .62)},${h1(cy + dy * .25)} ${h1(cx - sg * ww * .05)},${h1(cy + dy * .78)} C${h1(cx - sg * ww * .42)},${h1(cy + dy * .2)} ${h1(cx - sg * ww * .58)},${h1(cy - dy * .3)} ${h1(cx - sg * ww * .52)},${h1(cy - dy * .75)}Z`;
    g += `<path d="${lobe}" fill="${C[1]}"/><path d="${lobe}" fill="url(#hrLobe${sg > 0 ? 'R' : 'L'})"/>` +
      Array.from({ length: 7 }, (_, k) => { const q = (k + .5) / 7 - .5; return `<path d="M${h1(cx - sg * ww * (.5 - q * .3))},${h1(cy - dy * (.7 - q * .1))} Q${h1(cx + sg * ww * (.42 + q * .1))},${h1(cy - dy * .05)} ${h1(cx - sg * ww * (.02 - q * .25))},${h1(cy + dy * (.72 - Math.abs(q) * .2))}" stroke="${k % 3 === 0 ? C[3] : k % 3 === 1 ? C[2] : C[0]}" stroke-width="${k % 3 === 0 ? 1.1 : 1.4}" fill="none" opacity="${k % 3 === 0 ? .55 : .7}"/>`; }).join('') +
      `<path d="${lobe}" fill="none" stroke="${C[0]}" stroke-width="1.2" opacity=".55"/>` + (r() < .4 ? `<path d="M${h1(cx + sg * ww * .45)},${h1(cy - dy * .1)} q${h1(sg * 10)},${h1(dy * .2)} ${h1(sg * 6)},${h1(dy * .6)}" stroke="${C[2]}" stroke-width=".9" fill="none" opacity=".7"/>` : ''); }
  return g + `<rect x="${h1(x1 - w * .32)}" y="${h1(y1 - 8)}" width="${h1(w * .64)}" height="12" rx="5" fill="#c83a3a"/><rect x="${h1(x1 - w * .32)}" y="${h1(y1 - 8)}" width="${h1(w * .64)}" height="4" rx="2" fill="#fff" opacity=".3"/>`;
}
// ---------- streets of this video ----------
const HRBLK = [[-14, 160, 450, '#a8846a', 901, 1], [146, 150, 520, '#6e8a9a', 902, 0], [296, 160, 410, '#d4c09a', 903, 2], [456, 140, 480, '#8a6a7e', 904, 1], [596, 160, 430, '#7a9a7a', 905, 0]];
const HRSHOP = [[-4, 140, 'صيدلية', '#2a7a5a'], [146, 140, 'مخبز', '#8a5a2a'], [306, 130, 'حلّاق', '#2a4a8a'], [456, 130, 'ملابس', '#7a3a5a'], [606, 140, 'مقهى', '#5a3a2a']];
const HRBLK2 = [[-14, 150, 500, '#c09a78', 911, 0], [136, 160, 430, '#5e7488', 912, 1], [296, 150, 470, '#cdbb98', 913, 2], [446, 150, 520, '#8e6e5e', 914, 0], [596, 160, 450, '#6a8a7e', 915, 1]];
const HRSHOP2 = [[-4, 140, 'حلّاق', '#2a4a8a'], [146, 140, 'كتب', '#5a3a2a'], [306, 130, 'حلّاق', '#2a4a8a'], [456, 130, 'فواكه', '#3a7a3a'], [606, 140, 'حلّاق', '#2a4a8a']];
// ---------- 0: hook: your hair suddenly grows 100 times faster ----------
function sceneHook(t) {
  const k = ease(ramp(t, .5, 3.3)), cm = lerp(5, 62, k), YX = 300, YY = 1094, YS = 1.38;
  const L = [];
  L.push([YY, hrHero(YX, YY, { s: YS, face: 1, lookUp: .08, aF: [.25, .5], aB: [-.2, .3] }, cm, t, { col: 'br', seed: 3, sw: 1.5 + 3 * k, vol: 30 })]);
  L.push([1040, hrHero(640 - 26 * t, 1040, Object.assign({ s: .78, face: -1, walk: t * 2.2, amp: .45 }, gp(1)), lerp(4, 50, k), t, { col: 'bk', seed: 7, sw: 3, ph: t * 2.2 })]);
  let s = `<defs>${HRDEFS()}</defs><g transform="translate(360,1060) scale(1.08) translate(-360,-1060)">` + streetD(t, { id: 'hh', blocks: HRBLK, shops: HRSHOP, top: hrSort(L) }) + `</g>`;
  // speed streaks along the growing hair
  if (k > 0 && k < 1) { const r = RS(5); for (let i = 0; i < 12; i++) { const x = 230 + r() * 70, y = 760 + ((t * 260 + i * 37) % 300); s += `<path d="M${h1(x)},${h1(y)} v26" stroke="#ffe9a8" stroke-width="2.5" opacity="${h1(.6 * Math.sin(k * Math.PI))}" stroke-linecap="round"/>`; } }
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: today: about 1 cm a month, less than half a millimetre a day (magnified follicle) ----------
function sceneToday(t) {
  const st = S0(1) - .2, a = ease(ramp(t, st, st + .5)), days = 30 * ease(ramp(t, WS(1, 4) - .1, WS(1, 8) + .5)), SY = 930, mm = 30, sh = (1.4 + days * .35) * mm;
  let s = `<defs>${HRDEFS()}</defs>` + studio('hrS1', '#1e3048', '#060a14', 11);
  s += `<g opacity="${h1(a)}"><defs><clipPath id="hrFc"><rect x="50" y="420" width="620" height="810" rx="26"/></clipPath></defs><g clip-path="url(#hrFc)"><g transform="translate(360,${SY})">${hrFoll(t, { shaft: sh, w: 640 })}</g></g><rect x="50" y="420" width="620" height="810" rx="26" fill="none" stroke="#f4c76b" stroke-width="5"/>`;
  // the ruler beside the main shaft
  let ru = `<rect x="402" y="${SY - 13 * mm}" width="44" height="${13 * mm + 4}" rx="4" fill="#f2eee2" opacity=".92"/>`;
  for (let k = 0; k <= 13; k++) ru += `<path d="M402,${SY - k * mm} h${k % 5 ? 12 : 22}" stroke="#2a2a30" stroke-width="${k % 5 ? 1.6 : 2.6}"/>`;
  s += ru + HRL(500, SY - 10 * mm + 9, '١ سم', 1, '#f4c76b', 26) + HRL(500, SY - 5 * mm + 9, '٥ مم', 1, '#fff', 22) + HRL(590, 458, 'مكبَّر', 1, '#cfd8e4', 22) + `</g>`;
  // the day counter
  s += `<g opacity="${h1(a)}">${panel(80, 440, 180, 120)}${HRL(170, 490, 'اليوم', 1, '#cfd8e4', 24)}<text x="170" y="542" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="48" fill="#f4c76b">${hAR(Math.round(days))}</text></g>`;
  // one day's growth on the tip
  const da = ease(ramp(t, WS(1, 9) - .2, WS(1, 9) + .3));
  if (da > 0) { const tipY = SY - sh, tx = 360 + Math.sin(.1) * sh * .4 + Math.sin(sh * .004) * 8;
    s += `<g opacity="${h1(da)}"><circle cx="${h1(tx)}" cy="${h1(tipY + 6)}" r="30" fill="url(#hrGlow)"/><path d="M${h1(tx)},${h1(tipY)} l0,${h1(.35 * mm)}" stroke="#f4c76b" stroke-width="12" stroke-linecap="round"/><path d="M${h1(tx - 18)},${h1(tipY + 5)} L${h1(tx - 120)},${h1(tipY + 40)}" stroke="#f4c76b" stroke-width="2.5"/>${panel(tx - 300, tipY + 14, 190, 96)}${HRL(tx - 205, tipY + 54, 'يومٌ واحد', 1, '#fff', 24)}${HRL(tx - 205, tipY + 92, '< ٠٫٥ مم', 1, '#f4c76b', 28)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: x100: 4 cm a day, the shoulders in a week (growth wall and a day counter) ----------
function hrWall(t) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#hrWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<rect x="-20" y="1180" width="760" height="120" fill="#7a5a3e"/><rect x="-20" y="1180" width="760" height="120" fill="#000" filter="url(#grainR)" opacity=".3"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 96 - 20},1180 l-30,120" stroke="#5a3e28" stroke-width="2"/>`).join('') + `<rect x="-20" y="1168" width="760" height="14" fill="#efe8da"/><rect x="-20" y="1180" width="760" height="10" fill="#000" opacity=".2"/>`;
  // the growth chart strip on the wall
  s += `<rect x="560" y="420" width="70" height="760" fill="url(#hrWood)"/><rect x="560" y="420" width="70" height="760" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  for (let k = 0; k <= 40; k++) { const y = 1168 - k * 18.5; if (y < 430) break; s += `<path d="M560,${h1(y)} h${k % 5 ? 14 : 30}" stroke="#4a3018" stroke-width="${k % 5 ? 1.5 : 2.5}"/>`; }
  return s + `<ellipse cx="360" cy="1172" rx="200" ry="10" fill="#000" opacity=".18" filter="url(#blur5)"/>`;
}
function sceneDays(t) {
  const st = S0(2) - .2, d = 7 * ease(ramp(t, WS(2, 3) - .1, WS(2, 13) + .3)), cm = 3 + 4 * d, X = 300, Y = 1172, S = 1.62;
  let s = `<defs>${HRDEFS()}</defs>` + hrWall(t);
  s += hrHero(X, Y, { s: S, face: 1, lookUp: 0, aF: [.05, .25], aB: [-.05, .2] }, cm, t, { col: 'au', seed: 11, sw: .8, vol: 24 });
  // the shoulder line
  const sa = ease(ramp(t, WS(2, 10) - .3, WS(2, 11) + .2)), shY = Y + (-150 - 112 + 14) * S;
  if (sa > 0) s += `<g opacity="${h1(sa)}"><path d="M120,${h1(shY)} H520" stroke="#f4c76b" stroke-width="3" stroke-dasharray="12 8"/>${panel(50, shY - 70, 150, 54)}${HRL(125, shY - 32, 'الكتفان', 1, '#f4c76b', 26)}</g>`;
  // the x100 dial
  const xa = ease(ramp(t, st + .1, st + .5)), xk = ease(ramp(t, WS(2, 1) - .2, WS(2, 2) + .2)), an = lerp(-2.4, 2.4, xk);
  s += `<g opacity="${h1(xa)}" transform="translate(140,560)"><circle r="92" fill="#0a0e1c" opacity=".88"/><path d="M${h1(Math.sin(-2.4) * 72)},${h1(-Math.cos(-2.4) * 72)} A72,72 0 1 1 ${h1(Math.sin(2.4) * 72)},${h1(-Math.cos(2.4) * 72)}" stroke="#3a4250" stroke-width="12" fill="none"/>` +
    `<path d="M${h1(Math.sin(-2.4) * 72)},${h1(-Math.cos(-2.4) * 72)} A72,72 0 ${an > .74 ? 1 : 0} 1 ${h1(Math.sin(an) * 72)},${h1(-Math.cos(an) * 72)}" stroke="#e85a2a" stroke-width="12" fill="none"/><path d="M0,0 L${h1(Math.sin(an) * 58)},${h1(-Math.cos(an) * 58)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle r="8" fill="#f4c76b"/>` +
    `<text x="0" y="62" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#f4c76b">×${hAR(Math.max(1, Math.round(100 * xk)))}</text></g>`;
  // day counter and the daily rate
  const ca = ease(ramp(t, WS(2, 3) - .3, WS(2, 3)));
  s += `<g opacity="${h1(ca)}">${panel(470, 470, 210, 150)}${HRL(575, 516, 'اليوم', 1, '#cfd8e4', 24)}<text x="575" y="584" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="#f4c76b">${hAR(Math.max(0, Math.min(7, Math.floor(d + .02))))}</text></g>` +
    `<g opacity="${h1(ease(ramp(t, WS(2, 6) - .2, WS(2, 6) + .3)))}">${panel(456, 640, 238, 60)}${HRL(575, 680, '+٤ سم كلَّ يوم', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: a month: about 1 m; two months: you drag it on the ground ----------
function sceneMonth(t) {
  const st = S0(3) - .2, T = t - st, m1 = ease(ramp(t, st + .1, WS(3, 5) + .2)), m2 = ease(ramp(t, WS(3, 6) - .1, WS(3, 9) + .3)), cm = lerp(lerp(30, 100, m1), 235, m2);
  const x = 90 + 44 * T, y = 1086, sc = 1.0, L = [];
  L.push([y, hrHero(x, y, { s: sc, face: 1, walk: T * 2.5, amp: .42, lean: -3 }, cm, t, { col: 'bk', seed: 21, sw: 1.2, ph: T * 2.5, wind: .12, vol: 22 })]);
  [[560, 1060, -1, 3, .8, 1.3], [660, 1080, -1, 5, .84, 2.1]].forEach(([x0, yy, f, pi, s2, ph]) => { L.push([yy, hrHero(x0 + f * 24 * T, yy, Object.assign({ s: s2, face: f, walk: T * 2.2 + ph, amp: .42, lookUp: .05 }, gp(pi)), cm * .96, t, { col: pi === 3 ? 'br' : 'au', seed: 30 + pi, sw: 1.2, ph: T * 2.2 + ph, wind: .1 })]); });
  let s = `<defs>${HRDEFS()}</defs><g transform="translate(360,1060) scale(1.1) translate(-360,-1060)">` + streetD(t, { id: 'hm', blocks: HRBLK2, shops: HRSHOP2, top: hrSort(L) }) + `</g>`;
  // the length tag
  const la = ease(ramp(t, WS(3, 4) - .3, WS(3, 4) + .1)), tx = (x + 30 - 360) * 1.1 + 360;
  s += `<g opacity="${h1(la)}">${panel(tx - 100, 600, 200, 62)}${HRL(tx, 642, m2 > .5 ? 'أكثرُ من ٢ م' : '≈ ١ م', 1, '#f4c76b', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: everyone: beards too; a haircut every day like brushing your teeth ----------
function sceneAll(t) {
  const st = S0(4) - .2, T = t - st, L = [], cm = 130, bd = lerp(3, 26, ease(ramp(t, WS(4, 3) - .2, WS(4, 5) + .3)));
  // a queue at the barber's (shop 3, x 306..436)
  L.push([1050, hrHero(470, 1050, Object.assign({ s: .86, face: -1, lookUp: .02 }, gp(0)), 40, t, { col: 'bk', seed: 41, beard: bd, sw: .6 })]);
  L.push([1066, hrHero(560, 1066, Object.assign({ s: .88, face: -1 }, gp(2)), cm, t, { col: 'bl', seed: 43, sw: .7, ph: 1 })]);
  L.push([1082, hrHero(650, 1082, Object.assign({ s: .9, face: -1 }, gp(4)), cm * .9, t, { col: 'au', seed: 45, sw: .7, ph: 2 })]);
  L.push([1090, hrHero(120 + 30 * T, 1090, Object.assign({ s: .9, face: 1, walk: T * 2.3, amp: .42 }, gp(6)), 60, t, { col: 'br', seed: 47, beard: bd * .9, sw: 1, ph: T * 2.3 })]);
  L.push([1040, hrHero(230, 1040, Object.assign({ s: .8, face: 1, lookUp: .05 }, gp(3)), cm * 1.1, t, { col: 'bk', seed: 49, sw: .6 })]);
  let s = `<defs>${HRDEFS()}</defs><g transform="translate(360,1060) scale(1.08) translate(-360,-1060)">` + streetD(t, { id: 'ha', blocks: HRBLK, shops: HRSHOP, fg: hrPole(296, 990, 70, t), top: hrSort(L) }) + `</g>`;
  // the inset: every day a haircut, like brushing the teeth
  const ia = ease(ramp(t, WS(4, 6) - .2, WS(4, 6) + .3));
  if (ia > 0) { const snip = .5 + .5 * Math.sin(t * 9); let cal = '';
    for (let i = 0; i < 14; i++) { const cx = 70 + (i % 7) * 40, cy = 520 + Math.floor(i / 7) * 44, on = t > WS(4, 7) + i * .12; cal += `<rect x="${cx - 16}" y="${cy - 16}" width="32" height="32" rx="5" fill="${on ? '#f4c76b' : '#2a3242'}"/>` + (on ? `<path d="M${cx - 8},${cy} l6,7 l11,-13" stroke="#1a1410" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : ''); }
    s += `<g opacity="${h1(ia)}">${panel(40, 440, 300, 170)}${HRL(190, 484, 'كلَّ يوم', 1, '#f4c76b', 28)}${cal}</g>`;
    const ba = ease(ramp(t, WS(4, 12) - .3, WS(4, 12) + .2));
    s += `<g opacity="${h1(ia)}">${panel(380, 440, 300, 170)}${hrSciss(500, 525, .9, snip, -20)}<g opacity="${h1(ba)}">${HRL(600, 540, '=', 1, '#fff', 40)}${hrBrush(640, 535, .55)}</g>${HRL(530, 596, ba > .5 ? 'مثلَ تنظيفِ الأسنان' : 'قصُّ الشعر', 1, '#fff', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: 100,000 keratin hairs take about a third of your daily protein ----------
function hrHelix(x, y, h, a, t) { let g = ''; for (let k = 0; k < 2; k++) { let P = []; for (let i = 0; i <= 60; i++) { const q = i / 60, yy = y + q * h, xx = x + Math.sin(q * 18 + k * Math.PI + t * 2) * 22; P.push([xx, yy]); }
    g += `<path d="${hrSmooth(P)}" stroke="${k ? '#f4c76b' : '#e8a03a'}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${hrSmooth(P)}" stroke="#fff" stroke-width="2.5" fill="none" opacity=".35" transform="translate(-2,-2)"/>`; }
  for (let i = 0; i < 12; i++) { const yy = y + 10 + i * h / 12; g += `<path d="M${x - 14},${h1(yy)} h28" stroke="#9ad4ff" stroke-width="2" opacity=".5"/>`; }
  return `<g opacity="${h1(a)}">${g}</g>`; }
function hrPlate(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="8" rx="110" ry="30" fill="#000" opacity=".3" filter="url(#blur5)"/><ellipse rx="110" ry="34" fill="#f2f2f4"/><ellipse rx="86" ry="24" fill="#e2e2e6"/>` +
  `<ellipse cx="-38" cy="-4" rx="34" ry="16" fill="#fff"/><ellipse cx="-38" cy="-6" rx="13" ry="9" fill="#f4b830"/><path d="M8,-14 q30,-12 60,4 q-10,16 -56,10Z" fill="#b8763a"/><path d="M14,-8 q24,-6 46,2" stroke="#e8b070" stroke-width="2" fill="none"/>` + Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-10 + (i % 5) * 9}" cy="${10 + Math.floor(i / 5) * 7}" rx="6" ry="4" fill="#8a3a2a"/>`).join('') + `</g>`; }
function sceneKer(t) {
  const st = S0(5) - .2, a = ease(ramp(t, st, st + .5)), X = 200, Y = 1490, S = 2.5;
  let s = `<defs>${HRDEFS()}</defs>` + studio('hrS5', '#2a3a52', '#080c18', 15);
  s += hrHero(X, Y, { s: S, face: 1, aF: [.1, .3], aB: [-.1, .2] }, 140, t, { col: 'br', seed: 51, sw: .6, vol: 30 });
  // 100,000 hairs: a callout on the crown
  const ca = ease(ramp(t, WS(5, 3) - .2, WS(5, 5) + .2)), hx = X + 6 * S, hy = Y + (-150 - 112 - 34) * S;
  s += `<g opacity="${h1(ca)}"><circle cx="${h1(X - 6 * S)}" cy="${h1(Y + (-296 - 16) * S)}" r="34" fill="none" stroke="#f4c76b" stroke-width="4"/><path d="M${h1(X - 6 * S + 30)},${h1(Y + (-296 - 16) * S - 18)} L400,540" stroke="#f4c76b" stroke-width="3"/>${panel(400, 470, 280, 96)}<text x="540" y="526" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4c76b">≈ ١٠٠٬٠٠٠</text>${HRL(540, 556, 'شعرة', 1, '#fff', 22)}</g>`;
  // keratin
  const ka = ease(ramp(t, WS(5, 7) - .3, WS(5, 7) + .2));
  s += `<g opacity="${h1(ka)}">${panel(470, 600, 210, 250)}${hrHelix(575, 640, 150, 1, t)}${HRL(575, 830, 'الكيراتين', 1, '#f4c76b', 28)}</g>`;
  // the protein bar: a third for the hair
  const ba = ease(ramp(t, WS(5, 8) - .3, WS(5, 8) + .2)), bk = ease(ramp(t, WS(5, 10) - .2, WS(5, 14)));
  s += `<g opacity="${h1(ba)}">${panel(40, 1010, 640, 200)}${HRL(360, 1052, 'البروتين الذي تحتاجُه يومياً ≈ ٥٠ غ', 1, '#fff', 24)}<rect x="80" y="1076" width="560" height="44" rx="10" fill="#3a4250"/><rect x="${h1(640 - 560 * bk)}" y="1076" width="${h1(560 * bk)}" height="44" rx="10" fill="#5a9a6a"/><rect x="${h1(640 - 560 * bk * .33)}" y="1076" width="${h1(560 * bk * .33)}" height="44" rx="10" fill="url(#hrBar)"/>` +
    `${HRL(548, 1168, 'ثلثُه للشعر ≈ ١٥–٢٠ غ', ease(ramp(t, WS(5, 10), WS(5, 11) + .2)), '#f4c76b', 24)}</g>`;
  const pa = ease(ramp(t, WS(5, 15) - .2, WS(5, 15) + .3));
  if (pa > 0) s += `<g opacity="${h1(pa)}">${hrPlate(560 + (1 - pa) * 120, 940, .8)}${HRL(560, 900, 'تجوعُ أكثر', 1, '#ff9a7a', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the whole world: tens of thousands of tonnes of hair a day ----------
function sceneTons(t) {
  const st = S0(6) - .2, T = t - st;
  const G = glE(t, { d: 9.4, el: .2, lon: 20 + T * 6, clouds: .35, lights: .25, tg: [0, .14, 0] });
  const pa = ease(ramp(t, WS(6, 3) - .2, WS(6, 4) + .2)), n = ease(ramp(t, WS(6, 4) - .1, WS(6, 10) + .3));
  let ov = `<defs>${HRD}</defs>`;
  // hair bundles rising from the cities (gold strands)
  const r = RS(61); for (let i = 0; i < 14; i++) { const ang = r() * 6.28, rr = G.R * (.2 + .7 * r()), px = G.c0[0] + Math.cos(ang) * rr, py = G.c0[1] + Math.sin(ang) * rr * .9, h = 30 * n * (.5 + r());
    if (n > 0) ov += `<path d="M${h1(px)},${h1(py)} q${h1(6 * Math.sin(T * 2 + i))},${h1(-h / 2)} 0,${h1(-h)}" stroke="#f4c76b" stroke-width="2.5" fill="none" opacity="${h1(.7 * n)}" stroke-linecap="round"/><circle cx="${h1(px)}" cy="${h1(py)}" r="3" fill="#ffe9a8" opacity="${h1(n)}"/>`; }
  ov += `<g opacity="${h1(pa)}">${panel(60, 1000, 600, 210)}${HRL(360, 1070, 'عشراتُ آلافِ الأطنان', 1, '#f4c76b', 40)}${HRL(360, 1120, 'من الشعرِ كلَّ يوم', 1, '#fff', 28)}` +
    `<rect x="120" y="1150" width="480" height="20" rx="6" fill="#3a4250"/><rect x="${h1(600 - 480 * n)}" y="1150" width="${h1(480 * n)}" height="20" rx="6" fill="url(#hrBar)"/></g>`;
  F.ov = ov; return space(t);
}
// ---------- 7: strong: one hair holds about 100 g; a braid of all your hair, in theory 10 tonnes, heavier than an elephant ----------
function sceneStrong(t) {
  const st = S0(7) - .2, a = ease(ramp(t, st, st + .5)), ha = ease(ramp(t, st + .1, st + .6)), wa = ease(ramp(t, st + .4, st + .9)), wl = ease(ramp(t, WS(7, 5) - .2, WS(7, 6) + .2)), ba = ease(ramp(t, WS(7, 7) - .3, WS(7, 7) + .3)), ea = ease(ramp(t, WS(7, 15) - .3, WS(7, 15) + .3));
  const FL = 1180, C = HRC.br;
  let s = `<defs>${HRDEFS()}</defs>` + studio('hrS7', '#2c3446', '#0a0e18', 19) + `<rect x="-20" y="${FL}" width="760" height="140" fill="#1a1e28"/><rect x="-20" y="${FL}" width="760" height="140" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M-20,${FL} H740" stroke="#4a5266" stroke-width="2"/>`;
  // the steel beam across the top
  s += `<rect x="-20" y="430" width="760" height="34" fill="url(#hrSteel)"/><rect x="-20" y="430" width="760" height="6" fill="#fff" opacity=".2"/>` + Array.from({ length: 16 }, (_, i) => `<circle cx="${i * 50 + 10}" cy="447" r="3.5" fill="#2a3038"/>`).join('');
  // one hair and a 100 g weight
  const sw1 = Math.sin(t * 1.3) * 3, wy = 700 + 6 * (1 - wa);
  if (ha > 0) { let P = []; for (let i = 0; i <= 20; i++) { const q = i / 20; P.push([150 + Math.sin(q * 9 + t) * 3 * (1 - q) + sw1 * q, 470 + q * (wy - 470)]); }
    s += `<g opacity="${h1(ha * a)}"><path d="M140,464 h20 v10 h-20Z" fill="#5a626a"/><path d="${hrSmooth(P)}" stroke="#3a2214" stroke-width="2.2" fill="none"/><path d="${hrSmooth(P)}" stroke="#b07c48" stroke-width=".8" fill="none" opacity=".8"/>` +
      `<g opacity="${h1(wa)}" transform="translate(${h1(150 + sw1)},${h1(wy)}) scale(1.5)"><path d="M-6,0 v-6 a6,6 0 0 1 12,0 v6" stroke="#8a6a2a" stroke-width="3" fill="none"/><rect x="-24" y="0" width="48" height="56" rx="6" fill="url(#hrBrass)"/><rect x="-24" y="0" width="48" height="8" rx="4" fill="#fff" opacity=".25"/></g>` +
      `<g opacity="${h1(wl)}">${panel(210, 700, 140, 70)}<text x="280" y="748" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#f4c76b">١٠٠ غ</text></g>${HRL(150, 820, 'شعرةٌ واحدة', ha, '#fff', 24)}</g>`; }
  // the braid holding a 10-tonne steel block
  if (ba > 0) { const bx = 540, swb = Math.sin(t * .9) * 4, by0 = 464, by1 = lerp(620, 990, ba);
    s += `<g opacity="${h1(ba)}"><rect x="${bx - 24}" y="460" width="48" height="16" rx="4" fill="#3a4048"/>${hrBraid(bx, by0 + 10, bx + swb, by1, 38, C, t)}` +
      `<g transform="translate(${h1(bx + swb)},${h1(by1)})"><path d="M-12,0 L-78,40 M12,0 L78,40" stroke="#5a626a" stroke-width="6"/><circle r="9" fill="none" stroke="#5a626a" stroke-width="5"/><rect x="-96" y="40" width="192" height="140" rx="6" fill="url(#hrSteel)"/><rect x="-96" y="40" width="192" height="140" rx="6" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-96" y="40" width="192" height="10" fill="#fff" opacity=".22"/>` + [-80, 80].map(q => `<circle cx="${q}" cy="60" r="4" fill="#2a3038"/><circle cx="${q}" cy="164" r="4" fill="#2a3038"/>`).join('') +
      `<text x="0" y="118" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="38" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="4">١٠ أطنان</text></g>` +
      `${panel(bx - 196, 560, 132, 54)}${HRL(bx - 130, 596, 'نظرياً', 1, '#cfd8e4', 24)}</g>`; }
  // the elephant
  if (ea > 0) s += `<g opacity="${h1(ea)}">${hrEleph(165 - (1 - ea) * 60, FL, .86, 1, t)}${panel(60, 860, 230, 58)}${HRL(175, 898, 'فيل ≈ ٦ أطنان', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8a: the twist: a hair grows only a few years, then it falls ----------
function sceneCycle(t) {
  const st = S0(8) - .2, a = ease(ramp(t, st, st + .5)), g = ease(ramp(t, WS(8, 1) - .2, WS(8, 4) + .3)), fl = ease(ramp(t, WS(8, 6) - .1, WS(8, 6) + .7)), nw = ease(ramp(t, WS(8, 6) + .5, WS(8, 7) + .4)), SY = 960;
  let s = `<defs>${HRDEFS()}</defs>` + studio('hrS8', '#1e3048', '#060a14', 23);
  s += `<g opacity="${h1(a)}"><defs><clipPath id="hrFc8"><rect x="50" y="440" width="620" height="790" rx="26"/></clipPath></defs><g clip-path="url(#hrFc8)"><g transform="translate(360,${SY})">${hrFoll(t, { shaft: lerp(180, 470, g), w: 640, fall: fl, newHair: nw, foll: [[0, 250, .1, lerp(180, 470, g), 1]] })}</g></g><rect x="50" y="440" width="620" height="790" rx="26" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
  // the growth phase bar
  s += `<g opacity="${h1(a)}">${panel(70, 470, 250, 150)}${HRL(195, 510, 'تنمو', 1, '#9cf0b0', 28)}<rect x="95" y="532" width="200" height="22" rx="8" fill="#3a4250"/><rect x="${h1(295 - 200 * g)}" y="532" width="${h1(200 * g)}" height="22" rx="8" fill="#5a9a6a"/>${HRL(195, 598, '٢–٧ سنوات', 1, '#fff', 26)}</g>`;
  if (fl > 0) s += `<g opacity="${h1(fl)}">${panel(420, 470, 220, 70)}${HRL(530, 516, 'ثم تسقط', 1, '#ff9a7a', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8b: ... at this speed, tens of metres before it falls: a ten-storey building ----------
function sceneTower(t) {
  const st = WS(8, 7) - .25, T = t - st, z = ease(ramp(t, WS(8, 10) - .1, WS(8, 15) + .3)), k = lerp(4.0, 1, z);
  const BX0 = 220, BX1 = 520, TOP = 450, GR = 1150, FH = (GR - TOP) / 10, hl = ease(ramp(t, st + .1, WS(8, 15) + .5));
  let w = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#hrSky)"/>` + sun3(110, 560, .8) + cumulus(560 + T * 4, 520, 220, 81, { a: .7 }) + farCity(83, 1060, '#a8b4c4', { hk: .7 }) + `<rect x="-20" y="900" width="760" height="160" fill="#eee6cc" opacity=".25"/>`;
  // low neighbours
  [[20, 200, 4, '#b89a7a', 921], [530, 210, 5, '#7a8e9e', 922]].forEach(([x, bw, n, c, sd]) => { const b = blockN(x, GR, bw, n * FH, c, sd, 1); w += b.s; });
  // the ten-storey building
  const r = RS(31); w += `<rect x="${BX0}" y="${TOP}" width="${BX1 - BX0}" height="${GR - TOP}" fill="#c8b8a0"/><rect x="${BX0}" y="${TOP}" width="${BX1 - BX0}" height="${GR - TOP}" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="${BX0}" y="${TOP}" width="${BX1 - BX0}" height="${GR - TOP}" fill="url(#hrFac)"/>`;
  for (let f = 0; f < 10; f++) { const fy = GR - (f + 1) * FH; w += `<rect x="${BX0}" y="${h1(fy + FH - 5)}" width="${BX1 - BX0}" height="5" fill="#a89880"/>`;
    for (let c = 0; c < 4; c++) { const wx = BX0 + 22 + c * 70, lit = r() < .25; w += `<rect x="${wx}" y="${h1(fy + 16)}" width="46" height="${h1(FH - 34)}" fill="${lit ? '#f4dca0' : '#4a6078'}"/><rect x="${wx}" y="${h1(fy + 16)}" width="46" height="${h1(FH - 34)}" fill="url(#glsG)" opacity=".3"/><rect x="${wx - 3}" y="${h1(fy + FH - 19)}" width="52" height="4" fill="#e8e0d0"/><path d="M${wx + 23},${h1(fy + 16)} v${h1(FH - 34)}" stroke="#2a3440" stroke-width="2"/>`; } }
  w += `<rect x="${BX0 - 6}" y="${TOP - 14}" width="${BX1 - BX0 + 12}" height="16" fill="#9a8a72"/><rect x="${BX0 - 6}" y="${TOP - 14}" width="${BX1 - BX0 + 12}" height="4" fill="#fff" opacity=".3"/>`;
  // the pavement and the road
  w += `<rect x="-20" y="${GR}" width="760" height="50" fill="#c4b8a4"/><rect x="-20" y="${GR}" width="760" height="50" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="${GR + 50}" width="760" height="100" fill="#484a50"/><rect x="-20" y="${GR + 46}" width="760" height="6" fill="#e2ddd0"/>`;
  // you, sitting on the roof edge (facing into the roof), the hair falling down the facade
  const PS = .17, PX = BX1 - 14, PY = TOP - 14, C = HRC.br;
  const hero0 = hero(PX, PY, Object.assign({ s: PS, face: -1, lF: [1.5708, 0], lB: [1.45, -.1], lookUp: .1 }, YOU, { hair: C[1] })), H = HP.head, hx = H[0] + 4 * PS, hy = H[1] - 2 * PS;
  const hairLen = (GR - hy) * hl, S = [];
  for (let i = 0; i < 40; i++) { const rr = RS(900 + i), off = (rr() - .5) * 9, ph = rr() * 6.28, P = [], ex = BX1 + 7 + off * .5;
    for (let d = 0; d <= hairLen + 200 * hl; d += 4) { let x, y = hy + 1 + d;
      if (y < PY) { const q = Math.pow(clamp((y - hy) / (PY - hy)), 1.6); x = hx + 2 + off * .2 + (ex - hx - 2) * q; }
      else x = ex + Math.sin((y - PY) * .02 + T * .8 + ph) * 3 * Math.min(1, (y - PY) / 200) + ((y - PY) / 700) * 6 + Math.sin(d * .06 + ph) * 1.2;
      if (y > GR + 4) { const o = y - GR - 4; y = GR + 10 + off * .6 + Math.sin(o * .04 + ph) * 2; x = ex + 6 + o * .9; } P.push([x, y]); if (d > 60) d += 6; }
    S.push({ P, r: RS(950 + i) }); }
  w += hero0 + hrDraw(S, C, .26);
  // tiny people on the pavement for scale
  w += hero(140, GR + 40, Object.assign({ s: .17, face: 1, lookUp: .9 }, gp(2))) + hero(660, GR + 42, Object.assign({ s: .17, face: -1, lookUp: .9 }, gp(4)));
  let s = `<defs>${HRDEFS()}</defs><g transform="translate(${PX},${PY}) scale(${h1(k * 100) / 100}) translate(${-PX},${-PY}) translate(${h1((1 - z) * (360 - PX) / k)},${h1((1 - z) * (700 - PY) / k)})">${w}</g>`;
  // floor numbers and the measure
  const ma = ease(ramp(t, WS(8, 15) - .2, WS(8, 16) + .2));
  if (ma > 0) { let fl = ''; for (let f = 0; f < 10; f++) fl += `<text x="${BX0 - 26}" y="${h1(GR - f * FH - FH / 2 + 8)}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4" opacity="${h1(clamp(ma * 12 - f))}">${hAR(f + 1)}</text>`;
    s += fl + `<g opacity="${h1(ma)}"><path d="M${BX1 + 70},${TOP} V${GR}" stroke="#f4c76b" stroke-width="4"/><path d="M${BX1 + 58},${TOP} h24 M${BX1 + 58},${GR} h24" stroke="#f4c76b" stroke-width="4"/>${panel(BX1 + 6, 720, 186, 96)}${HRL(BX1 + 99, 760, '١٠ طوابق', 1, '#fff', 28)}${HRL(BX1 + 99, 800, '≈ ٣٠ م', 1, '#f4c76b', 30)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.6, el: .3, lon: 70 + (t - S0(9)) * 3, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 10) - .3, WS(9, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneToday }, { s: S0(2) - .2, f: sceneDays }, { s: S0(3) - .2, f: sceneMonth }, { s: S0(4) - .2, f: sceneAll },
  { s: S0(5) - .2, f: sceneKer }, { s: S0(6) - .2, f: sceneTons }, { s: S0(7) - .2, f: sceneStrong }, { s: S0(8) - .2, f: sceneCycle }, { s: WS(8, 7) - .25, f: sceneTower }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneToday, sceneDays, sceneKer, sceneTons, sceneStrong, sceneCycle, sceneTower]);
const XF = .5;
const TLI = [['اليوم', S0(1)], ['أسبوع', S0(2)], ['شهران', S0(3)], ['الجميع', S0(4)], ['البروتين', S0(5)], ['القوّة', S0(7)]];
const LIST_ON = new Set([sceneMonth]);
const CHIPS = [
  ['c0', 'شعرٌ أسرعُ × ١٠٠', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c1', '≈ ١ سم في الشهر', 360, 330, 'big', WS(1, 5), S0(2) - .3],
  ['c2', '≈ ٤ سم كلَّ يوم', 360, 330, 'red big', WS(2, 5), S0(3) - .3],
  ['c3', 'شهران ← أكثرُ من مترين', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c4', 'قصُّ الشعرِ كلَّ يوم', 360, 330, 'big', WS(4, 7), S0(5) - .3],
  ['c5', '≈ ثلثُ بروتينِك للشعر', 360, 330, 'red big', WS(5, 10), S0(6) - .3],
  ['c6', 'جبالٌ من الشعر', 360, 330, 'big', WS(6, 4), S0(7) - .3],
  ['c7', 'ضفيرةٌ ≈ ١٠ أطنان', 360, 330, 'big', WS(7, 13), S0(8) - .3],
  ['c8', 'عشراتُ الأمتار', 360, 330, 'red big', WS(8, 14), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">شعرٌ أسرع</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
