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

## Comics 010-015 uploaded (author)
V2 010 "The Mark That Hid Her", 011 "The First Breach", 012 "The First Flutter" (panel numbers on the page repeat 2 and 5), 013 "The Kindness He Remembered", 014 "The Choice to Stay" (Xining joins), 015 "The Bounty Beneath the Red Lantern". Internal chapters 49-54 now have real titles, summaries, events and hooks; the placeholder flag is removed. Relationship threads on the pages: Xiyu and Cangyuan (012, 014), Dongyue and Xining (013, 014).

## Comics 016-020 (author) and the new questline
- **Art installed:** V2 016 "The Distance Between Heartbeats" (Arc 3), 017 "The Technique He Buried", 018 "The Name Behind the Seal", 019 "The Woman Behind the Door" (Arc 4: The Silence After the Spell). **020 "The Portrait Without a Face" has the author's script but no art yet** (script in `scripts/script_v2.js` as chapter 59, read in the story reader until the page is uploaded as `assets/comics/v2/ch20.webp`).
- Internal chapters 55-59 (`LAST_CHAPTER` is now 59).
- **Questline: The Broken Ward Network** (Bounties tab, unlocked by comic 016). Steps 55-58 follow the story. The last step, **The Portrait Without a Face**, has four objectives (examine the portrait gallery; recover the damaged departure record; investigate the second seal; determine whether the corridor is safe), needs Xiyu, Cangyuan, Xining and Dongyue as noted on each button, and completes chapter 59.
- **Flags:** `portrait_gallery_examined`, `departure_record_fragment_found`, `cangyuan_past_clue_found` are set as objectives are done. `second_door_open` stays false and `ruyue_identity_confirmed` stays false.
- **Continuity safeguards followed:** Shen Ruyue is not identified as Cangyuan's former lover; the voice is not identified; no Crimson Thread Resonance, soul bond or forced attraction occurs; the second door stays closed.
- **New art assets implied:** Xiyu's pale ivory-and-light-blue outfit with white or pale-blue ribbons and plum-white flowers, a more mature Cangyuan with dark layered hanfu (portrait variants), and an icon for the Torn Departure Record.

## Comics 020-022 (author)
- 020 "The Portrait Without a Face" art installed (the investigation already built; the page labels one of Xiyu's lines "Voice" in panel 6).
- 021 "The Truth Beneath the Silence" (chapter 60) and 022 "The Kiss She Chose" (chapter 61); `LAST_CHAPTER` is now 61. In 021-022 Xining wears pale yellow-green with a yellow flower rather than her earlier blue-white. **Intended:** the author planned a broad wardrobe for every character (Xiyu, Cangyuan, Dongyue and Xining all have options), so outfit changes are normal and are not continuity errors.
- 022: Xiyu kisses Cangyuan ("If I kiss you, don't mistake it for a promise."). This does **not** set `xiyu_chooses_cangyuan`, so Crimson Thread Resonance (dual cultivation) stays closed; the author says that comes later (not decided yet).
- Relationships: see docs/RELATIONSHIPS.md (Confidants tab).

## Master document check (author-supplied, not all verified)
Checked against the uploaded pages (001-022) and the game. **Matches:** Volume 1 summary and canon (no permanent soul bond, ceremonial wedding, Dongyue "cursed too"); Arc 4 "The Silence After the Spell" starting at 019; Shen Ruyue's name at 018; Xining entering at 013-014; Xiyu choosing the kiss at 022; Xining's and Cangyuan's skill names; Crimson Thread Resonance still undecided. **Not on any page yet (treat as roadmap, not canon):** arc names other than Arc 4, comics 023-038, the comic 031 enchantment and comic 032 memory gap, the two anchors, relay and keeper. Page 016 is labelled Arc 3 but not "finale" (corrected in the game text).
**Remaining plan (from the document):** 38 comics in Volume 2: 033 The Missing Interval, 034 The Memory He Feared, 035 More Than a Passing Feeling, 036 The Keeper's Account, 037 The Truth Between Them, 038 A Future Not Yet Written. In game terms comics 023-038 are chapters 62-77.
**Open:** Inverted Meridian is a level-48 skill in the game, but the document says it is introduced in 019-024 (not on pages 019-022); Xining pregnancy/miscarriage stays undecided and unwritten.
