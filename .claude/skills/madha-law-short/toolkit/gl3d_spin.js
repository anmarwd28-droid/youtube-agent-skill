// 3D layer: realistic Sun, Earth (NASA day/night/cloud textures) and Moon, drawn in screen pixel space.
import * as THREE from './three.module.js';

const W = 720, H = 1280;
export async function init(canvas, dpr = 1.5) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, W, 0, -H, -2000, 2000); cam.position.z = 1000;
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds, moonTex] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png', 'tex/earth_stopped.jpg'].map(load));
  clouds.colorSpace = THREE.NoColorSpace;

  const vert = `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const earthMat = new THREE.ShaderMaterial({
    uniforms: { day: { value: day }, night: { value: night }, clouds: { value: clouds }, L: { value: new THREE.Vector3(-1, 0, .3) },
                sunI: { value: 1 }, lights: { value: 0 }, cloudOff: { value: 0 }, alpha: { value: 1 } },
    vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D day, night, clouds; uniform vec3 L; uniform float sunI, lights, cloudOff, alpha; varying vec3 vN; varying vec2 vUv;
      vec3 toLin(vec3 c){ return pow(c, vec3(2.2)); }
      void main(){ vec3 n = normalize(vN); float d = dot(n, normalize(L)); float lit = smoothstep(-0.08, 0.35, d) * sunI;
        vec3 dc = texture2D(day, vUv).rgb; float cl = texture2D(clouds, vUv + vec2(cloudOff, 0.0)).a;
        vec3 nl = texture2D(night, vUv).rgb;
        vec3 col = mix(dc, vec3(1.0), cl * 0.75) * (0.012 + 0.06 * sunI + 1.05 * lit);
        float nightMask = (1.0 - lit) * (1.0 - cl * 0.7);
        col += nl * vec3(1.0, 0.82, 0.55) * nightMask * lights * 1.6;
        float rim = pow(1.0 - max(n.z, 0.0), 2.6);
        col += vec3(0.35, 0.62, 1.0) * rim * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
        gl_FragColor = vec4(col, alpha); }` });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), earthMat);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 48), new THREE.ShaderMaterial({
    uniforms: { L: earthMat.uniforms.L, sunI: earthMat.uniforms.sunI, alpha: { value: 1 } }, vertexShader: vert, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    fragmentShader: `uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; void main(){ vec3 n = normalize(vN); float rim = pow(1.0 - max(n.z,0.0), 3.0);
      float d = smoothstep(-0.3, 0.7, dot(n, normalize(L))); gl_FragColor = vec4(vec3(0.3,0.6,1.0) * rim * (0.05 + d * sunI) * alpha, 1.0); }` }));
  const moonMat = new THREE.ShaderMaterial({
    uniforms: { tex: { value: moonTex }, L: { value: new THREE.Vector3(-1, 0, .3) }, sunI: { value: 1 }, alpha: { value: 1 } }, vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; varying vec2 vUv;
      void main(){ vec3 n = normalize(vN); float lit = max(dot(n, normalize(L)), 0.0) * sunI; vec3 c = texture2D(tex, vUv).rgb;
        gl_FragColor = vec4(c * (0.025 + 1.15 * lit), alpha); }` });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), moonMat);
  const sunMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, alpha: { value: 1 } }, vertexShader: `varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    transparent: true,
    fragmentShader: `uniform float t, alpha; varying vec3 vP; varying vec3 vN;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y),
                   mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * n3(p); p *= 2.03; a *= 0.5; } return s; }
      void main(){ vec3 n = normalize(vN); float mu = max(n.z, 0.0);
        float g = fbm(vP * 6.0 + vec3(0.0, 0.0, t * 0.25)); float g2 = fbm(vP * 18.0 - vec3(t * 0.4));
        vec3 c = mix(vec3(1.0,0.55,0.12), vec3(1.0,0.93,0.65), g * 0.8 + g2 * 0.35);
        c *= 0.45 + 0.65 * pow(mu, 0.45);   // limb darkening
        gl_FragColor = vec4(c * 1.15, alpha); }` });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), sunMat);
  scene.add(sun, earth, atm, moon); earth.renderOrder = 0; moon.renderOrder = 1; atm.renderOrder = 2;
  earth.rotation.order = 'ZYX'; earth.rotation.z = 0.41; // axial tilt (spin about the tilted axis)

  function place(m, o) { m.visible = !!o && o.a > 0.001; if (!m.visible) return; m.position.set(o.x, -o.y, 0); m.scale.setScalar(o.r); }
  function draw(f) {
    place(sun, f.sun); place(earth, f.earth); place(atm, f.earth); place(moon, f.moon); if (f.moon && f.earth && Math.abs(f.moon.x - f.earth.x) < 1 && Math.abs(f.moon.y - f.earth.y) < 1) moon.scale.multiplyScalar(1.004);
    if (f.sun) { sunMat.uniforms.t.value = f.t; sunMat.uniforms.alpha.value = f.sun.a; }
    if (f.earth) {
      const e = f.earth, lx = (f.light ? f.light[0] : e.x - 400) - e.x, ly = -((f.light ? f.light[1] : e.y) - e.y);
      earthMat.uniforms.L.value.set(lx, ly, 120).normalize();
      earthMat.uniforms.sunI.value = e.sunI; earthMat.uniforms.lights.value = e.lights; earthMat.uniforms.cloudOff.value = f.t * 0.004;
      earthMat.uniforms.alpha.value = e.a; atm.material.uniforms.alpha.value = e.a;
      earth.rotation.y = (e.rot ?? 0.6) + f.t * 0.03; earth.rotation.z = e.tilt ?? 0.41;
    }
    if (f.moon) { const m = f.moon, lx = (f.light ? f.light[0] : m.x - 400) - m.x, ly = -((f.light ? f.light[1] : m.y) - m.y);
      moonMat.uniforms.L.value.set(lx, ly, 120).normalize(); moonMat.uniforms.sunI.value = m.sunI; moonMat.uniforms.alpha.value = m.a; moon.rotation.order = 'ZYX'; moon.rotation.y = (m.rot ?? 4.2) + f.t * 0.03; moon.rotation.z = m.tilt ?? 0; }
    canvas.style.opacity = f.opacity;
    renderer.render(scene, cam);
  }
  return { draw };
}
