// ===== #61 helpers copied from #56 (tr_a.js) and #40 (astro in hs_b.js) =====
const CBDEF = `<linearGradient id="spaceK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030a"/><stop offset="1" stop-color="#0a1024"/></linearGradient>` +
  `<radialGradient id="coreG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe08a"/><stop offset=".35" stop-color="#ff9a3a"/><stop offset=".75" stop-color="#c8401a"/><stop offset="1" stop-color="#7a2a14"/></radialGradient>` +
  `<linearGradient id="mantG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a4a2a"/><stop offset="1" stop-color="#5a2e1a"/></linearGradient>` +
  `<radialGradient id="rockB" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#b8aa98"/><stop offset=".6" stop-color="#7a6e62"/><stop offset="1" stop-color="#2a2622"/></radialGradient>` +
  `<radialGradient id="mimG" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="#f2f0ec"/><stop offset=".55" stop-color="#b8b6b2"/><stop offset="1" stop-color="#3a3a3c"/></radialGradient>` +
  `<linearGradient id="seaT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7ab0"/><stop offset="1" stop-color="#14365a"/></linearGradient>` +
  `<linearGradient id="skyT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1030"/><stop offset=".45" stop-color="#2a4a8a"/><stop offset="1" stop-color="#9ac0e0"/></linearGradient>`;

// rockS from #45 (dr_b.js): a sunlit rock with a lit top facet and a soft shadow
function rockS(x, y, sc, seed) {
  const r = RS(seed), w = 34 * sc * (.8 + .5 * r()), h = 24 * sc * (.7 + .6 * r()), n = 9, P = [];
  for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI, rr = .8 + .32 * r(); P.push([x + Math.cos(a) * w * rr, y + Math.sin(a) * h * rr]); }
  const top = P.map(p => [x + (p[0] - x) * (.52 + .1 * r()) - w * .1, y + (p[1] - y) * .62 - h * .12]), id = 'rs' + seed;
  return `<ellipse cx="${(x + w * .25).toFixed(1)}" cy="${(y + h * .08).toFixed(1)}" rx="${(w * 1.25).toFixed(1)}" ry="${(h * .24).toFixed(1)}" fill="#3a2a1a" opacity=".4" filter="url(#blur2)"/>` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b49a78"/><stop offset=".55" stop-color="#86705a"/><stop offset="1" stop-color="#4e3e30"/></linearGradient></defs>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="url(#${id})"/><path d="M${top.map(PT).join(' L')}Z" fill="#d8c29c" opacity=".7"/><path d="M${P.slice(Math.floor(n * .6)).map(PT).join(' L')} L${x.toFixed(1)},${y.toFixed(1)}Z" fill="#2a1e14" opacity=".3"/>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="#000" filter="url(#grainR)" opacity=".35"/><path d="M${P.slice(0, Math.ceil(n * .6)).map(PT).join(' L')}" stroke="#f2e2c0" stroke-width="${(1 + sc * .5).toFixed(1)}" fill="none" opacity=".5"/>`;
}

