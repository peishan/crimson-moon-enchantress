# The Long Awaited Love Is Not a Dream
## Game Adaptation — Consolidated Chapter Hooks (Comic Chapters 001–039)

**Pen name:** Yuchen Sky  
**Purpose:** One consolidated implementation reference for the current game/visual-novel adaptation.  
**Scope:** Chapter hooks and their intended game functions, not a verbatim copy of the book or comic scripts.

> **Archive note:** This document combines the recoverable earlier hook work with the recent continuation. Some chapter titles and scene details are reconstructed from surviving summaries or the supplied comic pages. Those entries are labelled **provisional** or **source verification needed**. They should not be treated as confirmed canon where the original source is unavailable.

## Implementation conventions

- **One-time event flag:** Fire once for a scene, reveal, or milestone.
- **Persistent state:** Keep the resulting character/relationship/world condition after the scene ends.
- **Conditional trigger:** Fire only when prerequisite flags or conditions are met.
- Keep chapter numbering independent from book-chapter numbering.
- Preserve the Chinese/Eastern xianxia fantasy aesthetic; avoid Western or angelic styling.
- Zhan Dongyue always has long silvery-white hair. Muxue Yan has long white hair. Xiyu has long dark hair and red-themed ornaments, and may be veiled in public.
- Keep intimate scenes romantic but non-explicit. Use blankets, wraps, steam, petals, and expressions rather than nudity.
- Do not invent a definitive explanation for unresolved mysteries (including Muxue Yan's intentions, Minami's visit, Xiyu's identity, or Xiao Tian's missing memories).

---

## Comic Chapter 001 — The Witch Beneath Eight Moons
**Status:** Summary recovered; exact original hook list unavailable.  
- `muxue_island_introduced` — Establish the isolated magical island and its unusual moons. *(one-time)*
- `xiyu_introduced` — Introduce Muxue Xiyu as the island's feared witch. *(one-time)*
- `blood_moon_prophecy_revealed` — Establish her birth under the Blood Moon and eclipse power. *(one-time)*
- `magic_sensual_side_effect_established` — Track the side effect that accompanies using or practising magic. *(persistent lore/state)*
- `xiyu_abandonment_wound_revealed` — Establish the loss of her parents and Xu Hanshan's departure. *(persistent character state)*
- `island_tremor_detected` — Interrupt her solitude with an unnatural earthquake. *(one-time)*
- `xiyu_veils_and_enters_forest` — Begin her investigation into the disturbance. *(one-time)*

## Comic Chapter 002 — Title to Confirm
**Status:** Exact title and detailed scene sequence unavailable.  
- `opening_xiyu_sequence_continues` — Continue the split opening sequence from Book Chapter 1. *(chapter transition)*
- **Source verification needed:** Add specific scene flags only after the original Chapter 002 is recovered.

## Comic Chapter 003 — Title to Confirm
**Status:** Exact title and detailed scene sequence unavailable.  
- `dongyue_storyline_introduced` — Begin establishing Dongyue's parallel storyline and appearance. *(one-time; provisional)*
- **Continuity condition:** Dongyue's hair remains long and silvery-white.

## Comic Chapter 004 — Title to Confirm
**Status:** Reconstructed from story continuity.  
- `trading_vessel_arrival_sequence_started` — Continue the voyage toward Muxue. *(one-time; provisional)*
- `hidden_muxue_island_reached` — Reveal the island beyond ordinary charts. *(one-time; provisional)*
- `muxue_world_rules_teased` — Establish the island's strange sky and unfamiliar customs. *(one-time; provisional)*

## Comic Chapter 005 — The Crimson Fairy
**Status:** Summary recovered.  
- `long_raya_met` — Introduce the village mayor. *(one-time)*
- `abu_warning_heard` — Deliver the elder's warning and island lore. *(one-time)*
- `crimson_fairy_entered` — Bring the travellers to Xiyu's inn. *(one-time)*
- `xiyu_proprietress_revealed` — Introduce Xiyu, veiled in public. *(one-time)*
- `dongyue_intrigued_by_xiyu` — Record his unusual interest in her. *(persistent relationship state)*

