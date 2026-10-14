# Review of the consolidated chapter hooks (docs/CHAPTER_HOOKS.md) against the scripts and the game

Checked against `GAME_ADAPTATION_SCRIPT.md` (001–020), `GAME_ADAPTATION_SCRIPT_021-039.md`, the comic art, and the author's confirmations.
The hook file is now built into the game (`tools/build_hooks.py` → `scripts/hooks.js`): 200 hooks, 59 still provisional, 20 added by the corrections below.
Events fire once and never replay; states persist and can be checked with `hook('id')`. Each chapter's hooks show in its Journal detail view.

## Where the hook file is right or useful
- 005, 006, 013, 014 (Xiao Tian joins), 015, 016, 019, 021, 022, 028, 029, 033, 034, 037, 038, 039 match the scripts.
- It names chapters the scripts could not: **031 The Ritual Chamber, 032 Embracing Her Feelings, 035 Gratification, 036 Xiao Tian's Memories**. These (the first ritual phase, Minami in person, the second phase, the wedding, the misty woman, Xiao Tian's memories) are in no approved script. They are in the game as provisional outlines only.
- 035's wedding explains 039's "I'm your husband".
- Its titles for 002–004 and 007–016, 018, 027 were "to confirm". The scripts and art now settle them: 002 The Intruders of Muxue · 003 The First Encounter · 004 Welcome to Muxue · 007 The Intruder · 008 I Don't Need a Husband · 009 Who Is Hanshan? · 010 Helping Hanshan on a Condition · 011 A Quest · 012 Entering Her Private Chambers · 013 Goodbye Hanshan · 014 Xiao Tian's Dream · 015 Privacy · 016 The Gates of Muxue Have Opened · 018 A Risk Only for Her · 027 The Glass Casket. Its open-source checklist items for those chapters can be closed.

## Corrections applied (script wins)
| Ch | Hook file says | Script / author says | Applied |
|---|---|---|---|
| 007 | "stream_confrontation_aftermath", vague | Her spells pass harmlessly around Dongyue; he offers his robe; first kiss (art) | added `xiyu_magic_cannot_touch_dongyue`, `dongyue_offers_robe`, `xiyu_dongyue_first_kiss` |
| 008 | vague | Dongyue confesses; dagger threat; a kiss means a marriage pledge in Yilong | added three hooks |
| 015 | no hook for Ya'Xing | Ya'Xing joins (author-confirmed) | added `ya_xing_joins_party` |
| 018 | no mention of the temple appearing | The Ice Temple appears around them | added `ice_temple_appears`, `ice_temple_entered` |
| 020 | — | Xiyu can feel his emotions | added `xiyu_feels_dongyue_emotions` |
| 023 | `ice_library_discovered` | The library is found in **024** (Xiao Tian finds the book in it) | moved to 024 |
| 026 | "teleportation event / party location changed" (provisional) | White-robed group flees from Xiyu; glass enclosure; **Hoko of Luiterra** rescued; platform unlocked with a white key | replaced with script hooks |
| 027 | "Title to Confirm" | The Glass Casket: new chamber, Dongyue heals her hand, coloured blossoms, "Yun'er" | added script hooks; casket hook kept provisional |
| 035, 039 | same id `xiyu_questions_yan_motives` used for a one-time event and a persistent state | would collide, so the event would never fire the state | ch39's renamed `xiyu_doubts_about_yan_persist` |

Also fixed in the game, not the hook file: I had given the party a **White Key** item at 026. The script has **Hoko** unlock the platform, so the item is removed.

## Changes to game state from the hook file
- **Ritual completes at ch32** (second phase completed, health restored), not 33 as I had inferred. Still provisional. The countdown is 14 (ch22) → 11 (23–24) → 7 (28).

## Unresolved conflicts (need the author)
1. **"Her father"** — resolved by the author: Xiyu was frozen in time and raised by people who believed they were her parents but were her descendants, so she is *supposed* to be a descendant but is not. Kept out of the game (spoiler); see `STORY_NOTES.md`. Also confirmed: Muxue Yan is her father and she is Muxue Yunxi.
2. **Who recovers from the bull-demon experiments?** — resolved by the author (from the ch036 comic page): **both** were experimented on. Xiao Tian: memories begin returning, persistent pain, itching, venom allergies, difficulty walking and speaking, involuntary laughter. Ya'Xing: more severely hurt, extensive bandaging over his lower body, difficulty walking, physical and mental recovery. Hence ch39: Ya'Xing stays to recover, Xiao Tian goes home with Xiyu and Dongyue. Added hooks `ya_xing_bull_demon_injuries_revealed`, `ya_xing_recovery_incomplete` (036) and `ya_xing_recovery_continues`, `xiao_tian_returns_with_party` (039).
3. *(closed)* Xiao Tian's condition in 036 vs the ch39 portal walk: part of his arc, his injuries are less severe than Ya'Xing's.
4. **Minami "appears in person" (031)** and "Minami's visit" (036). No script. The conventions say not to explain it; the game does not.
5. **Provisional hooks** (59): everything in 025, 030, 031, 032, 035, 036 and the flagged ones elsewhere. The hook file's own recovery checklist still applies to 025–027, 030–032, 034 and 038.
