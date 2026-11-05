# Quest Board & Bounty Board (general gameplay)

`scripts/board.js`, tab **📋 Quest Board** (opens after chapter 5, `BOARD_OPEN_CH`) plus a 📋 quest log in the top bar. Adapted from Tribute (contract board, 2-day bounty board) and Crimson Tide (quest tracker panel). It is **independent of the story**: it never advances a chapter, sets a story flag, or touches the story bounty (Red Lantern Road, Bounties tab) or the investigations. All numbers are provisional.

## Quest Board (contracts)
- 4 contracts are posted each game day (`G.day`; only chapters and "Ask around" pass days; resting passes hours). Accept up to 5 (`MAX_CONTRACTS`).
- Kinds: **kill** (defeat N of an enemy), **sweep** (win N Wilds fights in a zone), **collect** (turn in N items at the board).
- Each needs its zone to be open; rewards (XP, gold, renown, sometimes a Moonlit Tonic) scale with the party's level when posted.
- Progress comes from any rewarded victory (Wilds, the repeatable road bounties, story battles). Kill and sweep contracts pay out automatically; collect contracts need a turn-in.
- **Renown** tiers: Newcomer, Known (40), Trusted (120), Respected (260), Renowned (450). Higher tiers post harder contracts and add 5% gold per tier.

## Bounty Board
- 5 targets from the zones you can enter, refreshed every 2 days. Cull = 2-4 normal foes, Wanted = one elite. No acceptance: hunt the target and it pays out (XP, gold, renown).

## Quest log
The 📋 button (top bar, once the board is open) lists accepted contracts, bounties in progress and, for convenience, the story bounty and investigation when active.

## Save and tuning
`G.board = {active, list:{day,items}, bounties:{day,list}, done, renown}`. Contract templates are in `CONTRACTS` (add new ones there; `tier` = minimum renown tier). To tune rewards change the multipliers in `mkContract` and `refreshBountyBoard`. Content ideas: Volume 2 contracts tied to the failing wards, settlement-specific boards, repeat-clear milestones.
