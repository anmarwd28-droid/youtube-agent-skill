// Full 3D world for "what if the Sun disappeared" (three.js r160).
// Two renderers (prev/current scene) so scenes can crossfade with CSS opacity.
import * as THREE from './three.module.js';

const W = 720, H = 1280, ASPECT = W / H;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => { k = clamp(k); return k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; };
const ramp = (t, a, b) => clamp((t - a) / (b - a));
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

// ---------------------------------------------------------------- textures
function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
const windowsTex = (seed, lit) => canvasTex(256, 512, (g, w, h) => {
  const r = rng(seed); g.fillStyle = lit ? '#000' : '#c9b9a0'; g.fillRect(0, 0, w, h);
  for (let y = 18; y < h - 20; y += 44) for (let x = 14; x < w - 20; x += 40) {
    const on = r() > .45;
    g.fillStyle = lit ? (on ? `rgba(255,${190 + r() * 40},${110 + r() * 50},1)` : '#000') : (r() > .5 ? '#5d6f80' : '#46586a');
    g.fillRect(x, y, 22, 28);
  }
});
const glowSprite = (inner = 'rgba(255,220,160,1)') => canvasTex(128, 128, (g, w, h) => {
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, inner); gr.addColorStop(.35, inner.replace(/,1\)$/, ',.35)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
}, false);
const dotSprite = canvasTex(32, 32, (g) => { const gr = g.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 32); }, false);
const smokeSprite = canvasTex(128, 128, (g) => { const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(62,56,52,.9)'); gr.addColorStop(.6, 'rgba(48,44,40,.4)'); gr.addColorStop(1, 'rgba(40,36,34,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); }, false);
const iceTex = canvasTex(1024, 1024, (g, w, h) => {
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#9fc4de'); gr.addColorStop(1, '#e3f3ff'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  const r = rng(4); g.strokeStyle = 'rgba(70,110,150,.55)'; g.lineWidth = 2.5;
  for (let i = 0; i < 40; i++) { let x = r() * w, y = r() * h; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 7; j++) { x += (r() - .5) * 160; y += (r() - .5) * 160; g.lineTo(x, y); } g.stroke(); }
  for (let i = 0; i < 2000; i++) { g.fillStyle = `rgba(255,255,255,${r() * .25})`; g.fillRect(r() * w, r() * h, 2, 2); }
});
const asphaltTex = canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = '#3a3b3f'; g.fillRect(0, 0, w, h); const r = rng(8);
  for (let i = 0; i < 6000; i++) { const v = 40 + r() * 40; g.fillStyle = `rgb(${v},${v},${v + 3})`; g.fillRect(r() * w, r() * h, 2, 2); }
});
asphaltTex.wrapS = asphaltTex.wrapT = THREE.RepeatWrapping; asphaltTex.repeat.set(4, 4);
const paverTex = canvasTex(512, 512, (g, w, h) => {
  g.fillStyle = '#b9ad9a'; g.fillRect(0, 0, w, h); g.strokeStyle = 'rgba(80,70,60,.5)'; g.lineWidth = 3;
  for (let y = 0; y < h; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); for (let x = (y / 64) % 2 * 32; x < w; x += 64) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 64); g.stroke(); } }
});
paverTex.wrapS = paverTex.wrapT = THREE.RepeatWrapping; paverTex.repeat.set(6, 2);

const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: 0, ...o });

// ---------------------------------------------------------------- people
// A jointed figure facing +x. Height ~1.75 units, feet at y=0.
function makePerson(o) {
  const g = new THREE.Group(), skin = std(o.skin, { roughness: .6 }), top = std(o.top), pants = std(o.pants), shoe = std('#2b2622', { roughness: .5 });
  const coat = o.coat ? 1 : 0;
  const hips = new THREE.Group(); hips.position.y = .95; g.add(hips);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.17 + coat * .04, .42, 6, 16), top); torso.position.y = .33; torso.scale.set(1, 1, .72); torso.castShadow = true; hips.add(torso);
  if (coat) { const skirt = new THREE.Mesh(new THREE.CylinderGeometry(.21, .24, .3, 16), top); skirt.position.y = .02; skirt.scale.z = .75; skirt.castShadow = true; hips.add(skirt); }
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.05, .055, .1, 10), skin); neck.position.y = .68; hips.add(neck);
  const head = new THREE.Group(); head.position.y = .82; hips.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(.115, 24, 18), skin); skull.scale.set(1.05, 1.18, .95); skull.castShadow = true; head.add(skull);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(.025, .06, 8), skin); nose.rotation.z = -Math.PI / 2; nose.position.set(.12, -.01, 0); head.add(nose);
  for (const z of [-.045, .045]) { const eye = new THREE.Mesh(new THREE.SphereGeometry(.016, 8, 6), std('#151010', { roughness: .3 })); eye.position.set(.1, .025, z); head.add(eye); }
  if (o.hat) { const hat = new THREE.Mesh(new THREE.SphereGeometry(.125, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), std(o.hat)); hat.position.y = .03; hat.scale.set(1.08, 1.05, 1.0); head.add(hat);
    const pom = new THREE.Mesh(new THREE.SphereGeometry(.035, 10, 8), std(o.hat)); pom.position.y = .16; head.add(pom); }
  else { const hair = new THREE.Mesh(new THREE.SphereGeometry(.122, 20, 12, Math.PI * .55, Math.PI * 1.45, 0, Math.PI * .55), std(o.hair, { roughness: .9 })); hair.position.y = .025; hair.scale.set(1.04, 1.12, 1.0); head.add(hair); }
  if (o.scarf) { const sc = new THREE.Mesh(new THREE.TorusGeometry(.085, .04, 8, 18), std(o.scarf)); sc.rotation.x = Math.PI / 2; sc.position.y = .66; hips.add(sc); }
  const mkLeg = z => { const hip = new THREE.Group(); hip.position.set(0, 0, z); hips.add(hip);
    const th = new THREE.Mesh(new THREE.CapsuleGeometry(.075, .34, 4, 10), pants); th.position.y = -.22; th.castShadow = true; hip.add(th);
    const knee = new THREE.Group(); knee.position.y = -.45; hip.add(knee);
    const sh = new THREE.Mesh(new THREE.CapsuleGeometry(.062, .34, 4, 10), pants); sh.position.y = -.21; sh.castShadow = true; knee.add(sh);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(.24, .07, .1), shoe); foot.position.set(.05, -.46, 0); foot.castShadow = true; knee.add(foot);
    return { hip, knee }; };
  const mkArm = z => { const sh = new THREE.Group(); sh.position.set(0, .58, z); hips.add(sh);
    const up = new THREE.Mesh(new THREE.CapsuleGeometry(.055 + coat * .015, .24, 4, 10), top); up.position.y = -.16; up.castShadow = true; sh.add(up);
    const el = new THREE.Group(); el.position.y = -.31; sh.add(el);
    const fo = new THREE.Mesh(new THREE.CapsuleGeometry(.047 + coat * .012, .22, 4, 10), top); fo.position.y = -.14; fo.castShadow = true; el.add(fo);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(.045, 10, 8), skin); hand.position.y = -.3; el.add(hand);
    return { sh, el, hand }; };
  const legL = mkLeg(.09), legR = mkLeg(-.09), armL = mkArm(.21 + coat * .03), armR = mkArm(-.21 - coat * .03);
  const p = { g, hips, head, legL, legR, armL, armR, phone: null };
  if (o.phone) { const ph = new THREE.Mesh(new THREE.BoxGeometry(.03, .14, .07), std('#111', { emissive: '#ffffff', emissiveIntensity: 0 })); ph.position.set(.02, -.36, 0); armR.el.add(ph); p.phone = ph;
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite('rgba(255,255,240,1)'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 }));
    glow.scale.set(.9, .9, 1); glow.position.set(.03, -.36, 0); armR.el.add(glow); p.glow = glow; }
  g.scale.setScalar(o.s || 1);
  return p;
}
// pose: walk phase (radians), amp, lookUp 0..1, phone 0..1, hug 0..1
function posePerson(p, q) {
  const A = q.walk ? (q.amp || .38) : 0, ph = q.phase || 0;
  const leg = (L, x) => { L.hip.rotation.z = A * Math.sin(x); L.knee.rotation.z = -(A ? (Math.max(0, Math.cos(x)) * .85 + .05) : 0); };
  leg(p.legL, ph); leg(p.legR, ph + Math.PI);
  p.hips.position.y = .95 - (A ? Math.abs(Math.sin(ph)) * .03 : 0);
  const sw = -A * .75 * Math.sin(ph);
  p.armL.sh.rotation.z = sw; p.armL.el.rotation.z = .25 + (A ? .15 : 0);
  p.armR.sh.rotation.z = -sw; p.armR.el.rotation.z = .25 + (A ? .15 : 0);
  if (q.hug) { const h = q.hug; for (const a of [p.armL, p.armR]) { a.sh.rotation.z = lerp(a.sh.rotation.z, .45, h); a.el.rotation.z = lerp(a.el.rotation.z, 2.0, h); }
    p.armL.sh.rotation.x = -.35 * h; p.armR.sh.rotation.x = .35 * h; }
  if (q.phone) { const k = q.phone; p.armR.sh.rotation.z = lerp(p.armR.sh.rotation.z, 2.4, k); p.armR.el.rotation.z = lerp(p.armR.el.rotation.z, .25, k);
    if (p.phone) { p.phone.material.emissiveIntensity = 3 * k; p.glow.material.opacity = .9 * k; } }
  p.head.rotation.z = .45 * (q.lookUp || 0);
  p.hips.rotation.z = q.lean || 0;
}

