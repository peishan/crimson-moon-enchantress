/* =====================================================================
   AREA LOOT, CODEX, LETTERS (from Tribute's expanded loot, material codex and timed events)
   LOOT   every won Wilds hunt (not story battles, skirmishes' bonus, conjured hunts) also rolls the loot of the AREA it was fought in (AREA_LOOT by zone):
          a material most of the time and, rarely, a trinket. Materials feed new brews and sell for gold; trinkets sell well. Conjured fights drop nothing.
   CODEX  every material and trinket gets a record once the party has found it: tags, where it turns up, what it is for. G.codex = {itemId: day}.
   LETTERS short notes that arrive as story days pass (TIMED), kept in the Letters view. First-pass wording: edit freely. G.letters = {id: day}, G.timedSince = {ch: day}.
   ===================================================================== */
Object.assign(ITEMS, {
  snow_resin:{n:'Snow Resin',icon:'🍯',type:'material'}, ward_chip:{n:'Ward Chip',icon:'🧩',type:'material'}, moss_pearl:{n:'Moss Pearl',icon:'🫧',type:'material'},
  temple_bell:{n:'Temple Bell Fragment',icon:'🔔',type:'material'}, frozen_script:{n:'Frozen Script',icon:'📃',type:'material'},
  waymarker:{n:'Worn Waymarker',icon:'🪧',type:'material'}, caravan_seal:{n:'Caravan Seal',icon:'🔴',type:'material'}, river_glass:{n:'River Glass',icon:'🔷',type:'material'},
  lantern_ash:{n:'Lantern Ash',icon:'🏮',type:'material'}, old_tile:{n:'Old Estate Tile',icon:'🧱',type:'material'}, echo_dust:{n:'Echo Dust',icon:'🌫️',type:'material'},
  moon_charm:{n:'Moonlit Charm',icon:'🌙',type:'trinket'}, frost_bead:{n:'Frost Bead',icon:'📿',type:'trinket'}, carved_token:{n:'Carved Token',icon:'🪙',type:'trinket'},
  jade_comb:{n:'Jade Comb',icon:'💠',type:'trinket'}, spirit_tassel:{n:'Spirit Tassel',icon:'🎐',type:'trinket'},
  sealing_tonic:{n:'Sealing Tonic',icon:'🫙',type:'consumable'}, travellers_ration:{n:'Traveller\'s Ration',icon:'🍙',type:'consumable'}, lantern_balm:{n:'Lantern Balm',icon:'🕯️',type:'consumable'},
});
Object.assign(USE, {sealing_tonic:{hp:260, mp:60}, travellers_ration:{hp:420, mp:120}, lantern_balm:{hp:160, cleanse:true}});
RECIPES.push(
  {out:'sealing_tonic', need:{snow_resin:2, moon_petal:1}, label:'2 Snow Resin + 1 Moon Petal'},
  {out:'travellers_ration', need:{waymarker:1, caravan_seal:1, frost_herb:1}, label:'1 Worn Waymarker + 1 Caravan Seal + 1 Frost Herb'},
  {out:'lantern_balm', need:{lantern_ash:2, silverleaf:1}, label:'2 Lantern Ash + 1 Silverleaf'});

