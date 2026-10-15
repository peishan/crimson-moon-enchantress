# Volume 2: *The Island That No Longer Feels Like Home*

Built so far: **comics 001–009 and 015** (010–014 are placeholders) (art in `assets/comics/v2/ch01.webp`…`ch09.webp`). The game keeps counting across volumes: Volume 2 comic *n* is **internal chapter 39 + n**
(40–48), shown as "Volume 2 · Chapter n" / "V2·n". So the level curve, gates, hooks and saves continue unchanged (story pace one level per chapter, so Volume 2 starts at about Lv 40).
All nine pages are correctly labelled (001–009); no duplicates or misnumbered pages in this batch.

| V2 comic | Game ch | Title | What happens |
|---|---|---|---|
| 001 | 40 | The Island That No Longer Feels Like Home | Return to Muxue. Xiyu asks for a separate residence and time apart. Yan's skin darkens, his eyes change. Her father asks if her cultivation feels unusual. Her spell twists once |
| 002 | 41 | The Man Who Weaves Shadows | Market: a talisman releases spirit wisps. **Shen Cangyuan** appears; the crimson filament; his terms |
| 003 | 42 | The Thread Beneath the Skin | Courtyard test: a black vein runs under the island. Dongyue hurt she hid it. The ancient formation cracks |
| 004 | 43 | The Sanctuary That Remembers | Xiyu's blood answers the formation; a chained chamber; Yan: "Do not seek it again" |
| 005 | 44 | The Voice Behind His Eyes | Yan tries to reinforce the seal; a voice answers through him; a broken jade seal |
| 006 | 45 | The Secret He Recognized | The older binding; Cangyuan has seen the pattern once before; he offers to investigate; a hidden symbol |
| 007 | 46 | A Dangerous Kind of Harmony | Cangyuan teaches Spirit Weaving; a black filament is sealed in a jade vessel. **Cangyuan joins** |
| 008 | 47 | The Spell That Reached Back | The vessel reacts to Xiyu; plan to compare with the original formation; Yan: "She has already begun to answer" |
| 009 | 48 | Echoes Beneath the Sanctuary | The original formation shows her birth memories; "You are the key"; "what they sealed was a truth"; the filament speaks |

| 010–014 | 49–53 | *(placeholders)* | Not written yet. **Ch 53 (comic 014) recruits Xining** and opens the bounty board |
| 015 | 54 | The Bounty Beneath the Red Lantern | Script only (no art yet): the first bounty, *The Red Lantern Road*. See `BOUNTIES.md` |

## Party in Volume 2
- **Shen Cangyuan joins at V2 comic 007 (ch 46)**, author-confirmed. First appears in 002 (profile visible from ch 41). Joins at party average − 1 (about Lv 47). Chapter level gate for ch 46: average Lv 46.
- **Lu Xining joins at V2 comic 014 (ch 53)**, author-confirmed; not built yet (only 001–009 exist). The Volume 2 cast sheet (which shows both) unlocks at ch 53.
- Skill unlock levels retuned to the join chapters (placeholders): Cangyuan 46 / 48 / 50 / 54, Xining 53 / 55 / 57 / 58 / 61. See `VOLUME2_PARTY.md`.
- Ya'Xing stays at the Ice Temple (not in these pages). Xiao Tian is still in the party but does not appear in 001–009; left as is.

## Decision to confirm: the Moonlit Bonding is paused
Comic 001 has Xiyu declining to "continue as we were at the Ice Temple". I read that as the bonding being **paused** from ch 40 (flag `xiyu_separate_residence`) until the story brings them back together
(flag `bonding_resumed`, no chapter yet; the Dev tab "Unlock bonding" resumes it). Cangyuan's **Steady the Current** is the interim way to cool her heat once he joins. If you would rather the bonding stay available, delete one line (`bondingPaused` in `scripts/core.js`).

## Content notes for the art
- Comic 007's last rows repeat "Next time, warn me before you put yourself in danger" and have garbled caption text ("Lo fncts now…"); comic 006 has a garbled bubble ("Why help us?"); comics 004 and 006 number two sections "3". Worth a regeneration pass.
- Comic 009 shows more of Xiyu's origin (born under a blood moon, elders' foresight, parents leaving her, "my father's decision"). Consistent with `STORY_NOTES.md`; her frozen-in-time past is still not stated.
- Not asserted anywhere in the game: who the voice is, what "the truth" is, Cangyuan's past, who the man in the memory is.

## Not built yet
- Xiyu learning Spirit Weaving as a skill (comic 007 teaches it; flag `spirit_weaving_learned` is set at ch 46, no skill yet).
- Volume 2 hunting zones, enemies and place art (the sanctuary, the pavilion, the market).
- Bond beats for Cangyuan beyond small gains at 46–48; Xining's chapters.

## Open thread: Ya'Xing (author, to revisit in Volume 3)
Ya'Xing stays away from the party after ch39 (recovering). The new comic 039 no longer shows this on the page; the author will revisit him in Volume 3, so the game keeps him away until then.
