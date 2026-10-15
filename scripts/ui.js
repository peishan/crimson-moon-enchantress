/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — UI (tabs, journal, party, wilds, battle, items, gates)
   ===================================================================== */
const TABS = [['journal','📖 Journal'],['party','👥 Party'],['gates','🔓 Gates'],['wilds','🌲 Wilds'],['board','📋 Quest Board'],['bounties','📜 Bounties'],['confidants','💬 Confidants'],['seal','🔎 Seal & Sites'],['temple','🏯 Temple'],['cast','🎴 Cast'],['training','🎯 Training'],
              ['inventory','🎒 Items'],['bestiary','📕 Bestiary'],['save','💾 Save'],['dev','🛠️ Dev']];
let tab = 'journal', sel = 'xiyu', openCh = null, origin = 'journal', trSel = 0, trLv = 5, itemHero = 'xiyu', flash = [], castOpen = null;
const STAT_SCALE = {hp:420,mp:200,atk:130,mag:130,def:100,spd:90};
const STAT_NAME = {hp:'HP',mp:'MP',atk:'ATK',mag:'MAG',def:'DEF',spd:'SPD'};
const bar = (v,m,cls) => `<div class="bar ${cls||''}"><i style="width:${clamp(100*v/m,0,100)}%"></i></div>`;
const SHORT = {xiyu:'Xiyu', dongyue:'Dongyue', yaxing:'Ya\'Xing', xiaotian:'Xiao Tian', yan:'Yan', cangyuan:'Cangyuan', xining:'Xining'};
const first = id => SHORT[id] || CHARACTERS[id].n;
const ritualPanel = () => G.ritual && G.ritual.left!==null ? `<div class="panel ${G.ritual.done?'good':'bad'}"><b>⏳ The soul-bond ritual</b><div class="sm">${G.ritual.done?'Completed. The deadline no longer applies.':G.ritual.left+' day'+(G.ritual.left===1?'':'s')+' left before the receiver dies. Story-driven: it only changes at the chapters that say so, never with real time or a reload.'}</div></div>` : '';

function toast(t){ const e=$('toast'); e.textContent=t; e.classList.add('on'); clearTimeout(toast.t); toast.t=setTimeout(()=>e.classList.remove('on'),2200); }
function showTab(t){ tab=t; render(); window.scrollTo(0,0); const m=$('main'); if(m) m.scrollTop=0; }
const act = fn => { const r = fn(); flash = [].concat(r||[]); save(); render(); };
const flashHtml = () => { const f = flash; flash = []; return f.length ? `<div class="panel good">${f.map(m=>`<div>${m}</div>`).join('')}</div>` : ''; };

function render(){
  $('hgold').textContent = '💰 '+G.gold;
  $('hch').textContent = G.ch===0 ? 'Start' : chShort(G.ch)+' ✓';
  $('hday').textContent = '☀️ Day '+G.day;
  if(typeof renderTracker === 'function') renderTracker();
  const hr = $('hrit'); if(hr){ hr.style.display = ritualActive() ? '' : 'none'; hr.textContent = '⏳ '+(G.ritual.left)+(G.ritual.left===1?' day':' days'); }
  $('nav').innerHTML = (B?`<button class="${tab==='battle'?'on':''}" onclick="showTab('battle')">⚔️ Battle</button>`:'') +
     TABS.filter(([k]) => (k!=='temple' || templeOpen()) && (k!=='bounties' || bountyBoardOpen()) && (k!=='confidants' || relationsOpen()) && (k!=='board' || boardOpen()) && (k!=='seal' || sealOpen())).map(([k,l]) => `<button class="${tab===k?'on':''}" onclick="showTab('${k}')">${l}</button>`).join('');
  const R = { journal:rJournal, party:rParty, gates:rGates, wilds:rWilds, board:rBoard, bounties:rBounties, confidants:rConfidants, temple:rTemple, seal:rSeal, cast:rCast, training:rTraining, battle:rBattle, inventory:rInventory, bestiary:rBestiary, save:rSave, dev:rDev }[tab] || rJournal;
  $('main').innerHTML = R();
}