/* [material, material, trinket] per zone; tags and sale prices below */
const AREA_LOOT = {
  forest:['snow_resin','moss_pearl','frost_bead'], stream:['moss_pearl','snow_resin','moon_charm'], chambers:['ward_chip','snow_resin','carved_token'], rift:['ward_chip','moss_pearl','moon_charm'],
  steps:['snow_resin','ward_chip','frost_bead'], slopes:['snow_resin','moss_pearl','frost_bead'],
  temple:['temple_bell','frozen_script','moon_charm'], maze:['frozen_script','ward_chip','carved_token'], depths:['ward_chip','temple_bell','carved_token'], trial:['temple_bell','ward_chip','jade_comb'],
  estate:['old_tile','lantern_ash','jade_comb'], northpass:['waymarker','snow_resin','carved_token'], archivepass:['waymarker','caravan_seal','carved_token'], lantern:['lantern_ash','river_glass','spirit_tassel'],
  stream9:['river_glass','moss_pearl','spirit_tassel'], cloudsteps:['old_tile','echo_dust','jade_comb'], frontier:['waymarker','caravan_seal','carved_token'], shattered:['waymarker','echo_dust','spirit_tassel'],
  qingluo:['river_glass','lantern_ash','spirit_tassel'], echoes:['echo_dust','old_tile','jade_comb'], yilongedge:['lantern_ash','caravan_seal','jade_comb'], westroute:['caravan_seal','waymarker','spirit_tassel'],
};
const LOOT_INFO = {   // price, tags, note
  snow_resin:[18,'Common, Living','Weeps from snow-pines on Muxue.'], moss_pearl:[22,'Living','A damp pearl of moss, grown in cold water.'], ward_chip:[30,'Spirit-touched','A chip of a failed ward; it still hums.'],
  temple_bell:[40,'Sacred','Cast in the Ice Temple; it rings on its own when the temple is stirred.'], frozen_script:[34,'Sacred, Limited','Lines of old script preserved in ice.'],
  waymarker:[16,'Common','A road marker, worn smooth by travellers.'], caravan_seal:[26,'Common','A wax-and-lacquer seal off a trade bale.'], river_glass:[24,'Living','Glass-clear stones the river rounds.'],
  lantern_ash:[20,'Common','What is left when a paper lantern burns itself out.'], old_tile:[28,'Limited','A tile from a house that no longer stands.'], echo_dust:[44,'Spirit-touched, Limited','A grey dust that remembers sounds.'],
  moon_charm:[160,'Spirit-touched, Rare','A small charm that glints under moonlight.'], frost_bead:[120,'Rare','A bead of frost that never melts in the hand.'], carved_token:[110,'Rare','A carved token of an old guild.'],
  jade_comb:[210,'Rare','A fine comb of jade; someone valued it.'], spirit_tassel:[150,'Spirit-touched, Rare','A tassel that stirs without wind.'],
};
const isLoot = k => !!LOOT_INFO[k];
const lootPrice = k => LOOT_INFO[k][0];
function codexNote(id){ if(!isLoot(id)) return; G.codex = G.codex || {}; if(!G.codex[id]){ G.codex[id] = G.day; if(typeof chronicle === 'function') chronicle('Found '+ITEMS[id].n+' for the first time.', '📔'); } }
function rollAreaLoot(zid, boss){
  const t = AREA_LOOT[zid]; if(!t) return [];
  const out = [], rolls = boss ? 2 : 1;
  for(let i = 0; i < rolls; i++){
    if(Math.random() < .55) out.push({id:t[Math.random() < .6 ? 0 : 1], qty:1 + (Math.random() < .25 ? 1 : 0)});
    if(Math.random() < (boss ? .08 : .03)) out.push({id:t[2], qty:1});
  }
  return out;
}
/* called from battle.js finishWin: real zone hunts only */
function areaLootOnWin(spec){
  if(!spec || spec.sim || spec.echo || !spec.zone) return [];
  const got = rollAreaLoot(spec.zone, false); if(!got.length) return [];
  addItems(got); got.forEach(d => codexNote(d.id));
  return ['🧰 Found '+got.map(d => ITEMS[d.id].icon+' '+ITEMS[d.id].n+(d.qty>1 ? ' ×'+d.qty : '')).join(', ')+'.'];
}
function sellItem(k){
  if(!isLoot(k) || !(G.inv[k] > 0)) return 'Nothing to sell.';
  G.inv[k]--; const p = lootPrice(k); G.gold += p; save(); return 'Sold '+ITEMS[k].n+' for '+p+'g.';
}
const sellBtn = k => isLoot(k) ? `<button onclick="act(()=>sellItem('${k}'))">Sell ${lootPrice(k)}g</button>` : '';
function codexSync(){ if(!G || !G.inv) return; Object.keys(G.inv).forEach(k => { if(G.inv[k] > 0) codexNote(k); }); }
function zonesFor(id){ return Object.keys(AREA_LOOT).filter(z => AREA_LOOT[z].includes(id)).map(z => ZONES.find(x => x.id === z)).filter(Boolean); }
function rCodex(){
  const all = Object.keys(LOOT_INFO), known = all.filter(k => (G.codex||{})[k]);
  const rows = all.map(k => {
    if(!(G.codex||{})[k]) return `<div class="ev locked"><div><b>❔ ???</b><div class="sm">Not found yet</div></div></div>`;
    const [p, tags, note] = LOOT_INFO[k], where = zonesFor(k).filter(zoneOpen).map(z => z.n).join(', '), uses = RECIPES.filter(r => r.need[k]).map(r => ITEMS[r.out].n).join(', ');
    return `<div class="ev"><div><b>${ITEMS[k].icon} ${ITEMS[k].n}</b> <span class="sm">${tags} · sells ${p}g · have ${G.inv[k]||0}</span><div class="sm">${note}</div><div class="sm">Found: ${where || 'somewhere'}${uses ? ' · Used for: '+uses : ''}</div></div></div>`; }).join('');
  return `<div class="sm">Materials and trinkets from the Wilds. A record appears once the party has found the thing. ${known.length}/${all.length} found.</div>${rows}`;
}

