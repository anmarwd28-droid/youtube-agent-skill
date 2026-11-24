#!/bin/bash
# build phar.html: the #77 helper chain + Pharaohs core/lib/people + scene files ($@ or default list)
cd "$(dirname "$0")"; . ./phchain.sh
F=${@:-"ph_1.js ph_2.js ph_3.js ph_4.js ph_5.js ph_end.js"}
cat $CHAIN ph_core.js ph_lib.js ph_ppl.js $F > phar_mid.js && node --check phar_mid.js 2>&1 | head -5
NMINE=$(echo ph_core.js ph_lib.js ph_ppl.js $F | wc -w) python3 phchk.py $CHAIN ph_core.js ph_lib.js ph_ppl.js $F
python3 build_long.py phar "$(tr -d '\n' < phar_keys.txt)" phar_mid.js
sed -i 's/gl3d_wide\.js/gl3d_ph.js/' phar.html
