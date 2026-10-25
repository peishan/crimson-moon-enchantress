# Volume 8: puppetry thread connected to Ruyue (planning notes)

Working notes only; nothing here is built. Volume 8 is still being planned by the author.

**Direction (author):** Ruyue does NOT appear in Volume 8. Volume 8 carries a puppetry storyline that is connected to her (a suggestion still being considered). She is being kept as a later-arc antagonist so the intrigue builds. So V8 should only hint at her, never show or confirm her.

## Canon recorded from the author
- **Xu Hanshan** is Xiyu's first love and, implicitly, her first sexual experience. The story never says so on the page. Xiyu was therefore not chaste at the start of Volume 1; this is background, not something the game states or shows.
- Hanshan appears in Volume 1 (chapters 1 and 8-13, as her companion of seven years who left, then desperate for help for his wife Wang Xi'er) and is named in the Xiyu & Cangyuan Interlude. Ruyue and Hanshan both appear in the interludes (Ruyue as Cangyuan's first love, Hanshan as Xiyu's).
- The interludes pair them: each of the couple has a first love they lost.

## Puppetry (author's definition)
In this wuxia/xianxia universe, puppetry means using **paper puppets**, shaped into the likeness of people, **to mislead others** (decoys and doubles, not strings and marionettes).

Ideas that fit what the game already has (all optional, none confirmed):
- **Volume 7 is not linked to Volume 8.** The intermediary, the master's letter and the V7 hooks belong to Xiao Tian's own thread and are a much later Xiao Tian identity chapter; do not tie them to the puppetry or to Ruyue in V8.
- **The altered record and the shrine voice** (V2): someone who knows the original technique; could be the same craft.
- **Gameplay hooks:** a paper effigy enemy that looks like a person (reuse the existing "layered" outer layer, stripped by Cleansing Salt or Cangyuan's weaving), and Xiyu and Cangyuan's Crimson Thread awareness spotting "a severe disturbance" in a decoy. A fight where the party must tell the double from the person fits the "witnesses and battles" preference.
- **Ruyue stays offstage:** the craft is hinted, never attributed to her in V8.

## What the game already has about Ruyue
- V2 comic 018 (chapter 57): the name Shen Ruyue carved beneath the first pattern at the abandoned shrine; Cangyuan remembers a woman beside him in an ancient cultivation hall and says the hard part is remembering what he believed about her; the record there was deliberately altered; a voice says "Cangyuan. You took your time coming home."
- Interlude (chapters 204-208): Ruyue named as his first love, Xu Hanshan named as Xiyu's.
- Seal journal open questions: what was Shen Ruyue to the place that built this; what did Cangyuan leave behind; who altered the record; who is the keeper behind the second door; did the keeper ever agree to bear it.
- Flags held false: `ruyue_identity_confirmed`, `second_door_open`.

## Gaps to settle for Volume 8
0. Puppetry: nothing in the game mentions puppets, strings or puppeteers yet, so the motif is new. Decide what the puppetry is (a technique, a sect craft, controlled people or constructs), and how it ties to Ruyue's craft or the altered shrine record, without naming her.
1. Ruyue is absent from Volumes 3-7 and stays absent from V8: only hints, via Cangyuan's reactions, an object or a technique that echoes the shrine.
2. Keep `ruyue_identity_confirmed` false through V8. Whether the Ruyue on the shrine record is the same Ruyue as the interlude (earlier "same person or a namesake?" note was left open).
3. Who spoke at the shrine ("You took your time coming home"), and whether it is the second-door keeper.
4. Why Cangyuan left his sect, and what he left behind (the departure record).
5. Who altered the record and whether they are tied to Ruyue.
6. How Ruyue's story mirrors or contrasts with Xiyu and Hanshan, and how it tests Xiyu and Cangyuan's bond of choice.
7. Build needs: Ruyue cast sheet, portrait and class; the sect or hometown location; Cangyuan's personal page and any unlocks.
8. Tribute comparison: needs the Tribute material from the author.

## Comparison with the Tribute system repo (peishan/tribute-game)
Tribute is the system this game was adapted from. It has ~60 scripts; Crimson Moon has about 25. These Tribute systems have **no counterpart** in Crimson Moon (checked by search): skill trees and bond trees, evolutions, auto-battle, skirmish mode, echo rematches, deeds, chronicle, banter/overheard/moments, local regard and reputation, standing and judgments, whisper ledger, timed events, passages, homes/estates/residents, daily/AFK rewards, material codex, growth abilities, world map and travel, register marks, route reconstruction.

Fit for a Volume 8 puppetry/Ruyue storyline, without clue investigation (the author does not want it):
- **Homes, estates, residents (base.js, estates.js, residents.js):** the natural model for Xiyu's base, which Xiao Yan is meant to look after. Still unbuilt.
- **Banter, overheard, moments (banter.js, overheard.js):** quiet party exchanges, romance and comic relief, no puzzles. Good for Xiyu and Cangyuan scenes and for keeping the party warm while a darker thread grows.
- **Timed events (timed.js):** letters or visits that arrive as game days pass; a way to deliver puppetry hints without a chapter.
- **Standing and judgments (standing.js), local regard (regard.js):** how witnesses and places judge the party's choices; fits the "witnesses" the author prefers.
- **Area corruption (corruption.js):** a meter for a puppet-tainted area; could model puppet influence without an investigation.
- **Chronicle (chronicle.js), deeds (deeds.js):** low-risk recognition; no balance impact.
- **Growth, skill trees, bond trees, evolutions:** the biggest gameplay-depth gap for magic and melee, if the author wants more build choice.
- **Echo rematches, skirmish, auto-battle:** repeatable-fight quality of life.

Not recommended (they are investigation systems): archive records and dossiers (archive.js), register marks (regmarks.js), route reconstruction (routes.js), historical evidence (sunken.js), whisper leads (whispers.js).

Tribute has no Ruyue or puppetry content (searched for "ruyue" and "puppet": no hits).

## Paper puppetry timing (author)
Paper puppetry arrives from comic 018 onward in Volume 8 (comics 019+). Comics 001-018 show only wood-and-metal constructs driven by a spiritual thread; nothing in them contradicts paper figures appearing next. Keep Ruyue unnamed and offstage; keep Volume 7 hooks separate.
- Game-side plan for when the pages arrive: a paper-effigy enemy (layered outer shell stripped by Cleansing Salt or Cangyuan's weaving; Xiyu and Cangyuan's Crimson Thread awareness can flag it as a disturbance), written in the chapter text first because the text leads.
