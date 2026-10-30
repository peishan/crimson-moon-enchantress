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

## Party seats (author, Volume 4)
- Before chapter 53: 4 seats. Chapters 53-116: 7 (4 canon + 3 flex). **From Volume 4 (chapter 117): 6 seats** = the 4 protagonists + Xiao Tian + Ya'Xing (`FLEX_V4 = 2`). Guests (Su Liechen in Volume 6; Hoko planned as a temporary Volume 4 guest) take an extra seat on top, via `GUESTS`.
- Ya'Xing still counts as away until the story brings him back (`CH_AWAY`/`CH_BACK`); his seat is held for him. Hoko is not built yet (needs a class and skills; see VOLUME4_PLAN.md).

## Hoko (built, Volume 4 guest) and Ya'Xing's return (author)
- **Hoko:** Scout / Explorer, guest (extra seat). Joins when chapter 119 (V4 comic 003) completes; `GUESTS.hoko` window `to:Infinity` until the author gives the end of the Ice Temple arc. Skills (all unlocked on joining): Explorer's Strike, Mark the Weak Point (analyse + expose), Create an Opening (slow + strip, from the page quote), Scout's Lead (party speed + crits), Read the Mechanism (analyse + strip). Portrait is a crop from V4 comic 003 until the author supplies art (`assets/party/hoko.webp`).
- **Ya'Xing's return:** he stays away until **one game day of rest** has passed after the chapter where he is found (`YX_REST_CH = 140`, a placeholder for the rebuilt Volume 4). The day passes with the next chapter, or at once via the Party screen button "Let him rest a day" (it advances the story day by one, never real time). He then rejoins (`yaxing_rejoined`) in his new outfit (`assets/party/yaxing_new.webp`) and unlocks the sheet's skills: Swift Blade, Flowing Momentum, Mark of Insight, Sky Step (exploration use not built), Enduring Will (cleanse + status ward + defence). His sheet is in Cast. Update `YX_REST_CH` when the rebuilt Volume 4 settles where he is found.

## Party size and Su Liechen (author update)
- **No fixed party size.** Before the canon four travel together (chapter 53) there are 4 seats; after that there is no seat limit: whoever has joined by the comic chapters can be fielded (`activeSlots()`, `PARTY_CAP = null` in core.js; set `PARTY_CAP` to a number if the game gets too easy). The earlier 6-seat rule (Volume 4) is removed. Guests (Hoko) simply join and leave by chapter.
- **Su Liechen** is no longer a Volume 6 guest. He is **met briefly in Volume 4 comic 017 (chapter 133)**: his profile appears from that chapter (`INTRO_CH`), and he stays unjoinable ("becomes joinable when the party reaches Yilong"). Yilong, with the demon quelling/slaying/catching quests and Xining's childbirth, is where he becomes a permanent joinable member; the join chapter is not decided yet (add `suliechen:<chapter>` to `JOIN_CH` when it is). The later encounters between 017 and Yilong are not decided.

## Hoko's departure (author)
- No fixed exit chapter. Volume 5 continues in the Ice Temple and then the upper-floor **portal**; Hoko travels with the party until he finds a way back to Luiterra (probably through that portal). His guest window (`GUESTS.hoko`, `to: Infinity`) stays open until the author sets the chapter; set `to` to that chapter, and a goodbye scene can then be added (see VOLUME4_PLAN.md).

## Yan (晏), the Volume 6 watcher (author)
- Not playable in Volume 6; he travels with the party only in the story text ("temporary arrangement"). He becomes a **playable character in Volume 7**, and he is **not** the caretaker of Xiyu's base (author correction: that role goes to a Muxue extended-cast member the author will establish). The author will design his portrait and class. Not built; he is a different character from Muxue Yan (岩); his id will not be `yan` (already Muxue Yan's).

- **Yan (晏) built from the author's sheet** (`yanwatcher`): class **Wayfinder (机关行者)**, support/control/utility. Active skills: Mechanism Operation, Traverse, Structural Reinforcement, Terrain Manipulation, Field Reconnaissance, Precise Strike. Passives from the sheet (Route Planning, Wayfinder's Eye, Steady Presence, Companion's Path) are listed on his sheet but not built (story and exploration effects). **The sheet writes his name as 颜; the game uses 晏** (the author says 颜 is wrong). He is not recruitable yet (`JOIN_CH` unset: Volume 7). Portrait `assets/party/yanwatcher.webp` cropped from the sheet; the full sheet is in Cast from chapter 226.

## Update (author): Su Liechen and Volume 13
Su Liechen joins as a **guest in Volume 13**, during the demon-hunting arc (not at Yilong in Volume 12). Volume 13 has two main arcs: (1) clearing Dongyue's mother's name, and (2) the demon-hunting arc. Chapters not decided yet; no code added beyond the notes (add him to `GUESTS` when the chapter exists).
