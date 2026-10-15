# The curse (Moon-Heat) and companion bonding

**Author decision (latest):** the old "Moonlit Bonding" (Dongyue staying beside Xiyu through the night) is **removed**. It came from an earlier direction the author says is out of date. It is replaced by **companion bonding**, which uses the trust and approval system (docs/RELATIONSHIPS.md). Nothing in this system involves intimacy.

## The curse: Moon-Heat (0-100)
- Xiyu's spells build heat (about 3 + a quarter of the MP cost per cast). Heat carries between real battles; the Training Room does not save it.
- From heat 40 it dulls her magic, up to -30% MAG at 100. Labels: Calm / Warm / Flushed (50) / Burning (80).
- Resting at the inn cools 40. **Quiet time** with a companion cools 30 (below). Cangyuan's Steady the Current and Dongyue's Cooling Blessing also cool.

## Quiet time (companion bonding)
- Once a day (`G.day`) Xiyu can spend an hour with any companion in the party (Party sheet or Confidants tab). Her heat settles by 30, she is **Settled** for her next 3 battles (+10% MAG), that companion's combat bond grows a little, and her trust and understanding with them grow by 2 each.
- Quiet time builds trust and understanding only up to 60 (the "Confided in you" stage). Deeper trust comes from conversations and the story.

## Attunement (derived, not clicked)
- Attunement level = floor((sum of trust + understanding between Xiyu and each companion in the party) / 30), max 10.
- Each level: +2% MAG, +3% MP, -5% heat gain. It opens the bond skills (for example Linked Moonfire needs attunement 3 and the story flag).
- So her power grows as her bonds with Dongyue, Cangyuan, Xining, Ya'Xing and Xiao Tian deepen, through quiet time, conversations and story chapters.

## Removed
`doBonding`, `bondingOpen`, `bondingPaused`, the "Unlock bonding" Dev button, the Moonlit Bonding row on the Bonds panel, the Afterglow art slot (`assets/events/moonlit_bonding.webp`) and the "bonding resumes" flag. Hook ids and old saves are untouched (the old attunement number in a save is ignored).

## Not changed
Crimson Thread Resonance (Xiyu x Cangyuan) stays closed until the author decides when it opens (docs/BOND_SYSTEM.md).