const starsK = (n, seed, a = 1) => { const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const z = r(); s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(.4 + z * z * 1.5).toFixed(2)}" fill="${z > .92 ? '#ffe0b8' : '#fff'}" opacity="${(a * (.3 + .6 * z)).toFixed(2)}"/>`; } return s; };
const arrowT = (x0, y0, x1, y1, col, w = 3) => { const a = Math.atan2(y1 - y0, x1 - x0); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x1.toFixed(1)},${y1.toFixed(1)} l${(-12 * Math.cos(a - .45)).toFixed(1)},${(-12 * Math.sin(a - .45)).toFixed(1)} M${x1.toFixed(1)},${y1.toFixed(1)} l${(-12 * Math.cos(a + .45)).toFixed(1)},${(-12 * Math.sin(a + .45)).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
const ASDEF = `<radialGradient id="visG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe6a8"/><stop offset=".35" stop-color="#c8862a"/><stop offset=".7" stop-color="#3a2a1a"/><stop offset="1" stop-color="#120c08"/></radialGradient><radialGradient id="helG" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e2e6ec"/><stop offset="1" stop-color="#9aa2ae"/></radialGradient>`;
function astro(x, y, o = {}) {
  const k = o.suit ?? 1, f = o.face || 1, s = o.s || 1;
  const base = Object.assign({ shade: 1, noShadow: 1 }, o, k > .5 ? { top: '#e9ebef', pants: '#dcdfe5', skin: '#cfd3da', hair: '#cfd3da' } : YOU);
  let body = hero(x, y, base); const P = Object.assign({}, HP);
  if (k <= .5) return { s: body, P };
  body = body.split('#1d2028').join('#b4b9c2').split('#3a3530').join('#8a9099').split('#4a443c').join('#a2a8b1');
  const ax = P.head[0] - P.hip[0], ay = P.head[1] - P.hip[1], L = Math.hypot(ax, ay) || 1, ux = ax / L, uy = ay / L, ang = Math.atan2(ux, -uy) * 57.2958;
  const bx = P.chest[0] - uy * f * -1 * 0 - (-uy) * 0, nx = -uy * f, ny = ux * f;   // (nx, ny) points to the front of the body
  const pk = `<g transform="translate(${(P.chest[0] - nx * 25 * s).toFixed(1)},${(P.chest[1] - ny * 25 * s - uy * 0).toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(4)})"><rect x="-17" y="-62" width="34" height="96" rx="9" fill="#c4c8d0"/><rect x="-17" y="-62" width="12" height="96" rx="6" fill="#000" opacity=".16"/><rect x="-11" y="-40" width="22" height="6" rx="2" fill="#8a929c"/><rect x="-11" y="-28" width="22" height="6" rx="2" fill="#8a929c"/></g>`;
  const hx = P.head[0] - ux * 2 * s, hy = P.head[1] - uy * 2 * s, r = 31 * s, vx = hx + nx * 6 * s, vy = hy + ny * 6 * s;
  const helm = `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#helG)"/>` +
    `<ellipse cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" rx="${(20 * s).toFixed(1)}" ry="${(22 * s).toFixed(1)}" fill="url(#visG)" transform="rotate(${ang.toFixed(1)},${vx.toFixed(1)},${vy.toFixed(1)})"/>` +
    `<ellipse cx="${(vx - nx * 5 * s + ux * 7 * s).toFixed(1)}" cy="${(vy - ny * 5 * s + uy * 7 * s).toFixed(1)}" rx="${(7 * s).toFixed(1)}" ry="${(4 * s).toFixed(1)}" fill="#fff" opacity=".55" transform="rotate(${(ang - 35).toFixed(1)},${(vx - nx * 5 * s + ux * 7 * s).toFixed(1)},${(vy - ny * 5 * s + uy * 7 * s).toFixed(1)})"/><circle cx="${(vx + nx * 6 * s - ux * 8 * s).toFixed(1)}" cy="${(vy + ny * 6 * s - uy * 8 * s).toFixed(1)}" r="${(2.2 * s).toFixed(1)}" fill="#fff" opacity=".6"/>` +
    `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#8a929e" stroke-width="${(2 * s).toFixed(1)}"/>` +
    `<rect x="${(hx - 14 * s).toFixed(1)}" y="${(hy + r - 6 * s).toFixed(1)}" width="${(28 * s).toFixed(1)}" height="${(9 * s).toFixed(1)}" rx="${(3 * s).toFixed(1)}" fill="#9aa2ae" transform="rotate(${ang.toFixed(1)},${hx.toFixed(1)},${hy.toFixed(1)})"/>`;
  const chestP = `<g transform="translate(${(P.chest[0] + nx * 10 * s).toFixed(1)},${(P.chest[1] + ny * 10 * s).toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(4)})"><rect x="-9" y="-18" width="18" height="16" rx="3" fill="#7a8490"/><circle cx="-3" cy="-10" r="2" fill="#e53935"/><circle cx="3" cy="-10" r="2" fill="#4ad06a"/></g>`;
  return { s: pk + body + chestP + helm, P };
}
