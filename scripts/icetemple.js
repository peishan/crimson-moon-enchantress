/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XIYU'S ICE TEMPLE BASE
   Xiyu's third base (after Muxue Island and Yilong). Opens when Xiyu receives the Ice Temple Access Token (Volume 21 comic 011, chapter 661).
   Sections (shown only while the Ice Temple base is selected in the Bases tab): 🏪 Traders, 📚 Research, 🥋 Training, 📦 Storage, plus the shared Quest Board,
   Bounties, Comms and Network. The services need the party to BE at the Ice Temple (the token takes them there and back: scripts/travel.js); the hall always works and
   offers the travel button. Rest at the temple is free (rest.js).
   Traders: the stalls outside the temple (wine, hot food, preserved goods, travel supplies, cultivation materials; Volume 21 comic 014). Research: a daily study session
   in the Ice Library that feeds the Network investigation "The Four Commanders" (neutral reports: nothing is resolved here). Training: daily sparring XP and shortcuts to the
   Training Room and the Commanders' Trial Ground. Storage: a stash for items (quest items cannot be stored).
   ===================================================================== */
const ICE_OPEN = 661;
const BASE_ONLY = {market:'icetemple', research:'icetemple', training:'icetemple', storage:'icetemple'};
BASES.push({id:'icetemple', n:'Ice Temple Base', icon:'❄️', open:ICE_OPEN, rest:'temple', art:'icetemple/',
  hall:'The Ice Temple, open to Xiyu by her token and the clan leader\'s instructions: a library to study in, training grounds, warded guest quarters, a row of traders outside the gates and storage rooms for the party\'s goods. A place of study, research and training, and Xiyu\'s base apart from Muxue Island and Yilong.',
  comms:'The old formations of the temple carry Xiyu\'s word out as the mirror arrays at her other bases do. Postings and reports are shared by all of her bases.'});
BASE_SECTIONS.push(['market','🏪 Traders'],['research','📚 Research'],['training','🥋 Training'],['storage','📦 Storage']);

/* new goods sold by the traders */
Object.assign(ITEMS, {
  warming_wine:{n:'Warming Wine',icon:'🍶',type:'consumable'},
  preserved_rations:{n:'Preserved Rations',icon:'🥡',type:'consumable'},
});
Object.assign(USE, { warming_wine:{hp:40, mp:25, heat:15}, preserved_rations:{hp:120} });

/* the traders' pavilion is also an inn in the Inns & Rest tab (hot meals, a room for a few coins) */
PLACES.push({id:'ice_pavilion', n:'Ice Temple Traders\' Pavilion', icon:'🍶', kind:'tavern', base:5, open:() => G.ch >= ICE_OPEN,
  note:'The pavilion beside the traders\' row outside the Ice Temple: wine, hot dishes and tea, with a few rooms upstairs.', sells:{frost_herb:8, moon_petal:12}});

const TRADERS = [
  {id:'wine', n:'Wine and Hot Food', icon:'🍶', note:'Rice wine, steaming dishes and tea for the long evenings. A hot meal restores 40% HP and MP; the wine warms and steadies.', meal:true,
   stock:{warming_wine:30}},
  {id:'preserved', n:'Preserved Goods', icon:'🥡', note:'Dried meats, pickles and sealed rations that keep for months in the cold.', stock:{preserved_rations:35}},
  {id:'supplies', n:'Travel Supplies', icon:'🎒', note:'Tonics, salt and the small things a long journey runs out of.', stock:{herbal_tonic:28, moonlit_tonic:90, spirit_draught:68, cleansing_salt:46}},
  {id:'cultivation', n:'Cultivation Materials', icon:'💎', note:'Herbs, petals and crystals for brewing and training.', stock:{frost_herb:12, moon_petal:16, ice_crystal:40}},
];
const SELL_PRICE = {wolf_pelt:12, frost_herb:5, moon_petal:7, ice_crystal:18, imp_ash:14, rift_shard:24, ward_silk:30};
/* prices follow the party's level (like meals and rooms in rest.js), so they stay meaningful late in the story */
const priceMult = () => 1 + avgPartyLv()/100;
const traderPrice = k => { const b = Object.values(TRADERS).reduce((p,t) => t.stock[k] !== undefined ? t.stock[k] : p, 0); return b ? Math.max(1, Math.round(b*priceMult())) : 0; };
const sellPrice = k => { const b = SELL_PRICE[k] || (ITEMS[k] && ITEMS[k].type==='material' ? 6 : 0); return b ? Math.max(1, Math.round(b*priceMult())) : 0; };
function buyTrader(k){
  const price = traderPrice(k);
  if(!price) return ['The traders do not sell that.'];
  if(G.gold < price) return ['That costs '+price+' gold.'];
  G.gold -= price; G.inv[k] = (G.inv[k]||0) + 1; save();
  return ['🛒 Bought '+ITEMS[k].icon+' '+ITEMS[k].n+' (-'+price+'g).'];
}
function sellTrader(k, all){
  const have = G.inv[k] || 0, p = sellPrice(k);
  if(!have || !p) return ['Nothing to sell.'];
  const n = all ? have : 1; G.inv[k] -= n; G.gold += p*n; save();
  return ['💰 Sold '+n+' × '+ITEMS[k].n+' (+'+(p*n)+'g).'];
}

