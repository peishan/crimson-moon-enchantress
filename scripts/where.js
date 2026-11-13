/* =====================================================================
   WHERE THE PARTY IS
   After the time portal (chapter 169) Xiyu's party is no longer on Muxue Island, so the island's Wilds, herb spots, inn and shop are not
   at hand. G.where = 'muxue' (the island) | 'icetemple' (the Ice Temple) | 'world' (the road, Yilong and beyond). Unset = derived from the chapter.
   The token (chapter 661) links world <-> Ice Temple; Xiyu's boat links Ice Temple <-> Muxue (about five hours across the water).
   Areas the party is not standing in are not lost: the Simulation tab conjures their beasts and small bosses, for reduced rewards.
   ===================================================================== */
const LEAVE_CH = 169;
const WHERE_NAME = {muxue:'Muxue Island', icetemple:'The Ice Temple', world:'the road beyond the island'};
const WHERE_ICON = {muxue:'🏯', icetemple:'❄️', world:'🧭'};
function where(){
  if(G.where) return G.where;
  if(G.travel && G.travel.at === 'ice_temple') return 'icetemple';
  return G.ch >= LEAVE_CH ? 'world' : 'muxue';
}
const whereLabel = () => WHERE_ICON[where()]+' '+WHERE_NAME[where()];
/* before the portal the island and the temple are one home region, as they always were */
function inRegion(reg){
  const w = where();
  if(reg === 'temple') return w === 'icetemple' || (w === 'muxue' && G.ch < LEAVE_CH);
  if(reg === 'island') return w === 'muxue';
  return w === 'world';
}
const TEMPLE_ZONES = ['temple','maze','depths','trial'];
const zoneRegion = z => TEMPLE_ZONES.includes(z.id) ? 'temple' : (z.unlock < LEAVE_CH ? 'island' : 'world');
const zoneHere = z => zoneOpen(z) && inRegion(zoneRegion(z));
const PLACE_REG = {fairy:'island', drowsy_lantern:'island', red_lantern_inn:'island', songxia_teahouse:'island', temple:'temple', yunling:'world', yilong:'world', yilong_base:'world', road_inn:'world'};
const placeHere = p => p.open() && inRegion(PLACE_REG[p.id] || 'island');
const SPOT_REG = {temple:'temple', road_meadow:'world', yilong_falls:'world', yilong_gardens:'world'};
const spotHere = s => s.open() && inRegion(SPOT_REG[s.id] || 'island');
const regionName = reg => reg === 'temple' ? 'the Ice Temple' : reg === 'island' ? 'Muxue Island' : 'the road beyond the island';

/* new places that only exist out in the world */
PLACES.push({id:'road_inn', n:'The Wayside Inn', icon:'🏮', kind:'tavern', base:7, open:() => G.ch >= LEAVE_CH,
  note:'A plain roadside inn, the sort travellers always find. The rooms are clean and the innkeeper asks no questions.', sells:{frost_herb:8, silverleaf:10, plum_bud:12}});
GATHER_SPOTS.push(
  {id:'road_meadow', n:'Roadside meadows', icon:'🌾', open:() => G.ch >= LEAVE_CH, herbs:[['frost_herb',3],['silverleaf',2],['plum_bud',1],['moon_petal',1,'Night']]},
  {id:'yilong_falls', n:'Yilong waterfalls', icon:'💦', open:() => G.ch >= 415, herbs:[['glacier_mint',3],['silverleaf',2],['night_lotus',1,'Night']]},
  {id:'yilong_gardens', n:'Yun He\'s medicinal gardens', icon:'🌿', open:() => G.ch >= 415, herbs:[['plum_bud',3],['ember_root',2],['frost_herb',2]]});

/* the shop at hand: Xiyu's inn on the island, a road peddler out in the world (a little dearer), the temple has its own traders */
const shopOpen = () => where() !== 'icetemple';
const shopMult = () => where() === 'world' ? 1.25 : 1;
const shopPrice = k => Math.round(SHOP[k] * shopMult());
const shopTitle = () => where() === 'world' ? 'Road peddler (a little dearer)' : 'Crimson Fairy shop';

