# Chapter & level gates — Volume 1 (comics 1–39)

Source of truth: `docs/GAME_ADAPTATION_SCRIPT.md` (comics 1–20) and `docs/GAME_ADAPTATION_SCRIPT_021-039.md` (21–39). They supersede
`docs/COMIC_ARCHIVE.md`, which had gaps. Where the script does not state
something, the gate below is marked **provisional**.

## 1. Who is gated where (party gates)

| Hero | Profile visible | Joins when chapter … is completed | Why (from the script) | Chapter level gate on that chapter |
|---|---|---|---|---|
| **Muxue Xiyu** 慕雪细雨 · Moon Witch | Ch 1 | Ch 1 (starts in party, always leads) | Protagonist | – |
| **Zhan Dongyue** 展东悦 · Cursed Wanderer | Ch 2 | **Ch 11 "A Quest"** | "I'll go. I won't let you face it alone." | avg Lv 11 |
| **Xiao Tian** 萧天 · Silent Blade | Ch 2 | **Ch 14 "Xiao Tian's Dream"** | "Then I'll go with you, brother." | avg Lv 14 |
| **Ya'Xing** 亚星 · Steady Sailor | Ch 2 | **Ch 15 "Privacy"** *(confirmed by the author)* | Part of the expedition group from ch 15 | avg Lv 15 |
| **Muxue Yan** 慕雪岩 · Ancient Sage | Ch 17 | **none in Volume 1** | Appears and vanishes in ch 17, hosts the Red Assembly (ch 34) and bids the party farewell at the temple (ch 39), but never travels with them. His earlier "joins at ch 30" plan (028 crisis, 029 setup) is **retracted**: scripts 028–030 are about Xiyu's decline and Dongyue's confession. Dev-tab recruitable only | – |

Volume 2 heroes (see `VOLUME2.md`, `VOLUME2_PARTY.md`): **Shen Cangyuan joins at V2 comic 007 (ch 46, gate: avg Lv 46)**; **Lu Xining joins at V2 comic 014 (ch 53, a placeholder chapter for now; gate avg Lv 53)**.

A hero who joins starts at (party average level − 1). If Yan joins in Volume 2 he arrives at exactly the party average (see LEVEL_CURVE.md).

**Leaving the party:** Ya'Xing stays at the Ice Temple to recover in Yan's care when ch 39 completes ("Ya'Xing remains at the temple"). He is shown as "staying behind" and cannot be put in the active party. Xiyu, Dongyue and Xiao Tian return to Muxue.

## 2. Chapter level gates (Crimson-Tide-style `gate:{type:'level'}`)

Rule: **reach an average party level equal to the chapter number** (`GATE_RATIO = 1` in `scripts/core.js`).
Gated chapters = every recruitment chapter, the one battle chapter, the ch 20 milestone and the ch 39 finale.

| Chapter | Gate | Reason |
|---|---|---|
| 11 A Quest | avg Lv 11 | Dongyue joins |
| 13 Goodbye Hanshan | avg Lv 13 | Battle: the Afflicting Imp |
| 14 Xiao Tian's Dream | avg Lv 14 | Xiao Tian joins |
| 15 Privacy | avg Lv 15 | Ya'Xing joins |
| 20 A Deep Bond | avg Lv 20 | Milestone |
| 39 Return to the Island | avg Lv 39 | Volume 1 finale |

A story-only player has an average of about (chapter − 1) because joiners arrive a level behind and some classes level slower, so each gate
costs a couple of Wilds fights. See `docs/LEVEL_CURVE.md`.

## 3. Skill level gates

Skills use `req:{lvl, flag?}` (`scripts/characters.js`). The cast-sheet skills are marked "cast sheet".

| Hero | Skills (level) |
|---|---|
| Xiyu | Fireball Blast 1 · Crimson Moon 3 · Illusion Veil 6 · Meteor Shower 10 · Blood Moon Surge 20 · Eclipse Barrage 32 *(placeholder)* |
| Dongyue | Spirit Blade 1 · Healing Blessing 1 · Guardian Ward 4 · Restoration 9 · **Spirit Expulsion 8 + story (ch 13)** · **Soul Link 12 + story (ch 20)** · **Ancient Healing Rite 16 + story (ch 18)** · Radiant Sanctuary 30 *(placeholder)* |
| Xiao Tian | Flowing Strikes 1 · Heaven Step 4 · Counter Surge 8 · Lotus Burst 13 · Silent Edge 18 · Thousand Petals 30 *(placeholder)* |
| Ya'Xing | Piercing Shot 1 · Binding Trap 4 · Eagle Eye 7 · Survival Instinct 12 · Knife Volley 16 · Arrow Storm 28 *(placeholder)* |
| Yan | Ice Shard 1 · Frost Domain 28 · Sealing Chains 31 · Time Ward 34 · Celestial Art 38 (unused in Volume 1; for when he joins) |

Story flags that gate skills: `imp_expelled` (ch 13), `ancient_rite` (ch 18), `soul_bond` (ch 20). Other flags from the scripts (barrier, ritual, Hoko, casket…) are listed in `scripts/chapters.js` (`CH_FLAGS`).

## 4. Wilds zones (gameplay, not story) and when they open
Muxue Forest ch 1 · Moonlit Stream ch 6 · Hidden Chambers ch 15 · Rift Waters ch 16 · Icy Mountain Steps ch 17 · Ice Temple Level 1 ch 18 (boss: Frost Warden).
Ice Temple Level 2 (Sealed Maze, arena: two Horned Beasts) opens after ch 26 (the frozen maze; provisional). Level 3 (Underground) is **not scheduled**: no script mentions it.

## The soul-bond ritual countdown
Story-driven (`CH_RITUAL` in `scripts/chapters.js`), stored in the save, shown in the header and Journal, and **never reset by reloading or by real time**:
ch 22 she learns it (14 days) · ch 23 three days pass (11) · ch 24 "eleven days remained" · ch 28 "seven days left" · completed at ch 32 (second ritual phase, from the hook list; provisional).
Dongyue's promise in ch 29 and "husband" in ch 39 do **not** complete it.

## Chapters with no approved script (all now have art)
25 (placeholder bridge "The Frozen Passage"), 30, 31, 32, 35, 36 have no approved script and can be completed so the story is not blocked. 31 The Ritual Chamber, 32 Embracing Her Feelings, 35 Gratification and 36 Xiao Tian's Memories show an outline taken from the author's hook list (see `HOOKS_REVIEW.md`); 25 and 30 show a pending notice. 38 is a reconstructed bridge.
Ch 30 note: two panels of its earlier image wrongly showed Dongyue with black hair; the final art must show him silver-haired.

## Open questions for the author
1. **Approved scripts** for 25, 30, 31, 32, 35, 36 (titles for 31, 32, 35, 36 come from the hook list) (and the verdict at the Red Assembly in 34, and the final text of 38).
2. **Ya'Xing's and Xiao Tian's whereabouts in 26–38.** The scripts show only Xiyu and Dongyue (with Hoko) after 25 and mention "injured companions". The game currently leaves both available for gameplay; say if they should be unavailable.
3. **Xiyu's origin** — answered by the author (frozen in time, raised by her own descendants); kept as spoiler notes in `STORY_NOTES.md`, not shown in the game. Confirmed: Yan is her father and she is Muxue Yunxi.
4. **Muxue Yan in Volume 2** — does he join, and where?
5. **Which casket/chamber is Ao Yun's Resting Place** on the map (matched provisionally to the ch 27 casket chamber).
6. Gate strictness (avg level = chapter) and the amount of story XP are first-pass.
