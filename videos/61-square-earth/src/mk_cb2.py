# second step for gl3d_cb.js (#61), run after mk_cb.py: realistic bare-rock terrain on the cube faces
# (a height field, relief shading from a procedural bump, frost only near the corners) and a more Lambert-like light on the cube
s = open('gl3d_cb.js').read()
def R(a, b):
    global s
    assert s.count(a) == 1, a[:70]; s = s.replace(a, b)
R("float sf3(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * sn3(p); p *= 2.03; a *= 0.5; } return s; }",
  "float sf3(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * sn3(p); p *= 2.03; a *= 0.5; } return s; }\n"
  "      float cbH(vec3 q){ float r = 1.0 - abs(2.0 * sf3(q * 4.2 + vec3(3.1, 1.7, 5.3)) - 1.0); return sf3(q * 2.1) * 0.55 + r * r * r * 0.45 + sn3(q * 26.0) * 0.04; }")
R("n = normalize(mix(n, fw, tet)); vec3 l = normalize(L); float d = dot(n, l); float lit = smoothstep(-0.08, 0.35, d) * sunI;",
  "n = normalize(mix(n, fw, tet)); vec3 l = normalize(L); float d = dot(n, l); float lit = mix(smoothstep(-0.08, 0.35, d), clamp(0.08 + 0.95 * d, 0.0, 1.0), tet * 0.6) * sunI;\n"
  "        vec3 nb = n; if (pool > 0.0) { vec3 tq0 = ps / k1; vec3 a1 = (k1 == ab.x) ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0); vec3 a2 = (k1 == ab.z) ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0);\n"
  "          vec3 w1 = a1.x * vFX + a1.y * vFY + a1.z * vFZ, w2 = a2.x * vFX + a2.y * vFY + a2.z * vFZ; float h0 = cbH(tq0), ee = 0.0035; float g1 = (cbH(tq0 + a1 * ee) - h0) / ee, g2 = (cbH(tq0 + a2 * ee) - h0) / ee;\n"
  "          nb = normalize(n - BUMP * (g1 * w1 + g2 * w2) * pool * (1.0 - smoothstep(0.962, 0.968, k1))); }")
a = s.index("float e = clamp((1.0 / k1 - 1.0) / 0.73, 0.0, 1.0);"); b = s.index("vec3 g = mix(rock, mix(vec3(0.22, 0.40, 0.16)")
s = s[:a] + ("float e = clamp((1.0 / k1 - 1.0) / 0.73, 0.0, 1.0); vec3 tq = ps / k1; float hh = cbH(tq);\n"
  "          vec3 rock = mix(vec3(0.72, 0.60, 0.44), vec3(0.55, 0.39, 0.27), smoothstep(0.32, 0.58, hh)); rock = mix(rock, vec3(0.33, 0.27, 0.23), smoothstep(0.55, 0.82, hh));\n"
  "          rock = mix(rock, vec3(0.22, 0.21, 0.21), smoothstep(0.56, 0.74, sf3(tq * 1.3 + vec3(7.0))) * 0.55); rock *= 0.86 + 0.28 * sn3(tq * 60.0); rock = mix(rock, rock * vec3(0.86, 0.9, 0.98), e);\n"
  "          rock = mix(rock, vec3(0.86, 0.89, 0.94), smoothstep(0.80, 0.96, e + 0.18 * (sn3(tq * 9.0) - 0.5)) * smoothstep(0.35, 0.6, hh));\n"
  "          rock *= clamp(0.62 + RELIEF * (dot(nb, l) - dot(n, l)), 0.3, 1.6);\n          ") + s[b:]
s = s.replace("BUMP", "0.045").replace("RELIEF", "2.2")
open('gl3d_cb.js', 'w').write(s); print('ok2')