/* ---------- travelling between the three places ---------- */
function travelTo(dest){
  const w = where();
  if(dest === w) return ['The party is already there.'];
  if(!(G.inv && G.inv.ice_temple_token)) return ['They have no way back yet.'];
  if(dest === 'icetemple'){
    if(w === 'world'){ G.travel = G.travel || {at:null, back:null}; G.travel.back = {ch:G.ch, loc:hereLabel()}; G.travel.at = 'ice_temple'; G.where = 'icetemple'; save();
      return ['❄️ The token glows and the party arrives at the Ice Temple. (Last departed from: '+G.travel.back.loc+'.)']; }
    advanceTime(5); G.where = 'icetemple'; if(G.travel) G.travel.at = 'ice_temple'; save();
    return ['⛵ Xiyu\'s boat crosses from Muxue to the Ice Temple landing. About five hours pass: '+timeLabel()+'.'];
  }
  if(dest === 'muxue'){
    if(w !== 'icetemple') return ['From out in the world the party must first use the token to reach the Ice Temple, then take the boat.'];
    advanceTime(5); G.where = 'muxue'; if(G.travel) G.travel.at = null; save();
    return ['⛵ Xiyu\'s boat crosses from the Ice Temple landing to Muxue. About five hours pass: '+timeLabel()+'. The Crimson Fairy is in sight.'];
  }
  if(dest === 'world'){
    if(w !== 'icetemple') return ['From Muxue the party must take the boat to the Ice Temple first, then the token.'];
    G.where = 'world'; if(G.travel) G.travel.at = null; save();
    const back = G.travel && G.travel.back ? G.travel.back.loc : 'where they last departed';
    return ['❄️ The token glows and the party returns to '+back+'.'];
  }
  return [];
}

/* ---------- conjured hunts (the Simulation tab) ---------- */
const SIM_XP = .5, SIM_GOLD = .25;
function simZones(){ return ZONES.filter(z => zoneOpen(z) && !zoneHere(z)); }
function conjureFight(zid, boss){
  const z = ZONES.find(x => x.id === zid); if(!z || !zoneOpen(z) || zoneHere(z)) return;
  if(boss && !z.boss) return;
  const lv = Math.max(1, avgPartyLv() + z.off + (boss ? 1 : 0));
  const foes = boss ? [].concat(z.boss).map(k => ({key:k, lv})) : Array.from({length:Math.max(1, Math.min(2 + Math.floor(Math.random()*2), G.active.length + 1))}, () => ({key:AR(z.pool), lv:Math.max(1, lv + Math.floor(Math.random()*3) - 1)}));
  origin = 'training'; startBattle({foes, rewards:true, sim:true, zone:null}); tab = 'battle'; render();
}
function simPanel(){
  const list = simZones();
  if(!list.length) return `<div class="panel"><b>🔮 Conjured hunts</b><div class="sm">The party is standing in every area it has opened. Nothing needs conjuring.</div></div>`;
  const rows = list.map(z => `<div class="ev"><div><b>${z.icon} ${z.n}</b><div class="sm">${regionName(zoneRegion(z))} · foes Lv ~${Math.max(1, avgPartyLv() + z.off)}</div></div>
    <div><button onclick="conjureFight('${z.id}')">Conjure</button>${z.boss ? `<button onclick="conjureFight('${z.id}',true)">${z.bossName ? 'Champion' : 'Boss'}</button>` : ''}</div></div>`).join('');
  return `<div class="panel"><b>🔮 Conjured hunts</b><div class="sm">The party is at ${WHERE_NAME[where()]}, so these areas are out of reach. Xiyu can summon their beasts and lesser guardians from memory: real fights, but the beasts are echoes. ${Math.round(SIM_XP*100)}% XP, ${Math.round(SIM_GOLD*100)}% gold, no drops, no herbs, nothing for the bestiary or the boards.</div>${rows}</div>`;
}
