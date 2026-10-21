/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — VOLUME 2: SEAL & SITES (no world map)
   Volume 2 is a compact, location-focused mystery, so it has no world map. Instead: a small location schematic, a seal diagram and an
   investigation tracker, all driven by story hooks (hook(id)). Only things already shown on the pages appear. Solid line = confirmed
   connection, dotted line = unresolved. Comics 025-038 added the second anchor (western), the keeper, the relay and the ruins; the diagrams grow as hooks fire.
   ===================================================================== */
const sealOpen = () => G.ch >= 48;
const sealHook = id => !!hook(id);
const C_GOLD = '#c9a24a', C_RED = '#d24a55', C_DIM = '#6f6a85', C_TXT = '#cfc6dd';

/* ---------- location schematic ----------
   The "eastern shrine" is one place: the sealed chamber (comics 011-012, 017-030). The western anchor is a pavilion across the island (027). */
const SITES = [
  {id:'muxue',   n:'Muxue Island',           x:150, y:125, shown:() => true, note:'Home base: conversations, recovery, research and the clues that surface here.'},
  {id:'estate', n:'The estate to the north', x:222, y:205, shown:() => sealHook('original_components_kept_at_an_estate_to_the_north'), note:'A sealed, abandoned estate that kept the formation\'s original components. Its guardian was defeated and the missing component recovered.'},
  {id:'sanct',   n:'The Sanctuary',          x:150, y:205, shown:() => G.ch >= 48, note:'The formation beneath the island: three rings and a hidden eye.'},
  {id:'clinic',  n:'Clinic / Inn',           x:55,  y:85,  shown:() => G.ch >= 52, note:'Where Xining treats Dongyue. Quiet talks and recovery.'},
  {id:'lantern', n:'Red Lantern settlement', x:240, y:95,  shown:() => G.ch >= 54, note:'The eastern settlement and its noticeboard.'},
  {id:'eshrine', n:'Eastern shrine · sealed chamber', x:285, y:165, shown:() => sealHook('eastern_shrine_inscription_erased_from_inside') || sealHook('abandoned_shrine_reached'), note:'The hooked-symbol seal, the portrait gallery and the keeper behind the second door. Its crimson mark matches the sanctuary\'s.'},
  {id:'western', n:'Western anchor · pavilion', x:45, y:175, shown:() => sealHook('second_anchor_reached'), note:'The second anchor, across the island. Not abandoned by accident. The divided channels were restored here.'},
  {id:'relay',   n:'Relay point',            x:150, y:40,  shown:() => sealHook('relay_point_found'), note:'A hidden receiver for the mark\'s signals, almost without residue. It was not recording during one interval.'},
  {id:'ruins',   n:'The ruins (eastern ridge)', x:305, y:60, shown:() => sealHook('xiao_tian_scouted_service_path'), note:'Reached by an old service path Xiao Tian scouted. An abandoned platform made to be overlooked, with a concealed marking.'},
  {id:'chamber', n:'Chamber beneath the mountain', x:225, y:28, shown:() => sealHook('three_channels_chamber_found'), note:'Three carved channels. The flow here is drawn away, not stopped. It is steadied for now, and still closed.'},
];
const LINKS = [   // [a, b, solid (confirmed)]
  ['muxue','sanct', true], ['muxue','clinic', true], ['muxue','lantern', true], ['lantern','eshrine', true],
  ['sanct','eshrine', true],      // the shrine's crimson mark matches the sanctuary's
  ['muxue','western', true],
  ['western','eshrine', true],    // two anchors, one formation (026)
  ['eshrine','relay', true], ['western','relay', true],   // the signal travels to a relay point (029-030)
  ['eshrine','ruins', false],     // whether the ruins belong to the same event is unproven (034)
  ['ruins','chamber', true],      // the route beyond the ruins (035-036)
  ['ruins','estate', false],   // the estate holds the formation's original components (V3 revised arc)
  ['chamber','eshrine', false],   // a symbol appears beneath the sealed chamber, aligned with the same flow (038): destination unknown
];
function sitesSvg(){
  const shown = SITES.filter(s => s.shown()), ids = new Set(shown.map(s => s.id)), by = id => SITES.find(s => s.id === id);
  const lines = LINKS.filter(([a,b]) => ids.has(a) && ids.has(b)).map(([a,b,solid]) => {
    const A = by(a), B = by(b);
    return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${solid?C_GOLD:C_RED}" stroke-width="${solid?1.6:1.4}" ${solid?'':'stroke-dasharray="4 4"'} opacity=".85"/>`; }).join('');
  const nodes = shown.map(s => { const right = s.x > 240, left = s.x < 70;
    return `<g><circle cx="${s.x}" cy="${s.y}" r="${s.id==='muxue'?10:7}" fill="#1c1430" stroke="${['sanct','eshrine','chamber'].includes(s.id)?C_RED:C_GOLD}" stroke-width="1.6"/>
    <text x="${right ? s.x + 8 : left ? s.x - 8 : s.x}" y="${s.y + (s.y > 190 ? 22 : -13)}" text-anchor="${right ? 'end' : left ? 'start' : 'middle'}" font-size="9" fill="${C_TXT}">${s.n}</text></g>`; }).join('');
  return `<svg viewBox="0 0 340 240" role="img" aria-label="Muxue location schematic" style="width:100%;max-width:440px;display:block;margin:6px auto">${lines}${nodes}</svg>`;
}

/* ---------- seal diagram ---------- */
function sealSvg(){
  const rings = sealHook('formation_three_rings_revealed'), eye = sealHook('hidden_eye_symbol_reached'), cx = 110, cy = 130;
  const ring = (r, lab, on) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${on?C_GOLD:C_DIM}" stroke-width="${on?1.8:1}" ${on?'':'stroke-dasharray="3 5"'}/>${on?`<text x="${cx}" y="${cy-r+11}" text-anchor="middle" font-size="8" fill="${C_TXT}">${lab}</text>`:''}`;
  const hides = sealHook('formation_hides_the_inner_ring');
  const door = sealHook('seal_recognises_cangyuan') || sealHook('abandoned_shrine_reached');
  const marks = sealHook('seal_crimson_markings_added');
  return `<svg viewBox="0 0 330 260" role="img" aria-label="Seal diagram" style="width:100%;max-width:440px;display:block;margin:6px auto">
    ${ring(92,'Concealment',rings)}${ring(62,'Regulation',rings)}${ring(34,'Containment',rings)}
    ${rings?'':`<text x="${cx}" y="${cy-70}" text-anchor="middle" font-size="9" fill="${C_DIM}">? the formation's rings are not yet read</text>`}
    ${eye?`<ellipse cx="${cx}" cy="${cy}" rx="14" ry="8" fill="none" stroke="${C_RED}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="3.2" fill="${C_RED}"/>`:`<text x="${cx}" y="${cy+3}" text-anchor="middle" font-size="12" fill="${C_DIM}">?</text>`}
    ${eye?`<path d="M0 238 C50 224 70 170 ${cx-18} ${cy+8}" fill="none" stroke="#8a2f3a" stroke-width="2"/><text x="6" y="252" font-size="8" fill="${C_TXT}">black filament</text>`:''}
    ${hides?`<path d="M${cx+66} ${cy-62} L${cx+30} ${cy-26}" stroke="${C_RED}" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>`:''}
    ${sealHook('eastern_shrine_inscription_erased_from_inside')?`<line x1="${cx+14}" y1="${cy+6}" x2="290" y2="206" stroke="${C_GOLD}" stroke-width="1.5"/><rect x="262" y="198" width="52" height="22" rx="4" fill="#1c1430" stroke="${C_GOLD}"/><text x="288" y="212" text-anchor="middle" font-size="8" fill="${C_TXT}">shrine mark</text>`:''}
    ${door?`<line x1="${cx+92}" y1="${cy-10}" x2="262" y2="60" stroke="${C_RED}" stroke-width="1.4" stroke-dasharray="4 4"/><rect x="236" y="38" width="80" height="34" rx="5" fill="#1c1430" stroke="${C_RED}"/><text x="276" y="52" text-anchor="middle" font-size="8" fill="${C_TXT}">second sealed door</text><text x="276" y="64" text-anchor="middle" font-size="8" fill="${C_DIM}">hooked symbol</text>`:''}
    ${marks?`<g stroke="${C_RED}" stroke-width="1.6"><line x1="246" y1="76" x2="254" y2="82"/><line x1="260" y1="78" x2="266" y2="86"/><line x1="274" y1="78" x2="276" y2="88"/></g>`:''}
    <g font-size="8" fill="${C_TXT}"><line x1="8" y1="14" x2="30" y2="14" stroke="${C_GOLD}" stroke-width="1.6"/><text x="34" y="17">confirmed</text><line x1="86" y1="14" x2="108" y2="14" stroke="${C_RED}" stroke-width="1.4" stroke-dasharray="4 4"/><text x="112" y="17">unresolved</text></g>
  </svg>`;
}

/* ---------- the two shores (comics 025-030) ---------- */
function shoresSvg(){
  const e = sealHook('formation_connects_two_anchors'); if(!e) return '';
  const restored = sealHook('channels_restored'), relay = sealHook('relay_point_found'), gap = sealHook('transmission_gap_found'), single = sealHook('formation_forced_through_single_point');
  const box = (x,y,w,t,t2,hot) => `<rect x="${x}" y="${y}" width="${w}" height="34" rx="5" fill="#1c1430" stroke="${hot?C_RED:C_GOLD}"/><text x="${x+w/2}" y="${y+15}" text-anchor="middle" font-size="8.5" fill="${C_TXT}">${t}</text><text x="${x+w/2}" y="${y+27}" text-anchor="middle" font-size="7.5" fill="${C_DIM}">${t2}</text>`;
  return `<svg viewBox="0 0 340 190" role="img" aria-label="The two shores" style="width:100%;max-width:440px;display:block;margin:6px auto">
    ${box(8,70,92,'Western anchor','second shore',false)}${box(240,70,92,'Eastern shrine','sealed chamber · keeper',true)}
    ${restored ? `<line x1="100" y1="80" x2="240" y2="80" stroke="${C_GOLD}" stroke-width="1.6"/><line x1="100" y1="104" x2="240" y2="104" stroke="${C_GOLD}" stroke-width="1.6"/><text x="170" y="74" text-anchor="middle" font-size="8" fill="${C_TXT}">divided channels (restored)</text>`
      : `<line x1="100" y1="87" x2="240" y2="87" stroke="${C_RED}" stroke-width="1.8"/><text x="170" y="80" text-anchor="middle" font-size="8" fill="${C_TXT}">${single ? 'forced through one point' : 'one connection'}</text>`}
    ${relay ? `<line x1="54" y1="104" x2="170" y2="160" stroke="${C_GOLD}" stroke-width="1.2" stroke-dasharray="${gap?'3 3':'0'}" opacity=".8"/><line x1="286" y1="104" x2="170" y2="160" stroke="${C_GOLD}" stroke-width="1.2" opacity=".8"/>${box(124,140,92,'Relay point','receiver (recovered)',false)}` : ''}
    ${gap ? `<rect x="116" y="128" width="108" height="9" rx="3" fill="none" stroke="${C_RED}" stroke-dasharray="3 3"/><text x="170" y="136" text-anchor="middle" font-size="7.5" fill="${C_RED}">missing interval (no record)</text>` : ''}
    <g font-size="8" fill="${C_TXT}"><line x1="8" y1="14" x2="30" y2="14" stroke="${C_GOLD}" stroke-width="1.6"/><text x="34" y="17">confirmed</text><line x1="86" y1="14" x2="108" y2="14" stroke="${C_RED}" stroke-width="1.4" stroke-dasharray="4 4"/><text x="112" y="17">unresolved</text></g>
  </svg>`;
}

/* ---------- clue journal + investigation stages ----------
   A record of discoveries and quest states, not a puzzle system. Every entry is a clue the pages have shown (src = the comic). Categories:
   formation / records / people / ruins (comics 033-038, with Xiao Tian's fieldwork marked 🍃). Stages follow the master document's structure
   as the pages reach them. The mystery is NOT solved at the end of Volume 2: the redirected flow has a destination that is still unknown. */
const CLUES = [   // [hook id, category, comic, text]
  ['first_breach_beneath_sanctuary', 'formation', '011', 'The hidden eye closed beneath the sanctuary and the first ward broke'],
  ['island_wards_failing', 'formation', '011', 'Protective wards are failing outward from the sanctuary along the eastern route'],
  ['formation_three_rings_revealed', 'formation', '010', 'The formation has three functions: concealment, regulation, containment'],
  ['formation_hides_the_inner_ring', 'formation', '010', 'The outer structure may be hiding the inner one'],
  ['eastern_shrine_inscription_erased_from_inside', 'records', '011', 'The eastern shrine\'s inscription was erased from the inside; its mark matches the sanctuary\'s'],
  ['corrupted_fragment_obtained', 'records', '015', 'A corrupted fragment was recovered from the Red Lantern Road'],
  ['ward_network_lines_converge', 'formation', '016', 'The fragment\'s lines converge on places where the island\'s wards have failed: it is one network'],
  ['spirit_weaving_signature_recognised', 'people', '017', 'Spirit Weaving leaves a signature, and Cangyuan recognises this one'],
  ['shen_ruyue_name_found', 'people', '018', 'The name Shen Ruyue is carved beneath the first pattern at the abandoned shrine'],
  ['record_deliberately_altered', 'records', '018', 'Part of the shrine\'s record was deliberately altered by someone who knows the original technique'],
  ['seal_crimson_markings_added', 'formation', '019', 'Crimson markings were added to the second seal; they are not part of the original'],
  ['scratched_portrait_seen', 'records', '019', 'In the corridor beyond, a row of portraits hangs, one deliberately scratched away'],
  ['departure_record_fragment_found', 'records', '020', 'A torn departure record was hidden behind the empty portrait frame (one name erased)'],
  ['cangyuan_past_clue_found', 'people', '020', 'Cangyuan\'s hand hovers over the frame as in his memory: he once belonged to the place that built this'],
  ['hidden_restriction_inscription_found', 'formation', '021', 'A later-added inscription describes a restriction placed on whoever enters'],
  ['secondary_passage_found', 'formation', '022', 'An inscription describes a secondary passage that predates the alteration'],
  ['inverted_meridian_named', 'people', '023', 'The forbidden method resembles the Inverted Meridian: the technique Cangyuan buried and refused to let anyone use'],
  ['formation_drawing_power_from_behind', 'formation', '023', 'The altered formation is not preserving the seal: it draws power from whatever lies behind it'],
  ['depletion_measurements_found', 'records', '023', 'The marks measure spiritual depletion: how much power the seal consumed, or took from those maintaining it'],
  ['cangyuan_remembers_formation_not_chamber', 'people', '024', 'Cangyuan remembers the formation, not this chamber, and not leaving anyone'],
  ['seal_is_a_cycle_consuming_its_source', 'formation', '024', 'The seal is a cycle that consumes its own source: whoever is trapped may sustain what traps them'],
  ['keeper_consent_unknown', 'records', '024', 'The record shows repeated, increasing losses, but not whether the keeper volunteered'],
  ['records_stop_before_final_stage', 'records', '024', 'The records stop before the final stage: removed, or never completed'],
  ['formation_built_on_cangyuan_technique', 'people', '024', 'Someone used Cangyuan\'s technique as the foundation of the formation'],
  ['second_anchor_found', 'formation', '025', 'There is a second anchor outside the chamber; its mark sits beside the earliest energy readings'],
  ['departure_record_read', 'records', '025', 'A departure record: someone left the shrine before the final stage, someone else remained'],
  ['two_shores_scroll_found', 'records', '025', '"When the two shores are severed, the keeper shall remain."'],
  ['formation_connects_two_anchors', 'formation', '026', 'The formation draws power from one end and transfers it to the other'],
  ['formation_forced_through_single_point', 'formation', '026', 'This version forces the energy through a single point: the sealed chamber'],
  ['keeper_absorbs_the_strain', 'formation', '026', 'The keeper may absorb the strain whenever the connection becomes unstable'],
  ['cangyuan_studied_strain_distribution', 'people', '026', 'Cangyuan studied distributing strain across channels and never intended a prison; someone believed the ends justified the means'],
  ['original_formation_shared_strain', 'formation', '027', 'The original formation shared the strain between two anchors; someone changed it into a single channel'],
  ['formation_alteration_deliberate', 'formation', '027', 'The alteration was deliberate: the keeper became the stabilizing point'],
  ['keeper_made_indispensable', 'formation', '027', 'The alteration made the keeper indispensable, and therefore easier to control'],
  ['channels_restored', 'formation', '027', 'The divided channels were restored: the drain stopped increasing (the keeper is still bound)'],
  ['keeper_message_eastern_shrine_record', 'records', '027', 'The keeper\'s message: "seek the record beneath the eastern shrine"'],
  ['record_symbol_not_in_first_projection', 'records', '028', 'A symbol on the record was not in the first projection: someone is still watching over the formation'],
  ['record_mark_added_later', 'records', '029', 'The red mark was added after the original writing, in different ink, and is not part of the original Spirit Weaving'],
  ['mark_observes_and_records', 'records', '029', 'The mark observes the formation\'s flow and records changes (or is a warning system); it reacted to Xiyu\'s magic'],
  ['signal_goes_to_relay_point', 'records', '029', 'The signal goes to a relay point between the western anchor and the eastern shrine'],
  ['relay_has_a_receiver', 'records', '030', 'The relay mark has a receiver, used more recently than its surroundings'],
  ['receiver_active_during_keepers_losses', 'records', '030', 'The receiver was active while the keeper\'s losses increased; it is not known whether its owner caused, permitted or tried to prevent them'],
  ['relay_school_recognised_not_maker', 'people', '030', 'Cangyuan recognises the school of formation work, not the person who made it'],
  ['transmission_gap_found', 'records', '030', 'A gap in the transmissions: the receiver was not recording, or someone erased the record'],
  ['xiao_tian_scouted_service_path', 'ruins', '033', '🍃 Xiao Tian scouted alone and found an old service path behind the eastern ridge with fresh footprints'],
  ['two_sets_of_tracks', 'ruins', '033', 'Two sets of tracks: one from the ridge, one turned back recently (perhaps one person, perhaps staged)'],
  ['flow_redirected_from_fragment', 'ruins', '033', 'The fragment\'s flow has been redirected, but not toward anything the fragment can show'],
  ['platform_made_to_be_missed', 'ruins', '033', '🍃 The abandoned platform was made to be missed, not triggered: someone wanted it overlooked'],
  ['markings_concealed_deliberately', 'ruins', '034', 'The platform\'s markings were concealed deliberately so they would escape ordinary inspection'],
  ['markings_record_a_passage', 'ruins', '034', 'The markings may record a passage of spiritual energy rather than control it'],
  ['slab_moved_recently', 'ruins', '034', 'Scrape marks along the slab: something was moved here recently'],
  ['xiao_tian_found_dark_object', 'ruins', '034', '🍃 Xiao Tian found a small dark object near the outer path, and signs that something heavy was dragged away'],
  ['fragment_residue_responds_to_xiyu', 'ruins', '035', 'The fragment\'s residue responds to Xiyu\'s power differently; they did not force a reaction'],
  ['fragment_edge_was_fitted', 'ruins', '035', 'The fragment\'s edge was scratched by something fitted against it: a mechanism, mount or instrument under repeated strain'],
  ['markings_continue_beyond_platform', 'ruins', '035', 'The pattern continues beyond the platform'],
  ['dragged_marks_head_the_same_way', 'ruins', '035', '🍃 The dragged marks head the same way: someone carried something heavy through'],
  ['three_channels_chamber_found', 'ruins', '036', 'A small chamber with three carved channels that once carried spiritual energy'],
  ['flow_drawn_away_not_stopped', 'ruins', '036', 'The broken channel should have stopped the flow, but the flow is being drawn away'],
  ['something_was_placed_in_the_wall', 'ruins', '036', 'Something was placed here; the fragment may have fitted (close is not proof)'],
  ['flow_redirected_deliberately', 'ruins', '036', 'The flow was redirected rather than destroyed: the first sign of intention'],
  ['chamber_stabilized_first', 'ruins', '037', 'They chose to stabilize the chamber first rather than follow the flow'],
  ['fresh_marks_near_entrance', 'ruins', '037', '🍃 Fresh marks near the entrance: theirs or someone else\'s?'],
  ['chamber_flow_steadied', 'ruins', '038', 'The flow beneath the chamber has steadied (the chamber did not open)'],
  ['redirected_flow_has_a_destination', 'ruins', '038', 'The redirected flow continues toward a destination not yet found'],
  ['second_symbol_seen_beneath_sealed_chamber', 'ruins', '038', 'A symbol appeared briefly beneath the sealed chamber, different from the ruins\' markings but aligned with the same flow'],
  ['records_kept_apart_from_main_collection', 'trail', 'V3 024', 'An old storehouse kept duplicate records apart from the main collection; several entries are crossed out, one noting a visitor long after the repository closed (name incomplete)'],
  ['clerk_visited_after_estate_closed', 'trail', 'V3 025', 'The former clerk was visited years after the estate closed and made to hand over copies of certain records: no threats, only a clear message that some things were safer forgotten'],
  ['clerk_kept_a_scrap_of_a_seal', 'trail', 'V3 025', 'The clerk kept a scrap showing part of a seal impression (a frightened witness, not a guilty one)'],
  ['partial_seal_matches_supply_organisation_style', 'trail', 'V3 027', 'The torn seal matches the estate\'s supply organisation: the right track, not an owner'],
  ['deliveries_around_closure_dont_match_records', 'trail', 'V3 027', 'Deliveries around the time the repository closed do not match the usual records: some supplies were redirected'],
  ['supplies_redirected_under_someones_orders', 'trail', 'V3 028', 'The former supplier: supplies were redirected under someone\'s orders; he never learned who. Those deliveries were kept in a second account book'],
  ['large_quantities_moved_handwriting_changes', 'trail', 'V3 029', 'The second account book: large quantities moved away, the handwriting changes midway (more than one hand), recorded as "miscellaneous goods" and "maintenance supplies"'],
  ['account_entry_mark_similar_to_clerks_seal', 'trail', 'V3 029', 'An account entry bears a mark like the clerk\'s seal: same organisation, not a full match'],
  ['name_on_the_orders_appears_several_times', 'trail', 'V3 030', 'A name appears several times on the redirected orders (顧雲舟, Gu Yunzhou: romanisation to confirm); it does not prove they acted alone'],
  ['second_record_meeting_with_omitted_person', 'trail', 'V3 031', 'A second record places the named intermediary at a meeting with someone whose name was deliberately omitted: a blank mark and a partially torn seal'],
  ['partial_seal_resembles_clerks_scrap', 'trail', 'V3 031', 'The torn seal resembles the clerk\'s scrap but is not an exact match: someone took care to hide part of the story'],
  ['footprints_and_marker_found', 'yan', 'V4 003', '🍃 Fresh footprints beside a carved stone marker on the mountain path: someone passed recently'],
  ['xiao_tian_senses_the_wind_gone_quiet', 'yan', 'V4 005', '🍃 Xiao Tian: "Something changed. Even the wind has gone quiet" before the threshold'],
  ['yan_letter_do_not_follow', 'yan', 'V4 001', 'Yan left a letter and went to the Ice Temple alone: "Do not follow me"; he has kept much from Xiyu and will answer her questions if he returns'],
  ['faint_trace_energy_fading', 'yan', 'V4 003', 'A fading trace of energy on the mountain path was left carefully, not to leave a clear trail but not erased completely; it does not prove whether Yan passed through or left a clue'],
  ['yan_was_already_fighting_something', 'yan', 'V4 004', 'When Xiyu found Yan at the sanctuary he was already fighting something far older; he never told her what, or what would happen if he failed'],
  ['yans_followers_repeat_the_name_yaxing', 'Why do Yan\'s followers speak of Ya\'Xing as if he were the key to something?'],
  ['hoko_not_free_to_leave_protection_or_imprisonment', 'Why was Hoko kept at the temple: protection, or imprisonment?'],
  ['senior_commander_withholds_something', 'What is the senior commander not telling them about Ya\'Xing\'s recovery?'],
  ['heal_or_suppress_unknown', 'Was the formation under Ya\'Xing\'s room meant to heal him, or to suppress him?'],
  ['something_beneath_responded', 'What responded beneath the guest room?'],
  ['concealment_formation_old_but_active', 'yan', 'V4 005', 'A concealment formation at a stone threshold, old but active; Xiyu feels the same pulse as at the sanctuary (not proof of the same force)'],
  ['ice_temple_concealment_still_functioning', 'yan', 'V4 006', 'The Ice Temple\'s concealment still works: its gates stand open but the temple was never truly left unprotected'],
  ['guardians_say_yan_returned_to_where_he_tried_to_escape', 'temple', 'V4 007', 'The guardians know Yan returned to the place he once tried to escape, but not everything he intends to do; some duties cannot be abandoned because their master has left'],
  ['guardians_have_guarded_for_two_thousand_years', 'temple', 'V4 008', 'The guardians have guarded the temple for two thousand years and were told never to abandon their duty; a heavy door keeps the inner chambers closed to the party'],
  ['temple_records_missing_or_sealed_pages', 'temple', 'V4 008', 'The records the guardians allow show fragments of history, but many pages are missing or sealed'],
  ['hoko_not_free_to_leave_protection_or_imprisonment', 'temple', 'V4 009', 'Hoko is alive: Yan\'s people brought him back and told him not to leave until the temple\'s affairs were settled (protection or imprisonment: he does not know)'],
  ['white_key_was_meant_to_open_a_way_out', 'temple', 'V4 009', 'The white key was meant to open a way out, not to bring Hoko back; the temple holds more than one teleportation platform, in layers'],
  ['yans_followers_repeat_the_name_yaxing', 'temple', 'V4 009', 'Yan\'s followers repeated the name Ya\'Xing before he disappeared, as if he were the key to something'],
  ['yaxing_trace_found_in_side_hall', 'temple', 'V4 010', 'A younger but strong spiritual trace in a side hall is identified as Ya\'Xing\'s; it resembles the formation Xiyu once saw Yan maintaining'],
  ['temple_responds_to_the_seal', 'temple', 'V4 011', 'The temple responds to a seal brought near a carved panel; crimson light reveals a hidden staircase (it is unknown whether the temple answered the seal or the energy within it)'],
  ['formation_reacts_to_xiyu', 'temple', 'V4 012', 'A red formation on the frozen stairs reacts to Xiyu and a door appears with no lock or handle: recognition was not permission'],
  ['spiritual_energy_flows_away_from_sealed_chamber', 'temple', 'V4 013', 'The spiritual energy deeper in the temple flows away from the sealed chamber: something passed through, or something is drawing it away (not known to be Ya\'Xing)'],
  ['human_shaped_shadow_at_the_archway', 'temple', 'V4 013', 'A faint blue light and a human-shaped shadow cross an archway and vanish (a person, an illusion or a remnant of the formation: unknown)'],
  ['chamber_built_for_more_than_imprisonment', 'temple', 'V4 018', 'The glacier chamber beyond the seal was built for more than imprisonment: its formations draw energy from the ice toward a central platform, and its chains connect to the chamber itself'],
  ['impression_in_the_frost_beside_the_platform', 'temple', 'V4 018', 'A shallow impression in the frost beside the platform: someone sat or knelt there for a long time (how recently is unknown)'],
  ['ship_rigging_fitting_half_buried', 'temple', 'V4 018', 'A metal fitting half-buried in the frost, like those aboard trading vessels, lies near a narrow passage with a faint residue that does not belong to the seal'],
  ['hoko_recognises_the_pillar_mechanism', 'temple', 'V4 014', 'Hoko recognises a carved pillar marking a passage linked to the inner chambers; he barely escaped last time'],
  ['younger_guard_commander_warns_them', 'temple', 'V4 014', 'A younger guard commander warns them: the passage was sealed for a reason and he was never told what it contained'],
  ['mechanism_may_open_from_within', 'temple', 'V4 015', 'The mechanism may open from within as well as outside: someone could be trapped, or deliberately keeping it closed'],
  ['seal_draws_energy_inward', 'temple', 'V4 017', 'The seal draws energy inward: protecting what lies inside, or preventing something inside from crossing the threshold'],
  ['ship_hardware_wedged_under_the_door', 'temple', 'V4 019', 'Ship hardware is wedged beneath a smaller stone door to keep its mechanism from closing; the clues point to a maritime craftsperson and a weakened traveller'],
  ['seal_does_two_jobs', 'temple', 'V4 022', 'The seal does two jobs: one force holds the door shut, the other keeps the inner energy from escaping (a fragile balance)'],
  ['yaxing_found_in_a_sealed_chamber', 'temple', 'V4 024', 'Ya\'Xing is found alive in a comfortable sealed room, kept by a formation at the doorway'],
  ['senior_commander_ordered_the_restriction', 'temple', 'V4 025', 'The senior commander ordered the restriction because he believed travel was too dangerous; Ya\'Xing asked to leave more than once'],
  ['medicine_residue_not_from_any_herb', 'temple', 'V4 027', 'Ya\'Xing\'s medicine contains a residue that is not from any herb; he felt his strength held down, as if something inside had gone quiet'],
  ['formation_predates_the_temple', 'temple', 'V4 029', 'The formation beneath Ya\'Xing\'s room predates the temple, built to regulate the spiritual energy of the mountain; his room is on one treatment branch of it'],
  ['channel_reversed_since_last_inspection', 'temple', 'V4 029', 'A channel is reversed, unlike at the last outer inspection; its deeper workings were entrusted to Yan, who said to maintain, not alter'],
  ['distorted_voice_says_yan', 'temple', 'V4 029', 'A faint distorted voice says \'...Yan...\': something recognised his name'],
  ['patterns_older_than_yans', 'temple', 'V4 030', 'The inner formation\'s patterns are older than, and different from, Yan\'s; the inner gate predates the commander\'s authority'],
  ['inner_gate_flickers_for_xiyu', 'temple', 'V4 030', 'The inner gate flickers when Xiyu approaches (bloodline, affinity or role: unknown)'],
  ['red_channel_pulses_three_times', 'temple', 'V4 031', 'The red channel pulses three times at a regular interval, which is not part of routine inspections'],
  ['dim_side_channel_feeds_the_pulse', 'temple', 'V4 032', 'A dim side channel feeds the pulse rather than receiving it; a worn groove shows someone worked the section after the original carving'],
  ['library_fragment_matches_the_formation_beneath_the_temple', 'temple', 'V4 034', 'A library fragment matches the formation beneath the temple, in a style older than the earlier records; its central and upper sections are missing (deliberately removed or damaged long ago: unknown)'],
  ['original_formation_contains_and_redistributes_disturbances', 'temple', 'V4 034', 'The original formation was designed to contain and redistribute spiritual disturbances within the mountain and keep them from spreading beyond it; the inscription does not say what they are'],
  ['added_line_does_not_belong_to_the_original_design', 'temple', 'V4 034', 'The fragment\'s geometry matches the channel rubbing, but the added red line changes the flow and does not belong to the original design'],
  ['fresh_footprints_stop_at_the_frozen_pond', 'temple', 'V4 040', 'Fresh light footprints, not the party\'s or the guards\', lead to the frozen pond and stop; the pavilion diagram was removed recently by someone who knew what it was'],
  ['searcher_familiar_with_the_temple_archives', 'temple', 'V4 041', 'Someone familiar with the archives took only records on the original formation and its maintenance, and tried and failed to force a sealed side chamber (a deliberate distraction is possible)'],
  ['inspection_records_skip_years', 'temple', 'V4 042', 'The secondary archive\'s records skip years between winter inspections, and the Emergency procedure register is lost; \'Maintain the balance\' recurs throughout'],
  ['inventory_line_overwritten_transferred_destination_unreadable', 'temple', 'V4 043', 'The measuring plates and alignment instruments are marked Transferred with an unreadable destination; their measurements fit the altered section (relevant, not proof)'],
  ['spiritual_flow_became_unpredictable_access_restricted', 'temple', 'V4 044', 'A former watchman: access to the side chamber was restricted when the flow became unpredictable, to protect those inside; he cannot swear the order came from Yan'],
  ['disturbance_recorded_before_the_restriction', 'temple', 'V4 045', 'A damaged custodians\' ledger records the disturbance before the restriction; the pages after it are removed'],
  ['three_locations_one_period', 'temple', 'V4 046', 'Western Passage, Inner Courtyard and Lower Foundation report abnormal flow in the same period: possibly one connected disturbance; the key reading is missing'],
  ['calibration_record_earliest_fluctuation_lower_passage', 'temple', 'V4 047', 'A calibration record places the earliest verifiable fluctuation near a lower passage, later closed behind an old safety barrier'],
  ['barrier_responds_to_energy_not_to_the_party', 'temple', 'V4 049', 'The lower barrier is active and responded measurably to a thread of energy; it did not answer the party'],
  ['seal_manages_an_imbalance_source_hidden', 'temple', 'V4 050', 'The lower seal transfers energy between its sections, the lower marking strongest: it manages an imbalance whose source stays hidden beneath the mountain'],
  ['custodians_ledger_year_463_first_disturbance', 'temple', 'V4 052', 'Custodians\' ledger, Year 463: the first disturbance, near the lower passage; the later diagram dates to Year 472; the inspector\'s name is missing'],
  ['records_moved_from_the_former_custodians_quarters', 'temple', 'V4 052', 'Older documents were moved from the former custodians\' quarters when the inner archive was reorganised; the archive catalogue may record where'],
  ['lower_channel_present_in_original_missing_in_later_copy', 'temple', 'V4 051', 'The original formation diagram directs energy through a lower channel that the later copy leaves out; the lower marking reacts more strongly than the later diagram predicts (simplification or alteration: unknown)'],
  ['no_current_custodian_authorised_a_change', 'temple', 'V4 051', 'No current custodian authorised a change to the formation; the later copy was made after the earliest disturbance; the person responsible, and whether Yan knew, is unknown'],
  ['former_custodian_kept_the_records_reassigned_long_ago', 'records', 'V5 002', 'The records of the original account were kept by someone in the former custodians\' quarters, reassigned long ago; only the surname beside the account can be read'],
  ['torn_transfer_note_found_behind_a_shelf', 'records', 'V5 003', 'The former custodians\' quarters were cleared; a torn transfer note says documents were moved to a designated storage location (destination and name missing)'],
  ['ledger_destination_column_missing', 'records', 'V5 004', 'The archive transfer ledger matches the torn note but its destination column is missing; the transfer came after the earliest disturbance'],
  ['former_records_assistant_helped_catalogue_the_transfer', 'records', 'V5 005', 'A duplicate inventory lists broad categories only; a former records assistant helped catalogue the transfer (name faded)'],
  ['assistant_reassigned_to_the_outer_administrative_wing', 'records', 'V5 006', 'The records assistant was reassigned to the outer administrative wing shortly after the transfer (the reason is unknown)'],
  ['assistant_departure_record_found', 'records', 'V5 008', 'The assistant left the temple\'s service (keys returned, destination blank); a handover file is referenced'],
  ['handover_names_no_titles_missing_account_unnamed', 'records', 'V5 009', 'The handover file lists categories including historical records but no titles; the receiving clerk signed it'],
  ['review_inventory_passed_to_the_archive', 'records', 'V5 011', 'A later storage review prepared an inventory that was passed to the archive, possibly filed with administrative inventories'],
  ['listed_shelf_holds_unrelated_documents', 'records', 'V5 012', 'The inventory was catalogued as A-27 but its listed shelf now holds unrelated documents; a duplicate collection index may hold the new locations'],
  ['inventory_confirms_the_category_not_the_identity', 'records', 'V5 014', 'The storage review inventory confirms historical incident records were included, not the identity of the missing document; an Exception Register is referenced'],
  ['unmatched_historical_record_has_no_title', 'records', 'V5 015', 'The Exception Register lists entries 017-019 (Year 12): damaged, missing, and an unmatched historical record with no confirmed title'],
  ['reviewer_initials_beside_the_entries', 'records', 'V5 016', 'Reviewer initials beside the register entries point to Review Notes, File B'],
  ['earlier_catalogue_missing_from_the_current_collection', 'records', 'V5 017', 'The reviewer\'s notes refer to an earlier catalogue that is missing from the current collection'],
  ['su_chengyuan_transferred_to_the_outer_records_office', 'records', 'V5 018', 'The reviewer is Su Chengyuan, transferred to the Records Office (Outer Grounds) three years ago; older catalogues were stored there during the Year 2 reorganisation'],
  ['transfer_batch_or_37_returned_to_the_main_archive', 'records', 'V5 019', 'Transfer record: Batch OR-37, received Year 3, 3rd month, from the Outer Records Office to the Main Archive, reviewed by Su Chengyuan; no titles listed, so whether the earlier catalogue was included is unconfirmed'],
  ['entry_records_a_disturbance_before_the_new_formation_diagram', 'records', 'V5 001', 'An old entry records a disturbance in the \'Year of Frost Moon\', before the new formation diagram was established; a fuller original account once existed, location unknown'],
  ['administrative_collection_moved_to_eastern_wing_secondary_storage', 'records', 'V5 013', 'The duplicate collection index places Collection A-27 in secondary storage in the eastern wing; a location, not proof the missing account was inside'],
  ['receiving_register_for_batch_or_37_found', 'records', 'V5 020', 'The receiving register confirms batch OR-37 arrived three years ago from the Outer Records Office (incomplete, partly damaged, with a supplementary list referenced)'],
  ['reference_hx_773_matches_the_exception_register', 'records', 'V5 021', 'Reference HX-773 on the damaged supplementary list matches the unmatched-record entry in the exception register; the original title was not preserved'],
  ['hx_773_was_a_catalogue_of_observations_on_the_protective_formation', 'records', 'V5 022', 'HX-773 was a catalogue of historical observations of the Ice Temple\'s protective formation, used to compare changes over time; the volumes are not found'],
  ['yan_annotated_the_custodial_record', 'records', 'V5 023', 'The older custodial record (Lower Passage) records fluctuations before the later diagram; a later annotation reads \'Reviewed the earlier record and related materials. - Yan\''],
  ['lower_marking_responds_more_strongly_consistent_with_old_records', 'records', 'V5 024', 'The lower marking responds more strongly than the upper ones, matching the older records; compensation or worsening is undetermined, and the seal was left undisturbed'],
  ['volume5_findings_summary_written', 'records', 'V5 025', 'Findings: the missing catalogue recorded observations of the formation; an earlier disturbance predates the diagram; the system remains active; Yan consulted the record (when, relative to his departure, is unknown). No evidence he caused anything'],
  ['second_layer_beneath_the_formation', 'temple', 'V4 033', 'A second layer of darker material and different rhythm lies beneath the original formation, added later; its residue is neither Ya\'Xing\'s medicine nor ordinary frost'],
  ['keeper_inscription_when_the_mountain_breathes_inward', 'temple', 'V4 035', 'Library inscription: \'When the mountain\'s breath turns inward, the keeper must remain until the currents settle\''],
  ['red_crystal_fragment_reacts_to_spirit_light', 'temple', 'V4 036', 'A red crystal fragment in the old laboratory reacts unpredictably to spirit-light; the medicine residue and the formation residue are not identical'],
  ['blue_formation_ends_at_a_broken_segment', 'temple', 'V4 037', 'The original (blue) formation ends at a broken segment and the later (red) alteration begins beyond it: the boundary is found, not the hand'],
  ['faded_crescent_symbol_on_old_diagram', 'temple', 'V4 038', 'A faded crescent symbol on the old diagram marks a section in the inner courtyard, reachable by the eastern passage'],
  ['crescent_symbol_on_the_lantern_post', 'temple', 'V4 039', 'The same crescent symbol on a courtyard lantern-post glows as Xiyu approaches (response recorded; bloodline not assumed)'],
  ['pavilion_shelf_missing_a_diagram', 'temple', 'V4 039', 'The pavilion shelf has a clean rectangular outline where a diagram once hung, and a path was cleared recently'],
  ['two_formations_upper_stabilises_lower_drains', 'temple', 'V4 028', 'Two formations lie beneath Ya\'Xing\'s room: the upper stabilises his spiritual energy, the lower draws away excess power'],
  ['something_beneath_responded', 'temple', 'V4 028', 'A vibration passes through the stone: something beneath the room has responded (it did not originate from the guest room)'],
  ['no_evidence_connects_repository_to_xiao_tian', 'trail', 'V3 035', 'Muxue records: no one has identified who ordered the redirected deliveries, and no evidence yet connects the repository to Xiao Tian\'s past'],
  ['signal_disappeared_disturbance_remains', 'ruins', 'V3 003', 'The signal disappeared but the disturbance did not; the remaining energy is strained like a wound forced to close'],
  ['scrape_made_after_stone_settled', 'ruins', 'V3 003', '🍃 A scrape was made after the stone was already there (the dust settled inside, not across the edge)'],
  ['groove_leads_toward_inner_chamber', 'ruins', 'V3 004', 'The scrape is deliberate and leads toward the inner chamber: something was taken inside or brought out'],
  ['metal_fragment_wedged_in_channel', 'ruins', 'V3 004', '🍃 A piece of metal was wedged in a formation channel; its position was recorded before removal'],
  ['fragment_removed_flow_steadier', 'ruins', 'V3 004', 'With the fragment removed the current is steadier (the pressure changed; nothing was repaired)'],
  ['sealed_mechanism_not_dormant', 'ruins', 'V3 005', 'A sealed mechanism, old but not entirely dormant; the stone was altered after it was built'],
  ['seal_may_contain_rather_than_hide', 'formation', 'V3 006', 'Cangyuan raises that the seal may be containing something rather than hiding it'],
  ['damage_unevenly_distributed', 'ruins', 'V3 007', 'The damage is uneven: some channels weakened, others intact (not yet called deliberate)'],
  ['second_fluctuation_beneath_channel', 'ruins', 'V3 007', 'A second fluctuation beneath the damaged channel: a surviving formation, or residue'],
  ['new_channel_not_on_first_survey', 'ruins', 'V3 007', '🍃 A channel not on the first survey leads away from the central ruins'],
  ['network_predates_alteration', 'ruins', 'V3 009', 'The terrace shows the same three-channel pattern; the mark is older than the damage, so the network predates the alteration'],
  ['someone_had_access_to_both_sites', 'ruins', 'V3 009', 'The fragment came from this network: someone had access to both sites (no name, no motive)'],
  ['grooves_cleaner_beneath_dust', 'ruins', 'V3 010', 'The grooves are cleaner beneath the dust: covered after carving, or the dust settled differently'],
  ['third_channel_narrower', 'ruins', 'V3 010', 'Two sites share almost identical spacing, but the third channel is narrower: a changed design, or a different purpose'],
  ['third_channel_clean_cut', 'ruins', 'V3 011', 'One channel under the pavilion ends in a clean cut where the others weathered naturally (when and why unknown)'],
  ['network_missing_connection', 'ruins', 'V3 011', 'The same design repeats in different places with a missing connection: severed, or built in stages'],
];
const CLUE_CATS = [['formation','🌀 The formation'],['records','📜 Records and inscriptions'],['people','👤 People'],['ruins','🏚️ The ruins and the redirected flow'],['trail','🗂️ The repository trail'],['yan','❄️ Yan\'s trail to the Ice Temple'],['temple','🏯 Inside the Ice Temple']];
const QUESTIONS = [   // [shown once this hook exists, question]; stays listed as unresolved until the story answers it
  ['hidden_eye_symbol_reached', 'What is the formation concealing, and from whom?'],
  ['record_deliberately_altered', 'Who altered the record?'],
  ['unknown_woman_speaks', 'Who is the keeper behind the second door?'],
  ['keeper_consent_unknown', 'Did the keeper ever agree to bear it?'],
  ['cangyuan_past_clue_found', 'What did Cangyuan leave behind?'],
  ['seal_crimson_markings_added', 'Who added the crimson markings to the seal?'],
  ['shen_ruyue_name_found', 'What was Shen Ruyue to the place that built this?'],
  ['formation_alteration_deliberate', 'Who altered the formation to make the keeper indispensable?'],
  ['transmission_gap_found', 'Who receives the signals, and what happened in the missing interval?'],
  ['redirected_flow_has_a_destination', 'Where is the redirected flow going, and why?'],
  ['yan_letter_do_not_follow', 'What must Yan face at the Ice Temple, and why alone?'],
  ['yan_was_already_fighting_something', 'What was Yan fighting at the sanctuary, and what happens if he fails?'],
  ['name_on_the_orders_appears_several_times', 'Who is behind the name on the redirected orders, and who gave the final instructions?'],
  ['omitted_name_blank_mark_and_torn_seal', 'Who was the person at the meeting whose name was removed?'],
  ['fragment_central_and_upper_sections_missing', 'What were the disturbances the original formation was built to contain?'],
  ['reversed_channel_carries_a_signal', 'What is the reversed channel signalling, and to whom?'],
  ['second_layer_beneath_the_formation', 'Who added the second layer, and was it the keeper or someone else?'],
  ['keeper_trapped_appointed_or_willing_unknown', 'Was the keeper trapped, appointed or willing?'],
  ['pavilion_shelf_missing_a_diagram', 'Where is the diagram that hung in the pavilion?'],
  ['someone_else_is_searching_for_the_same_truth', 'Who took the diagram, and why now?'],
  ['order_reached_the_watch_through_the_command_structure', 'Who ordered the side chamber restricted, and did that purpose change?'],
  ['seal_manages_an_imbalance_source_hidden', 'What is the imbalance beneath the mountain, and does it come from the original disturbance or a later alteration?'],
  ['inspector_name_missing_from_the_ledger', 'Who recorded the first disturbance, and who erased the name?'],
  ['lower_channel_present_in_original_missing_in_later_copy', 'Why does the later copy omit the lower channel, and who changed it?'],
  ['former_custodian_kept_the_records_reassigned_long_ago', 'Who kept the original account, and why was it separated from the rest?'],
  ['unmatched_historical_record_has_no_title', 'Is the unmatched historical record the missing account?'],
  ['earlier_catalogue_missing_from_the_current_collection', 'Where is the earlier catalogue, and why was it unavailable during the review?'],
  ['su_chengyuan_transferred_to_the_outer_records_office', 'Where did Su Chengyuan go, and what did they know?'],
  ['no_proof_yan_caused_the_disturbance', 'Why did Yan keep the earlier disturbance from Xiyu?'],
  ['catalogue_volumes_not_found', 'What happened to the catalogue\'s observations?'],
  ['search_for_yan_begins', 'Where is Yan, and what does he know?'],
];
/* Stages of The Broken Ward Network. done/active read story hooks. The last two stay open at the end of Volume 2. */
const STAGES = [
  {t:'Detect', d:'Identify the failed wards and establish that the problem is connected.', done:() => sealHook('ward_network_lines_converge'), active:() => sealHook('first_breach_beneath_sanctuary')},
  {t:'Investigate', d:'Collect inscriptions, records and other clues about the formation and the second seal.', done:() => sealHook('second_anchor_found'), active:() => sealHook('ward_network_lines_converge')},
  {t:'Locate the anchors', d:'Find the second anchor and learn how the two are connected.', done:() => sealHook('second_anchor_reached'), active:() => sealHook('second_anchor_found')},
  {t:'Restore the channels', d:'Stop the increasing drain without pretending the whole system is repaired.', done:() => sealHook('channels_restored'), active:() => sealHook('second_anchor_reached')},
  {t:'Trace the relay', d:'Follow the signals to the relay point and what it recorded.', done:() => sealHook('relay_point_found'), active:() => sealHook('signal_goes_to_relay_point')},
  {t:'Investigate the missing interval', d:'The records stop and a gap is left in the transmissions. Who erased it, and what happened then?', done:() => false, active:() => sealHook('transmission_gap_found')},
  {t:'Follow Yan to the Ice Temple', d:'Yan left alone with a letter and a destination. Follow his faint trail to the Ice Temple and learn what he went to face.', done:() => false, active:() => sealHook('yan_letter_do_not_follow')},
  {t:'Find Ya\'Xing', d:'Yan\'s followers speak of Ya\'Xing. Follow his trace through the Ice Temple and find him.', done:() => sealHook('yaxing_found_in_a_sealed_chamber'), active:() => sealHook('yans_followers_repeat_the_name_yaxing')},
  {t:'Understand the formation beneath Ya\'Xing\'s room', d:'A seal, a medicine and a slow recovery. Learn what the formation was for.', done:() => false, active:() => sealHook('yaxing_found_in_a_sealed_chamber')},
  {t:'Trace the pulse to its source', d:'Three red pulses, a second layer and a gate that flickers for Xiyu. Find the route to the cause.', done:() => false, active:() => sealHook('red_channel_pulses_three_times')},
  {t:'Find who searched the archives before us', d:'Fresh footprints, a missing diagram and a sealed chamber that someone tried to force. Who came, and what did they want?', done:() => false, active:() => sealHook('someone_else_is_searching_for_the_same_truth')},
  {t:'Find the former custodians\' records', d:'The first disturbance is in the ledger of Year 463; the people who recorded it, or what they left behind, may lie in the former custodians\' quarters.', done:() => false, active:() => sealHook('custodians_ledger_year_463_first_disturbance')},
  {t:'Find the missing account', d:'A former custodian kept the original account; the records were moved and the trail runs through ledgers, inventories and registers. Arcs 1 and 2: The Records We Inherited, Those Who Remembered.', done:() => sealHook('arc2_those_who_remembered_complete'), active:() => sealHook('former_custodian_kept_the_records_reassigned_long_ago')},
  {t:'Trace the unmatched record', d:'Arc 3, What the Seal Protects: an unmatched historical record, a reviewer named Su Chengyuan, and an earlier catalogue that was no longer there.', done:() => sealHook('volume5_findings_summary_written'), active:() => sealHook('arc2_those_who_remembered_complete')},
  {t:'Find Yan', d:'The records trail is resolved as far as the documents go. Find Yan and ask what he knew about the earlier disturbance, without recklessly opening the sealed passage.', done:() => false, active:() => sealHook('search_for_yan_begins')},
  {t:'Follow the redirected flow', d:'The ruins, the chamber and the symbol beneath the sealed chamber: where is the energy going?', done:() => false, active:() => sealHook('flow_redirected_from_fragment')},
];
function rSeal(){
  if(!sealOpen()) return '<h2>Seal & Sites</h2><div class="sm">🔒 Opens once the investigation of the sanctuary begins (Volume 2).</div>';
  const found = CLUES.filter(([id]) => sealHook(id)), open = QUESTIONS.filter(([id]) => sealHook(id));
  const sites = SITES.filter(s => s.shown()).map(s => `<div class="li"><b>${s.n}</b><div class="sm">${s.note}</div></div>`).join('');
  const stages = STAGES.filter(st => st.done() || st.active()).map(st => `<div class="li">${st.done()?'✔':'▶'} <b>${st.t}</b><div class="sm">${st.d}</div></div>`).join('');
  const cats = CLUE_CATS.map(([k,label]) => { const rows = found.filter(c => c[1] === k); return rows.length ? `<h4 style="margin:8px 0 2px">${label}</h4>${rows.map(c => `<div class="li">✔ ${c[3]} <span class="sm">· ${/^V/.test(c[2]) ? c[2] : "comic "+c[2]}</span></div>`).join('')}` : ''; }).join('');
  const shores = shoresSvg();
  return `<h2>Seal & Sites</h2><div class="sm">Volume 2 stays close to home, so there is no world map: a small schematic of the places that matter, the seal as far as it is understood, and a journal of what has been found.</div>
    <div class="panel"><h3>📍 Sites</h3>${sitesSvg()}${sites}</div>
    <div class="panel"><h3>🌀 The seal</h3>${sealSvg()}<div class="sm">Solid lines are confirmed connections; dotted lines are not yet resolved. The diagram only shows what the party has actually seen.</div>
      ${sealHook('formation_three_rings_revealed')?'<div class="li sm">Outer ring: concealment (hides from outside) · middle ring: regulation (balances and monitors) · inner ring: containment (seals the filament)</div>':''}
      ${sealHook('formation_hides_the_inner_ring')?'<div class="li sm">Dotted line from the outer ring: the outer structure may be hiding the inner one</div>':''}
      ${sealHook('seal_crimson_markings_added')?'<div class="li sm">Red ticks at the second door: crimson markings added later, not part of the original seal</div>':''}</div>
    ${shores ? `<div class="panel"><h3>🌊 The two shores</h3>${shores}<div class="sm">The original formation shared the strain between two anchors; someone changed it so the keeper bears it. The channels are restored and the drain has stopped increasing, but the keeper is still bound.</div></div>` : ''}
    <div class="panel"><h3>🔎 Clue Journal · The Broken Ward Network</h3>${stages}<div class="sm" style="margin:4px 0">${found.length} clues recorded. More stages appear as the story reaches them; the last two stay open.</div>${cats || '<div class="sm">Nothing recorded yet.</div>'}
      <h4 style="margin:8px 0 2px">Still unresolved</h4>${open.map(([,q]) => `<div class="li">○ ${q}</div>`).join('') || '<div class="sm">Nothing is in question yet.</div>'}</div>`;
}
