/* =====================================================================
   CULTIVATION PATHS (Volume 26, comics 006-017: the Sage's lessons; and the Ice Library study)
   The Sage teaches cultivation in five stages: sensing, gathering, refining, circulating, strengthening. Each companion has their own foundation and path (chapter 809).
   Xiyu: the celestial and lunar lineage. Cangyuan: the Forbidden Spirit Weaver foundation. Liechen: his newly awakened powers. Ya'Xing: his unusual abilities. Qiumin: her own aptitude.
   Zhilei: a rare, sensitive foundation. Hoko: a path from his background and resilience. Xiao Yan: perception, agility and spiritual sensitivity.
   XIAO TIAN cannot cultivate directly (chapter 816: his foundation may not suit it; what he understands may open another path): no path yet, to be written.
   Dongyue (a healer), Xining, Yun He and Yun Long do not need it.
   POINTS: the lessons count (each of chapters 810-820 gives every cultivator 4 points, and Xiyu and Cangyuan 2 more for each of 815-819, their paired work), and the daily study in the
   Ice Library adds 4 (active party) or 2 (rest of the party). Stage thresholds below. A stage is held back until the story opens it (CULT_CAP): stages 1-3 open at chapters 810, 812 and 814.
   Stage 4 is the FIRST BOUNDARY: Xiyu and Cangyuan cross it together at chapter 819 (flag xiyu_and_cangyuan_cross_the_first_boundary_together, which also gives them a lasting +5% on their
   path's stats); nobody else has a stage 4 or 5 until the author writes it. Each stage gives +3% to that path's stats. First-pass numbers, edit freely.
   State: G.cult = {id: library points}; story points are computed from the chapter reached, so old saves and the dev jump catch up on their own.
   ===================================================================== */
