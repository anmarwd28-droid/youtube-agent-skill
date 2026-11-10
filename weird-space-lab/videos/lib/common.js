// ===== WSL common: helpers shared by every Weird Space Lab Short (English text, same look as "ماذا لو؟ Lab") =====
const SKY = ['#3a7cc4', '#8ab8e0', '#d2e4f0'];
const EN = (txt, x, y, sz, col = '#fff', anc = 'middle', w = 700, extra = '') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Inter Display, sans-serif" font-weight="${w}" font-size="${sz}" fill="${col}" ${extra}>${txt}</text>`;
const shadowE = (x, y, w, a) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * .16}" fill="#000" opacity="${a}" filter="url(#blur2)"/>`;
function floater(x, y, c, sc, face, t, lift, rot = 0, o = {}) {
  return shadowE(x, y + 2, 38 * sc / .55, .35 * Math.max(.25, 1 - lift / 160)) +
    `<g transform="rotate(${rot.toFixed(2)},${x},${y - lift - 90 * sc / .55})">` + onWalk(x, y - lift, c, sc, face, t, o) + `</g>`;
}
const wStreet = (t, o = {}) => bareStreet(t, Object.assign({ green: 1, sky: SKY, sunGlow: .28 }, o));
// a dark panel with a title, used for diagrams
const wPanel = (x, y, w, h, title = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="rgba(8,12,30,.62)" stroke="rgba(255,255,255,.16)"/>` + (title ? EN(title, x + w / 2, y + 36, 20, 'rgba(255,255,255,.6)', 'middle', 700, 'letter-spacing="2"') : '');
// a glowing sphere drawn in SVG (for things the 3D layer does not have)
function glowBall(x, y, r, c1, c2, glow = .4) {
  const id = 'gb' + Math.round(x) + '_' + Math.round(y) + '_' + Math.round(r);
  return `<defs><radialGradient id="${id}" cx=".35" cy=".32" r=".8"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>` +
    (glow > 0 ? `<circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${c1}" opacity="${glow * .5}" filter="url(#soft)"/>` : '') + `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`;
}
// the shared end card: the real Earth (or nothing), a gold question mark and the Subscribe button
function endCard(t, qT, subT, earth = true) {
  const q = ease(ramp(t, qT - .2, qT + .5)), b = Math.abs(Math.sin(t * 3)) * 6;
  if (earth) { F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 4.8 + t * .02, tilt: .41 }; F.light = [-800, 300]; F.moon = null; }
  return `<g opacity="${q}"><text x="360" y="${earth ? 470 : 640}" text-anchor="middle" font-family="Inter Display" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">?</text></g>` +
    `<g opacity="${ramp(t, subT, subT + .4)}" transform="translate(360,${1100 - b})"><rect x="-130" y="-34" width="260" height="68" rx="16" fill="#e53935"/>` + EN('SUBSCRIBE', 0, 12, 32, '#fff', 'middle', 800) + `</g>`;
}
// builds the side timeline list and the chips
function setupUI(title, tli, chips) {
  $('ui').innerHTML = `<div class="list" id="tl" style="height:${64 + tli.length * 46}px"><div class="hd">${title}</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
    tli.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
    chips.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
}
// a simple sci-fi arrow
const wArrow = (x1, y1, x2, y2, col = '#f4c76b', w = 4, a = 1) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${col}" stroke-width="${w}" marker-end="url(#${col === '#f4c76b' ? 'arrY' : 'arrW'})" opacity="${a}"/>`;
// real photo texture (Poly Haven, CC0) as an SVG pattern; overlay it on a drawn shape with mix-blend-mode so the style stays the same
const photoPat = (id, file, size = 400, x = 0, y = 0) => `<pattern id="${id}" patternUnits="userSpaceOnUse" x="${x}" y="${y}" width="${size}" height="${size}"><image href="textures/${file}.jpg" width="${size}" height="${size}" preserveAspectRatio="none"/></pattern>`;
const photoFill = (d, id, op = .55, mode = 'multiply') => `<path d="${d}" fill="url(#${id})" opacity="${op}" style="mix-blend-mode:${mode}"/>`;
