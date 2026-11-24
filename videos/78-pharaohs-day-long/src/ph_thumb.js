// ===================== thumbnail (rendered at t=1, 1920x1080 frame scaled to 1280x720) =====================
function sceneThumb(t) { noW(); const T0 = 3;
  let s = PHDF() + siteP(T0, { px: 900, pw: 640, sun: [1150, 150, 1, 34] }) + dustP(T0, .3);
  // the haul team in the middle ground
  const sx = 470;
  s += wetP(sx + 236 * .7, 600, 50, 1);
  let g = sledgeP(sx, 666, 190) + blockP(sx + 10, 572, 170, 92);
  const hands = []; for (let i = 0; i < 5; i++) { const x = sx + 400 + i * 74, y = 690 - i; hands.push([x + 62 * .52, y - 160 * .52]); }
  g += `<path d="M${sx + 196},648 L${hands[0][0]},${hands[0][1]}` + hands.map(h => ` L${h[0].toFixed(1)},${h[1].toFixed(1)}`).join('') + ` l40,-2" stroke="#c8a070" stroke-width="3.4" fill="none"/>`;
  for (let i = 4; i >= 0; i--) { const x = sx + 400 + i * 74, y = 690 - i; g += egy(x, y, { s: .52, f: 1, i, h: { walk: T0 * 2.2 + i * 1.3, amp: .34, lean: 18, hF: hands[i], hB: [hands[i][0] - 18, hands[i][1] + 2], bendF: 1, bendB: 1 } }); }
  g += egy(sx + 300, 688, { s: .54, f: -1, i: 4, h: { hF: [sx + 268, 600], hB: [sx + 284, 628], lean: 8 } }) + `<g transform="translate(${sx + 262},${604}) rotate(-62)">${jarP(0, 0, .36)}</g>` + pourP(sx + 238, 606, sx + 236, 664, T0);
  s += `<g transform="translate(${sx * .3},${200}) scale(.7)">${g}</g>`;
  // the shine of the white face
  s += `<circle cx="900" cy="300" r="170" fill="url(#phGlow)" opacity=".55"/>`;
  // left shade for the words
  s += `<defs><linearGradient id="thL" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".55" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="760" fill="url(#thL)"/>`;
  // you, in front, looking at it
  s += egy(250, 742, { kind: 'you', s: 1.05, f: 1, i: 2, h: { hF: [356, 448], hB: [236, 640], lean: 3 } });
  const TX = (x, y, tx, fs, col) => `<text x="${x}" y="${y}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" stroke="#000" stroke-width="${fs * .09}" stroke-linejoin="round" style="paint-order:stroke">${tx}</text>`;
  s += TX(330, 170, 'رجعتَ', 120, '#ffffff') + TX(330, 320, '٤٥٠٠ سنة!', 124, '#f4c76b');
  $('cap').style.display = 'none';
  return s + grain(.06) + vign(.18); }
const SCENES = [{ s: 0, f: sceneThumb }], XF = .5;
uiInit();
