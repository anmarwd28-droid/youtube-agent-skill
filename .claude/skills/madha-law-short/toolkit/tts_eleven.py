"""ElevenLabs narration with word timings (voice Brian, multilingual v2).
usage: python3 -I tts_eleven.py <dir>   (reads <dir>/script.json = list of lines; writes voice.mp3 and timing.json)
The key is injected by the environment proxy: keep the header value "proxy-injected". Never paste keys in chat;
if the call fails with 401, ask for the key with request_credential (host api.elevenlabs.io, header xi-api-key).
TOTAL for the video = last word end + about 1 s."""
import json, sys, urllib.request, base64
d = sys.argv[1]; lines = json.load(open(d + "/script.json", encoding="utf-8")); text = " ".join(lines); print(len(text))
body = json.dumps({"text": text, "model_id": "eleven_multilingual_v2", "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.15, "use_speaker_boost": True}}).encode()
req = urllib.request.Request("https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb/with-timestamps?output_format=mp3_44100_128", data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
r = json.load(urllib.request.urlopen(req, timeout=600))
open(d + "/voice.mp3", "wb").write(base64.b64decode(r["audio_base64"]))
a = r["alignment"]; ch = a["characters"]; st = a["character_start_times_seconds"]; en = a["character_end_times_seconds"]
words = []; cur = ""; s0 = None
for k, c in enumerate(ch):
    if c.isspace():
        if cur: words.append((cur, s0, en[k - 1])); cur = ""
    else:
        if not cur: s0 = st[k]
        cur += c
if cur: words.append((cur, s0, en[-1]))
out = []; wi = 0
for L in lines:
    n = len(L.split()); ws = words[wi:wi + n]; wi += n
    out.append({"text": L, "start": round(ws[0][1], 2), "end": round(ws[-1][2], 2), "words": [[w, round(s, 2), round(e, 2)] for w, s, e in ws]})
print("words", wi, len(words), "end", round(en[-1], 1))
for i, o in enumerate(out): print(i, o["start"], o["end"], ' '.join(f"{j}:{w[0]}@{w[1]}" for j, w in enumerate(o["words"])))
json.dump(out, open(d + "/timing.json", "w", encoding="utf-8"), ensure_ascii=False)
