# Bond & Dual Cultivation System — Volumes 1 and 2

Author's proposed canon, with what is implemented. **Rule: intimacy, dual cultivation, a spiritual bond and marriage are four different things.**
> Sharing one's spiritual energy does not mean surrendering one's soul. Sharing intimacy does not mean surrendering one's future.
(Shown on Xiyu's sheet, Party tab → "Bonds".) Intimacy is never shown or tracked as a mechanic; the game stays non-explicit.

## Volume 1 — the Ritual of Everlasting Union (Xiyu × Dongyue)
Canon: a life-preserving ritual; Dongyue is her partner; the ritual's final stage (the everlasting union) is **never completed**, so **no permanent soul bond and no formal marriage**. The memories and feelings remain but give no ownership, permanent access to the other's energy, or automatic right to resume. In Volume 2 they do not resume intimacy; Xiyu asks for space.
Implemented:
- The Moonlit Bonding is **paused from V2 comic 001** (`bondingPaused`), with no chapter that resumes it. It does not return automatically.
- Xiyu's Bonds panel lists for Dongyue: ancient bond-spell (ch 20): cast; life-saving ritual: complete (ch 32); **everlasting union / permanent soul bond: not established**; Muxue wedding ceremony: held (ch 35); Moonlit Bonding: paused.
- "Soulbound Moonfire" → **Linked Moonfire** and "Soul Link" → **Shared Strength**; the `soul_bond` flag now reads "the ancient bond-spell links them (not a permanent soul bond)"; `ritual_completed` reads "the life-saving ritual is complete (the everlasting union is not established)".

## Volume 2 — Crimson Thread Resonance 绯脉共鸣 Fēimài Gòngmíng (provisional name) (Xiyu × Cangyuan)
Voluntary, dual cultivation, not a soul bond. Three layers: (1) physical intimacy (her choice, she can initiate; not automatically a bond); (2) dual cultivation (his Spirit Weaving guides and redirects, her crimson spellcraft transforms and breaks); (3) the resonance itself (their spiritual signatures recognise each other; no thought-reading, no emotion control, no unlimited tracking).
Implemented (mechanics are proposals, tunable):
| Resonance Lv | Gained by | Effect |
|---|---|---|
| 0–5 | **Dual cultivation**, once per in-game day, by her choice (`doDualCultivation`) | +1 Resonance and +5 bond with Cangyuan |
| each Lv | spiritual harmonization | paired techniques (Crimson Resonance, Thread-Breaker Formation) cost 5% less MP |
| each Lv | thread guidance | Xiyu's heat gain −5% more (on top of his 25%); his Steady the Current cools +5 more |
| each Lv | crimson transformation | Xiyu deals +8% to foes with a barrier, outer layer or link while he is beside her |
| 2 | resonance awareness | at the start of a battle, severe disturbances (layered or corrupt foes) are sensed and revealed |
| 3 | combined techniques | unlocks **Thread-Breaker Formation** (strips barrier, layer and buffs, marks Threadbound ×2) |
**It opens only when the story has Xiyu choose it** (flag `xiyu_chooses_cangyuan`). No chapter sets it yet; the Dev tab ("Open dual cultivation") does. Cannot: force anyone to stay, make anyone faithful, reveal thoughts or secrets, cure her corruption (heat only dulls her magic and is only partly eased), prevent leaving, or constitute marriage or a soul union. A separate rite can be designed later if they choose it.

## Conflicts with the Volume 1 comic pages (need your decision)
1. **The soul-bond.** Comics 022, 028, 032, 033 and 039 say the spell **did** bind them ("the soul-bond has bound them together", "We are bonded for life", "The bond joined their souls. Trust, however, could not be commanded"), and ch 20's Xiyu feels his emotions. Your canon says no permanent soul bond forms. I kept the pages' text and labelled the bond-spell as **incomplete / not permanent** in the game's own wording. If the pages are to match, those lines need changing, or the canon should say: *the bond-spell bound them temporarily or partially; the everlasting union was never completed.*
2. **The ritual.** Comics 031–032 end with "The ritual had saved her life" and the 14-day countdown ends; the game marks the **life-saving ritual complete (ch 32)**. Under your canon it is the **union** that is incomplete. I show both separately; please confirm this is the reading.
3. **Marriage — RESOLVED by the author:** the Muxue wedding was **ceremonial, not a binding union**. Back in Muxue **no papers were filed**, so it stayed something **Yan did for his daughter to make her happy**. Implemented: the Bonds panel reads "ceremonial only: no papers filed" from Volume 2 (hook `wedding_ceremonial_no_papers_filed`, ch 40). Dongyue calling himself her husband stays as dialogue. (Original conflict: comics 034–035 show a Muxue wedding ceremony (shaman, joss sticks, vows, Yan: "the marriage of my successor"), 036 and 039 say "husband/wife", and the hook file has `muxue_wedding_ceremony_started`. Your canon says no formal marriage. The game shows "Muxue wedding ceremony held (ch 35)" and **"permanent soul bond: not established"**. Is the ceremony a ceremonial/political marriage that is not a binding union? Tell me the wording.
4. The Moonlit Bonding (my earlier mechanic, opens after the ch 35 wedding) is **intimacy** in your terms. It stays paused; say if it should be renamed or removed, given "dual cultivation ≠ intimacy".

## Not built
The formal deeper rite, any romance or intimacy mechanic for Cangyuan, comics showing their first kiss or encounter, and Xining's relationships. Resonance is capped at 5 until Volume 2's story is known.
