# gl3d_ap.js (#52) = gl3d_es.js + moon.nep: a procedural Neptune in the moon slot
s = open('gl3d_es.js').read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:80], s.count(a)); s = s.replace(a, b)
rep("jup: { value: 0 }, hot: { value: 0 },", "jup: { value: 0 }, hot: { value: 0 }, nep: { value: 0 },")
rep("uniform float shR, crack, ex, jup, hot;", "uniform float shR, crack, ex, jup, hot, nep;")
rep("        if (hot > 0.0) {", """        if (nep > 0.0) { vec3 p = normalize(vP); float tb = jf(vec3(p.x * 2.0, p.y * 11.0, p.z * 2.0)) - 0.5; float b = p.y * 4.2 + tb * 1.1; float z = 0.5 + 0.5 * sin(b * 3.14159);
          vec3 nc = mix(vec3(0.13, 0.27, 0.72), vec3(0.27, 0.5, 0.93), 0.45 * z + 0.55 * jf(p * 3.0));
          nc = mix(nc, vec3(0.2, 0.42, 0.86), smoothstep(0.6, 0.95, abs(p.y)) * 0.5);
          vec2 sp = vec2(atan(p.z, p.x) - 0.9, (p.y + 0.32) * 2.6); float ds = length(vec2(sp.x * 1.0, sp.y * 1.55)); nc = mix(nc, vec3(0.06, 0.12, 0.4), (1.0 - smoothstep(0.07, 0.13, ds)) * 0.85);
          float cl = smoothstep(0.6, 0.78, jf(vec3(p.x * 3.0 + 1.3, p.y * 26.0, p.z * 3.0))) * (smoothstep(0.16, 0.0, abs(p.y + 0.12)) + smoothstep(0.1, 0.0, abs(p.y - 0.42)) * 0.7);
          cl += (1.0 - smoothstep(0.1, 0.2, abs(ds - 0.17))) * 0.5 * step(0.0, sp.y);
          nc = mix(nc, vec3(0.9, 0.95, 1.0), clamp(cl, 0.0, 1.0) * 0.85); nc *= 0.94 + 0.12 * jn(p * 30.0);
          float fr = pow(1.0 - max(dot(n, shD), 0.0), 2.5); vec3 c2 = nc * (0.02 + 1.12 * pow(lit, 0.8)) + vec3(0.35, 0.55, 1.0) * fr * 0.4 * (0.15 + 0.85 * lit);
          col = mix(col, c2, nep); }
        if (hot > 0.0) {""")
rep("moonU.hot.value = w.moon.hot || 0; }", "moonU.hot.value = w.moon.hot || 0; moonU.nep.value = w.moon.nep || 0; }")
open('gl3d_ap.js', 'w').write(s); print('ok')
