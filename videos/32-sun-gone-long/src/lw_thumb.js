// ===================== thumbnail (rendered at t=1, scaled to 1280x720) =====================
function sceneThumb(t) {
  const cam = orbit(5.6, .1, .5, [1.3 * Math.cos(.5), .25, -1.3 * Math.sin(.5)]), sp = [-2.3, 1.22, -1.2];
  F.w = { set: 'space', cam, L: [-1, .5, .1], disc: { m: 1, spin: 3.75, clouds: .5, sunI: .22, lights: 1, amb: .16 }, sun: { pos: sp, r: .78, a: .5 } };
  const s = proj3w(cam, sp), r = RS(5); let bits = '';
  for (let i = 0; i < 70; i++) { const a = -0.9 + r() * 2.2, d = 120 + r() * 330, z = 3 + r() * 9; bits += `<circle cx="${(s[0] + Math.cos(a) * d).toFixed(1)}" cy="${(s[1] + Math.sin(a) * d * .8).toFixed(1)}" r="${z.toFixed(1)}" fill="${r() > .5 ? '#ffd870' : '#ff9a3a'}" opacity="${(.85 - d / 520).toFixed(2)}"/>`; }
  const T = (x, y, tx, fs, col) => `<text x="${x}" y="${y}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" stroke="#000" stroke-width="${fs * .09}" stroke-linejoin="round" style="paint-order:stroke">${tx}</text>`;
  F.ov = bits + 
    `` + T(950, 250, 'اختفتِ', 176, '#ffffff') + T(950, 462, 'الشمس!', 190, '#f4c76b') +
    `<rect x="700" y="540" width="540" height="92" rx="22" fill="#e53935"/>` + `<text x="970" y="604" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="52" fill="#fff">حتى مليونِ سنة</text>`;
  $('cap').style.display = 'none';
  return spaceW(t, { mw: .5, mwy: 640, mwa: -6 });
}
const SCENES = [{ s: 0, f: sceneThumb }], XF = .5;
uiInit();
