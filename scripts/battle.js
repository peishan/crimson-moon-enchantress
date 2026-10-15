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
    heat: id==='xiyu' ? (G.heat||0) : 0, glow: id==='xiyu' && (G.afterglow||0)>0 };
}
function mkFoeUnit(key, lv, i){
  const u = Object.assign(mkEnemy(key, lv), { uid:'f'+i, ally:false, st:{}, bf:[], state:null, used:{}, dead:false, guard:false, known:false });
  if(u.traits.includes('layered')) u.st.layer = {d:99};   // outer layer: halves damage until stripped
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
const mpCost = (u,s) => Math.round(s.mp * ((u.state && u.state.id==='bloodmoon') ? .5 : 1) * (s.res ? 1 - .05*resLv() : 1) * ((u.id==='xining' && (s.kind==='heal'||s.id==='clear_spirit')) ? 1 - Math.min(.3, .05*(u.treats||0)) : 1));   // A Physician's Resolve
function blog(t, cls){ B.log.push({t, cls:cls||''}); if(B.log.length>60) B.log.shift(); }

/* ---------- start ---------- */
function startBattle(spec){
  const ids = spec.allies || G.active;
  B = { allies:ids.map(id => mkAlly(id, !!spec.rewards)), foes:spec.foes.map((f,i) => mkFoeUnit(f.key, f.lv, i)), queue:[], cur:null, log:[], over:null, round:0, ui:{mode:'menu'}, spec, rewards:null };
  blog('Battle begins!','sys');
  const aids = B.allies.map(a => a.id);
  B.allies.forEach(a => { const sy = synergyOf(a.id, aids); if(sy.total > 0){ ['atk','mag','def','spd'].forEach(k => a[k] = Math.round(a[k]*(1+sy.total))); a.syn = sy; } });
  const pairA = B.allies.find(a => a.id==='xiyu' && a.syn && a.syn.bond), cg = B.allies.find(a => a.id==='cangyuan' && a.syn && a.syn.bond);
  if(pairA && cg) blog('🌹 Bond of Choice: Xiyu and Cangyuan fight with +'+Math.round(pairA.syn.total*100)+'% to ATK, MAG, DEF and SPD.','sys');
  else if(B.allies.some(a => a.syn && a.syn.comrade > 0)) blog('🤝 Comradeship: allies who trust each other fight a little better together.','sys');
  if(resLv()>=2 && B.allies.some(a => a.id==='xiyu') && B.allies.some(a => a.id==='cangyuan')){   // resonance awareness: limited, only severe disturbances
    B.foes.filter(f => f.st.layer || f.traits.includes('corrupt')).forEach(f => { f.known = true; blog('🌹 Crimson Thread: a severe disturbance in '+f.name+'.','sys'); }); }
  advance();
}

/* ---------- turn flow ---------- */
function buildQueue(){ B.queue = alive(B.allies).concat(alive(B.foes)).sort((a,b) => (eff(b,'spd') + Math.random()) - (eff(a,'spd') + Math.random())); }
function checkEnd(){
  if(!alive(B.foes).length){ B.over='win'; finishWin(); return true; }
  if(!alive(B.allies).length){ B.over='lose'; blog('The party has fallen...','bad'); persistBattle(); save(); return true; }
  return false;
}
function advance(){
  let guard = 400;
  while(guard-- > 0){
    if(checkEnd()) return;
    if(!B.queue.length){ B.round++; buildQueue(); blog('— Round '+B.round+' —','sys'); B.foes.forEach(f => { if(f.st.layer && B.round>=3 && !f.dead){ delete f.st.layer; blog('The '+f.name+'\'s outer layer cracks on its own: the core is exposed.','good'); } }); }
    const u = B.queue.shift(); if(u.dead) continue;
    B.cur = u;
    if(u.st.burn){ const d = Math.max(1, Math.round(u.mhp*.06)); hurt(u,d,true); blog(u.name+' burns for '+d+'.','bad'); if(u.dead) continue; }
    if(u.st.regen){ const h = Math.round(u.mhp*u.st.regen.v); u.hp = Math.min(u.mhp, u.hp+h); blog(u.name+' regenerates '+h+'.','good'); }
    if(u.st.bind || u.st.charm){ blog(u.name+(u.st.bind?' is bound and cannot move.':' is charmed and loses the turn.')); endTurn(u); continue; }
    if(u.ally){ B.ui = {mode:'menu'}; return; }
    foeAct(u); endTurn(u);
  }
}
function endTurn(u){
  ['burn','slow','bind','charm','silence','crit'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
  ['thread','link','expose','ward'].forEach(k => { if(u.st[k] && --u.st[k].d <= 0) delete u.st[k]; });
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
  t.hp = Math.max(0, t.hp - d);
  if(t.hp>0) checkPhase(t);
  if(t.hp<=0){ t.dead = true; blog(t.name+' falls!','bad'); }
  return d;
}
function strike(src, tgt, s, opts){
  opts = opts || {};
  const magic = s.kind==='magic', stat = magic?'mag':'atk';
  let raw = eff(src, stat) * (s.pow||1) * (0.9 + Math.random()*.2) * (opts.decay||1);
  if(s.withAlly && B.allies.some(a => a.id===s.withAlly && !a.dead)) raw *= (s.boost||1.3);   // bond skills hit harder with the partner beside her
  raw -= eff(tgt,'def') * (magic ? .35 : .6);
  let d = Math.max(1, Math.round(raw));
  if(s.antiMagic && tgt.traits.includes('magic')) d = Math.round(d*s.antiMagic);
  if(tgt.st.expose) d = Math.round(d*1.15);   // Physician's Insight
  if(tgt.st.layer) d = Math.round(d*.5);       // the shadow's outer layer
  if(src.id==='xiyu' && resLv()>0 && (tgt.st.shield || tgt.st.layer || tgt.st.link) && B.allies.some(a => a.id==='cangyuan' && !a.dead)) d = Math.round(d*(1 + .08*resLv()));   // Crimson transformation: she breaks what his weaving alone cannot
  let crit = false;
  if(s.crit || src.st.crit || Math.random() < .08){ crit = true; d = Math.round(d*1.6); }
  if(Math.random() < evaOf(tgt)){ blog(tgt.name+' evades '+src.name+'\'s '+s.n+'!'); return 0; }
  s.landed = true;
  const dealt = hurt(tgt, d);
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
      const th = (tgt.st.thread && tgt.st.thread.n) || 0;
      if(tgt.boss && (fx.k==='bind'||fx.k==='charm') && Math.random() < Math.max(.1, .5 - .15*th)){ blog('  '+tgt.name+' resists!'); return; }
      if(tgt.st.link && !fx.spread){ alive(B.foes).filter(o => o!==tgt && o.st.link && Math.random()<.5).forEach(o => { blog('  the link carries it to '+o.name+'.'); applyFx(src, o, Object.assign({}, fx, {spread:true})); }); }
      tgt.st[fx.k] = {d:(fx.d||2) + (th?1:0)}; blog('  '+tgt.name+' is '+({burn:'burning',slow:'slowed',bind:'bound',charm:'charmed',silence:'silenced'})[fx.k]+'.'); break;
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
  return skillsOf(u.id).filter(s => s.ok).map(s => {
    const cost = mpCost(u,s);
    const noAlly = s.needAlly && !B.allies.some(a => a.id===s.needAlly && !a.dead && a!==u), noItem = s.item && B.spec.rewards && !(G.inv[s.item] > 0);
    return Object.assign({}, s, { cost, usable: u.mp>=cost && !(s.once && u.used[s.id]) && !noAlly && !noItem, note: noAlly ? 'needs '+first(s.needAlly) : noItem ? 'no '+ITEMS[s.item].n : (s.once && u.used[s.id]) ? 'used' : u.mp<cost ? 'low MP' : '' });
  });
}
function targetsFor(s){
  if(s.tgt==='foe') return alive(B.foes);
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
  let mv = AR(f.moves);
  if(f.st.silence && mv.spell) mv = f.moves.find(m => !m.spell) || f.moves[0];
  const s = { n:mv.n, kind: mv.spell ? 'magic' : 'phys', pow:mv.pow, fx:mv.fx };
  if(mv.all){
    blog(f.name+' unleashes '+mv.n+'!','foe');
    targets.slice().forEach(a => { if(a.dead) return; const d = strike(f, a, Object.assign({}, s, {pow:(mv.pow||1)*.7})); if(d>0) (mv.fx||[]).forEach(fx => { if(!a.dead && FOE_FX.includes(fx.k)) applyFx(f, a, fx); }); });
    return;
  }
  const oath = targets.find(a => a.st.oath), ignore = f.boss && oath && Math.random() < .35;
  const t = (oath && !ignore) ? oath : AR(targets);
  const dealt = strike(f, t, s);
  if(dealt>0) (mv.fx||[]).forEach(fx => { if(!t.dead && FOE_FX.includes(fx.k)) applyFx(f, t, fx); });
  if(s.landed && t.st.oath && !t.dead && !f.dead){
    const c = Math.max(1, Math.round(eff(t,'atk')*.6 - eff(f,'def')*.35));
    f.hp = Math.max(0, f.hp - c); blog('  '+t.name+' strikes back at '+f.name+': '+c+'.','good'); if(f.hp<=0){ f.dead = true; blog(f.name+' falls!','bad'); }
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
  if(e.cleanse) applyFx(u, t, {k:'cleanse'});
  return true;
}

/* ---------- rewards ---------- */
function finishWin(){
  const foes = B.foes, spec = B.spec;
  let xp = 0, gold = 0; const drops = [];
  foes.forEach(f => { xp += f.xp; gold += f.gold; f.drops.forEach(d => { if(Math.random()<d.chance) drops.push({id:d.id,qty:1}); }); G.bestiary[f.key] = (G.bestiary[f.key]||0)+1; });
  const boss = foes.find(f => f.boss);
  if(boss) rollLoot(LOOT[boss.key], spec.firstClear).forEach(d => drops.push(d));
  if(typeof fieldGoldMult === 'function') gold = Math.round(gold * fieldGoldMult(B.allies));   // Xiao Tian's field proficiency
  B.rewards = { xp, gold, drops, msgs:[], real:!!spec.rewards };
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
