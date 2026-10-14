# Volume 2 party members: Shen Cangyuan and Lu Xining

Data and combat only. They are **not joinable in Volume 1**: they are hidden from the Volume 1 party screen, Cast shows only a locked "Volume 2 Cast" page (no names),
and the Gates tab lists them as "Volume 2 · TBD". Cangyuan first appears in Volume 2 chapter 2; joining chapters are the author's to set (`JOIN_CH` in `scripts/core.js`).
Dev tab → "Recruit everyone" adds them for testing.
Art: `assets/party/cangyuan.webp`, `xining.webp` (cropped from the author's sheets), `assets/cast/main_characters.webp` (Xiyu and Dongyue page, unlocks at ch 2), `assets/cast/volume2.webp` (hidden until Volume 2).

## Classes (from the author's brief)
| Hero | Class | Role | Complements |
|---|---|---|---|
| Xiyu | Moon Witch | magical burst, curse | – |
| Dongyue | Battle Cleric / Spellblade | frontline, healing, wards | – |
| **Cangyuan** | Forbidden Spirit Weaver | control, debuffs, arcane support | changes how enemy magic behaves; steadies Xiyu's heat |
| **Xining** | Spirit Physician | healing, cleansing, diagnosis | practical recovery; her own medicine, not magic-only |

XP curves: Cangyuan "scholar" (slow), Xining "support". Stats at Lv 40: Cangyuan about 91 MAG, low ATK (moderate damage without setup); Xining about 86 MAG, ATK about 20, DEF low.

## Shen Cangyuan 沈沧渊 (the sheet's characters; the brief wrote 沈苍渊: please confirm which)
| Skill | Unlock (placeholder) | Effect |
|---|---|---|
| Spirit Thread | Lv 40 | moderate magic damage; marks **Threadbound** (stacks to 3): control on that foe lasts +1 turn and bosses resist it less (50% → 35% → 20% → 10%) |
| Binding Seal | Lv 40 | bind 2 turns + slow 3; bosses can still resist the bind but are always slowed |
| Inverted Meridian | Lv 44 | FORBIDDEN: silences a foe, shatters its barrier and buffs; **strain** costs him 10% max HP, +50% per use this battle |
| Inverted Meridian: Steady | Lv 44 | the same technique inward: cools 40 heat and cleanses an ally; same strain |
| Crimson Resonance (with Xiyu) | Lv 46 | all foes, strong damage (×1.35 with Xiyu), links them; adds 8 heat to Xiyu (+10 more if she is at 70+) |
| Ten Thousand Threads Formation | Lv 50 | ultimate: links all foes; 35% of damage and 50% of control spreads between linked foes. Useless against one foe |
| *Passive: Resonance of Two Currents* | – | with Xiyu fighting: her heat gain −25%, and 35% of her spells echo through his threads for extra damage |

## Lu Xining 陆惜宁
| Skill | Unlock (placeholder) | Effect |
|---|---|---|
| Gentle Meridian | Lv 40 | heal one ally, then regen 6% for 3 turns |
| Clear Spirit | Lv 40 | removes one ordinary status (not all). Severe curses need a story answer or Cangyuan |
| Physician's Insight | Lv 42 | reveals the foe and exposes it (+15% damage taken, 3 turns). Outside combat clue use is planned (see below) |
| Herb Pouch | Lv 40 | no mana: modest heal that uses one Frost Herb (her answer to running dry) |
| Quiet Sanctuary (with Dongyue) | Lv 46 | party heal + 15% shield, ×1.3 with Dongyue standing. Passive: he guards her (−20% damage to her) |
| Diagnosis and Severance (with Cangyuan) | Lv 48 | magic damage, analyses, strips barrier/buffs, binds: needs Cangyuan alive |
| Sanctuary of Still Waters | Lv 50 | ultimate: heal over 4 turns, 70% resist to statuses, cleanse; her own DEF −30% while it holds |
| *Passive: A Physician's Resolve* | – | each heal cuts her healing MP costs 5% this battle (max 30%); Herb Pouch works at 0 MP |

Weaknesses are built in: Cangyuan's damage is moderate and his forbidden techniques hurt him; Xining deals little damage, is fragile without Dongyue, and cannot remove severe curses.

## Combination skills need both partners alive
Crimson Resonance (Cangyuan + Xiyu), Quiet Sanctuary (Xining + Dongyue), Diagnosis and Severance (Xining + Cangyuan). A skill whose partner is missing shows "needs <name>".

## Not built yet (waiting on story)
- Physician's Insight as a story/clue tool (hooks to unlock clues about the deaths and the spreading corruption).
- Bond levels, personal bond skills and bond events for both (no bond beats written).
- Their joining chapters, join levels (default: party average − 1; Yan's offset is separate) and any story gates.
- "Cangyuan can genuinely love Xiyu while introducing dangerous choices" and "Xining and Dongyue" are narrative purposes only; no relationship mechanics.

## Notes
- Unlock levels assume they arrive near Lv 40 and spread over Volume 2 at one level per chapter. Retune when the joining chapters are set.
- Cangyuan's "Dark Crimson" palette and Xining's "pale blue" are from the sheets; no portrait variants yet.