/* ---------------- PARTY ---------------- */
function gateLine(id){
  const j = JOIN_CH[id];
  if(isRecruited(id)) return `<span class="gate open">✔ In the party</span>`;
  if(j===undefined) return `<span class="gate shut">🔒 ${NO_JOIN_YET[id]||'Join chapter not decided'}</span>`;
  const g = chapterGate(j);
  return `<span class="gate shut">🔒 Joins when ${chName(j).toLowerCase()} is completed${g?' (needs average party Lv '+g.lv+')':''}</span>`;
}
function rParty(){
  const slots = Array.from({length:ACTIVE_SLOTS}, (_,i) => i).map(i => { const id = G.active[i];
    return id ? `<div class="slot on" onclick="sel='${id}';render()"><img src="${portrait(id)}"><b>${first(id)}</b><span class="sm">Lv${U(id).lv}</span></div>` : `<div class="slot"><span class="sm">empty</span></div>`; }).join('');
  const roster = ROSTER.filter(id => !CHARACTERS[id].vol2 || isRecruited(id) || profileKnown(id)).map(id => {
    const c = CHARACTERS[id], rec = isRecruited(id), known = profileKnown(id);
    return `<div class="rc ${sel===id?'sel':''} ${rec||known?'':'lock'}" onclick="sel='${id}';render()"><img src="${portrait(id)}"><div><b>${known?first(id):'???'}</b><div class="sm">${rec?'Lv'+U(id).lv:known?'Not in party':'Unknown'}</div></div></div>`; }).join('');
  return `<h2>Party</h2>${flashHtml()}<div class="sm">Active (${activeCount()}/${ACTIVE_SLOTS}) — fights use these seats.</div><div class="slots">${slots}</div><div class="rcs">${roster}</div>${rSheet(sel)}`;
}
function bondsHtml(){
  const dongyue = hook('dongyue_vows_lifelong_devotion'), cang = G.party.includes('cangyuan'), L = resLv();
  const row = (a,b) => `<div class="sm" style="display:flex;justify-content:space-between;gap:8px;padding:2px 0;border-bottom:1px solid rgba(212,168,67,.1)"><span>${a}</span><span>${b}</span></div>`;
  const dy = G.ch>=20 ? row('Ancient bond-spell (ch20)','cast · she feels his emotions')+row('Life-saving ritual','complete (ch32)')+row('Everlasting union / permanent soul bond','<b>not established</b>')+row('Muxue wedding ceremony',dongyue?(G.ch>=40?'ceremonial only: no papers filed':'held (ch35)'):'—')
         : '<div class="sm">Not yet.</div>';
  const cg = !cang ? '<div class="sm">Not met as a companion yet.</div>' : row('Crimson Thread Resonance',L+'/'+RES_MAX)+row('Dual cultivation', dualCultivationOpen() ? 'open (her choice)' : 'closed until Xiyu chooses it')+row('Permanent soul bond / marriage','none');
  const benefits = L>0 ? `<div class="sm" style="margin-top:4px">With Cangyuan beside her: paired techniques cost ${5*L}% less MP · her heat gain −${Math.round((.25+.05*L)*100)}% · his Steady cools +${5*L} more · she deals +${8*L}% to barriers, layers and linked foes${L>=2?' · senses severe disturbances':''}${L>=3?' · Thread-Breaker Formation':''}.</div>` : '';
  const btn = cang ? `<button ${dualCultivationOpen() && G.bondDay.dual!==G.day ? '' : 'disabled'} onclick="act(doDualCultivation)">🌹 Dual cultivation (by her choice)</button>` : '';
  return `<h4>Bonds</h4><div class="sm" style="font-style:italic;color:var(--gold)">Sharing one's spiritual energy does not mean surrendering one's soul. Sharing intimacy does not mean surrendering one's future.</div>
   <div class="sm" style="margin:6px 0 2px"><b>Zhan Dongyue</b></div>${dy}<div class="sm" style="margin:8px 0 2px"><b>Shen Cangyuan</b></div>${cg}${benefits}
   ${cang?`<div class="sm" style="margin-top:4px">The resonance cannot force either to stay, make anyone faithful, reveal thoughts or secrets, cure her corruption, or stop either from leaving.</div>`:''}${btn}`;
}
function curseHtml(){
  const h = G.heat||0, L = attuneLv(), cos = G.party.filter(id => id!=='xiyu');
  const done = G.bondDay.quiet === G.day;
  const btns = cos.map(id => `<button ${quietTimeReady(id)?'':'disabled'} onclick="act(()=>doQuietTime('${id}'))">🍵 ${first(id)}</button>`).join('');
  return `<h4>The Curse · Moon-Heat</h4><div class="sm">🔥 ${heatLabel(h)} (${Math.round(h)}/100)${h>40?' · magic dulled '+Math.round((1-heatMult(h))*100)+'%':''}. Casting builds heat; resting at the inn cools 40.</div>${bar(h,100,'e')}
   <div class="sm">🌙 Attunement ${L}/${ATTUNE_MAX}: +${2*L}% MAG, +${3*L}% MP, −${5*L}% heat gain${G.afterglow>0?' · ✨ Settled ('+G.afterglow+' battles)':''}. It grows as her bonds with her companions deepen.</div>${bar(L,ATTUNE_MAX,'bond')}
   <div class="sm" style="margin:4px 0">${cos.length ? (done ? 'She has spent quiet time with someone today. It can be repeated after the next day passes.' : 'Once a day Xiyu can spend quiet time with a companion: her heat settles by 30 and they grow closer.') : 'Quiet time with a companion opens once someone travels with her.'}</div>${btns}`;
}
function rSheet(id){
  const c = CHARACTERS[id], rec = isRecruited(id);
  if(!profileKnown(id)) return `<div class="panel"><h3>???</h3><div class="sm">Not met yet.</div><div style="margin-top:6px">${gateLine(id)}</div></div>`;
  const skills = skillsOf(id).map(s => `<div class="sk ${s.ok?'':'lk'}"><span class="si">${s.icon}</span><div class="fl"><b>${s.n}</b> ${s.sig?'<em class="tag">cast sheet</em>':''}<div class="sm">${s.desc}</div></div><div class="mp">${s.mp?s.mp+' MP':''}<div class="gate ${s.ok?'open':'shut'}">${s.ok?'✔ open':'🔒 '+s.why}</div></div></div>`).join('');
  if(!rec) return `<div class="panel"><div class="sh"><img src="${portrait(id)}"><div><h3>${c.icon} ${c.n} <span class="sm">${c.zh}</span></h3><div>${c.title}</div><div class="sm">${c.cls}</div><div class="sm">${c.role}</div></div></div>
    <div class="sm" style="margin:8px 0">${c.identity}</div><div>${gateLine(id)}</div><h4>Skills &amp; level gates</h4>${skills}</div>`;
  const u = U(id), st = statsOf(id), bl = bondLevel(id), nextB = BOND_LEVELS[bl+1], inAct = G.active.includes(id);
  const stats = STATS.map(s => `<div class="st"><span>${STAT_NAME[s]}</span>${bar(st[s],STAT_SCALE[s],s)}<b>${st[s]}</b></div>`).join('');
  return `<div class="panel sheet"><div class="sh"><img src="${portrait(id)}"><div><h3>${c.icon} ${c.n} <span class="sm">${c.zh}</span></h3><div>${c.title}</div><div class="sm">${c.cls}</div><div class="sm">${c.role}</div>
    <div class="sm">Lv ${u.lv}</div>${bar(u.xp,xpToNext(u.lv,id),'xp')}<div class="sm">XP ${u.xp}/${xpToNext(u.lv,id)}</div></div></div>
   <div class="sm" style="margin:6px 0">${c.identity}</div><div class="sm" style="font-style:italic;color:var(--gold)">“${c.quote}”</div>
   <div class="sm" style="margin-top:6px">${gateLine(id)} · Elements: ${c.elements}</div>
   ${id!=='xiyu'?`<div class="sm" style="margin-top:6px">💞 Bond with Xiyu: ${bl}/5 ${nextB?`(${u.bp}/${nextB})`:'(max)'} · +${bl*2}% stats</div>${bar(u.bp,nextB||u.bp||1,'bond')}`
     :`<div class="sm" style="margin-top:6px">💞 Party bond: ${bl}/5 (average companion bond)</div>`}
   ${isAway(id)?`<div class="panel bad"><b>⚓ Staying behind</b><div class="sm">${G.away[id]}</div></div>`:id==='xiyu'?'<div class="sm">Xiyu always leads the party.</div>':`<button onclick="toggleActive('${id}');render()">${inAct?'Remove from active party':'Add to active party'}</button>`}
   ${id==='xiyu'?curseHtml()+bondsHtml():''}
   <h4>Condition</h4><div class="sm">❤️ HP ${curHp(id)}/${st.hp} · 🔷 MP ${curMp(id)}/${st.mp}</div>${bar(curHp(id),st.hp,'hp')}${bar(curMp(id),st.mp,'mpb')}
   <h4>Stats</h4><div class="stg">${stats}</div>
   <h4>Skills &amp; level gates</h4>${skills}</div>`;
}

