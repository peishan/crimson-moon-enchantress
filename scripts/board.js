/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — QUEST BOARD & BOUNTY BOARD (general gameplay)
   Independent of the story: nothing here advances a chapter, sets a story flag or uses the story bounty (scripts/bounties.js) or the
   investigations. Adapted from Tribute (quest board of contracts + bounty board that refreshes every 2 game days) and Crimson Tide
   (quest tracker panel). Everything here is PROVISIONAL balance: tune the numbers freely.
   Game clock: G.day (only chapters and "ask around" pass days; resting passes hours, see rest.js).
   QUEST BOARD: up to MAX_CONTRACTS accepted contracts of three kinds. kill (defeat N of an enemy), sweep (win N fights in a zone), collect (turn in N items).
     The board posts 4 contracts a day. Rewards scale with the party's level when a contract is posted. Finishing contracts raises renown;
     each renown tier opens harder contracts and adds a little gold to every contract reward.
   BOUNTY BOARD: 5 targets drawn from the zones you can enter, refreshed every 2 days. No need to accept: hunt them and the bounty pays out
     (Cull = a few normal foes, Wanted = one elite).
   Save: G.board = { active:[], list:{day,items:[]}, bounties:{day,list:[]}, done, renown }
   ===================================================================== */
const BOARD_OPEN_CH = 5, MAX_CONTRACTS = 5, BOARD_SIZE = 4, BOUNTY_REFRESH_DAYS = 2;
const RENOWN_TIERS = [[0,'Newcomer'],[40,'Known'],[120,'Trusted'],[260,'Respected'],[450,'Renowned']];
const boardOpen = () => G.ch >= BOARD_OPEN_CH;
const BD = () => G.board;
const renownTier = () => RENOWN_TIERS.reduce((t,[min],i) => BD().renown >= min ? i : t, 0);
const renownNext = () => { const t = renownTier(); return t+1 < RENOWN_TIERS.length ? RENOWN_TIERS[t+1][0] - BD().renown : 0; };
const zoneById = id => ZONES.find(z => z.id === id);

