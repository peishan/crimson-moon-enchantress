# Level curve — Volume 1 (39 comic chapters)

## Target
Volume 1 ends at comic 39. Story XP is tuned so a player who **only reads the story** is level **1 + chapters completed**, i.e. about **Lv 40** when Volume 1 ends.
`STORY_PACE = 1` in `scripts/core.js` (levels per chapter). Story XP per chapter is `storyXp(n)` (63 at ch 1, 960 at ch 20, about 2,700 at ch 39).
All 39 chapters exist; 21–39 are text-only until their art is added.

## Levels vary by class
The same XP gives different levels per class (XP tables from Tribute, `XP_TABLES` / `XP_CLASS` in `core.js`):

| Hero | Class curve | Effect |
|---|---|---|
| Xiao Tian | fighter | levels fastest (about +1 over the pace by ch 39) |
| Xiyu | standard | on pace |
| Ya'Xing | ranger | slightly ahead of standard |
| Dongyue | support | about 2 levels behind |
| Muxue Yan | scholar | slowest (about 2 behind) |

Simulated story-only play to ch 39: Xiyu 40, Xiao Tian 41, Ya'Xing about 40, Dongyue 38, Yan 38.

## Muxue Yan: higher start, or "prestiged"?
Volume 1 does not recruit him (scripts 021–039: he stays at the Ice Temple, and Ya'Xing stays with him), so nothing is applied yet.
**Recommendation for when he does join: at the party's average level**, with his own skills gated higher.
- A higher start would make him a free carry the moment he is recruited and wastes the recruitment arc.
- A reset to level 1 would leave him far below the party and not useful for a long time.
- Joining at the average gives the "prestiged" feel: his ancient power returns as the party levels. Frost Domain 28, Sealing Chains 31, Time Ward 34, Celestial Art 38.
- It is already wired: `JOIN_LEVEL_OFFSET = { yan:0 }` in `scripts/core.js` (set `yan:-1` to match the others, or `yan:3` for a head start).

## Gates
Reach an average party level equal to the chapter number at ch 11, 13, 14, 15, 20 and 39 (the finale). See `CHAPTER_GATES.md`.

## Enemy scaling (so Lv 1–40 all stay a fight)
Heroes grow faster than a straight line, so enemy stats steepen: HP `1 + .12d + .003d²`, attack `1 + .12d + .004d²`, DEF `1 + .13d` (d = level − 1), XP and gold follow HP.
Wilds foes are the party's average level plus a zone offset (0 to +2). Simulated with a simple auto-player, a four-hero party (no items):

| Zone tier | Zones | Win rate Lv 10–40 | HP left |
|---|---|---|---|
| Easy | Forest, Stream, Chambers, Rift | 100% | 70–90% |
| Medium | Icy Steps, Ice Temple L1 | 85–100% | 40–60% |
| Hard | Ice Temple L2 maze, L3 underground | 45–95% | 25–45% |

## Ice Temple (map: `assets/maps/ice_temple.webp`)
Three levels from the author's map: Level 1 Upper Temple (15 places), Level 2 Sealed Maze (6), Level 3 Underground Chamber (5). Room names are the map labels only.
Rooms are found as the scripts reach them: entrance, corridor and the Xiyu & Dongyue chamber (ch 18), Ice Library (24), frozen maze (26), casket chamber / Ao Yun's Resting Place (27, provisional), Audience Hall as the Red Assembly Hall (34, provisional), hidden passage and Enchanted Bath Chamber (37), departure portal (39). The rest stay "not scheduled".
Level 2 and 3 hunting zones (Horned Beasts arena, traps, mimics) are gameplay filler: Level 2 opens after ch 26 (provisional), Level 3 is unscheduled.
