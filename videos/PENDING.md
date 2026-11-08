# Channel 1 ("ماذا لو؟ Lab"): Metricool work waiting for the right account

Do nothing here until the user says Metricool is back on the account linked to this channel. Then check `getBrandSettings`: the brand must be `q3_tvm`, blogId `7907171`.

Use the exact file at the exact commit (raw URL) and check its size first.

## 1. Replace the video in posts that are already scheduled (urgent)

Swap in the fixed file, which removes the dotted globe glitch. Keep every other field as it is.

| Video | Post id | When it publishes | Fixed file | Commit | Size (bytes) |
|---|---|---|---|---|---|
| 13 ماذا لو توقفت الأرض عن الدوران فجأة؟ | 420179240 | Wed 11 Nov 16:00 Baghdad | `videos/13-earth-stops/spin_short.mp4` | `79357bff6eb8cbafde33ae2bfe93df6e0e52abe5` | 27805494 |
| 15 ماذا لو اختفت كل النباتات من الأرض في ليلة واحدة؟ | 420407064 | Thu 12 Nov 16:00 Baghdad | `videos/15-no-plants/plants_short.mp4` | `79357bff6eb8cbafde33ae2bfe93df6e0e52abe5` | 33510056 |

## 2. Approved videos waiting to be scheduled

| # | Video | Approved file | Commit | Size (bytes) | Title, description and tags |
|---|---|---|---|---|---|
| 18 | ماذا لو انفجر بركان يلوستون العملاق؟ | `videos/18-yellowstone/yell_short.mp4` | `79357bff6eb8cbafde33ae2bfe93df6e0e52abe5` | 55767590 | `videos/18-yellowstone/upload.md` |
| 19 | ماذا لو تحوّلت الشمس فجأة إلى قزم أحمر؟ | `videos/19-red-dwarf/red_short.mp4` | `2a545a8f7b44354f9e2d9ce424996c40dccb3b90` | 24240123 | `videos/19-red-dwarf/upload.md` |
