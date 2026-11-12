#!/bin/bash
# stq.sh "t1,t2,..." [sheetname]: stills in one page load; prints errors; builds contact sheets of 9
cd "$(dirname "$0")"; ./stillsw.sh $PWD sunl 527 9300 $1 2>&1 | grep -E "PAGEERROR|Error" | cut -c1-260 | head -4
a=(${1//,/ }); n=${#a[@]}; k=1; for ((i=0;i<n;i+=9)); do ./cs.sh sunl/${2:-cs}$k.jpg "${a[@]:i:9}" 2>&1 | head -2; k=$((k+1)); done
