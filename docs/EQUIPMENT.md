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

## Author's Party Equipment Sheet (Volume 4) installed
Starting gear is now the author's three pieces each (ids double as icon names: draw `assets/gear/<id>.webp`, 256x256):
- **Xiyu:** crimson_robe, moonjade_hairpin, ice_dagger · **Dongyue:** travelers_sword, dragon_knot, explorers_cloak · **Cangyuan:** binding_ropes (tool), talisman_pouch, dark_robe · **Xining:** healers_satchel (tool), basic_medical_texts (book), herbal_set, plus robe_xining (kept: the sheet lists no clothing for her) · **Xiao Tian:** training_staff, leather_bracers, travelers_garb · **Ya'Xing:** deckhands_blade, seafarers_charm, simple_attire · **Hoko:** lockpicks (tool), explorers_pouch, warm_cloak · Su Liechen: armor_suliechen, w_suliechen (placeholders).
- **Tool** pieces occupy the Weapon slot (shown as "Weapon / Tool"). A sixth **Book** slot appears only for Xining.
- **Treasure Vault upgrades (hidden vault behind the library; Hoko picks the locks):** crimson_moon_hairpin (Xiyu: 8% cheaper magic, her status effects last a turn longer), celestial_compass (Dongyue: resists silence/charm; hidden-route detection not built), spiritweave_bracers (Cangyuan: binds/slows/thread last a turn longer, 5% less magic damage), bracers_xiaotian (Mountain-Stance Bracers, now an **accessory**), skyshard (Ya'Xing; Spirit Snare now binds and slows; Spiritual Pulse at tier 2), wayfinders_key (Hoko). Placeholder chapter **130** (`CH_GEAR`).
- **Library discovery:** healers_scripture (Xining, book slot) grants **Meridian Sanctuary** (party shield, regen and status ward). Placeholder chapter **124**. The Healing Staff remains defined but unawarded.
- Ya'Xing's Commanders' Sky-Blue Outfit still comes with his return; Skyshard now comes from the vault, not his return.
- **Conflicts with earlier instructions (the sheet is followed):** Xining starts with a Healer's Satchel, not a dagger; Xiao Tian starts with a Training Staff (he can still buy weapons at the smith).
- Old saves: starter loadouts are rebuilt once (gear version 3); owned shop purchases are kept.

## Slots reduced to the sheet (author)
- **Three slots: Clothing / Armour, Weapon / Tool, Accessory**, plus a **Book** slot for Xining only (4 for her, 3 for everyone else). Gloves and Shoes slots are removed: the old gloves/boots pieces (Hand Wraps, Leather Gloves, Frostweave Gloves, boots, etc.) are now accessories. Saves are rebuilt once (gear version 4); purchases are kept.

## Starting Equipment sheet (final) and gear art installed
- Starters follow the author's second sheet (names changed): Xiyu Crimson Silk Robe + Moonshadow Hairpin (weapon slot, "focus") + Jade Charm · Dongyue Azure Traveller's Robe + Traveller's Sword + Traveller's Jade · Cangyuan Darkwood Robe + Binding Gauntlets + Spirit Beads · Xining Physician's Robe + Healer's Needle Set + Herbal Pouch (+ Basic Medical Texts in her Book slot; no art for it yet) · Xiao Tian Journeyman's Outfit + Practice Blade + Wooden Talisman · Ya'Xing Seafarer Outfit + Deckhand's Blade + Broken Talisman · Hoko Fur Mantle + Explorer's Knife + Lockpick Set (accessory). Su Liechen unchanged.
- **Art:** 256x256 icons cropped from both sheets into `assets/gear/<id>.webp` (21 starters, the six vault pieces, Healer's Scripture). The character portraits on the sheets were ignored. Missing art: basic_medical_texts, outfit_yaxing_sky, generic shop and temple pieces, Su Liechen's gear, Healing Staff.
