---
name: madha-law-short
description: Make a new animated "what if?" YouTube Short for the channel "ماذا لو؟ Lab" (@MadhaLawLab) in exactly the channel's established look, voice and workflow. It covers the idea, the Fusha script, the ElevenLabs Brian narration, the HTML/SVG + 3D-Earth scenes, the test stills, the full render, the numbered review sheet, upload.md and saving. Use it for any request to make, fix or re-render a video for this channel ("سوي مقطع", "فيديو جديد", "ماذا لو ...", "عدّل اللقطة رقم ...").
---

# "ماذا لو؟ Lab" Short: the full pipeline

Read `CLAUDE.md` first (the two channels, never mixing them). This skill is for channel 1 only, and its files go in `videos/`. Talk to the user in Iraqi Arabic, simply, and never in English.

**Push every shot to the highest realism you can.** This is the user's standing order for every video, chosen by them or by you; see style.md. Rules in [reference/style.md](reference/style.md) are the user's own feedback, collected over 21 videos. Follow every one; they are the reason the videos look the same.

## Starting a fresh conversation (one per video)
- **Why:** the user starts a new conversation for each video, to keep the context small and save usage. Everything needed is in the repo: `CLAUDE.md`, this skill, `reference/` (style, api, videos), `toolkit/`, `examples/` and the last videos' `src/`.
- **First steps:**
  1. Read `reference/style.md`, `reference/videos.md` (the next idea is there) and `reference/audience.md` (what works on the channel).
  2. Follow the steps below.
- **Scheduling:** look at `videos/PENDING.md` for what is waiting.
- **Narration:** ElevenLabs runs through the proxy with the key saved on the Default environment. Check the remaining characters first with `GET /v1/user/subscription`; the free plan gives 10,000 a month.

## Never do

- Publish or schedule before the user has watched the final video and said it needs no changes.
- Schedule while Metricool is on another account. Always check `getBrandSettings` first: blogId `8073705` (since 13 Nov). See `videos/PENDING.md`.
- Touch the Instagram account in that brand, or anything under `weird-space-lab/`.
- Cut corners to save tokens. Keep the full test stills and the full length and quality of every video (the user asked for this explicitly).
- Put API keys in chat. ElevenLabs goes through the proxy; if it returns 401, use `request_credential`.

## Setup (once per session)

```bash
W=<scratchpad>/work            # any scratch folder
mkdir -p $W && cp -r .claude/skills/madha-law-short/toolkit/. $W/
cp .claude/skills/madha-law-short/examples/*.js $W/      # reference scenes to copy from
python3 -I -c "import numpy" || pip install numpy        # for the audio bed
```

Chromium and Playwright are preinstalled; `render3.js` serves `$W` over HTTP itself.

## Steps for a new video `X`

1. **Idea and facts.**
   - Research with vidIQ (`vidiq_keyword_research`, `vidiq_outliers`) when choosing ideas.
   - Every video (user, 12 Nov), always together with vidIQ: run the `yt-viral` skill to find and rank what is working in the niche, and run the `yt-package` skill (with vidIQ title scoring) for the title and cover text. These only touch ideas and packaging, never the animation style.
   - Check every number (show the formula for physics) and keep sources.
   - Global framing, not one country.
   - Write a scene plan of 9–12 scenes, one per narration line.
2. **Script.**
   - Write `$W/X/script.json`: a list of simple Fusha lines with full tashkeel on hard words.
   - Line 0 is the hook question. The last line is "اكتبْ سؤالَك في التعليقات، وقد يكونُ الفيديو القادم." (or a close variant).
   - Length is as long as the idea needs, usually 55–75 s. Write numbers as words in the narration.
3. **Voice.**
   - Run `python3 -I $W/tts_eleven.py $W/X`. It writes `voice.mp3` and `timing.json`, and prints the word indexes used for timing.
   - TOTAL = last word end + ~1 s. FRAMES = round(TOTAL × 30).
4. **Scenes.** Write `$W/X_new.js`, starting from the closest example in `examples/` (`bh_new.js` is the most recent and complete).
   - The structure, globals and the 3D globe are in [reference/api.md](reference/api.md).
   - Every scene keeps the house look: a captioned top band with gold keywords, gold chips, the side timeline list, the real NASA 3D Earth, and the 2D street and people.
5. **Build.**
   ```bash
   cd $W && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js X_new.js > X_mid.js
   python3 build_short.py X X_mid.js "kw1|kw2|..."     # gold caption keywords, exact words as in script.json
   sed -i "s#'./gl3d_v2.js'#'./gl3d_X.js'#" X.html       # choose/copy a gl3d module (see api.md)
   sed -i "s#if (!sc || sc.f === sceneEarth) return '';#if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' \&\& NOKB.has(sc.f))) return '';#" X.html
   ```
   Later files override earlier function declarations, so your `X_new.js` wins.
