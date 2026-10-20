# Companions: mission roles, personal quests, Xiao Tian

`scripts/personal.js`, shown in the **Confidants** tab. Xiao Tian is adapted from Yang Tian (Tribute) but has his own progression. Everything is a proposal built on page-confirmed facts; nothing links his leads to the seal.

## Mission roles (a proposed gameplay structure, not a claim every ability has appeared on a page)
| Companion | Function |
|---|---|
| Xiyu | Magical analysis: detects abnormal crimson energy and interference, decides whether dangerous magic should be touched |
| Dongyue | Healing and stabilization: stabilizes the injured and reads spiritual channels without disturbing a formation |
| Cangyuan | Formation analysis: Spirit Weaving to read patterns, compare records, manipulate structures when safe |
| Xining | Medical and historical support: recognizes symptoms, keeps the party functional, reads what a formation does to those caught in it |
| Xiao Tian | Fieldwork and tactical support: scouts, checks physical passages, protects the others, notices what spiritual-energy specialists overlook |

## Xiao Tian: The Lost Swordsman (opens at chapter 36 once he is in the party)
- Dongyue's sworn younger brother; amnesiac and childish now, formerly Feng Xia, a tough, mature swordsman. His strength does not return all at once, and recovering memories never replaces who he is now.
- **Two leads, tracked separately** (they appear once their hook has fired): the woman in grey who calls him "son" (hook from comic 014); avenging his master and martial brothers, **killed** by the iron-masked assassins (black, gold-trimmed, iron masks with golden buckles; killed over gold). No connection to the seal or between the leads is established.
- **Memory fragments:** the three the pages show (comic 036): the mountain practice, the masked invaders, the bull demons' torment. More are added to `XT_FRAGMENTS` only when a page shows a clue triggering recognition.
- **Field proficiency:** each 10 rewarded victories fought with him adds a rank (Green, Steady, Sharp, Seasoned, Veteran, Pathfinder); each rank gives +4% gold while he fights beside you.
- **Shared danger:** every 5 victories two companions fight together adds 1 trust and 1 understanding between them, up to the "Growing trust" stage (40).
- **Dongyue and Xiao Tian** start close (sworn brothers) and have two conversations (Dongyue asks about the woman in grey; Xiao Tian tells him about his master); the second opens after the first.

## Not built (roadmap)
Swordsmanship techniques restored by memory fragments (the Thousand Petals skill remains a level-30 placeholder); fieldwork checks inside investigations (comics 033 onward: he checks the physical perimeter and notices a recent disturbance, without knowing the magical answer; 034 his reaction to Cangyuan's memory gap; 035-036 a field threat where teamwork, not a sudden full recovery, wins; 037-038 a clue that reaches beyond Muxue and leaves his quest open for Volume 3).

## Settled (author)
Xiao Tian's master and martial brothers were **killed** (the hook `xiao_tian_master_and_brothers_killed` is right). The game text, fragments, leads and conversation follow that; the ch036 summary and the hook goal text were corrected from "missing master" / "locate his master".

## Named party synergies (author)
Dongyue + Xining (Healers in step, +6%), Dongyue + Xiao Tian (Sworn brothers, +5%), Dongyue + Xiyu (Friends, +2%, from chapter 70) apply to both when they fight in the same party. See `PAIR_SYN` in scripts/core.js. For the planned Dongyue/Xining separation see docs/VOLUME3_PLAN.md.

## Party rules (author): the canon party and seats
- **Canon party:** Xiyu, Cangyuan, Dongyue and Xining (the four protagonists). From chapter 53, when all four are in the party, they are **locked into the active party**: the Party sheet's "Remove" button is disabled with a reason. Xiyu has always been locked. "Unfieldable" is read here as *cannot be un-fielded*.
- **Seats:** 4 before the canon party forms; **7** afterwards (4 canon + 3 free seats for **Xiao Tian, Ya'Xing (after his arc) and the Miracle Healer**). A 7-ally battle fits the phone layout.
- **Arc-required heroes:** `ARC_REQUIRED` in scripts/core.js is a table of `{id, from, to, why}` rows; while the story is inside the range that hero cannot be removed either. It is empty now: add a row when an arc needs Xiao Tian or Ya'Xing present.
- **Away** (`G.away`) always wins: an away hero is never fielded, so the Yilong separation of Dongyue and Xining works with the lock.
- **Guests (planned, not built):** temporary extra seats in the Yilong arc for the **Miracle Healer's Student** and **Dongyue's grandfather**. They would not use a roster seat. Needs characters, skills and a guest-slot rule (a `G.guests` list shown beside the active party, removed when the arc ends).
- The **Miracle Healer** (Xining's master) is a planned permanent flex-seat hero, not built.

- **Hoko (Volume 4, planned):** a temporary story-required guest for the Ya'Xing retrieval mission at the Ice Temple, not a recruit. See docs/VOLUME4_PLAN.md.

## Su Liechen (苏烈尘): Volume 6 guest (built)

- Author's sheet: Demon Slayer / Tracker, independent, early-to-mid 20s, tall and lean; sword, capture chains, talismans, binding net; ice, restraint, sealing. Calm, observant, pragmatic, keeps his reasons private but cooperates when goals align. Quote: "Some truths should be captured, not destroyed."
- **Joins** when chapter 204 (Volume 6, comic 001; `VOL6_START`, `JOIN_CH`) is completed; **guest window** in `GUESTS` (core.js): `from:204`, `to:Infinity` until the author gives the arc's end chapter. Guests take an EXTRA seat (not a flex seat) and are fielded and locked while the window is open; after it closes he is "away" (still in the roster). Return in later arcs (e.g. Volume 8 at Yilong) and a possible extended-member role after Xining leaves the active party are planned, not built.
- **Skills** (all unlocked on joining): Frost Trace (strike, may slow) · Sealing Talismans (ranged bind) · Binding Net (longer bind) · Silent Veil (party DEF up and status ward; no field effect yet) · **Subdue, Not Slay** (unique: foe at 35% HP or below is captured alive and leaves the fight; bosses are only bound; captured foes' drops are rolled twice and +25% XP). Passive: Restraint (his bind and slow last one turn longer).
- Art: portrait `assets/party/suliechen.webp`, cast sheet `assets/cast/suliechen.webp` (Cast, from chapter 204). The sheet's pixel sprites and expressions are not used by the game.
- Nothing in the game text asserts his reasons. Not testable end to end until Volume 6 pages exist (tested with a dev jump to 204).
