/* =====================================================================
   AUTO BATTLE (optional). A toggle on the battle screen: when on, the party's turns are chosen automatically, one action at a time (so the log can be read),
   and it can be switched off at any moment to take over. The setting is remembered in the save (G.auto) and applies to every battle.
   Simple priorities, deliberately conservative:
     1. raise a fallen ally if someone can; 2. heal when an ally is below 45% HP (a party heal when two or more are below 60%);
     3. otherwise the strongest affordable attack skill on the weakest foe (area skills when three or more foes stand), keeping MP in reserve for healers
        and holding back Xiyu's magic when her heat is high; 4. otherwise a plain attack.
   It never uses consumable items or skills that spend an item, and never uses support-only skills (buffs, wards, analysis): play those by hand.
   ===================================================================== */
let autoTimer = null;
const autoOn = () => !!(G && G.auto);
function autoToggle(){ G.auto = !G.auto; save(); render(); }
function autoPick(u){
  const sk = skillList(u).filter(s => s.usable && !s.item);
  const allies = alive(B.allies), foes = alive(B.foes);
  const rev = sk.find(s => s.tgt === 'allyDown'); const down = B.allies.filter(a => a.dead);
  if(rev && down.length) return {kind:'skill', sid:rev.id, t:down[0].uid};
  const heals = sk.filter(s => s.kind === 'heal' && s.tgt !== 'allyDown');
  const low = allies.slice().sort((a,b) => a.hp/a.mhp - b.hp/b.mhp)[0];
  if(heals.length && low && low.hp/low.mhp < .45){
    const many = allies.filter(a => a.hp/a.mhp < .6).length >= 2, area = heals.find(s => s.tgt === 'allies'), single = heals.find(s => s.tgt === 'ally');
    const h = (many && area) || single || area;
    if(h) return {kind:'skill', sid:h.id, t:h.tgt === 'ally' ? low.uid : null};
  }
  if(!foes.length) return {kind:'guard'};
  const target = foes.slice().sort((a,b) => a.hp - b.hp)[0];
  const isHealer = skillList(u).some(s => s.kind === 'heal'), reserve = isHealer ? u.mmp*.5 : 0;
  const hot = u.id === 'xiyu' && (u.heat||0) >= 70;
  let best = {score:1, kind:'attack', sid:null, t:target.uid};
  sk.filter(s => (s.kind === 'phys' || s.kind === 'magic') && (s.tgt === 'foe' || s.tgt === 'foes')).forEach(s => {
    if(u.mp - s.cost < reserve) return; if(hot && s.kind === 'magic') return;
    const cands = s.tgt === 'foe' ? targetsFor(s) : foes; if(!cands.length) return;
    const score = (s.pow||1) * (s.tgt === 'foes' ? Math.min(foes.length, 3)*.8 : 1) * (s.kind === 'magic' && u.mag > u.atk ? u.mag/Math.max(1,u.atk) : 1);
    if(score > best.score){ const t = s.tgt === 'foe' ? cands.slice().sort((a,b) => a.hp - b.hp)[0] : null; best = {score, kind:'skill', sid:s.id, t:t ? t.uid : null}; }
  });
  return best;
}
function autoStep(){
  autoTimer = null;
  if(!B || B.over || !autoOn() || !B.cur || !B.cur.ally || tab !== 'battle') return;
  const p = autoPick(B.cur);
  if(p.kind === 'guard') playerAct('guard'); else playerAct(p.kind, p.sid, p.t);
  render();
}
/* called from rBattle: schedules the next automatic action while it is the party's turn */
function autoSchedule(){ if(autoOn() && B && !B.over && B.cur && B.cur.ally && !autoTimer) autoTimer = setTimeout(autoStep, 450); }
const autoButton = () => `<button class="${autoOn()?'pri':''}" onclick="autoToggle()">${autoOn() ? '⏸ Auto: ON' : '▶ Auto battle'}</button>`;

/* ---------- KEEP HUNTING (Wilds only) ----------
   A second toggle on the battle screen during an ordinary Wilds hunt (not bosses, trials, story or shrine battles): after a victory the next hunt in the
   same area starts by itself. Together with Auto battle the party farms an area unattended. It stops by itself when it is no longer safe:
   someone has fallen, the party's average HP is under 35%, a defeat, 50 hunts in a row, or the player switches it off or leaves the battle screen.
   The setting is remembered in the save (G.chain). HP and MP carry over between hunts as usual, so healers matter. */
const CHAIN_MIN_HP = .35, CHAIN_MAX = 50;
let chainTimer = null, chainCount = 0;
const chainOn = () => !!(G && G.chain);
const chainable = () => !!(B && B.spec && (B.spec.zone || B.spec.skirm));
function chainToggle(){ G.chain = !G.chain; if(!G.chain){ clearTimeout(chainTimer); chainTimer = null; chainCount = 0; } save(); render(); }
function chainStopReason(){
  if(B.allies.some(a => a.dead)) return 'someone has fallen';
  const ids = B.allies.map(a => a.id).filter(id => G.party.includes(id));
  const avg = ids.length ? ids.reduce((s,id) => s + curHp(id)/Math.max(1, statsOf(id).hp), 0)/ids.length : 1;
  if(avg < CHAIN_MIN_HP) return 'the party is below '+Math.round(CHAIN_MIN_HP*100)+'% HP';
  if(chainCount + 1 >= CHAIN_MAX) return CHAIN_MAX+' hunts in a row';
  return '';
}
function chainNext(){
  chainTimer = null;
  if(!B || B.over !== 'win' || !chainOn() || !chainable() || tab !== 'battle') return;
  const zone = B.spec.zone, B0skirm = !!B.spec.skirm, why = chainStopReason();
  if(why){ chainCount = 0; flash = ['🔁 Keep hunting stopped: '+why+'. Rest, then hunt again.']; battleDone(); return; }
  chainCount++; battleDone(); if(B0skirm){ origin = 'skirmish'; if(startSkirmish()) tab = 'battle'; render(); } else wildFight(zone);
}
/* called from rBattle */
function chainSchedule(){
  if(!B || !chainOn() || !chainable() || chainTimer) return;
  if(B.over === 'win') chainTimer = setTimeout(chainNext, 1400);
  if(B.over === 'lose') chainCount = 0;
}
const chainButton = () => chainable() ? `<button class="${chainOn()?'pri':''}" onclick="chainToggle()">${chainOn() ? '🔁 Keep hunting: ON'+(chainCount ? ' ('+(chainCount+1)+')' : '') : '🔁 Keep hunting'}</button>` : '';
