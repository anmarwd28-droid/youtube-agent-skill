#!/bin/bash
# portrait contact sheet: cps.sh <name> <out.jpg> t1 t2 ...  (6 per row, 360x640 each)
N=$1; O=$2; shift 2; TMP=$(mktemp -d); i=1
for t in "$@"; do ffmpeg -v error -y -i $N/st/s_$t.jpg -vf "scale=360:640,drawtext=text='$t':x=8:y=600:fontsize=26:fontcolor=yellow:box=1:boxcolor=black@0.6" $TMP/$(printf %02d $i).jpg; i=$((i+1)); done
n=$#; rows=$(( (n + 5) / 6 )); ffmpeg -v error -y -i $TMP/%02d.jpg -vf tile=6x$rows -frames:v 1 -q:v 3 $O; rm -rf $TMP