## Comic Chapter 006 — Rage
**Status:** Summary recovered; exact title is supported by archive.  
- `special_fish_porridge_scene_completed` — Establish the travellers' first meal at the inn. *(one-time)*
- `xiyu_magic_heat_returns` — Trigger the physical heat caused by her magic. *(conditional/persistent condition)*
- `stream_encounter_started` — Dongyue encounters Xiyu while she tries to cool down. *(one-time)*
- `xiyu_intrusion_anger_triggered` — Record her anger at the encounter. *(relationship state)*

## Comic Chapter 007 — Title to Confirm
**Status:** Summary only.  
- `stream_confrontation_aftermath` — Continue the tension following the encounter. *(provisional)*
- **Source verification needed:** Exact scene and ending hooks.

## Comic Chapter 008 — Title to Confirm
**Status:** Summary only.  
- `dongyue_pursues_understanding` — Develop the contrast between Dongyue's directness and Xiyu's guardedness. *(provisional)*
- `xiyu_abandonment_fear_affects_trust` — Keep her fear of being left as a persistent relationship condition. *(persistent state)*

## Comic Chapter 009 — Title to Confirm
**Status:** Summary only.  
- `xu_hanshan_history_teased` — Turn the plot toward the man from Xiyu's past. *(one-time; provisional)*
- `dongyue_questions_hanshan_connection` — Establish Dongyue's curiosity about Xiyu's painful history. *(one-time; provisional)*

## Comic Chapter 010 — Title to Confirm
**Status:** Summary recovered; numbering not fully confirmed in archive.  
- `hanshan_requests_xiyu_help` — Hanshan asks Xiyu to help his sick wife, Wang Xi'er. *(one-time)*
- `xiyu_refuses_healing_request` — Establish that Xiyu is an enchantress, not a healer. *(one-time)*
- `dongyue_offers_to_help_xier` — Dongyue intervenes despite personal tension. *(one-time)*
- `hanshan_forbidden_from_returning` — Record the condition that Hanshan stay out of Xiyu's life. *(persistent story condition)*

## Comic Chapter 011 — Title to Confirm
**Status:** Summary recovered.  
- `ancestral_inheritance_quest_introduced` — Establish the hidden chest, magical weapon, and ancestral secrets. *(one-time)*
- `xiyu_dongyue_alliance_formed` — Record their agreement to undertake the quest together. *(persistent quest state)*
- `inheritance_quest_active` — Activate the main quest objective. *(persistent quest state)*

## Comic Chapter 012 — Title to Confirm
**Status:** Summary only; numbering not fully confirmed.  
- `xiyu_private_chambers_entered` — Begin the private-room scene. *(one-time; provisional)*
- `dongyue_bypasses_room_wards` — Highlight his unusual abilities. *(one-time; provisional)*
- `xiyu_conflicted_response_recorded` — Track her mix of suspicion and attraction. *(persistent relationship state)*

## Comic Chapter 013 — Title to Confirm
**Status:** Summary recovered.  
- `wang_xier_imp_expelled` — Dongyue uses his healing ability to drive out the imp. *(one-time)*
- `wang_xier_stabilized` — Record her recovery enough to rest safely. *(persistent health state)*
- `hanshan_agreement_reaffirmed` — Dongyue reminds Hanshan to stay away from Xiyu. *(one-time)*

## Comic Chapter 014 — Title to Confirm
**Status:** Summary recovered.  
- `xiao_tian_mother_dream_seen` — Xiao Tian dreams of a woman in grey calling him “son.” *(one-time)*
- `xiao_tian_memory_mystery_established` — Record his uncertainty about his past. *(persistent mystery state)*
- `xiao_tian_quest_invitation_received` — Dongyue invites him to join Xiyu's quest. *(one-time)*
- `xiao_tian_joins_party` — Add him to the travelling party if the player accepts/scene requires. *(party state; provisional)*

