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
  {id:'sanct',   n:'The Sanctuary',          x:150, y:205, shown:() => G.ch >= 48, note:'The formation beneath the island: three rings and a hidden eye.'},
  {id:'clinic',  n:'Clinic / Inn',           x:55,  y:85,  shown:() => G.ch >= 52, note:'Where Xining treats Dongyue. Quiet talks and recovery.'},
  {id:'lantern', n:'Red Lantern settlement', x:240, y:95,  shown:() => G.ch >= 54, note:'The eastern settlement and its noticeboard.'},
  {id:'eshrine', n:'Eastern shrine · sealed chamber', x:285, y:165, shown:() => sealHook('eastern_shrine_inscription_erased_from_inside') || sealHook('abandoned_shrine_reached'), note:'The hooked-symbol seal, the portrait gallery and the keeper behind the second door. Its crimson mark matches the sanctuary\'s.'},
  {id:'western', n:'Western anchor · pavilion', x:45, y:175, shown:() => sealHook('second_anchor_reached'), note:'The second anchor, across the island. Not abandoned by accident. The divided channels were restored here.'},
  {id:'relay',   n:'Relay point',            x:150, y:40,  shown:() => sealHook('relay_point_found'), note:'A hidden receiver for the mark\'s signals, almost without residue. It was not recording during one interval.'},
  {id:'ruins',   n:'The ruins (eastern ridge)', x:305, y:60, shown:() => sealHook('xiao_tian_scouted_service_path'), note:'Reached by an old service path Xiao Tian scouted. An abandoned platform made to be overlooked, with a concealed marking.'},
  {id:'repo', n:'Second repository (abandoned)', x:160, y:228, shown:() => sealHook('repository_latch_rusted_dust_disturbed'), note:'The repository the records said was abandoned. Its latch is rusted and its dust disturbed; an instrument case is empty.'},
  {id:'workshop', n:'Songxia workshop', x:85, y:208, shown:() => sealHook('craftsman_consulted_songxia_workshop'), note:'A craftsman who reads old tools. The fragment\'s alloy and edges are a method, not a maker.'},
  {id:'estate', n:'The estate', x:222, y:205, shown:() => sealHook('estate_reached'), note:'Where the old workshop records were sold. An inventory points to a mountain repository: a direction, not an answer.'},
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
  ['ruins','workshop', false], ['workshop','estate', false], ['estate','repo', false],   // leads that follow the fragment (not proven to share a cause)
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
  ['residue_concentrated_along_cut', 'ruins', 'V3 012', 'The residue is concentrated along the cut; the fragment may have interacted with the process, which is not the same as causing it'],
  ['metallic_residue_in_groove', 'ruins', 'V3 012', 'A metallic residue is embedded in the groove'],
  ['fragment_notch_seen_in_light', 'ruins', 'V3 013', 'A small notch near the fragment\'s edge: a fitting point, or ordinary wear'],
  ['fragment_alloy_altered_old_tools', 'records', 'V3 014', 'The craftsman: the alloy was altered and the edges worked with tools not used in generations (a method, no maker)'],
  ['workshop_ledger_pattern_almost_identical', 'records', 'V3 015', 'A workshop ledger shows an almost identical branching pattern (copied from an older register)'],
  ['ledger_page_missing', 'records', 'V3 015', 'The original ledger page is missing: removed or simply lost (recorded, not an accusation)'],
  ['inventory_mountain_repository', 'records', 'V3 016', 'An estate inventory lists incomplete metal fittings "transferred from mountain repository", from a dismantled structure'],
  ['two_repositories_in_the_records', 'records', 'V3 017', 'The records offer two repositories: a scholarly archive (books, genealogies, cultivation histories) and one of dismantled instruments from abandoned sites'],
  ['no_entry_names_three_channel_design', 'records', 'V3 017', 'Several entries describe fittings and components, but none names the three-channel design directly'],
  ['repository_latch_rusted_dust_disturbed', 'records', 'V3 018', 'At the abandoned repository the latch is rusted but the dust beneath it was disturbed: someone, or an animal, entered'],
  ['instrument_case_empty_clean_rectangle', 'records', 'V3 018', 'A case that once held an instrument is empty: a clean rectangle in the dust (moved yesterday or years ago, unknown)'],
  ['repository_searched_or_emptied_before_abandonment', 'records', 'V3 018', 'Someone may have searched the room, or removed something before it was abandoned; no proof the two are connected'],
];
const CLUE_CATS = [['formation','🌀 The formation'],['records','📜 Records and inscriptions'],['people','👤 People'],['ruins','🏚️ The ruins and the redirected flow']];
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
];
/* Stages of The Broken Ward Network. done/active read story hooks. The last two stay open at the end of Volume 2. */
const STAGES = [
  {t:'Detect', d:'Identify the failed wards and establish that the problem is connected.', done:() => sealHook('ward_network_lines_converge'), active:() => sealHook('first_breach_beneath_sanctuary')},
  {t:'Investigate', d:'Collect inscriptions, records and other clues about the formation and the second seal.', done:() => sealHook('second_anchor_found'), active:() => sealHook('ward_network_lines_converge')},
  {t:'Locate the anchors', d:'Find the second anchor and learn how the two are connected.', done:() => sealHook('second_anchor_reached'), active:() => sealHook('second_anchor_found')},
  {t:'Restore the channels', d:'Stop the increasing drain without pretending the whole system is repaired.', done:() => sealHook('channels_restored'), active:() => sealHook('second_anchor_reached')},
  {t:'Trace the relay', d:'Follow the signals to the relay point and what it recorded.', done:() => sealHook('relay_point_found'), active:() => sealHook('signal_goes_to_relay_point')},
  {t:'Investigate the missing interval', d:'The records stop and a gap is left in the transmissions. Who erased it, and what happened then?', done:() => false, active:() => sealHook('transmission_gap_found')},
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
