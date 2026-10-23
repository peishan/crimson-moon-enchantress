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

## Resolved: the Moonlit Bonding was removed (replaced by companion bonding)
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

## No world map for Volume 2: Seal & Sites tab
Author decision: Volume 2 has no map. The **🔎 Seal & Sites** tab (`scripts/seal.js`, opens at chapter 48) has: a small location schematic (Muxue Island, the sanctuary, clinic/inn, the Red Lantern settlement, the eastern boundary shrine, the abandoned shrine with the second sealed door); a seal diagram (three rings, hidden eye, black filament, the shrine mark, the second door and the added crimson markings), with solid lines for confirmed connections and dotted lines for unresolved ones; and an investigation tracker (clues found / still unresolved). It is driven by story hooks and draws only what the pages have shown. **The second anchor, the keeper and the relay are not drawn** until they appear on a page; add them in `seal.js` (SITES, LINKS, `sealSvg`, TRACK_FOUND, TRACK_OPEN) when comics 025-032 arrive.

## Final decisions (settled)
- **Three records are kept separate:** gameplay availability, narrative canon, and future plans. Generated art alone never overrides an approved script.
- **Inverted Meridian:** gameplay availability stays at **level 48**, unchanged. Narrative introduction: **not confirmed on comics 019-022**. First confirmed story use or explanation: **to be verified from comic 023 onward**; if 023/024 depicts it, record that as its narrative debut. The player may own the skill before that scene.
- **Clue Journal (built):** the Seal & Sites tab now holds a Clue Journal for The Broken Ward Network (umbrella quest), with stages (**Detect**, **Investigate**) and 16 page-confirmed clues grouped as formation / records / people, each tagged with its comic, plus the open questions. It records discoveries and quest states only: no formation-inspection or controlled-intervention puzzle yet. Stages for **locating the anchors, restoring the channels, tracing the relay and the missing interval** stay roadmap until their comics are integrated (add to `STAGES` and `CLUES` in `scripts/seal.js`; restoration is recorded complete only after it happens in the game).
- **Comic 031 enchantment (hidden consequence):** two layers. (1) Hidden story state: when written in, comic 031 sets `xiyu_enchanted_dongyue` (no UI, no relationship effect); Dongyue's memory uncertainty from comic 032 is preserved and he is not given knowledge he has not recovered. (2) The trust consequence applies only when Dongyue learns the truth: setting the flag `dongyue_learned_of_enchantment` applies the Xiyu-Dongyue trust/understanding hit through `REL_FLAG` in `scripts/relations.js` (once). Xiyu's act is a serious mistake with consequences, not proof of malice. Companion bonding stays voluntary (the Moonlit Bonding is gone). Chapters 70-71 are not in the game yet; nothing is wired until they are.
- **Canon status:** page-confirmed = comics 001-022 as uploaded (only Arc 4's name; page 016 says "Arc 3" unnamed). Document-only or roadmap = the other arc names, comics 023-038 content, the two anchors, relay, keeper, and the comic 031-032 events.
- **Numbering:** Volume 2 is 38 planned comics, game chapters 40-77. Comic 022 = chapter 61 (last integrated); 023 = 62; 031 "Then, What About Him?" = 70; 032 "The Face He Could Not Remember" = 71; 038 (planned finale) = 77. `LAST_CHAPTER` stays 61 until those comics are added.

## Volume 2 complete: comics 023-039 (chapters 62-78)
**Volume 2 is 39 comics** (game chapters 40-78; comic n = chapter 39+n). `LAST_CHAPTER` is 78. Arc labels now page-confirmed: Arc 4 "The Silence After the Spell" (019-024), Arc 5 "Two People on Opposite Shores" (025-032), "Final Arc" (033-038), "Finale" (039). Titles: 023 After the Kiss, 024 The Price Behind the Seal, 025 The Door They Refused to Open, 026 The Keeper's Price, 027 Where the Two Shores Meet, 028 The Space We Choose, 029 The Eye That Never Sleeps, 030 The Truth at the Relay, 031 Then, What About Him?, 032 The Face He Could Not Remember, 033 A Trace Beneath the Silence, 034 The Mark Beneath the Dust, 035 The Fragment That Remembers, 036 The Flow That Was Stolen, 037 The Choice Beneath the Mountain, 038 The Destination Beyond the Wall, 039 Beneath the Crimson Moon.
- **Two versions of 035:** the taller upload ("The Fragment That Remembers", 886x1775) was installed; the 1024x1536 version has garbled caption lettering ("Tor tad first time", "I think ie have").
- **Inverted Meridian:** first named in story on **comic 023** (the forbidden method's principle "resembles the Inverted Meridian", the technique Cangyuan buried and refused to let anyone use). Gameplay unlock stays at level 48.
- **Merged site:** the "eastern boundary shrine" and the "abandoned shrine with the second door" are one place (the map on comic 029 labels it "Eastern Shrine (Sealed Chamber)"). The western anchor is a pavilion across the island (027).
- **Investigation:** anchors located and channels restored (027), relay traced (030), the missing interval is open; the Final Arc (033-038) follows the redirected flow to a chamber beneath the mountain, ends with the chamber closed but steadied and the destination unknown. Not solved: it carries into Volume 3.
- **Comics 031-032:** Xiyu tells Dongyue the truth and casts the enchantment (hidden flag `xiyu_enchanted_dongyue`); Dongyue cannot remember the night (`dongyue_night_unresolved`). The trust consequence still applies only when he learns (`dongyue_learned_of_enchantment`, no chapter yet). Xining's account leaves it unresolved; no pregnancy is written in the game (the author's Volume 3 plan is in docs/VOLUME3_PLAN.md).
- **End of Volume 2 (039): the relationship option.** Completing chapter 78 sets `xiyu_chooses_cangyuan` and `relationship_option_unlocked`, which opens **relationship bonding with Cangyuan** (Crimson Thread Resonance, voluntary, once a day). **Xiyu has no relationship bonding option with Dongyue: he stays a friend, crewmate and ally** (flag `dongyue_friend_and_ally`; the Bonds panel and Confidants tab say so; their affection is no longer shown from chapter 70). Not a soul bond or marriage.
- **Art:** the standalone illustration of Xiyu and Cangyuan under the crimson moon is installed as `assets/events/relationship_cangyuan.webp`. **Assumption:** used both as the Volume 2 completion picture (shown on completing chapter 78, kept in Cast) and as the picture after each relationship bonding session. Swap if it was meant for something else.
- **Xiao Tian** is in the party for 033-038 (scouting, tracks, the dark object, dragged marks, guarding the passage); those are recorded as 🍃 fieldwork clues.

## Finale order and party synergy (author)
- **The Volume 2 splash plays first, then the relationship option unlocks.** Completing chapter 78 (from the story reader or the Journal) opens the finale splash; closing it runs `relationshipUnlock()` (sets `xiyu_chooses_cangyuan` and `relationship_option_unlocked`) and then shows the chapter result. If a player leaves during the splash, the Journal's chapter 78 page offers "View the splash". The same splash-first flow now applies to Volume 1's cover (no unlock there).
- **Party synergy (stat bonuses when allies fight together)**, applied at battle start (`synergyOf` in core.js):
  - **Comradeship:** each ally you trust gives +1% / +2% / +3% to ATK, MAG, DEF and SPD at trust 40 / 60 / 80, capped at +5%.
  - **Bond of Choice:** after the relationship option opens, Xiyu and Cangyuan both get +4% plus 2% per Crimson Thread Resonance level (up to +14%) when they fight in the same party. Shown on the Bonds panel and in the battle log.

## Volume 3 begins: "The Roots of What Remains" (author uploaded the cover and comics 001-007 and 009)
- **Numbering:** `VOL3_START = 79`; comic n = chapter 78+n (001 = 79). `LAST_CHAPTER` is 87. Art lives in `assets/comics/v3/chNN.webp` (the Pages workflow converts v3 too). **Comic 008 (chapter 86) is not uploaded**: it is a placeholder chapter that can be completed so the story can reach 009.
- **Cover:** installed as `assets/volume3_cover.webp` (title "The Long Awaited Love Is Not a Dream: Crimson Moon's Enchantress", "Volume 3, The Roots of What Remains"; tagline "A deeper truth. A shared path. A future still unwritten."; "Secrets Unveil, Hearts Endure, and the Past Refuses to Stay Silent."). Per the rule that volume covers show when a volume is COMPLETED, it is not shown yet; add it to `VOLUME_COVERS` and the Cast sheets when Volume 3's last chapter is known.
- **Chapters:** 79 After the Crimson Moon, 80 The Things Left Unsaid, 81 A Disturbance Returns, 82 The Familiar Trace, 83 A Memory Without a Name, 84 The Road Beyond the Ruins, 85 The Wound Beneath the Formation, (86 pending), 87 Fragments That Still Speak. Comics 001-002 are Xiyu and Cangyuan (the mutual understanding; "don't decide for me"); 003-009 return to the ruins with the whole party and follow the redirected flow's network.
- **Xiao Tian:** three new memory fragments (a sound and a buckle; the corridor and someone falling; hands, a blade and possibly his master) and he says he wants to find out what happened to his **master and martial brothers** (consistent with the killed decision). The pages echo the golden buckles of the masked invaders but do not link them; the game does not either.
- **Yilong** is first named as a place with useful records (comic 006), "a possibility, not the next destination".
- Journal clues and hooks added (433 hooks total).

## Volume 3 comics 010-016 (chapters 88-94)
Installed: 010 The Mark Beneath the Silence, 011 The Third Channel, 012 The Residue That Remained, 013 The Name Beneath the Silence, 014 The Craftsman's Mark, 015 The Page That Was Torn Away, 016 The Estate of Forgotten Things. `LAST_CHAPTER` is 94. **Comic 008 (chapter 86) was uploaded later and replaced the placeholder.**
- The investigation moves off the ruins: the fragment is shown to a craftsman at the **Songxia workshop** (014), a workshop ledger with an almost identical pattern has its source page **missing** (015), and an **estate** inventory points to a **mountain repository** (016): "a direction, at least". Nothing names a culprit, a motive or a maker. Two new sites on the Seal & Sites schematic (workshop, estate) are dotted (leads, not proven to share a cause). The mountain repository is not drawn until it is visited.
- Xiao Tian: seven more memory fragments (watch the shoulder; protecting someone or escaping; a click and a hand on his wrist; "your feet tell me"; "the blade follows the hand"; "a tool tells you what it can do"; "the sword protects the road"). The faces stay blurred; "his master" is only suggested.
- Journal now has 88 clues; hooks total 463.

## Volume 3 comics 008, 017 and 018 (chapters 86, 95, 96)
- **008 "The Quiet Between Heartbeats"** (chapter 86) installed, replacing the placeholder: Xiyu and Cangyuan on familiarity and certainty; Xining and Dongyue ("let someone notice you, too"); a memory in Xiao Tian's hands; the same branching pattern, older than the damage. It overlaps in dialogue with comic 009 (both have "Then let someone notice you, too" and "You said 'suggests'"); the game records both as pages show them.
- **017 "Two Roads in the Records"** (95): two repositories, the first a scholarly archive, the second dismantled instruments from abandoned sites; the second is more relevant, and the first question is whether it still exists.
- **018 "The Repository That Should Be Empty"** (96): the second repository's rusted latch, disturbed dust, a track across the threshold and an empty instrument case (a clean rectangle in the dust). Xiao Tian recalls a blade and a wrist and fears he did something terrible. Still no name, no proof it belongs to the hand that altered the formation.
- `LAST_CHAPTER` is 96; 93 clues, 478 hooks. A "Second repository (abandoned)" site was added (dotted).
- **Page 017 typo:** one caption reads "genealogies, and cultivation histories" doubled over in the first panel (art-only).

## Volume 3 comics 019-033 (chapters 97-111)
`LAST_CHAPTER` is 111; 108 journal clues; 564 hooks. Titles: 019 Traces in the Dust, 020 The Ones Who Knew, 021 What Was Taken, 022 A Name Almost Remembered, 023 The Things We Carry, 024 The Records That Remained, 025 The Clerk Who Remained, 026 Shadows on the Next Road, 027 The Seal in Pieces, 028 The Man Who Looked Away, 029 The Account No One Claimed, 030 A Name Behind the Orders, 031 The Name on the Page, 032 The Face in the Rain, 033 The One Who Stayed.
- **Two versions of 021:** the second upload was installed. The first mislabels the characters (a "Cangyuan" caption sits under a green-robed figure drawn like Xiao Tian) and states that the objects "weren't misplaced, someone removed them", where the second keeps the cautious line (they may have taken something, or searched for something already missing).
- **The story turns Xiao Tian-centred:** the repository trail (caretaker, storehouse, clerk, supplier, account book, intermediary) follows the redirected deliveries; each memory fragment sits beside a witness. Xiao Tian hears a voice call "Feng—!" (019) and the name "Feng…" hovers (022): the player already knows he is Feng Xia (ch36), but he has **not** recovered his name in the game (no flag set). 021: the party agrees he decides what they investigate and when they stop.
- **A name on the orders:** the characters on comic 030/031 read 顧雲舟. **I read this as "Gu Yunzhou": please confirm the romanisation** (the page shows only the characters). It appears on redirected orders and a second record places "the named intermediary" at a meeting with someone whose name was deliberately omitted (blank mark, torn seal). Not linked to anyone yet; not linked to the iron-masked assassins, the seal formation or Xiao Tian's master.
- **032-033:** Xiao Tian dreams of a masked figure, a blade and a hand seizing his wrist in the rain; the hand was trying to stop him moving forward (protecting, restraining or something else: unknown). The game does not tie the masked figure to the iron-masked assassins of ch36.
- **Page issues (art only, nothing changed):** comic 026 repeats comic 025's clerk scene panel for panel with a new opening and closing caption (the game records it as a repeat; swap if one was a mistake); 025 has a label reading "Dino Tian"; on 033 Xiao Tian is drawn with long hair and red ribbons like Cangyuan (his usual short hair is elsewhere); 019's header says "Game Chapter 97" etc. match the game's numbering.
- **Not built:** no new map sites (the village, supplier's shop and docks are not drawn); the Seal & Sites journal gains a "repository trail" category and stage.

## Volume 3 comics 034-038 (chapters 112-116): Xiao Tian recovers the name Feng Xia
`LAST_CHAPTER` is 116; 586 hooks. 034 The Stance He Knew, 035 The Words He Left Behind, 036 The Sound of Laughter, 037 The Place Beside Him, 038 The Name He Can Carry.
- **Comic 038 is a milestone:** Xiao Tian says the name "Feng Xia" aloud and it no longer feels like a stranger's. Chapter 116 sets the flag `xiao_tian_name_recovered` and hook `xiao_tian_recovers_the_name_feng_xia`. **This is the name only**: the face, place and people remain in mist, and he is still the Xiao Tian he is now (his panel says so). The player has known the name since chapter 36; this is the character recovering it. His in-game name stays "Xiao Tian" until you say otherwise.
- The arc is warmth, not fear: a warm memory (a training yard, laughter, proud and safe), a spar with Dongyue where his body answers before he thinks, and "a name can open the door to the past without deciding who must walk through it". Dongyue and Xining are his supports (relationship points added). The records trail waits: "no one has identified who ordered the redirected deliveries, and no evidence yet connects the repository to Xiao Tian's past" (comics 035-038 repeat this).
- Xiao Tian wears black with red ribbons in 034 (as in 033) and green from 035 on; read as wardrobe changes.

## Volume 3 complete; Volume 4 begins (comics 001-006 = chapters 117-122)
- **Volume 3 is 38 comics (chapters 79-116)**: Volume 4 starting confirms its end, so **chapter 116 now plays the Volume 3 cover splash on completion** (`VOLUME_COVERS[116]`, `assets/volume3_cover.webp`, kept in Cast as "Volume 3 Cover" from chapter 116) and sets `volume3_complete`. Nothing unlocks after it. If Volume 3 was meant to run longer, tell me.
- **Volume 4:** `VOL4_START = 117`; comic n = chapter 116+n; art in `assets/comics/v4/` (the Pages workflow converts it too); `LAST_CHAPTER` is 122. The volume has no title yet (the journal heading reads "Volume 4").
- **Chapters:** 117 The Empty Room, 118 The Choice to Follow, 119 The Trail in the Snow, 120 The Truth He Never Told Her, 121 The Hidden Threshold, 122 The Stairway into Silence. A month after Xiao Tian recovered the name Feng Xia, **Yan leaves a letter and goes to the Ice Temple alone ("Do not follow me")**; Xiyu follows with Dongyue, Cangyuan, Xining and Xiao Tian, tracks his faint trail, recalls seeing him maintain the ancient seal at the sanctuary (he never told her the whole truth), finds a concealment formation that hides a stairway, and reaches the Ice Temple's open, unguarded courtyard.
- **Seal & Sites journal:** a new category "Yan's trail" (7 clues; two are Xiao Tian fieldwork 🍃), questions ("What must Yan face at the Ice Temple, and why alone?", "What was Yan fighting at the sanctuary?") and a stage "Follow Yan to the Ice Temple". The Ice Temple is not drawn on the Muxue schematic (it is far from the island); the **Temple tab still shows Volume 1's rooms**, not new Volume 4 content.
- **Comic 002 repeats comic 001's scene** (the letter, "That is precisely why I'm going") with a new opening and closing and the preparations; recorded as a repeat, like 025/026. The re-sent 036-038 pages match the installed ones, so nothing was replaced.
- **Page notes (art only):** speaker labels are missing on several 001-006 bubbles, so attributions in the summaries follow who is drawn speaking (the fur-coated dark-haired figure as Cangyuan); the Ice Temple "two thousand years" line is new.
- **Heads-up:** story XP keeps the player at roughly level (chapters done + 1), so the party is about level 120 by chapter 122. Enemy scaling copes, but the numbers look odd; say if you want a pacing change for later volumes.

## Volume 4 comics 007-028 (chapters 123-144): the Ice Temple and Ya'Xing
`LAST_CHAPTER` is 144; 720 hooks; 141 journal clues. **Comics 013 (chapter 129) and 018 (chapter 134) are not uploaded: placeholder chapters stand in** (flagged "script pending", completable) until the author redownloads them.
Titles: 007 Those Who Remained, 008 The Promise They Kept, 009 The Man Who Survived, 010 The Name He Heard, 011 The Seal That Remembers, 012 Beneath the Frozen Steps, 014 Footsteps Beyond the Ice, 015 The Mechanism Beneath the Frost, 016 The Answer of Three Knocks, 017 The Seal Opens Inward, 019 The Trail Below, 020 The Voice Behind the Door, 021 The Hand Beneath the Ice, 022 The Seal's True Purpose, 023 The Door That Would Not Yield, 024 A Hand Reaches Back, 025 A Room Without Chains, 026 The Senior Commander's Decision, 027 The Truth Beneath His Treatment, 028 The Formation Beneath the Room.
- **The Ice Temple arc.** Guardians (white and blue, two thousand years of duty) let Xiyu's party rest but keep the inner chambers closed; they know Yan returned but not what he intends. **Hoko is alive** (Yan's people brought him back; he does not know if it is protection or imprisonment; the white key "was meant to open a way out") and **has heard Yan's followers repeat the name Ya'Xing**. A younger-and-strong trace leads the party down a hidden staircase and past a door that dims for Xiyu ("recognition was not permission"), to a sealed passage with a knocking signal, a mechanism, and someone alive behind it.
- **Ya'Xing is found (comic 024)**, weak but well cared for, in a comfortable private room kept shut by a doorway formation; ship hardware (a fitting and a sea knot on his wrist) was how he kept the door from closing. The senior commander ordered the restriction ("the only responsible choice"), admits good intentions are not proof, and lifts it (026). **Ya'Xing can leave when his companions judge the journey safe and when he chooses, but the game keeps him "away" (not in the party)** until his arc ends (author); chapter 140 updates his status text only.
- **Unresolved at 028:** the senior commander is withholding something; the medicine has a residue that is not from any herb; Ya'Xing felt "something inside had gone quiet"; two formations lie under his room (upper stabilises, lower drains), the lower far more active than the younger commander ever saw; and "something beneath us has just responded". The game does not say what the formation is for, or whether it healed or suppressed him.
- **Hoko** appears with the party in the art from comic 014 (blond, white-gold coat) and fashions the brace from the ship fitting. This is the Ya'Xing retrieval mission of docs/VOLUME4_PLAN.md: he is still a story-required temporary guest and **not built as a guest seat yet**; Yan's stance (why his men protect Hoko) is still not stated on any page.
- **New in the art:** the younger guard commander (014+) and the senior commander (026+); the journal intro lists them. Xiao Tian wears green with a headband in 014-028.
- **Page notes (art only, nothing changed):** typos "pur duty" (008), "eee what the temple" (010), "how io opens" (017); no speaker labels, so speakers in 010-012 follow the content (the game text is neutral where it cannot tell: in 010-011 the dark-haired figure in a fur coat is drawn without Cangyuan's red straps); 014-025 headers have no "Game Chapter" number, 026-028 do (142-144, matching).
- **Seal & Sites journal:** a new category "Inside the Ice Temple" (19 clues), stages "Find Ya'Xing" (done) and "Understand the formation beneath Ya'Xing's room" (open), and five new open questions.

### Update: comics 013 and 018 received
013 "The Presence in the Ice" (chapter 129) and 018 "The Chamber Beyond" (chapter 134) replace the placeholders; **no placeholders remain in Volume 4** (733 hooks, 146 clues). 013: the energy flows *away* from the sealed chamber, Hoko says he never came this far on his first escape (the bubble is unlabelled; the game attributes it to him because he is with the party and the line fits his history), and a human-shaped shadow crosses an archway (a person, an illusion or a remnant of the formation: unknown). 018: the glacier chamber beyond the seal (chains tied to the chamber itself, an impression in the frost, residue that does not belong to the seal, a ship-rigging fitting) and the scrape that leads to the smaller door of comic 019. Hoko is with the party from at least 013, so he joins by then.

## Volume 4, comics 029-039 (chapters 145-155)

Installed as `assets/comics/v4/ch29-ch39.webp` (ch34 added later). Ice Temple investigation continues beneath Ya'Xing's room.

- 145 The Chamber Beneath the Ice · 146 The Name Beyond the Gate · 147 The Pulse Beneath the Seal · 148 Following the Third Pulse · 149 What the Stone Remembered
- 150 The Pattern in the Archive (comic 034, supplied afterwards; replaced the placeholder). Library fragment of the older formation with missing sections; the added red line is not part of the original design.
- 151 The Voice in the Stone · 152 The Laboratory of Frost · 153 The Choice of the Keeper · 154 The Trail That Continues · 155 The Courtyard Beneath the Snow
- `LAST_CHAPTER` is now 155; 776 hooks; 17 new temple clues, 5 new questions, a new stage "Trace the pulse to its source".
- Kept open on purpose (the pages do not answer): who added the second layer (keeper or someone else), whether Yan knew of it, what the voice is, why the gate flickers for Xiyu (bloodline/affinity/role unknown), where the pavilion diagram went, whether Ya'Xing's condition relates to the disturbance.
- Page notes: speakers mostly unlabelled; Ya'Xing speaks from the guest room (031/032/038); Hoko is not clearly identified in 029-039.
- Author note: Hoko is the blond traveller in the white and yellow outfit. Speaker attribution on the pages is still left unlabelled in game text unless a page names the speaker.

## Volume 4, comics 040-052 (chapters 156-168)

Installed as `assets/comics/v4/ch40-ch50.webp` and `ch52.webp`. Comic 051 (chapter 167) was supplied afterwards and replaced the placeholder.

- 156 The Missing Diagram · 157 Traces of Another Search · 158 The Secondary Archive · 159 The Inventory That Remained · 160 The Watchman's Account · 161 Before the Restriction · 162 The Records That Overlap · 163 The First Point · 164 A Quiet Place to Rest (Xiyu and Cangyuan) · 165 The Barrier Below · 166 The Measure of the Seal · 167 The Record Beneath the Record (lower channel in the original diagram, missing from the later copy) · 168 The First Disturbance
- Key facts kept open: who took the diagram (someone else is searching); whether Yan caused, found or tried to contain the first disturbance; first disturbance Year 463, later diagram Year 472; the lower seal is managing an imbalance whose source is hidden; the watchman cannot swear the restriction order came from Yan.
- 164 gives Cangyuan bond +3 and a relationship nudge for Xiyu and Cangyuan.
- New stages: "Find who searched the archives before us", "Find the former custodians' records".
- Page note: the 052 closing caption has a typo ("the camme before").

## End of Volume 4 (chapter 168)

- Volume 4 ends at comic 052 (chapter 168). Cover installed as `assets/volume4_cover.webp` (shown as a splash on completing chapter 168 and kept in Cast). Tagline: lost records, sealed passages, hidden truths and the people who remain.
- Volume 4 investigation map `assets/maps/ice_temple_v4.webp` is shown in the Ice Temple tab from chapter 117 above the Volume 1 map. New labels on it (Commanders' Quarters, Guest Chambers, Followers' Quarters, Xining's Chamber, Ya'Xing's Room, Ao Yun's Resting Place, Sealed Central Chamber) are not yet room entries in `temple.js`.
- Author: Volume 5 continues the seal investigation; an Interlude continues Ya'Xing's recovery. Volume 4 sets him at about 50% (flag `yaxing_recovery_half`, hook `ya_xing_recovery_at_half`). Nothing mechanical changes yet.
- Service worker cache bumped to v9.

## Training after Volume 4 (gameplay, not story)

Two Wilds zones open at chapter 117, for a party staying in the Ice Temple:
- **Ice Temple · Commanders' Trial Ground** (`trial`): the temple guard's drill yard. Hunts against sparring constructs, ward sentinels and frost stalkers; a **Trial Round** button runs the arena's two horned beasts, +1 foe level per round cleared (cap 12; `G.trial`) with a gold bonus.
- **The Xuancang Slopes** (`slopes`): wolves, snowfield rams, ridge yetis and ice golems outdoors, a short walk from the temple.
- New enemies: Sparring Construct, Snowfield Ram, Ridge Yeti. Five new Quest Board contracts (drill partners, drill sweep, rams, ridge giant, slopes patrol).
- No lore claim is made about the disturbance causing any of these.

## Volume 5 begins: The Ice Temple: The Truth Left Behind (comics 002-019 = chapters 170-187)

- `VOL5_START = 169`; comic n = chapter 168+n; art in `assets/comics/v5/` (the Pages workflow converts it). `LAST_CHAPTER = 187`.
- Comics 001 and 013 were supplied afterwards and replaced the placeholders.
- Comic 015 was supplied in two versions; the cleaner layout (with the separate "Arc Completion" box) was installed.
- Arcs on the pages: Arc 1 The Records We Inherited (to 005, complete) · Arc 2 Those Who Remembered (006-015, complete at 015) · Arc 3 What the Seal Protects (from 016, in progress). Flags `volume5_arc1_complete`, `volume5_arc2_complete`.
- Chapters: 170 The Former Custodian · 171 The Empty Quarters · 172 The Transfer Ledger · 173 The Last Inventory · 174 The Personnel Register · 175 The Outer Administrative Wing · 176 The Departure Record · 177 The Handover File · 178 The Receiving Clerk · 179 The Senior Staff · 180 The Administrative Catalogue · 182 Secondary Storage · 183 The Exception Register · 184 The Unmatched Record · 185 The Reviewer's Notes · 186 The Reviewer's Trail · 187 The Outer Records Office.
- 15 new clues (category "Records and inscriptions"), 4 new questions, 2 new stages ("Find the missing account", "Trace the unmatched record").
- Nothing is established about what the missing account contains or whether it concerns Yan; the pages say so repeatedly and the game text does too.
- **Page issues for the author:** (1) comic 017's signature reads 蘇承遠 while comic 018 names the reviewer from File B as "Li Wen", and the initials in 016 are "L.H." and "S.W."; the game follows the dialogue ("Li Wen") and records the initials as unconfirmed. (2) The party has four members in these pages (Xiao Tian and Hoko are not shown).
- Cast: the author's Volume 4 Main Cast sheet (the square version with combat-style text, matching the game's classes) was installed in Cast from chapter 117. The alternate sheet lists Xiao Tian as "Young Disciple / Sword Adept, versatile support", which differs from the game's Martial Artist / Striker; not installed, awaiting the author.

## Volume 5 complete (comics 020-025 = chapters 188-193)

- Volume 5 is 25 comics; chapter 193 ends the main story (flags `volume5_complete`, `arc3_part1_complete`). `LAST_CHAPTER = 193`.
- 188 The Receiving Record · 189 The Supplementary List · 190 The Record That Remains · 191 What the Record Can Prove · 192 The Choice Beneath the Ice · 193 The Truth Left Behind (Finale). New main objective: **Find Yan**. Next on the author's list: the Ya'Xing and Xiyu-Cangyuan Interludes (not built).
- Volume 5 cover supplied later; splash fires at chapter 193 (see below).
- **Author edits received (comics 016, 018, 023, 025 re-supplied):** the reviewer is now **Su Chengyuan (蘇承遠)**, initials L.H. and S.C.Y.; Year 463 matches Volume 4; Yan's annotation is Year 475 (after the Year 472 diagram); comic 025 now says when Yan read the record relative to his departure is unknown. The game text follows these.
- **Still to fix on the author's side:** comic 019 and the comic 017 dialogue still call the reviewer "Li Wen" (019: "I remember Li Wen", "Li Wen"); comic 017 may need checking. Typos: 025 "OR-3T" and "the crine incomplete"; 023 "thaat", "Butiat"; 018 "reorganiaation"; 016 "Raim:"; 013 "itr"; 002 garbled bubble; V4 052 "camme". 025's Arc Progress says "The records trail has resolved Yan's motives" (probably "has not resolved"). The "Year of Frost Moon" (001) and Years 2/3/12 in the registers are a separate, relative system.

- **Re-supplied 025 and 019 (second pass):** both installed. 025's Arc Progress now reads "has not resolved Yan's motives" (fixed). 019 now says Su Chengyuan (蘇承遠). Remaining on 019: the batch number still reads "OR-3T" on the Transfer Record (the game uses OR-37, as on 020-021), and the Chapter Conclusion's last lines are garbled text ("The clerk remembers the former reviewereabouts. The surviving index to a prying plar cunsfer"). 025 now has a trailing tidy page; its "Yan consulted a record..." line matches the game.

- **Third pass (002, 018, 023, 025 re-supplied, installed):** 002 garbled bubble now reads "Recognize that name?" (one glyph looks malformed). Remaining on 018: Key Discoveries "aarlier reorganization", Conclusion "are they find the reviewer" (should be "can they find"). 023: Conclusion "thhat". 025: Final Discoveries "consuiled" (one glyph). Still open elsewhere: 013 "itr", 016 "Raim:", 019 "OR-3T" and garbled Conclusion tail, V4 052 "camme".

- **Volume 5 cover installed** (`assets/volume5_cover.webp`, splash on completing chapter 193, kept in Cast). Tagline: "Four travelers. One journey. Countless secrets." / "Hidden in the past, the truth stirs again."
- **Volume 4 comic 052 re-supplied** (new layout with Year 463 / Year 472 captions) and installed.
- **016 and 013 re-sent unchanged** (still "Raim:" and "itr"); not reinstalled. **019 re-sent is the OLDER version** (says "Li Wen", conclusion text clean, OR-37 correct); NOT installed, so the installed 019 (Su Chengyuan, but with "OR-3T" and a garbled conclusion tail) stays. Regenerate 019 with the name Su Chengyuan and OR-37 together.

- **013 and 016 re-supplied and installed:** 013's "itr" is now "it"; 016's "Raim:" is now "Remark:" (the remark field is blank). Text matches the game. 019 (the "Su Chengyuan" version with the Outer Realm entry) was NOT installed: it conflicts with 018 and 020 (see above); the earlier 019 stays.

- **019 re-supplied again and installed (final):** "The Outer Records Office", Batch OR-37, Year 3 3rd month, reviewer Su Chengyuan, next comic 020. Game text for chapter 187 and its hooks/clue rewritten to match (an older official says only transfer summaries are kept; the earlier "damaged Temporary Storage Index" and the clerk who remembers Su Chengyuan are no longer shown). One small thing: chapter 018 says the party goes to the records office "near the outer grounds", while 019 labels it "Outer Records Office (Eastern Wing)"; and 019's page does not mention older catalogues stored there in Year 2 (018 does).

- **019 final-final installed** ("Outer Records Office · Near the Outer Grounds"; Year 2 older catalogues restored; location matches 018). Chapter 187 text/hooks aligned. This resolves the 018/019 mismatches noted before. 019's transfer record says "From: Outer Records Office"; 020 says the same: consistent.

## Volume 5 Interludes (chapters 194-199)

- Side stories after the finale: **Ya'Xing Interlude** (chapters 194-198, art `assets/comics/i1/`, his cover in Cast) and **Xiyu & Cangyuan Interlude** (from chapter 199, art `assets/comics/i2/`; only chapter 001 supplied so far). `LAST_CHAPTER = 199`; helpers `interOf`, `YX_START`, `XC_START`.
- Ya'Xing: 194 Before He Remembered · 195 Passed from Hand to Hand · 196 The Price of Freedom · 197 The Man Who Offered Him Work · 198 The Young Master's Offer ("Young Master Dong", the white-haired traveller, is read as Dongyue).
- Xiyu & Cangyuan: 199 The Family That Raised Her.
- **Inconsistencies for the author:** (1) 199: Xiyu is told "you are the last of our family's bloodline" by the family that raised her, with a man and woman who seem to be her parents; the game elsewhere has Yan as her father and the missing family history. Are these Yan and her mother, or other guardians? (2) Ya'Xing 194/195: the green-robed man who sits with him is never named, and the page does not say who he is; the game does not name him either. (3) 198 never names the white-haired traveller beyond "Young Master Dong": this is assumed to be Dongyue, but Dongyue's ship-handler hire is not mentioned elsewhere.

- **Xiyu & Cangyuan Interlude complete (chapters 199-203; 200 The Boy Who Left Home · 201 The Years They Grew Together · 202 The Things We Never Asked · 203 The Love We Choose).** Cover in Cast. `LAST_CHAPTER = 203`. This closes Volume 5.
- **Inconsistencies for the author:** (1) The cover and 203 name **Shen Ruyue** as Cangyuan's first love (the 201 companion), while the game's seal journal already has the open question "What was Shen Ruyue to the place that built this?" from Volume 2 (her name on the sanctuary record). Same person, or a namesake? (2) **Xu Hanshan** (203) is a new name: the page has Xiyu say he was important to her and left, which is not in earlier volumes; the cover pairs him with Dongyue and Ruyue as people from the pasts. (3) The speaker of the first lines in 203 is only implied; the game follows the reading that Xiyu names Xu Hanshan.

- Author: the green-robed traveller with Ya'Xing in the Interlude (194-195) is **Xiao Tian**; text and chapter casts updated. The other Interlude questions are answered earlier in the book and are dropped.

## Volume 3 comics 012-018 revised (author): chapters 90-96 replaced; three battles added

- The author revised V3 012-018 to remove the document chain (craftsman, workshop ledger, estate sale, two repositories, abandoned repository) and make it a magic/melee arc: standing-stone formation, manifestations, a library record, a guardian construct, restoring the component. New titles: 012 The Residue That Remained · 013 The Formation Stirs · 014 The Awakening · 015 The Page That Was Torn Away · 016 Guiding the Inner Circle · 017 The Guardian's Challenge · 018 What the Repository Kept.
- **Battles (chapters 91, 92, 95):** Formation Manifestation (013), Manifestation + Awakened Manifestation (014), Estate Guardian (017, layered: strip the plating). Chapters complete on winning. New enemies in enemies.js.
- Old hooks, journal clues and Xiao Tian memory fragments for 90-96 removed; three new Xiao Tian fragments (012 stance, 017 combat movement, 018 watch the opening).
- **Inconsistencies for the author:** (1) V3 019-038 (chapters 97-116) still follow the OLD chain: an abandoned repository with disturbed dust, a caretaker near the estate, an old storehouse, the repository's missing objects. The new 018 ends with the formation restored and "leave the deeper mysteries", so 019 needs a bridge or regeneration. (2) Order: 014 ends mid-battle with "we stabilise the inner circle" and 016 continues that, but 015 (library) sits between them; either 015 goes after 016 or 016 after 014. (3) Comic 014's title says "Ice Temple" but the scene is the standing stones. (4) 018's title says "the Repository" but the pages show the estate and the formation, no repository.

## Volume 3 comics 014, 015, 018 re-supplied; 019 and 020 revised (chapters 92, 93, 96, 97, 98)

- 014 now "The Standing Stones Awaken", 015 and 018 ("The Formation Restored") updated; **019 "Echoes After the Battle"** and **020 "A Quiet Question"** are new camp scenes centred on Xiao Tian's memory (a master's voice, a boy running and falling, his fear of who he was). They replace the old caretaker and abandoned-repository chapters 97-98; the old hooks, clues and the caretaker lead are removed.
- Author is redrafting/shortening comics 021-038 (chapters 99-116). Until they arrive those chapters still carry the old content (estate/storehouse/record-keeper chain).
- Page note: the camp scenes use an Xiyu who is drawn with a dark-red hairstyle in 019/020; the 014 cast now shows Xining with green flowers and Cangyuan with a different outfit than 012-013 (outfits vary; not treated as errors).