6. **Audio.**
   - Copy an `examples/audio_*.py` to `$W/audio_X.py` and rewrite only the `T = dict(...)` block and the effects under it.
   - Note names: use `C#`, `Eb`, `F#`, `Ab`, `Bb` (no `Db` or `G#`).
   - Run `PYLIB=... $W/mix.sh $W/X TOTAL $W/audio_X.py`. It writes `mixed.wav`.
7. **Test stills.**
   - Run `$W/stills.sh $W X TOTAL 9300 t1,t2,...` with one or two times per scene, plus every transition.
   - Look at each image yourself and fix everything against style.md before rendering.
   - Look for:
     - overlapping labels or chips
     - text cut off at the edges
     - people standing in the road
     - balls of glow
     - a flat "cartoon" look where realism is expected
   - Watch for `PAGEERROR` in the output.
8. **Full render.**
   - Start the render in the background with `timeout: 7200000`: `$W/render_chunks.sh $W X TOTAL FRAMES 10700`.
   - When it finishes, verify it with `ffprobe -count_frames`: the frame count must equal FRAMES and there must be an audio stream.
9. **Review sheet.**
   - Run `$W/sheet.sh $W/X/X_short.mp4 $W/X/X_shots_numbered.jpg <12 times>`. Look at it.
   - Send the user the mp4 and the sheet. They answer with shot numbers ("اللقطة 3 زيد واقعيتها").
   - For a fix, edit, rebuild, and re-render only the affected chunks: delete `$W/X/chunks/cNNN.mp4` for those frames (chunk = frame // 150) and run render_chunks again.
10. **Save.** Copy the files to `videos/NN-slug/`:
    - `X_short.mp4` and `X_shots_numbered.jpg`
    - `upload.md`, in the same format as `videos/21-black-hole/upload.md`: shots in order, Title, Description, Tags, Settings, and Facts with numbers and sources
     - Every video (user, 12 Nov): write the Description and Tags with the `yt-seo` skill together with vidIQ (`vidiq_keyword_research`), aimed at what people really type in search.
    - `src/`: X_new.js, X.html, X_mid.js, gl3d module, helper js, audio_X.py, script.json, timing.json, voice.mp3, plus any texture and its generator

    Then commit and push to the working branch and `main`.
11. **After approval.**
    - Add the video to `videos/PENDING.md` with the exact commit and the size in bytes.
    - Schedule only when the user says Metricool is back on this channel: YouTube only, with the title, description and tags from upload.md, using the raw URL at that commit.

[reference/videos.md](reference/videos.md) lists the videos already made (don't repeat an idea) and the ideas still waiting.

## Long landscape video (1920x1080, 8-10 minutes)

Same look, voice and rules as a Short; only the tools differ. Full worked example: `videos/32-sun-gone-long/` (its `src/blong.sh` shows the build order).

- **Script:** chapters with on-screen titles, each in a new place; the strongest 15 seconds first with a promise that pays off at the end; a hook about every minute; a comment question and "subscribe" at the end. Get the user's approval of the script before narrating.
- **Narration:** `tts_long.py <dir>` sends one ElevenLabs request per chapter (cached in `parts/`), joins them with 2.4 s gaps and writes `voice.mp3`, `timing.json` and `chap_times.json` (the YouTube chapter times). Check the remaining characters first: 9 minutes is about 6,000.
- **Build:** `mk_gl_wide.py` makes `gl3d_wide.js` (1280x720 stage) from `gl3d_world.js`. `build_long.py <name> "<keywords>" files...` turns the Shorts template landscape and adds the chapter card, the chapter tag and the side timeline. The page is 1280x720 at scale 1.5.
- **Stills:** `stq.sh "t1,t2,..."` makes stills and contact sheets. Look at several per chapter and fix them before the full render.
- **Render:** `render_chunks_w.sh $W <name> TOTAL FRAMES 10700` in the background with `timeout: 7200000`. About 10 chunks an hour, so 9 minutes takes about 10 hours. It stops by itself before the 2-hour limit: run it again until it prints "done" (finished chunks are kept). Output: `<name>/<name>_long.mp4`.
- **Review sheets:** `sheets_long.sh <video> <chap_times.json> TOTAL <out_dir>` makes one numbered sheet per chapter; the numbers run on across chapters.
- **Thumbnail:** 1280x720, built from the same scene code (`lw_thumb.js` in the example).
- **Save:** GitHub refuses files over 100 MB, so save the video as `split -b 90M -d` parts and write the join command in `upload.md`.
