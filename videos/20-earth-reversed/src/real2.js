// ===== realism kit v2: terrain-lit mountains, lodgepole pines, meadows, cumulus clouds =====
// mountains lit by a real heightmap: a fractal ridge silhouette, rock + snow passed through a diffuse-lighting filter (gullies and ridges catch the light from the upper left),
// the big faces away from the light darkened, and aerial haze for distant ranges
function mountainsR(yb, amp, seed, o = {}) {
  const p = o.points || ridgeP(-30, 750, yb, amp, seed, o.n0 || 6), body = `M-30,${yb + 40} L${p.map(PT).join(' L')} L750,${yb + 40}Z`, id = 'm' + seed + '_' + Math.round(yb);
  const rock = o.rock || '#8a8478', snowAt = o.snowAt ?? 0, r = RS(seed + 9);
  let s = `<defs><clipPath id="c${id}"><path d="${body}"/></clipPath><filter id="f${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${(2.6 / amp).toFixed(4)} ${(1.0 / amp).toFixed(4)}" numOctaves="6" seed="${seed}" result="n"/><feDiffuseLighting in="n" surfaceScale="${(amp * .11).toFixed(1)}" lighting-color="#ffffff" result="l"><feDistantLight azimuth="${o.az ?? 205}" elevation="${o.el ?? 32}"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="${o.k1 ?? 1.35}" k2="0" k3="0" k4="0"/></filter>` +
    `<linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(rock, '#ffffff', .08)}"/><stop offset="1" stop-color="${o.base || mix(rock, '#2a2620', .55)}"/></linearGradient></defs>`;
  let inner = `<rect x="-30" y="${yb - amp - 20}" width="780" height="${amp + 70}" fill="url(#g${id})"/>`;
  if (snowAt > 0) { let ln = `M-40,${yb - amp - 40} L760,${yb - amp - 40}`; for (let x = 760; x >= -40; x -= 10) { const gul = Math.pow(Math.abs(Math.sin(x * .045 + seed)), 6) * amp * .22; ln += ` L${x},${(yb - amp * snowAt + (r() - .5) * amp * .12 + gul).toFixed(1)}`; } ln += 'Z'; inner += `<path d="${ln}" fill="${o.snow || '#f4f7fb'}"/>`; }
  s += `<g clip-path="url(#c${id})"><g filter="url(#f${id})">${inner}</g>`;
  // the big faces turned away from the light
  const W = Math.max(3, Math.floor(p.length / ((o.n0 || 6) * 2.2))), pk = [];
  for (let i = 1; i < p.length - 1; i++) { let top = true; for (let q = Math.max(0, i - W); q <= Math.min(p.length - 1, i + W); q++) if (q !== i && p[q][1] <= p[i][1]) { top = false; break; } if (top) pk.push(i); }
  pk.forEach((i, n) => { const lim = n + 1 < pk.length ? pk[n + 1] : p.length - 1; let j = i; for (let q = i; q <= lim; q++) if (p[q][1] > p[j][1]) j = q; if (j <= i + 1) return;
    const P = p[i], V = p[j], H = yb + 40 - P[1], sp = []; for (let k = 1; k <= 7; k++) sp.push([P[0] + (V[0] - P[0]) * (.05 + .3 * k / 7) + (r() - .5) * 12, P[1] + H * k / 7]);
    s += `<path d="M${p.slice(i, j + 1).map(PT).join(' L')} L${(V[0] - (V[0] - P[0]) * .2).toFixed(1)},${yb + 40} L${sp.reverse().map(PT).join(' L')}Z" fill="${o.shade || '#0e1420'}" opacity="${o.shadeA ?? .42}"/>`; });
  if (o.haze) s += `<rect x="-30" y="${yb - amp - 20}" width="780" height="${amp + 70}" fill="${o.hazeCol || '#b8c8d8'}" opacity="${o.haze}"/>`;
  s += `<rect x="-30" y="${yb - amp * .25}" width="780" height="${amp * .25 + 40}" fill="${o.footCol || '#1e2a1e'}" opacity="${o.foot ?? 0}"/>`;
  return s + `</g>`;
}
// a lodgepole pine: tall straight trunk, narrow ragged crown mostly in the upper part, needles lit from the upper left
function pineR(x, y, h, seed, col, o = {}) {
  const r = RS(seed + 300), lean = (r() - .5) * h * .03, dk = mix(col, '#000000', .45), lt = mix(col, o.lightCol || '#b8c890', o.lit ?? .3), snow = o.snow || 0;
  let s = `<path d="M${x - h * .012},${y} L${x + lean - h * .004},${y - h} L${x + lean + h * .004},${y - h} L${x + h * .012},${y}Z" fill="#4a3a2a"/>`;
  const start = .28 + .15 * r(), n = 13;
  for (let i = 0; i < n; i++) { const u = i / (n - 1), yy = y - h * (start + (1 - start) * u), cx = x + lean * (start + (1 - start) * u), w = h * (.11 * Math.pow(1 - u, .9) + .02) * (.7 + .6 * r()); if (r() < .12 && u < .7) continue;
    const pts = []; const m = 7; for (let k = 0; k <= m; k++) { const v = k / m, px = cx - w + v * 2 * w, top = yy - h * .045 * (1 - Math.abs(v - .5) * 1.6) - r() * h * .015; pts.push([px + (r() - .5) * w * .15, top]); }
    const bot = []; for (let k = m; k >= 0; k--) { const v = k / m; bot.push([cx - w + v * 2 * w + (r() - .5) * w * .2, yy + h * .02 + Math.abs(v - .5) * h * .03 + r() * h * .012]); }
    s += `<path d="M${pts.concat(bot).map(PT).join(' L')}Z" fill="${dk}"/><path d="M${pts.slice(0, 5).map(PT).join(' L')} L${PT([cx, yy + h * .01])} L${PT([cx - w * .9, yy + h * .015])}Z" fill="${lt}" opacity=".5"/>`;
    if (snow) s += `<path d="M${pts.slice(1, 7).map(PT).join(' L')}" stroke="#f4f7fb" stroke-width="${Math.max(1, h * .012)}" fill="none" opacity="${snow}"/>`; }
  return s + `<path d="M${x + lean},${y - h} l0,${-h * .04}" stroke="${dk}" stroke-width="${h * .012}"/>`;
}
function forestR(y0, n, h0, h1, seed, col, o = {}) {
  const r = RS(seed + 70), tr = []; for (let i = 0; i < n; i++) tr.push([(o.x0 ?? -20) + ((o.x1 ?? 740) - (o.x0 ?? -20)) * (i + r() * .9) / n, y0 + r() * (o.dy ?? 12), h0 + (h1 - h0) * r(), seed * 97 + i]);
  tr.sort((a, b) => a[1] - b[1]);
  let s = `<path d="M-20,${y0 + 6} ${tr.map(t => `L${t[0].toFixed(1)},${(t[1] - t[2] * .45).toFixed(1)}`).join(' ')} L740,${y0 + 6} L740,${y0 + (o.dy ?? 12) + 8} L-20,${y0 + (o.dy ?? 12) + 8}Z" fill="${mix(o.haze ? mix(col, o.hazeCol || '#8a9aac', o.haze) : col, '#000000', .5)}"/>`;
  const cc = o.haze ? mix(col, o.hazeCol || '#8a9aac', o.haze) : col;
  tr.forEach(t => { s += pineR(t[0], t[1], t[2], t[3], cc, o); });
  return s;
}
// a meadow in perspective: colour variation and grass texture, tufts of blades that get taller towards us and sway
function meadow(y0, y1, t, o = {}) {
  const c0 = o.c0 || '#7a8a4a', c1 = o.c1 || '#5a6a32', id = 'md' + Math.round(y0);
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(c0, '#c8c0a0', .25)}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs><rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="url(#${id})"/>`;
  s += `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#000" filter="url(#stalkT)" opacity=".28"/><rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="${o.patch || '#a8a060'}" filter="url(#cropT)" opacity=".35"/>`;
  const r = RS(o.seed || 41), n = o.n || 340;
  for (let i = 0; i < n; i++) { const u = Math.pow(r(), .7), y = y0 + u * (y1 - y0), x = r() * 760 - 20, hh = (3 + 34 * u * u) * (.6 + .8 * r()), sw = Math.sin(t * 1.6 + x * .02) * hh * .12, c = mix(r() > .5 ? c0 : c1, r() > .7 ? '#c8b870' : '#3a4a1e', r() * .45);
    s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .4 - 2).toFixed(1)},${(-hh * .55).toFixed(1)} ${(sw - 4).toFixed(1)},${(-hh).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .3).toFixed(1)},${(-hh * .6).toFixed(1)} ${(sw + 1).toFixed(1)},${(-hh * 1.1).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .4 + 2).toFixed(1)},${(-hh * .5).toFixed(1)} ${(sw + 5).toFixed(1)},${(-hh * .85).toFixed(1)}" stroke="${c}" stroke-width="${(.8 + 1.6 * u).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  return s;
}
// a cumulus cloud: many soft lumps, bright tops, grey flat bases
function cumulus(cx, cy, w, seed, o = {}) {
  const r = RS(seed + 500); let s = `<g opacity="${o.a ?? 1}" filter="url(#cloudF)">`;
  s += `<ellipse cx="${cx}" cy="${cy + w * .08}" rx="${w * .55}" ry="${w * .07}" fill="${o.base || '#a8b4c4'}" filter="url(#soft)"/>`;
  for (let i = 0; i < 34; i++) { const a = r(), b = r(), x = cx + (a - .5) * w, y = cy - b * w * .24 * (1 - Math.abs(a - .5) * 1.2), rr = w * (.05 + .08 * r()) * (1.1 - Math.abs(a - .5)); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#cuG)"/>`; }
  return s + `</g>`;
}
const CUDEF = `<filter id="cloudF" x="-20%" y="-30%" width="140%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="8"/><feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.6"/></filter><radialGradient id="cuG" cx=".4" cy=".3" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef2f6"/><stop offset="1" stop-color="#b8c4d2"/></radialGradient>`;

// a mountain silhouette through given control points, roughened with fractal detail (for named peaks such as Everest or a volcano cone)
function profileP(ctrl, seed, rough = .06, lv = 6) {
  const r = RS(seed + 33); let p = ctrl.map(q => q.slice());
  let sc = rough; for (let l = 0; l < lv; l++) { const np = []; for (let i = 0; i < p.length - 1; i++) { const a = p[i], b = p[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]); np.push(a, [(a[0] + b[0]) / 2 + (r() - .5) * L * sc * .3, (a[1] + b[1]) / 2 + (r() - .5) * L * sc]); } np.push(p[p.length - 1]); p = np; sc *= .62; }
  return p;
}
