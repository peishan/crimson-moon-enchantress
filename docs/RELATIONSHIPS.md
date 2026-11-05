# Relationships: Trust & Approval

Implemented in `scripts/relations.js` (Confidants tab, opens at chapter 46). Adapted from the author's proposal.

## Values (per pair of characters, never per player)
- **Trust**: unlocks personal conversations. Stages shown as words: Guarded (0-19), Growing trust (20-39), Confided in you (40-59), Deep understanding (60-79), Established intimacy (80+).
- **Affection**: romantic development, shown only for romantic pairs (Xiyu-Dongyue, Xiyu-Cangyuan, Dongyue-Xining): Undefined, Curious, Warm, Fond, Devoted.
- **Understanding**: built by listening and acknowledging differences: Little understood, Beginning to understand, Understood, Deeply understood.
- The numbers are never displayed. Pairs are tracked individually (Dongyue's trust in Xining is separate from his trust in Xiyu).

## Rules
- Trust unlocks the **opportunity to ask**, not the right to an answer. Every conversation has a "not now" option that costs nothing, stays available, and gives a small gain once.
- **Pressing** for an answer strains trust and closes the topic until after the next chapter.
- A question can need more trust than the conversation itself (e.g. "Ask why he left Yilong" needs Growing trust 30+).
- Important story reveals (above all Shen Ruyue's identity) follow the plot's timing, never accumulated points.
- **No chastity, purity or virginity value, no purity-based penalties, no mandatory disclosure, no entitlement to details, no forced exclusivity.** A former partner never lowers anyone's standing. The question is how experiences affect how a character loves, trusts and chooses now.
- Story chapters nudge pairs through `REL_CH`; conversations do the rest.

## Outcomes
A conversation can unlock (1) something a character has never told the group (a flag + hook), (2) a new choice later (the "You learned" list, with flags such as `knows_why_dongyue_left_yilong`, `cangyuan_shared_what_hurt`), (3) relationship scenes (framework ready; no scenes authored yet).

## Conversations built (chapter 61)
| Id | Pair | Needs |
|---|---|---|
| `xining_dongyue_family` | Xining asks Dongyue about his parents (listen / why he left Yilong / let him keep it / press) | ch53, trust 15 |
| `dongyue_xining_muxue` | Dongyue asks Xining why she came to Muxue (listen / what she hopes to learn / needn't explain / doubt) | ch53, trust 15 |
| `xiyu_cangyuan_cost` | Xiyu asks Cangyuan what it cost him (does not name Ruyue as a lover) | ch61, trust 25 |
| `cangyuan_xiyu_past` | Cangyuan asks about Xiyu's past (Xu Hanshan, Dongyue, still deciding) | ch61, trust 25 |

The facts in these conversations (Dongyue's parents' fear becoming control, his leaving Yilong to decide for himself, Xining's master's unanswered questions, Xiyu's history with Hanshan) come from the proposal's illustrative examples. **Confirmed by the author as canon.**

## Next
Xiyu-Dongyue conversations (the wedding, her need for time), Xiyu-Xining, Dongyue-Cangyuan; scenes unlocked by trust and affection; consequences in later arguments and investigations.

## Story-flag consequences
`REL_FLAG` (scripts/relations.js) applies a relationship change once when a story flag is set via a chapter's `CH_FLAGS` (hidden flags without a `FLAG_LABEL` are silent). Planned use: the comic 031 enchantment is recorded as a hidden event at once and costs Xiyu-Dongyue trust only when `dongyue_learned_of_enchantment` is set (see docs/VOLUME2.md).

## Volume 2 end state (author)
Xiyu's only romantic route is **Cangyuan**; the relationship option opens at the end of Volume 2. **Dongyue stays a friend, crewmate and ally.** From chapter 70 the Xiyu-Dongyue pair no longer shows affection ("Close, but not romantic"; from chapter 78 "Friend, crewmate and ally"). Dongyue and Xining's gradual connection (chapters 52, 67) is unchanged.
