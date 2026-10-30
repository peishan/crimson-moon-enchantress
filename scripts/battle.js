/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — BATTLE (turn-based, adapted from Tribute)
   Used by chapter battles, the Wilds (real rewards) and the Training Room (sandbox).
   spec: { foes:[{key,lv}], allies?:[ids], rewards:bool, chapter?, firstClear?, onWin?, onLose? }
   ===================================================================== */
let B = null;
const alive = list => list.filter(u => !u.dead);

function mkAlly(id, persist){
  if(!G.party.includes(id)) U(id).lv = Math.max(1, avgPartyLv());   // story guest: fights at the party's level
  const s = statsOf(id), c = CHARACTERS[id], hp = persist && G.party.includes(id) ? curHp(id) : s.hp, mp = persist && G.party.includes(id) ? curMp(id) : s.mp;
  return { uid:id, id, ally:true, name:c.n, icon:c.icon, img:portrait(id), traits:[],
    hp:Math.max(hp,1), mhp:s.hp, mp, mmp:s.mp, atk:s.atk, mag:s.mag, def:s.def, spd:s.spd,
    st:{}, bf:[], state:null, used:{}, dead:false, guard:false, strain:0, treats:0,
    heat: id==='xiyu' ? (G.heat||0) : 0, glow: id==='xiyu' && (G.afterglow||0)>0,
    innateRes: id==='dongyue' ? .7 : 0, drunk: false, resMagic: (id==='yaxing' && G.flags.yaxing_rejoined ? .15 : 0) + gearFx(id).magRed, resPhys: gearFx(id).physRed, noSlow: !!gearFx(id).noSlow, mpRed: gearFx(id).mpRed, discRes: gearFx(id).discRes, fxPlus: gearFx(id).fxPlus };   // Ya'Xing's Spell Resistance (reduces, never immunity) + gear
}
function mkFoeUnit(key, lv, i, x){
  x = x || {};
  const u = Object.assign(mkEnemy(key, lv), { uid:'f'+i, ally:false, st:{}, bf:[], state:null, used:{}, dead:false, guard:false, known:false, perp:!!x.perp });
  if(u.traits.includes('layered') || x.formation) u.st.layer = {d:99};   // outer layer: halves damage until stripped
  return u;
}

/* ---------- effective stats ---------- */
function eff(u, stat){
  let v = u[stat];
  u.bf.forEach(b => { if(b.stat===stat) v *= b.m; });
  if(u.state && u.state.id==='bloodmoon' && stat==='mag') v *= 1.3;
  if(u.id==='xiyu' && stat==='mag'){ v *= heatMult(u.heat); if(u.glow) v *= 1.1; }
  if(stat==='spd' && u.st.slow) v *= .6;
  return v;
}
function evaOf(u){
  let m = 1; u.bf.forEach(b => { if(b.stat==='eva') m *= b.m; });
  return clamp((0.04 + eff(u,'spd')*0.003) * m, 0, .6);
}
const mpCost = (u,s) => Math.round(s.mp * (1 - (u.mpRed||0)) * ((u.state && u.state.id==='bloodmoon') ? .5 : 1) * (s.res ? 1 - .05*resLv() : 1) * ((u.id==='xining' && (s.kind==='heal'||s.id==='clear_spirit')) ? 1 - Math.min(.3, .05*(u.treats||0)) : 1));   // A Physician's Resolve
function blog(t, cls){ B.log.push({t, cls:cls||''}); if(B.log.length>60) B.log.shift(); }

/* ---------- start ---------- */
function startBattle(spec){
  const ids = spec.allies || G.active;
  const first0 = spec.stages ? spec.stages[0].foes : spec.foes;
  B = { allies:ids.map(id => mkAlly(id, !!spec.rewards)), foes:[], queue:[], cur:null, log:[], over:null, round:0, ui:{mode:'menu'}, spec, rewards:null, lead:spec.lead || null, stages:spec.stages || null, stage:0, src:null };
  B.foes = leadFoes(first0, ids);
  blog('Battle begins!','sys');
  if(B.stages){ blog(B.stages[0].msg,'sys'); }
  if(B.lead && spec.blessing) leadBlessing();
  const aids = B.allies.map(a => a.id);
  B.allies.forEach(a => { const sy = synergyOf(a.id, aids); if(sy.total > 0){ ['atk','mag','def','spd'].forEach(k => a[k] = Math.round(a[k]*(1+sy.total))); a.syn = sy; } });
  const pairA = B.allies.find(a => a.id==='xiyu' && a.syn && a.syn.bond), cg = B.allies.find(a => a.id==='cangyuan' && a.syn && a.syn.bond);
  if(pairA && cg) blog('🌹 Bond of Choice: Xiyu and Cangyuan fight with +'+Math.round(pairA.syn.total*100)+'% to ATK, MAG, DEF and SPD.','sys');
  PAIR_SYN.filter(p => pairSynActive(p, aids)).forEach(p => blog('🤝 '+first(p.a)+' and '+first(p.b)+': '+p.label+' (+'+Math.round(p.pct*100)+'%).','sys'));
  if(!(pairA && cg) && B.allies.some(a => a.syn && a.syn.comrade > 0)) blog('🤝 Comradeship: allies who trust each other fight a little better together.','sys');
  if(resLv()>=2 && B.allies.some(a => a.id==='xiyu') && B.allies.some(a => a.id==='cangyuan')){   // resonance awareness: limited, only severe disturbances
    B.foes.filter(f => f.st.layer || f.traits.includes('corrupt')).forEach(f => { f.known = true; blog('🌹 Crimson Thread: a severe disturbance in '+f.name+'.','sys'); }); }
  advance();
}

