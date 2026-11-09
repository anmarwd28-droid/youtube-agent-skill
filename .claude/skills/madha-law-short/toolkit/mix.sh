#!/bin/bash
# Music/SFX bed + ducked voice + loudness to -14 LUFS.
# usage: mix.sh <video_dir> <total_seconds> <audio_X.py>   (needs numpy: pip install numpy)
# If numpy is not importable with -I: pip install --target <dir> numpy, then pass PYLIB=<dir>.
D=$1; T=$2; A=$3
python3 -I $A "${PYLIB:-/nonexistent}" $D/timing.json $T $D/music_sfx.wav | tail -1 | cut -c1-80 && cd $D && ffmpeg -y -v error -i voice.mp3 -i music_sfx.wav -filter_complex "[0:a]aresample=44100,apad,atrim=0:$T,asplit=2[v][sc];[1:a]volume=0.55[m];[m][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400[d];[v][d]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11" -ar 44100 -ac 2 mixed.wav && ffprobe -v error -show_entries format=duration -of csv=p=0 mixed.wav