## Comic Chapter 015 — Title to Confirm
**Status:** Summary recovered.  
- `hidden_underground_chambers_found` — Xiyu leads the group through a trapdoor. *(one-time)*
- `ancient_door_blood_keyed` — Xiyu's blood opens the ancient door. *(one-time)*
- `ancestral_maps_discovered` — Let the party inspect the maps. *(one-time)*
- `pei_xinyi_identity_revealed` — Establish the woman in red as Xiyu's distant cousin. *(one-time)*
- `pre_dawn_departure_prepared` — Move the quest into its departure phase. *(quest state)*

## Comic Chapter 016 — Title to Confirm
**Status:** Summary recovered.  
- `muxue_gate_radiance_seen` — Trigger the strange radiance and changes in the sky. *(one-time)*
- `ten_year_gate_cycle_suspected` — Record Xiyu's theory about the gates. *(persistent clue)*
- `dongyue_dream_portrait_revealed` — Dongyue shows Xiyu the portrait he drew after dreaming of her. *(one-time)*
- `rift_opens_beneath_boat` — Trigger the transition into the mountain/temple arc. *(one-time)*

## Comic Chapter 017 — The Prisoner
**Status:** Summary recovered; exact final image/script unavailable.  
- `xuancang_mountain_steps_climbed` — Begin the ascent. *(one-time)*
- `muxue_yan_found_chained` — Discover the imprisoned man. *(one-time)*
- `xiyu_blood_releases_yan` — Xiyu uses her blood to free him. *(one-time)*
- `muxue_yan_disappears_in_light` — Trigger his sudden disappearance. *(one-time)*
- `xiyu_blood_loss_critical` — Set Xiyu's weakened condition. *(persistent health state)*
- `dongyue_catches_xiyu` — Trigger Dongyue catching her as she collapses. *(one-time)*

## Comic Chapter 018 — Title to Confirm
**Status:** Summary recovered from the game script file.  
- `dongyue_transfers_vitality` — Trigger the healing/vitality transfer. *(one-time)*
- `xiyu_recovers_temporarily` — Record temporary improvement, not full recovery. *(persistent health state)*
- `healing_cost_unanswered` — Keep the cost of Dongyue's action unresolved. *(mystery state)*

## Comic Chapter 019 — Xiyu's Thoughts
**Status:** Reconstructed from the game script file.  
- `lady_peony_memory_recalled` — Xiyu remembers her mother's words. *(one-time)*
- `xiyu_first_spellbook_chosen` — Establish enchantment and offensive magic as chosen paths. *(one-time)*
- `fangyi_diary_and_portal_failures_recalled` — Restore clues about the failed portal attempts. *(one-time)*
- `xiyu_fears_dongyue_will_leave` — Record her expectation of abandonment. *(persistent relationship state)*
- `xiyu_goals_reviewed` — Track her competing goals: protecting Muxue, learning her origins, ending her curse, and finding lasting love. *(persistent quest/character state)*

## Comic Chapter 020 — A Deep Bond
**Status:** Reconstructed from the game script file.  
- `dongyue_healing_ability_explained` — Dongyue explains his unusual healing gift. *(one-time)*
- `ancient_soul_bond_scroll_used` — Record that he used the ancient spell to save Xiyu. *(one-time)*
- `soul_bond_suspected` — Xiyu senses the new connection between them. *(persistent mystery state)*
- `xiyu_questions_dongyue_motive` — Trigger her question about what he wants in return. *(one-time)*
- `dongyue_offers_care_without_demand` — Record his offer to stay and care for her. *(relationship state)*

## Comic Chapter 021 — Warming Up to Him
**Status:** Reconstructed from surviving page description.  
- `xiyu_wakes_in_ice_temple` — Start the recovery scene. *(one-time)*
- `dongyue_protective_barrier_explained` — Explain the barrier on the chamber door. *(one-time)*
- `dongyue_childhood_rejection_revealed` — Reveal that his family feared his abilities. *(one-time)*
- `xiyu_recognizes_shared_loneliness` — Strengthen their emotional connection. *(relationship state)*

## Comic Chapter 022 — Bonded
**Status:** Reconstructed from surviving page description.  
- `dongyue_keeps_watch_while_xiyu_sleeps` — Record his quiet care. *(one-time)*
- `xiyu_kisses_sleeping_dongyue` — Trigger her tentative, private affection. *(one-time)*
- `soul_bond_scroll_studied` — Reveal the ritual deadline. *(one-time)*
- `soul_bond_fourteen_day_deadline_active` — Start the fourteen-day countdown. *(persistent timer/state)*
- `xiyu_fears_attachment_despite_bond` — Keep emotional fear separate from magical bonding. *(persistent relationship state)*