/* ---------- turn flow ---------- */
function buildQueue(){ B.queue = alive(B.allies).concat(alive(B.foes)).sort((a,b) => (eff(b,'spd') + Math.random()) - (eff(a,'spd') + Math.random())); }
function checkEnd(){
  if(B.lead && B.allies.some(a => a.id===B.lead && a.dead)){   // Dongyue may raise him; without him (or his strength) the fight is lost
    const dy = B.allies.find(a => a.id==='dongyue' && !a.dead), rite = CHARACTERS.dongyue.skills.find(x => x.id==='ancient_rite');
    if(!(dy && rite && dy.mp >= mpCost(dy, rite))){ B.over='lose'; blog(first(B.lead)+' has fallen, and no one can raise him.','bad'); persistBattle(); save(); return true; }
    if(!B.fallenWarned){ B.fallenWarned = true; blog(first(B.lead)+' has fallen! Dongyue can still raise him with the Ancient Healing Rite.','bad'); }
  }
  if(!alive(B.foes).length && B.stages && B.stage < B.stages.length-1){ nextStage(); return false; }
  if(!alive(B.foes).length){ B.over='win'; finishWin(); return true; }
  if(!alive(B.allies).length){ B.over='lose'; blog('The party has fallen...','bad'); persistBattle(); save(); return true; }
  return false;
}
function advance(){
  let guard = 400;
  while(guard-- > 0){
    if(checkEnd()) return;
    if(!B.queue.length){ B.round++; buildQueue(); blog('— Round '+B.round+' —','sys'); B.foes.forEach(f => { if(f.st.layer && B.round>=(f.layerAt||3) && !f.dead){ delete f.st.layer; blog(B.lead ? 'The formation falters: '+f.name+' is left exposed.' : 'The '+f.name+'\'s outer layer cracks on its own: the core is exposed.','good'); } }); }
    const u = B.queue.shift(); if(u.dead) continue;
    B.cur = u;
    if(u.st.burn){ const d = Math.max(1, Math.round(u.mhp*.06)); hurt(u,d,true); blog(u.name+' burns for '+d+'.','bad'); if(u.dead) continue; }
    if(u.st.regen){ const h = Math.round(u.mhp*u.st.regen.v); u.hp = Math.min(u.mhp, u.hp+h); blog(u.name+' regenerates '+h+'.','good'); }
    if(u.st.bind || u.st.charm){ blog(u.name+(u.st.bind?' is bound and cannot move.':' is charmed and loses the turn.')); if(!u.ally && u.st.fate) fateExploit(u,'its action is interrupted'); endTurn(u); continue; }
    if(u.ally){ B.ui = {mode:'menu'}; return; }
    foeAct(u); endTurn(u);
  }
}
function endTurn(u){
  ['burn','slow','bind','charm','silence','crit'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  ['thread','link','expose','ward','fate','quell'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  ['shield','regen','oath'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  u.bf = u.bf.filter(b => --b.d > 0);
  if(u.state && --u.state.d <= 0){ blog(u.name+'\'s Blood Moon fades.'); u.state = null; }
  u.guard = false;
}

/* ---------- damage ---------- */
function checkPhase(t){
  if(!t.phases || t.dead || t.ally) return;
  const next = t.phases[t.phaseIdx||0]; if(!next || t.hp/t.mhp > next.at) return;
  t.phaseIdx = (t.phaseIdx||0) + 1;
  blog('— '+next.msg+' —','sys');
  if(next.atk){ t.atk = Math.round(t.atk*next.atk); t.mag = Math.round(t.mag*next.atk); }
}
function hurt(t, d, ignoreShield){
  if(t.id==='xining' && t.ally && B.allies.some(a => a.id==='dongyue' && !a.dead)) d = Math.max(1, Math.round(d*.8));   // Quiet Sanctuary: Dongyue guards her
  if(!ignoreShield && t.st.shield){ const a = Math.min(t.st.shield.v, d); t.st.shield.v -= a; d -= a; if(a>0) blog('  (barrier absorbs '+a+')'); if(t.st.shield.v<=0) delete t.st.shield; }
  if(t.guard) d = Math.round(d*.5);
  if(t.perp && B.lead && !(B.src && B.src.id===B.lead) && t.hp - d <= 0){   // only the lead may finish the principal perpetrators
    d = Math.max(0, t.hp - 1);
    if(!t.st.bind){ t.st.bind = {d:3}; blog('  '+(B.src && B.src.ally ? first(B.src.id) : 'The party')+' holds '+t.name+' in place: '+first(B.lead)+' will finish this.','good'); }
  }
  t.hp = Math.max(0, t.hp - d);
  if(t.hp>0) checkPhase(t);
  if(t.hp<=0){ t.dead = true; blog(t.name+' falls!','bad'); }
  return d;
}
function strike(src, tgt, s, opts){
  opts = opts || {};
  const magic = s.kind==='magic', stat = magic?'mag':'atk';
  let raw = eff(src, stat) * (s.pow||1) * (0.9 + Math.random()*.2) * (opts.decay||1);
  if(B.lead && src.ally){   // lead mode: the others support; he is the one who fights
    if(src.id===B.lead){ if(B.allies.some(a => a.id==='xiyu' && !a.dead)) raw *= 1.1; if(B.allies.some(a => a.id==='cangyuan' && !a.dead)) raw *= 1.05; }
    else raw *= .6;
  }
  if(s.withAlly && B.allies.some(a => a.id===s.withAlly && !a.dead)) raw *= (s.boost||1.3);   // bond skills hit harder with the partner beside her
  raw -= eff(tgt,'def') * (magic ? .35 : .6);
  let d = Math.max(1, Math.round(raw));
  if(s.antiMagic && tgt.traits.includes('magic')) d = Math.round(d*s.antiMagic);
  if(tgt.ally){ const rs = magic ? tgt.resMagic : tgt.resPhys; if(rs) d = Math.max(1, Math.round(d*(1-rs))); }
  if(tgt.ally && magic && tgt.innateRes){   // Dongyue's natural resistance: relative to the strength of the attack (docs/MAGIC_RULES.md)
    if(src.overwhelm){ if(!B.overwhelmSeen){ B.overwhelmSeen = true; blog('  '+src.name+'\'s power overwhelms '+tgt.name+'\'s natural resistance to magic.','bad'); } }
    else { d = Math.max(1, Math.round(d*(1-tgt.innateRes))); if(!B.resistSeen){ B.resistSeen = true; blog('  '+tgt.name+'\'s natural resistance turns most of the spell aside.','good'); } }
  }   // spell resistance / physical guard
  if(tgt.st.expose) d = Math.round(d*1.15);   // Physician's Insight
  if(src.st && src.st.quell && magic) d = Math.max(1, Math.round(d*.6));   // Demon-quelling: the foe's spells weakened
  if(tgt.st.layer) d = Math.round(d*.5);       // the shadow's outer layer
  if(src.id==='xiyu' && resLv()>0 && (tgt.st.shield || tgt.st.layer || tgt.st.link) && B.allies.some(a => a.id==='cangyuan' && !a.dead)) d = Math.round(d*(1 + .08*resLv()));   // Crimson transformation: she breaks what his weaving alone cannot
  let crit = false;
  if(s.crit || src.st.crit || Math.random() < .08){ crit = true; d = Math.round(d*1.6); }
  if(Math.random() < evaOf(tgt)){ blog(tgt.name+' evades '+src.name+'\'s '+s.n+'!'); if(!src.ally && src.st && src.st.fate) fateExploit(src,'its action is evaded'); return 0; }
  s.landed = true;
  B.src = src; const dealt = hurt(tgt, d); B.src = null;
  blog(src.name+' uses '+s.n+' on '+tgt.name+': '+dealt+(crit?' CRIT!':''), src.ally?'':'foe');
  if(src.ally && tgt.st.link && !opts.noSpread){ const sp = Math.max(1, Math.round(dealt*.35)); alive(B.foes).filter(o => o!==tgt && o.st.link).forEach(o => { hurt(o, sp, true); blog('  the linked threads carry '+sp+' to '+o.name+'.'); }); }   // Ten Thousand Threads
  return dealt;
}

/* ---------- effects ---------- */
const FOE_FX = ['burn','slow','bind','charm','silence','drain'];
function applyFx(src, tgt, fx){
  if(fx.self && tgt!==src){ applyFx(src, src, fx); return; }   // effects aimed at the caster (strain, a self DEF drop)
  if(tgt.st && tgt.st.layer && ['expose','strip','cleanse','cleanse1'].includes(fx.k)){ delete tgt.st.layer; blog('  '+tgt.name+'\'s outer layer is stripped: the core is exposed!','good'); }
  switch(fx.k){
    case 'burn': case 'slow': case 'bind': case 'charm': case 'silence':
      if(tgt.ally && tgt.st.ward && Math.random()<.7){ blog('  '+tgt.name+' is protected by Still Waters.','good'); return; }
      if(tgt.ally && fx.k==='slow' && tgt.noSlow){ blog('  '+tgt.name+' holds steady.','good'); return; }
      if(tgt.ally && tgt.innateRes && (fx.k==='charm' || fx.k==='silence') && !tgt.drunk && !(src && src.overwhelm)){ blog('  '+tgt.name+'\'s natural resistance shrugs off the illusion.','good'); return; }   // a non-damaging illusion is normally resisted when sober
      if(tgt.ally && (tgt.resMagic||tgt.discRes) && (fx.k==='silence'||fx.k==='charm') && Math.random() < (tgt.resMagic||0)*2 + (tgt.discRes||0)){ blog('  '+tgt.name+' resists the spell.','good'); return; }
      const th = (tgt.st.thread && tgt.st.thread.n) || 0;
      if(tgt.boss && (fx.k==='bind'||fx.k==='charm') && Math.random() < Math.max(.1, .5 - .15*th)){ blog('  '+tgt.name+' resists!'); return; }
      if(tgt.st.link && !fx.spread){ alive(B.foes).filter(o => o!==tgt && o.st.link && Math.random()<.5).forEach(o => { blog('  the link carries it to '+o.name+'.'); applyFx(src, o, Object.assign({}, fx, {spread:true})); }); }
      tgt.st[fx.k] = {d:(fx.d||2) + (th?1:0) + ((src.id==='suliechen' && (fx.k==='bind'||fx.k==='slow')) ? 1 : 0) + (((src.fxPlus && (src.fxPlus[fx.k] || 0)) || 0))}; blog('  '+tgt.name+' is '+({burn:'burning',slow:'slowed',bind:'bound',charm:'charmed',silence:'silenced'})[fx.k]+'.'); break;
    case 'fate': { if(tgt.ally) break; const tier = tgt.boss ? 'boss' : tgt.elite ? 'elite' : 'plain'; if(tier==='elite' && src && src.mp !== undefined) src.mp = Math.max(0, src.mp - 3);
      tgt.st.fate = {d:(tier==='boss' ? 2 : 3)+1}; tgt.fateTier = tier; tgt.plan = planFor(tgt); tgt.fateText = fateText(tgt);
      blog('  A thread of fate settles on '+tgt.name+': '+tgt.fateText+'.','good'); break; }
    case 'sever': { if(!tgt.st.fate){ blog('  '+tgt.name+' carries no thread to cut.'); break; }
      const tier = tgt.boss ? 'boss' : tgt.elite ? 'elite' : 'plain', ch = tier==='boss' ? .3 : tier==='elite' ? .6 : 1;
      if(Math.random() >= ch){ blog('  '+tgt.name+' shrugs off the cut: its fate holds.'); break; }
      if(tier==='boss'){ const w = tgt.moves.filter(m => !m.all).sort((a,b) => (a.pow||1)-(b.pow||1))[0] || tgt.moves[0]; tgt.plan = {mv:w, tUid:(tgt.plan||{}).tUid}; tgt.fateText = fateText(tgt); blog('  '+tgt.name+'\'s prepared action is cut: it falls back on its weakest move.','good'); }
      else { tgt.st.bind = {d:1}; blog('  '+tgt.name+'\'s next action is severed: it will lose its turn.','good'); } break; }
    case 'quell': { tgt.st.quell = {d:3}; blog('  '+tgt.name+'\'s spells are quelled.','good'); if(!fx.nb && tgt.traits && tgt.traits.includes('magic')) applyFx(src, tgt, {k:'bind', d:2}); break; }
    case 'sense': { tgt.known = true; const sup = (tgt.traits||[]).includes('magic') || (tgt.traits||[]).includes('corrupt') || !!tgt.st.layer;
      blog('  '+tgt.name+': '+(sup ? 'a supernatural presence, exposed' : 'nothing hidden')+' (HP '+tgt.hp+'/'+tgt.mhp+', DEF '+tgt.def+').', sup ? 'good' : ''); if(sup) tgt.st.expose = {d:4}; break; }
    case 'buff': tgt.bf.push({stat:fx.stat,m:fx.m,d:(fx.d||3)+1}); blog('  '+tgt.name+' '+fx.stat.toUpperCase()+(fx.m>=1?' up':' down')+'.'); break;
    case 'shield': tgt.st.shield = {v:Math.round(tgt.mhp*fx.v), d:(fx.d||3)+1}; blog('  '+tgt.name+' gains a barrier.'); break;
    case 'regen': tgt.st.regen = {v:fx.v, d:(fx.d||3)+1}; break;
    case 'crit': tgt.st.crit = {d:(fx.d||2)+1}; blog('  '+tgt.name+' sees the openings (crits).'); break;
    case 'oath': tgt.st.oath = {d:(fx.d||3)+1}; blog('  '+tgt.name+' stands ready: foes will target '+tgt.name+' and are struck back.','good'); break;
    case 'cleanse': ['burn','slow','bind','charm','silence'].forEach(k => delete tgt.st[k]); blog('  '+tgt.name+' is cleansed.'); break;
    case 'analyze': { const f = tgt.ally ? alive(B.foes)[0] : tgt; if(f){ f.known = true; blog('  Analysed '+f.name+': HP '+f.hp+'/'+f.mhp+', DEF '+f.def+(f.traits.includes('magic')?', magical':'')+'.'); } break; }
    case 'drain': { const m = Math.round(tgt.mmp*fx.v); tgt.mp = Math.max(0, tgt.mp - m); B.drained = true; blog('  '+tgt.name+'\'s spiritual energy is drained (−'+m+' MP).','bad'); break; }
    case 'thread': { const n = Math.min(3, ((tgt.st.thread && tgt.st.thread.n)||0) + (fx.v||1)); tgt.st.thread = {n, d:4}; blog('  '+tgt.name+' is Threadbound ×'+n+'.'); break; }
    case 'link': tgt.st.link = {d:fx.d||3}; blog('  '+tgt.name+' is linked into the formation.'); break;
    case 'strip': { if(tgt.st.shield){ delete tgt.st.shield; blog('  '+tgt.name+'\'s barrier shatters.'); } const n = tgt.bf.filter(b => b.m>1).length; tgt.bf = tgt.bf.filter(b => b.m<=1); if(n) blog('  '+tgt.name+'\'s enhancements are unravelled.'); break; }
    case 'subdue': if(tgt.boss){ tgt.st.bind = {d:3}; blog('  '+tgt.name+' is too strong to capture, but is bound.'); break; } tgt.dead = true; tgt.subdued = true; blog('  '+tgt.name+' is subdued and taken out of the fight alive.','good'); break;
    case 'expose': tgt.st.expose = {d:(fx.d||3)+1}; blog('  '+tgt.name+'\'s weakness is exposed.'); break;
    case 'ward': tgt.st.ward = {d:(fx.d||4)+1}; break;
    case 'cleanse1': { const k = ['burn','bind','charm','silence','slow'].find(x => tgt.st[x]); if(k){ delete tgt.st[k]; blog('  '+tgt.name+' is cleared of '+k+'.'); } else blog('  Nothing ordinary to clear.'); break; }
    case 'strain': { const d = Math.max(1, Math.round(tgt.mhp*fx.v*(1+.5*(tgt.strain||0)))); tgt.strain = (tgt.strain||0)+1; tgt.hp = Math.max(1, tgt.hp-d); blog('  The strain tears at '+tgt.name+'\'s channels: '+d+'.','bad'); break; }
    case 'heatup': { const x = B.allies.find(a => a.id==='xiyu' && !a.dead); if(x){ x.heat = Math.min(100, (x.heat||0) + fx.v + ((x.heat||0)>=70 ? 10 : 0)); blog('  The resonance stirs Xiyu\'s curse ('+Math.round(x.heat)+').','bad'); } break; }
    case 'cool': if(tgt.id==='xiyu'){ tgt.heat = Math.max(0, (tgt.heat||0) - fx.v - (src.id==='cangyuan' ? 5*resLv() : 0)); blog('  '+tgt.name+'\'s heat eases ('+Math.round(tgt.heat)+').','good'); } break;
    case 'revive': if(tgt.dead){ tgt.dead = false; tgt.hp = Math.round(tgt.mhp*.4); blog('  '+tgt.name+' is revived!','good'); } break;
    case 'state': tgt.state = {id:fx.id, d:(fx.d||3)+1}; blog('  '+tgt.name+' draws on the Blood Moon!','good'); break;
  }
}

/* ---------- player actions ---------- */
function skillList(u){
  return skillsOf(u.id).map(s => (B.lead && u.id==='dongyue' && s.id==='ancient_rite') ? Object.assign({}, s, {ok:true}) : s).filter(s => s.ok).map(s => {
    const cost = mpCost(u,s);
    const noAlly = s.needAlly && !B.allies.some(a => a.id===s.needAlly && !a.dead && a!==u), noItem = s.item && B.spec.rewards && !(G.inv[s.item] > 0), noWeak = (s.hpBelow || s.needMark) && !targetsFor(s).length;
    return Object.assign({}, s, { cost, usable: u.mp>=cost && !(s.once && u.used[s.id]) && !noAlly && !noItem && !noWeak, note: noWeak ? (s.needMark ? 'needs a Fate Thread mark' : 'no foe at '+Math.round(s.hpBelow*100)+'% HP') : noAlly ? 'needs '+first(s.needAlly) : noItem ? 'no '+ITEMS[s.item].n : (s.once && u.used[s.id]) ? 'used' : u.mp<cost ? 'low MP' : '' });
  });
}
function targetsFor(s){
  if(s.tgt==='foe') return alive(B.foes).filter(f => (!s.hpBelow || f.hp <= f.mhp*s.hpBelow) && (!s.needMark || f.st.fate));
  if(s.tgt==='ally') return alive(B.allies);
  if(s.tgt==='allyDown') return B.allies.filter(a => a.dead);
  return [];
}
function playerAct(kind, sid, tuid){
  if(B.over) return;
  const u = B.cur; if(!u || !u.ally) return;
  if(kind==='guard'){ u.guard = true; u.mp = Math.min(u.mmp, u.mp+4); blog(u.name+' guards (+4 MP).'); endTurn(u); u.guard = true; advance(); return; }
  if(kind==='item'){ if(!battleUseItem(u, sid, [].concat(B.allies,B.foes).find(x => x.uid===tuid))) return; endTurn(u); advance(); return; }
  let s;
  if(kind==='attack') s = { id:'attack', n:'Attack', kind:'phys', tgt:'foe', pow:1, mp:0 };
  else { s = skillList(u).find(x => x.id===sid); if(!s || !s.usable) return; }
  const t = [].concat(B.foes, B.allies).find(x => x.uid===tuid);
  if(['foe','ally','allyDown'].includes(s.tgt) && !t) return;
  u.mp -= (s.cost!==undefined ? s.cost : s.mp);
  if(s.once) u.used[s.id] = true;
  if(s.item && B.spec.rewards) G.inv[s.item]--;
  resolve(u, s, t);
  if(s.kind==='heal' && u.id==='xining') u.treats = (u.treats||0) + 1;
  if(u.id==='xiyu' && s.kind==='magic'){
    const cg = B.allies.some(a => a.id==='cangyuan' && !a.dead);   // Resonance of Two Currents: he redirects 25% of the energy
    u.heat = Math.min(100, (u.heat||0) + Math.round((3 + (s.mp||0)*.25) * (1 - .05*attuneLv()) * (cg ? Math.max(.4, .75 - .05*resLv()) : 1)));   // the curse: casting builds heat
    const c = B.allies.find(a => a.id==='cangyuan' && !a.dead), f = alive(B.foes)[Math.floor(Math.random()*alive(B.foes).length)];
    if(c && f && Math.random() < .35){ blog('  Cangyuan\'s threads catch the spell\'s echo.','good'); strike(c, f, {n:'Resonant Echo', kind:'magic', pow:.5, mp:0}, {noSpread:false}); }
  }
  endTurn(u);
  advance();
}
function resolve(u, s, t){
  const hit = s.kind==='phys' || s.kind==='magic';
  let foesHit = [], alliesHit = [];
  if(s.tgt==='foe') foesHit = [t];
  else if(s.tgt==='foes') foesHit = alive(B.foes);
  else if(s.tgt==='ally' || s.tgt==='allyDown') alliesHit = [t];
  else if(s.tgt==='allies') alliesHit = alive(B.allies);
  else if(s.tgt==='self') alliesHit = [u];
  if(hit) foesHit.forEach((f,i) => strike(u, f, s, {decay:Math.pow(.8,i)}));
  else if(s.kind==='heal'){
    alliesHit.forEach(a => {
      const reviving = (s.fx||[]).some(f => f.k==='revive');
      if(a.dead && !reviving) return;
      if(a.dead){ blog(u.name+' uses '+s.n+' on '+a.name+'.','good'); return; }
      const h = Math.round((eff(u,'mag')*(s.pow||1)*1.2 + a.mhp*.05) * (0.95+Math.random()*.1) * ((s.withAlly && B.allies.some(x => x.id===s.withAlly && !x.dead)) ? (s.boost||1) : 1));
      a.hp = Math.min(a.mhp, a.hp+h); blog(u.name+' uses '+s.n+' on '+a.name+': +'+h+' HP.','good');
    });
  } else blog(u.name+' uses '+s.n+'.');
  (s.fx||[]).forEach(fx => {
    if(FOE_FX.includes(fx.k)) foesHit.filter(f => !f.dead).forEach(f => applyFx(u, f, fx));
    else if(fx.k==='analyze') applyFx(u, foesHit[0]||u, fx);
    else if(fx.self) applyFx(u, u, fx);
    else (foesHit.length ? foesHit.filter(f => !f.dead) : alliesHit).forEach(x => applyFx(u, x, fx));
  });
}

/* ---------- foe AI ---------- */
function foeAct(f){
  const targets = alive(B.allies); if(!targets.length) return;
  const plan = f.plan && f.st.fate ? f.plan : null; f.plan = null;   // a foe marked by Fate Thread acts on the move that was read
  let mv = plan ? plan.mv : AR(f.moves);
  if(f.st.silence && mv.spell){ mv = f.moves.find(m => !m.spell) || f.moves[0]; if(f.st.fate) fateExploit(f,'its spell is silenced'); }
  const s = { n:mv.n, kind: mv.spell ? 'magic' : 'phys', pow:mv.pow, fx:mv.fx };
  if(mv.all){
    blog(f.name+' unleashes '+mv.n+'!','foe');
    targets.slice().forEach(a => { if(a.dead) return; const d = strike(f, a, Object.assign({}, s, {pow:(mv.pow||1)*.7})); if(d>0) (mv.fx||[]).forEach(fx => { if(!a.dead && FOE_FX.includes(fx.k)) applyFx(f, a, fx); }); });
    return;
  }
  const oath = targets.find(a => a.st.oath), ignore = f.boss && oath && Math.random() < .35;
  const leadU = f.perp && B.lead ? targets.find(a => a.id===B.lead) : null;   // the principals look for him
  const planned = plan ? targets.find(a => a.uid === plan.tUid) : null;
  const t = (oath && !ignore) ? oath : planned ? planned : (leadU && Math.random() < .45 ? leadU : AR(targets));
  if(t.guard && f.st.fate) fateExploit(f,'its target is braced against it');
  const dealt = strike(f, t, s);
  if(dealt>0) (mv.fx||[]).forEach(fx => { if(!t.dead && FOE_FX.includes(fx.k)) applyFx(f, t, fx); });
  if(f.st.fate && !f.dead && alive(B.allies).length){ f.plan = planFor(f); f.fateText = fateText(f); }
  if(s.landed && t.st.oath && !t.dead && !f.dead){
    const c = Math.max(1, Math.round(eff(t,'atk')*.6 - eff(f,'def')*.35));
    f.hp = Math.max(f.perp && t.id!==B.lead ? 1 : 0, f.hp - c); blog('  '+t.name+' strikes back at '+f.name+': '+c+'.','good'); if(f.hp<=0){ f.dead = true; blog(f.name+' falls!','bad'); }
  }
}

/* ---------- items in battle ---------- */
function battleItems(){ return Object.keys(USE).filter(k => (G.inv[k]||0) > 0 || (B && !B.spec.rewards)).map(k => ({id:k, n:ITEMS[k].n, icon:ITEMS[k].icon, qty:G.inv[k]||0, text:useText(USE[k])})); }
function battleUseItem(u, k, t){
  const e = USE[k]; if(!e || !t) return false;
  if(B.spec.rewards){ if(!(G.inv[k] > 0)) return false; G.inv[k]--; }
  if(!t.ally){ if(e.cleanse){ blog(u.name+' scatters '+ITEMS[k].n+' over '+t.name+'.'); applyFx(u, t, {k:'cleanse'}); } return true; }   // cleansing powder on a foe: strips a layered shadow
  if(e.hp){ const h = Math.min(e.hp, t.mhp - t.hp); t.hp += h; blog(u.name+' uses '+ITEMS[k].n+' on '+t.name+': +'+h+' HP.','good'); }
  if(e.mp){ const m = Math.min(e.mp, t.mmp - t.mp); t.mp += m; blog('  '+t.name+' regains '+m+' MP.','good'); }
  if(e.heat && t.id === 'xiyu' && t.heat !== undefined){ t.heat = Math.max(0, t.heat - e.heat); blog('  Xiyu\'s heat eases.','good'); }
  if(e.cleanse) applyFx(u, t, {k:'cleanse'});
  return true;
}

/* ---------- rewards ---------- */
function finishWin(){
  const foes = B.foes, spec = B.spec;
  let xp = 0, gold = 0; const drops = [];
  foes.forEach(f => { xp += f.xp; gold += f.gold; f.drops.forEach(d => { if(Math.random()<d.chance) drops.push({id:d.id,qty:1}); }); G.bestiary[f.key] = (G.bestiary[f.key]||0)+1; });
  const caught = foes.filter(f => f.subdued && !f.boss);   // Su Liechen's Subdue, Not Slay: captured alive, drops rolled twice
  caught.forEach(f => { f.drops.forEach(d => { if(Math.random()<d.chance) drops.push({id:d.id,qty:1}); }); xp += Math.round(f.xp*.25); });
  const boss = foes.find(f => f.boss);
  if(boss) rollLoot(LOOT[boss.key], spec.firstClear).forEach(d => drops.push(d));
  if(typeof fieldGoldMult === 'function') gold = Math.round(gold * fieldGoldMult(B.allies));   // Xiao Tian's field proficiency
  B.rewards = { xp, gold, drops, msgs:[], real:!!spec.rewards };
  if(caught.length) blog('🕸️ Captured alive: '+caught.map(f => f.name).join(', ')+' (extra drops and XP).','good');
  blog('Victory!','good');
  if(!spec.rewards) return;
  persistBattle();
  const act = G.party.filter(id => B.allies.some(a => a.id===id)), bench = G.party.filter(id => !act.includes(id));
  B.rewards.msgs = gainXp(xp, act).concat(gainXp(Math.round(xp*.5), bench));
  act.forEach(id => { const m = addBond(id, boss ? 8 : 3); if(m) B.rewards.msgs.push(m); });
  G.gold += gold; addItems(drops); G.wins = (G.wins||0)+1;
  if(spec.onWin) B.rewards.msgs = B.rewards.msgs.concat(spec.onWin() || []);
  if(typeof personalOnWin === 'function') personalOnWin(act);   // field proficiency and shared danger
  if(typeof boardOnWin === 'function') B.rewards.msgs = B.rewards.msgs.concat(boardOnWin(foes, spec.zone));   // quest board + bounty board progress (independent of the story)
  save();
}


/* ---------- lead battles (prototype): one hero is the protagonist; the others support ---------- */
function leadFoes(list, ids){
  const base = B.foes ? B.foes.length : 0;
  return list.filter(f => !(f.skipIf && (ids||B.allies.map(a => a.id)).includes(f.skipIf))).map((f,i) => mkFoeUnit(f.key, f.lv, base+i, f));
}
function leadBlessing(){
  const l = B.allies.find(a => a.id===B.lead), x = B.allies.find(a => a.id==='xining' && !a.dead);
  if(!l || !x) return;
  blog('🙏 Xining\'s blessing settles over '+l.name+': steady breath, steady resolve. "Come back alive."','good');
  applyFx(x, l, {k:'shield', v:.15, d:4}); applyFx(x, l, {k:'buff', stat:'def', m:1.15, d:4});
}
function nextStage(){
  B.stage++; const st = B.stages[B.stage], l = B.allies.find(a => a.id===B.lead);
  B.queue = [];
  blog(st.msg,'sys');
  const ids = B.allies.map(a => a.id);
  B.foes = B.foes.concat(leadFoes(st.foes, ids));
  B.foes.filter(f => !f.dead && f.st.layer).forEach(f => f.layerAt = B.round + 3);
  st.skipped = st.foes.filter(f => f.skipIf && ids.includes(f.skipIf)).map(f => f.skipIf);
  st.skipped.forEach(id => blog('  '+first(id)+' has cut off '+(id==='hoko' ? 'the escape routes: one fighter never arrives.' : 'the passage: one fighter is held back.'),'good'));
  (st.fx||[]).forEach(k => {
    if(!l || l.dead) return;
    if(k==='rhythm'){ applyFx(l, l, {k:'buff', stat:'atk', m:1.2, d:5}); applyFx(l, l, {k:'crit', d:1}); blog('  '+l.name+' finds the rhythm of his master\'s movements: he knows what comes next.','good'); }
    if(k==='mend'){ const d = B.allies.find(a => a.id==='dongyue' && !a.dead); if(d){ const h = Math.round(l.mhp*.3); l.hp = Math.min(l.mhp, l.hp+h); blog('  Dongyue sees his breath fail and mends the wound: +'+h+' HP.','good'); } }
    if(k==='resolve'){ applyFx(l, l, {k:'crit', d:3}); blog('  '+l.name+' no longer holds back: this is for his master.','good'); }
  });
}


/* ---------- Fate Thread (Yun He): read a foe's next action, then exploit a good answer to it ---------- */
const fateKind = mv => mv.all ? 'an attack on the whole party' : mv.spell ? 'a spell' : 'a physical strike';
function planFor(f){ const mv = AR(f.moves), tg = alive(B.allies); return { mv, tUid: tg.length ? AR(tg).uid : null }; }
function fateText(f){
  const p = f.plan; if(!p) return 'its next move is unclear';
  const who = (B.allies.find(a => a.uid === p.tUid) || {}).name, tier = f.fateTier || (f.boss ? 'boss' : f.elite ? 'elite' : 'plain');
  if(tier==='boss') return 'it will use '+fateKind(p.mv);
  if(tier==='elite') return 'it will use '+fateKind(p.mv)+(who && !p.mv.all ? ' on '+who : '');
  return 'it will use '+p.mv.n+(who && !p.mv.all ? ' on '+who : '');
}
function fateExploit(f, why){
  if(f.dead || !f.st.fate || f.fateSpent === B.round) return;
  f.fateSpent = B.round;
  const d = Math.max(1, Math.round(f.mhp * (f.boss ? .03 : .08)));
  blog('🧵 Fate opens: '+why+', and '+f.name+' is exposed ('+d+').','good');
  hurt(f, d, true);
}
