# Herbalism, game time, rest and taverns

Code: `scripts/herbal.js` (Xining's herbalism), `scripts/rest.js` (clock, rest, taverns). Tabs: **🌿 Herbalism** (opens when Xining joins) and **🍵 Inns & Rest** (always).

## Two clocks
- `G.day`: the story day. Moves **only** with story chapters and "Ask around" on the Quest Board. Gates once-a-day things (quiet time, relationship bonding, board refreshes). Not farmable.
- `G.time`: the hour (0-23), shown in the top bar ("Day 5 · Morning"). Resting (+8h), a hot meal (+1h) and gathering (+2h) advance it. It **wraps around without changing the day**. Periods: Dawn 5-8, Morning 8-12, Afternoon 12-17, Evening 17-21, Night 21-5. Its only mechanical use today: night-blooming herbs are twice as likely after dark.

## Rest (unlimited)
- **The Crimson Fairy**: free (Xiyu owns it); also holds the shop.
- **The Ice Temple**: free (from chapter 18; a button on the Temple tab and in Inns & Rest).
- **Taverns** (gold; price = base + 0.5 x average party level; hot meal 8 + 0.8 x level): **The Drowsy Lantern** (Muxue town, from chapter 40), **Red Lantern Inn** (from 54), **Songxia Teahouse** (from 92). Each has a herb stall. A rest restores everyone's HP and MP and cools Xiyu's heat by 40; a hot meal heals 40% and cools 15.
- Resting never advances `G.day`.

## Xining's herbalism
- Needs Xining in the party and not away. **Gather herbs** (button -> modal): pick a place, a trip takes 2 hours and brings back 2-4 herbs (more at higher rank). Places open with the story (gardens, forest, stream, chambers, rift, temple gardens, Red Lantern roadside, Songxia hillside).
- **Xining's herbal pouch** (button -> modal): click herbs to put them in the **mortar** (3 slots), then **Combine**. A mixture that matches a recipe she can work makes a potion; one that matches nothing does nothing and costs nothing. Known recipes are listed (click to fill the mortar); unknown ones show a hint (a herb to start from, or the rank needed).
- **Herbalism rank** Novice, Apprentice (6 xp), Adept (18), Master (40), Sage (80). Gathering +1 xp, compounding +3, discovering a recipe +8. Higher rank opens recipes and gives a small chance (5% per rank above 1) of a double batch.
- Herbs: Frost Herb, Moon Petal, Glacier Mint, Plum Bud, Silverleaf, Ember Root, Night Lotus. Potions: Herbal Tonic (3 Frost Herb), Moonlit Tonic (2 Moon Petal + Frost Herb), Cooling Draught (2 Glacier Mint + Frost Herb; cools Xiyu's heat 40) are known from the start; Mending Tea, Spirit Draught (rank 2), Clear Spirit Tonic, Warding Elixir (3) and Sage's Restorative (4) are discovered by experimenting once the rank allows.
- The old Items-tab brewing (Frost Herb, Moon Petal recipes) still works; the Items tab holds the potions.

## Weapon crafting: not built (needs a decision)
Could reuse the same pouch/mortar/recipe UI with a smithing skill. Open questions for the author: whose craft is it (no blacksmith among the party; the Songxia craftsman could teach it); whether weapons exist at all in this game (characters have fixed skills, no gear slots today); materials (ore and fragments vs. the existing drops); whether it ties into the fragment investigation (the Songxia workshop). Not started.
