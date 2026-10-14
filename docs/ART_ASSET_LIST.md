# Art asset manifest — Volume 1

Every slot below is already wired. Drop a file at the path and the game uses it; until then a safe fallback (emoji or placeholder) is shown, nothing breaks.
Use PNG or WebP. Comic pages named `chNN.png` are converted to WebP by the Pages workflow on push. Keep Dongyue long and silvery-white in every image.

## A. Needed to finish Volume 1 (priority order)
| # | Asset | File | Size / notes |
|---|---|---|---|
| 1 | ~~Comic pages 21–39~~ | **DONE**: all 39 chapters have art (ch 28 v2) | Optional: regenerate 031–033 and 036 if you want them more modest |
| 3 | Portrait cards for new characters | `assets/cast/people/hoko.webp`, `anong.webp`, `yamon.webp`, `commander_west.webp` | 512×512 card in the same style as the 20-card set. Also send a clean no-caption square |
| 4 | Story variants of the leads | `assets/party/xiyu_unveiled.webp` (veil removed, from ch33), `xiyu_wed.webp` (wedding red, from ch35), `dongyue_wed.webp` (ceremonial robes, from ch35), `yaxing_injured.webp` (bandaged, from ch36) | 320×320, caption-free. Fallback is the base portrait |

## B. Needed for the new Moonlit Bonding and the curse
| # | Asset | File | Notes |
|---|---|---|---|
| 5 | **Moonlit Bonding scene** | `assets/events/moonlit_bonding.webp` | One tasteful illustration shown after each bonding: a moonlit chamber, Xiyu and Dongyue close beneath a blanket, petals and steam, faces turned or hidden. **Non-explicit, no nudity.** 1024×1536 or 1536×1024 |
| 6 | Optional: Xiyu "Burning" (high heat) battle portrait | `assets/party/xiyu_burning.webp` | Flushed cheeks, loosened hair. Not wired yet; say if you want it |
| 7 | Optional UI icons: Heat, Attunement, Afterglow | `assets/icons/heat.png`, `attune.png`, `afterglow.png` | 64×64. Not wired yet (emoji now) |

## C. World and enemies (polish)
| # | Asset | File | Notes |
|---|---|---|---|
| 8 | Hunting-zone thumbnails (8) | `assets/areas/forest.webp`, `stream.webp`, `chambers.webp`, `rift.webp`, `steps.webp`, `temple.webp`, `maze.webp`, `depths.webp` | 256×256 or wider banner; shown 64×64 |
| 9 | Enemy art | `assets/enemies/<key>.webp` for `afflicting_imp`, `horned_beast`, `frost_warden`, `frost_wolf`, `snowcap_boar`, `moon_wisp`, `ice_sprite`, `glacier_crab`, `ward_sentinel`, `rift_wraith`, `ice_golem`, `imp`, `frost_stalker`, `icicle_snare`, `maze_wraith`, `cave_crawler`, `hoard_mimic` | 256×256, transparent or dark background. **Start with `afflicting_imp` (the only story fight) and `horned_beast` (the arena)** |
| 10 | The white-robed priests with polar bears and white wolves (ch 26) | `assets/events/white_robed_group.webp` | Not wired; only needed as a Cast/Journal image if you want one |
| 11 | Ice Temple room art | `assets/temple/<room id>.webp` (ids in `scripts/temple.js`) | Optional, not wired |
| 12 | App icon (proper, not a cropped splash) | `assets/icons/icon-512.png`, `icon-192.png`, `icon-512-maskable.png` | 512 and 192; maskable with 20% safe margin |
| 13 | Muxue Yunxi | — | Hold: the story reveal is a Volume 1 spoiler (see STORY_NOTES.md) |

## Not needed
No new joinable allies: the party is Xiyu, Dongyue, Xiao Tian and Ya'Xing (stays at the temple after ch 39). Yan does not join. Hoko is a temporary guest. Ma Qi, Xiao Bai, Zhan Yihai, Ming Yue and Ao Yun portraits already exist.
