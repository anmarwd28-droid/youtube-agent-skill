# Channel 1 ("ماذا لو؟ Lab"): Metricool work waiting for the right account

Do nothing here until the user says Metricool is back on the account linked to this channel. Then check `getBrandSettings`: the brand must be `q3_tvm`, blogId `7907171`.

Use the exact file at the exact commit (raw URL) and check its size first.

## Already scheduled: keep as they are

Videos 13 (Wed 11 Nov 16:00) and 15 (Thu 12 Nov 16:00) were scheduled before a one-second dotted-globe glitch was found and fixed. The user decided not to replace them, so do not touch those posts. The fixed files are in the repo.

## Already published on YouTube: never upload these again

| Date | Time | Video | Link |
|---|---|---|---|
| 12 Nov | 10:00 | 15 ماذا لو اختفت كل النباتات من الأرض في ليلة واحدة؟ | youtube.com/shorts/ofqzv1qu45A |
| 12 Nov | 16:00 | 32 Long video: ماذا لو اختفت الشمس؟ من الثانية الأولى حتى مليون سنة | youtube.com/watch?v=S5WYKhnetPQ |
| 12 Nov | 17:00 | 16 ماذا لو بدأت الأرض تبتعد عن الشمس؟ | youtube.com/shorts/j6ZkgArrt1E |

## Not published yet: schedule as the user set it in Metricool (checked 12 Nov 2026, YouTube only, Baghdad time)

The user rescheduled everything themselves: three posts a day, 10:00, 16:00 and 20:00. Never change these times without asking. The next free slot is **18 Nov 16:00**.

| Date | Time | Video | Status on 12 Nov |
|---|---|---|---|
| 12 Nov | 20:00 | 17 ماذا لو اختفى الغلاف الجوي من حول الأرض فجأة؟ | **Error: "You have reached your Metricool account limit"**; the user must reschedule it |
| 13 Nov | 10:00 | 18 بركان يلوستون | Pending |
| 13 Nov | 16:00 | 19 الشمس قزم أحمر | Pending |
| 13 Nov | 20:00 | 20 الأرض دارت بالعكس | Pending |
| 14 Nov | 10:00 | 21 ثقب أسود بحجم حبة عنب | Pending |
| 14 Nov | 16:00 | 22 للأرض قمران | Pending |
| 14 Nov | 20:00 | 23 اختفى الأكسجين 5 ثوانٍ | Pending |
| 15 Nov | 10:00 | 24 اختفى الزجاج 5 ثوانٍ | Pending |
| 15 Nov | 16:00 | 25 تركض بسرعة الصوت | Pending |
| 15 Nov | 20:00 | 26 توقّف الزمن 5 ثوانٍ | Pending |
| 16 Nov | 10:00 | 27 الأرض مسطّحة | Pending |
| 16 Nov | 16:00 | 28 قوّة خارقة | Pending |
| 16 Nov | 20:00 | 29 الإنسان يعيش ألف سنة | Pending |
| 17 Nov | 10:00 | 30 حرب نووية عالمية | Pending |
| 17 Nov | 16:00 | 14 للأرض حلقات مثل زحل | Pending |
| 17 Nov | 20:00 | 31 التنانين موجودة | Pending |
| 18 Nov | 10:00 | 33 البشر يطيرون | Pending |

Every video file is in the repo: `videos/<number>-*/` (the number is in the Video column), each with its `upload.md` (title, description, tags). The long video 32 is split in parts: join them with `cat sunl_long.mp4.part0* > sunl_long.mp4`. If the user moves to a new Metricool account, reschedule from these files at the same times, and make sure the old posts are deleted so nothing goes out twice.

Checked on 12 Nov: the 17 files above that are not published yet are the final versions on `main` (no newer version on any branch, none changed after it was scheduled; the old Yellowstone on branch `ccr-ba7d4217-xeyy3x` is outdated, never use it). Each decodes with no errors, 1080x1920 with audio.

The ideas list in `NEW_CHAT_PROMPT.md` is now mostly done (superpowers, 1000 years, flying, nuclear war, dragons are scheduled).

## Not approved yet

Nothing.
