# Approval for party members and allies: design proposal (not built)

Author's request: explore adding an approval value for party members and allies, with close family higher. This builds on what exists (`scripts/relations.js`: per-pair trust, affection, understanding; shown to the player only as words) and keeps its guardrails: no number is shown, nobody is punished for who they were, no purity or chastity value, "not now" always costs nothing.

## What approval would be
How much a character approves of **the protagonist group and its choices**, as opposed to trust between two people (which unlocks private conversations) and affection (romance). One hidden value per character (0-100), shown as a phrase.

| Approval | Word | Meaning in play |
|---|---|---|
| 0-19 | Wary | will cooperate, little warmth |
| 20-39 | Neutral | polite, does the job |
| 40-59 | Warm | banter and small favours appear |
| 60-79 | Loyal | will take a risk for the party; extra scenes |
| 80-100 | Devoted | would stand with them against their own side |

## Family and close ties start higher
Baseline approval at first meeting, before any story beat moves it:
- Close family of a protagonist (Ming Yue, Qiumin, Muxue Yan, Zhan Yihai toward Dongyue; Yun He toward Xining): **Loyal (about 65)**.
- Persons who owe the party their life, or chose to join them (Liechen, Yun Long): **Warm (about 45)**.
- Long-standing friends (Xiao Tian, Ya'Xing, Hoko, Xiao Yan): **Warm to Loyal (about 50)**.
- Regional allies (a magistrate, a headman, A'Bu): **Neutral (about 30)**; they rise through help given, not by default.
A family member's approval has a **floor** (it cannot fall below Warm) because love is not a score; it can still be strained, and the story says so.

## What moves it
- Chapter beats already in the game (the same table style as `REL_CH`): saving someone, keeping a promise, treating a family member with respect.
- Conversation options (the existing Confidants tab).
- Flags, e.g. clearing Ming Yue's name (449), the engagement (450).
- Approval never moves from combat performance or from "wrong" answers; only deliberate story beats.

## What it does
- Unlocks banter lines and Confidants conversations (a threshold per line, like `ch` today).
- A small party bonus alongside Comradeship, capped (for example +1 to +3% per Loyal ally present), so it cannot be farmed.
- Persistent allies use it to decide help: Donglin keeps the Yilong base running, Ming Yue offers shelter, Yun He sends medicine.
- **No leaving.** Low approval never makes someone quit the party; it changes tone and what they volunteer.

## Where it would live
`G.approval = { id: value }`, one entry per character, with helpers `approvalGet`, `approvalAdd` and `approvalWord`, a column of words on the Confidants tab, and a `APPROVAL_CH` table mirroring `REL_CH`. Estimated size: about 120 lines plus the table; no art needed.

## Questions to settle before building
1. Approval of **whom**: the whole party (as drafted), Xiyu as leader, or each protagonist separately?
2. Should family approval show a **different word list** (for example "Proud", "Worried") than companions?
3. Should approval gate anything **mandatory** (no), or only optional scenes and small bonuses (as drafted)?
4. Should regional allies keep approval **per region** (Tribute's local regard) as well?