/* the stash */
const STASH = () => (G.stash = G.stash || {});
const stashable = k => ITEMS[k] && ITEMS[k].type !== 'quest';
function stashMove(k, dir, all){
  if(!stashable(k)) return ['That cannot be stored.'];
  const from = dir === 'in' ? G.inv : STASH(), to = dir === 'in' ? STASH() : G.inv;
  const have = from[k] || 0; if(!have) return ['None to move.'];
  const n = all ? have : 1; from[k] = have - n; to[k] = (to[k]||0) + n; save();
  return [(dir==='in' ? '📦 Stored ' : '🎒 Took out ')+n+' × '+ITEMS[k].n+'.'];
}

/* research: a daily study session feeding the Network investigation (neutral: nothing is resolved) */
INVESTIGATIONS.push({id:'commanders', n:'The Four Commanders', icon:'🕯️', open:ICE_OPEN,
  desc:'The Ice Temple\'s archivists and Xiyu\'s people compare every record that names the Four Commanders. Reports are only what the records say; the party decides what it means.',
  zones:['temple','maze','depths','trial'], keys:['frost_stalker','ward_sentinel','maze_wraith','sparring_construct'],
  reports:['The archivists have begun listing every record that names the Four Commanders.','The records agree on the commanders\' titles and differ on how their positions are explained.','Several passages refer to a central position that other copies leave out.','The archives have given everything they hold. What it means is for the party to decide.']});
const RESEARCH_NOTES = [
  'A reading room in the Ice Library hums with cold lamplight; the party sorts a shelf of copied scrolls by date and hand.',
  'Two copies of the same passage differ by a single character. Whether the copyist erred or chose is not clear.',
  'A tablet in the lower archive lists duties rather than places; its bottom edge is chipped.',
  'The librarians point out which records were reorganised when the archive was last kept; most were copied, a few were not.',
  'A margin note in a faded hand asks a question that no answer in the shelf addresses.',
  'An index card cross-refers a record that the shelf does not hold.',
  'A scholar\'s ledger of the temple\'s visitors has several pages stuck together by old ice.',
  'The party compares inscriptions from the lower archive with copies upstairs; most agree, a few do not.',
];
function doResearch(){
  if(!iceHere()) return ['The party must be at the Ice Temple.'];
  G.bondDay = G.bondDay || {};
  if(G.bondDay.research === G.day) return ['The party has already studied in the Ice Library today.'];
  G.bondDay.research = G.day;
  const out = ['📚 '+RESEARCH_NOTES[Math.floor(Math.random()*RESEARCH_NOTES.length)]];
  const inv = invById('commanders'); if(inv) invAdd(inv, 2 + Math.floor(Math.random()*3), out);
  const xp = Math.max(1, Math.round(storyXp(Math.max(1, G.ch)) * .2)); gainXp(xp, G.active).forEach(m => out.push(m)); out.push('✦ Study XP +'+xp+' to the active party.');
  return out;
}
function doSpar(){
  if(!iceHere()) return ['The party must be at the Ice Temple.'];
  G.bondDay = G.bondDay || {};
  if(G.bondDay.spar === G.day) return ['The party has already trained today.'];
  G.bondDay.spar = G.day;
  const xp = Math.max(1, Math.round(storyXp(Math.max(1, G.ch)) * .25)), out = ['🥋 The party trains together in the temple grounds.'];
  gainXp(xp, G.active).forEach(m => out.push(m)); out.push('✦ Training XP +'+xp+' to the active party.'); return out;
}

/* the temple's services need the party to be there */
const iceHere = () => typeof atIceTemple === 'function' && atIceTemple();
const iceAwayPanel = () => `<div class="panel"><b>❄️ The party is not at the Ice Temple</b><div class="sm">The traders, library, training grounds and storage are at the temple itself. Use the Ice Temple Access Token to travel there (and back to where they last departed).</div>
  <button class="pri" onclick="act(useToken)">❄️ Travel to the Ice Temple</button></div>`;
