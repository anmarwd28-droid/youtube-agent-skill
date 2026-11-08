# Builds gravity.html from the "ماذا لو؟ Lab" atmosphere Short (same drawing library and look), switched to English.
import re, json
BASE = '../../../../videos/17-no-atmosphere/src/atmo3.html'
a = open(BASE, encoding='utf-8').read().split('\n')
head = '\n'.join(a[:652])            # page, CSS, helpers and the old scenes (overridden below)
mid_old = '\n'.join(a[673:928])      # renderUI + realism pass (street, trees, people)
tail = '\n'.join(a[928:])            # window.render
src = head + '\n' + mid_old + '\n' + open('gravity_mid.js', encoding='utf-8').read() + '\n' + tail
keys = ["gravity", "five", "seconds?", "nothing.", "drift", "up.", "spins.", "equator,", "sixteen", "hundred", "seventy", "kilometres", "straight", "line…",
        "curves", "away", "forty", "centimetres", "oceans…", "real", "problem.", "weight", "sky", "space…", "faster", "rock", "squeezed", "springs", "shakes",
        "everywhere", "astronauts", "notice", "float,", "falling", "snaps", "drops.", "crashing", "winds", "comments."]
src = re.sub(r"const KEY = new Set\(\[.*?\]\);", lambda m: 'const KEY = new Set(' + json.dumps(keys, ensure_ascii=False) + ');', src, flags=re.S)
src = src.replace('<html lang="ar">', '<html lang="en">')
src = src.replace('<style>', "<style>\n  @font-face { font-family: 'Inter Display'; src: url('InterDisplay-Bold.otf'); font-weight: 700 800; }\n  @font-face { font-family: 'Inter Display'; src: url('InterDisplay-Medium.otf'); font-weight: 500; }", 1)
src = src.replace("#cap .line { font-family: 'Noto Naskh Arabic', serif; direction: rtl; font-size: 46px;", "#cap .line { font-family: 'Inter Display', sans-serif; direction: ltr; font-size: 44px; letter-spacing: .2px;")
src = src.replace('#cap .line.big { font-size: 58px; }', '#cap .line.big { font-size: 54px; }')
src = src.replace(".list { position: absolute; top: 420px; right: 14px; width: 150px;", ".list { position: absolute; top: 420px; right: 14px; width: 176px;")
src = src.replace(".list .it { position: absolute; right: 36px; width: 106px; text-align: right; transform: translateY(-50%); font-family: 'Noto Naskh Arabic', serif; font-size: 20px; font-weight: 700; white-space: nowrap; direction: rtl; }",
                  ".list .it { position: absolute; right: 36px; width: 132px; text-align: right; transform: translateY(-50%); font-family: 'Inter Display', sans-serif; font-size: 18px; font-weight: 700; white-space: nowrap; direction: ltr; }")
src = src.replace(".list .hd { position: absolute; top: 12px; left: 0; right: 0; text-align: center; font-family: 'Noto Naskh Arabic', serif; font-size: 18px;", ".list .hd { position: absolute; top: 14px; left: 0; right: 0; text-align: center; font-family: 'Inter Display', sans-serif; font-size: 16px; letter-spacing: 2px;")
src = src.replace("font-family: 'Noto Naskh Arabic', serif; font-weight: 700; font-size: 28px; direction: rtl; transform: translate(-50%, -50%);", "font-family: 'Inter Display', sans-serif; font-weight: 700; font-size: 28px; direction: ltr; transform: translate(-50%, -50%);")
src = src.replace('.chip.big { font-size: 40px; padding: 8px 24px 12px; }', '.chip.big { font-size: 36px; padding: 8px 24px 11px; }')
src = src.replace('* الأحجام والمسافات ليست بمقياسها الحقيقي', '* not to scale')
# English shop signs on the street (the street stands for any city in the world)
src = src.replace("[[6, 150, 'مخبز', '#c0392b'], [178, 104, 'صيدلية', '#2a8a4a'], [306, 138, 'سوبرماركت', '#2a5a9a'], [468, 94, 'حلويات', '#d9822b'], [586, 148, 'أقمشة', '#6a3a8a']]",
                  "[[6, 150, 'BAKERY', '#c0392b'], [178, 104, 'PHARMACY', '#2a8a4a'], [306, 138, 'MARKET', '#2a5a9a'], [468, 94, 'CAFÉ', '#d9822b'], [586, 148, 'BOOKS', '#6a3a8a']]")
src = src.replace('font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>', 'font-family="Inter Display" font-weight="700" font-size="15" letter-spacing="1" fill="#fff">${name}</text>')
src = src.replace("/[،.…:؟]$/", "/[,.…:?!]$/")
# the astronaut from the Mars Short
mars = open('../../../../videos/10-mars/src/mars2.html', encoding='utf-8').read()
i = mars.index('function astro(x, y, o = {}) {'); j = mars.index('\n}\n', i) + 3
src = src.replace('// ===================== Weird Space Lab #1', mars[i:j] + '// ===================== Weird Space Lab #1')
open('gravity.html', 'w', encoding='utf-8').write(src)
left = [l for l in src.split('\n') if re.search(r'[؀-ۿ]', l) and ('TLI' in l or 'CHIPS' in l)]
print('built', len(src), 'arabic-in-ui lines:', len(left), 'shops ok:', 'BAKERY' in src, 'regex ok:', '/[,.…:?!]$/' in src)