/* kill: key, n:[min,max] · sweep: zone, n · collect: item, n.  tier = minimum renown tier.  zone = the zone that must be open. */
const CONTRACTS = [
  {id:'c_wolves',  type:'kill', key:'frost_wolf',    n:[4,7], zone:'forest',   tier:0, icon:'🐺', name:'Wolves on the Snowfields', desc:'White wolves are circling the island\'s paths at dusk. Thin the packs.'},
  {id:'c_boars',   type:'kill', key:'snowcap_boar',  n:[3,5], zone:'forest',   tier:0, icon:'🐗', name:'Bad Tempers',              desc:'Snowcap boars have torn up the herb gardens again.'},
  {id:'c_wisps',   type:'kill', key:'moon_wisp',     n:[4,6], zone:'forest',   tier:0, icon:'🕯️', name:'Lights in the Wrong Places', desc:'Moon wisps drift over the paths and lead travellers astray.'},
  {id:'c_sprites', type:'kill', key:'ice_sprite',    n:[4,6], zone:'stream',   tier:0, icon:'🧊', name:'Mischief at the Stream', desc:'Ice sprites have frozen the washing stones and the footbridge.'},
  {id:'c_crabs',   type:'kill', key:'glacier_crab',  n:[3,5], zone:'stream',   tier:0, icon:'🦀', name:'Hard-Shelled Trouble',     desc:'Glacier crabs are cutting the stream\'s fishing lines.'},
  {id:'c_sentinels', type:'kill', key:'ward_sentinel', n:[3,4], zone:'chambers', tier:1, icon:'🗿', name:'Wardens Gone Wrong',     desc:'Old ward sentinels still patrol the vaults and attack anyone who enters.'},
  {id:'c_imps',    type:'kill', key:'imp',           n:[4,6], zone:'chambers', tier:1, icon:'👺', name:'Imps in the Cellars',      desc:'Imps have been stealing from the stores beneath the fairy.'},
  {id:'c_wraiths', type:'kill', key:'rift_wraith',   n:[3,5], zone:'rift',     tier:1, icon:'🌀', name:'What Came Through',         desc:'Wraiths linger where the gates opened. They should not be there.'},
  {id:'c_golems',  type:'kill', key:'ice_golem',     n:[2,3], zone:'steps',    tier:1, icon:'🧊', name:'Breaking the Golems',       desc:'Ice golems block the narrow steps. Clear them.'},
  {id:'c_stalkers', type:'kill', key:'frost_stalker', n:[3,4], zone:'temple',  tier:2, icon:'🐾', name:'Stalkers in the Halls',    desc:'Frost stalkers hunt in the upper temple, always one step behind.'},
  {id:'c_snares',  type:'kill', key:'icicle_snare',  n:[3,5], zone:'maze',     tier:2, icon:'❄️', name:'Springing the Snares',     desc:'Living snares in the sealed maze catch anyone who passes.'},
  {id:'c_mwraiths', type:'kill', key:'maze_wraith',  n:[3,5], zone:'maze',     tier:2, icon:'👻', name:'Lost in the Maze',          desc:'Wraiths of those who never found the way out haunt the corridors.'},
  {id:'c_crawlers', type:'kill', key:'cave_crawler', n:[4,6], zone:'depths',   tier:2, icon:'🕷️', name:'Crawlers Below',           desc:'Cave crawlers have spread through the underground level.'},
  {id:'c_mimic',   type:'kill', key:'hoard_mimic',   n:[1,2], zone:'depths',   tier:3, icon:'📦', name:'Not a Treasure Chest',     desc:'Something that looks like treasure has swallowed three explorers.'},
  {id:'c_sw_forest', type:'sweep', zone:'forest',  n:[3,5], tier:0, icon:'🌲', name:'Patrol the Forest',       desc:'Win fights in Muxue Forest to keep the paths safe.'},
  {id:'c_sw_stream', type:'sweep', zone:'stream',  n:[3,5], tier:0, icon:'💧', name:'Watch the Stream',        desc:'Win fights at the Moonlit Stream.'},
  {id:'c_sw_rift',   type:'sweep', zone:'rift',    n:[3,4], tier:1, icon:'🌀', name:'Hold the Rift Waters',    desc:'Win fights at the Rift Waters to keep what lingers there from spreading.'},
  {id:'c_sw_temple', type:'sweep', zone:'temple',  n:[3,4], tier:2, icon:'🏯', name:'Walk the Temple Halls',   desc:'Win fights in the Ice Temple\'s upper level.'},
  {id:'c_sw_depths', type:'sweep', zone:'depths',  n:[3,4], tier:2, icon:'⛏️', name:'Sweep the Underground',   desc:'Win fights on the underground level.'},
  {id:'c_pelts',   type:'collect', item:'wolf_pelt',   n:[4,6], zone:'forest',  tier:0, icon:'🧶', name:'Pelts for the Winter',     desc:'The island\'s tailors need Wolf Pelts. Turn them in at the board.'},
  {id:'c_herbs',   type:'collect', item:'frost_herb',  n:[4,6], zone:'forest',  tier:0, icon:'🌿', name:'The Herbalist\'s Request', desc:'Frost Herbs for the physicians\' shelves.'},
  {id:'c_petals',  type:'collect', item:'moon_petal',  n:[4,6], zone:'forest',  tier:0, icon:'🌸', name:'Petals for the Lanterns',  desc:'Moon Petals for the lantern-makers.'},
  {id:'c_crystals', type:'collect', item:'ice_crystal', n:[3,5], zone:'stream', tier:0, icon:'💎', name:'Crystal Order',           desc:'Ice Crystals for a collector\'s cases.'},
  {id:'c_ash',     type:'collect', item:'imp_ash',     n:[3,5], zone:'chambers', tier:1, icon:'🌫️', name:'Ash for the Apothecary',  desc:'The apothecary wants Imp Ash for her tinctures.'},
  {id:'c_shards',  type:'collect', item:'rift_shard',  n:[2,4], zone:'rift',    tier:1, icon:'🔹', name:'Shard Collector',           desc:'A researcher pays well for Rift Shards.'},
];
const questLv = tpl => Math.max(1, avgPartyLv() + (zoneById(tpl.zone) ? zoneById(tpl.zone).off : 0));
function mkContract(tpl){
  const need = rint(tpl.n), lv = questLv(tpl), tier = renownTier();
  let xp = 0, gold = 0;
  if(tpl.type === 'kill'){ const e = mkEnemy(tpl.key, lv), m = e.elite ? 1.6 : 1.0; xp = e.xp*need*m; gold = e.gold*need*m; }
  else { const z = zoneById(tpl.zone), ref = mkEnemy(AR(z.pool), lv), m = tpl.type === 'sweep' ? 1.5 : .8; xp = ref.xp*need*m; gold = ref.gold*need*m; }
  const rw = { xp:Math.round(xp), gold:Math.round(gold*(1+.05*tier)), rep:2 + need + (tpl.tier||0)*3 };
  if(Math.random() < .25) rw.items = [{id:'moonlit_tonic', qty:1}];
  return { uid:'q'+Math.random().toString(36).slice(2,8), tpl:tpl.id, type:tpl.type, key:tpl.key, item:tpl.item, zone:tpl.zone, need, c:0, lv, rw, icon:tpl.icon, name:tpl.name, desc:tpl.desc };
}
function boardList(){
  const b = BD(); if(b.list.day === G.day && b.list.items.length) return b.list.items;
  const taken = new Set(BD().active.map(q => q.tpl)), tier = renownTier();
  const pool = CONTRACTS.filter(t => !taken.has(t.id) && t.tier <= tier && (!t.zone || zoneOpen(zoneById(t.zone))));
  b.list = { day:G.day, items:pool.sort(() => Math.random()-.5).slice(0, BOARD_SIZE).map(mkContract) };
  return b.list.items;
}
function acceptContract(i){
  const q = boardList()[i]; if(!q || BD().active.length >= MAX_CONTRACTS) return [];
  BD().list.items.splice(i,1); BD().active.push(q); save(); return ['📋 Contract accepted: '+q.name+'.'];
}
function abandonContract(i){ BD().active.splice(i,1); save(); return []; }
const rewardText = rw => [rw.xp&&'+'+rw.xp+' XP', rw.gold&&'+'+rw.gold+'g', rw.rep&&'+'+rw.rep+' renown', (rw.items||[]).map(d => ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+d.qty).join(', ')].filter(Boolean).join(' · ');
function payOut(rw, msgs){
  const before = renownTier();
  gainXp(rw.xp, G.party).forEach(m => msgs.push(m)); G.gold += rw.gold||0; BD().renown += rw.rep||0;
  if(rw.items){ addItems(rw.items); }
  if(renownTier() > before) msgs.push('🏅 Your renown on the board grows: '+RENOWN_TIERS[renownTier()][1]+'. Harder contracts are posted.');
}
function finishContract(q, msgs){
  BD().active = BD().active.filter(x => x !== q); BD().done++;
  msgs.push('📋 Contract complete: '+q.name+' · '+rewardText(q.rw)); payOut(q.rw, msgs);
}
function turnInContract(i){
  const q = BD().active[i]; if(!q || q.type !== 'collect' || (G.inv[q.item]||0) < q.need) return ['You do not have enough yet.'];
  G.inv[q.item] -= q.need; const msgs = []; finishContract(q, msgs); save(); return msgs;
}

