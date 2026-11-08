# usage: python3 tts.py <src dir>  -> voice.mp3 + timing.json from script.json (ElevenLabs Brian, with timestamps)
import json, base64, subprocess, sys, os
d = sys.argv[1]; L = json.load(open(os.path.join(d, 'script.json'))); txt = ' '.join(L)
body = json.dumps({"text": txt, "model_id": "eleven_multilingual_v2", "voice_settings": {"stability": .5, "similarity_boost": .75, "style": 0, "use_speaker_boost": True}})
out = subprocess.run(['curl', '-sS', '-X', 'POST', 'https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb/with-timestamps?output_format=mp3_44100_128',
                      '-H', 'xi-api-key: proxy-injected', '-H', 'Content-Type: application/json', '--data-binary', '@-'], input=body.encode(), capture_output=True).stdout
r = json.loads(out); open(os.path.join(d, 'voice.mp3'), 'wb').write(base64.b64decode(r['audio_base64']))
a = r['alignment']; ch, st, en = a['characters'], a['character_start_times_seconds'], a['character_end_times_seconds']; assert ''.join(ch) == txt
res, pos = [], 0
for line in L:
    words, i = [], pos
    for w in line.split(' '): j = i + len(w); words.append([w, round(st[i], 2), round(en[j - 1], 2)]); i = j + 1
    res.append({"text": line, "start": words[0][1], "end": words[-1][2], "words": words}); pos += len(line) + 1
json.dump(res, open(os.path.join(d, 'timing.json'), 'w'), ensure_ascii=False)
print(os.path.basename(os.path.dirname(d)), 'total', round(en[-1], 2))
for k, o in enumerate(res): print(k, ' '.join(f'{j}:{w[0]}@{w[1]}' for j, w in enumerate(o['words'])))