/* ---------------- GATES (party join gates + chapter level gates + skill gates) ---------------- */
function rGates(){
  const joinRows = ROSTER.map(id => { const j = JOIN_CH[id], g = j!==undefined ? chapterGate(j) : null;
    return `<tr><td><b>${first(id)}</b><div class="sm">${CHARACTERS[id].title}</div></td><td>${j===undefined?'—':chShort(j)}</td><td>${INTRO_CH[id]!==undefined?'Ch.'+INTRO_CH[id]:'—'}</td>
      <td>${g?'Avg Lv '+g.lv:j===undefined?'':'none'}</td><td>${isRecruited(id)?'<span class="gate open">✔ joined</span>':j===undefined?'<span class="gate shut">'+(CHARACTERS[id].vol2?'Volume 2 · TBD':'not written')+'</span>':G.ch>=j?'ready':'<span class="gate shut">locked</span>'}</td></tr>`; }).join('');
  const chRows = GATE_CHAPTERS.map(n => { const g = chapterGate(n), why = chapterLevelLock(n);
    const joins = recruitsAtChapter(n).filter(id=>id!=='xiyu').map(first), extra = n===13?'battle':n===20?'milestone':n===39?'Volume 1 finale':'';
    return `<tr><td><b>${chShort(n)}</b><div class="sm">${CHAPTERS[n-1]?CHAPTERS[n-1].title:'not scripted yet'}</div></td><td>Avg Lv ${g.lv}</td><td>${[joins.length?'joins: '+joins.join(', '):'',extra].filter(Boolean).join(' · ')}</td><td>${n<=G.ch?'<span class="gate open">✔ done</span>':why?'<span class="gate shut">'+why+'</span>':'<span class="gate open">open</span>'}</td></tr>`; }).join('');
  const skRows = ROSTER.map(id => `<tr><td><b>${first(id)}</b></td><td>${skillsOf(id).map(s => `${s.icon} ${s.n.replace(/ \(.*/,'')} <span class="gate ${s.ok?'open':'shut'}">${s.req.lvl?'Lv'+s.req.lvl:''}${s.req.flag?'+story':''}</span>`).join('<br>')}</td></tr>`).join('');
  return `<h2>Level gates</h2><div class="sm">Where each party member is gated, from the chapter breakdown. Details: docs/CHAPTER_GATES.md. Your party average is <b>Lv ${gateLv()}</b>.</div>
   <h4>Party members</h4><div class="panel"><table class="gtbl"><tr><th>Hero</th><th>Joins</th><th>Profile</th><th>Gate</th><th></th></tr>${joinRows}</table>
     <div class="sm" style="margin-top:6px">A new member arrives at (party average − 1). Muxue Yan does not join in Volume 1 (he stays at the Ice Temple); Ya'Xing stays behind after ch39.</div></div>
   <h4>Chapter level gates</h4><div class="panel"><table class="gtbl"><tr><th>Chapter</th><th>Needs</th><th>Why</th><th></th></tr>${chRows}</table>
     <div class="sm" style="margin-top:6px">Gated chapters stay locked until the average level of the party is reached. Wilds fights and training give the XP to catch up.</div></div>
   <h4>Skill gates</h4><div class="panel"><table class="gtbl">${skRows}</table></div>`;
}

/* ---------------- JOURNAL ---------------- */
function rJournal(){
  if(openCh!==null) return rChapter(openCh);
  const rows = CHAPTERS.map(c => (c.n===VOL2_START ? `<h4>Volume 2 · The Island That No Longer Feels Like Home</h4>` : c.n===1 ? `<h4>Volume 1 · The Long Awaited Love Is Not a Dream</h4>` : '') + (() => {
    const done = chapterDone(c.n), avail = chapterAvailable(c.n), next = c.n===G.ch+1, lock = next ? chapterLevelLock(c.n) : '';
    const joins = recruitsAtChapter(c.n).filter(id=>id!=='xiyu').map(first);
    return `<div class="card ${avail?'':'lock'} ${next?'cur':''}" onclick="${avail?`openChapter(${c.n})`:''}"><div class="fl"><b>${vnum(c.n)}. ${avail||next?c.title:'???'}</b>
      <div class="sm">${done?'✔ Complete':avail?'Available':lock?lock:'Locked'}${c.battle?' · ⚔️ battle':''}${c.pending?' · ⚠️ script pending':''}${joins.length?' · ★ '+joins.join(', ')+' joins':''}</div></div></div>`; })()).join('');
  return `<h2>Chapter Journal</h2><div class="sm">Chapters unlock in order. Each gives story XP; some also need an average party level.</div>${ritualPanel()}${rows}`;
}
function openChapter(n){ openCh = n; render(); if(!G.read[n] && !chapterDone(n)) openStory(n); }
function closeChapter(){ openCh = null; render(); }
const hasNextChapter = n => chapterDone(n) && n < CHAPTERS.length;
function goNextChapter(m){ if(S){ S = null; const e = storyEl(); e.classList.remove('on'); e.innerHTML = ''; } tab = 'journal'; openChapter(m); window.scrollTo(0,0); }
function nextChapterBtn(n){
  if(!hasNextChapter(n)) return '';
  const m = n+1;
  if(chapterAvailable(m)) return `<button class="pri" onclick="goNextChapter(${m})">Next chapter ▶ ${m}. ${CHAPTERS[m-1].title}</button>`;
  const lock = chapterLevelLock(m);
  return lock ? `<div class="panel"><b>🔒 ${chName(m)}: ${CHAPTERS[m-1].title}</b><div class="sm">${lock}. Hunt in the Wilds or train to catch up.</div></div>` : '';
}
function rChapter(n){
  const c = chapterOf(n), d = CHAPTER_DESIGN[n], done = chapterDone(n);
  const li = a => a.map(x => `<div class="li">• ${x}</div>`).join('');
  let foot = '';
  if(c.battle){
    foot = `<div class="panel"><b>⚔️ Battle</b><div class="sm">${c.battle.map(f=>ENEMIES[f.key].icon+' '+ENEMIES[f.key].n).join(' · ')}</div>
      <div class="sm">Fighting: ${fighterIds(n).map(id=>CHARACTERS[id].icon+' '+first(id)).join(' · ')} (Lv ${fightersLv(n)} average)</div>
      <button class="pri" onclick="chapterFight(${n})">${done?'Replay battle':'Begin battle'}</button></div>`;
  } else if(c.quest && !done){
    foot = `<div class="panel"><b>🔎 Investigation chapter</b><div class="sm">This chapter is completed by finishing the investigation: The Portrait Without a Face.</div>${G.ch>=58?`<button class="pri" onclick="showTab('bounties')">Open the investigation</button>`:'<div class="sm">Complete the previous chapter first.</div>'}</div>`;
  } else if(c.bounty && !done){
    foot = `<div class="panel"><b>📜 Bounty chapter</b><div class="sm">This chapter is completed by clearing the bounty and reporting back.</div>${bountyBoardOpen()?`<button class="pri" onclick="showTab('bounties')">Open the bounty board</button>`:'<div class="sm">The board opens after Volume 2, comic 014.</div>'}</div>`;
  } else if(!done) foot = `<button class="pri" onclick="finishChapter(${n})">Complete chapter (+${c.sxp} XP)</button>`;
  return `<button onclick="closeChapter()">◀ Journal</button><h2>${chName(n)} · ${c.title}</h2>
   <div class="panel"><div class="sm">📍 ${d.loc}${volOf(n)===1?' · Book chapter '+d.book:''}</div><div style="margin:6px 0">${d.sum}</div>
    <button class="pri" onclick="openStory(${n})">📖 ${G.read[n]?'Read again':'Read story'}</button>
    <details><summary class="sm">Key events · introduced · opens</summary>${d.events.length?'<h4>Key events</h4>'+li(d.events):''}${d.intro.length?'<h4>Introduced</h4>'+li(d.intro):''}${d.unlocks.length?'<h4>Opens</h4>'+li(d.unlocks.map(x=>'✅ '+x)):''}
    <div class="sm" style="margin-top:6px">On the page: ${d.chars.map(id=>CHARACTERS[id].icon+' '+first(id)).join(' · ')}</div>${hooksHtml(n)}</details></div>${flashHtml()}${foot}${nextChapterBtn(n)}`;
}
function hooksHtml(n){
  const hs = HOOKS[n]||[]; if(!hs.length) return '';
  return `<h4>Story hooks <span class="sm">· ${hs.filter(h=>hook(h.id)).length}/${hs.length} fired</span></h4>`+hs.map(h=>`<div class="li">${hook(h.id)?'✔':'○'} <code>${h.id}</code> <span class="sm">${h.t==='state'?'(state)':'(event)'}${h.p?' · provisional':''}</span><div class="sm">${h.d}</div></div>`).join('');
}
function finishChapter(n){ S = {n, mode:'result', msgs:completeChapter(n), units:[]}; drawStory(); }
function chapterFight(n){ origin='journal'; startBattle(battleSpecFor(n)); tab='battle'; render(); }

/* ---------------- WILDS ---------------- */
function rWilds(){
  const zones = ZONES.map(z => { const open = zoneOpen(z);
    return `<div class="card ${open?'':'lock'}" style="cursor:default">${open?zoneThumb(z):`<span class="big">${z.icon}</span>`}<div class="fl"><b>${open?z.n:'???'}</b><div class="sm">${open?z.desc+' · foes Lv ~'+Math.max(1,avgPartyLv()+z.off):z.unlock===null?'🔒 Not scheduled yet':'🔒 Opens after chapter '+z.unlock}</div></div>
      ${open?`<div><button onclick="wildFight('${z.id}')">Hunt</button>${z.boss?`<button onclick="wildFight('${z.id}',true)">${z.bossName?'Arena':'Boss'}</button>`:''}</div>`:''}</div>`; }).join('');
  const heroes = G.party.map(id => `<div class="sm">${CHARACTERS[id].icon} ${first(id)} — ❤️ ${curHp(id)}/${statsOf(id).hp} · 🔷 ${curMp(id)}/${statsOf(id).mp}</div>`).join('');
  return `<h2>The Wilds</h2><div class="sm">Gameplay hunting for XP, gold and herbs. These fights are not story events.</div>${flashHtml()}
   <div class="panel"><b>The Crimson Fairy</b><div class="sm">${heroes}</div><button onclick="act(restAtInn)">🛏️ Rest (${REST_COST()}g)</button></div>${zones}`;
}
/* Art slots with safe fallbacks: a missing file shows the emoji instead. assets/areas/<zone>.webp, assets/enemies/<key>.webp */
const artOrIcon = (src, icon, cls) => `<img class="${cls}" src="${src}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'big',textContent:'${icon}'}))">`;
const zoneThumb = z => artOrIcon('assets/areas/'+z.id+'.webp', z.icon, 'zthumb');
function wildFight(zid, boss){
  const z = ZONES.find(x => x.id===zid); if(!z || !zoneOpen(z)) return;
  const lv = Math.max(1, avgPartyLv() + z.off + (boss?1:0));
  const foes = boss ? [].concat(z.boss).map(k => ({key:k, lv})) : Array.from({length:Math.max(1,Math.min(2+Math.floor(Math.random()*2), G.active.length+1))}, () => ({key:AR(z.pool), lv:Math.max(1, lv+Math.floor(Math.random()*3)-1)}));
  origin = 'wilds'; startBattle({foes, rewards:true, zone:boss ? null : zid, firstClear:boss && !G.bestiary[[].concat(z.boss)[0]]}); tab='battle'; render();
}

/* ---------------- TEMPLE ---------------- */
let tempLv = 1, tempMap = false;
function rTemple(){
  if(tempMap && templeMapOpen()) return `<button onclick="tempMap=false;render()">◀ Temple</button><h2>Ice Temple Map</h2><img class="pg" src="${TEMPLE_MAP}" alt="Ice Temple map, Volume 1">`;
  const lvBtns = TEMPLE_LEVELS.map(l => `<button class="${tempLv===l.lv?'pri':''}" onclick="tempLv=${l.lv};render()">Level ${l.lv}</button>`).join('');
  const lv = TEMPLE_LEVELS.find(l => l.lv===tempLv), rooms = TEMPLE_ROOMS.filter(r => r.lv===tempLv);
  const found = TEMPLE_ROOMS.filter(roomFound).length;
  const rows = rooms.map(r => { const f = roomFound(r);
    return `<div class="card ${f?'':'lock'}" style="cursor:default"><span class="big">${f?TEMPLE_ICON[r.kind]:'❔'}</span><div class="fl"><b>${f?r.n:'???'}</b><div class="sm">${f?r.desc:(r.unlock===null?'Not scheduled yet':'Found after chapter '+r.unlock)}</div></div></div>`; }).join('');
  return `<h2>The Ice Temple</h2><div class="sm">A temple of ice, memories and secrets, hidden within the Xuancang Mountains. ${found}/${TEMPLE_ROOMS.length} places found.</div>
   ${templeMapOpen()?`<button class="pri" onclick="tempMap=true;render()">🗺️ View the full map</button>`:`<div class="sm">🔒 The map is revealed when exploration begins (planned: chapter ${TEMPLE_MAP_CH}).</div>`}
   <div class="row" style="margin:8px 0">${lvBtns}</div><div class="sm"><b>${lv.n}</b> — ${lv.sub}</div>${rows}
   <div class="sm" style="margin-top:8px">The sealed central chamber is a separate lock from the magical entry barrier. Rooms are the map's labels only; their story use is added with the chapters.</div>`;
}

/* ---------------- CAST ---------------- */
let personOpen = null;
/* Cast pages: unlock by chapter; the Volume 2 page stays locked (no names shown) until Volume 2. */
const CAST_SHEETS = [
  {id:'main',    n:'Main Characters', sub:'Muxue Xiyu and Zhan Dongyue: expressions, wardrobe, palette', img:'assets/cast/main_characters.webp', ch:2},
  {id:'cover1', n:'Volume 1 Cover', sub:'The Long Awaited Love Is Not a Dream', img:'assets/volume1_cover.webp', ch:39},
  {id:'season1', n:'Season 1 · Active Cast', sub:'Xiyu, Dongyue, Ya\'Xing, Xiao Tian and Muxue Yan', img:'assets/cast/season1.webp', ch:17},
  {id:'vol2',    n:'Volume 2 Cast', sub:'Shen Cangyuan and Lu Xining', img:'assets/cast/volume2.webp', ch:53},   // unlocks when Xining joins (V2 comic 014)
];
function rCast(){
  if(personOpen){ const p = PEOPLE.find(x => x.id===personOpen);
    return `<button onclick="personOpen=null;render()">◀ Cast</button><h2>${p.n} <span class="sm">${p.zh||''}</span></h2><img class="pg" src="assets/cast/people/${p.id}.webp" alt="${p.n}"><div class="sm">${p.role} · first appears in chapter ${p.intro}</div>`; }
  const open = x => x.ch!==null && G.ch >= x.ch;
  if(castOpen){ const x = CAST_SHEETS.find(y => y.id===castOpen); if(x && open(x)) return `<button onclick="castOpen=null;render()">◀ Cast</button><h2>${x.n}</h2><img class="pg" src="${x.img}" alt="${x.n}">`; castOpen = null; }
  const sheets = CAST_SHEETS.map(x => open(x) ? `<div class="card" onclick="castOpen='${x.id}';render()"><div class="fl"><b>${x.n}</b><div class="sm">${x.sub}</div></div><span class="sm">View</span></div>`
     : `<div class="card lock"><div class="fl"><b>${x.n}</b><div class="sm">🔒 Unlocks at ${chName(x.ch).toLowerCase()}</div></div></div>`).join('');
  const people = PEOPLE.map(p => { const k = personKnown(p);
    return `<div class="rc ${k?'':'lock'}" ${k?`onclick="personOpen='${p.id}';render()"`:''}><img src="assets/cast/people/${p.id}.webp"><div><b>${k?p.n:'???'}</b><div class="sm">${k?p.role:p.intro>=99?'Not in Season 1 yet':'Appears ch.'+p.intro}</div></div></div>`; }).join('');
  return `<h2>Cast</h2><div class="sm">Character profile sheets and portraits. Each unlocks as the story introduces them.</div>${sheets}<h4>People</h4><div class="rcs">${people}</div>`;
}

/* ---------------- TRAINING ---------------- */
const PRESETS = [
  ['Frost Wolves ×3',[{key:'frost_wolf'},{key:'frost_wolf'},{key:'frost_wolf'}]],
  ['Spirits (magical)',[{key:'moon_wisp'},{key:'ice_sprite'},{key:'imp'}]],
  ['Ward Sentinels ×2',[{key:'ward_sentinel'},{key:'ward_sentinel'}]],
  ['Ice Golem',[{key:'ice_golem'}]],
  ['BOSS: The Afflicting Imp',[{key:'afflicting_imp'}]],
  ['BOSS: Frost Warden',[{key:'frost_warden'},{key:'ice_sprite'}]],
];
function rTraining(){
  const opts = PRESETS.map((p,i) => `<option value="${i}" ${i===trSel?'selected':''}>${p[0]}</option>`).join('');
  return `<h2>Training Room</h2><div class="sm">Sandbox to test skills and gates. No rewards or losses.</div>
   <div class="panel"><label class="sm">Enemy group</label><select onchange="trSel=+this.value">${opts}</select>
   <label class="sm">Enemy level: <b id="trv">${trLv}</b></label><input type="range" min="1" max="40" value="${trLv}" oninput="trLv=+this.value;$('trv').textContent=this.value">
   <div class="sm">Party: ${G.active.map(id=>CHARACTERS[id].icon+' '+first(id)+' Lv'+U(id).lv).join(' · ')}</div>
   <button class="pri" onclick="trainFight()">Start training battle</button></div>`;
}
function trainFight(){ origin='training'; startBattle({foes:PRESETS[trSel][1].map(f=>({key:f.key,lv:trLv})), rewards:false}); tab='battle'; render(); }

/* ---------------- BATTLE ---------------- */
const CHIP = {burn:'🔥',slow:'🐌',bind:'⛓️',charm:'💫',silence:'🤐',shield:'🛡️',regen:'💚',crit:'👁️',oath:'🔁'};
function chips(u){
  let h = Object.keys(u.st).map(k=>`<i title="${k}">${CHIP[k]||k}</i>`).join('');
  u.bf.forEach(b => { h += `<i class="${b.m>=1?'up':'dn'}">${b.stat.toUpperCase()}${b.m>=1?'↑':'↓'}</i>`; });
  if(u.state) h += '<i>🩸</i>';
  if(u.guard) h += '<i>🛡</i>';
  return h;
}
function rBattle(){
  if(!B) return '<div class="sm">No battle in progress.</div>';
  const tgtMode = B.ui.mode==='target', cand = tgtMode ? B.ui.cands.map(u=>u.uid) : [];
  const foes = B.foes.map(f => `<div class="unit foe ${f.dead?'dead':''} ${cand.includes(f.uid)?'tg':''}" ${cand.includes(f.uid)?`onclick="pickTarget('${f.uid}')"`:''}><div class="ic">${artOrIcon('assets/enemies/'+f.key+'.webp', f.icon, 'ethumb')}</div><b>${f.name}</b>${bar(f.hp,f.mhp,'e')}<div class="sm">${f.hp}/${f.mhp}${f.known?' · DEF '+f.def:''}</div><div class="ch">${chips(f)}</div></div>`).join('');
  const allies = B.allies.map(a => `<div class="unit ally ${a.dead?'dead':''} ${B.cur===a&&!B.over?'cur':''} ${cand.includes(a.uid)?'tg':''}" ${cand.includes(a.uid)?`onclick="pickTarget('${a.uid}')"`:''}><img src="${a.img}"><div><b>${first(a.id)}</b>${bar(a.hp,a.mhp,'hp')}<div class="sm">${a.hp}/${a.mhp} · MP ${a.mp}</div>${a.id==='xiyu'?`<div class="sm">🔥 ${heatLabel(a.heat)} ${Math.round(a.heat||0)}${a.glow?' · ✨':''}</div>`:''}<div class="ch">${chips(a)}</div></div></div>`).join('');
  const log = B.log.slice(-9).map(l => `<div class="lg ${l.cls}">${l.t}</div>`).join('');
  let act = '';
  if(B.over==='win'){
    const r = B.rewards;
    act = `<div class="panel good"><b>Victory!</b><div>XP +${r.xp} · Gold +${r.gold}${r.real?'':' (sandbox: not awarded)'}</div>${r.drops.length?`<div>Loot: ${r.drops.map(d=>ITEMS[d.id].icon+' '+ITEMS[d.id].n+' ×'+d.qty).join(', ')}</div>`:''}${r.msgs.map(m=>`<div class="sm">${m}</div>`).join('')}</div><button class="pri" onclick="battleDone()">Continue</button>`;
  } else if(B.over==='lose'){
    act = `<div class="panel bad"><b>Defeat…</b></div><button class="pri" onclick="battleDone()">Retreat</button>`;
  } else if(B.cur && B.cur.ally){
    const u = B.cur, m = B.ui.mode;
    if(m==='menu') act = `<div class="sm">${first(u.id)}'s turn</div><div class="row"><button class="pri" onclick="doAttack()">Attack</button><button onclick="B.ui={mode:'skills'};render()">Skills</button><button onclick="B.ui={mode:'items'};render()">Items</button><button onclick="playerAct('guard')">Guard</button></div>`;
    else if(m==='items') act = (battleItems().map(i=>`<button class="skb" onclick="pickItem('${i.id}')">${i.icon} ${i.n} <small>×${i.qty||'∞'} ${i.text}</small></button>`).join('') || '<div class="sm">No consumables.</div>') + `<button onclick="B.ui={mode:'menu'};render()">◀ Back</button>`;
    else if(m==='skills') act = skillList(u).map(s=>`<button class="skb" ${s.usable?'':'disabled'} onclick="pickSkill('${s.id}')">${s.icon} ${s.n} <small>${s.cost?s.cost+'MP':''} ${s.note}</small></button>`).join('') + `<button onclick="B.ui={mode:'menu'};render()">◀ Back</button>`;
    else act = `<div class="sm">Choose a target</div><button onclick="B.ui={mode:'menu'};render()">◀ Cancel</button>`;
  }
  return `<div class="foes">${foes}</div><div class="log">${log}</div><div class="allies">${allies}</div><div class="acts">${act}</div>`;
}
function doAttack(){ B.ui={mode:'target',kind:'attack',sid:null,cands:alive(B.foes)}; render(); }
function pickSkill(sid){
  const s = skillList(B.cur).find(x => x.id===sid); if(!s||!s.usable) return;
  if(['foe','ally','allyDown'].includes(s.tgt)){ B.ui={mode:'target',kind:'skill',sid,cands:targetsFor(s)}; render(); }
  else { playerAct('skill', sid, null); }
}
function pickItem(k){ B.ui={mode:'target',kind:'item',sid:k,cands:alive(B.allies).concat(k==='cleansing_salt' ? alive(B.foes).filter(f => f.st.layer) : [])}; render(); }
function pickTarget(uid){ const u = B.ui; playerAct(u.kind, u.sid, uid); }
function battleDone(){
  if(B && B.spec.rewards && typeof afterBattleBackup==='function') setTimeout(afterBattleBackup, 0);
  const won = B && B.over==='win', ch = B && B.spec.chapter, msgs = B && B.rewards ? B.rewards.msgs : [];
  B = null; tab = origin; render();
  if(won && ch){ const d = CHAPTER_DESIGN[ch]; S = {n:ch, mode:'result', msgs, units:[]}; drawStory(); }
}
// every battle action re-renders
const _pa = playerAct; playerAct = function(k,s,t){ _pa(k,s,t); render(); };

/* ---------------- ITEMS / BESTIARY ---------------- */
function rInventory(){
  const ids = Object.keys(G.inv).filter(k => G.inv[k] > 0);
  if(!G.party.includes(itemHero)) itemHero = 'xiyu';
  const pick = `<div class="sm" style="margin:6px 0">Use on:</div><div class="row">${G.party.map(id=>`<button class="${itemHero===id?'pri':''}" onclick="itemHero='${id}';render()">${first(id)} ${curHp(id)}/${statsOf(id).hp}</button>`).join('')}</div>`;
  const rows = ids.length ? ids.map(k => { const i = ITEMS[k], us = USE[k];
    return `<div class="card" style="cursor:default"><span class="big">${i.icon}</span><div class="fl"><b>${i.n} ×${G.inv[k]}</b><div class="sm">${i.type}${us?' · '+useText(us):''}</div></div>${us?`<button onclick="act(()=>{useConsumable(itemHero,'${k}');return 'Used '+ITEMS['${k}'].n+' on '+CHARACTERS[itemHero].n.split(' ')[0]})">Use</button>`:''}</div>`; }).join('') : '<div class="sm">Nothing yet. Hunt in the Wilds for herbs and petals.</div>';
  const brews = RECIPES.map(r => `<div class="ev"><div><b>${ITEMS[r.out].icon} ${ITEMS[r.out].n}</b><div class="sm">${r.label}</div></div><button onclick="act(()=>brew('${r.out}'))">Brew</button></div>`).join('');
  const shop = Object.keys(SHOP).map(k => `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b><div class="sm">${useText(USE[k])}</div></div><button ${G.gold>=SHOP[k]?'':'disabled'} onclick="act(()=>buyItem('${k}')?'Bought '+ITEMS['${k}'].n:'Not enough gold')">${SHOP[k]}g</button></div>`).join('');
  return `<h2>Items</h2>${flashHtml()}<div class="sm">Gold: ${G.gold}</div>${pick}${rows}<h4>Brew</h4>${brews}<h4>Crimson Fairy shop</h4>${shop}`;
}
function rBestiary(){
  const keys = Object.keys(ENEMIES), found = keys.filter(k => G.bestiary[k]).length;
  return `<h2>Bestiary</h2><div class="sm">${found} / ${keys.length} discovered</div>`+keys.map(k => { const e = ENEMIES[k], n = G.bestiary[k];
    return n ? `<div class="card" style="cursor:default"><span class="big">${e.icon}</span><div class="fl"><b>${e.n}</b><div class="sm">${e.boss?'boss · ':e.elite?'elite · ':''}HP ${e.hp} · defeated ${n}</div><div class="sm">${e.desc}</div></div></div>`
             : `<div class="card lock"><span class="big">❔</span><div class="fl"><b>???</b><div class="sm">Undiscovered</div></div></div>`; }).join('');
}

/* ---------------- DEV ---------------- */
function rDev(){
  return `<h2>Dev tools</h2><div class="panel"><div class="sm">Jump the save to a story point (recruits, flags, levels):</div>
   <input id="devch" type="number" min="0" max="${LAST_CHAPTER}" value="${G.ch}"><button onclick="devSetChapter(+$('devch').value);toast('Story set');render()">Set chapter</button></div>
   <div class="panel"><div class="row"><button onclick="gainXp(500);save();render()">+500 XP (all)</button><button onclick="gainXp(5000);save();render()">+5000 XP</button>
   <button onclick="G.party.forEach(i=>addBond(i,60));save();render()">+60 bond</button><button onclick="G.gold+=500;save();render()">+500 gold</button>
   <button onclick="restoreParty();save();render()">Restore HP/MP</button><button onclick="templeReveal(true);render()">Reveal temple (all rooms + map)</button><button onclick="toast(Object.keys(G.hooks).length+' hooks fired')">Hooks fired</button><button onclick="G.heat=80;save();render()">Heat 80</button><button onclick="G.flags.xiyu_chooses_cangyuan=true;save();toast('Dual cultivation opened (Xiyu chooses)');render()">Open dual cultivation</button><button onclick="G.day++;save();render()">+1 day</button><button onclick="ROSTER.forEach(i=>{const lv=joinLevel(i); if(recruit(i)) U(i).lv=Math.max(U(i).lv,lv)});save();render()">Recruit everyone (incl. Yan)</button></div></div>
   <div class="panel"><button onclick="if(confirm('Erase save?')){localStorage.removeItem(CFG.SAVE_KEY);location.reload()}">Erase save</button></div>`;
}

/* ---------------- BOOT ---------------- */
function enter(newGame){
  if(newGame && localStorage.getItem(CFG.SAVE_KEY) && !confirm('Start a new journey? Your saved journey will be overwritten.')) return;
  if(newGame || !load()){ G = newState(); save(); }
  $('landing').style.display='none'; $('app').style.display='flex'; render();
}
window.addEventListener('load', () => {
  if(localStorage.getItem(CFG.SAVE_KEY)){
    $('contbtn').style.display = ''; $('contnote').style.display = '';
    $('newbtn').className = 'btn-continue';
  }
  const L = $('landing');   // drifting petals
  for(let i=0;i<22;i++){ const p = document.createElement('span'); p.className='petal';
    p.style.left = Math.random()*100+'%'; p.style.animationDuration = (7+Math.random()*7)+'s'; p.style.animationDelay = (-Math.random()*12)+'s';
    p.style.transform = 'scale('+(.6+Math.random()*.9)+')'; L.appendChild(p); }
});