/* bounty board: targets from open zones, refreshed every BOUNTY_REFRESH_DAYS days; pays out on its own when you finish the hunt */
function bountyKeys(){
  const keys = new Set(); ZONES.filter(zoneOpen).forEach(z => { z.pool.forEach(k => keys.add(k)); });
  return Array.from(keys).filter(k => ENEMIES[k] && !ENEMIES[k].boss);
}
function refreshBountyBoard(force){
  const b = BD().bounties;
  if(!force && b.list.length && G.day - b.day < BOUNTY_REFRESH_DAYS) return;
  const lv = Math.max(1, avgPartyLv() + 1), tier = renownTier();
  const list = bountyKeys().sort(() => Math.random()-.5).slice(0, 5).map(k => {
    const base = ENEMIES[k], e = mkEnemy(k, lv), need = base.elite ? 1 : 2 + Math.floor(Math.random()*3), m = base.elite ? 1.6 : 1.0;
    return { id:'b_'+k, key:k, need, c:0, done:false, icon:base.icon, name:(base.elite ? 'Wanted: ' : 'Cull: ')+base.n+(base.elite ? '' : ' ×'+need), lv,
             rw:{ xp:Math.round(e.xp*need*m), gold:Math.round(e.gold*need*m*(1+.05*tier)), rep:base.elite ? 6 : 2+need } };
  });
  BD().bounties = { day:G.day, list };
}

