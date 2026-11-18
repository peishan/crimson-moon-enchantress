/* =====================================================================
   THE SAGE (賢者): counsellor to the party on their cultivation paths
   First appeared in Volume 19 (chapter 06 of that volume) and gave the party the World-Bridge Compass; returns in Volume 26 (chapter 806), travels with the group and teaches
   them cultivation (809-836). Independent travelling scholar; role: Sage, Guide, Keeper of Knowledge. NOT a party member and not a fighter: no stats, no battle seat.
   From chapter 806 the 🧙 Sage tab lets Xiyu ask for COUNSEL once a story day: choose a companion on a cultivation path and the Sage guides their practice
   (+4 cultivation points beyond the daily Ice Library study, and a line of advice that follows the person's path and stage). Points are kept in G.cult like the library's.
   The character reference sheet is assets/sage_reference.webp. State: G.bondDay.sage (day of the last counsel).
   ===================================================================== */
const SAGE_OPEN_CH = 806;
const sageOpen = () => !!G && G.ch >= SAGE_OPEN_CH;
const SAGE_COUNSEL_PTS = 4;
/* advice lines: [stage 0-1, stage 2-3, stage 4+] per person, in the Sage's voice from the pages */
const SAGE_ADVICE = {
  xiyu:       ['Anchor your celestial essence, so that your power no longer fluctuates with your emotions.', 'Let your foundation work in harmony with his rather than changing it: the celestial and lunar flow brings stability and clarity.', 'Do not rush the next boundary. Let your energies settle, and arrive at it when your foundations are ready.'],
  cangyuan:   ['Guide the threads within your foundation, rather than allowing them to guide you.', 'Stop suppressing the nature of your foundation: find the way to align it with hers.', 'Extend your threads to harmonise with her rhythm, not to control it.'],
  suliechen:  ['Do not attempt to cultivate the way your companions do. I want to understand what your body and instincts have already learned.', 'Learn to sense spiritual energy while moving. Let your awareness follow your breathing, your footsteps and the space around your weapon.', 'Strength is not only the power to strike. It is knowing what is happening before a strike becomes necessary.'],
  yaxing:     ['Cultivation does not always mean sitting in stillness. Use it to sharpen the reflexes and instincts you already have.', 'Let your spiritual energy flow with your movements, not against them. When it scatters, breathe and try again.', 'Do not become someone else to cultivate. Refine what you already have and let it grow.'],
  qiumin:     ['Through study you learn the principles; through observation you see the subtle changes; through analysis you connect them into insight.', 'Your cultivation is a path of insight. Keep calming the mind and reading what lies beneath the surface.', 'Not greater might, but a deeper understanding of the world, its energy and the people around you.'],
  zhilei:     ['Train your hearing first: perceive the subtle rhythms of spiritual energy that usually go unnoticed.', 'Keep the Moon-Echo Bell responding to the surrounding flow, and hold the Harmonic Ward steady with layered resonance.', 'Resonance is not dominance. Listen, connect, and support those around you.'],
  hoko:       ['Reflect on your past journeys: they have already forged the foundation of your cultivation.', 'Conserve your energy, pace your strength and keep your judgement in every kind of land.', 'A true traveller knows when to push forward, when to rest, and when to change course.'],
  yanwatcher: ['Heighten your perception: distant sounds, movement, and the changes in terrain and spiritual energy.', 'Learn to read traces: tracks, broken branches, disturbed soil, even faint residual energy. They reveal threats and hidden traps.', 'When your senses and instincts work together, the world will reveal what is hidden. Keep the group a step ahead of danger.'],
  xiaotian:   ['Do not force spiritual circulation. Build on what you already do well: formation craft, spatial control and the flow of battle energy.', 'A failure is not a setback. It shows you where the foundation is still weak. Refine it, understand it, and try again; build it layer by layer.', 'Your Martial-Formation Foundation may not grow as quickly as others, but it will give you exceptional control, strategy and battlefield adaptability.'],
};
const sageAdviceFor = id => { const a = SAGE_ADVICE[id]; if(!a) return ''; const s = typeof cultStage === 'function' ? cultStage(id) : 0; return a[s >= 4 ? 2 : s >= 2 ? 1 : 0]; };
const sageCounselDone = () => !!(G.bondDay && G.bondDay.sage === G.day);
const sageCandidates = () => Object.keys(CULT_PATHS).filter(id => cultEligible(id) && G.party.includes(id) && !isAway(id));
function sageCounsel(id){
  if(!sageOpen()) return ['The Sage has not joined the party yet.'];
  if(sageCounselDone()) return ['The Sage has already counselled someone today. Ask again after the next day passes.'];
  if(!sageCandidates().includes(id)) return ['That companion is not on a cultivation path with the party right now.'];
  G.bondDay = G.bondDay || {}; G.bondDay.sage = G.day; G.cult = G.cult || {};
  const before = cultStage(id); G.cult[id] = cultLibPts(id) + SAGE_COUNSEL_PTS;
  const after = cultStage(id), out = ['🧙 The Sage counsels '+first(id)+' on '+CULT_PATHS[id].n+':', '“'+sageAdviceFor(id)+'”', '🧘 +'+SAGE_COUNSEL_PTS+' points on '+CULT_PATHS[id].n+'.'];
  if(after > before){ out.push('✦ '+first(id)+' reaches stage '+after+' ('+CULT_STAGE_NAMES[after-1]+'). '+CULT_PATHS[id].line); if(typeof chronicle === 'function') chronicle(first(id)+' reached the stage of '+CULT_STAGE_NAMES[after-1]+' under the Sage\'s counsel.', '🧙'); }
  else if(cultStageRaw(id) > after) out.push('(Their understanding is ahead of what the story has opened: the next stage waits.)');
  save(); return out;
}
function rSage(){
  if(!sageOpen()) return `<h2>The Sage</h2><div class="sm">The Sage has not joined the party yet.</div>`;
  const done = sageCounselDone();
  const rows = sageCandidates().map(id => `<div class="ev"><div><b>${CULT_PATHS[id].icon} ${first(id)}</b> <span class="sm">${CULT_PATHS[id].n} · ${cultStage(id) ? 'stage '+cultStage(id)+' ('+CULT_STAGE_NAMES[cultStage(id)-1]+')' : 'not yet at stage 1'}</span><div class="sm"><i>“${sageAdviceFor(id)}”</i></div></div><button class="pri" ${done?'disabled':''} onclick="act(()=>sageCounsel('${id}'))">Ask for counsel</button></div>`).join('');
  return `<h2>🧙 The Sage</h2>${flashHtml()}
    <div class="panel"><div class="sm">The Sage (賢者) is an independent travelling scholar who guides the party: a keeper of knowledge with insight into fate and soul lineage, who gave Xiyu the World-Bridge Compass. He is not a fighter and has no place in battle. Once a day he will counsel one companion on their cultivation path: ${done ? 'he has already counselled someone today.' : 'he is ready to counsel someone today.'}</div>
    <details style="margin-top:6px"><summary class="sm">Character reference</summary><img class="pg" src="assets/sage_reference.webp" alt="The Sage, character visual reference" style="max-width:100%"></details></div>
    <h4>Counsel</h4>${rows || '<div class="sm">Nobody is on a cultivation path yet.</div>'}
    ${typeof rCultivation === 'function' ? rCultivation() : ''}`;
}
