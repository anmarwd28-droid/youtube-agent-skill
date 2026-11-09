function quad(x, y, sc, o = {}) {
  const k = o.kind || 'dog', f = o.face || 1, ph = o.phase || 0, mv = o.moving ? 1 : 0;
  const P = { dog: { L: 72, H: 50, leg: 46, neck: 24, hd: 17, col: '#b08a5a', dark: '#6a4e30', belly: '#dcc49e' },
    wolf: { L: 96, H: 62, leg: 62, neck: 30, hd: 23, col: '#8e887c', dark: '#4e4a44', belly: '#cec8bc' },
    fox: { L: 60, H: 38, leg: 32, neck: 20, hd: 16, col: '#c8641e', dark: '#2a1a10', belly: '#f4e8d8' },
    horse: { L: 150, H: 104, leg: 100, neck: 56, hd: 30, col: '#c0a06a', dark: '#2e2216', belly: '#e6d4ae' },
    cow: { L: 140, H: 100, leg: 74, neck: 34, hd: 30, col: '#e8e2d6', dark: '#2a2420', belly: '#f4f0ea' },
    cat: { L: 44, H: 28, leg: 24, neck: 10, hd: 13, col: o.col || '#8a827a', dark: '#3a3634', belly: '#c2bcb6' } }[k];
  const col = o.col || P.col, dk = P.dark, L = P.L, H = P.H, leg = P.leg, ty = -(leg + H * .22), bob = mv ? Math.abs(Math.sin(ph)) * 2 : 0;
  const limb = (jx, jy, a, hind, c, w) => { const u = leg * .55, l = leg * .52, kx = jx + Math.sin(a) * u, ky = jy + Math.cos(a) * u, b = hind ? -.55 : .25, fx = kx + Math.sin(a * .6 + b) * l, fy = ky + Math.cos(a * .6 + b) * l * .98;
    return `<path d="M${jx},${jy} L${kx},${ky} L${fx},${fy}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${fx + w * .3}" cy="${fy}" rx="${w * .65}" ry="${w * .35}" fill="${(k === 'horse' || k === 'cow') ? '#1a1410' : dk}"/>`; };
  const sw = a => Math.sin(ph + a) * .5 * mv, shX = L * .34, hpX = -L * .36, jy = ty + H * .12, lw = (k === 'horse' || k === 'cow') ? 13 : k === 'cat' ? 6 : 9;
  const farC = mix(col, '#000000', .3), legC = (k === 'horse' || k === 'cow') || k === 'fox' ? mix(col, dk, .55) : col;
  let s = `<g transform="translate(${x},${y - bob * sc}) scale(${f * sc},${sc})"><ellipse cx="0" cy="2" rx="${L * .62}" ry="${L * .07}" fill="#000" opacity=".28"/>`;
  s += limb(shX - 4, jy, sw(Math.PI), false, farC, lw) + limb(hpX - 4, jy, sw(0), true, farC, lw);
  // tail
  if (k === 'dog') s += `<path d="M${-L * .5},${ty - H * .1} q${-L * .22},${-H * .35} ${-L * .12},${-H * .62}" stroke="${col}" stroke-width="${lw * .8}" fill="none" stroke-linecap="round"/>`;
  if (k === 'wolf') s += `<path d="M${-L * .5},${ty - H * .05} q${-L * .25},${H * .2} ${-L * .3},${H * .6}" stroke="${mix(col, '#000000', .1)}" stroke-width="${lw * 1.5}" fill="none" stroke-linecap="round"/>`;
  if (k === 'fox') s += `<path d="M${-L * .5},${ty} q${-L * .35},${H * .05} ${-L * .55},${H * .4}" stroke="${col}" stroke-width="${lw * 2}" fill="none" stroke-linecap="round"/><circle cx="${-L * 1.04}" cy="${ty + H * .42}" r="${lw * .9}" fill="#f8f0e4"/>`;
  if ((k === 'horse' || k === 'cow')) s += `<path d="M${-L * .5},${ty - H * .12} q${-L * .12},${H * .1} ${-L * .14},${H * .75}" stroke="${dk}" stroke-width="${lw * 1.4}" fill="none" stroke-linecap="round"/>`;
  if (k === 'cat') s += `<path d="M${-L * .5},${ty} q${-L * .3},${-H * .2} ${-L * .25},${-H * 1.2}" stroke="${col}" stroke-width="${lw}" fill="none" stroke-linecap="round"/>`;
  // torso: barrel, chest, back shading, lighter belly
  s += `<path d="M${-L * .5},${ty - H * .18} C${-L * .45},${ty - H * .42} ${L * .3},${ty - H * .46} ${L * .48},${ty - H * .2} C${L * .56},${ty + H * .06} ${L * .44},${ty + H * .36} ${L * .22},${ty + H * .34} C${0},${ty + H * .3} ${-L * .3},${ty + H * .36} ${-L * .46},${ty + H * .22} C${-L * .56},${ty + H * .1} ${-L * .55},${ty - H * .02} ${-L * .5},${ty - H * .18}Z" fill="${col}"/>`;
  s += `<path d="M${-L * .4},${ty + H * .26} C${-L * .1},${ty + H * .34} ${L * .2},${ty + H * .34} ${L * .36},${ty + H * .22}" stroke="${P.belly}" stroke-width="${H * .12}" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s += `<path d="M${-L * .46},${ty - H * .24} C${-L * .2},${ty - H * .42} ${L * .2},${ty - H * .44} ${L * .42},${ty - H * .26}" stroke="#000" stroke-width="${H * .08}" fill="none" opacity=".18" stroke-linecap="round"/>`;
  if (k === 'cow') s += `<ellipse cx="${-L * .15}" cy="${ty - H * .05}" rx="${L * .16}" ry="${H * .2}" fill="#2a2420"/><ellipse cx="${L * .25}" cy="${ty + H * .08}" rx="${L * .1}" ry="${H * .14}" fill="#2a2420"/>`;
  s += limb(shX + 4, jy, sw(0), false, legC, lw) + limb(hpX + 4, jy, sw(Math.PI), true, legC, lw);
  // neck and head (thick neck; head drawn pointing forward then rotated down)
  const nx = L * .44, ny = ty - H * .18, hd = P.hd, gz = o.graze ? 1 : 0, ang = ((k === 'horse' || k === 'cow') ? 38 : k === 'wolf' ? 14 : k === 'cat' ? 0 : 8) + gz * 52;
  const hx = nx + P.neck * ((k === 'horse' || k === 'cow') ? .55 : .75) + gz * P.neck * .5, hy = ny - P.neck * ((k === 'horse' || k === 'cow') ? 1.0 : .7) + gz * P.neck * 1.9;
  s += `<path d="M${nx - L * .06},${ny - H * .18} Q${(nx + hx) / 2 - hd * .2},${(ny + hy) / 2 - hd * .6} ${hx - hd * .2},${hy - hd * .42} L${hx + hd * .25},${hy + hd * .38} Q${(nx + hx) / 2 + hd * .4},${(ny + hy) / 2 + hd * .4} ${nx + L * .08},${ny + H * .3}Z" fill="${col}"/>`;
  if ((k === 'horse' || k === 'cow')) s += `<path d="M${nx - L * .06},${ny - H * .2} Q${(nx + hx) / 2 - hd * .3},${(ny + hy) / 2 - hd * .75} ${hx - hd * .25},${hy - hd * .5}" stroke="${dk}" stroke-width="${hd * .32}" fill="none" stroke-linecap="round"/>`;
  let hdS = '';
  if ((k === 'horse' || k === 'cow')) hdS = `<path d="M0,${-hd * .45} C${hd * .5},${-hd * .55} ${hd * 1.3},${-hd * .35} ${hd * 1.7},${-hd * .15} C${hd * 1.86},${-hd * .05} ${hd * 1.86},${hd * .3} ${hd * 1.66},${hd * .36} C${hd * 1.2},${hd * .46} ${hd * .5},${hd * .62} 0,${hd * .5}Z" fill="${col}"/><ellipse cx="${hd * 1.55}" cy="${hd * .12}" rx="${hd * .3}" ry="${hd * .26}" fill="#ecdcc0"/><ellipse cx="${hd * 1.72}" cy="${hd * .04}" rx="${hd * .06}" ry="${hd * .05}" fill="#2a1a10"/>` +
      `<ellipse cx="${hd * .42}" cy="${-hd * .18}" rx="${hd * .08}" ry="${hd * .07}" fill="#120c08"/><path d="M${hd * .02},${-hd * .4} L${-hd * .05},${-hd * .82} L${hd * .2},${-hd * .48}Z" fill="${dk}"/>`;
  else if (k === 'cat') hdS = `<ellipse cx="${hd * .2}" cy="0" rx="${hd * .62}" ry="${hd * .55}" fill="${col}"/><path d="M${-hd * .2},${-hd * .35} L${-hd * .1},${-hd * .95} L${hd * .2},${-hd * .5}Z M${hd * .3},${-hd * .45} L${hd * .55},${-hd * .95} L${hd * .7},${-hd * .3}Z" fill="${col}"/><ellipse cx="${hd * .45}" cy="${-hd * .08}" rx="${hd * .1}" ry="${hd * .12}" fill="#d8c040"/><ellipse cx="${hd * .78}" cy="${hd * .15}" rx="${hd * .08}" ry="${hd * .06}" fill="#c87a7a"/>`;
  else hdS = `<ellipse cx="${hd * .15}" cy="0" rx="${hd * .6}" ry="${hd * .5}" fill="${col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02} Q${hd * 1.5},${hd * .12} ${hd * 1.36},${hd * .2} L${hd * .45},${hd * .4}Z" fill="${k === 'fox' ? '#f4e8d8' : col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02}" stroke="${k === 'fox' ? col : mix(col, '#000000', .15)}" stroke-width="${hd * .14}"/>` +
      `<ellipse cx="${hd * 1.4}" cy="${hd * .06}" rx="${hd * .12}" ry="${hd * .1}" fill="#1a1210"/><ellipse cx="${hd * .55}" cy="${-hd * .15}" rx="${hd * .08}" ry="${hd * .09}" fill="#120c08"/>` +
      `<path d="M${-hd * .25},${-hd * .3} L${-hd * .12},${-hd * (k === 'dog' ? .95 : 1.05)} L${hd * .15},${-hd * .38}Z" fill="${k === 'fox' ? '#2a1a10' : mix(col, '#000000', .15)}"/><path d="M${hd * .15},${hd * .38} Q${hd * .7},${hd * .55} ${hd * 1.2},${hd * .25}" stroke="${P.belly}" stroke-width="${hd * .14}" fill="none" opacity=".8"/>`;
  s += `<g transform="translate(${hx - hd * .1},${hy}) rotate(${ang})">${hdS}</g>`;
  return s + `</g>`;
}
function pigeon(x, y, s, t, seed = 0, fly = 0) {
  if (fly) { const fl = Math.sin(t * 16 + seed) * 10; return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-16,${-fl} Q-8,-4 0,0 Q8,-4 16,${-fl}" stroke="#3a3a40" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="1" rx="5" ry="3" fill="#5a5a62"/></g>`; }
  const pk = Math.max(0, Math.sin(t * 3 + seed)) ** 6 * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-8" rx="11" ry="7" fill="#8a8c96"/><path d="M-10,-8 l-8,3 l8,2Z" fill="#4a4c54"/><ellipse cx="9" cy="${-15 + pk}" rx="5" ry="4.5" fill="#7a7c88"/><path d="M13,${-15 + pk} l4,1 l-4,1Z" fill="#c8a880"/><ellipse cx="4" cy="-9" rx="4" ry="3" fill="#6a9a8a" opacity=".6"/><path d="M-2,-1 v4 M3,-1 v4" stroke="#c86a5a" stroke-width="1.5"/></g>`;
}
