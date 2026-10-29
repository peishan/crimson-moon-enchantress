# Muxue Base (guild hub): art asset list

The hub is built and working (tab **🏠 Muxue Base**, `scripts/base.js`). It opens after chapter 408 (`BASE_OPEN_CH`), replaces the separate Quest Board and Bounties tabs, and gathers: Hall (free rest, party, work summary), Quest Board, Bounties, and Comms (Xiyu's line to Muxue: refresh postings once a day without passing a day). Every image below is optional: a missing file falls back to an icon, so you can add them one at a time. Put files in `assets/base/` (create the folder) as WebP.

## 1. Hub banners (used now) — 1024x576 WebP, subject centred
The panel shows them cropped to a wide strip (about 3:1 at the top), so keep faces and key props in the middle band.
| File | What | Where it shows |
|---|---|---|
| `hall.webp` | The base's main hall: warm lanterns, a long counter, plum blossoms outside, the Crimson Fairy's feel | Hall tab header |
| `board.webp` | The contract wall: notice boards covered in scrolls, wax seals | Quest Board header |
| `bounty.webp` | The bounty wall: wanted-style posters of beasts and demons | Bounties header |
| `comms.webp` | Xiyu's communication: a scrying mirror / spirit crystal on a lacquer table, paper messenger birds | Comms header |

## 2. Unlock moment (not wired yet) — 1024x1536 WebP
- `exterior.webp`: the Muxue base from outside (gate, courtyard, lanterns, snow and blossoms), the party arriving. Reserved for a "The Muxue Base opens" splash in the style of the volume covers when chapter 408 is completed.

## 3. Small icons (optional, replace emoji) — 128x128 WebP
`comms_crystal`, `contract_scroll`, `bounty_poster`, `rest_bed`, and five renown badges (Newcomer, Known, Trusted, Respected, Renowned) as `renown_0` to `renown_4`. Three contract-type icons (`kill`, `sweep`, `collect`) if you want them on the cards.

## 4. Keeper and staff portraits (optional) — 512x512 WebP, same style as `assets/party/`
- Sister Qing (the Crimson Fairy's staff from Volume 1) as the hall's keeper.
- A board clerk / notice keeper.
- A messenger (human or a paper bird) for the Comms page.
When Xiao Yan becomes the caretaker (planned, not built), a counter pose of him.

## 5. Later, if the base grows (residents and wings, from the Tribute estates system)
Wing rooms at 1024x576 (kitchen, herb garden, training yard, library, guest room) and resident portraits at 512x512. Nothing in the game needs these yet.

Priority for a first art pass: the four banners in section 1, then the unlock splash, then Sister Qing.
