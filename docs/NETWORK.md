# Xiyu's informant network (investigations)

A new section, **📡 Network**, in the Bases tab (any open base). Code: `scripts/network.js`.

- **Daily check-in** (once per game day): each open investigation gains 2-4% from informants, up to 50% (rumours only).
- **Hunting:** every Wilds victory in a relevant zone adds 1%. Defeated "clue-bearer" monsters have a 15% chance each to carry a lead: +4% and a bonus item (a herb, crystal, petal or ash).
- **Milestones** at 25/50/75/100%: a report line, gold, XP (scaled to the current chapter) and a consumable. 100% sets the flag `net_<id>_complete`.
- **Investigations so far** (table `INVESTIGATIONS`): *Where is Muxue Yan?* (opens 409), *The Demon Network* (452), *The Missing Voyage* (519). Each lists its zones, clue-bearing monsters and four report lines.
- **No new canon:** report lines are deliberately neutral. To give a milestone real content (or add an investigation), edit its entry in `INVESTIGATIONS`; nothing else needs to change.
- **Bestiary** (📕): grouped by region, with filters (All, Discovered, 📡 Network targets); entries show stats, traits, drops (rates unlock after three defeats), where found and which investigations the monster carries leads for.
- Save data: `G.net` (created on first use; old saves are fine).
