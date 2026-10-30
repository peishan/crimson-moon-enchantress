/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XIYU'S BASES (guild hubs)
   One tab, "🏠 Bases", gathers the Quest Board (contracts), the Bounties and Xiyu's communication line, plus free rest and a view of the party.
   Two bases so far (BASES below; change an `open` chapter to move one):
     Muxue  opens at chapter 409 (Volume 12 comic 025: Xiyu formally establishes her base and the mirror-array link).
     Yilong opens at chapter 429 (Volume 13 comic 005: Xiyu buys a residence in Yilong, her second base).
   Once a base is open this tab replaces the separate Quest Board and Bounties tabs; both systems still run from scripts/board.js and
   scripts/bounties.js, so the board and bounties are shared by every base. Xiyu's communication refreshes the postings from anywhere,
   once per game day (shared by both bases), without passing a day; the Quest Board's "Ask around" still passes a day.
   Art slots (all optional, fall back to an icon): assets/base/<hall|board|bounty|comms>.webp for Muxue and assets/base/yilong/<same names>
   for Yilong. See docs/BASE_ART.md. Not built: residents, wings, upgrades, and the caretaker (a Muxue extended-cast member the author will establish).
   ===================================================================== */
const BASES = [
  {id:'muxue',  n:'Muxue Base',  icon:'🏯', open:409, rest:'fairy',       art:'',
   hall:'Xiyu\'s own hall in Muxue, the party\'s place to come back to: beds that are always free, and a board of work for the road ahead.',
   comms:'The mirror array Xiyu set up at Muxue: her people there can reach her wherever she is, with word of her father, Muxue Yan, or anything that needs her.'},
  {id:'yilong', n:'Yilong Base', icon:'🏮', open:429, rest:'yilong_base', art:'yilong/',
   hall:'A quiet residence in Yilong with a discreet entrance, a study, a secure communication room and space for Xiyu\'s people: the party\'s own place in the city, so they need not depend on Zhan Manor.',
   comms:'The secure communication room, with the link Xiyu uses to reach A\'Bu and the witch doctors he writes to. Her name stays out of the inquiries.'},
];
const baseIsOpen = b => G.ch >= b.open;
const openBases = () => BASES.filter(baseIsOpen);
const baseOpen = () => openBases().length > 0;
const baseById = id => BASES.find(b => b.id === id);
let baseSel = 'muxue', baseSection = 'hall';
const BASE_SECTIONS = [['hall','🏠 Hall'],['board','📋 Quest Board'],['bounties','📜 Bounties'],['comms','📨 Comms']];
const baseArt = (b, k, icon) => artOrIcon('assets/base/'+b.art+k+'.webp', icon, 'baseimg');
function curBase(){ const ob = openBases(); return ob.find(b => b.id === baseSel) || ob[ob.length-1] || BASES[0]; }

function commsReady(){ return (G.flags.base_comms_day || 0) < G.day; }
function commsAsk(){
  if(!commsReady()) return ['Xiyu has already asked for word today. Ask around in person on the Quest Board to let a day pass.'];
  G.flags.base_comms_day = G.day;
  BD().list = {day:0, items:[]};
  return ['📨 Xiyu sends word out and the replies come back: the postings have changed.'];
}
function baseTabTo(k){ baseSection = k; render(); window.scrollTo(0,0); }
function baseSelect(id){ baseSel = id; baseSection = 'hall'; render(); window.scrollTo(0,0); }

function rBase(){
  const ob = openBases(), b = curBase();
  const pick = ob.length > 1 ? `<div class="row" style="margin:6px 0">${ob.map(x => `<button class="${x.id===b.id?'pri':''}" onclick="baseSelect('${x.id}')">${x.icon} ${x.n}</button>`).join('')}</div>` : '';
  const nav = `<div class="row" style="margin:6px 0">${BASE_SECTIONS.map(([k,l]) => `<button class="${baseSection===k?'pri':''}" onclick="baseTabTo('${k}')">${l}</button>`).join('')}</div>`;
  let body = '';
  if(baseSection === 'board') body = `<div class="panel">${baseArt(b,'board','📋')}<div class="sm">The contract wall of the ${b.n}. Contracts and bounties are shared by all of Xiyu's bases.</div></div>` + rBoard().replace('<h2>Quest Board</h2>','');
  else if(baseSection === 'bounties') body = `<div class="panel">${baseArt(b,'bounty','📜')}<div class="sm">The bounty wall of the ${b.n}.</div></div>` + rBounties().replace('<h2>Bounties</h2>','');
  else if(baseSection === 'comms'){
    const done = BD().done, tier = RENOWN_TIERS[renownTier()][1];
    body = `<div class="panel">${baseArt(b,'comms','📨')}<h3>📨 Xiyu's communication</h3>
      <div class="sm">${b.comms}</div>
      <div class="sm" style="margin-top:4px">While the party travels, Xiyu can ask for fresh postings without losing a day, once per game day. Contracts are still done in the field: accept here, hunt in the Wilds, and the board pays out.</div>
      <div style="margin-top:6px"><button class="pri" ${commsReady()?'':'disabled'} onclick="act(commsAsk)">📨 Ask for new postings ${commsReady()?'':'(asked today)'}</button></div>
      <div class="sm" style="margin-top:6px">🏅 Standing: ${tier} · ${done} contracts finished · ${BD().active.length}/${MAX_CONTRACTS} accepted</div></div>`;
  } else {
    const ready = BD().active.filter(q => q.type==='collect' && (G.inv[q.item]||0) >= q.need).length;
    const left = Math.max(0, BOUNTY_REFRESH_DAYS - (G.day - BD().bounties.day));
    body = `<div class="panel">${baseArt(b,'hall',b.icon)}<h3>${b.icon} The ${b.n}</h3>
      <div class="sm">${b.hall} Day ${G.day} · ${timeLabel()}</div>
      <div style="margin-top:6px"><button class="pri" onclick="act(()=>restAt('${b.rest}'))">🛏️ Rest (free)</button><button onclick="baseTabTo('comms')">📨 Send word</button></div></div>
      <div class="panel"><b>📋 Work on the board</b><div class="sm">${BD().active.length} contract(s) accepted · ${ready ? ready+' ready to turn in · ' : ''}${BD().bounties.list.filter(x=>!x.done).length} bounty target(s) open (new in ${left||'a moment'} ${left===1?'day':'days'}).</div>
      <div style="margin-top:6px"><button onclick="baseTabTo('board')">📋 Quest Board</button><button onclick="baseTabTo('bounties')">📜 Bounties</button></div></div>
      <div class="panel"><b>👥 With the party</b><div class="sm">${G.active.map(id => CHARACTERS[id].icon+' '+first(id)+' Lv'+U(id).lv).join(' · ') || 'Xiyu'}</div>
      ${Object.keys(G.away||{}).length ? `<div class="sm" style="margin-top:4px">⚓ Away: ${Object.keys(G.away).map(id => first(id)).join(', ')}</div>` : ''}</div>`;
  }
  return `<h2>🏠 ${b.n}</h2>${flashHtml()}${pick}${nav}${body}`;
}
