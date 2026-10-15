/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — VOLUME 2: SEAL & SITES (no world map)
   Volume 2 is a compact, location-focused mystery, so it has no world map. Instead: a small location schematic, a seal diagram and an
   investigation tracker, all driven by story hooks (hook(id)). Only things already shown on the pages appear. Solid line = confirmed
   connection, dotted line = unresolved. Things not yet on a page (the second anchor, the keeper, the relay) are NOT drawn until they are.
   ===================================================================== */
const sealOpen = () => G.ch >= 48;
const sealHook = id => !!hook(id);
const C_GOLD = '#c9a24a', C_RED = '#d24a55', C_DIM = '#6f6a85', C_TXT = '#cfc6dd';

/* ---------- location schematic ---------- */
const SITES = [
  {id:'muxue',   n:'Muxue Island',            x:160, y:128, shown:() => true, note:'Home base: conversations, recovery, research and the clues that surface here.'},
  {id:'sanct',   n:'The Sanctuary',           x:160, y:208, shown:() => G.ch >= 48, note:'The formation beneath the island: three rings and a hidden eye.'},
  {id:'clinic',  n:'Clinic / Inn',            x:62,  y:96,  shown:() => G.ch >= 52, note:'Where Xining treats Dongyue. Quiet talks and recovery.'},
  {id:'lantern', n:'Red Lantern settlement',  x:252, y:112, shown:() => G.ch >= 54, note:'The eastern settlement and its noticeboard.'},
  {id:'eshrine', n:'Eastern boundary shrine', x:262, y:178, shown:() => sealHook('eastern_shrine_inscription_erased_from_inside'), note:'Its inscription was erased from the inside; the crimson mark matches the sanctuary.'},
  {id:'ashrine', n:'Abandoned shrine · second door', x:238, y:36, shown:() => sealHook('abandoned_shrine_reached'), note:'The hooked-symbol seal, the portrait gallery and the voice behind the door.'},
];
const LINKS = [   // [a, b, solid (confirmed)]
  ['muxue','sanct', true], ['muxue','clinic', true], ['muxue','lantern', true], ['lantern','eshrine', true],
  ['sanct','eshrine', true],      // the shrine's crimson mark matches the sanctuary's
  ['sanct','ashrine', false],     // the fragment's pattern links them (a network), but how is unresolved
];
function sitesSvg(){
  const shown = SITES.filter(s => s.shown()), ids = new Set(shown.map(s => s.id)), by = id => SITES.find(s => s.id === id);
  const lines = LINKS.filter(([a,b]) => ids.has(a) && ids.has(b)).map(([a,b,solid]) => {
    const A = by(a), B = by(b);
    return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${solid?C_GOLD:C_RED}" stroke-width="${solid?1.6:1.4}" ${solid?'':'stroke-dasharray="4 4"'} opacity=".85"/>`; }).join('');
  const nodes = shown.map(s => `<g><circle cx="${s.x}" cy="${s.y}" r="${s.id==='muxue'?10:7}" fill="#1c1430" stroke="${s.id==='sanct'||s.id==='ashrine'?C_RED:C_GOLD}" stroke-width="1.6"/>
    <text x="${s.x > 230 ? s.x + 8 : s.x}" y="${s.y + (s.y > 190 ? 22 : -14)}" text-anchor="${s.x > 230 ? 'end' : 'middle'}" font-size="9.5" fill="${C_TXT}">${s.n}</text></g>`).join('');
  return `<svg viewBox="0 0 320 240" role="img" aria-label="Muxue location schematic" style="width:100%;max-width:420px;display:block;margin:6px auto">${lines}${nodes}</svg>`;
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

/* ---------- clue journal + investigation stages ----------
   A record of discoveries and quest states, not a puzzle system. Every entry is a clue the pages have shown (src = the comic). Categories:
   formation / records / people. Stages follow the master document's investigation structure, but only stages the pages support are shown;
   later stages (anchors, restoring channels, the relay, the missing interval) stay roadmap material until their comics are integrated:
   add them to STAGES (and their clues to CLUES) then. */
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
];
const CLUE_CATS = [['formation','🌀 The formation'],['records','📜 Records and inscriptions'],['people','👤 People']];
const QUESTIONS = [   // [shown once this hook exists, question]; stays listed as unresolved until the story answers it
  ['hidden_eye_symbol_reached', 'What is the formation concealing, and from whom?'],
  ['record_deliberately_altered', 'Who altered the record?'],
  ['unknown_woman_speaks', 'Who is the woman behind the second door?'],
  ['cangyuan_past_clue_found', 'What did Cangyuan leave behind?'],
  ['seal_crimson_markings_added', 'Who added the crimson markings to the seal?'],
  ['shen_ruyue_name_found', 'What was Shen Ruyue to the place that built this?'],
];
/* Stages of The Broken Ward Network. done/active read story hooks; only stages the pages support are listed. */
const STAGES = [
  {t:'Detect', d:'Identify the failed wards and establish that the problem is connected.', done:() => sealHook('ward_network_lines_converge'), active:() => sealHook('first_breach_beneath_sanctuary')},
  {t:'Investigate', d:'Collect inscriptions, records and other clues about the formation and the second seal.', done:() => false, active:() => sealHook('ward_network_lines_converge')},
];
function rSeal(){
  if(!sealOpen()) return '<h2>Seal & Sites</h2><div class="sm">🔒 Opens once the investigation of the sanctuary begins (Volume 2).</div>';
  const found = CLUES.filter(([id]) => sealHook(id)), open = QUESTIONS.filter(([id]) => sealHook(id));
  const sites = SITES.filter(s => s.shown()).map(s => `<div class="li"><b>${s.n}</b><div class="sm">${s.note}</div></div>`).join('');
  const stages = STAGES.map(st => `<div class="li">${st.done()?'✔':st.active()?'▶':'○'} <b>${st.t}</b><div class="sm">${st.d}</div></div>`).join('');
  const cats = CLUE_CATS.map(([k,label]) => { const rows = found.filter(c => c[1] === k); return rows.length ? `<h4 style="margin:8px 0 2px">${label}</h4>${rows.map(c => `<div class="li">✔ ${c[3]} <span class="sm">· comic ${c[2]}</span></div>`).join('')}` : ''; }).join('');
  return `<h2>Seal & Sites</h2><div class="sm">Volume 2 stays close to home, so there is no world map: a small schematic of the places that matter, the seal as far as it is understood, and a journal of what has been found.</div>
    <div class="panel"><h3>📍 Sites</h3>${sitesSvg()}${sites}</div>
    <div class="panel"><h3>🌀 The seal</h3>${sealSvg()}<div class="sm">Solid lines are confirmed connections; dotted lines are not yet resolved. The diagram only shows what the party has actually seen.</div>
      ${sealHook('formation_three_rings_revealed')?'<div class="li sm">Outer ring: concealment (hides from outside) · middle ring: regulation (balances and monitors) · inner ring: containment (seals the filament)</div>':''}
      ${sealHook('formation_hides_the_inner_ring')?'<div class="li sm">Dotted line from the outer ring: the outer structure may be hiding the inner one</div>':''}
      ${sealHook('seal_crimson_markings_added')?'<div class="li sm">Red ticks at the second door: crimson markings added later, not part of the original seal</div>':''}</div>
    <div class="panel"><h3>🔎 Clue Journal · The Broken Ward Network</h3>${stages}<div class="sm" style="margin:4px 0">More stages appear as the story reaches them. ${found.length} clues recorded.</div>${cats || '<div class="sm">Nothing recorded yet.</div>'}
      <h4 style="margin:8px 0 2px">Still unresolved</h4>${open.map(([,q]) => `<div class="li">○ ${q}</div>`).join('') || '<div class="sm">Nothing is in question yet.</div>'}</div>`;
}
