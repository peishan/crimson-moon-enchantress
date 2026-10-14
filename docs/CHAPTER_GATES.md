# Chapter & level gates — Season 1 (chapters 1–20)

Source of truth: `docs/GAME_ADAPTATION_SCRIPT.md` (the author's corrected script). It supersedes
`docs/COMIC_ARCHIVE.md`, which had gaps (unknown titles, ch20 unrecorded). Where the script does not state
something, the gate below is marked **provisional**.

## 1. Who is gated where (party gates)

| Hero | Profile visible | Joins when chapter … is completed | Why (from the script) | Chapter level gate on that chapter |
|---|---|---|---|---|
| **Muxue Xiyu** 慕雪细雨 · Moon Witch | Ch 1 | Ch 1 (starts in party, always leads) | Protagonist | – |
| **Zhan Dongyue** 展东悦 · Cursed Wanderer | Ch 2 | **Ch 11 "A Quest"** | "I'll go. I won't let you face it alone." | avg Lv 9 |
| **Xiao Tian** 萧天 · Silent Blade | Ch 2 | **Ch 14 "Xiao Tian's Dream"** | "Then I'll go with you, brother." | avg Lv 11 |
| **Ya'Xing** 亚星 · Steady Sailor | Ch 2 | **Ch 15 "Privacy"** *(confirmed by the author)* | Part of the expedition group from ch 15 | avg Lv 12 |
| **Muxue Yan** 慕雪岩 · Ancient Sage | Ch 17 | **Ch 30** *(planned)* | Appears and vanishes in ch 17; not joined as of comic 022. Planned arc: 028 crisis (Xiyu worsens, Dongyue finds the ritual deadline, goes to seek Yan), 029 "The Price of Love" (recruitment setup: Yan's ambitions, a negotiation or trial), 030 he agrees to travel with the party, motives unresolved. Scripts for 021+ are not in the game yet, so he is recruitable only via the Dev tab | avg Lv 24 |

A hero who joins starts at (party average level − 1).

## 2. Chapter level gates (Crimson-Tide-style `gate:{type:'level'}`)

The chapter stays locked until the **average level of the party** reaches `round(chapter × 0.8)`.
Gated chapters = every recruitment chapter, the one battle chapter, and the ch 20 milestone
(`GATE_CHAPTERS` / `GATE_RATIO` in `scripts/core.js`).

| Chapter | Gate | Reason |
|---|---|---|
| 11 A Quest | avg Lv 9 | Dongyue joins |
| 13 Goodbye Hanshan | avg Lv 10 | Battle: the Afflicting Imp (Dongyue + Xiao Tian + Ya'Xing) |
| 14 Xiao Tian's Dream | avg Lv 11 | Xiao Tian joins |
| 15 Privacy | avg Lv 12 | Ya'Xing joins |
| 20 A Deep Bond | avg Lv 16 | Milestone (the season continues past ch 20: art exists to at least comic 022) |
| 30 (planned) | avg Lv 24 | Muxue Yan joins. Not playable until scripts for 021–030 are added |

Story XP per chapter is `60 + 15·n`. A story-only player reaches ch 14 unaided and needs a few Wilds
fights to open ch 15 and ch 20. Tune `GATE_RATIO` (higher = stricter).

## 3. Skill level gates

Skills use `req:{lvl, flag?}` (`scripts/characters.js`). The cast-sheet skills are marked "cast sheet".

| Hero | Skills (level) |
|---|---|
| Xiyu | Fireball Blast 1 · Crimson Moon 3 · Illusion Veil 6 · Meteor Shower 10 · Blood Moon Surge 20 |
| Dongyue | Spirit Blade 1 · Healing Blessing 1 · Guardian Ward 4 · Restoration 9 · **Spirit Expulsion 8 + story (ch 13)** · **Soul Link 12 + story (ch 20)** · **Ancient Healing Rite 16 + story (ch 18)** |
| Xiao Tian | Flowing Strikes 1 · Heaven Step 4 · Counter Surge 8 · Lotus Burst 13 · Silent Edge 18 |
| Ya'Xing | Piercing Shot 1 · Binding Trap 4 · Eagle Eye 7 · Survival Instinct 12 · Knife Volley 16 |
| Yan | Ice Shard 1 · Frost Domain 16 · Sealing Chains 18 · Time Ward 22 · Celestial Art 26 |

Story flags: `imp_expelled` (ch 13), `ancient_rite` (ch 18), `soul_bond` (ch 20).

## 4. Wilds zones (gameplay, not story) and when they open
Muxue Forest ch 1 · Moonlit Stream ch 6 · Hidden Chambers ch 15 · Rift Waters ch 16 ·
Icy Mountain Steps ch 17 · Ice Temple ch 18 (boss: Frost Warden). Each matches a place in the script.

## Open questions for the author
1. **Scripts for comics 21+** — art exists to at least 022, but only 1–20 are scripted, so the game stops at ch 20.
2. **Muxue Yan** — planned ch 30; 028/029 details are unverified until I see their scripts. His late skills (Time Ward Lv 22, Celestial Art Lv 26) unlock soon after he joins at about Lv 23.
3. **Chinese names marked provisional** (萧天, 慕雪岩) — confirm.
4. Gate strictness (`GATE_RATIO` 0.8) and the amount of story XP are first-pass.
