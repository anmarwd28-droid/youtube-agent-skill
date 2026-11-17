s = open('gl3d_ex.js').read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:80], s.count(a)); s = s.replace(a, b)
# --- disc: Earth turning to lava, then a red-dwarf photosphere (star 0..1) ---
rep("scorch: { value: 0 } };", "scorch: { value: 0 }, star: { value: 0 }, st: { value: 0 } };")
rep("varying float vR; varying vec3 vW;\n      void main(){ vUv", "varying float vR; varying vec3 vW; varying vec3 vS;\n      void main(){ vUv")
rep("vec3 p = mix(position, sp, m);", "vS = sp; vec3 p = mix(position, sp, m);")
rep("uniform float m, sunI, lights, dry, sea, clouds, tm, swap, ridgeA, trenchA, heat, boil, venus, scorch; uniform vec3 lc; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW;\n      void main(){",
    """uniform float m, sunI, lights, dry, sea, clouds, tm, swap, ridgeA, trenchA, heat, boil, venus, scorch, star, st; uniform vec3 lc; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW; varying vec3 vS;
      float sh3(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float sn3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(sh3(i),sh3(i+vec3(1,0,0)),f.x), mix(sh3(i+vec3(0,1,0)),sh3(i+vec3(1,1,0)),f.x), f.y), mix(mix(sh3(i+vec3(0,0,1)),sh3(i+vec3(1,0,1)),f.x), mix(sh3(i+vec3(0,1,1)),sh3(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float sf3(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * sn3(p); p *= 2.03; a *= 0.5; } return s; }
      void main(){""")
rep("""rimA * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
        gl_FragColor""", """rimA * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI) * (1.0 - star);
        if (star > 0.0) { vec3 p = normalize(vS); float k1 = smoothstep(0.0, 0.42, star), k2 = smoothstep(0.38, 1.0, star);
          vec3 q = p * 2.4; q += 0.35 * vec3(sin(q.y * 3.1 + q.z * 1.7), sin(q.z * 2.9 + q.x * 1.3), sin(q.x * 2.3 + q.y * 2.1));
          float r1 = 1.0 - abs(2.0 * sf3(q + vec3(1.7)) - 1.0), r2 = 1.0 - abs(2.0 * sf3(p * 8.0 + vec3(4.1)) - 1.0);
          float cr = pow(r1, 9.0) + 0.7 * pow(r2, 12.0) * smoothstep(0.15, 0.42, star); float pool = smoothstep(0.62, 0.8, sf3(p * 3.0 + vec3(7.3))) * smoothstep(0.2, 0.42, star);
          col = mix(col, col * 0.22 + vec3(0.06, 0.025, 0.015), k1 * 0.9);
          col += (vec3(1.0, 0.36, 0.07) * clamp(cr + pool, 0.0, 1.2) * 2.0 + vec3(1.0, 0.3, 0.05) * 0.06) * k1;
          float mu = max(dot(n, vd), 0.0); float g = sf3(p * 7.0 + vec3(0.0, st * 0.05, st * 0.03)), g2 = sf3(p * 19.0 + vec3(st * 0.09, 0.0, st * 0.06)); float gr = mix(g, g2, 0.6);
          float g3 = sn3(p * 60.0 + vec3(st * 0.2)); float cell = smoothstep(0.25, 0.75, g3) * 0.6 + 0.4 * g2;
          vec3 sc = mix(vec3(0.5, 0.06, 0.02), vec3(1.0, 0.36, 0.08), smoothstep(0.0, 0.5, mu)); sc = mix(sc, vec3(1.0, 0.62, 0.3), smoothstep(0.5, 1.0, mu) * 0.6);
          sc *= 0.55 + 0.45 * gr + 0.35 * cell; float spot = smoothstep(0.735, 0.76, sf3(p * 4.3 + vec3(9.0))); sc *= 1.0 - 0.55 * spot;
          col = mix(col, sc * 1.08, k2); }
        gl_FragColor""")
rep("discU.scorch.value = D.scorch || 0;", "discU.scorch.value = D.scorch || 0; discU.star.value = D.star || 0; discU.st.value = t;")
rep("atm.material.uniforms.a.value = m * m; }", """atm.material.uniforms.a.value = m * m * (1 - (D.star || 0)); }
    discGlow.visible = !!D && (D.glow || 0) > .005; if (discGlow.visible) { discGlow.scale.setScalar(D.gs ?? 6); discGlow.material.opacity = D.glow; const gc = D.gc || [1, .42, .2]; discGlow.material.color.setRGB(gc[0], gc[1], gc[2]); }
    setCloud(w.cloud, t);""")
