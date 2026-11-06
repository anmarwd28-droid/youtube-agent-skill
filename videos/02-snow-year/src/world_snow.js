// 3D scenes for "what if it kept snowing for a year" (16:9).
import { THREE, canvasTex, glowSprite, dotSprite, std, palm, buildCity, particles, moveParticles, skyTex, rng, clamp, lerp, ease, ramp } from './world3d.js';

export const W = 1280, H = 720, ASPECT = W / H;
const _v = new THREE.Vector3();
export function project(cam, x, y, z) { cam.updateMatrixWorld(); _v.set(x, y, z).project(cam); return { x: (_v.x + 1) / 2 * W, y: (1 - _v.y) / 2 * H }; }
const personScreen = (cam, x, y0, z, h) => { const a = project(cam, x, y0, z), b = project(cam, x, y0 + h, z); return { x: a.x, y: a.y, h: a.y - b.y, depth: z }; };
const glow = (col, s) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite(col), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); sp.scale.set(s, s, 1); return sp; };
const vert = `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const snowM = () => std('#f4f8fc', { roughness: .92 });

export async function build(T) {
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png'].map(load));

  // ======================= SNOWY CITY (one continuous scene, depth grows over the year) =======================
  const C = {}; {
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(42, ASPECT, .1, 220);
    sc.fog = new THREE.Fog('#c9d6e2', 14, 60);
    const hemi = new THREE.HemisphereLight('#dfe9f5', '#9aa6b4', 1.2), sun = new THREE.DirectionalLight('#fff3e0', 1.6); sun.position.set(-6, 10, 7); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 14, bottom: -4, near: 1, far: 50 }); sun.shadow.bias = -.0008; sc.add(hemi, sun);
    const city = buildCity(sc, { snow: true, seed: 5 });
    // rising snow surface with soft drifts
    const g = new THREE.PlaneGeometry(70, 50, 70, 50); g.rotateX(-Math.PI / 2); const p = g.attributes.position, r = rng(9);
    for (let i = 0; i < p.count; i++) p.setY(i, (Math.sin(p.getX(i) * .45) * Math.cos(p.getZ(i) * .5) + r() * .4) * .18);
    g.computeVertexNormals(); const surf = new THREE.Mesh(g, snowM()); surf.receiveShadow = true; surf.position.z = -4; sc.add(surf);
    const body = new THREE.Mesh(new THREE.BoxGeometry(70, 1, 50), snowM()); body.position.z = -4; sc.add(body);
    // cars that disappear under snow
    const cars = [[-7.5, 2.4, '#a23b3b'], [-4.2, 2.6, '#2f5f8a'], [4.4, 2.3, '#d9c79e'], [7.8, 2.6, '#3c4a3a']].map(([x, z, col]) => {
      const gr = new THREE.Group(), b = new THREE.Mesh(new THREE.BoxGeometry(2.2, .7, 1.1), std(col, { roughness: .4, metalness: .3 })); b.position.y = .45; gr.add(b);
      const cab = new THREE.Mesh(new THREE.BoxGeometry(1.2, .5, 1.0), std('#20262e', { roughness: .2, metalness: .4 })); cab.position.set(-.1, .98, 0); gr.add(cab);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 12), snowM()); cap.scale.set(1.25, .35, .65); cap.position.y = 1.2; gr.add(cap); gr.userData.cap = cap;
      gr.position.set(x, 0, z); sc.add(gr); return gr; });
    // power poles and sagging, icing wires
    const poles = [-7, 0, 7].map(x => { const m = new THREE.Mesh(new THREE.CylinderGeometry(.08, .1, 5.5, 8), std('#4a3a2a')); m.position.set(x, 2.75, 1.8); sc.add(m); return m; });
    const wires = [0, 1].map(i => { const a = new THREE.Vector3(-7 + i * 7, 5.2, 1.8), b = new THREE.Vector3(i * 7, 5.2, 1.8), mid = a.clone().lerp(b, .5); mid.y -= .45;
      const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, mid, b), 30, .025, 6), std('#1c1c1c')); sc.add(m); return m; });
    // snowman (day 1)
    const sman = new THREE.Group(); [[.55, .55], [.4, 1.35], [.28, 1.95]].forEach(([rad, y]) => { const s = new THREE.Mesh(new THREE.SphereGeometry(rad, 24, 16), snowM()); s.position.y = y; s.castShadow = true; sman.add(s); });
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.05, .3, 10), std('#e2762a')); nose.rotation.z = -Math.PI / 2; nose.position.set(.4, 1.95, 0); sman.add(nose);
    for (const z of [-.09, .09]) { const e = new THREE.Mesh(new THREE.SphereGeometry(.035, 8, 6), std('#111')); e.position.set(.25, 2.03, z); sman.add(e); }
    for (const sd of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, .9, 6), std('#4a3426')); arm.position.set(0, 1.45, sd * .55); arm.rotation.x = sd * 1.0; sman.add(arm); }
    sman.position.set(-2.4, 0, .9); sman.rotation.y = .5; sc.add(sman);
    // fire barrel (week)
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.32, .3, .8, 20, 1, true), std('#3d3a3a', { metalness: .5, roughness: .6, side: THREE.DoubleSide })); sc.add(barrel);
    const fireL = new THREE.PointLight('#ff8a3a', 0, 8, 1.5); sc.add(fireL);
    const flames = Array.from({ length: 5 }, (_, i) => { const f = glow(i % 2 ? 'rgba(255,150,60,1)' : 'rgba(255,220,120,1)', .8); sc.add(f); return f; });
    const snow = particles(2600, [-16, 0, -14, 32, 14, 28], .07, '#ffffff', 3); sc.add(snow);
    Object.assign(C, { sc, cam, hemi, sun, city, surf, body, cars, poles, wires, sman, barrel, fireL, flames, snow });
  }
  const depthAt = t => t < T.week ? .12 : t < T.month ? lerp(.12, 1.15, ease(ramp(t, T.week, T.week + 6))) : t < T.year ? lerp(1.15, 3.2, ease(ramp(t, T.month, T.month + 5))) : lerp(3.2, 6.2, ease(ramp(t, T.year, T.year + 6)));
  const PEOPLE = [{ x: -4, d: 1, top: '#8a3b3b', skin: '#a46a46', hair: '#1b1410', s: 1.0, z: .2 }, { x: 3.8, d: -1, top: '#3f6b5a', skin: '#c08a66', hair: '#2a1d16', s: 1.04, z: .6 },
                  { x: -.6, d: 1, top: '#2f4b7e', skin: '#8d5a3b', hair: '#17110d', s: .7, z: 1.2 }, { x: 1.4, d: -1, top: '#c9a14a', skin: '#b07a55', hair: '#1d1612', s: .66, z: 1.4 }];
  const HUG = [{ x: -.95, d: 1, top: '#5b2c2c', hat: '#2b3a55', scarf: '#c9a14a', skin: '#a46a46' }, { x: .95, d: -1, top: '#2f4b5e', hat: '#4a3b2a', scarf: '#9a2f3a', skin: '#c08a66' }, { x: -.3, d: 1, top: '#3c4a3a', hat: '#6b2f2f', scarf: '#d8d2c4', skin: '#8d5a3b', s: .7, z: 1.1 }];
  C.update = (t) => {
    const d = depthAt(t);
    C.surf.position.y = d; C.body.scale.y = Math.max(.01, d); C.body.position.y = d / 2 - .01;
    // looks per phase: dawn hook, bright day 1, grey week, dark month, blizzard year, sunny "can it happen" (no snow)
    const sunny = t >= T.cant && t < T.baker;
    let top = '#f2b48a', bot = '#cfd9e6', fog = '#d6dde6', hemiI = 1.1, sunI = 1.4, falling = .7;
    if (t >= T.day1) { top = '#9fb7d0'; bot = '#e6edf4'; fog = '#dde5ee'; hemiI = 1.3; sunI = 1.2; falling = .5; }
    if (t >= T.week) { top = '#7d8a99'; bot = '#c3cbd4'; fog = '#b9c2cc'; hemiI = .95; sunI = .5; falling = 1; }
    if (t >= T.month) { top = '#4a5360'; bot = '#8d96a1'; fog = '#7d8692'; hemiI = .65; sunI = .2; falling = 1.2; }
    if (t >= T.year) { top = '#2a3442'; bot = '#6a7584'; fog = '#7d8794'; hemiI = .75; sunI = .15; falling = 1.6; }
    if (sunny) { top = '#3d7cc9'; bot = '#cfe5f5'; fog = '#c9dcea'; hemiI = 1.1; sunI = 2.6; falling = 0; }
    C.sc.background = skyTex(top, bot); C.sc.fog.color.set(fog); C.sc.fog.near = t >= T.year && !sunny ? 10 : 14; C.sc.fog.far = t >= T.year && !sunny ? 70 : 60;
    C.hemi.intensity = hemiI; C.sun.intensity = sunI;
    C.surf.visible = C.body.visible = !sunny; C.snow.visible = falling > 0;
    moveParticles(C.snow, t, t >= T.year ? -3.5 : .3, -1.4 * falling, 0, .25);
    // windows glow from the month on
    C.city.blds.forEach(m => m.emissiveIntensity = t >= T.month && !sunny ? .55 : 0);
    C.city.lamps.forEach(l => { const on = t >= T.week && !sunny ? 1 : 0; l.light.intensity = 18 * on; l.bulb.material.emissiveIntensity = 3 * on; l.halo.material.opacity = .6 * on; });
    // cars: snow cap grows, then they vanish below the surface
    C.cars.forEach((c, i) => { const k = ramp(t, T.week, T.week + 5); c.userData.cap.scale.set(1.2 + k * .1, .3 + k * .45, .62 + k * .08); c.visible = !sunny; });
    C.sman.visible = t < T.week; C.sman.position.y = d - .05;
    const wk = t >= T.wires && t < T.month; C.wires.forEach(w => { const k = ramp(t, T.wires, T.wires + 3); w.scale.set(1, 1, 1); w.material.color.set(wk ? mix3('#1c1c1c', '#dfeefa', k) : '#1c1c1c'); });
    const fireOn = t >= T.fire && t < T.month ? 1 : 0, fl = 1 + Math.sin(t * 13) * .12;
    C.barrel.visible = fireOn > 0; C.barrel.position.set(0, d + .4, .4); C.fireL.intensity = 26 * fireOn * fl; C.fireL.position.set(0, d + 1.1, .4);
    C.flames.forEach((f, i) => { const p = (t * 1.4 + i / 5) % 1; f.visible = fireOn > 0; f.position.set(Math.sin(t * 5 + i) * .07, d + .85 + p * .6, .4); f.scale.setScalar((.9 - p * .6) * fl); f.material.opacity = 1 - p; });
    // camera
    let cp, la;
    if (t < T.day1) { const k = ease(ramp(t, 0, T.day1)); cp = new THREE.Vector3(lerp(-3, 0, k), lerp(7, 3, k), lerp(20, 13, k)); la = new THREE.Vector3(0, 3, 0); }
    else if (t < T.week) { cp = new THREE.Vector3(Math.sin(t * .15) * .4, 1.7 + d, 10.5 - ramp(t, T.day1, T.week) * 1.5); la = new THREE.Vector3(0, 2.2 + d, 0); }
    else if (t < T.month) { cp = new THREE.Vector3(Math.sin(t * .15) * .4, 1.7 + d, 9.8); la = new THREE.Vector3(0, 2.3 + d, 0); }
    else if (t < T.year) { cp = new THREE.Vector3(Math.sin(t * .1) * .5, 1.9 + d, 12); la = new THREE.Vector3(0, 2.4 + d, -2); }
    else if (!sunny && t < T.cant) { const k = ease(ramp(t, T.year, T.year + 6)); cp = new THREE.Vector3(lerp(0, 3, k), 1.8 + d + k * 3, lerp(12, 20, k)); la = new THREE.Vector3(0, d + 1, -6); }
    else { cp = new THREE.Vector3(Math.sin(t * .15) * .4, 1.6, 11); la = new THREE.Vector3(0, 2.6, 0); }
    C.cam.position.copy(cp); C.cam.lookAt(la);
    // 2D people for the overlay
    if (t >= T.day1 && t < T.fire) { const wt = t - T.day1, om = 4.0;
      C.people2d = PEOPLE.map(c => { const spd = 2 * .8 * c.s * Math.sin(.34) * om / Math.PI, x = c.x + c.d * wt * spd * (t < T.week ? 1 : .6);
        return { ...personScreen(C.cam, x, d, c.z, 1.75 * c.s), c, q: { moving: true, phase: wt * om, amp: .34 }, light: t >= T.week ? .85 : 1, coat: t >= T.week }; }); }
    else if (t >= T.fire && t < T.month) C.people2d = HUG.map(c => ({ ...personScreen(C.cam, c.x, d, c.z || .3, 1.75 * (c.s || 1)), c, q: {}, hug: true, light: .8 }));
    else C.people2d = null;
  };
  function mix3(a, b, k) { const A = new THREE.Color(a), B = new THREE.Color(b); return A.lerp(B, clamp(k)); }

  // ======================= HOUSE: roof sagging under the snow load =======================
  const HO = {}; { const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38, ASPECT, .1, 100); sc.background = skyTex('#7d8a99', '#c3cbd4'); sc.fog = new THREE.Fog('#b9c2cc', 16, 50);
    sc.add(new THREE.HemisphereLight('#dfe9f5', '#8a8070', 1.2)); const dl = new THREE.DirectionalLight('#fff3e0', .9); dl.position.set(-4, 8, 6); sc.add(dl);
    const wallM = std('#d6c4a2'), walls = new THREE.Group();
    [[0, 1.5, -2, 8, 3, .25], [-4, 1.5, 0, .25, 3, 4], [4, 1.5, 0, .25, 3, 4]].forEach(([x, y, z, w, h, d]) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallM); m.position.set(x, y, z); walls.add(m); });
    sc.add(walls);
    const door = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.8, .05), std('#6a4a32')); door.position.set(-1.6, .9, -1.85); sc.add(door);
    const roofG = new THREE.BoxGeometry(8.4, .25, 4.4, 24, 1, 4), roof = new THREE.Mesh(roofG, std('#bfb3a0')); roof.position.y = 3.1; sc.add(roof);
    const base = roofG.attributes.position.array.slice();
    const load = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1, 4.4, 24, 1, 4), snowM()); sc.add(load); const lbase = load.geometry.attributes.position.array.slice();
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), snowM()); ground.rotation.x = -Math.PI / 2; sc.add(ground);
    const flakes = particles(1200, [-10, 0, -8, 20, 10, 16], .06, '#ffffff', 5); sc.add(flakes);
    Object.assign(HO, { sc, cam, roof, roofG, base, load, lbase, flakes }); }
  HO.update = (t) => { const k = ease(ramp(t, T.roof, T.roof + 9)), sag = k * .55, th = .1 + k * 1.1;
    const P = HO.roofG.attributes.position; for (let i = 0; i < P.count; i++) { const x = HO.base[i * 3]; P.setY(i, HO.base[i * 3 + 1] - sag * (1 - Math.pow(x / 4.2, 2))); } P.needsUpdate = true; HO.roofG.computeVertexNormals();
    const Q = HO.load.geometry.attributes.position; for (let i = 0; i < Q.count; i++) { const x = HO.lbase[i * 3], y = HO.lbase[i * 3 + 1]; Q.setY(i, (y + .5) * th - sag * (1 - Math.pow(x / 4.2, 2))); } Q.needsUpdate = true; HO.load.geometry.computeVertexNormals();
    HO.load.position.y = 3.23; moveParticles(HO.flakes, t, .2, -1.3, 0, .2);
    HO.cam.position.set(lerp(7, 5, ramp(t, T.roof, T.roof + 9)), 3.2, 9.5); HO.cam.lookAt(0, 2.4, 0); };

  // ======================= GLOBE: snow cover spreads, albedo, snowball =======================
  const GL = {}; { const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, ASPECT, .01, 200); sc.background = skyTex('#03050f', '#070a1c');
    const st = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(Array.from({ length: 2400 * 3 }, (_, i) => { const r = rng(5 + i); const a = r() * 6.283, b = Math.acos(2 * r() - 1); return [60 * Math.sin(b) * Math.cos(a), 60 * Math.cos(b), 60 * Math.sin(b) * Math.sin(a)][i % 3]; })), 3)), new THREE.PointsMaterial({ map: dotSprite, size: .45, transparent: true, depthWrite: false })); sc.add(st);
    const mat = new THREE.ShaderMaterial({ uniforms: { day: { value: day }, clouds: { value: clouds }, L: { value: new THREE.Vector3(-1, .3, .7) }, cover: { value: 0 }, ball: { value: 0 }, volc: { value: 0 }, t: { value: 0 } }, vertexShader: vert,
      fragmentShader: `uniform sampler2D day, clouds; uniform vec3 L; uniform float cover, ball, volc, t; varying vec3 vN; varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main(){ vec3 n = normalize(vN); float d = dot(n, normalize(L)); float lit = smoothstep(-0.08, 0.3, d);
          vec3 c = texture2D(day, vUv).rgb; float lat = abs(vUv.y - 0.5) * 2.0;
          float edge = 1.0 - cover * 0.95; float s = smoothstep(edge, edge + 0.08 + h(floor(vUv * 180.0)) * 0.05, lat);
          vec3 snow = vec3(0.93, 0.96, 1.0) - h(vUv * 900.0) * 0.05;
          c = mix(c, snow, max(s, ball));
          float cl = texture2D(clouds, vUv).a; c = mix(c, vec3(1.0), cl * 0.55);
          vec3 col = c * (0.02 + 1.05 * lit);
          // volcano hot spots on the snowball
          vec2 g = fract(vUv * vec2(14.0, 8.0)); float spot = step(0.93, h(floor(vUv * vec2(14.0, 8.0)))) * (1.0 - smoothstep(0.0, 0.18, length(g - 0.5)));
          col += vec3(1.0, 0.35, 0.08) * spot * volc * (0.7 + 0.3 * sin(t * 4.0));
          float rim = pow(1.0 - max(n.z, 0.0), 2.6); col += vec3(0.4, 0.65, 1.0) * rim * (0.08 + 0.8 * smoothstep(-0.4, 0.6, d));
          gl_FragColor = vec4(col, 1.0); }` });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), mat); const tilt = new THREE.Group(); tilt.rotation.z = .41; tilt.add(earth); sc.add(tilt);
    // incoming and reflected sunlight arrows
    const arrows = new THREE.Group(); for (let i = 0; i < 6; i++) { const y = -.6 + i * .24, inc = new THREE.ArrowHelper(new THREE.Vector3(1, -.15, 0).normalize(), new THREE.Vector3(-3.2, y + .4, .6), 1.9, 0xffd27a, .14, .1);
      const out = new THREE.ArrowHelper(new THREE.Vector3(-1, .35, 0).normalize(), new THREE.Vector3(-1.05, y + .15, .6), 1.6, 0xffffff, .14, .1); inc.userData.out = out; arrows.add(inc, out); }
    sc.add(arrows);
    Object.assign(GL, { sc, cam, mat, earth, arrows }); }
  GL.update = (t) => { const m = GL.mat.uniforms; m.t.value = t;
    m.cover.value = t < T.ball ? ease(ramp(t, T.globe, T.sea + 5)) * .55 : 1; m.ball.value = t >= T.ball ? ease(ramp(t, T.ball, T.ball + 3)) : 0; m.volc.value = t >= T.volc ? ease(ramp(t, T.volc, T.volc + 1.5)) : 0;
    GL.earth.rotation.y = 1.8 + t * .05;
    const aOn = t >= T.albedo && t < T.sea ? ease(ramp(t, T.albedo, T.albedo + 1)) : 0; GL.arrows.visible = false;
    GL.arrows.children.forEach((a, i) => { a.line.material.transparent = a.cone.material.transparent = true; a.line.material.opacity = a.cone.material.opacity = aOn * (i % 2 ? ramp(t, T.albedo + .8, T.albedo + 1.6) : 1); });
    const k = ease(ramp(t, T.globe, T.globe + 4)); GL.cam.position.set(lerp(.6, -.2, k), lerp(1.2, .5, k), lerp(4.4, 3.3, k)); GL.cam.lookAt(0, 0, 0);
    if (t >= T.ball) { const k2 = ease(ramp(t, T.ball, T.ball + 4)); GL.cam.position.set(lerp(-.2, .4, k2), lerp(.5, .3, k2), lerp(3.3, 2.9, k2)); GL.cam.lookAt(0, 0, 0); } };

  // ======================= LAYERS: snow -> firn -> ice =======================
  const LY = {}; { const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(34, ASPECT, .1, 100); sc.background = skyTex('#1b2436', '#3a4a64');
    sc.add(new THREE.HemisphereLight('#dfe9f5', '#405060', 1.1)); const dl = new THREE.DirectionalLight('#ffffff', 1.2); dl.position.set(4, 8, 6); sc.add(dl);
    const mk = (y, h, col, o = {}) => { const m = new THREE.Mesh(new THREE.BoxGeometry(5, h, 3), std(col, o)); m.position.y = y; sc.add(m); return m; };
    const fresh = mk(3.1, 1.2, '#ffffff', { roughness: 1 }), firn = mk(1.7, 1.6, '#d7e6f2', { roughness: .7 }), ice = mk(.45, .9, '#7fb7e6', { roughness: .1, metalness: .1, transparent: true, opacity: .92 });
    const arrows = []; for (let i = -1; i <= 1; i++) { const a = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(i * 1.5, 5.6, 1.6), 1.6, 0xf4c76b, .35, .25); sc.add(a); arrows.push(a); }
    const bubbles = particles(220, [-2.4, 0.05, -1.4, 4.8, .8, 2.8], .05, '#ffffff', 41); sc.add(bubbles);
    Object.assign(LY, { sc, cam, fresh, firn, ice, arrows }); }
  LY.update = (t) => { const k = ease(ramp(t, T.layers, T.layers + 6)); LY.ice.scale.y = .6 + k * .8; LY.ice.position.y = .45 * LY.ice.scale.y / 1; LY.firn.position.y = LY.ice.scale.y * .9 + .8;
    LY.arrows.forEach((a, i) => a.position.y = 5.6 - Math.abs(Math.sin(t * 2 + i)) * .3);
    LY.cam.position.set(6.5 + Math.sin(t * .2) * .5, 3.6, 9); LY.cam.lookAt(0, 1.9, 0); };

  // ======================= MOUNT BAKER: 29 m of snow vs a 10-storey building =======================
  const MB = {}; { const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, ASPECT, .1, 600); sc.background = skyTex('#5d8cc4', '#dbe9f6'); sc.fog = new THREE.Fog('#dbe9f6', 80, 400);
    sc.add(new THREE.HemisphereLight('#ffffff', '#9aa6b4', 1.3)); const dl = new THREE.DirectionalLight('#fff6e0', 1.8); dl.position.set(-30, 40, 30); sc.add(dl);
    const mg = new THREE.ConeGeometry(120, 160, 64, 24); const mp = mg.attributes.position, r = rng(4); for (let i = 0; i < mp.count; i++) { const y = mp.getY(i); if (y < 79) { const s = 1 + (r() - .5) * .18; mp.setX(i, mp.getX(i) * s); mp.setZ(i, mp.getZ(i) * s); } }
    mg.computeVertexNormals(); const mtn = new THREE.Mesh(mg, snowM()); mtn.position.set(0, 60, -260); sc.add(mtn);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), snowM()); ground.rotation.x = -Math.PI / 2; sc.add(ground);
    const bld = new THREE.Mesh(new THREE.BoxGeometry(8, 29, 8), std('#8f98a6', { map: canvasTex(128, 512, (g, w, h) => { g.fillStyle = '#9aa3b0'; g.fillRect(0, 0, w, h); g.fillStyle = '#4d5866'; for (let f = 0; f < 10; f++) for (let x = 10; x < w - 10; x += 28) g.fillRect(x, 10 + f * 50, 16, 26); }) }));
    bld.position.set(-9, 14.5, -20); sc.add(bld);
    const col = new THREE.Mesh(new THREE.BoxGeometry(8, 1, 8), snowM()); col.position.set(4, 0, -20); sc.add(col);
    const ruler = new THREE.Mesh(new THREE.BoxGeometry(.4, 29, .4), std('#f4c76b')); ruler.position.set(10, 14.5, -16); sc.add(ruler);
    Object.assign(MB, { sc, cam, col }); }
  MB.update = (t) => { const k = ease(ramp(t, T.baker + 1, T.baker + 5)), h = Math.max(.1, k * 29); MB.col.scale.y = h; MB.col.position.y = h / 2;
    MB.cam.position.set(lerp(30, 24, ramp(t, T.baker, T.end)), 10, 40); MB.cam.lookAt(0, 13, -20); };

  // ======================= END (space) =======================
  const EN = {}; { const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, ASPECT, .01, 200); sc.background = skyTex('#060a20', '#141238');
    const st = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(Array.from({ length: 1800 * 3 }, (_, i) => { const r = rng(900 + i); const a = r() * 6.283, b = Math.acos(2 * r() - 1); return [60 * Math.sin(b) * Math.cos(a), 60 * Math.cos(b), 60 * Math.sin(b) * Math.sin(a)][i % 3]; })), 3)), new THREE.PointsMaterial({ map: dotSprite, size: .4, transparent: true, depthWrite: false })); sc.add(st);
    const em = new THREE.ShaderMaterial({ uniforms: { day: { value: day }, night: { value: night }, L: { value: new THREE.Vector3(-1, .2, .5) } }, vertexShader: vert,
      fragmentShader: `uniform sampler2D day, night; uniform vec3 L; varying vec3 vN; varying vec2 vUv; void main(){ float lit = smoothstep(-0.1,0.3,dot(normalize(vN), normalize(L))); vec3 c = texture2D(day, vUv).rgb * (0.02 + 1.05 * lit) + texture2D(night, vUv).rgb * vec3(1.,.82,.55) * (1.-lit) * 1.2; gl_FragColor = vec4(c, 1.0); }` });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), em); earth.position.set(-1.6, -.2, 0); sc.add(earth);
    Object.assign(EN, { sc, cam, earth }); }
  EN.update = (t) => { EN.earth.rotation.y = 1.5 + t * .1; EN.cam.position.set(Math.sin(t * .1) * .2, 0, 6.5); EN.cam.lookAt(0, 0, 0); };

  return { C, HO, GL, LY, MB, EN };
}

export function makeRenderers(cA, cB, dpr) {
  const mk = c => { const r = new THREE.WebGLRenderer({ canvas: c, antialias: true, preserveDrawingBuffer: true }); r.setPixelRatio(dpr); r.setSize(W, H, false);
    r.toneMapping = THREE.ACESFilmicToneMapping; r.outputColorSpace = THREE.SRGBColorSpace; r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; return r; };
  return [mk(cA), mk(cB)];
}
