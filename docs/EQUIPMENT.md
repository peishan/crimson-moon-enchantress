# Equipment (built, author's spec)

- **Slots:** Robe / Armour · Weapon (single-handed, two-handed or dual blades) · Gloves · Shoes · Accessory. Shown in each hero's Party sheet under Stats (Change / Remove / Upgrade).
- **Start:** every hero begins with a robe or light armour and a weapon (casters in robes, Xiao Tian / Ya'Xing / Hoko / Su Liechen in light armour). Starters are owned and worn automatically (`GEAR_START`).
- **Rules:** a piece is worn by one hero at a time; hero-specific pieces (`who`) cannot be worn by others; generic pieces (`who:null`) can. Stats add in `statsOf`. Two upgrade tiers per piece (+30% stats each; tier 1: 60g + 3 Ice Crystal, tier 2: 140g + 6 Ice Crystal + 3 Rift Shard).
- **Data:** `scripts/equip.js` (`GEAR`, `GEAR_SKILLS`, `CH_GEAR` lives in journal.js). Add a piece = one `G_()` line; award it in `CH_GEAR` (chapter -> ids) or call `giveGear(id)`.
- **Volume 4 pieces:** Mountain-Stance Bracers (Xiao Tian, gloves: +DEF/HP, 10% less physical damage, cannot be slowed) · Arcane Sword: Skyshard (Ya'Xing, one-handed: light and swift, 10% less magic damage; **grants** Spirit Snare (short-range bind), Arcane Disruption (silence a spell) and, at tier 2, Spiritual Pulse (costly burst that slows and briefly silences every foe)) · Wayfinder's Key (Hoko, accessory: +SPD/MP, grants Operate the Mechanism; flag for exploration use via `gearFx(id).mechanisms`) · plus Frostweave Gloves, Ice Temple Boots and a Warding Charm for anyone. Ya'Xing also receives the Commanders' Sky-Blue Outfit when he rejoins, and the passive **Spell Resistance** (15% less magic damage and a chance to shrug off silence/charm; never immunity).
- **Where they arrive (placeholders):** Wayfinder's Key at chapter 119, the four temple pieces at chapter 122, Skyshard and the outfit on Ya'Xing's return. Move them in `CH_GEAR` when the rebuilt Ice Temple chapters settle.
- **Art:** none yet. Drop a square icon at `assets/gear/<id>.webp` (for example `skyshard.webp`); a missing file shows the emoji.
- Not built: shops, boss-drop gear, gear for Xiyu/Dongyue/Cangyuan/Xining beyond starters, two-handed/dual-blade rules beyond the label, Sky Step / Wayfinder's Key exploration uses.

## Update (author): starters, smiths, Xining, Xiao Tian, Ya'Xing
- **Starters are placeholders.** Xiyu, Dongyue, Cangyuan and Xining each start (or join) equipped, but their starting pieces are stand-ins: the author will supply unique starting equipment for the four. Replace the `starter:true` lines in `equip.js`.
- **Xining:** starts with a plain Self-Defence Dagger; a **Healing Staff** (`healing_staff`, hers only) exists but is not awarded yet.
- **Xiao Tian:** no weapon. He buys one at a weaponsmith (the old starter sword was removed).
- **Smiths** (Items tab, "Smiths"): Muxue Weaponsmith and Muxue Armorsmith (open from chapter 5, with generic stock: daggers, swords, twin daggers, staffs, broadsword, leathers, robe, gloves, boots, ring). **Ice Temple Weaponsmith and Armorsmith exist but are LOCKED** ("The temple forge is sealed for now"); set their `open` and `stock` when the author's temple map arrives. Hero-specific gear is never sold.
- **Ya'Xing's gear is unique to him** (knives, tunic, sky-blue outfit, Skyshard are `who:'yaxing'`).