## Comic Chapter 023 — Exploring the Ice Temple
**Status:** Reconstructed from surviving page description.  
- `ice_temple_exploration_started` — Begin exploration after three days in the temple. *(quest state)*
- `xiyu_magic_unstable_in_temple` — Track the unusual environment's effect on her magic. *(persistent condition)*
- `intimate_moment_interrupted_by_knock` — Trigger the interruption. *(one-time)*
- `ice_temple_barrier_lifted` — Let companions enter with supplies. *(one-time)*
- `ice_temple_food_supplies_received` — Update party supplies. *(inventory state)*
- `ice_library_discovered` — Mark the library discovery. *(one-time)*

## Comic Chapter 024 — Accepting Fate
**Status:** Reconstructed from surviving page description.  
- `secrets_of_ice_temple_book_found` — Xiao Tian finds the book *Secrets of the Ice Temple*. *(one-time)*
- `muxue_yan_temple_connection_suspected` — Record the clue that the temple may reflect Yan's thoughts/cultivation. *(clue state)*
- `muxue_yunxi_connection_questioned` — Xiyu wonders whether Yan's lost daughter is connected to their escape. *(clue state)*
- `ice_temple_equipment_collected` — Add winter cloaks, an ice staff, and spellbooks. *(inventory state)*
- `soul_bond_eleven_days_remaining` — Update the deadline as stated in this chapter. *(persistent timer/state)*

## Comic Chapter 025 — The Frozen Passage
**Status:** Reconstruction placeholder; exact title and sequence unavailable.  
- `lower_ice_passages_entered` — Proposed bridge from library to lower passages. *(provisional; replace if source recovered)*
- `frozen_maze_route_suspected` — Proposed directional clue toward the maze. *(provisional)*
- **Source verification needed:** Do not treat these placeholder flags as canon.

## Comic Chapter 026 — Teleportation
**Status:** Title recovered; exact hook list reconstructed from surrounding continuity.  
- `teleportation_event_started` — Trigger the group's magical displacement. *(provisional one-time event)*
- `party_location_changed` — Update location after teleportation. *(provisional state)*
- **Source verification needed:** Confirm destination and consequences against original chapter.

## Comic Chapter 027 — Title to Confirm
**Status:** Exact title/sequence unavailable; surrounding story points toward Ao Yun's casket.  
- `ao_yun_casket_encountered` — Mark the encounter with the casket if confirmed by the source chapter. *(provisional)*
- `xiyu_drawn_to_casket` — Record Xiyu's attention being pulled toward it. *(provisional)*
- **Source verification needed:** Confirm exact events before implementation.

## Comic Chapter 028 — Deeply Weakened
**Status:** Reconstructed from surviving page description.  
- `soul_bond_seven_day_mark_reached` — Update the timeline to seven days after the bond. *(persistent timer/state)*
- `xiyu_critical_symptoms_worsen` — Purple veins, pain, and faltering vision worsen. *(persistent health state)*
- `xiyu_childhood_and_hanshan_memories_return` — Trigger memories of her losses. *(one-time)*
- `xiyu_questions_her_lineage` — Record doubts about her identity and bloodline. *(persistent mystery state)*
- `xiyu_hides_ritual_fear_from_dongyue` — Track her fear of rejection if she tells him the truth. *(relationship state)*
- `dongyue_finds_xiyu_crying` — Trigger his return and offer of help. *(one-time)*

## Comic Chapter 029 — The Price of Love
**Status:** Reconstructed from surviving page description.  
- `xiyu_near_death_state_reaffirmed` — Maintain the urgency of her condition. *(persistent health state)*
- `dongyue_parental_rejection_revealed` — Reveal his similar history of rejection. *(one-time)*
- `shared_curse_pain_acknowledged` — Deepen their empathy without claiming their curses are identical. *(relationship state)*
- `dongyue_offers_companionship_without_demands` — Record his promise to stay beside her. *(relationship state)*
- `xiyu_encouraged_to_reveal_ritual_truth` — Set up the next disclosure. *(conditional/quest state)*

