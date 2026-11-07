#!/bin/bash
# resumable render: name total frames port ; chunks of 150 frames, 4 workers, finished chunks are kept
S=/tmp/claude-0/-home-user-youtube-agent-skill/89a0c101-630b-5476-b7b0-66c3140eb904/scratchpad
cd $S/scripts
one() { name=$1; tot=$2; N=$3; P=$4; C=150; D=$S/$name/chunks; mkdir -p $D; nc=$(( (N + C - 1) / C ))
  worker() { w=$1; for ((i=w; i<nc; i+=4)); do f=$D/c$(printf %03d $i).mp4; [ -s $f ] && continue
      F0=$((i*C)); F1=$(( (i+1)*C < N ? (i+1)*C : N ))
      FPS=30 VW=720 VH=1280 PORT=$((P+w)) F0=$F0 F1=$F1 TIMING=$S/$name/timing.json node render3.js $name.html x $D/tmp$i.mp4 $tot > $D/log$i.txt 2>&1 && mv $D/tmp$i.mp4 $f; done; }
  for w in 0 1 2 3; do worker $w & done; wait
  for ((i=0; i<nc; i++)); do [ -s $D/c$(printf %03d $i).mp4 ] || { echo "$name missing chunk $i"; return 1; }; done
  (cd $D && ls c*.mp4 | sort | sed "s/^/file '/;s/$/'/" > list.txt && ffmpeg -y -v error -f concat -safe 0 -i list.txt -i ../mixed.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t $tot -movflags +faststart ../${name}_short.mp4) && echo "$name done $(date -u +%T)"; }
one mars 65.6 1968 9060 && one rain 59.6 1788 9070
