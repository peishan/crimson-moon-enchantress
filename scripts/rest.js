/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — GAME TIME, REST AND TAVERNS
   Two clocks, kept apart on purpose:
     G.day   the story day. Moves ONLY with story chapters and "Ask around" on the Quest Board. It gates once-a-day things (quiet time,
             relationship bonding, board refreshes) and must never be farmable, so rest does not touch it.
     G.time  the hour of the day (0-23), cosmetic and for flavour: resting, meals and gathering advance it; it wraps around WITHOUT changing G.day.
             Herbs that bloom at night are easier to find when it is night (see herbal.js).
   Rests are UNLIMITED. The Crimson Fairy (Xiyu owns it) and the Ice Temple are free; taverns charge a little gold.
   ===================================================================== */
const PERIODS = [[5,'Dawn','🌅'],[8,'Morning','☀️'],[12,'Afternoon','🌤️'],[17,'Evening','🌆'],[21,'Night','🌙']];
const periodOf = h => { h = ((h % 24) + 24) % 24; if(h < 5) return PERIODS[4]; return PERIODS.reduce((p,x) => h >= x[0] ? x : p, PERIODS[0]); };
const timeLabel = () => { const p = periodOf(G.time === undefined ? 8 : G.time); return p[2]+' '+p[1]; };
const isNight = () => periodOf(G.time === undefined ? 8 : G.time)[1] === 'Night';
function advanceTime(h){ G.time = (((G.time === undefined ? 8 : G.time) + h) % 24 + 24) % 24; }   // never touches G.day

/* kind: 'home' (free, has the shop) · 'free' (free) · 'tavern' (pays; meals and a herb stall). base = rest price before the party-level add-on. */
const PLACES = [
  {id:'fairy', n:'The Crimson Fairy', icon:'🏯', kind:'home', open:() => true, note:'Xiyu\'s own inn. Her party always has beds here, free of charge.'},
  {id:'temple', n:'The Ice Temple', icon:'❄️', kind:'free', open:() => G.ch >= 18, note:'The warded rooms stay warm and quiet. The party may rest here at no cost.'},
  {id:'drowsy_lantern', n:'The Drowsy Lantern', icon:'🏮', kind:'tavern', base:6, open:() => G.ch >= 40,
   note:'The tavern in Muxue town, all rice wine and low lanterns. Its rooms are upstairs.', sells:{moon_petal:12, frost_herb:8, plum_bud:12}},
  {id:'red_lantern_inn', n:'Red Lantern Inn', icon:'🧧', kind:'tavern', base:8, open:() => G.ch >= 54,
   note:'The busy eastern settlement\'s inn, under the red lanterns of the road. Travellers swap rumours of failing wards.', sells:{ember_root:14, silverleaf:10}},
  {id:'songxia_teahouse', n:'Songxia Teahouse', icon:'🍵', kind:'tavern', base:4, open:() => G.ch >= 92,
   note:'A quiet teahouse by the Songxia workshop, with a few rooms and a good herbalist\'s shelf.', sells:{glacier_mint:10, silverleaf:10, night_lotus:18}},
];
const placeById = id => PLACES.find(p => p.id === id);
const restPrice = p => p.kind === 'tavern' ? p.base + Math.round(avgPartyLv()*.5) : 0;
const mealPrice = p => 8 + Math.round(avgPartyLv()*.8);

function restAt(id){
  const p = placeById(id); if(!p || !p.open()) return ['That place is not open to you yet.'];
  const c = restPrice(p); if(G.gold < c) return ['A room at '+p.n+' costs '+c+' gold.'];
  G.gold -= c; restoreParty(); G.heat = Math.max(0, (G.heat||0) - 40); advanceTime(8); save();
  return ['🛏️ The party rests at '+p.n+(c ? ' (-'+c+'g)' : ' (free)')+'. HP and MP fully restored. The hours pass: '+timeLabel()+'.'];
}
const restAtInn = () => restAt('fairy');   // the Wilds tab's rest button
function mealAt(id){
  const p = placeById(id); if(!p || p.kind !== 'tavern' || !p.open()) return [];
  const c = mealPrice(p); if(G.gold < c) return ['A hot meal costs '+c+' gold.'];
  G.gold -= c; G.party.forEach(pid => { const s = statsOf(pid); healUnit(pid, Math.round(s.hp*.4), Math.round(s.mp*.4)); });
  G.heat = Math.max(0, (G.heat||0) - 15); advanceTime(1); if(typeof ledgerUse==='function') ledgerUse('cooking'); save();
  return ['🍲 A hot meal at '+p.n+' (-'+c+'g): everyone recovers 40% HP and MP, and Xiyu\'s heat eases. '+timeLabel()+'.'];
}
function buyHerbAt(pid, herb){
  const p = placeById(pid), price = p && p.sells && p.sells[herb]; if(!price || !p.open()) return [];
  if(G.gold < price) return ['Not enough gold.'];
  G.gold -= price; addItems([{id:herb, qty:1}]); save();
  return ['Bought '+ITEMS[herb].icon+' '+ITEMS[herb].n+' (-'+price+'g).'];
}

function rInns(){
  const rows = PLACES.filter(p => p.open()).map(p => {
    const rc = restPrice(p);
    const rest = `<button class="pri" ${G.gold>=rc?'':'disabled'} onclick="act(()=>restAt('${p.id}'))">🛏️ Rest ${rc ? '('+rc+'g)' : '(free)'}</button>`;
    const meal = p.kind === 'tavern' ? `<button ${G.gold>=mealPrice(p)?'':'disabled'} onclick="act(()=>mealAt('${p.id}'))">🍲 Hot meal (${mealPrice(p)}g)</button>` : '';
    const stall = p.sells ? `<div class="sm" style="margin-top:4px">Herb stall: ${Object.keys(p.sells).map(h => `<button ${G.gold>=p.sells[h]?'':'disabled'} onclick="act(()=>buyHerbAt('${p.id}','${h}'))">${ITEMS[h].icon} ${ITEMS[h].n} ${p.sells[h]}g</button>`).join(' ')}</div>` : '';
    return `<div class="card" style="cursor:default"><span class="big">${p.icon}</span><div class="fl"><b>${p.n}</b><div class="sm">${p.note}</div><div>${rest}${meal}</div>${stall}</div></div>`; }).join('');
  return `<h2>Inns &amp; Rest</h2>${flashHtml()}<div class="sm">${timeLabel()} · Day ${G.day}. Rest is unlimited, and passes the hours of the day, not the day itself: the story day only moves with the story (and "Ask around" on the Quest Board).</div>
    <div class="sm" style="margin:4px 0">The Crimson Fairy is Xiyu's own, and the Ice Temple's rooms are warded: both are free. Taverns charge a little and add hot meals and herb stalls.</div>${rows}`;
}
