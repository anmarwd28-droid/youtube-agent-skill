"""Long-video narration: one ElevenLabs request per chapter, joined with a pause before each chapter title.
usage: python3 -I tts_long.py <dir> [gap_seconds]   needs script.json and chapters.json ([[title, nlines],...])
Each chapter's raw answer is cached in <dir>/parts, so a re-run costs no characters."""
import json, sys, urllib.request, base64, subprocess, os
d = sys.argv[1]; GAP = float(sys.argv[2]) if len(sys.argv) > 2 else 2.4
lines = json.load(open(d + "/script.json", encoding="utf-8")); chs = json.load(open(d + "/chapters.json", encoding="utf-8"))
os.makedirs(d + "/parts", exist_ok=True)
out = []; chap = []; off = 0.0; li = 0; lst = []
for ci, (title, n) in enumerate(chs):
    L = lines[li:li + n]; text = " ".join(L); pj = f"{d}/parts/c{ci:02d}.json"
    if not os.path.exists(pj):
        body = {"text": text, "model_id": "eleven_multilingual_v2", "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.15, "use_speaker_boost": True}}
        if li: body["previous_text"] = " ".join(lines[max(0, li - 2):li])
        if li + n < len(lines): body["next_text"] = lines[li + n]
        req = urllib.request.Request("https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb/with-timestamps?output_format=mp3_44100_128", data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
        r = json.load(urllib.request.urlopen(req, timeout=600)); json.dump(r, open(pj, "w"))
    r = json.load(open(pj)); mp = f"{d}/parts/c{ci:02d}.mp3"; wv = f"{d}/parts/c{ci:02d}.wav"
    open(mp, "wb").write(base64.b64decode(r["audio_base64"]))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", mp, "-ar", "44100", "-ac", "1", wv], check=True)
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wv]))
    a = r["alignment"]; ch = a["characters"]; st = a["character_start_times_seconds"]; en = a["character_end_times_seconds"]
    words = []; cur = ""; s0 = None
    for k, c in enumerate(ch):
        if c.isspace():
            if cur: words.append((cur, s0, en[k - 1])); cur = ""
        else:
            if not cur: s0 = st[k]
            cur += c
    if cur: words.append((cur, s0, en[-1]))
    if ci: off += GAP; lst.append(("sil", GAP))
    chap.append({"title": title, "start": round(off, 2), "line": li}); wi = 0
    for x in L:
        m = len(x.split()); ws = words[wi:wi + m]; wi += m
        out.append({"text": x, "start": round(off + ws[0][1], 2), "end": round(off + ws[-1][2], 2), "words": [[w, round(off + s, 2), round(off + e, 2)] for w, s, e in ws]})
    assert wi == len(words), (ci, wi, len(words))
    print(ci, title, len(text), "chars", round(dur, 1), "s at", round(off, 1)); lst.append((wv, dur)); off += dur; li += n
ins = []; f = ""
for k, (p, du) in enumerate(lst):
    if p == "sil": ins += ["-f", "lavfi", "-t", str(du), "-i", "anullsrc=r=44100:cl=mono"]
    else: ins += ["-i", p]
    f += f"[{k}:a]"
subprocess.run(["ffmpeg", "-y", "-loglevel", "error"] + ins + ["-filter_complex", f + f"concat=n={len(lst)}:v=0:a=1[o]", "-map", "[o]", "-b:a", "192k", d + "/voice.mp3"], check=True)
json.dump(out, open(d + "/timing.json", "w", encoding="utf-8"), ensure_ascii=False); json.dump(chap, open(d + "/chap_times.json", "w", encoding="utf-8"), ensure_ascii=False)
print("lines", len(out), "end", out[-1]["end"], "total", round(off, 2))
