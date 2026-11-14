/* =====================================================================
   CULTIVATION PATHS (Ice Library)
   The daily study session in the Ice Library (Ice Temple base, Research) now also trains the cultivation of the people whose path it suits.
   Eligible (author): Xiyu, Cangyuan, Qiumin, Ya'Xing, Zhilei. Not eligible: Xiao Tian (a bottleneck the library cannot break; opens if the story sets the flag
   xiao_tian_bottleneck_broken), Dongyue (a healer: magic scrolls do not help his path), Xining, Yun He and Yun Long (do not need it). Su Liechen: undecided (his
   Subdue path is sealing and restraint; see his entry in the Research panel).
   Each session gives every eligible person with the party +4 points (active party; the rest of the party +2). Five stages, each opened by the story (a stage cap by chapter, so a
   long grind cannot outrun the story). A stage gives permanent bonuses to that path's stats. State: G.cult = {id: points}. First-pass numbers, edit freely.
   ===================================================================== */
const CULT_PTS = [8, 24, 48, 84, 132];            // points needed for stage 1..5
const CULT_CAP_CH = [661, 690, 720, 750, 775];     // chapter that opens each stage
const CULT_PATHS = {
  xiyu:     {n:'The Crimson Moon Path', icon:'🌙', per:{mag:.03, mp:.03}, line:'Her blood-moon power settles into something she can hold.'},
  cangyuan: {n:'The Thread Path', icon:'🧵', per:{mag:.03, spd:.02}, line:'The spirit threads answer faster and finer.'},
  qiumin:   {n:'The Scholar\'s Path', icon:'📖', per:{mag:.03, mp:.03}, line:'Reading the old records sharpens her reasoning into something near insight.'},
  yaxing:   {n:'The Steady Path', icon:'⚓', per:{atk:.03, spd:.02}, line:'His breathing steadies and his aim grows quieter.'},
  zhilei:   {n:'The Resonance Path', icon:'🔔', per:{mag:.03, mp:.03}, line:'The Moon-Echo Bell rings a little clearer each time.'},
};
const CULT_NOT = {
  xiaotian:'A bottleneck holds his cultivation; study cannot break it.',
  dongyue:'A healer: magic scrolls do nothing for his path.',
  xining:'Does not need it.', yunhe:'Does not need it.', yunlong:'Does not need it.',
  suliechen:'Undecided: his Subdue path is sealing and restraint, not scrolls. To be decided.',
};
const cultPts = id => ((G.cult || {})[id]) || 0;
const cultStageRaw = id => CULT_PTS.filter(p => cultPts(id) >= p).length;
const cultStage = id => Math.min(cultStageRaw(id), CULT_CAP_CH.filter(c => G.ch >= c).length);
function cultEligible(id){
  if(id === 'xiaotian') return !!(G.flags && G.flags.xiao_tian_bottleneck_broken) && !!CULT_PATHS.xiaotian;
  return !!CULT_PATHS[id];
}
function cultMult(id){
  const p = CULT_PATHS[id]; if(!p || !G || !G.cult) return null;
  const s = cultStage(id); return s ? Object.keys(p.per).reduce((o,k) => { o[k] = 1 + p.per[k]*s; return o; }, {}) : null;
}
function cultStudy(out){
  G.cult = G.cult || {};
  Object.keys(CULT_PATHS).filter(id => G.party.includes(id) && !isAway(id) && cultEligible(id)).forEach(id => {
    const before = cultStage(id), gain = G.active.includes(id) ? 4 : 2;
    G.cult[id] = cultPts(id) + gain;
    const after = cultStage(id), p = CULT_PATHS[id];
    out.push('🧘 '+first(id)+' studies the old texts (+'+gain+' on '+p.n+').');
    if(after > before){ out.push('✦ '+first(id)+' reaches stage '+after+' of '+p.n+'. '+p.line);
      if(typeof chronicle === 'function') chronicle(first(id)+' reached stage '+after+' of '+p.n+'.', '🧘'); }
    else if(cultStageRaw(id) > after) out.push('   (Their understanding is ahead of what the story has opened: the next stage waits.)');
  });
}
function rCultivation(){
  const ids = Object.keys(CULT_PATHS).filter(id => G.party.includes(id) || cultPts(id) > 0 || true);
  const rows = ids.map(id => {
    const p = CULT_PATHS[id], here = G.party.includes(id) && !isAway(id), s = cultStage(id), pts = cultPts(id), nxt = CULT_PTS[Math.min(s, CULT_PTS.length-1)];
    const cap = s < cultStageRaw(id) ? ' · next stage opens with the story' : '';
    const bonus = s ? Object.keys(p.per).map(k => k.toUpperCase()+' +'+Math.round(p.per[k]*s*100)+'%').join(' · ') : 'no bonus yet';
    return `<div class="ev"><div><b>${p.icon} ${CHARACTERS[id] ? first(id) : id}: ${p.n}</b> <span class="sm">stage ${s}/5 · ${pts} pts${cap}</span><div class="sm">${bonus}${here ? '' : ' · not with the party'}</div>${bar(Math.min(pts, CULT_PTS[CULT_PTS.length-1]), CULT_PTS[CULT_PTS.length-1])}</div></div>`; }).join('');
  const not = Object.keys(CULT_NOT).filter(id => CHARACTERS[id]).map(id => `<div class="sm">${CHARACTERS[id].icon} ${first(id)}: ${id==='xiaotian' && cultEligible(id) ? 'bottleneck broken' : CULT_NOT[id]}</div>`).join('');
  return `<div class="panel"><b>🧘 Cultivation</b><div class="sm">The daily study also trains the cultivation of those whose path the library suits: +4 points for the active party, +2 for the rest of the party. Each stage gives lasting bonuses and opens as the story does.</div>${rows}<h4>Not on the library's path</h4>${not}</div>`;
}
