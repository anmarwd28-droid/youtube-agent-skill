#!/bin/bash
# renders queued jobs one at a time: each job file holds "<src> <name> <total> <port>"; waits for new jobs until a STOP file appears
Q=/tmp/claude-0/-home-user-youtube-agent-skill/03a1b727-6631-5b00-9ebf-8013059306b3/scratchpad/queue
while true; do
  while pgrep -f "render3.js blackhole" > /dev/null; do sleep 10; done
  j=$(ls $Q/*.job 2>/dev/null | sort | head -1)
  if [ -z "$j" ]; then [ -e $Q/STOP ] && exit 0; sleep 15; continue; fi
  read SRC NAME TOT PB < "$j"; mv "$j" "$j.run"
  /home/user/youtube-agent-skill/weird-space-lab/videos/lib/render_wsl.sh "$SRC" "$NAME" "$TOT" "$PB" && mv "$j.run" "$j.done" || mv "$j.run" "$j.fail"
done