- **Volume 3 comics 021-023 revised (chapters 99-101):** "Not a Puzzle", "A Name Almost Remembered" (the name Feng), "The Things We Carry". Camp scenes on Xiao Tian's memory; the old repository/storehouse content for these chapters removed (old hooks/clues dropped, two new Xiao Tian fragments). Chapters 102-116 are still the old content until the author's redraft arrives.

## Volume 3 revised and shortened: ends at comic 029 (chapter 107)

- The author's revised Volume 3 is **29 comics** (was 38). Comics 024-029 installed as chapters 102-107: 024 A Stance Remembered · 025 The Weight of the Blade · 026 The First Clean Movement · 027 The Name He Can Carry (**Feng Xia recovered**) · 028 More Than a Name · 029 A Step Forward (end of Volume 3; the cover splash now fires at chapter 107).
- **Old comics 030-038 (chapters 108-116) are removed**, along with their hooks, journal clues, Xiao Tian fragments and relationship nudges. Chapter numbers 108-116 stay reserved as hidden stubs (`removed:true`) so Volume 4 keeps its numbering (comic n = chapter 116+n). Completing chapter 107 jumps the story position to 116, so the next chapter is 117 (Volume 4 comic 001). Old saves sitting inside 108-115 are moved to 116 on load. The flags `xiao_tian_name_recovered` and `volume3_complete` now fire at 105 and 107.
- Xiao Tian's story bond points moved: +10 at 105, +20 at 107. New Xiao Tian fragments (A Stance Remembered, The Correction Not the Man, The First Clean Movement, More Than a Name).
- Fixed: five Volume 4 open questions had been stored in the clue list instead of the question list.
- Author: Volume 4 is next to be rebuilt. If Volume 4 is shortened, its chapter numbers (and Volume 5 and later) can be renumbered at that point.

