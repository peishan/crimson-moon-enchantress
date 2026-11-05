# Comic art vs script tally — comics 001–020

**Corrected after the author's clarification:** pages with the same title are *regenerations* (the later one replaces the earlier),
and the art's own order is right. The first version of this audit wrongly treated pages 2, 3 and 5 as stray; they are real chapters.
It is the script's scene text for comics 002–005 that sits under the wrong titles relative to the art.

## Final mapping (what is in `assets/comics/`)

| Game ch | Title | Image used | Notes |
|---|---|---|---|
| 01 | The Witch Beneath Eight Moons | #1 | label correct |
| 02 | The Intruders of Muxue | #2 | Xiyu follows the quake, spies on the strangers |
| 03 | The First Encounter | #5 | regeneration of #3 (Dongyue now silver-haired). #3 not used |
| 04 | Welcome to Muxue | #4 | the voyage, told as "Hours ago…" |
| 05 | The Crimson Fairy | #6 | art label said "003": **should be 005**. Mayor, A'Bu, the inn, veiled Xiyu |
| 06 | Rage | #7 | porridge scene and the stream |
| 07 | The Intruder | #8 | art label said "006": **should be 007** |
| 08 | I Don't Need a Husband | #10 | regeneration of #9 (shorter, larger text). #9 not used |

## Script text vs art order (what was realigned in the game)

The script file (`docs/GAME_ADAPTATION_SCRIPT.md`) numbers 002–005 differently from the art. In-game text now follows the art order:

| Game ch | In-game text comes from |
|---|---|
| 02, 03 | no script text exists: transcribed from the comic pages (#2, #5) |
| 04 | script comic 002 (the voyage and arrival) |
| 05 | script comics 003 + 004 (mayor, A'Bu, the inn, veiled Xiyu) |
| 06 | script comics 005 + 006 (porridge, the stream) |
| 01, 07–20 | script comics of the same number |

Total count is unchanged: art 002–006 = script 002–006 re-sequenced, so chapters 7+ line up with the script as before.

## Still worth the author's attention
1. **Xiyu undressing / "naked".** Script 006 has her wrap in a *light inner garment*. Art #7 shows her slipping out of her garments, and the narration in #1, #7, #8 says "naked". This conflicts with the author's own inner-garment rule.
2. **Script 008 line missing.** "Then let me be afraid beside you" is in neither art version (#9 had "Try me", #10 drops the exchange).
3. **Facts in the art but not the script** (confirm or cut): Xiyu is eighteen (#1); Dongyue's home is "Sanggui, ten thousand li from Yilong" (#4); the compass jumps from northeast to southwest (#3, #4); Muxue Yan is "a wise swordsman" who discovered the island (#6); Xiao Tian mentions the woman in grey already in ch06 (#7), earlier than the script's ch14.
4. **Two first meetings.** Ch03 has them meet in the forest; ch05 has Xiyu introduce herself at the inn as if new. Reads as "met, but not yet introduced"; confirm that is intended.

---

# Second batch: comics 009–020 (15 images)

All 20 chapters now have art in `assets/comics/`.

| Image | Label on the art | Shows | Game ch | Verdict |
|---|---|---|---|---|
| 1 | 009 Who is Hanshan | Dongyue's sleepless morning, Sister Qing, the robe, the plan | 09 | ✅ used |
| 2 | 010 Helping Hanshan (v1) | Hanshan arrives, staff warn of the warded rooms, the condition | 10 | alternate, not used |
| 3 | 010 Helping Hanshan (v2) | Same beats, larger panels | 10 | ✅ **chosen** |
| 4 | 011 A Quest | The promise, the ancestral chest, "I give you my word" | 11 | ✅ used |
| 5 | 012 Entering Her Private Chambers | Wards, Dongyue enters, quilt | 12 | ✅ used |
| 6 | 013 Goodbye Hanshan | Western Lake, Xi'er's imp, red figure in the yard | 13 | ✅ used |
| 7 | 014 Xiao Tian's Dream | Woman in grey, oath of brotherhood, "we will go with you" | 14 | ✅ used |
| 8 | 015 Privacy | Hidden staircase, kirin door, maps, Pei Xinyi, green boat | 15 | ✅ used |
| 9 | **015** The Gates of Muxue Have Opened | Gates, Fangyi, the dream portrait, rift | 16 | ⚠️ label says 015, **should be 016** |
| 10 | **018** The Prisoner (v1) | Climb, Muxue Yan, chains, chest contents | 17 | alternate, not used. Label says 018, should be 017 |
| 11 | 017 The Prisoner (v2) | Same beats, larger panels, ends as she opens the chest | 17 | ✅ **chosen** |
| 12 | 019 Xiyu's Thoughts (v1) | Mother's words, chosen by magic, diary, what does she want | 19 | ✅ **chosen** |
| 13 | 019 Xiyu's Thoughts (v2) | Longer version, denser text | 19 | alternate, not used |
| 14 | **019** Xiyu's Thoughts (Ice Temple page) | Ice Temple appears, five hours later, Dongyue's healing | 18 | ⚠️ label says 019, **should be 018** (A Risk Only for Her) |
| 15 | 020 A Deep Bond | The bond, the scroll, "we'll sleep together" | 20 | ✅ used |

## Why these picks
- **010:** v2 has larger panels and cleaner text. v1 adds the staff warning about the lethal wards (a setup for ch 12); ch 12 explains the wards itself, so little is lost.
- **017:** v2 is more legible and matches the script's ending (she weakens, Dongyue catches her, the chest is about to open). v1 has a small text glitch ("amo ts") and adds the chest contents (magic manuals, an invincible weapon, a letter from her forefathers) plus "Muxue Yan had already vanished, leaving more questions than answers". If the chest contents should be canon in ch 17, swap to v1.
- **019:** v1 is cleaner and names the dark moon deity **Minami**, as the archive does. v2 calls her "the goddess of sensuality", mentions "the dark bonding-ritual", has Dongyue say "I like you", and is closer to the script's "I used Dongyue" thoughts but is text-heavy. If those beats matter, swap to v2.

## Content notes
- **Ya'Xing at ch 15 is confirmed by the art:** he is in the group on the staircase, and in ch 14 Xiao Tian says "As for Ya'Xing, I do not doubt he has your best interests. We will go with you."
- **New facts on the ch 18 page:** the Ice Temple is "believed to be magically constructed from Muxue Yan's deep cultivation in memory of his beloved wife, Ao Yun", has **sixteen rooms, each with a different purpose**, and its location was a myth known only to Yan. (Relevant to any Ice Temple room graph.)
- **Ch 20 art** says "the ritual bonding could increase her cultivation" and ends with "a bond that would change everything between them", consistent with the bond / ritual hooks.
- **Ch 12 art** ends with a kiss in bed; the script ends on "Someone who refuses to give up on you."
- **Art vs script, minor:** the script's ch 17 has Xiyu say "You… are Muxue Yan?" without introducing the party; v2 has her name Master Zhan, Xiao Tian and Ya'Xing.
- Sleepwear in ch 11, 12 and 20 is a camisole/inner garment, in line with the author's rule.

---

# Third batch: comics 021–039 (20 images)

All 39 chapters now have art in `assets/comics/`.

| Image | Label | Game ch | Verdict |
|---|---|---|---|
| 1–7 | 021 Warming Up to Him · 022 Bonded · 023 Exploring the Ice Temple · 024 Accepting Fate · **025 His Magic** · 026 Teleportation · 027 The Glass Casket | 21–27 | ✅ labels correct. 025 has a real title (was a placeholder "The Frozen Passage") |
| 8, 9 | 028 Deeply Weakened (two versions) | 28 | **v2 chosen**: its Dongyue line ("Let me be your companion… only that you tell me the secret behind the ritual") matches the script; layout slightly cleaner. v1 not used (low-confidence pick, swap if you prefer it) |
| 10 | 029 The Price of Love | 29 | ✅ |
| 11 | **030 Malicious** | 30 | ✅ title now known. Dongyue is silver-haired throughout |
| 12–14 | 031 The Ritual Chamber · 032 Embracing Her Feelings · 033 Rainbow Dream | 31–33 | ✅ |
| 15 | **033** Heinous Intent | **34** | ⚠️ label says 033, should be **034** |
| 16–20 | 035 Gratification · 036 Xiao Tian's Memories · 037 The Duty of a Lesser Male · 038 Communication · 039 Return to the Island | 35–39 | ✅ |

## What the pages change in the game
1. **ch23 shows the Ice Library** (and the locked central door, the five magical berries, the frozen infant Yunxi). I had moved the library to 024 from the script; the hook file was right. Restored.
2. **ch24 shows Levels 2 and 3 of your Ice Temple map**: maze door, stone puzzle, two minotaur-like beasts, the floor opening, the haystack landing, red potions, locked chests, a dark door. Those rooms and the two hunting zones now unlock at ch24 (was 26 / unscheduled).
3. **Xiao Tian and Ya'Xing are separated from ch24** ("wondering about the fate of Xiao Tian and Ya'Xing") and found "recuperating in the rooms" in **ch34**. They are now unavailable in 24–33; Ya'Xing is unavailable again after 39. This answers my earlier question.
4. **Ritual countdown** from the pages: 14 (22) → 11 (23–24, "only six before the worst effects") → **10 (25)** → 7 (28). Completed at 32 (second phase starts at the end of 31, she wakes restored in 32).
5. **ch036 conflicts with the summary you gave me.** On the page, the itching, allergic reactions, difficulty walking and speaking and insane laughter are **Ya'Xing's**; Xiao Tian's page text is that his memories partly return, much still a blur, and that he is **Feng Xia, not the childish Xiao Tian**. I followed the page: Xiao Tian's hook text no longer lists those symptoms.
6. **Xiyu's origin is on the pages in Volume 1** (027 "Is that child… me?", 029 Yan's chambers, 030 her dream, 034 she realises he is her father and may be Yunxi, 038 "her biological father", Xiyu calls him Father). `STORY_NOTES.md` said to keep this out of Volume 1; that is corrected there.

## Content notes
- Ch031–033 and 036 captions say "bare", "naked beneath the sheets" and show a ritual circle and bedding scenes more revealing than the "blankets, wraps, steam, petals" rule. Installed as supplied; your call whether to regenerate.
- Ch025 says Dongyue "can treat you as my wife now" before the ch35 wedding, and ch033's dream is the proposal.
- Ch034's page text is "Heinous Intent" under a "033" label (see above); a typo in 036 ("There was no falseness…") overlaps a caption.

---

# Volume 2 art: comics 001–009 (9 images)
All correctly labelled 001–009, no duplicates. Installed as `assets/comics/v2/ch01.webp`…`ch09.webp` (internal chapters 40–48). Details and content notes: `VOLUME2.md`.