/* called by battle.js after a rewarded victory */
function boardOnWin(foes, zone){
  const msgs = []; if(!boardOpen()) return msgs;
  refreshBountyBoard();
  foes.forEach(f => {
    BD().active.slice().forEach(q => { if(q.type === 'kill' && q.key === f.key){ q.c = Math.min(q.need, q.c+1); if(q.c >= q.need) finishContract(q, msgs); } });
    BD().bounties.list.forEach(b => { if(!b.done && b.key === f.key){ b.c = Math.min(b.need, b.c+1);
      if(b.c >= b.need){ b.done = true; msgs.push('💰 Bounty complete: '+b.name+' · '+rewardText(b.rw)); payOut(b.rw, msgs); } } });
  });
  if(zone) BD().active.slice().forEach(q => { if(q.type === 'sweep' && q.zone === zone){ q.c = Math.min(q.need, q.c+1); if(q.c >= q.need) finishContract(q, msgs); } });
  return msgs;
}
function askAround(){ advanceBoardDay(); BD().list = {day:0, items:[]}; return ['☀️ A day passes. The postings change.']; }
function advanceBoardDay(){ G.day++; save(); }

/* ---------- quest log (side tracker) ---------- */
let trackerOpen = false;
function toggleTracker(){ trackerOpen = !trackerOpen; renderTracker(); }
function trackerCount(){ if(!G || !G.board) return 0; return BD().active.length + BD().bounties.list.filter(b => !b.done && b.c > 0).length; }
const contractProgress = q => q.type === 'collect' ? Math.min(G.inv[q.item]||0, q.need)+'/'+q.need+' in pack' : q.type === 'sweep' ? q.c+'/'+q.need+' fights won' : q.c+'/'+q.need;
function renderTracker(){
  const el = $('tracker'); if(!el || !G || !G.board) return;
  const btn = $('trkbtn'); if(btn){ btn.style.display = boardOpen() ? '' : 'none'; btn.innerHTML = '📋' + (trackerCount() ? '<b class="trkn">'+trackerCount()+'</b>' : ''); }
  el.classList.toggle('open', trackerOpen && boardOpen());
  if(!trackerOpen || !boardOpen()){ el.innerHTML = ''; return; }
  const qs = BD().active.map(q => `<div class="trk"><b>${q.icon} ${q.name}</b><div class="sm">${contractProgress(q)}</div></div>`).join('');
  const open = BD().bounties.list.filter(b => !b.done), live = open.filter(b => b.c > 0), idle = open.length - live.length;
  const bs = live.map(b => `<div class="trk"><b>${b.icon} ${b.name}</b><div class="sm">${b.c}/${b.need}</div></div>`).join('');
  const story = (G.bounty && G.bounty.red && G.bounty.red.stage > 0 && G.bounty.red.stage < 5 ? `<div class="trk"><b>🏮 The Red Lantern Road</b><div class="sm">Story bounty · see Bounties</div></div>` : '')
    + (G.ch >= 58 && G.ch < 59 ? `<div class="trk"><b>🔎 The Portrait Without a Face</b><div class="sm">Investigation · see Bounties</div></div>` : '');
  el.innerHTML = `<div class="trkh"><b>Quest Log</b><button onclick="toggleTracker()">✕</button></div>
    <h5>Contracts (${BD().active.length}/${MAX_CONTRACTS})</h5>${qs || '<div class="sm">None accepted</div>'}
    <h5>Bounties</h5>${bs}${idle ? `<div class="sm">${idle} more posted. Just hunt the targets.</div>` : (bs ? '' : '<div class="sm">None</div>')}
    ${story ? `<h5>Story</h5>${story}` : ''}<div class="sm" style="margin-top:6px"><a href="#" onclick="toggleTracker();showTab('board');return false">Open the Quest Board</a></div>`;
}