# --- glow around the disc globe + hydrogen cloud (points) ---
rep("  const rockT = GEN.rock(11,", """  const discGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, depthWrite: false, transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor })); space.add(discGlow);
  // w.cloud = { a, k (0 = wide cloud, 1 = fallen onto the planet), R, tilt, spin }
  const NCL = 2600, clB = new Float32Array(NCL * 4), clC = new Float32Array(NCL * 3); { const r = RNG(77); for (let i = 0; i < NCL; i++) { const big = i < 700; const rr = Math.pow(r(), .7); clB[i * 4] = .12 + .88 * rr; clB[i * 4 + 1] = r() * 6.2832 + rr * 5.0; clB[i * 4 + 2] = (r() - .5) * (big ? .5 : .28) * (1 - .55 * rr); clB[i * 4 + 3] = big ? 60 + 140 * r() : 3 + 14 * Math.pow(r(), 3);
    const pk = r(); const c = pk < .62 ? [1, .3 + .2 * r(), .42 + .2 * r()] : pk < .85 ? [.45, .55, 1] : [1, .78, .66]; clC.set(c, i * 3); } }
  const clG = new THREE.BufferGeometry(); clG.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(NCL * 3), 3)); clG.setAttribute('b', new THREE.Float32BufferAttribute(clB, 4)); clG.setAttribute('c', new THREE.Float32BufferAttribute(clC, 3));
  const clU = { k: { value: 0 }, a: { value: 0 }, R: { value: 5 }, tt: { value: 0 }, tilt: { value: 0 }, ps: { value: 1 } };
  const cloudP = new THREE.Points(clG, new THREE.ShaderMaterial({ uniforms: clU, transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
    vertexShader: `attribute vec4 b; attribute vec3 c; uniform float k, R, tt, tilt, ps; varying vec3 vC; varying float vA;
      void main(){ float kk = k * k * (3.0 - 2.0 * k); float r0 = b.x * R; float r = mix(r0, 1.0 + 0.04 * b.x, pow(kk, 0.8 + 0.6 * (1.0 - b.x)));
        float an = b.y + tt * 0.9 / pow(max(r, 0.6), 1.5); float y = b.z * r0 * (1.0 - kk * 0.9);
        vec3 p = vec3(cos(an) * r, y, sin(an) * r); float ct = cos(tilt), stt = sin(tilt); p = vec3(p.x, p.y * ct - p.z * stt, p.y * stt + p.z * ct);
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = b.w * ps * (0.5 + 0.5 * (1.0 - kk) + 0.25 * kk) * (b.w > 40.0 ? 34.0 : 14.0) / -mv.z;
        vC = c * mix(1.0, 1.15, kk * (1.0 - b.x)); vA = (b.w > 40.0 ? 0.13 : 0.9) * (1.0 - 0.5 * kk * kk); }`,
    fragmentShader: `uniform float a; varying vec3 vC; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float r = length(d) * 2.0; float f = pow(max(1.0 - r, 0.0), 2.2); gl_FragColor = vec4(vC, f * vA * a); }` }));
  cloudP.frustumCulled = false; space.add(cloudP);
  function setCloud(C, t) { cloudP.visible = !!C && (C.a || 0) > .005; if (!cloudP.visible) return; clU.k.value = C.k || 0; clU.a.value = C.a; clU.R.value = C.R || 5; clU.tt.value = C.spin ?? t; clU.tilt.value = C.tilt || 0; clU.ps.value = C.ps || 1; }
  const rockT = GEN.rock(11,""")
