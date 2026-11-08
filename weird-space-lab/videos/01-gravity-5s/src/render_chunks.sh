#!/bin/bash
# resumable parallel render: 150-frame chunks, 4 workers; finished chunks are kept
cd "$(dirname "$0")"; D=/tmp/claude-0/-home-user-youtube-agent-skill/03a1b727-6631-5b00-9ebf-8013059306b3/scratchpad/g1/chunks; TOT=67.4; N=2022; C=150; nc=$(( (N + C - 1) / C ))
worker() { w=$1; for ((i=w; i<nc; i+=4)); do f=$D/c$(printf %03d $i).mp4; [ -s $f ] && continue
  F0=$((i*C)); F1=$(( (i+1)*C < N ? (i+1)*C : N ))
  PORT=$((9100+w)) F0=$F0 F1=$F1 TIMING=timing.json node render3.js gravity.html x $D/tmp$i.mp4 $TOT > $D/log$i.txt 2>&1 && mv $D/tmp$i.mp4 $f; done; }
for w in 0 1 2 3; do worker $w & done; wait
for ((i=0; i<nc; i++)); do [ -s $D/c$(printf %03d $i).mp4 ] || { echo "missing chunk $i"; exit 1; }; done
(cd $D && ls c*.mp4 | sort | sed "s/^/file '/;s/$/'/" > list.txt) && ffmpeg -y -v error -f concat -safe 0 -i $D/list.txt -i mixed.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t $TOT -movflags +faststart ../gravity_short.mp4 && echo "done $(date -u +%T)"
