# CLAUDE.md

## Language and tone

- Always reply to me in Iraqi Arabic.
- Keep explanations simple.

## Two channels: never mix them

I have two YouTube channels. They live in different Metricool accounts, and Claude is connected to only one Metricool account at a time.

| | Channel 1 | Channel 2 |
|---|---|---|
| Name | "ماذا لو؟ Lab" | "Weird Space Lab" (was "BABY 🐦") |
| Channel ID | `UCbbego5CIm5_6lwfvU2zXSA` (`@MadhaLawLab`) | `UC2Aav2c7K96ux-q1eJuuHYw` |
| Language of everything in the video and on YouTube | Simple Modern Standard Arabic (فصحى) | English |
| Metricool | brand `q3_tvm`, blogId `7907171` | blogId `7966902` |
| vidIQ | connected | not connected yet (public data only) |
| Video folders in this repo | `videos/` | `weird-space-lab/videos/` |

Before any work that touches a channel (research, script, video, metadata, scheduling):

1. Know which channel the task is for. If I did not say and it is not clear, ask me.
2. Call Metricool `getBrandSettings` and check which blogId and YouTube channel ID are connected right now. If it is not the channel the task is for, stop and tell me; do not read, schedule or change anything in the other channel.
3. Use that channel's language, folder and rules below. Never put Arabic text on channel 2 or English narration on channel 1, and never reuse a video from one channel on the other without asking me.

## Rules for both channels

- Claude produces the narration with ElevenLabs, voice "Brian" (voice_id `nPczCjzI2devNBz1zQrb`, model `eleven_multilingual_v2`); the videos are animated, with no face on camera.
- Length depends on the idea: as long as the idea really needs and no longer. Cut anything that does not add to it (YouTube allows Shorts up to 3 minutes; viewers finishing the Short matters most).
- Keep the same look as the published "ماذا لو؟ Lab" Shorts: illustrated scenes with the same 2D people, the city street and skyline, the real NASA 3D Earth and Moon, captions at the top with gold keywords, gold chips, a timeline list on the side. Make it a bit more realistic each time, but never switch to a different style.
- Facts must be scientifically correct; list them in the video's `upload.md`.
- Talk about the whole world, not one country: the narration and the effects shown are global. The street scenes keep the same drawn style, but they stand for any city in the world.
- Realism first, on every video (mine or your own idea), without me having to ask: push each scene as realistic as you can before you show it to me. Draw things at real-world scale (a room 2.7 m high, a person ~1.75 m, real object sizes), use the real NASA 3D Earth/planets instead of flat discs, show real physics where it matters (for example gravitational lensing around a black hole), and real-looking animals, places and materials. Before sending numbered shots, check every frame and fix anything that looks fake, flat, mis-scaled or cartoonish.
- Never publish or schedule a video before I have watched it and said it needs no changes.
- vidIQ: use it for research, and update video metadata only after I approve the exact values.

## Channel 1: "ماذا لو؟ Lab"

- A "what if?" channel: animated videos about events that never happened (two moons, the sun moving closer to Earth, and so on), explained with real science.
- Write scripts, narration, on-screen text, titles and descriptions in simple Modern Standard Arabic (فصحى) unless I ask otherwise.
- Metricool brand `q3_tvm` (blogId `7907171`, timezone Asia/Baghdad): use only the `youtube` provider there. Never read, post to or change the Instagram account in that brand.

## Channel 2: "Weird Space Lab"

- An English channel of short animated facts on any topic. It is a general channel, not a space channel (despite the name): space, science, history, Earth, the human body, animals, world records, countries and anything else that is strange and true. Do not limit ideas to space, and do not hide or delete videos for being off-space.
- Everything is in English: narration, on-screen text, titles, descriptions, tags and pinned comments.
- Same visual style and the same voice (Brian) as channel 1, only in English.
- End every video with a short question for the comments (for example "Would you survive this?").
- Metricool blogId `7966902` (timezone Asia/Baghdad), YouTube only.
- Channel art (banner) source: `weird-space-lab/channel-art/`.