function rIceSection(k){
  if(!iceHere()) return iceAwayPanel();
  if(k === 'market'){
    const stalls = TRADERS.map(t => `<div class="panel"><b>${t.icon} ${t.n}</b><div class="sm">${t.note}</div>
      ${t.meal ? `<div style="margin:4px 0"><button onclick="act(()=>mealAt('ice_pavilion'))">🍲 Hot meal at the pavilion</button></div>` : ''}
      ${Object.keys(t.stock).map(k2 => `<div class="ev"><div><b>${ITEMS[k2].icon} ${ITEMS[k2].n}</b><div class="sm">${USE[k2] ? useText(USE[k2]) : ITEMS[k2].type}${G.inv[k2] ? ' · you have '+G.inv[k2] : ''}</div></div><button onclick="act(()=>buyTrader('${k2}'))">${traderPrice(k2)}g</button></div>`).join('')}</div>`).join('');
    const sell = Object.keys(G.inv).filter(k2 => (G.inv[k2]||0) > 0 && ITEMS[k2] && (SELL_PRICE[k2] || ITEMS[k2].type==='material'))
      .map(k2 => { const p = sellPrice(k2); return `<div class="ev"><div><b>${ITEMS[k2].icon} ${ITEMS[k2].n} ×${G.inv[k2]}</b><div class="sm">sells for ${p}g each</div></div><span><button onclick="act(()=>sellTrader('${k2}'))">Sell 1</button><button onclick="act(()=>sellTrader('${k2}',true))">All</button></span></div>`; }).join('');
    return `<div class="panel"><b>🏪 The traders outside the Ice Temple</b><div class="sm">Gold: ${G.gold}. Wine, food, preserved goods, travel supplies and cultivation materials; the traders also buy spare materials.</div></div>${stalls}<h4>Sell materials</h4>${sell || '<div class="sm">No materials to sell.</div>'}`;
  }
  if(k === 'research'){
    const inv = invById('commanders'), p = inv ? invProg(inv) : 0, done = G.bondDay && G.bondDay.research === G.day;
    return `<div class="panel"><b>📚 The Ice Library</b><div class="sm">A daily study session: the party reads and compares the temple's records and gains a little XP. It feeds the Network investigation "The Four Commanders" (${p}%). Reports are neutral: they list what the records say and decide nothing.</div>
      <button class="pri" ${done?'disabled':''} onclick="act(doResearch)">📚 Study in the Ice Library ${done?'(done today)':''}</button>
      <div class="sm" style="margin-top:6px">See the Network section for the investigation and its leads (hunting in the temple's levels also adds to it).</div></div>`;
  }
  if(k === 'training'){
    const done = G.bondDay && G.bondDay.spar === G.day;
    return `<div class="panel"><b>🥋 The training grounds</b><div class="sm">A daily sparring session gives the active party a little XP. For real fights use the Commanders' Trial Ground in the Wilds; the Training Room is a sandbox with no rewards or losses.</div>
      <button class="pri" ${done?'disabled':''} onclick="act(doSpar)">🥋 Spar together ${done?'(done today)':''}</button>
      <div style="margin-top:6px"><button onclick="showTab('training')">🧪 Training Room (sandbox)</button><button onclick="showTab('wilds')">⚔️ The Wilds (Trial Ground)</button><button onclick="showTab('temple')">🗺️ The Ice Temple (map and rooms)</button></div></div>`;
  }
  if(k === 'storage'){
    const pack = Object.keys(G.inv).filter(k2 => (G.inv[k2]||0) > 0 && stashable(k2)), st = Object.keys(STASH()).filter(k2 => STASH()[k2] > 0);
    const row = (k2, n, dir) => `<div class="ev"><div><b>${ITEMS[k2].icon} ${ITEMS[k2].n} ×${n}</b></div><span><button onclick="act(()=>stashMove('${k2}','${dir}'))">${dir==='in'?'Store 1':'Take 1'}</button><button onclick="act(()=>stashMove('${k2}','${dir}',true))">All</button></span></div>`;
    return `<div class="panel"><b>📦 Storage rooms</b><div class="sm">Keep spare goods safe at the temple. Quest items (the compass, Feiyue, the token and so on) cannot be stored.</div></div>
      <h4>In your pack</h4>${pack.length ? pack.map(k2 => row(k2, G.inv[k2], 'in')).join('') : '<div class="sm">Nothing to store.</div>'}
      <h4>In storage</h4>${st.length ? st.map(k2 => row(k2, STASH()[k2], 'out')).join('') : '<div class="sm">The storage rooms are empty.</div>'}`;
  }
  return '';
}
