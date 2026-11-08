#!/bin/bash
# usage: audio_mix.sh <src dir> <total seconds>  -> bed.wav + mixed.wav (voice over the ducked bed)
cd "$1"; python3 -I ../../lib/audio_wsl.py /usr/lib/python3/dist-packages timing.json $2 bed.wav events.json && \
ffmpeg -y -v error -i voice.mp3 -i bed.wav -filter_complex "[0:a]aresample=44100,apad,atrim=0:$2,asplit=2[v][sc];[1:a]volume=0.32[b];[b][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[bd];[v][bd]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95" -ar 44100 mixed.wav && echo mixed
