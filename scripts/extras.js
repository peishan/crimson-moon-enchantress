/* =====================================================================
   SKIRMISH · ECHOES · CHRONICLE · DEEDS  (ported from Tribute's design)
   SKIRMISH  random fights drawn from every area the party can reach right now, with difficulty tiers and a win streak. Keep-hunting works here too.
   ECHOES    a zone boss you have already beaten can be met again a few levels higher: its normal loot, a zone material and a purse of gold.
   CHRONICLE a permanent in-world log (G.chron), dated by story day. Anything can add to it with chronicle(text, icon).
   DEEDS     pure recognition (no rewards). Each ok() only reads state the game already keeps. Unearned deeds show as ???. G.deeds = {id: day}.
   ===================================================================== */
/* ---------- chronicle ---------- */
const CHRON_MAX = 400;
function chronicle(text, icon){
  if(!G || !text) return;
  if(!G.chron) G.chron = [];
  const last = G.chron[G.chron.length-1]; if(last && last.t === text && last.d === G.day) return;
  G.chron.push({t:text, i:icon || '📖', d:G.day, c:G.ch});
  if(G.chron.length > CHRON_MAX) G.chron.splice(0, G.chron.length - CHRON_MAX);
}
let chronFilter = 'all', dView = 'deeds';
const CHRON_KINDS = [['all','All'],['story','Story'],['world','World'],['deeds','Deeds']];
const chronKind = e => /📖|🏆|🌙/.test(e.i) ? 'story' : /🏅/.test(e.i) ? 'deeds' : 'world';
function rChronicle(){
  const all = (G.chron || []).slice().reverse(), list = chronFilter === 'all' ? all : all.filter(e => chronKind(e) === chronFilter);
  const filt = CHRON_KINDS.map(([k,l]) => `<button class="${chronFilter===k?'pri':''}" onclick="chronFilter='${k}';render()">${l}</button>`).join('');
  return `<div class="sm">A record of what the party has done, kept by story day. New entries appear as the story, the hunts and the travels move.</div><div class="row" style="margin:6px 0">${filt}</div>${list.length ? list.slice(0,60).map(e => `<div class="ev"><div><span class="sm">Day ${e.d}${e.c >= 0 ? ' · '+chName(e.c) : ''}</span><div>${e.i} ${e.t}</div></div></div>`).join('') + (list.length > 60 ? `<div class="sm">…and ${list.length-60} older entries.</div>` : '') : '<div class="sm">Nothing here yet.</div>'}`;
}

/* ---------- deeds ---------- */
const DEED_CATS = [['story','📖 Story'],['hunt','⚔️ Hunting'],['world','🗺️ World'],['craft','🌿 Craft & days']];
const DEEDS = [];
const deed = (id, cat, n, icon, t, ok) => DEEDS.push({id, cat, n, icon, t, ok});
const bossKeys = () => ZONES.filter(z => z.boss && z.id !== 'trial').map(z => [].concat(z.boss)[0]);
const bossesBeaten = () => bossKeys().filter(k => G.bestiary[k]).length;
const deedShrines = () => (typeof SH === 'function' && SH().cleared) ? Object.keys(SH().cleared).length : 0;
let deedsBuilt = false;
function buildDeeds(){
  if(deedsBuilt) return; deedsBuilt = true;
  for(let v = 1; v <= 25; v++){
  const end = (v < 25 ? [null,VOL2_START,VOL3_START,VOL4_START,VOL5_START,VOL6_START,VOL7_START,VOL8_START,VOL9_START,VOL10_START,VOL11_START,VOL12_START,VOL13_START,VOL14_START,VOL15_START,VOL16_START,VOL17_START,VOL18_START,VOL19_START,VOL20_START,VOL21_START,VOL22_START,VOL23_START,VOL24_START,VOL25_START][v] : LAST_CHAPTER+1) - 1;
  deed('vol'+v, 'story', 'Volume '+v+' complete', '📖', (typeof VOL_NAMES !== 'undefined' && VOL_NAMES[v] || 'A volume')+': every chapter finished.', () => G.ch >= end);
}
}
[[10,'First steps'],[50,'Seasoned'],[100,'A hundred levels'],[200,'Beyond the island'],[300,'A name that travels'],[500,'Legend in the making'],[700,'Higher than the moon']].forEach(([l,n]) =>
  deed('lv'+l, 'story', n, '⭐', 'The party reached an average level of '+l+'.', () => avgPartyLv() >= l));