# --- Sun: red dwarf colours (rd 0..1) ---
rep("uniforms: { t: { value: 0 }, hue: { value: 0 } }, vertexShader: `varying vec3 vP; varying vec3 vN;", "uniforms: { t: { value: 0 }, hue: { value: 0 }, rd: { value: 0 } }, vertexShader: `varying vec3 vP; varying vec3 vN;")
rep("fragmentShader: `uniform float t, hue; varying vec3 vP;", "fragmentShader: `uniform float t, hue, rd; varying vec3 vP;")
rep("c += vec3(0.7, 0.85, 1.0) * sw * 0.25 * smoothstep(0.55, 0.75, g); gl_FragColor",
    "c += vec3(0.7, 0.85, 1.0) * sw * 0.25 * smoothstep(0.55, 0.75, g); vec3 rc = mix(vec3(0.55, 0.08, 0.02), vec3(1.0, 0.4, 0.1), smoothstep(0.0, 0.55, mu)); rc = mix(rc, vec3(1.0, 0.66, 0.34), smoothstep(0.55, 1.0, mu) * 0.55); rc *= 0.68 + 0.55 * gr; c = mix(c, rc / 1.2, rd); gl_FragColor")
rep("sunGlow.material.color.setRGB(1 - .45 * hu, 1 - .15 * hu, 1 + .45 * hu);", "const rd = w.sun.rd || 0; sunMat.uniforms.rd.value = rd; sunGlow.material.color.setRGB((1 - .45 * hu), (1 - .15 * hu) * (1 - .6 * rd), (1 + .45 * hu) * (1 - .78 * rd));")
# --- Moon slot: Jupiter (jup) and a heated glow (hot) ---
rep("uniform float shR, crack, ex; varying vec3 vN; varying vec2 vUv; varying vec3 vW; varying vec3 vP;", """uniform float shR, crack, ex, jup, hot; varying vec3 vN; varying vec2 vUv; varying vec3 vW; varying vec3 vP;
      float jh(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float jn(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(jh(i),jh(i+vec3(1,0,0)),f.x), mix(jh(i+vec3(0,1,0)),jh(i+vec3(1,1,0)),f.x), f.y), mix(mix(jh(i+vec3(0,0,1)),jh(i+vec3(1,0,1)),f.x), mix(jh(i+vec3(0,1,1)),jh(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float jf(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * jn(p); p *= 2.07; a *= 0.5; } return s; }""")
rep("""col += vec3(1.0, 0.45, 0.15) * crack * crack * 0.3 * (1.0 - edge); }
        gl_FragColor""", """col += vec3(1.0, 0.45, 0.15) * crack * crack * 0.3 * (1.0 - edge); }
        if (jup > 0.0) { vec3 p = normalize(vP); float tb = jf(vec3(p.x * 2.5, p.y * 16.0, p.z * 2.5)) - 0.5; float w2 = jf(p * 9.0) - 0.5;
          float b = p.y * 7.5 + 0.8 * sin(p.y * 13.0) + tb * 1.6 + w2 * 0.5; float z = 0.5 + 0.5 * sin(b * 3.14159);
          vec3 jc = mix(vec3(0.7, 0.53, 0.4), vec3(0.93, 0.88, 0.78), smoothstep(0.15, 0.9, z)); jc = mix(jc, vec3(0.5, 0.33, 0.24), smoothstep(0.55, 0.95, jf(vec3(p.x * 6.0, p.y * 30.0, p.z * 6.0))) * 0.35);
          jc = mix(jc, vec3(0.72, 0.68, 0.66), smoothstep(0.72, 0.95, abs(p.y)) * 0.6);
          vec2 sp = vec2(atan(p.z, p.x) - 1.2, (p.y + 0.36) * 2.3); float gs = length(vec2(sp.x * 1.0, sp.y * 1.6)); jc = mix(jc, vec3(0.78, 0.38, 0.24), (1.0 - smoothstep(0.1, 0.17, gs)) * 0.9);
          jc *= 0.92 + 0.16 * jn(p * 40.0); col = mix(col, jc * (0.02 + 1.12 * pow(lit, 0.75)), jup); }
        if (hot > 0.0) { float fr = pow(1.0 - max(dot(n, shD), 0.0), 2.0); col = mix(col, col * vec3(1.2, 0.7, 0.5), hot * 0.5); col += vec3(1.0, 0.42, 0.14) * hot * (0.12 + 0.9 * fr); }
        gl_FragColor""")
rep("const moonU = { crack: { value: 0 }, ex: { value: 0 },", "const moonU = { crack: { value: 0 }, ex: { value: 0 }, jup: { value: 0 }, hot: { value: 0 },")
rep("moonU.ex.value = w.moon.ex || 0; }", "moonU.ex.value = w.moon.ex || 0; moonU.jup.value = w.moon.jup || 0; moonU.hot.value = w.moon.hot || 0; }")
open('gl3d_es.js', 'w').write(s); print('ok')