/* ---------- the Quest Board tab ---------- */
function rBoard(){
  if(!boardOpen()) return '<h2>Quest Board</h2><div class="sm">🔒 The board at the Crimson Fairy opens after chapter '+BOARD_OPEN_CH+'.</div>';
  refreshBountyBoard();
  const tier = renownTier(), nxt = renownNext();
  const active = BD().active.map((q,i) => {
    const ready = q.type === 'collect' && (G.inv[q.item]||0) >= q.need;
    return `<div class="card" style="cursor:default"><span class="big">${q.icon}</span><div class="fl"><b>${q.name}</b><div class="sm">${q.desc}</div>
      <div class="sm">${q.type === 'collect' ? 'Turn in '+q.need+' × '+ITEMS[q.item].icon+' '+ITEMS[q.item].n : q.type === 'sweep' ? 'Win '+q.need+' fights in '+zoneById(q.zone).n : 'Defeat '+q.need+' × '+ENEMIES[q.key].icon+' '+ENEMIES[q.key].n} · <b>${contractProgress(q)}</b></div>
      <div class="sm">${rewardText(q.rw)}</div>
      <div>${q.type === 'collect' ? `<button class="pri" ${ready?'':'disabled'} onclick="act(()=>turnInContract(${i}))">Turn in</button>` : ''}<button onclick="act(()=>abandonContract(${i}))">Abandon</button></div></div></div>`; }).join('');
  const full = BD().active.length >= MAX_CONTRACTS;
  const posted = boardList().map((q,i) => `<div class="card" style="cursor:default"><span class="big">${q.icon}</span><div class="fl"><b>${q.name}</b><div class="sm">${q.desc}</div>
      <div class="sm">${q.type === 'collect' ? 'Bring '+q.need+' × '+ITEMS[q.item].icon+' '+ITEMS[q.item].n : q.type === 'sweep' ? 'Win '+q.need+' fights in '+zoneById(q.zone).n : 'Defeat '+q.need+' × '+ENEMIES[q.key].icon+' '+ENEMIES[q.key].n} · foes Lv ~${q.lv}</div>
      <div class="sm">${rewardText(q.rw)}</div><button class="pri" ${full?'disabled':''} onclick="act(()=>acceptContract(${i}))">Accept</button></div></div>`).join('');
  const bounties = BD().bounties.list.map(b => `<div class="card ${b.done?'lock':''}" style="cursor:default"><span class="big">${b.icon}</span><div class="fl"><b>${b.name}</b>
      <div class="sm">${b.done ? '✔ Paid out' : b.c+'/'+b.need+' · foes Lv ~'+b.lv}</div><div class="sm">${rewardText(b.rw)}</div></div></div>`).join('');
  const left = Math.max(0, BOUNTY_REFRESH_DAYS - (G.day - BD().bounties.day));
  return `<h2>Quest Board</h2>${flashHtml()}<div class="sm">The board at the Crimson Fairy. Contracts and bounties here are everyday work, separate from the story.</div>
    <div class="panel"><b>🏅 Standing: ${RENOWN_TIERS[tier][1]}</b><div class="sm">${nxt ? nxt+' renown to '+RENOWN_TIERS[tier+1][1]+'. Higher standing posts harder contracts and pays a little more gold.' : 'The highest standing.'} · ${BD().done} contracts done</div></div>
    <h4>Your contracts (${BD().active.length}/${MAX_CONTRACTS})</h4>${active || '<div class="sm">None accepted. Pick from the board below, then hunt in the Wilds.</div>'}
    <h4>Posted today</h4>${posted || '<div class="sm">Nothing suitable is posted.</div>'}
    <button onclick="act(askAround)">☀️ Ask around for new postings (passes a day)</button>
    <h4>Bounty board</h4><div class="sm">No need to accept: hunt a target anywhere in the Wilds and it pays out. New bounties in ${left||'a moment'} ${left===1?'day':'days'}.</div>${bounties}`;
}