deed('boss1', 'hunt', 'A guardian falls', '⚔️', 'Defeated a Wilds boss.', () => bossesBeaten() >= 1);
deed('boss4', 'hunt', 'Four guardians', '⚔️', 'Defeated four Wilds bosses.', () => bossesBeaten() >= 4);
deed('best15', 'hunt', 'A naturalist', '📕', 'Fifteen kinds of creature met.', () => Object.keys(G.bestiary).length >= 15);
deed('best40', 'hunt', 'The bestiary fills', '📕', 'Forty kinds of creature met.', () => Object.keys(G.bestiary).length >= 40);
[[10,'Ten wins'],[100,'A hundred wins'],[500,'Five hundred wins'],[2000,'Tireless']].forEach(([n,t]) => deed('wins'+n, 'hunt', t, '🗡️', n+' battles won.', () => (G.wins||0) >= n));
deed('skirm3', 'hunt', 'On a roll', '🎲', 'A skirmish streak of 3.', () => ((G.skirm||{}).best||0) >= 3);
deed('skirm10', 'hunt', 'Unbroken', '🎲', 'A skirmish streak of 10.', () => ((G.skirm||{}).best||0) >= 10);
deed('brutal1', 'hunt', 'Brutal', '🔥', 'Won a skirmish on Brutal.', () => ((G.skirm||{}).brutal||0) >= 1);
deed('echo1', 'hunt', 'An echo answered', '🔁', 'Defeated the echo of a boss you had already beaten.', () => echoCount() >= 1);
deed('echo4', 'hunt', 'Four echoes', '🔁', 'Defeated four different echoes.', () => echoCount() >= 4);
deed('sim1', 'hunt', 'Conjured', '🔮', 'Won a conjured hunt.', () => ((G.skirm||{}).sims||0) >= 1);
deed('shr1', 'world', 'A shrine silenced', '⛩️', 'Cleared a Dark Shrine.', () => deedShrines() >= 1);
deed('shr5', 'world', 'Five shrines', '⛩️', 'Cleared five Dark Shrines.', () => deedShrines() >= 5);
deed('tok', 'world', 'Through the token', '❄️', 'Travelled by the Ice Temple token.', () => !!(G.visitedWhere && G.visitedWhere.icetemple));
deed('boat', 'world', 'Home by the boat', '⛵', 'Sailed Xiyu\'s boat back to Muxue after the long road.', () => !!(G.visitedWhere && G.visitedWhere.boat));
deed('rest10', 'craft', 'Well rested', '🛏️', 'Rested ten times.', () => (G.rests||0) >= 10);
deed('herb10', 'craft', 'Green fingers', '🌿', 'Ten gathering trips.', () => ((G.herb||{}).gathered||0) >= 10);
deed('herb60', 'craft', 'The herbalist\'s pouch', '🌿', 'Sixty gathering trips.', () => ((G.herb||{}).gathered||0) >= 60);
deed('brew10', 'craft', 'A steady hand', '⚗️', 'Ten mixtures made.', () => ((G.herb||{}).made||0) >= 10);
deed('login3', 'craft', 'Three days running', '🎁', 'A daily login streak of 3.', () => ((G.login||{}).streak||0) >= 3);
deed('login7', 'craft', 'A full week', '🎁', 'A daily login streak of 7.', () => ((G.login||{}).streak||0) >= 7);
deed('codex6', 'craft', 'A collector', '📔', 'Six materials in the Codex.', () => Object.keys(G.codex||{}).length >= 6);
deed('codex16', 'craft', 'The Codex fills', '📔', 'Every material and trinket found.', () => Object.keys(G.codex||{}).length >= 16);
deed('letters5', 'craft', 'Kept in touch', '✉️', 'Five letters received.', () => Object.keys(G.letters||{}).length >= 5);
deed('chron50', 'craft', 'The Chronicle grows', '📜', 'Fifty entries in the Chronicle.', () => (G.chron||[]).length >= 50);