## Volume 4 rebuild begins (author): comics 002-006 replaced (chapters 118-122)

- New: 002 The Changed Guard (the guards ask for confirmation; Yan has not returned; the four former commanders are away; an injured young man is being treated) · 003 The Injured Stranger (the masked guard, Hoko, Ya'Xing seen near the eastern wing) · 004 The Path Beneath the Ice · 005 The Corridor That Moved · 006 The First Guardian (**battle**: Ice Temple Guardian, a new boss unlike the Volume 3 Estate Guardian; a symbol feels familiar to Xiyu).
- Comic 001 (chapter 117) is unchanged. The old trail, camp, hidden threshold and stairway chapters are gone, with their hooks and clues; no new journal clues were added (one open question: the symbol).
- Chapters 123-168 are still the old Volume 4 content. They conflict with the new opening: Hoko and the temple guards are now introduced here, and Ya'Xing is already reported injured in the temple, so the old 007-028 (Those Who Remained, the pillar mechanism, finding Ya'Xing) needs the author's redraft.
- **Volume 4 cast sheet replaced** with the author's five-character sheet (adds Xiao Tian, "later revealed as Feng Xia"). Its class labels are flavour text that differ from the game's (Dongyue "Cursed Explorer / Celestial Immortal", Xiao Tian "Young Disciple / Sword Adept", Xiyu "Witch / Eclipse Mage"); the game's class names are unchanged.