const CULT_PTS = [8, 24, 48, 84, 132];
const CULT_STAGE_NAMES = ['Sensing', 'Gathering', 'Refining', 'Circulating', 'Strengthening'];
const CULT_CAP_CH = [810, 812, 814, 819, Infinity];     // chapter that opens each stage (stage 4 only for those who cross the first boundary)
const CULT_BOUNDARY_FLAG = 'xiyu_and_cangyuan_cross_the_first_boundary_together';
const CULT_BOUNDARY = ['xiyu', 'cangyuan'];
const CULT_PATHS = {
  xiyu:       {n:'The Celestial and Lunar Lineage', icon:'🌙', per:{mag:.03, mp:.03}, line:'Her celestial essence settles like moonlight returning to its source.'},
  cangyuan:   {n:'The Forbidden Spirit Weaver Path', icon:'🧵', per:{mag:.03, spd:.02}, line:'The once-volatile threads flow in a more controlled pattern.'},
  suliechen:  {n:'The Awakened Path', icon:'👁️', per:{atk:.02, spd:.03}, line:'His newly awakened senses grow steadier and easier to read.'},
  yaxing:     {n:'The Steady Foundation', icon:'⚓', per:{atk:.03, spd:.02}, line:'His breathing steadies and the unusual flow within him grows stronger.'},
  qiumin:     {n:'The Scholar\'s Aptitude', icon:'📖', per:{mag:.03, mp:.03}, line:'The flow comes gently, like spring water, and circulates without strain.'},
  zhilei:     {n:'The Sensitive Foundation', icon:'🔔', per:{mag:.03, mp:.03}, line:'She senses the energy around her in finer detail and keeps her own circulation steadier.'},
  hoko:       {n:'The Resilient Foundation', icon:'🧭', per:{hp:.03, def:.03}, line:'The restless flow settles into a steady, comfortable rhythm.'},
  yanwatcher: {n:'Perception and Agility', icon:'🍃', per:{spd:.03, mp:.02}, line:'His perception sharpens: movement, sound, even small changes in the energy around him.'},
};
const CULT_NOT = {
  xiaotian:'Cannot cultivate directly (chapter 816): the structure of his foundation may not suit it, and what he understands may one day open another path. His own path is still to be written.',
  dongyue:'A healer: magic scrolls do nothing for his path.',
  xining:'Does not need it.', yunhe:'Does not need it.', yunlong:'Does not need it.',
};
const cultStoryPts = id => {
  let p = 4 * Math.max(0, Math.min(G.ch, 820) - 809);
  if(CULT_BOUNDARY.includes(id)) p += 2 * Math.max(0, Math.min(G.ch, 819) - 814);
  return p;
};
const cultLibPts = id => ((G.cult || {})[id]) || 0;
const cultPts = id => cultLibPts(id) + cultStoryPts(id);
const cultBoundaryCrossed = id => CULT_BOUNDARY.includes(id) && !!(G.flags && G.flags[CULT_BOUNDARY_FLAG]);
const cultStageRaw = id => CULT_PTS.filter(p => cultPts(id) >= p).length;
function cultStageCap(id){
  let cap = 0; CULT_CAP_CH.forEach((c, i) => { if(G.ch >= c && (i !== 3 || cultBoundaryCrossed(id))) cap = i + 1; });
  return cap >= 4 && !cultBoundaryCrossed(id) ? 3 : cap;
}
const cultStage = id => Math.min(cultStageRaw(id), cultStageCap(id));
const cultEligible = id => !!CULT_PATHS[id] && G.ch >= 809;
function cultMult(id){
  const p = CULT_PATHS[id]; if(!p || !G || G.ch < 809) return null;
  const s = cultStage(id), b = cultBoundaryCrossed(id) ? .05 : 0;
  if(!s && !b) return null;
  return Object.keys(p.per).reduce((o, k) => { o[k] = 1 + p.per[k]*s + b; return o; }, {});
}
function cultStudy(out){
  if(G.ch < 809) return;
  G.cult = G.cult || {};
  Object.keys(CULT_PATHS).filter(id => G.party.includes(id) && !isAway(id)).forEach(id => {
    const before = cultStage(id), gain = G.active.includes(id) ? 4 : 2;
    G.cult[id] = cultLibPts(id) + gain;
    const after = cultStage(id), p = CULT_PATHS[id];
    out.push('🧘 '+first(id)+' studies and practises (+'+gain+' on '+p.n+').');
    if(after > before){ out.push('✦ '+first(id)+' reaches stage '+after+' ('+CULT_STAGE_NAMES[after-1]+') of '+p.n+'. '+p.line);
      if(typeof chronicle === 'function') chronicle(first(id)+' reached the stage of '+CULT_STAGE_NAMES[after-1]+'.', '🧘'); }
    else if(cultStageRaw(id) > after) out.push('   (Their understanding is ahead of what the story has opened: the next stage waits.)');
  });
}
function rCultivation(){
  if(G.ch < 809) return `<div class="panel"><b>🧘 Cultivation</b><div class="sm">The Sage's lessons (Volume 26) have not begun yet.</div></div>`;
  const rows = Object.keys(CULT_PATHS).map(id => {
    const p = CULT_PATHS[id], here = G.party.includes(id) && !isAway(id), s = cultStage(id), pts = cultPts(id), top = CULT_PTS[CULT_PTS.length-1];
    const wait = cultStageRaw(id) > s ? ' · the next stage waits for the story' : '';
    const bonus = (s || cultBoundaryCrossed(id)) ? Object.keys(p.per).map(k => k.toUpperCase()+' +'+Math.round((p.per[k]*s + (cultBoundaryCrossed(id) ? .05 : 0))*100)+'%').join(' · ') : 'no bonus yet';
    return `<div class="ev"><div><b>${p.icon} ${CHARACTERS[id] ? first(id) : id}: ${p.n}</b> <span class="sm">${s ? 'stage '+s+' ('+CULT_STAGE_NAMES[s-1]+')' : 'not yet at stage 1'}${cultBoundaryCrossed(id) ? ' · 🌕 crossed the first boundary' : ''} · ${pts} pts${wait}</span><div class="sm">${bonus}${here ? '' : ' · not with the party'}</div>${bar(Math.min(pts, top), top)}</div></div>`; }).join('');
  const not = Object.keys(CULT_NOT).filter(id => CHARACTERS[id]).map(id => `<div class="sm">${CHARACTERS[id].icon} ${first(id)}: ${CULT_NOT[id]}</div>`).join('');
  return `<div class="panel"><b>🧘 Cultivation</b><div class="sm">The Sage teaches five stages: sensing, gathering, refining, circulating and strengthening. The lessons in the story count, and the daily study here adds +4 points for the active party and +2 for the rest. A stage opens only as the story does; the first boundary is crossed in the story.</div>${rows}<h4>Not on this path</h4>${not}</div>`;
}