function deedsCheck(){
  if(!G || !G.party) return;
  buildDeeds();
  if(!G.deeds) G.deeds = {};
  const got = DEEDS.filter(d => !G.deeds[d.id] && (() => { try{ return d.ok(); }catch(e){ return false; } })());
  if(!got.length) return;
  got.forEach(d => { G.deeds[d.id] = G.day; });
  got.slice(0,6).forEach(d => chronicle('Deed: '+d.n, '🏅'));
  save();
  toast(got.length === 1 ? '🏅 Deed: '+got[0].n : '🏅 '+got.length+' deeds earned');
}
function rDeeds(){
  buildDeeds();
  const e = G.deeds || {}, n = DEEDS.filter(d => e[d.id]).length;
  const cats = DEED_CATS.map(([k,l]) => { const list = DEEDS.filter(d => d.cat === k);
    return `<h4>${l} <span class="sm">${list.filter(d => e[d.id]).length}/${list.length}</span></h4>` + list.map(d => e[d.id]
      ? `<div class="ev"><div><b>${d.icon} ${d.n}</b><div class="sm">${d.t} · Day ${e[d.id]}</div></div><span>✔</span></div>`
      : `<div class="ev locked"><div><b>❔ ???</b><div class="sm">Not yet earned</div></div></div>`).join(''); }).join('');
  return `<div class="sm">Pure recognition: no rewards, so nothing here changes the game. ${n}/${DEEDS.length} earned.</div>${cats}`;
}
function rDeedsTab(){
  const tabs = [['deeds','🏆 Deeds'],['chronicle','📜 Chronicle'],['codex','📔 Codex'],['letters','✉️ Letters']].map(([k,l]) => `<button class="${dView===k?'pri':''}" onclick="dView='${k}';render()">${l}</button>`).join('');
  return `<h2>Deeds, Chronicle, Codex &amp; Letters</h2><div class="row" style="margin:4px 0 8px">${tabs}</div>${dView === 'chronicle' ? rChronicle() : dView === 'codex' ? rCodex() : dView === 'letters' ? rLetters() : rDeeds()}`;
}

/* ---------- skirmish ---------- */
const SKIRM_DIFF = {normal:{n:'Normal', pct:0, mult:1}, hard:{n:'Hard', pct:.03, mult:1.5}, brutal:{n:'Brutal', pct:.06, mult:2.2, elite:true}};
let skirmDiff = 'normal';
const skirmState = () => G.skirm = G.skirm || {streak:0, best:0, wins:0, brutal:0, sims:0};
const skirmOff = D => D.pct ? Math.max(D === SKIRM_DIFF.brutal ? 8 : 4, Math.round(avgPartyLv()*D.pct)) : 0;
function skirmPool(){
  const keys = new Set(); ZONES.filter(zoneHere).forEach(z => z.pool.forEach(k => keys.add(k)));
  return Array.from(keys).filter(k => ENEMIES[k] && !ENEMIES[k].boss);
}
const skirmStreakBonus = () => Math.min(.5, skirmState().streak * .05);
function startSkirmish(){
  const D = SKIRM_DIFF[skirmDiff], pool = skirmPool(); if(!pool.length) return false;
  const lv = Math.max(1, avgPartyLv() + skirmOff(D)), elites = pool.filter(k => ENEMIES[k].elite), regular = pool.filter(k => !ENEMIES[k].elite);
  const n = Math.max(2, Math.min(2 + Math.floor(Math.random()*3), G.active.length + 1)), foes = [];
  if(D.elite && elites.length) foes.push({key:AR(elites), lv:lv+1});
  while(foes.length < n) foes.push({key:AR(regular.length ? regular : pool), lv:Math.max(1, lv + Math.floor(Math.random()*3) - 1)});
  const mult = D.mult * (1 + skirmStreakBonus());
  origin = 'skirmish';
  startBattle({foes, rewards:true, skirm:true, zone:null, onWin:() => {
    const s = skirmState(); s.streak++; s.wins++; s.best = Math.max(s.best, s.streak); if(D === SKIRM_DIFF.brutal) s.brutal++;
    const ref = foes.reduce((a, f) => a + mkEnemy(f.key, f.lv).xp, 0), refG = foes.reduce((a, f) => a + mkEnemy(f.key, f.lv).gold, 0);
    const xp = Math.round(ref*(mult-1)), gold = Math.round(refG*(mult-1)), msgs = ['🎲 Skirmish won (streak '+s.streak+').'];
    if(xp > 0 || gold > 0){ gainXp(xp, G.active).forEach(m => msgs.push(m)); G.gold += gold; msgs.push('Skirmish bonus: +'+xp+' XP, +'+gold+'g (×'+mult.toFixed(2)+')'); }
    return msgs; }});
  return true;
}
function skirmGo(){ if(startSkirmish()){ tab = 'battle'; render(); } }
const skirmLost = () => { if(G && G.skirm) G.skirm.streak = 0; };

