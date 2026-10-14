# The curse (Moon-Heat) and the Moonlit Bonding

Author direction: after the ritual and the "marriage", Xiyu requires regular bonding with Dongyue to increase her powers and abilities while dealing with her curse.
Implemented as a gameplay system, kept modest (no explicit content): the game only says Dongyue stays beside her through the night.

## The curse: Moon-Heat (0–100)
- Xiyu's spells build heat (about 3 + a quarter of the MP cost per cast). Heat carries between real battles; the Training Room does not save it.
- From heat 40 it dulls her magic, up to −30% MAG at 100. Labels: Calm / Warm / Flushed (50) / Burning (80).
- Resting at the inn cools 40. That is the only relief until the bonding opens.
- Why: ch1 and ch6 give her magic a heat side effect that she cools at the stream.

## The Moonlit Bonding (opens after the wedding, hook `dongyue_vows_lifelong_devotion`, ch35: provisional, no approved script yet)
Once per day (story chapters and inn rests advance the day), with Dongyue in the party:
- Heat clears completely.
- **Attunement** +1 (max 10 in Volume 1): permanent +2% MAG, +3% MP and −5% heat gain per level.
- **Afterglow**: +10% MAG for her next 3 real battles.
- Bond with Dongyue +5.
- Unlocks bond skills: **Cooling Blessing** (Dongyue, Attunement 2: cools 30 heat, regen, cleanse) and **Soulbound Moonfire** (Xiyu, Attunement 3: stronger while Dongyue fights beside her). Both also need the soul-bond (ch20).

## Where it lives
`scripts/core.js` (heat, attunement, `doBonding`), `scripts/battle.js` (heat in combat), `scripts/ui.js` (Xiyu's sheet "The Curse"), `scripts/characters.js` (the two skills).
Dev tab: **Unlock bonding**, **Heat 80**, **+1 day**.

## Open questions
1. Is the Moonlit Bonding open from the ritual (ch32) or only after the wedding (ch35)? It is ch35 now.
2. Should bonding also be required, or only helpful? It is helpful only (nothing is lost if skipped, but heat dulls her magic).
3. Does the curse matter before the bonding? Yes, lightly (heat from ch1); say if it should start only after a story beat.
4. Pacing: one bonding per day gives about one attunement per rest. Tune `ATTUNE_MAX` and the daily limit in `core.js`.
