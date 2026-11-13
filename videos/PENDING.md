# Channel 1 ("ماذا لو؟ Lab"): Metricool work waiting for the right account

Metricool for this channel is the NEW account: check `getBrandSettings` shows blogId `8065283` (YouTube `UCbbego5CIm5_6lwfvU2zXSA`) before any scheduling.

Use the exact file at the exact commit (raw URL) and check its size first.

## State on 13 Nov (before the compact; the next chat may run on another model)

- Made and scheduled: up to #36. Nothing is waiting for approval and nothing is half-made.
- Next video: the user will pick from the ranked list in `NEW_CHAT_PROMPT.md` (top: one eye, then mosquitoes). Make it in a new chat with the `madha-law-short` skill, in the same style.
- ElevenLabs: about 4,000 characters left. That is about 5 Shorts at about 770 each; resets about 10 Dec.
- vidIQ: 125 of 150 credits left, renews 13 Dec. Each outliers, channel-videos, keyword or title-score call costs 5.
- Research rule: vidIQ plus every fitting `yt-*` skill together (see CLAUDE.md). Arabic Shorts are not indexed in vidIQ outliers; use English what-if Shorts and adapt them. yt-dlp is blocked here, so get the channel lists for `swipe.py` with `vidiq_channel_videos`.

## Switching to a new Metricool account (user, 13 Nov)

The account with blogId `8065283` used up its November free limit. The user is moving to a newer Metricool account so scheduling can continue. Rules:
- The posts already scheduled on `8065283` (everything up to 19 Nov 10:00) stay there and publish by themselves. Do not reschedule them on the new account, so nothing goes out twice.
- The user must not disconnect the YouTube channel from the old account, or those posts fail.
- On the new account, schedule from **19 Nov 16:00** onward, at the same times: 10:00, 16:00 and 20:00.
- Run `getBrandSettings` first. Note the new blogId here and check the YouTube channel ID is `UCbbego5CIm5_6lwfvU2zXSA`.

## Already scheduled: keep as they are

Videos 13 (Wed 11 Nov 16:00) and 15 (Thu 12 Nov 16:00) were scheduled before a one-second dotted-globe glitch was found and fixed. The user decided not to replace them, so do not touch those posts. The fixed files are in the repo.

## Already published on YouTube: never upload these again

| Date | Time | Video | Link |
|---|---|---|---|
| 12 Nov | 10:00 | 15 ماذا لو اختفت كل النباتات من الأرض في ليلة واحدة؟ | youtube.com/shorts/ofqzv1qu45A |
| 12 Nov | 16:00 | 32 Long video: ماذا لو اختفت الشمس؟ من الثانية الأولى حتى مليون سنة | youtube.com/watch?v=S5WYKhnetPQ |
| 12 Nov | 17:00 | 16 ماذا لو بدأت الأرض تبتعد عن الشمس؟ | youtube.com/shorts/j6ZkgArrt1E |

## Not published yet: schedule as the user set it in Metricool (YouTube only, Baghdad time)

All 17 were scheduled on 12 Nov 21:03 on the NEW Metricool account (blogId `8065283`), same texts, titles and tags as before, files from commit `24bdcdab09278742ec2f01c94a5a12aecb3524fe`. The user deleted the copies on the old account (blogId `7907171`) on 12 Nov, so nothing goes out twice.

**Metricool free limit: 20 published posts per calendar month, reset on the 1st.** The new account uses 18 in November, so only 2 are left until 1 Dec. Remind the user of the count before every new scheduling, and warn before it runs out.

The user set the times: three posts a day, 10:00, 16:00 and 20:00. Never change these times without asking. The last scheduled post is **19 Nov 10:00** (#36). The next free slot is **19 Nov 16:00**.

| Date | Time | Video | Status on 12 Nov |
|---|---|---|---|
| 12 Nov | 21:15 | 17 ماذا لو اختفى الغلاف الجوي من حول الأرض فجأة؟ | Published 12 Nov: https://www.youtube.com/shorts/wA2y8ysVdbc |
| 13 Nov | 10:00 | 18 بركان يلوستون | Scheduled |
| 13 Nov | 16:00 | 19 الشمس قزم أحمر | Scheduled |
| 13 Nov | 20:00 | 20 الأرض دارت بالعكس | Scheduled |
| 14 Nov | 10:00 | 21 ثقب أسود بحجم حبة عنب | Scheduled |
| 14 Nov | 16:00 | 22 للأرض قمران | Scheduled |
| 14 Nov | 20:00 | 23 اختفى الأكسجين 5 ثوانٍ | Scheduled |
| 15 Nov | 10:00 | 24 اختفى الزجاج 5 ثوانٍ | Scheduled |
| 15 Nov | 16:00 | 25 تركض بسرعة الصوت | Scheduled |
| 15 Nov | 20:00 | 26 توقّف الزمن 5 ثوانٍ | Scheduled |
| 16 Nov | 10:00 | 27 الأرض مسطّحة | Scheduled |
| 16 Nov | 16:00 | 28 قوّة خارقة | Scheduled |
| 16 Nov | 20:00 | 29 الإنسان يعيش ألف سنة | Scheduled |
| 17 Nov | 10:00 | 30 حرب نووية عالمية | Scheduled |
| 17 Nov | 16:00 | 14 للأرض حلقات مثل زحل | Scheduled |
| 17 Nov | 20:00 | 31 التنانين موجودة | Scheduled |
| 18 Nov | 10:00 | 33 البشر يطيرون | Scheduled |
| 18 Nov | 16:00 | 34 لم تنم ١٠ أيام (commit `6caa8663ee04808814285cfce9824a1fceb667ab`, 28,010,744 bytes) | Scheduled 12 Nov 23:06 |
| 18 Nov | 20:00 | 35 كل البشر عُمياناً فجأة (commit `919c95427b1d5b4393674190f6843ff3fd648d8a`, 27,121,512 bytes; Metricool post 426371480) | Scheduled 13 Nov 02:53 |
| 19 Nov | 10:00 | 36 لم تُخترَع العجلة (commit `0b30d3a`, Metricool post 426431414) | Scheduled 13 Nov 04:18 |

Every video file is in the repo: `videos/<number>-*/` (the number is in the Video column), each with its `upload.md` (title, description, tags). The long video 32 is split in parts: join them with `cat sunl_long.mp4.part0* > sunl_long.mp4`. If the user moves to a new Metricool account, reschedule from these files at the same times, and make sure the old posts are deleted so nothing goes out twice.

Checked on 12 Nov: the 17 files above that are not published yet are the final versions on `main` (no newer version on any branch, none changed after it was scheduled; the old Yellowstone on branch `ccr-ba7d4217-xeyy3x` is outdated, never use it). Each decodes with no errors, 1080x1920 with audio.

The ideas list in `NEW_CHAT_PROMPT.md` is now mostly done (superpowers, 1000 years, flying, nuclear war, dragons are scheduled).

## Not approved yet

Nothing.


Metricool free plan (blogId 8065283): after #36 the November limit is used up (0 left); the limit resets on 1 Dec.

ElevenLabs on 13 Nov: about 4,000 characters left of 10,000 (resets about 10 Dec); one Short uses about 770.