/* ---------- echoes ---------- */
const echoes = () => G.echo = G.echo || {};
const echoCount = () => Object.keys(G.echo || {}).length;
const echoZones = () => ZONES.filter(z => z.boss && z.id !== 'trial' && zoneHere(z) && G.bestiary[[].concat(z.boss)[0]]);
function doEcho(zid){
  const z = ZONES.find(x => x.id === zid); if(!z || !echoZones().includes(z)) return;
  const lv = Math.max(1, avgPartyLv() + z.off + Math.max(3, Math.round(avgPartyLv()*.02))), keys = [].concat(z.boss);
  const foes = keys.map(k => ({key:k, lv}));
  origin = 'skirmish';
  startBattle({foes, rewards:true, echo:true, firstClear:false, zone:null, onWin:() => {
    const n = echoes()[z.id] = (echoes()[z.id] || 0) + 1, msgs = [], gold = Math.round(mkEnemy(keys[0], lv).gold*1.5);
    G.gold += gold; msgs.push('🔁 The echo fades. +'+gold+'g');
    const mats = []; z.pool.forEach(k => (ENEMIES[k].drops || []).forEach(d => mats.push(d.id)));
    for(let i = 0; i < 2 && mats.length; i++){ const id = AR(mats); addItems([{id, qty:1}]); msgs.push('Found '+ITEMS[id].icon+' '+ITEMS[id].n+' ×1'); }
    if(n === 1) chronicle('Met the echo of '+(z.bossName || ENEMIES[keys[0]].n)+' and prevailed.', '🔁');
    return msgs; }});
  tab = 'battle'; render();
}

function rSkirmish(){
  const s = skirmState(), pool = skirmPool(), D = SKIRM_DIFF[skirmDiff], lv = Math.max(1, avgPartyLv() + skirmOff(D));
  const diffBtns = Object.keys(SKIRM_DIFF).map(k => `<button class="${skirmDiff===k?'pri':''}" onclick="skirmDiff='${k}';render()">${SKIRM_DIFF[k].n}</button>`).join('');
  const ez = echoZones(), echoRows = ez.length ? ez.map(z => `<div class="ev"><div><b>${z.icon} ${z.bossName || ENEMIES[[].concat(z.boss)[0]].n}</b><div class="sm">${z.n} · Lv ~${Math.max(1, avgPartyLv() + z.off + Math.max(3, Math.round(avgPartyLv()*.02)))} · echoes met: ${(G.echo||{})[z.id]||0}</div></div><button onclick="doEcho('${z.id}')">Face the echo</button></div>`).join('') : '<div class="sm">No beaten boss is within reach here. Beat a Wilds boss first.</div>';
  return `<h2>Skirmish &amp; Echoes</h2><div class="sm">📍 ${whereLabel()}. Random fights from every area within reach: a mixed group, real rewards, and a bonus for tougher settings and a winning streak. No time passes and nothing is restored.</div>${flashHtml()}
   <div class="panel"><div class="row" style="margin:4px 0">${diffBtns}</div>
   <div class="sm">Enemy level ~${lv} · ${pool.length} kinds of foe${D.elite ? ' · with an elite' : ''} · rewards ×${D.mult}${skirmStreakBonus() ? ' + streak '+Math.round(skirmStreakBonus()*100)+'%' : ''}</div>
   <button class="pri" ${pool.length?'':'disabled'} onclick="skirmGo()">⚔️ Start a skirmish</button> ${pool.length ? '' : '<div class="sm">No areas are within reach: use the Simulation tab.</div>'}</div>
   <div class="sm">Streak ${s.streak} · best ${s.best} · skirmishes won ${s.wins}</div>
   <h4>🔁 Echoes</h4><div class="sm">A boss you have beaten can be met again as an echo a few levels higher: its normal loot, two materials and a purse of gold.</div>${echoRows}`;
}

/* ---------- wiring ---------- */
window.addEventListener('load', () => { const r0 = render; render = function(){ r0(); try{ deedsCheck(); timedCheck(); codexSync(); }catch(e){} }; });
