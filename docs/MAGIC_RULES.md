# Magic-system rules (author) and the tavern-night canon

**Core rule to keep across future volumes: magical immunity is relative to the strength and nature of the spell, not absolute.**

## 1. Dongyue's magical resistance
He has unusually strong resistance to offensive magic, but it is not unlimited.
| Magic | Effect on Dongyue |
|---|---|
| Ordinary fireball | Immune or highly resistant |
| Ordinary offensive wards | Immune or highly resistant |
| Non-damaging illusion while sober | Normally resisted |
| Non-damaging illusion while drunk | Can take effect |
| Extremely powerful demonic attack | Can overcome his resistance |
This explains why Xiyu's offensive spells and room wards in Volume 1 never hurt him, without making him invulnerable.

**In the game (built):** `scripts/battle.js`, `innateRes` on Dongyue (0.7). Ordinary magic damage against him is cut by 70%; ordinary charms and silences are shrugged off while sober; foes marked `overwhelm:true` in `scripts/enemies.js` ignore the resistance (only the Crimson Stranger so far; tag any future extremely powerful demon the same way). `drunk` is a per-battle ally flag (false by default) that lets a charm through; no scene sets it yet, so it is there for a future story beat. His party sheet shows the rule. Note his gear can add its own magic reduction on top, so a drunk Dongyue still resists some charms.

## 2. The demon's power hierarchy
Xiyu's ordinary offensive magic and wards < Dongyue's natural resistance < the demon's concentrated demonic attack. The Volume 12 gorge fight (chapters 406-407) now says so in the text: the demonic energy overcomes his resistance, which Xiyu's ordinary spells never did, and it takes all eight party members to bring the demon down.

## 3. The tavern night (canon, for the chapters not yet built)
Sequence:
1. Dongyue is already drunk at the tavern (Volume 2, chapters 70-71 already show this).
2. Xining goes looking for him.
3. Xiyu secretly casts a **non-damaging illusion** while remaining hidden (chapter 70 already has her cast it and leave).
4. Because he is drunk, the illusion takes effect on him.
5. **Xining never sees the illusion and does not know Xiyu was involved.** She believes she spent that night with Dongyue; she has no reason to suspect his perception was altered.
6. Dongyue is too drunk to remember Xining's visit or what followed (chapter 71: he remembers a woman and robes but not a face).

Continuity note: in chapter 71 Xining tells Dongyue she found him drunk, the innkeeper helped take him to his room, and she went to her own room to sleep early. Under this canon that is her cover story: she is hiding what she believes happened. No text change is needed; do not contradict it.

## 4. Xining's notebook (Volume 12 comic 032 = game chapter 416 when it arrives)
The notebook must **not** mention Xiyu's illusion. It contains only what Xining personally experienced:
- she went to find Dongyue at the tavern;
- he was already drunk;
- she joined him drinking;
- what happened afterward;
- her later discovery of the pregnancy;
- her private feelings and medical observations.
Dongyue learns about the illusion only if he later gets the information from another source. The notebook must not hand him that knowledge. Knowledge flags to set explicitly by the chapters (none are set automatically): `dongyue_knows_illusion`, `xining_knows_illusion`, both false by default.

## 5. Xiao Yan and the base caretaker
Xiao Yan is **not** the caretaker of Xiyu's base. The caretaker will be a member of the Muxue extended cast, established by the author. Code, docs and the base's art list were corrected.