/* ---------- letters ---------- */
const TIMED = [
  {id:'l_qing1', ch:40, days:4, from:'Sister Qing', icon:'🌸', t:'The Crimson Fairy is quiet but the kettle is always on. A traveller left a good umbrella; I am keeping it for whoever comes back soaked.'},
  {id:'l_qing2', ch:120, days:6, from:'Sister Qing', icon:'🌸', t:'The plum tree outside the hall has bloomed early. I swept the petals into a bowl for you. They will not keep, but I thought you should know.'},
  {id:'l_yunhe1', ch:415, days:3, from:'Yun He', icon:'🌿', t:'The streams at the sanctuary are running high. There is a room made up if anyone wants a quiet night. No need to answer.'},
  {id:'l_zilan1', ch:429, days:5, from:'Zi Lan', icon:'🪻', t:'The base is in order. The storerooms were counted twice and agree with each other. A guest asked after you; I told them nothing and gave them tea.'},
  {id:'l_zilan2', ch:520, days:7, from:'Zi Lan', icon:'🪻', t:'Winter has put a lid on the roads. Messengers are slower and everyone is a little more patient. The base is warm.'},
  {id:'l_donglin1', ch:508, days:4, from:'Zhan Donglin', icon:'🛡️', t:'I checked every latch in the house today. They all work. I do not know why I wrote that down, only that a house feels better when you know it.'},
  {id:'l_suhe1', ch:429, days:9, from:'Su He', icon:'🌾', t:'Lamp oil is dearer this month, rice cheaper. The stores are balanced and I have put a little aside for no reason except that it is nice to have a little aside.'},
  {id:'l_baizhi1', ch:470, days:6, from:'Bai Zhi', icon:'🌿', t:'A new batch of remedies is shelved. If anyone is limping, tell them the left-hand shelf. If anyone is lying about limping, tell them the right.'},
  {id:'l_myan1', ch:300, days:8, from:'A traveller at the Wayside Inn', icon:'🏮', t:'Left this with the innkeeper for the party with the pale-haired woman: the road east is clear of snow, the road north is not, and the soup is better than it looks.'},
  {id:'l_temple1', ch:661, days:5, from:'The Ice Temple', icon:'❄️', t:'The warded rooms are warm and the library is open at all hours. Nobody has been through the training halls in days; the constructs are bored.'},
];
function timedCheck(){
  if(!G || !G.party) return;
  G.timedSince = G.timedSince || {}; G.letters = G.letters || {};
  const fresh = [];
  TIMED.forEach(l => {
    if(G.letters[l.id] || G.ch < l.ch) return;
    if(G.timedSince[l.id] === undefined) G.timedSince[l.id] = G.day;
    if(G.day - G.timedSince[l.id] >= l.days){ G.letters[l.id] = G.day; fresh.push(l); }
  });
  if(!fresh.length) return;
  fresh.slice(0,3).forEach(l => chronicle('A letter from '+l.from+'.', '✉️'));
  save(); toast('✉️ A letter from '+fresh[0].from+(fresh.length > 1 ? ' (+'+(fresh.length-1)+' more)' : ''));
}
function rLetters(){
  const got = TIMED.filter(l => G.letters && G.letters[l.id]).sort((a,b) => G.letters[b.id] - G.letters[a.id]);
  return `<div class="sm">Short notes from the people Xiyu knows, arriving as days pass. No reply is needed. ${got.length}/${TIMED.length} received.</div>${got.length ? got.map(l => `<div class="ev"><div><b>${l.icon} ${l.from}</b> <span class="sm">Day ${G.letters[l.id]}</span><div>${l.t}</div></div></div>`).join('') : '<div class="sm">No letters yet.</div>'}`;
}
