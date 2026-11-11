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