## Comic Chapter 030 — Title and Script to Confirm
**Status:** Chapter image exists; complete approved script not recovered.  
- `chapter_030_source_pending` — Editorial marker only; not a gameplay event.
- **Source verification needed:** Recover the original script/image text before assigning canon-specific hooks.
- **Continuity correction:** Dongyue's hair must be long and silvery-white; any black-haired depiction is an error.

## Comic Chapter 031 — The Ritual Chamber
**Status:** Hook continuation recovered; source script details should still be checked.  
- `xiyu_critical_condition` — Mark Xiyu's life-threatening condition. *(persistent health state)*
- `ritual_summoning_phase_completed` — Record completion of the first ritual phase. *(one-time milestone)*
- `minami_appeared_in_person` — Trigger Minami's appearance. *(one-time)*
- `ritual_second_phase_started` — Begin the second phase of the ritual. *(quest state)*
- `ritual_almanac_found` — Record Dongyue's discovery of the required ritual information if confirmed in the scene. *(provisional)*
- `muxue_yan_observes_dongyue` — Track Yan observing Dongyue through the mystic mirror, if this scene belongs to this chapter. *(provisional)*

## Comic Chapter 032 — Embracing Her Feelings
**Status:** Hook continuation recovered; verify against the original source.  
- `ritual_second_phase_completed` — Mark completion of the second ritual phase. *(one-time milestone)*
- `xiyu_health_restored` — Update Xiyu's condition after the ritual. *(persistent health state)*
- `relationship_stage_deepened` — Record the change in Xiyu and Dongyue's bond. *(persistent relationship state)*
- `ritual_aftereffects_pending` — Keep lasting effects open for later scenes. *(persistent unresolved state)*

## Comic Chapter 033 — Rainbow Dream
**Status:** Reconstructed from surviving chapter description.  
- `ritual_aftermath_seen` — Begin the recovery aftermath. *(one-time)*
- `xiyu_vitality_restored` — Record the return of her strength. *(persistent health state)*
- `xiyu_veil_removed` — Mark Dongyue seeing Xiyu without her veil. *(one-time)*
- `rainbow_dream_triggered` — Trigger the rainbow dream sequence. *(one-time; do not repeat)*
- `drum_interrupts_dream` — End the dream with the drum sound. *(one-time)*

## Comic Chapter 034 — Heinous Intent
**Status:** Reconstructed from surviving chapter description.  
- `red_assembly_begun` — Start the decorated assembly scene. *(one-time)*
- `muxue_yan_announcement_started` — Trigger Yan's announcement. *(one-time)*
- `anong_yamon_captured` — Record the captives' arrival in chains. *(story state)*
- `commander_west_reported` — Trigger Commander West's report. *(one-time)*
- `rebels_confronted` — Start the confrontation with the captured rebels. *(one-time)*
- **Source verification needed:** The final verdict and exact consequences are not confirmed by the surviving record.

## Comic Chapter 035 — Gratification
**Status:** Based on the supplied comic page.  
- `post_assembly_reflection_started` — Begin Xiyu's reflection after the assembly. *(one-time)*
- `xiyu_questions_yan_motives` — Xiyu asks Dongyue whether he knows something about Yan. *(one-time)*
- `dongyue_reassures_xiyu` — Dongyue promises devotion and protection. *(relationship state)*
- `xiyu_trusts_dongyue` — Record her decision to trust him despite uncertainty. *(persistent relationship state)*
- `muxue_wedding_ceremony_started` — Start the Muxue wedding ceremony three days later. *(one-time)*
- `dongyue_vows_lifelong_devotion` — Record his public vow. *(relationship milestone)*
- `muxue_yan_congratulates_couple` — Trigger Yan's congratulation and promise to care for his descendant. *(one-time)*
- `muxue_yan_dark_intent_hint_seen` — Preserve the ominous undertone without confirming his motives. *(clue state)*
- `wedding_night_scene_started` — Transition to the couple's private room. *(one-time)*
- `mysterious_woman_appears` — Trigger the misty woman's appearance and message. *(one-time)*
- `mysterious_woman_vanishes` — End the apparition without identifying her. *(one-time)*
- `xiyu_fears_losing_happiness` — Record anxiety about her future with Dongyue. *(persistent relationship state)*
- `dongyue_reveals_dream_fragments` — Trigger sleep-muttered references to Xiao Tian, Ya'Xing, and revenge. *(one-time)*
- `xiyu_recognizes_dongyue_kindness` — Record her appreciation of his benevolence. *(relationship state)*
- `xiyu_experiences_marital_gratification` — Mark the emotional significance of receiving sincere affection. *(relationship milestone)*

