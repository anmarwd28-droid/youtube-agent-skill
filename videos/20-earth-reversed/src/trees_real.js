// shared: realistic street tree (lumpy lit crown) and hard cast shadow for people
function lumpP(cx, cy, R, r) {
  const n = 9, p = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = R * (.78 + .32 * r()); p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .86]); }
  let d = `M${((p[0][0] + p[n - 1][0]) / 2).toFixed(1)},${((p[0][1] + p[n - 1][1]) / 2).toFixed(1)}`;
  for (let i = 0; i < n; i++) { const a = p[i], b = p[(i + 1) % n]; d += ` Q${a[0].toFixed(1)},${a[1].toFixed(1)} ${((a[0] + b[0]) / 2).toFixed(1)},${((a[1] + b[1]) / 2).toFixed(1)}`; }
  return d + 'Z';
}
function treeR(x, y, h, seed, t) {
  const r = RS(seed + 200), cy = y - h * .7, sw = Math.sin(t * .9 + seed) * h * .004;
  let s = `<path d="M${x - h * .036},${y} C${x - h * .02},${y - h * .2} ${x - h * .028},${y - h * .36} ${x - h * .012 + sw},${y - h * .5} L${x + h * .014 + sw},${y - h * .5} C${x + h * .02},${y - h * .32} ${x + h * .018},${y - h * .2} ${x + h * .036},${y}Z" fill="#4a3a2c"/>` +
    `<path d="M${x - h * .03},${y} C${x - h * .018},${y - h * .2} ${x - h * .024},${y - h * .36} ${x - h * .01 + sw},${y - h * .5}" stroke="#7a6650" stroke-width="${h * .008}" fill="none"/>`;
  [[-1, .8], [0, 1], [1, .85]].forEach(([b, l]) => { s += `<path d="M${x + sw},${y - h * .46} Q${x + b * h * .06 + sw},${y - h * .6} ${x + b * h * .17 * l + sw},${y - h * (.68 + .1 * l)}" stroke="#4a3a2c" stroke-width="${h * .012}" fill="none" stroke-linecap="round"/>`; });
  const cl = []; for (let i = 0; i < 30; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); cl.push([x + sw + Math.cos(a) * d * h * .27, cy + Math.sin(a) * d * h * .2 - h * .02, h * (.06 + .045 * r()), r]); }
  cl.sort((a, b) => a[1] - b[1]);
  const dk = cl.map(c => `<path d="${lumpP(c[0], c[1], c[2], c[3])}"/>`).join('');
  s += `<g fill="#22361a">${dk}</g>`;
  cl.forEach(c => { const lit = ((x - c[0]) * .7 + (cy - c[1])) / (h * .3); s += `<path d="${lumpP(c[0] - c[2] * .15, c[1] - c[2] * .2, c[2] * .8, c[3])}" fill="${mix('#2e4a1e', '#4a6e2a', Math.max(0, Math.min(1, .5 + lit)))}"/>`; if (lit > -.15) s += `<path d="${lumpP(c[0] - c[2] * .35, c[1] - c[2] * .4, c[2] * .45, c[3])}" fill="${mix('#5a7e32', '#86a44a', Math.max(0, Math.min(1, lit)))}"/>`; });
  s += `<g fill="#000" filter="url(#cropT)" opacity=".38">${dk}</g>`;
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, d = .9 + .15 * r(); s += `<circle cx="${x + sw + Math.cos(a) * d * h * .3}" cy="${cy + Math.sin(a) * d * h * .23}" r="${h * (.006 + .008 * r())}" fill="${r() > .5 ? '#2e4a1e' : '#4a6e2a'}"/>`; }
  return s;
}
const castSh = (x, y, sc = .55) => `<path d="M${x - 9 * sc / .55},${y} L${x + 70 * sc / .55},${y + 9} Q${x + 80 * sc / .55},${y + 13} ${x + 68 * sc / .55},${y + 15} L${x - 7 * sc / .55},${y + 7}Z" fill="#000" opacity=".9"/>`;

