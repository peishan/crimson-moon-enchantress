# Bounties — *The Red Lantern Road* (Volume 2 comic 015 = chapter 54)

Author's script and gameplay note: `V2_015_BOUNTY_SCRIPT.md`. Code: `scripts/bounties.js`, enemies in `scripts/enemies.js`, battle rules in `scripts/battle.js`. A **Bounties** tab appears once chapter 53 (V2 comic 014, Xining joins) is complete (flag `red_lantern_bounty_available`).

## The story bounty (five steps, never replays)
| Step | Action | Needs |
|---|---|---|
| 1 | Accept from the eastern settlement noticeboard | Xining in the party (and Xiyu or Cangyuan) |
| 2 | Interview the survivor. Xining diagnoses him; she prepares **Cleansing Salt ×2** (her "cleansing powder") | Xining in the party |
| 3 | Inspect the ward: **Cangyuan's Spirit Weaving** or **Xiyu's crimson magic** (different text, same result) | Cangyuan in the party for his option |
| 4 | Fight **the Red Lantern Shadow + the Corrupted Anchor** (Xiyu, Dongyue, Cangyuan, Xining fight, as on the page) | – |
| 5 | Report back to the guard: gold, Frost Herb ×2, Imp Ash ×2, a little XP; completes chapter 54 and sets `red_lantern_road_cleared` | – |

Flags (as specified): `xining_recruited` and `red_lantern_bounty_available` set at ch 53; `corrupted_fragment_obtained` set when the shadow falls (item **Corrupted Fragment**, kept for later investigation); `red_lantern_road_cleared` only after reporting back.

**The shadow:** a layered enemy. Its outer layer halves all damage until stripped: by **Cleansing Salt** used on it (item menu), Xining's Physician's Insight, Cangyuan's Inverted Meridian, or it cracks on its own at round 3. **Spirit Drain** removes a quarter of a hero's MP; if it never lands, the **optional objective** is met and you get **Ward Silk ×1** at the report. (Test bot: won 20/20; clean 14/20 using salt vs 6/20 without.)

## Repeatable road bounties
After the story bounty is cleared, three small randomized "road disturbance" bounties appear each in-game day (gold about 40 + 3 per level, Frost Herb and Imp Ash, a 20% chance of Ward Silk, small XP). The survivor, the ward and the fragment scenes do not repeat. The day advances with story chapters and inn rests.

## Chapters 49–53 are placeholders
Volume 2 comics 010–014 are not written or uploaded. They exist as completable "(not written yet)" chapters so the story can reach 015. **Chapter 53 completion recruits Lu Xining** (author: she joins at comic 014) and opens the bounty board. Replace them when the scripts and art arrive.

## Continuity (from the author's note)
Xining's healing stays grounded in medicine (no automatic reversal of corruption: she can help the survivor recover but not restore what was taken). Xiyu and Cangyuan's closeness builds gradually (bond +5 on completion); Dongyue's attachment to Xining stays subtle: no romance mechanic exists. The chapter ends on an unknown voice: "They have begun to follow the trail."

## Gates
Chapters 53 and 54 are gated (average party level = chapter number, so about Lv 53 and 54).

## Open questions
1. Is the bounty meant to be accepted before or after reading comic 015? Both work: the story reader ends with "Open the bounty board", and the chapter is completed by reporting back.
2. Rewards are placeholders (gold, small XP, ordinary materials); tell me if you want specific crafting materials once a crafting list exists.
3. Comic 015 has no art yet; the reader shows the script text. Send the art when ready (`assets/comics/v2/ch15.png`).