## Comic Chapter 036 — Xiao Tian's Memories
**Status:** Based on the supplied comic page.  
- `xiao_tian_memory_flashback_started` — Enter Xiao Tian's fragmented memories. *(one-time)*
- `xiao_tian_was_swordsman` — Establish his former swordsmanship practice. *(one-time)*
- `masked_assassins_attacked` — Trigger the massacre flashback. *(one-time)*
- `xiao_tian_master_and_brothers_killed` — Record the deaths of his master and martial brothers. *(persistent backstory state)*
- `masked_assassins_identity_revealed` — Describe the black-clad assassins with gold details and iron masks. *(one-time)*
- `xiao_tian_captured_and_tortured` — Trigger the bull-demon captivity memory. *(one-time)*
- `bull_demon_experiments_revealed` — Record deprivation, poisons, and demon-energy-infused weapons. *(one-time)*
- `xiao_tian_memories_partially_restored` — Update his memory state while keeping much of his past blurred. *(persistent state)*
- `xiao_tian_revenge_motivation_revealed` — Establish his goals: find the woman in his dreams, locate his master, and avenge the dead. *(persistent quest state)*
- `xiao_tian_recovery_incomplete` — Maintain his pain, allergies, impaired speech, and involuntary laughter. *(persistent health state; author-confirmed)*
- `ya_xing_bull_demon_injuries_revealed` — Establish that Ya'Xing was also captured and experimented on by the bull demons; his injuries are more severe. *(author-confirmed; persistent backstory/health state)*
- `ya_xing_recovery_incomplete` — Track Ya'Xing's ongoing recovery from the experiments. *(author-confirmed; persistent health state)*
- `commander_west_checks_xiao_tian` — Trigger the recovery visit. *(one-time)*
- `commander_west_provides_elixirs` — Record the medicine being provided. *(inventory/health state)*
- `xiao_tian_accepts_medicine` — Mark his acceptance and gratitude. *(one-time)*
- `xiao_tian_return_requested` — Record his question about returning home. *(one-time)*
- `xiyu_wakes_beside_dongyue` — Begin the following-day scene. *(one-time)*
- `xiyu_worries_about_minami` — Record her concern about Minami's visit and her father's return. *(persistent clue state)*
- `xiyu_and_dongyue_discuss_marriage` — Trigger their conversation about Dongyue accepting her father's proposal. *(one-time)*
- `dongyue_reveals_frozen_order` — Trigger the Frozen Order discussion. *(one-time; verify exact lore wording)*
- `xiyu_and_dongyue_share_affection` — Record their affectionate interaction and Xiyu's hesitation to disclose everything. *(relationship state)*

## Comic Chapter 037 — The Duty of a Lesser Male
**Status:** Reconstructed from surviving chapter description.  
- `hidden_passage_discovered` — Dongyue finds the lever and opens a hidden passage. *(one-time)*
- `enchanted_bath_chamber_entered` — Enter the hidden bath chamber. *(one-time)*
- `xiyu_accepts_care` — Record Xiyu allowing Dongyue to help. *(relationship state)*
- `dongyue_learns_hair_care` — Trigger the hair-washing scene. *(one-time)*
- `bath_chamber_magic_activated` — Record the chamber's magic beginning to stir. *(one-time/condition)*
- **Production note:** Keep both characters modestly covered; no explicit nudity.

