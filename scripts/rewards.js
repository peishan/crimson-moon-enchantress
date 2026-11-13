/* =====================================================================
   DAILY LOGIN + AFK REWARDS (same design as Tribute)
   Daily login: 7-day cycle, one claim per real calendar day, missing a day restarts the cycle.
   AFK rewards: gold, XP and herbs accrue in real time while you are away, up to AFK_MAX_H hours, scaled by average party level.
   The herbs depend on where the party is (Muxue, the Ice Temple, or the road). Numbers are drafts to tune.
   State: G.login = {last:'YYYY-MM-DD', streak:n}, G.afk = {at: ms timestamp of last claim}
   ===================================================================== */
const AFK_MAX_H = 8;
const LOGIN_CYCLE = [
  {gold:100}, {items:[{id:'herbal_tonic',qty:2}]}, {gold:150}, {items:[{id:'spirit_draught',qty:2}]},
  {gold:200, items:[{id:'moonlit_tonic',qty:1}]}, {gold:150, items:[{id:'cleansing_salt',qty:2}]}, {gold:500, items:[{id:'warding_elixir',qty:1}]},
];
const AFK_HERB = {muxue:'frost_herb', icetemple:'glacier_mint', world:'silverleaf'};
const dateKey = t => { const d = new Date(t === undefined ? Date.now() : t); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
function ensureRewards(now){
  now = now === undefined ? Date.now() : now;
  if(!G.login) G.login = {last:'', streak:0};
  if(!G.afk || !G.afk.at || G.afk.at > now) G.afk = {at: now};   // first run (or a clock set back): start counting from now
}
function loginState(now){
  ensureRewards(now);
  const t = now === undefined ? Date.now() : now, today = dateKey(t), yest = dateKey(t - 864e5);
  const claimed = G.login.last === today;
  const streak = claimed ? G.login.streak : (G.login.last === yest ? G.login.streak : 0);
  return {claimed, streak};
}
function grantReward(rw, label){
  const msgs = [];
  if(rw.xp) gainXp(rw.xp, G.party).forEach(m => msgs.push(m));
  if(rw.gold) G.gold += rw.gold;
  if(rw.items){ addItems(rw.items); rw.items.forEach(d => msgs.push('Received '+(ITEMS[d.id] ? ITEMS[d.id].icon+' '+ITEMS[d.id].n : d.id)+' ×'+d.qty)); }
  msgs.unshift(label+(rw.xp || rw.gold ? ' · '+[rw.xp && '+'+rw.xp+' XP', rw.gold && '+'+rw.gold+'g'].filter(Boolean).join(' · ') : ''));
  save(); return msgs;
}
function claimLogin(now){
  const st = loginState(now); if(st.claimed) return ['Today\'s login gift is already claimed.'];
  const idx = st.streak % LOGIN_CYCLE.length;
  G.login.streak = st.streak + 1; G.login.last = dateKey(now);
  return grantReward(Object.assign({}, LOGIN_CYCLE[idx]), '🎁 Daily login, day '+(idx+1));
}
const afkRate = () => { const lv = avgPartyLv(); return {gold:12 + Math.round(lv*1.5), xp:20 + lv*4}; };   // per hour
function afkHours(now){ ensureRewards(now); return Math.min(AFK_MAX_H, Math.max(0, ((now === undefined ? Date.now() : now) - G.afk.at) / 36e5)); }
function afkPreview(now){ const h = afkHours(now), r = afkRate(); return {h, gold:Math.floor(r.gold*h), xp:Math.floor(r.xp*h), herbs:Math.floor(h/2)}; }
function claimAfk(now){
  const p = afkPreview(now);
  if(p.h < 0.1) return ['Nothing has accrued yet. Come back in a little while.'];
  G.afk.at = now === undefined ? Date.now() : now;
  const rw = {gold:p.gold, xp:p.xp}; if(p.herbs) rw.items = [{id:AFK_HERB[where()] || 'frost_herb', qty:p.herbs}];
  return grantReward(rw, '⏳ AFK rewards ('+p.h.toFixed(1)+'h)');
}
const rewardsReady = () => !!G && (!loginState().claimed || afkPreview().h >= 1);
const rwText = r => [r.gold && r.gold+'g', (r.items||[]).map(d => (ITEMS[d.id] ? ITEMS[d.id].icon+' '+ITEMS[d.id].n : d.id)+' ×'+d.qty).join(', ')].filter(Boolean).join(' + ');
function rRewards(){
  const st = loginState(), p = afkPreview(), herb = ITEMS[AFK_HERB[where()]] || ITEMS.frost_herb;
  const doneCount = st.claimed ? ((st.streak-1) % LOGIN_CYCLE.length)+1 : st.streak % LOGIN_CYCLE.length;
  const days = LOGIN_CYCLE.map((r,i) => {
    const done = i < doneCount, cur = !st.claimed && i === st.streak % LOGIN_CYCLE.length;
    return `<div class="ev ${done?'locked':''}" style="${cur?'border-color:var(--gold)':''}"><div><b>Day ${i+1}</b> <span class="sm">${rwText(r)}</span></div><span class="sm">${done?'✔ claimed':cur?'← today':''}</span></div>`; }).join('');
  return `<h2>Rewards</h2>${flashHtml()}
   <h4>⏳ AFK rewards</h4><div class="panel"><div class="sm">Xiyu's party keeps working while you are away: up to ${AFK_MAX_H} hours of gold, XP and herbs, scaled by party level. Herbs follow where the party is (${whereLabel()}: ${herb.icon} ${herb.n}).</div>
   ${bar(p.h, AFK_MAX_H)}<div class="sm">${p.h.toFixed(1)} / ${AFK_MAX_H} h · 💰 ${p.gold} · ✨ ${p.xp} XP${p.herbs ? ' · '+herb.icon+' '+p.herbs+' '+herb.n : ''}</div>
   <button class="pri" ${p.h>=0.1?'':'disabled'} onclick="act(claimAfk)">Claim AFK rewards</button></div>
   <h4>🎁 Daily login</h4><div class="panel"><div class="sm">Streak ${st.streak} day${st.streak===1?'':'s'}. Log in every day for the full 7-day cycle; missing a day restarts it.</div>
   <button class="pri" ${st.claimed?'disabled':''} onclick="act(claimLogin)">${st.claimed?'Claimed today ✔':'Claim today\'s gift'}</button></div>${days}`;
}
