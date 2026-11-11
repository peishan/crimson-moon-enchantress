/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — THE DARK SHRINES (Four Commanders side system)
   A gameplay side system, NOT a main-story arc. Unlocked at the end of Volume 21 (chapter 675), where the story only mentions Xiyu receiving reports.
   Concealed ritual sites (a pool of ten, expandable) hold SOUL FRAGMENTS of the Four Commanders (Bai Xuancheng North, Yan Lingzhao South, Lin Qingheng East, Yan Chixiao West).
   Per save, 16-20 fragments are dealt at random across the shrines (each Commander has a memory, will, spirit and power fragment, and some a fifth);
   the four Commanders themselves never change. Loop: a lead (the first at chapter 675, then daily check-ins in Xiyu's network) reveals a shrine ->
   fight its guardians -> recover its fragments (unidentified) -> study them in the Ice Library (resonance hints, then identification) ->
   stabilise a Commander's presence (3+ identified fragments including the spirit fragment; complete when every fragment is found) -> the Commander gives LIMITED
   help: a small battle blessing for the party and a daily word of counsel. No Commander is resurrected or becomes a party member, no truth is revealed.
   Safeguards: the party never raids current Muxue clan bases; routine investigation does not alert Muxue Zhiyuan; nothing explains the disappearance or Muxue Yan's actions.
   Save data: G.shrines = {gen, order:[ids], frags:{shrineId:[{fid,cmd,type}]}, found:{id:true}, cleared:{id:true}, pool:[{fid,shrine,cmd,type,ident}], rec:{cmd:'partial'|'complete'}}.
   ===================================================================== */
const SHRINE_UNLOCK_CH = 675;
const CMDS = [
  {id:'north', n:'Bai Xuancheng 白玄承', dir:'North', title:'Commander of the North', sym:'⛰️ Mountain', aid:'Mountain: the party\'s DEF'},
  {id:'south', n:'Yan Lingzhao 燕凌昭', dir:'South', title:'Commander of the South', sym:'🔥 Flame', aid:'Flame: the party\'s ATK and MAG'},
  {id:'east',  n:'Lin Qingheng 林清衡',  dir:'East', title:'Commander of the East',  sym:'🐉 Dragon', aid:'Dragon: the party\'s SPD'},
  {id:'west',  n:'Yan Chixiao 燕赤霄',  dir:'West', title:'Commander of the West',  sym:'🕊️ Bird', aid:'Bird: a gentle regeneration at the start of battle'},
];
const FRAG_TYPES = {
  memory:{n:'Memory Fragment', icon:'📜', d:'retains impressions, memories or knowledge'},
  will:{n:'Will Fragment', icon:'🔥', d:'preserves personality, determination and identity'},
  spirit:{n:'Spirit Fragment', icon:'✨', d:'holds the core spiritual presence'},
  power:{n:'Power Fragment', icon:'⚡', d:'retains a portion of former authority or ability'},
};
/* Proposed world-map distribution (author, conceptual: the world's compass layout is not locked). stage 1-5 = availability tier (Early, Expanding, Mid, Late, Final);
   grp = region group on the Dark Shrines screen. The Ice Temple itself is NOT a shrine; Silent Snow lies in a distant northern region. */
const SHRINE_GROUPS = {north:'Northern region', west:'Western and central regions', east:'Eastern region', south:'Southern region', unknown:'Uncharted region'};
const STAGE_NAMES = {1:'First discoveries', 2:'Expanding investigation', 3:'Deeper exploration', 4:'Advanced exploration', 5:'Final discovery'};
const STAGE_NEEDS = {1:0, 2:1, 3:3, 4:6, 5:8};   // shrines cleared before a lead can reveal a shrine of that stage
const SHRINES = [
  {id:'hollow_mountain', n:'Shrine of the Hollow Mountain', icon:'⛰️', region:'Shattered Ridge', where:'Northern mountain range', grp:'north', stage:2, off:1, guard:['shrine_warden','ancient_sentinel'], desc:'A ruined shrine hidden inside a mountain cavern. Its walls are covered in old spiritual restraints.'},
  {id:'withered_roots', n:'Shrine of Withered Roots', icon:'🌳', region:'Yunling outskirts', where:'Western forest region', grp:'west', stage:1, off:1, guard:['soulbound_guardian','demonic_beast'], desc:'An abandoned forest sanctuary where corrupted roots have grown around the central altar.'},
  {id:'still_water', n:'Shrine Beneath the Still Water', icon:'💧', region:'Puying', where:'Offshore underground lake and cavern system (a ship is needed)', grp:'south', stage:3, off:2, guard:['soulbound_guardian','shrine_warden'], desc:'A submerged shrine accessible through an underground lake. Its guardians remain active beneath the water.'},
  {id:'dying_sun', n:'Shrine of the Dying Sun', icon:'🌅', region:'Western frontier', where:'Far western desert', grp:'west', stage:4, off:2, guard:['shadow_cultivator','ancient_sentinel'], desc:'A buried desert sanctuary whose seals react to sunlight and celestial conditions.'},
  {id:'broken_precipice', n:'Shrine at the Broken Precipice', icon:'🏔️', region:'Mountain frontier', where:'Eastern highlands', grp:'east', stage:3, off:2, guard:['ancient_sentinel','demonic_beast'], desc:'A cliffside shrine accessible by a dangerous mountain path, protected by ancient sentinels.'},
  {id:'silent_snow', n:'Shrine of the Silent Snow', icon:'❄️', region:'Distant northern mountains', where:'Far north, separate from the Ice Temple itself', grp:'north', stage:4, off:2, guard:['shrine_warden','soulbound_guardian'], desc:'A forgotten sanctuary beneath a frozen valley. Its spiritual energy has become unnaturally cold.'},
  {id:'drowned_veil', n:'Shrine of the Drowned Veil', icon:'🌫️', region:'Southern wetlands', where:'Southern marshlands', grp:'south', stage:3, off:2, guard:['demonic_beast','shadow_cultivator'], desc:'A shrine surrounded by poisonous marshland and illusionary spiritual mists.'},
  {id:'old_city', n:'Shrine Beneath the Old City', icon:'🏚️', region:'Sanggui outskirts', where:'Abandoned settlement above ancient ruins', grp:'west', stage:2, off:1, guard:['shadow_cultivator','shrine_warden'], desc:'A concealed ritual chamber beneath an abandoned settlement. Its entrance is hidden behind an ordinary ruin.'},
  {id:'broken_bridge', n:'Shrine of the Broken Bridge', icon:'🌉', region:'Yilong frontier', where:'Remote gorge along an old travel route', grp:'east', stage:1, off:1, guard:['soulbound_guardian','ancient_sentinel'], desc:'A remote sanctuary connected by broken bridges and unstable spiritual pathways.'},
  {id:'nameless', n:'The Nameless Shrine', icon:'🕳️', region:'Unknown region', where:'Hidden outside ordinary maps; its position is concealed until enough clues are gathered', grp:'unknown', stage:5, off:3, guard:['shrine_warden','soulbound_guardian','shadow_cultivator','demonic_beast','ancient_sentinel'], desc:'A sealed site absent from surviving maps. It may be the oldest shrine in the network.'},
];
Object.assign(ENEMIES, {
  shrine_warden:{n:'Shrine Warden',icon:'🛡️',hp:150,atk:18,mag:0,def:11,spd:9,xp:70,gold:34,moves:[{n:'Warden\'s Strike',pow:1.1},{n:'Seal Slam',pow:.8,fx:[{k:'slow',d:2}]}],drops:[{id:'ice_crystal',chance:.35}],desc:'A former protector of the shrine, corrupted by its spiritual energy.'},
  soulbound_guardian:{n:'Soulbound Guardian',icon:'👻',hp:120,atk:6,mag:19,def:7,spd:12,xp:72,gold:34,traits:['magic'],moves:[{n:'Wailing Light',pow:1.1,spell:true},{n:'Grief Wave',pow:.7,spell:true,all:true}],drops:[{id:'rift_shard',chance:.3}],desc:'A construct animated by fragments of trapped souls.'},
  shadow_cultivator:{n:'Shadow Cultivator',icon:'🥷',hp:130,atk:15,mag:15,def:8,spd:14,xp:78,gold:40,moves:[{n:'Shadow Cut',pow:1.2},{n:'Seal Maintenance',pow:.6,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'imp_ash',chance:.4}],desc:'A practitioner who keeps the shrine\'s seals in order.'},
  demonic_beast:{n:'Corrupted Shrine Beast',icon:'👹',hp:170,atk:20,mag:0,def:9,spd:13,xp:74,gold:36,moves:[{n:'Rending Claws',pow:1.2},{n:'Frenzy',pow:1.5}],drops:[{id:'wolf_pelt',chance:.4}],desc:'A creature drawn to the shrine\'s concentrated spiritual corruption.'},
  ancient_sentinel:{n:'Ancient Sentinel',icon:'🗿',elite:true,hp:300,atk:24,mag:0,def:20,spd:7,xp:150,gold:80,moves:[{n:'Sentinel\'s Blow',pow:1.3},{n:'Crushing Step',pow:.9,all:true}],drops:[{id:'ice_crystal',chance:.6},{id:'ward_silk',chance:.2}],desc:'A non-human guardian that attacks anyone approaching the sealed chamber.'},
});

const shrinesOpen = () => !!G && G.ch >= SHRINE_UNLOCK_CH;
const shrineById = id => SHRINES.find(s => s.id === id);
const cmdById = id => CMDS.find(c => c.id === id);
function SH(){
  if(!G.shrines || !G.shrines.gen){
    const frags = []; let n = 0;
    CMDS.forEach(c => { Object.keys(FRAG_TYPES).forEach(t => frags.push({fid:'f'+(n++), cmd:c.id, type:t})); if(Math.random() < .5){ const ts = Object.keys(FRAG_TYPES); frags.push({fid:'f'+(n++), cmd:c.id, type:ts[Math.floor(Math.random()*ts.length)]}); } });
    const shuf = a => { for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
    shuf(frags); const order = shuf(SHRINES.map(s => s.id)), by = {}; order.forEach(id => by[id] = []);
    frags.forEach(f => by[order[Math.floor(Math.random()*order.length)]].push(f));   // independent of the map: a shrine may hold zero, one or several fragments (clues and guardians only)
    G.shrines = {gen:true, order, frags:by, found:{}, cleared:{}, pool:[], rec:{}, extra:{}};
  }
  return G.shrines;
}
const fragTotal = cmd => { const s = SH(); let n = 0; Object.keys(s.frags).forEach(id => s.frags[id].forEach(f => { if(f.cmd === cmd) n++; })); return n; };
const fragHave = cmd => SH().pool.filter(f => f.cmd === cmd).length;
const fragIdent = cmd => SH().pool.filter(f => f.cmd === cmd && f.ident).length;
const shrinesCleared = () => Object.keys(SH().cleared).length;
function shrineDiscover(msgs){
  const s = SH(), c = shrinesCleared();
  const cands = SHRINES.filter(sh => !s.found[sh.id] && c >= STAGE_NEEDS[sh.stage]);
  if(!cands.length) return false;
  const st = Math.min.apply(null, cands.map(x => x.stage)), pool = cands.filter(x => x.stage === st), sh = pool[Math.floor(Math.random()*pool.length)];
  s.found[sh.id] = true;
  msgs.push(sh.id === 'nameless'
    ? '🕯️ Enough clues from the earlier shrines line up: a site missing from every map. The Nameless Shrine (position now known to Xiyu).'
    : '🕯️ A lead reaches Xiyu\'s network: '+sh.n+' ('+sh.region+', '+sh.where.toLowerCase()+'). Concealed sites like this hold the Four Commanders\' scattered soul fragments.');
  return true;
}
function shrineUnlock(){ const msgs = ['🕯️ Reports begin to reach Xiyu through her network: concealed ritual sites, far from any clan base, that the temple\'s records and the bell hint at. (Dark Shrines: Bases > Ice Temple Base > Dark Shrines.)']; shrineDiscover(msgs); save(); return msgs; }
function shrineOnCheckIn(msgs){ if(shrinesOpen() && Math.random() < .3) shrineDiscover(msgs); }

function enterShrine(id){
  const s = SH(), sh = shrineById(id); if(!sh || !s.found[id] || s.cleared[id]) return;
  const lv = Math.max(1, avgPartyLv() + sh.off), pick = () => sh.guard[Math.floor(Math.random()*sh.guard.length)];
  const normal = k => ({key:k, lv:Math.max(1, lv + Math.floor(Math.random()*3) - 1)});
  const n1 = Math.min(4, 2 + Math.floor(G.active.length/4));
  const first = Array.from({length:n1}, () => normal(pick()));
  const boss = [{key:'ancient_sentinel', lv:lv+1}, normal(pick())];
  origin = 'base';
  startBattle({stages:[{foes:first, msg:'The party enters '+sh.n+'. Its guardians stir.'}, {foes:boss, msg:'The sealed chamber: something heavier moves in the dark.'}], foes:first, rewards:true, zone:null,
    onWin: () => shrineWin(id)});
  tab = 'battle'; render();
}
function shrineWin(id){
  const s = SH(), sh = shrineById(id), msgs = ['🕯️ The seals of '+sh.n+' fall silent.'];
  if(s.cleared[id]) return msgs;
  s.cleared[id] = true;
  const got = s.frags[id] || [];
  got.forEach(f => s.pool.push({fid:f.fid, shrine:id, cmd:f.cmd, type:f.type, ident:false}));
  const left = SHRINES.filter(x => !s.cleared[x.id]).length; if(!got.length) msgs.push('The chamber holds only guardians and old seals, but the carvings add to the party\'s clues.');
  if(got.length) msgs.push('💠 Recovered '+got.length+' soul fragment'+(got.length>1?'s':'')+' (unidentified). Study them in the Ice Library to learn whom they belong to.'); 
  const inv = (typeof invById === 'function') && invById('commanders'); if(inv) invAdd(inv, 4, msgs);
  G.gold += 60 + 4*(avgPartyLv()%50); save(); return msgs;
}

/* resonance groups among UNIDENTIFIED fragments (same Commander) */
function resonance(){
  const un = SH().pool.filter(f => !f.ident), g = {}; un.forEach(f => (g[f.cmd] = g[f.cmd] || []).push(f.fid));
  const out = {}; Object.keys(g).forEach((c, i) => g[c].forEach(fid => out[fid] = {size:g[c].length, tag:String.fromCharCode(945+i)})); return out;
}
function doStudyFragment(){
  if(typeof iceHere === 'function' && !iceHere()) return ['The party must be at the Ice Temple (the library) to study fragments.'];
  const s = SH(); G.bondDay = G.bondDay || {};
  if(G.bondDay.frag === G.day) return ['The party has already studied a fragment today.'];
  const un = s.pool.filter(f => !f.ident); if(!un.length) return ['There is no unidentified fragment to study.'];
  const res = resonance(); un.sort((a,b) => (res[b.fid].size - res[a.fid].size) + (Math.random()-.5)*.5);
  const f = un[0]; f.ident = true; G.bondDay.frag = G.day; const c = cmdById(f.cmd), t = FRAG_TYPES[f.type];
  const out = ['🔍 After a day of study the party reads the fragment\'s signature: a '+t.icon+' '+t.n+' of the '+c.n+' ('+c.title+', '+c.sym+').'];
  if(fragIdent(f.cmd) >= 3 && SH().pool.some(x => x.cmd === f.cmd && x.type === 'spirit' && x.ident) && !s.rec[f.cmd]) out.push('✦ Enough of the '+c.n+'\'s soul is identified to attempt to stabilise a presence.');
  save(); return out;
}
function doStabilise(cmd){
  const s = SH(), c = cmdById(cmd); if(!c) return [];
  if(typeof iceHere === 'function' && !iceHere()) return ['The party must be at the Ice Temple to attempt this.'];
  const have = fragIdent(cmd), spirit = s.pool.some(x => x.cmd === cmd && x.type === 'spirit' && x.ident), all = fragTotal(cmd);
  if(have === all && have > 0 && s.rec[cmd] !== 'complete'){ s.rec[cmd] = 'complete'; save(); return ['🕯️ Every fragment of the '+c.n+' is joined. A stable presence settles over the temple: not a body, not a return, only a steadier echo that can help in small ways.']; }
  if(have >= 3 && spirit && !s.rec[cmd]){ s.rec[cmd] = 'partial'; save(); return ['🕯️ The '+c.n+'\'s fragments hold together: a faint but stable presence. It can lend a little help, though much is still missing.']; }
  return ['The fragments are not enough yet (needs 3 identified, including the spirit fragment, for a partial presence; every fragment for a complete one).'];
}
const COUNSEL = {
  partial:['The presence answers with a feeling rather than words: patience.','A half-formed thought passes through the room: do not force what has been closed.','Something steadies the lamps for a moment, then is gone.'],
  complete:['"Keep the records safe. What was separated can be found, but it should not be rushed."','"Observe before you act. The old mechanisms remember how they were treated."','"You are not alone in asking. That has always been how these things are understood."'],
};
function doCounsel(){
  if(typeof iceHere === 'function' && !iceHere()) return ['The party must be at the Ice Temple.'];
  const s = SH(), recd = CMDS.filter(c => s.rec[c.id]); G.bondDay = G.bondDay || {};
  if(!recd.length) return ['No Commander has a stable presence yet.'];
  if(G.bondDay.counsel === G.day) return ['The Commanders have already spoken today.'];
  G.bondDay.counsel = G.day;
  const c = recd[Math.floor(Math.random()*recd.length)], lines = COUNSEL[s.rec[c.id]];
  const xp = Math.max(1, Math.round(storyXp(Math.max(1, G.ch)) * (s.rec[c.id] === 'complete' ? .3 : .15))), out = ['🕯️ The '+c.n+': '+lines[Math.floor(Math.random()*lines.length)]];
  gainXp(xp, G.active).forEach(m => out.push(m)); out.push('✦ Counsel: +'+xp+' XP to the active party.'); return out;
}
/* limited battle blessing: small, never a party member */
function commanderAid(){
  if(!shrinesOpen() || !G.shrines || !G.shrines.gen) return;
  const s = G.shrines; let any = false;
  CMDS.forEach(c => { const lv = s.rec[c.id]; if(!lv) return; const pct = lv === 'complete' ? .06 : .03; any = true;
    B.allies.forEach(a => {
      if(c.id === 'north') a.def = Math.round(a.def*(1+pct));
      if(c.id === 'south'){ a.atk = Math.round(a.atk*(1+pct)); a.mag = Math.round(a.mag*(1+pct)); }
      if(c.id === 'east') a.spd = Math.round(a.spd*(1+pct));
      if(c.id === 'west') applyFx(a, a, {k:'regen', v:lv === 'complete' ? .04 : .02, d:4});
    });
    blog('🕯️ The '+c.n+' lends a little help ('+c.aid+', +'+Math.round(pct*100)+'%'+(c.id==='west'?' regeneration':'')+').','sys'); });
}

function rShrines(){
  if(!shrinesOpen()) return '<div class="panel"><div class="sm">Not open yet.</div></div>';
  const s = SH(), res = resonance(), here = typeof iceHere === 'function' && iceHere();
  const found = SHRINES.filter(sh => s.found[sh.id]), hidden = SHRINES.length - found.length;
  const card = sh => { const cl = s.cleared[sh.id], known = s.found[sh.id];
    if(!known) return '';
    return `<div class="card" style="cursor:default"><span class="big">${sh.icon}</span><div class="fl"><b>${sh.n}</b> <span class="sm">${sh.region} · ${sh.where} · ${STAGE_NAMES[sh.stage]}</span><div class="sm">${sh.desc}</div>
      <div class="sm">Guardians: ${sh.guard.map(k => ENEMIES[k].icon+' '+ENEMIES[k].n).join(', ')}</div>
      ${cl ? '<div class="sm">✅ Seals silent: searched.</div>' : `<button class="pri" onclick="enterShrine('${sh.id}')">⚔️ Enter the shrine</button>`}</div></div>`; };
  const shr = Object.keys(SHRINE_GROUPS).map(g => { const list = SHRINES.filter(sh => sh.grp === g); const k = list.filter(sh => s.found[sh.id]);
    return `<h4>${SHRINE_GROUPS[g]} (${k.length}/${list.length} found)</h4>${k.length ? k.map(card).join('') : '<div class="sm">'+(g==='unknown' ? 'Its position is concealed until enough clues from the other shrines are gathered ('+STAGE_NEEDS[5]+' shrines searched).' : 'Nothing found here yet.')+'</div>'}`; }).join('');
  const poolRows = s.pool.map(f => { if(f.ident){ const t = FRAG_TYPES[f.type], c = cmdById(f.cmd); return `<div class="sm">${t.icon} ${t.n} · ${c.n} (${c.sym})</div>`; }
    const r = res[f.fid]; return `<div class="sm">💠 Unidentified fragment · ${r.size>=3 ? 'a clearer spiritual image (group '+r.tag+')' : r.size===2 ? 'a faint resonance (group '+r.tag+')' : 'no resonance yet'}</div>`; }).join('');
  const un = s.pool.filter(f => !f.ident).length, doneStudy = G.bondDay && G.bondDay.frag === G.day;
  const cmds = CMDS.map(c => { const hv = fragHave(c.id), id = fragIdent(c.id), st = s.rec[c.id];
    return `<div class="panel"><b>${c.sym} ${c.n}</b> <span class="sm">${c.title}</span> <span class="sm">${st ? (st==='complete' ? '· presence complete' : '· presence stable (partial)') : '· no presence'}</span>
      <div class="sm">Fragments: ${hv} recovered, ${id} identified${st==='complete' ? '' : ' (the full count is not known until all are found)'}${st==='complete' ? ' of '+fragTotal(c.id) : ''}. Help: ${c.aid}${st ? ' (+'+(st==='complete'?6:3)+'%)' : ''}.</div>
      ${here ? `<button onclick="act(()=>doStabilise('${c.id}'))">🕯️ Stabilise the presence</button>` : ''}</div>`; }).join('');
  return `<div class="panel"><b>🕯️ The Dark Shrines</b><div class="sm">Concealed ritual sites, far from any clan base, where the Four Commanders' souls were divided and kept. This is a side investigation: it explains nothing about why they vanished. Fragments are damaged parts of a soul, not power-ups. The party never raids current clan bases, and the clan administration is not alerted by this work. Shrines found: ${found.length}/${SHRINES.length} · searched: ${shrinesCleared()}${hidden ? ' · '+hidden+' still hidden: network check-ins bring leads, and later shrines need clues from earlier ones' : ''}. A shrine may hold several fragments, one, or none; fragments of one Commander lie in distant regions.</div></div>
    ${shr}
    <h4>Soul fragments (${s.pool.length})</h4>${poolRows || '<div class="sm">None recovered yet.</div>'}
    ${un ? `<div class="panel"><div class="sm">Study one fragment a day in the Ice Library: same-Commander fragments resonate with each other (two a faint resonance, three or more a clearer image).</div><button class="pri" ${doneStudy||!here?'disabled':''} onclick="act(doStudyFragment)">🔍 Study a fragment ${doneStudy?'(done today)':!here?'(at the Ice Temple)':''}</button></div>` : ''}
    <h4>The Four Commanders</h4>${cmds}
    ${CMDS.some(c => s.rec[c.id]) ? `<div class="panel"><div class="sm">The stable presences answer once a day with a word of counsel and a little XP.</div><button ${G.bondDay && G.bondDay.counsel === G.day || !here ? 'disabled' : ''} onclick="act(doCounsel)">🕯️ Seek the Commanders' counsel</button></div>` : ''}`;
}
