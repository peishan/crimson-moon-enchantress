# Xiyu's Ice Temple base

**What existed before this build (the Ice Temple so far):** the 🗺️ Temple tab (rooms by level, the author's maps, revealed by chapter); a free place to rest (Inns & Rest: "The Ice Temple", from chapter 18); Wilds zones for its levels and the Commanders' Trial Ground and Xuancang Slopes; the Training Room (a sandbox with no rewards); and, from chapter 661, the Ice Temple Access Token (travel there and back). There were no shops, no storage and no study loop.

**Built now (scripts/icetemple.js): Xiyu's third base.** Opens when chapter 661 completes (the token chapter), after Muxue Island and Yilong. Select it in the 🏠 Bases tab. Services need the party to be at the temple (the story puts them there at 661; the token travels there and back; the hall always works and offers the travel button). Rest is free.
- **🏪 Traders** (the stalls outside the gates, Volume 21 comic 014): Wine and Hot Food (hot meal restores 40% HP/MP; Warming Wine), Preserved Goods (Preserved Rations), Travel Supplies (tonics, salt), Cultivation Materials (herbs, petals, crystals). The traders also buy spare materials. Prices scale with the party's level like meals and rooms do. The pavilion is also an inn in the Inns tab.
- **📚 Research:** a daily "Study in the Ice Library": a neutral research note, a little XP for the active party, and progress for the new Network investigation **The Four Commanders** (hunting in the temple's levels adds to it too). The reports only restate what the records say: nothing is resolved (the Commanders' mystery is a long-term optional arc, docs/FOUR_COMMANDERS_PLAN.md).
- **🥋 Training:** a daily sparring session for XP, with shortcuts to the Training Room, the Wilds (Trial Ground) and the temple map.
- **📦 Storage:** a stash: store and take out items (quest items cannot be stored).
- Shared with the other bases: Quest Board, Bounties, Comms, Network, Fleet.

**Open for the author:** whether storage should also hold equipment or only items; whether the traders should later stock new goods by chapter; names for the Ice Temple Base artwork (optional art folder `assets/base/icetemple/` with hall, board, bounty, comms images, like the other bases).

## Update (author decisions)
- **Kitchen and traders:** the Ice Temple's central kitchen feeds the party for free once a day (HP only). The traders' hot meals (HP) and drinks (MP) are charged options. Food restores HP, drinks restore MP; items: Preserved Rations, Temple Dumplings (HP); Moon Tea, Warming Wine, Highland Tea, Frost Plum Wine (MP).
- **New goods by chapter:** the stock table in scripts/icetemple.js lists the first chapter each good is sold (some wait for chapters not yet built, e.g. Ginseng Broth and Frost Plum Wine at 700).
- **Storage now holds equipment** too (spare unworn gear; stored gear cannot be worn until taken out).
- **🕯️ Dark Shrines** section added (see docs/FOUR_COMMANDERS_PLAN.md).
