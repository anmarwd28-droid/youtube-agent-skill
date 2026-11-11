#!/bin/bash
# rebuild sunl.html (long landscape video)
cd "$(dirname "$0")" && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js sup_a.js mil_lib.js lw_core.js lw_1.js $(ls lw_2.js lw_3.js lw_4.js 2>/dev/null) lw_end.js > sunl_mid.js && node --check sunl_mid.js 2>&1 | head -5
python3 build_long.py sunl "$(tr -d "\n" < sunl_keys.txt)" sunl_mid.js