## Comic Chapter 038 — Communication
**Status:** Reconstructed from title and surrounding continuity; original full script needs verification.  
- `communication_scene_started` — Begin the conversation about what remains unsaid. *(one-time)*
- `xiyu_fear_of_abandonment_revealed` — Let Xiyu express why trust is difficult. *(relationship state)*
- `dongyue_requests_honesty` — Dongyue asks her not to carry every burden alone. *(one-time)*
- `couple_agrees_to_communicate` — Record their promise to speak more honestly. *(persistent relationship state)*
- `ice_temple_departure_prepared` — Begin the departure preparations. *(quest state)*

## Comic Chapter 039 — Return to the Island
**Volume 1 / Arc 1 finale**  
**Status:** Reconstructed from the approved 16-panel finale draft.  
- `ice_temple_farewell_started` — Begin the farewell to the temple. *(one-time)*
- `muxue_yan_bids_ao_yun_farewell` — Record Yan beside Ao Yun's glass casket. *(one-time)*
- `ya_xing_remains_at_temple` — Keep Ya'Xing behind to recover from the bull-demon experiments. *(persistent party/location state; author-confirmed)*
- `ya_xing_recovery_continues` — Track Ya'Xing's ongoing recovery at the Ice Temple under Muxue Yan's care. *(author-confirmed; persistent health state)*
- `xiao_tian_returns_with_party` — Record Xiao Tian returning to Muxue with Xiyu and Dongyue. *(author-confirmed; persistent party/location state)*
- `ao_yun_casket_protected` — Record that Ao Yun's remains/casket remain under protection. *(persistent world state)*
- `xiyu_questions_yan_motives` — Keep Xiyu's doubts about her father active. *(persistent mystery state)*
- `dongyue_promises_patience` — Record his promise to give Xiyu time and keep choosing her. *(relationship milestone)*
- `return_portal_opened` — Trigger the portal home. *(one-time)*
- `muxue_island_returned` — Update party location to Muxue. *(location state)*
- `ominous_clouds_over_muxue_seen` — Signal that the island has changed. *(one-time clue)*
- `volume_1_completed` — Mark the Volume 1 finale. *(persistent progress state)*
- `volume_2_unlocked` — Unlock the next volume if the game uses chapter gating. *(progression state)*

---

## Consolidated implementation notes

### State versus event
Use event flags for scenes that should not replay automatically, such as `mysterious_woman_appears`, `rainbow_dream_triggered`, and `return_portal_opened`. Use persistent states for continuing conditions such as `xiao_tian_recovery_incomplete`, `soul_bond_fourteen_day_deadline_active`, `xiyu_fears_losing_happiness`, and `xiyu_health_restored`.

### Dependencies worth enforcing
- The soul-bond countdown starts in Chapter 022 and should progress through the Ice Temple arc.
- Xiyu's critical condition leads into the ritual arc; do not treat the later recovery state as active before the ritual resolves.
- Chapter 035's wedding follows the assembly material from Chapter 034.
- Chapter 036's Xiao Tian recovery scene should preserve the consequences of his earlier captivity.
- Both Xiao Tian and Ya'Xing were captured and experimented on by the bull demons. Xiao Tian has partially recovered memories and continues to suffer symptoms; Ya'Xing's injuries are more severe.
- Chapter 039 ends Volume 1. Ya'Xing stays behind at the Ice Temple to recover from the bull demons' experiments under Muxue Yan's care, while Xiao Tian returns to Muxue with the party. The homecoming introduces new danger rather than resolving every mystery.
- Hook review status: the Xiao Tian / Ya'Xing bull-demon injury issue is resolved and author-confirmed.

### Open source-recovery checklist
- Chapters 002–004: recover exact titles and scenes.
- Chapters 007–009 and 011–016: confirm titles and exact scene boundaries.
- Chapters 025–027: replace proposed bridge hooks with source-verified events.
- Chapter 030: recover the exact title and approved script.
- Chapters 031–032: verify titles and exact ritual sequence.
- Chapter 034: confirm the assembly's final verdict.
- Chapter 038: verify the complete original dialogue and scene order.

**Canon rule:** When an original source is recovered, replace provisional hooks rather than silently treating reconstructed guesses as established story facts.
