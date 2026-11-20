# mk_dn.py: gl3d_dn.js = gl3d_cb.js + w.torus: the real Earth texture wrapped on a doughnut (#69)
s = open('gl3d_cb.js').read()
add = r'''
  // ---- #69: a doughnut-shaped Earth. Outer half of the tube = the whole globe (lat -90..90); the inner half = the globe again, turned 180°, so the poles run round the top and bottom of the ring ----
  const [tDay, tLit, tCl] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png'].map(raw));
  [tDay, tLit, tCl].forEach(x => { x.wrapS = THREE.RepeatWrapping; });
  const torU = { day: { value: tDay }, night: { value: tLit }, cl: { value: tCl }, L: { value: new THREE.Vector3(0, 1, 0) }, camP: { value: new THREE.Vector3() }, spin: { value: 0 }, tm: { value: 0 }, lights: { value: .5 }, crack: { value: 0 }, hot: { value: 0 } };
  const torM = new THREE.ShaderMaterial({ uniforms: torU,
    vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vW; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform sampler2D day, night, cl; uniform vec3 L, camP; uniform float spin, tm, lights, crack, hot; varying vec2 vUv; varying vec3 vN; varying vec3 vW;
      float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main(){ float a = vUv.y * 6.2831853; if (a > 3.14159265) a -= 6.2831853; float lat, lon = vUv.x + spin;
        if (abs(a) <= 1.5707963) lat = a; else { lat = a > 0.0 ? 3.14159265 - a : -3.14159265 - a; lon += 0.5; }
        vec2 tc = vec2(fract(lon), 0.5 + lat / 3.14159265);
        vec3 N = normalize(vN), Ld = normalize(L), V = normalize(camP - vW); float ndl = dot(N, Ld), lit = smoothstep(-0.12, 0.22, ndl);
        vec3 d = texture2D(day, tc).rgb, n = texture2D(night, tc).rgb; float c = texture2D(cl, vec2(fract(tc.x + tm), tc.y)).r;
        vec3 col = d * (0.05 + 1.05 * max(ndl, 0.0)); col = mix(col, vec3(1.0) * (0.04 + 1.0 * max(ndl, 0.0)), c * 0.45);
        col += n * vec3(1.0, 0.78, 0.5) * (1.0 - lit) * lights * (1.0 - c);
        vec3 H = normalize(Ld + V); float sea = smoothstep(0.12, 0.02, d.g - d.b * 0.6) * (1.0 - c); col += vec3(1.0, 0.95, 0.85) * pow(max(dot(N, H), 0.0), 60.0) * 0.5 * sea * lit;
        float fr = pow(1.0 - max(dot(V, N), 0.0), 2.5); col += vec3(0.32, 0.56, 1.0) * fr * 0.6 * (0.15 + 0.85 * lit);
        if (crack > 0.0) { vec2 q = vec2(vUv.x * 60.0, vUv.y * 24.0); vec2 i = floor(q), f = fract(q); float m1 = 9.0, m2 = 9.0;
          for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) { vec2 g = vec2(float(x), float(y)); vec2 o = vec2(h2(i + g), h2(i + g + 7.0)); float dd = length(g + o - f); if (dd < m1) { m2 = m1; m1 = dd; } else if (dd < m2) m2 = dd; }
          float e = 1.0 - smoothstep(0.0, 0.03 + 0.08 * crack, m2 - m1); col = mix(col, vec3(1.0, 0.5, 0.15) * 1.6, e * crack); }
        col = mix(col, vec3(1.0, 0.45, 0.15), hot * 0.6);
        gl_FragColor = vec4(col, 1.0); }` });
  const tor = new THREE.Mesh(new THREE.TorusGeometry(1, .5, 160, 320), torM); tor.visible = false; space.add(tor);
'''
k = "  ringM.renderOrder = 10; space.add(moon, ringM);"
assert k in s; s = s.replace(k, k + add, 1)
k2 = "    setDebris(w.debris, t);"
assert k2 in s
s = s.replace(k2, "    tor.visible = !!w.torus; if (w.torus) { const T = w.torus; tor.position.copy(V3(T.pos || [0, 0, 0])); tor.rotation.set(T.rx || 0, T.ry || 0, T.rz || 0); tor.scale.setScalar(T.s || 1); torU.L.value.copy(Ls); torU.camP.value.copy(cam.position); torU.spin.value = T.spin || 0; torU.tm.value = t * .004; torU.lights.value = T.lights ?? .5; torU.crack.value = T.crack || 0; torU.hot.value = T.hot || 0; }\n" + k2, 1)
open('gl3d_dn.js', 'w').write(s); print('ok')
