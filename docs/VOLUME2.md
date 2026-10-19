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