// project a person (feet at g.position, height 1.75*scale) to screen pixels for the 2D overlay
const _v = new THREE.Vector3();
function toScreen(p, cam) {
  cam.updateMatrixWorld(); p.g.updateMatrixWorld();
  _v.set(p.g.position.x, 0, p.g.position.z).project(cam); const x = (_v.x + 1) / 2 * W, y = (1 - _v.y) / 2 * H;
  _v.set(p.g.position.x, 1.75 * p.g.scale.y, p.g.position.z).project(cam); const yh = (1 - _v.y) / 2 * H;
  return { x, y, h: y - yh, depth: p.g.position.z };
}
// ---------------------------------------------------------------- city pieces
function palm(h, col) {
  const g = new THREE.Group(), m = std(col, { roughness: .9 });
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(.15, h * .5, 0), new THREE.Vector3(.45, h, 0)]);
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 16, .09, 8), m); trunk.castShadow = true; g.add(trunk);
  const leafM = std(col === '#4a3a2a' ? '#3f6b3a' : col, { side: THREE.DoubleSide, roughness: .85 });
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2;
    const lc = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * .7, .25, Math.sin(a) * .7), new THREE.Vector3(Math.cos(a) * 1.4, -.35, Math.sin(a) * 1.4)]);
    const leaf = new THREE.Mesh(new THREE.TubeGeometry(lc, 10, .06, 4), leafM); leaf.scale.set(1, 1, 1); leaf.position.set(.45, h, 0); leaf.castShadow = true; g.add(leaf); }
  return g;
}
function buildCity(scene, opts) {
  const r = rng(opts.seed || 5), city = new THREE.Group(); scene.add(city);
  const winDay = [windowsTex(3, false), windowsTex(4, false)], winNight = [windowsTex(3, true), windowsTex(4, true)];
  const blds = [];
  for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) {
    const w = 1.8 + r() * 1.8, h = 2.6 + r() * 4.5 + row * 3.5, d = 1.6 + r() * 1.4, x = -10 + i * 2.5 + r() * .6, z = -7 - row * 7 - r() * 2;
    const col = ['#cdbb9c', '#bfa98a', '#d6c6a8', '#a99882'][Math.floor(r() * 4)];
    const mat = std(col, { map: winDay[i % 2], emissiveMap: winNight[i % 2], emissive: '#ffd9a0', emissiveIntensity: 0 });
    mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); b.position.set(x, h / 2, z); b.castShadow = b.receiveShadow = true; city.add(b); blds.push(mat);
    if (opts.snow) { const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 1.02, .12, d * 1.02), std('#eef6ff')); cap.position.set(x, h + .06, z); city.add(cap); }
    if (r() < .18) { const dome = new THREE.Mesh(new THREE.SphereGeometry(w * .45, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), std(r() < .5 ? '#3f8fa0' : '#d9c79e', { roughness: .4 }));
      dome.position.set(x, h, z); city.add(dome); if (opts.snow) { dome.material = std('#eef6ff', { roughness: .5 }); } }
    if (r() < .1) { const mn = new THREE.Group(); const sh = new THREE.Mesh(new THREE.CylinderGeometry(.18, .22, 6, 12), std('#d9c79e')); sh.position.y = 3; mn.add(sh);
      const bal = new THREE.Mesh(new THREE.CylinderGeometry(.32, .32, .15, 12), std('#cdbb9c')); bal.position.y = 5; mn.add(bal);
      const tip = new THREE.Mesh(new THREE.ConeGeometry(.2, .7, 12), std('#3f8fa0', { roughness: .4 })); tip.position.y = 6.35; mn.add(tip);
      mn.position.set(x + w * .4, h, z); city.add(mn); }
  }
  // street
  const side = new THREE.Mesh(new THREE.PlaneGeometry(40, 4), std(opts.snow ? '#e8f1fa' : '#b9ad9a', { map: opts.snow ? null : paverTex })); side.rotation.x = -Math.PI / 2; side.position.set(0, 0, -.6); side.receiveShadow = true; scene.add(side);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(40, 12), std(opts.snow ? '#d7e4ef' : '#3a3b3f', { map: opts.snow ? null : asphaltTex, roughness: .95 })); road.rotation.x = -Math.PI / 2; road.position.set(0, -.02, 7.4); road.receiveShadow = true; scene.add(road);
  const curb = new THREE.Mesh(new THREE.BoxGeometry(40, .14, .25), std(opts.snow ? '#f2f8ff' : '#9c9488')); curb.position.set(0, .06, 1.42); scene.add(curb);
  if (!opts.snow) for (let i = -8; i < 9; i++) { const dl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .14), std('#e8e4da')); dl.rotation.x = -Math.PI / 2; dl.position.set(i * 2.4, -.01, 5.2); scene.add(dl); }
  const back = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), std(opts.snow ? '#e8f1fa' : '#a99882')); back.rotation.x = -Math.PI / 2; back.position.set(0, -.03, -14); scene.add(back);
  // palms and lamps
  const palms = [palm(4.2, '#4a3a2a'), palm(3.6, '#4a3a2a')]; palms[0].position.set(-3.6, 0, -3.4); palms[1].position.set(3.9, 0, -4.2); palms[1].rotation.y = Math.PI; palms.forEach(p => scene.add(p));
  if (opts.snow) palms.forEach(p => p.traverse(m => { if (m.isMesh) m.material = std('#dfe9f2', { side: THREE.DoubleSide }); }));
  const lamps = [];
  for (const x of [-2.4, 2.6]) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(.05, .07, 4.2, 10), std('#1b1d22', { metalness: .6, roughness: .4 })); pole.position.set(x, 2.1, -.2); scene.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(.6, .06, .06), std('#1b1d22')); arm.position.set(x + .3, 4.15, -.2); scene.add(arm);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 8), std('#ffe2ad', { emissive: '#ffd08a', emissiveIntensity: 0 })); bulb.position.set(x + .58, 4.05, -.2); scene.add(bulb);
    const light = new THREE.PointLight('#ffcf8a', 0, 9, 1.6); light.position.copy(bulb.position); scene.add(light);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 })); halo.scale.set(2.4, 2.4, 1); halo.position.copy(bulb.position); scene.add(halo);
    lamps.push({ bulb, light, halo }); }
  return { blds, lamps };
}
function stars(n, spread, size, seed = 9) {
  const r = rng(seed), pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { pos[i * 3] = (r() - .5) * spread[0]; pos[i * 3 + 1] = r() * spread[1] + spread[2]; pos[i * 3 + 2] = -spread[3]; }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ map: dotSprite, size, transparent: true, depthWrite: false, opacity: 1, sizeAttenuation: true }));
}
function particles(n, box, size, color, seed) {
  const r = rng(seed), pos = new Float32Array(n * 3), base = [];
  for (let i = 0; i < n; i++) { const p = [box[0] + r() * box[3], box[1] + r() * box[4], box[2] + r() * box[5]]; base.push(p); pos.set(p, i * 3); }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: dotSprite, size, color, transparent: true, depthWrite: false, opacity: .9 }));
  pts.userData = { base, box, r: Array.from({ length: n }, () => r()) };
  return pts;
}
function moveParticles(pts, t, vx, vy, vz, wob = .2) {
  const { base, box, r } = pts.userData, a = pts.geometry.attributes.position;
  for (let i = 0; i < base.length; i++) {
    const s = .6 + r[i] * .8;
    let x = base[i][0] + vx * t * s + Math.sin(t * 1.3 + i) * wob, y = base[i][1] + vy * t * s, z = base[i][2] + vz * t * s;
    x = box[0] + ((x - box[0]) % box[3] + box[3]) % box[3]; y = box[1] + ((y - box[1]) % box[4] + box[4]) % box[4]; z = box[2] + ((z - box[2]) % box[5] + box[5]) % box[5];
    a.setXYZ(i, x, y, z);
  }
  a.needsUpdate = true;
}
function skyTex(top, bot) { return canvasTex(8, 256, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, top); gr.addColorStop(1, bot); g.fillStyle = gr; g.fillRect(0, 0, w, h); }); }

