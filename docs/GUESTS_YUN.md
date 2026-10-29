# Guest characters: Yun Long and Yun He (build notes)

Liechen (Su Liechen) was already built. New in this build:

## Yun Long (云龙) · Volume 12 beta guest
- Guest (extra seat, never permanent); unlocks at **Volume 12 chapter 25** = game chapter **409** (`YUNLONG_CH` in `scripts/core.js`: 385 + 24; change that one number if the chapter moves). Volume 12 does not exist yet (last built chapter is 384), so for testing the Dev tab has **Beta: add Yun Long**, which sets `beta_yunlong` and recruits him; his guest window is open-ended until the author sets an end chapter.
- Kit (first pass): Dragon-Talon Strike (basic) · Azure Dragon Breath (12 MP, heal at 0.9 power + 20% DEF for 3 turns) · Dragon's Insight (8 MP, all foes: reveal stats; magical, corrupt or layered foes are exposed, +15% damage taken) · Dragon's Suppression (13 MP, magic hit, ×1.5 vs magical foes, silences 1 turn, cuts the foe's spell damage 40% for 3 turns) · Scales of the Hidden Dragon (10 MP, barrier = 22% of an ally's max HP, 3 turns).
- Out-of-battle detection (Dragon's Insight) is not built; it only works in fights.
- **Versatility check (as asked):** he heals, detects and suppresses, but each is weaker or narrower than the specialist: his heal is below Xining's, his barrier is smaller than Xiao Yan's, and his own damage is low (ATK 10 at level 1). With 40 MP and costs of 8-13 he can cast about three skills before running dry, so he fills one seat as a flexible support rather than replacing a healer or a controller. Test in play and trim (e.g. drop the DEF buff on the breath) if he feels too good.

## Yun He (云和) · future guest
- Xining's master and Yun Long's shifu. Built as a character (`yunhe`) with a profile and kit, but **not recruited by any chapter** (no `JOIN_CH`; unlocks in the volume after 12, chapter to be decided). Dev tab: **Test: add Yun He**.
- Kit: Amulet Strike (basic) · **Fate Thread · 命运之丝** (8 MP) · Severed Possibility · 断缘 (10 MP) · Taoist Healing Seal · 道医符 (11 MP, heal 1.1 power, clears one status, eases Xiyu's heat) · Demon-Quelling Talisman · 镇邪符 (12 MP, ×1.5 vs magical foes; binds a magical foe 2 turns (bosses can resist), cuts spell damage 40%).
- **Fate Thread (how it works in the engine):**
  - *Read / Mark:* choose a foe; it gains a 🧵 mark for 3 turns and a pre-rolled next move shown on its card. Ordinary foes: the exact move and its target. Elites: the kind of action (physical / spell / whole-party) and the target, and the cast costs 3 extra MP. Bosses: only the kind of action, and the mark lasts 2 turns. The foe then really uses the move that was read, and a new move is read each turn while the mark lasts.
  - *Exploit:* while marked, if the foe's action is interrupted (bound or charmed), its spell is silenced, an ally evades it, or its target is braced (Guard), the foe is exposed and takes bonus damage: 8% of its max HP (3% for bosses), once per round.
  - *Severed Possibility:* needs a marked foe (greyed out otherwise). Ordinary foe: loses its next turn (and the interruption triggers the exploit). Elite: 60% chance. Boss: 30% chance and it only falls back to its weakest move.
- Verified headless: marks, tier text, extra MP for elites, severing, exploit damage, the unmarked block, the seal cooling Xiyu's heat, Insight and Scales.

## Art
Both portraits are generated placeholders (`assets/party/yunlong.webp`, `yunhe.webp`, a plain silhouette with initials). The two reference images in the request were links only and were not attached, so swap in real art when you have it.
