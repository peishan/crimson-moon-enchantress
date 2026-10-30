# Game direction (author, standing)

Pillars:
1. **World exploration**, later **inter-world travel and a crossover with Tribute**.
2. **Character relationships and interactions**: bonds for the whole group.
3. **Reflections**: quiet, emotional beats.
4. **A lot of battles.**

Not a pillar: clue investigation (also see the earlier decision: no clue board, witnesses and fights over puzzles). Volumes 8-9 leaned heavily on investigation (compare, record, do not conclude); steer Volume 10 onward back to the pillars above.

## What the game can do now to serve the pillars (no new story invented)
- **Battles:** Volume 8-9 have one puppet fight and no Volume 9 fight. Wilds zones exist for both volumes (Lantern Hills, Archive Roads); a Volume 9 zone (stream, ridge hollow, abandoned platform) would add area monsters without touching the story.
- **Bonds and interactions (from the Tribute repo):** banter/overheard/moments (quiet party exchanges, comic relief, romance), standing and local regard (how places judge the party), timed events (letters and visits as days pass), homes/estates/residents (Xiyu's base (caretaker: a Muxue extended-cast member, to be established)).
- **Exploration:** Tribute's world map and travel tab (maps, routes, regional boards) are the model for exploration and, later, the inter-world gate to Tribute.
- **Story-side suggestions for Volume 10:** open with a payoff for the loose Volume 8-9 threads in one or two chapters, then move to travel and battle-driven arcs; give Cangyuan and Xiyu a reflective beat; avoid new "what is this clue" chains.

## Theme (author): second-chance love and destined love
- **Xiyu and Cangyuan:** destined love, a past-life connection. (Already seeded: the Bond of Choice / Crimson Thread, "the freedom to choose each other again" in the interlude. The game never states the past life; do not confirm it unless the author's script does.)
- **Dongyue and Xining:** a celestial trial / love calamity. (Existing: "Healers in step" pair bonus, Xining's Quiet Sanctuary guarded by Dongyue. Dongyue and Xiyu are already "Friends" and Dongyue also has the Sworn brothers bond with Xiao Tian, so Dongyue-Xining is the pairing to build.)
- **Xiao Tian and Ya'Xing:** a brotherly relationship. (Existing: they travel and spar together; no pair bonus yet.)
- Ruyue and Hanshan (first loves in the interludes) stay as second-chance-love echoes; Ruyue stays offstage until her arc.

Game-side hooks to build when the author approves: pair bonuses and banter for Dongyue-Xining (celestial trial flavour) and Xiao Tian-Ya'Xing (brotherly), and a past-life motif for Xiyu-Cangyuan in reflections only.

## Clarification (author): Xiao Tian and Ya'Xing
Their bond is brotherly only; it is not romantic. Each may later be paired with a woman, such as female party members they meet along the road. Do not write romantic beats between them or hint at one in banter, bonds or reflections.

## Built (Volume 9 follow-up)
- Wilds zone **The Hollow Stream** (opens at chapter 304): water spirits and lingering lights, Wilds only.
- Pair bonus **Brothers in arms** (Xiao Tian + Ya'Xing, +5%, from chapter 30). Brotherly only. Dongyue + Xining (+6%, "Healers in step") and Xiyu + Cangyuan (Bond of Choice) already existed.
- Not built yet: banter/overheard scenes and a base for Xiyu; both need writing that the author has not approved.

## Quiet Moments (built as a surprise; contents intentionally not listed here)
- `scripts/banter.js`: 15 short party exchanges, shown after a rest (one per rest, each only once) when the companions in it are with the party and the chapter is reached. Pairings follow the theme; Xiao Tian and Ya'Xing are brothers only. The author asked to discover them while playing as a regular player, so the lines are not summarised in docs or chat.

## Volume 13 plan (author)
Two main arcs: **clear Dongyue's mother's name**, and the **demon-hunting arc** (Su Liechen joins as a guest here). **Yun He has two bases: Yilong (his sanctuary) and Yunling (the town where the party meets Yun Long).** The game lets the party rest free at both once reached (chapters 410 and 415).

## Volume 13: Xiyu sets up a Yilong base (author)
In Volume 13 Xiyu also establishes a **Yilong base**, like the Muxue base (opened at chapter 409 with its mirror-array link). Not built: the chapter is not decided, and the Yilong base needs its own design. Suggested build when the chapter arrives: a second hub in `scripts/base.js` (a base list instead of one hub, each with its own Hall, a shared Quest Board and Bounties, and a Comms line), `BASE_OPEN_CH` per base, and a `yilong_base_established` flag. Art needed: the Muxue list in docs/BASE_ART.md repeated for Yilong (four banners, an unlock splash, optional icons and a caretaker or keeper portrait).
Note: Yun He's Yilong sanctuary is a separate place (free rest only); the Yilong base is Xiyu's own.