// ---------------------------------------------------------------- scenes
export async function build(tex) {
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds, moonTex] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png', 'tex/moon_1024.jpg'].map(load));
  const moonTexSRGB = moonTex.clone(); moonTexSRGB.colorSpace = THREE.SRGBColorSpace; moonTexSRGB.needsUpdate = true;
  const vert = `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const mkEarth = () => {
    const mat = new THREE.ShaderMaterial({ uniforms: { day: { value: day }, night: { value: night }, clouds: { value: clouds }, L: { value: new THREE.Vector3(-1, 0, .3) }, sunI: { value: 1 }, lights: { value: 0 }, cloudOff: { value: 0 } },
      vertexShader: vert,
      fragmentShader: `uniform sampler2D day, night, clouds; uniform vec3 L; uniform float sunI, lights, cloudOff; varying vec3 vN; varying vec2 vUv;
        void main(){ vec3 n = normalize(vN); float d = dot(n, normalize(L)); float lit = smoothstep(-0.08, 0.35, d) * sunI;
          vec3 dc = texture2D(day, vUv).rgb; float cl = texture2D(clouds, vUv + vec2(cloudOff, 0.0)).a; vec3 nl = texture2D(night, vUv).rgb;
          vec3 col = mix(dc, vec3(1.0), cl * 0.75) * (0.012 + 0.06 * sunI + 1.05 * lit);
          col += nl * vec3(1.0, 0.82, 0.55) * (1.0 - lit) * (1.0 - cl * 0.7) * lights * 1.6;
          float rim = pow(1.0 - max(n.z, 0.0), 2.6); col += vec3(0.35, 0.62, 1.0) * rim * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
          gl_FragColor = vec4(col, 1.0); }` });
    const e = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), mat); e.rotation.z = .41;
    const atm = new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 48), new THREE.ShaderMaterial({ uniforms: { L: mat.uniforms.L, sunI: mat.uniforms.sunI }, vertexShader: vert, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      fragmentShader: `uniform vec3 L; uniform float sunI; varying vec3 vN; void main(){ vec3 n = normalize(vN); float rim = pow(1.0 - max(n.z,0.0), 3.0); float d = smoothstep(-0.3, 0.7, dot(n, normalize(L))); gl_FragColor = vec4(vec3(0.3,0.6,1.0) * rim * (0.05 + d * sunI), 1.0); }` }));
    const g = new THREE.Group(); g.add(e, atm); g.userData = { e, mat }; return g; };
  const mkMoon = () => new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), new THREE.ShaderMaterial({ uniforms: { tex: { value: moonTex }, L: { value: new THREE.Vector3(-1, 0, .3) }, sunI: { value: 1 } }, vertexShader: vert,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L; uniform float sunI; varying vec3 vN; varying vec2 vUv; void main(){ vec3 n = normalize(vN); float lit = max(dot(n, normalize(L)), 0.0) * sunI; gl_FragColor = vec4(texture2D(tex, vUv).rgb * (0.025 + 1.15 * lit), 1.0); }` }));
  const mkSun = () => new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, alpha: { value: 1 } }, transparent: true,
    vertexShader: `varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float t, alpha; varying vec3 vP; varying vec3 vN;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y), mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * n3(p); p *= 2.03; a *= 0.5; } return s; }
      void main(){ vec3 n = normalize(vN); float mu = max(n.z, 0.0); float g = fbm(vP * 6.0 + vec3(0.0, 0.0, t * 0.25)); float g2 = fbm(vP * 18.0 - vec3(t * 0.4));
        vec3 c = mix(vec3(1.0,0.55,0.12), vec3(1.0,0.93,0.65), g * 0.8 + g2 * 0.35); c *= 0.45 + 0.65 * pow(mu, 0.45); gl_FragColor = vec4(c * 1.15, alpha); }` }));
  const glow = (col, s) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite(col), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); sp.scale.set(s, s, 1); return sp; };
  const ortho = () => { const c = new THREE.OrthographicCamera(0, W, 0, -H, -3000, 3000); c.position.z = 1000; return c; };
  const pix = (o, x, y, r) => { o.position.set(x, -y, 0); o.scale.setScalar(r); };
  const setL = (mat, from, to) => mat.uniforms.L.value.set(from[0] - to[0], -(from[1] - to[1]), 140).normalize();

  // ---- space: sun, earth, moon, light front
  const S = {}; {
    const sc = new THREE.Scene(), cam = ortho(); sc.background = skyTex('#05081a', '#0d1130');
    const st = stars(500, [W * 1.2, H * 1.1, -H * 1.05, 500], 3.2); st.position.x = W / 2; sc.add(st);
    const sun = mkSun(), sg = glow('rgba(255,200,120,1)', 1), earth = mkEarth(), moon = mkMoon();
    const beam = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: canvasTex(256, 64, (g, w, h) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, 'rgba(255,230,170,0)'); gr.addColorStop(.5, 'rgba(255,230,170,.5)'); gr.addColorStop(1, 'rgba(255,230,170,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); }, false), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    const front = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: '#fff3d0', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sc.add(sg, sun, beam, front, earth, moon);
    Object.assign(S, { sc, cam, sun, sg, earth, moon, beam, front });
  }
  S.update = (t, T) => {
    const SUN = [130, 690], EARTH = [500, 780], vanish = ramp(t, T.vanish, T.vanish + .35), zoom = 1 + ramp(t, 0, 9) * .06;
    const Z = p => [360 + (p[0] - 360) * zoom, 740 + (p[1] - 740) * zoom], sp = Z(SUN), ep = Z(EARTH);
    S.sun.visible = vanish < 1; S.sg.visible = vanish < 1; pix(S.sun, sp[0], sp[1], 104 * zoom * (1 - vanish * .25)); S.sun.material.uniforms.t.value = t; S.sun.material.uniforms.alpha.value = 1 - vanish;
    pix(S.sg, sp[0], sp[1], 1); S.sg.scale.set(900 * zoom, 900 * zoom, 1); S.sg.material.opacity = 1 - vanish;
    const dark = ease(ramp(t, T.arrive, T.arrive + 1));
    pix(S.earth, ep[0], ep[1], 80 * zoom); S.earth.userData.e.rotation.y = .6 + t * .03; setL(S.earth.userData.mat, sp, ep);
    S.earth.userData.mat.uniforms.sunI.value = 1 - dark; S.earth.userData.mat.uniforms.lights.value = dark; S.earth.userData.mat.uniforms.cloudOff.value = t * .004;
    const ma = .8 + t * .3, mp = [ep[0] + Math.cos(ma) * 150 * zoom, ep[1] + Math.sin(ma) * 50 * zoom];
    pix(S.moon, mp[0], mp[1], 18 * zoom); S.moon.position.z = Math.sin(ma) * 200; setL(S.moon.material, sp, mp); S.moon.material.uniforms.sunI.value = 1 - dark; S.moon.rotation.y = 4.2;
    // beam: from travelling front to earth
    const dist = Math.hypot(ep[0] - sp[0], ep[1] - sp[1]), f = clamp((t - T.vanish) / (T.arrive - T.vanish)) * dist, ang = Math.atan2(-(ep[1] - sp[1]), ep[0] - sp[0]);
    const fx = sp[0] + (ep[0] - sp[0]) / dist * f, fy = sp[1] + (ep[1] - sp[1]) / dist * f, len = Math.max(1, dist - f);
    S.beam.visible = f < dist - 2; S.beam.position.set((fx + ep[0]) / 2, -(fy + ep[1]) / 2, -5); S.beam.rotation.z = ang; S.beam.scale.set(len, 190, 1); S.beam.material.opacity = t < T.vanish ? .35 : .45;
    S.front.visible = t > T.vanish && f < dist - 2; S.front.position.set(fx, -fy, -4); S.front.rotation.z = ang; S.front.scale.set(5, 150, 1);
  };

  // ---- street (day -> sudden night), reused for the week-later snow street
  function mkStreet(snow) {
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(44, ASPECT, .1, 200); cam.position.set(0, 1.45, 10.2); cam.lookAt(0, 2.8, 0);
    sc.fog = new THREE.Fog(snow ? '#2a3550' : '#c9dcea', 12, 40);
    const hemi = new THREE.HemisphereLight('#cfe6ff', '#8a7a66', 1.1), sunL = new THREE.DirectionalLight('#fff1d6', 2.6); sunL.position.set(-6, 10, 6); sunL.castShadow = true;
    sunL.shadow.mapSize.set(1024, 1024); Object.assign(sunL.shadow.camera, { left: -10, right: 10, top: 10, bottom: -4, near: 1, far: 40 }); sunL.shadow.bias = -.0008;
    sc.add(hemi, sunL);
    const city = buildCity(sc, { snow, seed: 5 });
    const st = stars(400, [60, 30, 4, 45], .35); sc.add(st);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshBasicMaterial({ map: moonTexSRGB, transparent: true })); moon.position.set(-2.6, 9.2, -30); moon.scale.setScalar(.9); sc.add(moon);
    const moonGlow = glow('rgba(230,235,255,1)', 5); moonGlow.position.copy(moon.position); sc.add(moonGlow);
    return { sc, cam, hemi, sunL, city, st, moon, moonGlow };
  }
  const ST = mkStreet(false);
  const CROWD = [{ x: -2.8, d: 1, top: '#8a3b3b', skin: '#a46a46', hair: '#1b1410', s: 1.0, z: .6 }, { x: 3.0, d: -1, top: '#3f6b5a', skin: '#c08a66', hair: '#2a1d16', s: 1.04, z: .2, phone: 1 },
                 { x: -1.2, d: 1, top: '#2f4b7e', skin: '#8d5a3b', hair: '#17110d', s: 1.08, z: 1.1, phone: 1 }, { x: 1.4, d: -1, top: '#7a6a4a', skin: '#b07a55', hair: '#1d1612', s: .96, z: .4 }];
  ST.people = CROWD.map(c => { const p = makePerson({ top: c.top, pants: '#2a2c34', skin: c.skin, hair: c.hair, s: c.s, phone: c.phone }); p.g.position.set(c.x, 0, c.z); p.g.rotation.y = c.d > 0 ? 0 : Math.PI; p.g.visible = false; ST.sc.add(p.g); p.c = c; return p; });
  ST.update = (t, T) => {
    const d0 = T.arrive, dark = ease(ramp(t, d0, d0 + .35)), lamps = ramp(t, d0 + .9, d0 + 1.15), win = ease(ramp(t, d0 + 1, d0 + 2.6)), mf = ease(ramp(t, T.moonOff, T.moonOff + .8));
    ST.sc.background = dark > .5 ? skyTex('#020409', '#0d1428') : skyTex('#3d7cc9', '#cfe5f5'); ST.sc.fog.color.set(dark > .5 ? '#0b1020' : '#c9dcea');
    ST.sunL.intensity = 2.6 * (1 - dark); ST.hemi.intensity = lerp(1.1, .06, dark); ST.hemi.color.set(dark > .5 ? '#6f86b5' : '#cfe6ff');
    ST.st.material.opacity = dark; ST.moon.material.opacity = lerp(.55, 1, dark) * (1 - mf * .93); ST.moonGlow.material.opacity = dark * .5 * (1 - mf);
    ST.city.lamps.forEach(l => { l.light.intensity = 26 * lamps; l.bulb.material.emissiveIntensity = 3 * lamps; l.halo.material.opacity = .8 * lamps; });
    ST.city.blds.forEach(m => m.emissiveIntensity = .75 * win);
    ST.people.forEach((p, i) => { const c = p.c, walkEnd = d0 + .3 + i * .1, wt = Math.min(t, walkEnd) - T.streetIn;
      const omega = 4.2, spd = 2 * .8 * c.s * Math.sin(.36) * omega / Math.PI;     // matches the 2D figure's stride: no foot sliding
      p.g.position.x = c.x + c.d * wt * spd;
      p.q = { moving: t < walkEnd, phase: wt * omega, amp: .36, lookUp: ease(ramp(t, d0 + .35 + i * .12, d0 + .9 + i * .12)), phone: c.phone ? ease(ramp(t, d0 + 1.3 + i * .25, d0 + 1.7 + i * .25)) : 0 }; });
    ST.cam.position.x = Math.sin(t * .2) * .15; ST.cam.lookAt(0, 2.8 + ease(ramp(t, d0 + .3, d0 + 2)) * 1.2, 0);
    ST.people2d = ST.people.map(p => ({ ...toScreen(p, ST.cam), c: p.c, q: p.q, light: lerp(1, .5, dark) }));
  };

  // ---- week later: snowy night street, people in coats round a fire barrel
  const WK = mkStreet(true);
  WK.sunL.intensity = 0; WK.hemi.intensity = .18; WK.hemi.color.set('#8ea6d6'); WK.sc.background = skyTex('#03060e', '#1d2a46'); WK.st.material.opacity = .8; WK.moon.visible = false; WK.moonGlow.visible = false;
  WK.city.lamps.forEach(l => { l.light.intensity = 22; l.bulb.material.emissiveIntensity = 3; l.halo.material.opacity = .7; }); WK.city.blds.forEach(m => m.emissiveIntensity = .35);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.32, .3, .8, 20, 1, true), std('#3d3a3a', { metalness: .5, roughness: .6, side: THREE.DoubleSide })); barrel.position.set(0, .4, .4); WK.sc.add(barrel);
  const fireL = new THREE.PointLight('#ff8a3a', 30, 7, 1.5); fireL.position.set(0, 1.1, .4); WK.sc.add(fireL);
  const flames = Array.from({ length: 5 }, (_, i) => { const f = glow(i % 2 ? 'rgba(255,150,60,1)' : 'rgba(255,220,120,1)', .8); f.position.set(0, 1, .4); WK.sc.add(f); return f; });
  const PP = [{ x: -.95, top: '#5b2c2c', hat: '#2b3a55', scarf: '#c9a14a', skin: '#a46a46', d: 1 }, { x: .95, top: '#2f4b5e', hat: '#4a3b2a', scarf: '#9a2f3a', skin: '#c08a66', d: -1 }, { x: -.4, top: '#3c4a3a', hat: '#6b2f2f', scarf: '#d8d2c4', skin: '#8d5a3b', d: 1, s: .7, z: 1.1 }];
  WK.people = PP.map(c => { const p = makePerson({ top: c.top, pants: '#24262e', skin: c.skin, hair: '#17110d', coat: true, hat: c.hat, scarf: c.scarf, s: c.s || 1.02 }); p.g.position.set(c.x, 0, c.z || .3); p.g.rotation.y = c.d > 0 ? -.25 : Math.PI + .25; p.g.visible = false; p.c = c; WK.sc.add(p.g); return p; });
  WK.snow = particles(1400, [-8, 0, -6, 16, 9, 14], .07, '#ffffff', 3); WK.sc.add(WK.snow);
  WK.breath = Array.from({ length: 9 }, (_, i) => { const b = glow('rgba(235,245,255,1)', .3); WK.sc.add(b); return b; });
  WK.update = (t, T) => {
    const fl = 1 + Math.sin(t * 13) * .12 + Math.sin(t * 7.3) * .08; fireL.intensity = 30 * fl;
    flames.forEach((f, i) => { const p = (t * 1.4 + i / 5) % 1; f.position.set(Math.sin(t * 5 + i) * .07, .85 + p * .6, .4); f.scale.setScalar((.9 - p * .6) * fl); f.material.opacity = 1 - p; });
    WK.people.forEach((p, i) => posePerson(p, { hug: 1, lookUp: 0 }));
    WK.breath.forEach((b, i) => { const pi = i % 3, k = ((t * .5 + i / 9) % 1), P = WK.people[pi], dir = pi === 1 ? -1 : 1;
      b.position.set(P.g.position.x + dir * (.22 + k * .35) * (PP[pi].s || 1), (1.72 + k * .15) * (PP[pi].s || 1), P.g.position.z); b.scale.setScalar(.15 + k * .5); b.material.opacity = (1 - k) * .5; });
    moveParticles(WK.snow, t, .25, -1.2, 0, .25);
    WK.cam.position.set(Math.sin(t * .2) * .2, 1.5, 7.6 - ramp(t, T.week, T.week + 3.6) * .9); WK.cam.lookAt(0, 1.9, 0);
    WK.breath.forEach(b => b.visible = false);
    WK.people2d = WK.people.map(p => ({ ...toScreen(p, WK.cam), c: p.c, light: .78 + .08 * Math.sin(t * 13) }));
  };

  // ---- a year later: the frozen river
  const YR = {}; {
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, ASPECT, .1, 300); cam.position.set(0, 2.2, 10); cam.lookAt(0, 1.6, 0);
    sc.background = skyTex('#040814', '#2a3f62'); sc.fog = new THREE.FogExp2('#2c3e5c', .026);
    sc.add(new THREE.HemisphereLight('#a9c0e6', '#f0f8ff', 1.1)); const cold = new THREE.DirectionalLight('#b9cdf0', .9); cold.position.set(4, 10, 6); sc.add(cold);
    const ice = new THREE.Mesh(new THREE.PlaneGeometry(80, 60), std('#ffffff', { map: iceTex, roughness: .25, metalness: .1 })); ice.rotation.x = -Math.PI / 2; ice.receiveShadow = true; sc.add(ice);
    const bank = new THREE.Mesh(new THREE.BoxGeometry(80, 1.2, 6), std('#e8f2fb')); bank.position.set(0, .3, -22); sc.add(bank);
    const city = new THREE.Group(); const r = rng(21);
    for (let i = 0; i < 16; i++) { const w = 2 + r() * 3, h = 3 + r() * 9, b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3), std('#3a4a66')); b.position.set(-30 + i * 4.2, h / 2 + .9, -26); city.add(b);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(w, .3, 3.1), std('#f2f8ff')); cap.position.set(b.position.x, h + 1, -26); city.add(cap); }
    sc.add(city);
    for (const x of [-9, 7]) { const p = palm(4.5, '#4a3a2a'); p.traverse(m => { if (m.isMesh) m.material = std('#dfe9f2', { side: THREE.DoubleSide }); }); p.position.set(x, .9, -20); sc.add(p); }
    // bridge with icicles
    const deck = new THREE.Mesh(new THREE.BoxGeometry(60, .5, 2.2), std('#56657e')); deck.position.set(0, 5.2, -9); sc.add(deck);
    const snowDeck = new THREE.Mesh(new THREE.BoxGeometry(60, .14, 2.3), std('#f4f9ff')); snowDeck.position.set(0, 5.52, -9); sc.add(snowDeck);
    for (let i = -5; i <= 5; i++) { const pier = new THREE.Mesh(new THREE.BoxGeometry(.8, 5.2, 1.6), std('#4b5a72')); pier.position.set(i * 6, 2.6, -9); sc.add(pier); }
    const icM = std('#e6f4ff', { roughness: .1, metalness: .1, transparent: true, opacity: .9 });
    for (let i = 0; i < 120; i++) { const h = .3 + r() * 1.1, ic = new THREE.Mesh(new THREE.ConeGeometry(.06 + r() * .05, h, 6), icM); ic.rotation.x = Math.PI; ic.position.set(-30 + i * .5 + r() * .2, 4.95 - h / 2, -8 + (r() - .5) * .3); sc.add(ic); }
    // boat stuck in the ice
    const boat = new THREE.Group(); const hull = new THREE.Mesh(new THREE.BoxGeometry(3, .7, 1.2), std('#6a4630')); hull.position.y = .15; boat.add(hull);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 2.6), std('#3a2a20')); mast.position.y = 1.6; boat.add(mast);
    const bsnow = new THREE.Mesh(new THREE.BoxGeometry(3.05, .1, 1.25), std('#f4f9ff')); bsnow.position.y = .55; boat.add(bsnow);
    boat.position.set(-3.2, 0, -3); boat.rotation.set(.04, .4, .08); sc.add(boat);
    const walker = makePerson({ top: '#3a2e46', pants: '#22242c', skin: '#a06c4b', hair: '#17110d', coat: true, hat: '#5a1f2a', scarf: '#c9a14a', s: 1.05 }); walker.g.visible = false; sc.add(walker.g);
    const torch = new THREE.SpotLight('#fff1d0', 60, 18, .45, .5, 1.2); sc.add(torch, torch.target);
    const torchGlow = glow('rgba(255,245,220,1)', .6); sc.add(torchGlow);
    const snow = particles(2200, [-12, 0, -12, 24, 12, 22], .06, '#ffffff', 7); sc.add(snow);
    Object.assign(YR, { sc, cam, walker, torch, torchGlow, snow });
  }
  YR.update = (t, T) => {
    const wt = t - T.year, omega = 2.9, spd = 2 * .8 * 1.05 * Math.sin(.3) * omega / Math.PI, x = -2.2 + wt * spd;
    YR.walker.g.position.set(x, 0, 1.2); posePerson(YR.walker, { walk: true, phase: wt * omega, amp: .3, lean: -.12 });
    const hx = x + .45, hy = 1.05; YR.torch.position.set(hx, hy, 1.2); YR.torch.target.position.set(hx + 6, 0, 1.4); YR.torchGlow.position.set(hx, hy, 1.25);
    moveParticles(YR.snow, t, -5.5, -3.2, 0, .1);
    YR.cam.position.set(x * .5, 2.0, 9.5 - ramp(t, T.year, T.year + 4) * 1.2); YR.cam.lookAt(x * .5, 1.7, 0);
    YR.people2d = [{ ...toScreen(YR.walker, YR.cam), q: { moving: true, phase: wt * omega, amp: .3 }, light: .72 }];
  };

  // ---- deep ocean: sink from the ice ceiling to a black-smoker vent
  const DP = {}; {
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(42, ASPECT, .05, 120); sc.background = new THREE.Color('#031020'); sc.fog = new THREE.FogExp2('#04162a', .06);
    sc.add(new THREE.HemisphereLight('#2a5a80', '#05080c', .25));
    const lamp = new THREE.SpotLight('#cfe9ff', 160, 40, .55, .6, 1.3); lamp.position.set(3, 9, 7); lamp.target.position.set(0, 1.5, 0); sc.add(lamp, lamp.target);
    const ventL = new THREE.PointLight('#ff8a4a', 6, 4, 2); ventL.position.set(0, 3.2, 0); sc.add(ventL);
    // ice ceiling high above
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ color: '#7fb3d6', side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.y = 16; sc.add(ceil);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 60, 60), std('#2a2420', { roughness: 1 })); floor.rotation.x = -Math.PI / 2;
    const fp = floor.geometry.attributes.position, r = rng(13); for (let i = 0; i < fp.count; i++) fp.setZ(i, (Math.sin(fp.getX(i) * .7) + Math.cos(fp.getY(i) * .9)) * .12 + r() * .08); floor.geometry.computeVertexNormals(); sc.add(floor);
    for (let i = 0; i < 40; i++) { const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(.2 + r() * .5, 0), std('#221c19', { roughness: 1 })); rock.position.set((r() - .5) * 16, .05, -r() * 10 + 2); rock.rotation.set(r() * 3, r() * 3, r() * 3); sc.add(rock); }
    // chimney
    const chim = new THREE.Group(); for (let i = 0; i < 9; i++) { const g = new THREE.CylinderGeometry(.42 - i * .025, .5 - i * .025, .42, 12, 2); const p = g.attributes.position;
      for (let k = 0; k < p.count; k++) { const s = 1 + (r() - .5) * .25; p.setX(k, p.getX(k) * s); p.setZ(k, p.getZ(k) * s); } g.computeVertexNormals();
      const m = new THREE.Mesh(g, std(i % 3 ? '#3b2f27' : '#4a3626', { roughness: 1 })); m.position.y = .21 + i * .4; m.rotation.y = r() * 3; chim.add(m); }
    sc.add(chim);
    const plume = Array.from({ length: 40 }, () => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeSprite, transparent: true, depthWrite: false })); sc.add(s); return s; });
    // tube worms
    const worms = [];
    for (let i = 0; i < 26; i++) { const a = r() * Math.PI * 2, d = 1.1 + r() * 1.6, x = Math.cos(a) * d, z = Math.sin(a) * d * .6 - .4, h = .35 + r() * .55;
      const g = new THREE.Group(); g.position.set(x, 0, z);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(.03, .036, h, 10), std('#e9e2d4', { roughness: .7 })); tube.position.y = h / 2; g.add(tube);
      const pl = new THREE.Group(); pl.position.y = h; g.add(pl);
      for (let j = 0; j < 7; j++) { const f = new THREE.Mesh(new THREE.ConeGeometry(.035, .22, 6), std(j % 2 ? '#c8202e' : '#e23a44', { roughness: .5 })); const aa = j / 7 * Math.PI * 2; f.position.set(Math.cos(aa) * .04, .1, Math.sin(aa) * .04); f.rotation.set(Math.sin(aa) * .5, 0, -Math.cos(aa) * .5); pl.add(f); }
      sc.add(g); worms.push(g); }
    // vent shrimp & crabs
    const shrimpGeo = new THREE.CapsuleGeometry(.025, .07, 3, 6), shrimpMat = std('#e39a7c', { roughness: .6 });
    const shrimp = Array.from({ length: 40 }, () => { const m = new THREE.Mesh(shrimpGeo, shrimpMat); m.userData = { a: r() * 6.28, h: .3 + r() * 3.2, rad: .5 + r() * .15, sp: .4 + r() * .6 }; sc.add(m); return m; });
    for (let i = 0; i < 6; i++) { const c = new THREE.Group(); const body = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 8), std('#efe9de')); body.scale.set(1.3, .5, 1); c.add(body);
      for (let k = 0; k < 6; k++) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, .22), std('#d9d2c4')); const sd = k < 3 ? 1 : -1; leg.position.set((k % 3 - 1) * .08, -.02, sd * .13); leg.rotation.x = sd * 1.1; c.add(leg); }
      c.position.set((r() - .5) * 5, .06, (r() - .3) * 3); c.rotation.y = r() * 6; sc.add(c); }
    // fish: eelpouts built from a chain of segments that undulate
    const mkFish = (len, col) => { const g = new THREE.Group(), segs = [], N = 9, m = std(col, { roughness: .45 });
      for (let i = 0; i < N; i++) { const u = i / (N - 1), rad = len * (u < .2 ? .09 * (.6 + 2 * u) : .1 * (1 - (u - .2) * .95)); const s = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), m); s.scale.set(len / N * 1.9, rad * 1.1, rad * .8); g.add(s); segs.push(s); }
      const tail = new THREE.Mesh(new THREE.PlaneGeometry(len * .18, len * .16), std(col, { side: THREE.DoubleSide, transparent: true, opacity: .85 })); g.add(tail);
      const fin = new THREE.Mesh(new THREE.PlaneGeometry(len * .6, len * .05), std(col, { side: THREE.DoubleSide, transparent: true, opacity: .7 })); g.add(fin);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(len * .022, 8, 6), std('#0a0a0a', { roughness: .2 })); g.add(eye);
      g.userData = { segs, tail, fin, eye, len, N }; return g; };
    const fishes = [mkFish(1.0, '#c9a898'), mkFish(.85, '#bf9d8f'), mkFish(.7, '#d2b3a4'), mkFish(.6, '#b89587')];
    fishes.forEach(f => sc.add(f));
    const snow = particles(1500, [-8, 0, -8, 16, 40, 16], .05, '#cfe2ee', 31); sc.add(snow);
    Object.assign(DP, { sc, cam, plume, worms, shrimp, fishes, snow, chim });
  }
  const swimFish = (f, t, x, y, z, dir, seed) => { const { segs, tail, fin, eye, len, N } = f.userData, ph = t * 5 + seed;
    segs.forEach((s, i) => { const u = i / (N - 1); s.position.set(len * (.5 - u), 0, Math.sin(ph - u * 4) * (.02 + u * u * .12) * len); });
    const last = segs[N - 1].position; tail.position.set(last.x - len * .08, 0, last.z); tail.rotation.y = Math.PI / 2 + Math.sin(ph - 4) * .6;
    fin.position.set(0, len * .1, segs[4].position.z); eye.position.set(len * .44, len * .03, len * .05 + segs[0].position.z);
    f.position.set(x, y, z); f.rotation.y = dir > 0 ? 0 : Math.PI; };
  DP.update = (t, T) => {
    const k = ease(ramp(t, T.deep - .1, T.deep + 2.2)), camY = lerp(12, 2.4, k);
    DP.cam.position.set(Math.sin(t * .25) * .6, camY, 7.8 - k * .8); DP.cam.lookAt(0, lerp(10, 1.8, k), 0);
    DP.plume.forEach((s, i) => { const p = (t * .22 + i / DP.plume.length) % 1; s.position.set(Math.sin(p * 6 + i) * .3 * p + p * .5, 3.7 + p * 5, Math.cos(i) * .2 * p); s.scale.setScalar(.4 + p * 2.6); s.material.opacity = (1 - p) * .8; });
    DP.worms.forEach((w, i) => { w.rotation.z = Math.sin(t * 1.1 + i) * .08; w.rotation.x = Math.cos(t * .9 + i) * .06; });
    DP.shrimp.forEach(s => { const u = s.userData, a = u.a + t * u.sp; s.position.set(Math.cos(a) * u.rad, u.h, Math.sin(a) * u.rad); s.rotation.set(0, -a, Math.PI / 2); });
    const dt = t - T.deep;
    swimFish(DP.fishes[0], t, -2.2 + dt * .32, 1.2 + Math.sin(t * .7) * .1, .8, 1, 0);
    swimFish(DP.fishes[1], t, 2.6 - dt * .28, 2.2 + Math.sin(t * .6) * .1, -.6, -1, 1.7);
    swimFish(DP.fishes[2], t, -1.0 + dt * .22, 3.0 + Math.sin(t * .8) * .1, -1.6, 1, 3.1);
    swimFish(DP.fishes[3], t, 1.8 - dt * .3, .7 + Math.sin(t * .9) * .06, 1.6, -1, 4.2);
    moveParticles(DP.snow, t, .05, -.25, 0, .15);
  };

  // ---- orbit and ending (orthographic space)
  const OR = {}; { const sc = new THREE.Scene(), cam = ortho(); sc.background = skyTex('#03050f', '#080b20'); const st = stars(500, [W * 1.2, H * 1.1, -H * 1.05, 500], 3); st.position.x = W / 2; sc.add(st);
    const earth = mkEarth(); sc.add(earth);
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 128 }, (_, i) => new THREE.Vector3(Math.cos(i / 128 * Math.PI * 2) * 250, Math.sin(i / 128 * Math.PI * 2) * 250, 0))), new THREE.LineDashedMaterial({ color: '#ffffff', dashSize: 10, gapSize: 12, transparent: true, opacity: .35 }));
    ring.computeLineDistances(); ring.position.set(360, -740, 0); sc.add(ring);
    const trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineDashedMaterial({ color: '#f4c76b', dashSize: 12, gapSize: 9 })); sc.add(trail);
    Object.assign(OR, { sc, cam, earth, trail }); }
  OR.update = (t, T) => { const C = [360, 740], R = 250, w = .55, leave = T.leave, a0 = Math.PI * .85;
    let a = a0 + (Math.min(t, leave) - T.orbit) * w, ex = C[0] + Math.cos(a) * R, ey = C[1] + Math.sin(a) * R;
    if (t > leave) { const la = a0 + (leave - T.orbit) * w, tx = -Math.sin(la), ty = Math.cos(la), d = (t - leave) * 60, sx = C[0] + Math.cos(la) * R, sy = C[1] + Math.sin(la) * R;
      ex = sx + tx * d; ey = sy + ty * d; OR.trail.geometry.setFromPoints([new THREE.Vector3(sx, -sy, 0), new THREE.Vector3(ex, -ey, 0)]); OR.trail.computeLineDistances(); OR.trail.visible = true; } else OR.trail.visible = false;
    pix(OR.earth, ex, ey, 66); OR.earth.userData.e.rotation.y = 1.2 + t * .05; setL(OR.earth.userData.mat, [ex - 900, ey - 200], [ex, ey]); OR.earth.userData.mat.uniforms.sunI.value = .14; OR.earth.userData.mat.uniforms.lights.value = 2.6; };

  const END = {}; { const sc = new THREE.Scene(), cam = ortho(); sc.background = skyTex('#060a20', '#141238'); const st = stars(500, [W * 1.2, H * 1.1, -H * 1.05, 500], 3); st.position.x = W / 2; sc.add(st);
    const sun = mkSun(), sg = glow('rgba(255,200,120,1)', 1), earth = mkEarth(), moon = mkMoon(); sc.add(sg, sun, earth, moon); Object.assign(END, { sc, cam, sun, sg, earth, moon }); }
  END.update = (t, T) => { const k = ease(ramp(t, T.end - .2, T.end + 1)); pix(END.sun, 150, 980, 120); END.sun.material.uniforms.t.value = t; END.sun.material.uniforms.alpha.value = k; END.sg.position.set(150, -980, 0); END.sg.scale.set(1000, 1000, 1); END.sg.material.opacity = k;
    pix(END.earth, 520, 1020, 70); END.earth.userData.e.rotation.y = .6 + t * .05; setL(END.earth.userData.mat, [150, 980], [520, 1020]); END.earth.userData.mat.uniforms.sunI.value = k; END.earth.userData.mat.uniforms.lights.value = 1 - k;
    const ma = t * .5, mp = [520 + Math.cos(ma) * 120, 1020 + Math.sin(ma) * 40]; pix(END.moon, mp[0], mp[1], 16); setL(END.moon.material, [150, 980], mp); END.moon.material.uniforms.sunI.value = k; };

  return { S, ST, OR, WK, YR, DP, END };
}

export function makeRenderers(cA, cB, dpr) {
  const mk = c => { const r = new THREE.WebGLRenderer({ canvas: c, antialias: true, preserveDrawingBuffer: true }); r.setPixelRatio(dpr); r.setSize(W, H, false);
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.0; r.outputColorSpace = THREE.SRGBColorSpace; r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; return r; };
  return [mk(cA), mk(cB)];
}

export { THREE, canvasTex, glowSprite, dotSprite, smokeSprite, std, palm, buildCity, stars, particles, moveParticles, skyTex, rng, clamp, lerp, ease, ramp };