## Ice Temple lower level map (author, Volume 4)
- Map `assets/maps/ice_temple_lower_v4.webp` (shown first in the Ice Temple map view from chapter 118) and a new **Lower Level (Volume 4)** list in the Ice Temple tab: 1 Temple Entrance · 2 Guardian Hall (first guardian) · 3 Sealed Passage · 4 Main Corridor · 5 Upper Staircase (next level) · 6 Inner Library (Xining's scripture; Muxue inscription) · 7 Hidden Switch · 8 Treasure Vault (equipment, Skyshard) · Portal (upper floor; location unknown).
- Rules: main route entrance > guardian hall > sealed passage > main corridor > upper staircase; the library branches off the main corridor to the hidden vault. The maze and the tormentors' location are not mapped.
- Unlock chapters are placeholders (118 entrance, 122 guardian hall to staircase, 124 library, 130 switch and vault) and match the equipment placeholders; they move when the rebuilt arc settles. The upper-floor portal is unscheduled (`unlock:null`).

## Volume 4 rebuilt to 25 comics: comics 007-014 installed (chapters 123-130)

- **Volume 4 is now 25 comics (chapters 117-141); 25 is the standard length for later volumes.** The old comics 007-052 are removed (chapters 142-168 kept as hidden stubs so Volume 5 and later keep their numbers; completing chapter 141 jumps the story to 168, then Volume 5 starts at 169; old saves inside 142-167 move to 168). Comics 015-025 (chapters 131-141) are flagged placeholders (`pending:true`) until uploaded. If you want the later volumes renumbered to be contiguous, say so and I will do it in one pass.
- Installed: 007 The Sealed Passage · 008 Beyond the Guardian (**battle**: two Ward Sentinels, from "I'll clear the smaller sentinels") · 009 A Familiar Voice · 010 The Hidden Chamber (**Ya'Xing found**, chained) · 011 A Place to Rest (new power, magic resistance; rejoins after one game day, so he returns when chapter 127 completes) · 012 The Questions They Left Behind (suppression weapon, lotus symbol) · 013 The Hidden Path (inner library: Xining's scriptures, the Muxue inscription about an upper-floor portal, the hidden switch) · 014 The Treasure Vault (vault gear and Skyshard).
- Gear now arrives at chapters 129 (Healer's Scripture) and 130 (vault); lower-level map rooms unlock at 123 (sealed passage), 129 (library, switch, portal inscription) and 130 (vault). The Volume 4 cover splash and the `volume4_complete` flag move to chapter 141. Ya'Xing's rest-day trigger is chapter 126.
- The old investigation clues, questions and stages for chapters 123-168 (formation beneath the room, ledgers, pavilion, archive) are removed with their hooks, relationship nudges and bond points. No new clues were added for 123-130; only story hooks.
- Page notes: comic 012 is labelled before 013 in the upload order, installed by number. In 009 and 010 the cloth bears a lotus symbol (the captors' group); 010 has Xiao Tian say someone came "after we left Yilong", which the game text keeps.

## Volume 4 roadmap (author)
Target 25 comics (chapters 117-141); Volume 5 is not planned yet but also keeps to 25.
- **Arc 1 Arrival and Ya'Xing's Rescue, 001-011** (generated): 001-003 arrival, new guards, Hoko; 004-008 exploration and guardians; 009-010 finding Ya'Xing and the interrogation; 011 recovery, new magic, resistance.
- **Arc 2 Library and Treasure Vault, 012-014** (generated; **013 needs regeneration**).
- **Arc 3 The Upper Maze, 015-020:** 015 The Stairway Above (generated, not yet supplied) · 016 Into the Maze (Hoko studies the shifting paths) · 017 Beasts of the Labyrinth (**Su Liechen's first, brief appearance** hunting a spiritual beast; his capture-versus-killing philosophy and arc are for later, likely Volume 6; he does not join through the portal) · 018 The Minotaur's Domain (**boss: Maze Minotaur**, placeholder stats) · 019 The Lost Intruders (Ya'Xing's tormentors found trapped) · 020 Mercy or Judgment.
- **Arc 4 The Maze's Secret, 021-025:** 021 The Price of Mercy (intruders disarmed, handed to the commanders) · 022 The Sealed Chamber (what the intruders sought) · 023 The Missing Commanders (clues toward Yan and the four original commanders) · 024 The Upper Portal (Xiyu's heritage reveals its purpose) · 025 Beyond the Ice Temple (the party prepares to enter the next world).
- Chapters 131-141 now carry these titles as planned placeholders (completable). The Hoko exit and portal fit 024-025; Su Liechen's profile appears at 017 (chapter 133).

## Volume 4 complete: comics 015-025 (chapters 131-141)
- Installed from the author's pages: 015 The Stairway Above (regenerated) · 016 Into the Maze · 017 Beasts of the Labyrinth (**battle**: Frenzied Spirit Beast; Su Liechen's first appearance) · 018 The Minotaur's Domain (**battle**: Maze Minotaur) · 019 The Lost Intruders · 020 Mercy or Judgment (**battle**: two frenzied beasts; the intruders captured) · 021 The Price of Mercy · 022 The Sealed Chamber · 023 The Missing Commanders · 024 The Portal's Price (title on the page; roadmap said The Upper Portal) · 025 Beyond the Ice Temple (the party crosses the portal; **Su Liechen stays behind** to guard the temple; per the author he is responsible for sending the intruders to the commanders for punishment, which the pages only imply).
- Volume 4 cover splash and `volume4_complete` fire at chapter 141; flag `portal_crossed`. Temple map gains the Upper Maze, Sealed Chamber and Commanders' Chamber.
- **Inconsistency for the author:** the existing Volume 5 (chapters 169-193, the records trail inside the Ice Temple) no longer follows from this ending: the party now leaves the Ice Temple through the portal into an unfamiliar world, and Hoko and Ya'Xing travel with them. Volume 5 is yet to be planned (25 comics); the old content stays until replaced.
- Page notes: 015's title card reads "Chapter 15" and later pages "Chapter 024"/"Chapter 025"; Su Liechen's sheet details (capture philosophy) are not shown beyond 017 and 018.

## Volume 5 plan (author)
- The story is "sped up": **Volume 5 takes place in a different realm** (the world beyond the Ice Temple portal). Its 25 chapters are not generated yet; they will replace the old records-trail Volume 5 (chapters 169-193, which stay in the game until the new pages arrive). The **Ya'Xing and Xiyu & Cangyuan Interludes (chapters 194-203) stay in Volume 5**. Hoko, Ya'Xing and the rest of the party travel through the portal; Su Liechen stays at the Ice Temple.

## Volume 5 rebuilt in another realm (author): comics 001, 003-018, 020, 021 installed (chapters 169, 171-186, 188, 189)
- The old records-trail Volume 5 (chapters 169-193) is removed: chapters, hooks, clues, stages, questions and relationship nudges. New 25-comic Volume 5 occupies chapters 169-193; the Interludes (194-203) are unchanged.
- **Not uploaded yet (flagged placeholders):** comic 002 (chapter 170), 019 (187), 022-025 (190-193). The Volume 5 cover splash still fires at 193.
- Chapters: 169 A World Beyond the Gate · 171 Hoko's Decision (Hoko joins until he finds a way back to Luiterra) · 172 The Laws Have Changed · 173 Footprints in the Ruins · 174 The Trail That Vanished · 175 The Silent Waystation · 176 Skyshard's Echo · 177 The Mark of the Past · 178 Traces Beneath the Ice · 179 Beyond the Northern Gate · 180 The Hall of Returning Voices · 181 The Map Beneath the Stone · 182 The Guardian Stirs · 183 The Path Awakens · 184 The Guardian's Core · 185 A Blade Against the Seal · 186 The Fourfold Formation (**battle**: Waystation Guardian, layered; comics 014-018 are one fight on the pages) · 188 Someone Was Here · 189 The Map Beneath the Dust.
- No journal clues were added (investigation-lite, per the author); only story hooks.
- **Inconsistencies for the author:** (1) In comics 014 and 016 the "Dongyue" panels show a dark-haired, blue-ribbon character (looks like Ya'Xing) instead of white-haired Dongyue; Xiao Tian is drawn with a red scarf and dark hair in 014-015. (2) Comic 018's symbols (mountain, bird, dragon/serpent, lotus) differ slightly from 016's. (3) 001 says the portal vanishes; 003 says there is no direct way back, but Hoko "joins" although he had already travelled with them since Volume 4: the game keeps his guest status and treats 003 as his decision to stay until a way back is found.

## Volume 5 comics 002, 019, 023-030 installed (chapters 170, 187, 191-198): Volume 5 is now 30 comics

- **Volume 5 now runs to comic 030 = chapter 198 (30 comics, over the 25 standard).** To fit, the Interludes were moved: **Ya'Xing Interlude = chapters 199-203, Xiyu & Cangyuan Interlude = 204-208, Volume 6 starts at chapter 209, `LAST_CHAPTER = 208`.** The Volume 5 cover splash now fires at chapter 198 (comic 030); move it if the real finale is elsewhere.
- Still missing: comic 022 (chapter 190, placeholder). Installed: 002 Seven Paths, One Missing Group · 019 The Commanders' Mark · 023 The Four Who Came Before · 024 The Price of Opening the Way · 025 The Unclaimed Seat · 026 The Echo in Skyshard · 027 Beneath the Five Seats · 028 The Record of Five · 029 The Mark That Answers · 030 The Door Below the World ("The four may return. The fifth must choose.").
- Comics 014, 016 and 018 are being redone by the author (the 014/015 appearance of Dongyue and Xiao Tian is treated as a wardrobe change); installed pages stay until replaced.
- **Inconsistency for the author:** these pages return to a heavy "records / fifth seat" mystery: erased records, damaged inscriptions, a prophecy, and the fifth position, with several chapters ending on "we don't know yet". That is the investigation style the author asked to move away from; consider adding battles, a witness or a reveal in the next comics.

- **Volume 5 comics 014 and 016 re-supplied and installed** (Dongyue is white-haired again; Xiao Tian in teal). The re-supplied "Commanders' Mark" page is installed as comic 019 (same content), but its title card reads "Chapter 018" and 014's reads "Comic 014": the author will fix. Comic 018 (The Fourfold Formation) has not been re-supplied.

- **Volume 5 comic 022 installed (chapter 190, "The Passage That Should Not Exist")**: the last gap in 001-030 is filled.
- Volume 5 comic 018 re-supplied and installed (title card reads "Chomac 018": a small typo for the author).

## Volume 6 begins: "The Unknown World" (comics 001-005 = chapters 209-213)
- Art `assets/comics/v6/ch01-05.webp`; `LAST_CHAPTER = 213`. Volume 6 continues straight from Volume 5 comic 030 (the door below the world). 209 A Quiet Morning (calm; Xiyu and Cangyuan, Xining's mixtures, Ya'Xing and Xiao Tian spar, Hoko at peace) · 210 The Door That Would Not Open · 211 The Path Beneath the Seal · 212 Records of the Four (east wind, south flame, west currents, north stillness; a fifth position removed) · 213 Footsteps in the Dust (a cloaked figure on a misty bridge; the mechanism has moved).
- The comics headers read "Chapter 001-005"; the volume's title on the pages is "The Unknown World". Waiting on the author's cover and the rest of Volume 6. Su Liechen is not built into Volume 6 yet (he stays at the Ice Temple per Volume 4).
- Note for the author: 211-212 again lean on damaged tablets and erased records; the cloaked figure in 213 may be where the pace picks up.

## Volume 6 comics 006-014 installed (chapters 214-222)
- 214 The Hidden Pattern · 215 The Hall of Converging Paths · 216 Echoes Beneath the Stone · 217 The Fifth Door · 218 The Side Passage · 219 The Missing Record · 220 Beneath the Archive · 221 The Wall That Answers · 222 The Watcher's Trace. `LAST_CHAPTER = 222`. Xiao Tian's fleeting memories (a doorway, a hand reaching for a sealed object) recur in 214, 219-220.
- **Inconsistency for the author:** comic 006 (and 007-008) names the four insignias "North Mountain, South Flame, East Dragon, West Bird", but Volume 5 and Volume 6 comics 001-004 name them by direction with a crescent (north), flame (south), compass star (east) and spiral (west) on the pillars, and an earlier door mark of mountain/phoenix/dragon/flame. The game text uses the names on each page and does not reconcile them. Xiyu's outfit and the title-banner moon glyph also change on these pages (treated as wardrobe).
- Pace note: 006-014 are again mostly exploration, with one watcher and a stair; a fight, a witness or a reveal would help.

## Volume 6 comics 008, 009, 010 revised; comic 015 added (chapters 216-218, 223)
- Revised: 008 Echoes Beneath the Stone, 009 The Fifth Door (Xiao Tian touches the central symbol), **010 now "The Hidden Passage"** (a downward side passage with etched diagrams; replaces "The Side Passage"). New comic 015 The Bridge of Silent Bells installed as chapter **223** (appended; the comics 011-014 slots, chapters 219-222, still hold the old pages).
- **Inconsistency for the author:** old 011-014 (chapters 219-222: the missing tablet, the stair, the wall that answers, the watcher) now conflict with revised 010 (the party enters a hidden passage and heads down) and with 015 (the party reaches a chasm bridge). The author is replacing these next; until then chapter 222 ends with the watcher on a chasm bridge and chapter 223 (015) follows it, which reads naturally enough, but 219-221 repeat the stair/archive beats. Chapters 219-222 will be swapped when the new 011-014 arrive.
