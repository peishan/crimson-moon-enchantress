/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — THE MUXUE BASE (guild hub)
   Xiyu's base in Muxue, kept as a hub: one tab that gathers the Quest Board (contracts), the Bounties and Xiyu's communication line,
   plus free rest and a view of the party. Opens when Xiyu formally establishes her base at Muxue (Volume 12 comic 025, chapter 409)
   (BASE_OPEN_CH, change this one number if the author wants another chapter). Once open it replaces the separate Quest Board and
   Bounties tabs; both still run the same systems (scripts/board.js, scripts/bounties.js).
   Xiyu's communication: she keeps a line open to Muxue, so postings can be refreshed from anywhere, once per game day, without
   passing a day (the Quest Board's "Ask around" still passes a day).
   Art slots (all optional, fall back to an icon): assets/base/exterior.webp, hall.webp, board.webp, bounty.webp, comms.webp. See docs/BASE_ART.md.
   Not built yet: residents, wings and a caretaker (a Muxue extended-cast member the author will establish) (see the Tribute estates and residents systems), base upgrades.
   ===================================================================== */
const BASE_OPEN_CH = 409;   // Volume 12 comic 025: Xiyu formally establishes her base and the mirror-array link
const baseOpen = () => G.ch >= BASE_OPEN_CH;
const BASE_SECTIONS = [['hall','🏠 Hall'],['board','📋 Quest Board'],['bounties','📜 Bounties'],['comms','📨 Comms']];
let baseSection = 'hall';
const baseArt = (k, icon) => artOrIcon('assets/base/'+k+'.webp', icon, 'baseimg');

function commsReady(){ return (G.flags.base_comms_day || 0) < G.day; }
function commsAsk(){
  if(!commsReady()) return ['Xiyu has already asked Muxue for word today. Ask around in person on the Quest Board to let a day pass.'];
  G.flags.base_comms_day = G.day;
  BD().list = {day:0, items:[]};
  return ['📨 Xiyu sends word to Muxue and the replies come back: the postings have changed.'];
}
function baseTabTo(k){ baseSection = k; render(); window.scrollTo(0,0); }

function rBase(){
  const nav = `<div class="row" style="margin:6px 0">${BASE_SECTIONS.map(([k,l]) => `<button class="${baseSection===k?'pri':''}" onclick="baseTabTo('${k}')">${l}</button>`).join('')}</div>`;
  let body = '';
  if(baseSection === 'board') body = `<div class="panel">${baseArt('board','📋')}<div class="sm">The contract wall of the Muxue base.</div></div>` + rBoard().replace('<h2>Quest Board</h2>','');
  else if(baseSection === 'bounties') body = `<div class="panel">${baseArt('bounty','📜')}<div class="sm">The bounty wall of the Muxue base.</div></div>` + rBounties().replace('<h2>Bounties</h2>','');
  else if(baseSection === 'comms'){
    const done = BD().done, tier = RENOWN_TIERS[renownTier()][1];
    body = `<div class="panel">${baseArt('comms','📨')}<h3>📨 Xiyu's communication</h3>
      <div class="sm">A line from the road back to Muxue. While the party travels, Xiyu can ask Muxue for fresh postings without losing a day, once per game day. Contracts are still done in the field: accept here, hunt in the Wilds, and the board pays out.</div>
      <div style="margin-top:6px"><button class="pri" ${commsReady()?'':'disabled'} onclick="act(commsAsk)">📨 Ask Muxue for new postings ${commsReady()?'':'(asked today)'}</button></div>
      <div class="sm" style="margin-top:6px">🏅 Standing: ${tier} · ${done} contracts finished · ${BD().active.length}/${MAX_CONTRACTS} accepted</div></div>`;
  } else {
    const ready = BD().active.filter(q => q.type==='collect' && (G.inv[q.item]||0) >= q.need).length;
    const left = Math.max(0, BOUNTY_REFRESH_DAYS - (G.day - BD().bounties.day));
    body = `<div class="panel">${baseArt('hall','🏯')}<h3>🏠 The Muxue Base</h3>
      <div class="sm">Xiyu's own hall in Muxue, the party's place to come back to: beds that are always free, and a board of work for the road ahead. Day ${G.day} · ${timeLabel()}</div>
      <div style="margin-top:6px"><button class="pri" onclick="act(()=>restAt('fairy'))">🛏️ Rest (free)</button><button onclick="baseTabTo('comms')">📨 Send word</button></div></div>
      <div class="panel"><b>📋 Work on the board</b><div class="sm">${BD().active.length} contract(s) accepted · ${ready ? ready+' ready to turn in · ' : ''}${BD().bounties.list.filter(b=>!b.done).length} bounty target(s) open (new in ${left||'a moment'} ${left===1?'day':'days'}).</div>
      <div style="margin-top:6px"><button onclick="baseTabTo('board')">📋 Quest Board</button><button onclick="baseTabTo('bounties')">📜 Bounties</button></div></div>
      <div class="panel"><b>👥 At the base</b><div class="sm">${G.active.map(id => CHARACTERS[id].icon+' '+first(id)+' Lv'+U(id).lv).join(' · ') || 'Xiyu'}</div>
      ${Object.keys(G.away||{}).length ? `<div class="sm" style="margin-top:4px">⚓ Away: ${Object.keys(G.away).map(id => first(id)).join(', ')}</div>` : ''}</div>`;
  }
  return `<h2>🏠 Muxue Base</h2>${flashHtml()}${nav}${body}`;
}
