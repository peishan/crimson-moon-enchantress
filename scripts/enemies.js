/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — ENEMIES, ITEMS, LOOT, WILDS ZONES
   Only the Afflicting Imp (chapter 13) is a story enemy. Everything else is
   gameplay filler for the Wilds / Training Room: snow-island creatures that
   fit the setting but are NOT canon story events.
   moves: {n, pow, fx?[], spell?, all?}   traits: 'magic' (hit hard by Spirit Expulsion)
   ===================================================================== */
const ENEMIES = {
  frost_wolf:{n:'Frost Wolf',icon:'🐺',hp:70,atk:12,mag:0,def:5,spd:13,xp:30,gold:12,
    moves:[{n:'Snapping Bite',pow:1},{n:'Pounce',pow:1.4}],drops:[{id:'wolf_pelt',chance:.4}],desc:'Packs of white wolves haunt the Muxue snowfields.'},
  snowcap_boar:{n:'Snowcap Boar',icon:'🐗',hp:100,atk:13,mag:0,def:8,spd:7,xp:34,gold:14,
    moves:[{n:'Tusk Charge',pow:1.2},{n:'Trample',pow:.9,fx:[{k:'slow',d:1}]}],drops:[{id:'wolf_pelt',chance:.25},{id:'frost_herb',chance:.3}],desc:'Bad-tempered and thick-skinned.'},
  moon_wisp:{n:'Moon Wisp',icon:'🕯️',hp:55,atk:4,mag:13,def:4,spd:12,xp:32,gold:14,traits:['magic'],
    moves:[{n:'Pale Flame',pow:1,spell:true},{n:'Dazzle',pow:.6,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'moon_petal',chance:.5}],desc:'A drifting light born of the eight moons.'},
  ice_sprite:{n:'Ice Sprite',icon:'🧚',hp:60,atk:5,mag:14,def:4,spd:14,xp:34,gold:15,traits:['magic'],
    moves:[{n:'Frost Needle',pow:1.1,spell:true},{n:'Chilling Breath',pow:.8,spell:true,fx:[{k:'slow',d:2}]}],drops:[{id:'ice_crystal',chance:.35}],desc:'Mischievous spirits of the frozen stream.'},
  glacier_crab:{n:'Glacier Crab',icon:'🦀',hp:110,atk:12,mag:0,def:12,spd:5,xp:36,gold:16,
    moves:[{n:'Pincer Snap',pow:1.1},{n:'Shell Slam',pow:.9,fx:[{k:'slow',d:1}]}],drops:[{id:'ice_crystal',chance:.3},{id:'frost_herb',chance:.3}],desc:'Its shell is harder than the ice it hides in.'},
  ward_sentinel:{n:'Ward Sentinel',icon:'🗿',hp:130,atk:15,mag:8,def:11,spd:6,xp:44,gold:20,traits:['magic'],
    moves:[{n:'Stone Fist',pow:1.2},{n:'Warding Pulse',pow:.9,spell:true,all:true}],drops:[{id:'rift_shard',chance:.25}],desc:'A construct left to guard old Muxue vaults.'},
  rift_wraith:{n:'Rift Wraith',icon:'👻',hp:95,atk:7,mag:17,def:6,spd:12,xp:50,gold:24,traits:['magic'],
    moves:[{n:'Void Touch',pow:1.1,spell:true},{n:'Wail',pow:.8,spell:true,all:true,fx:[{k:'slow',d:2}]}],drops:[{id:'rift_shard',chance:.4}],desc:'Something that slipped through when the gates opened.'},
  ice_golem:{n:'Ice Golem',icon:'🧊',elite:true,hp:170,atk:16,mag:0,def:15,spd:5,xp:80,gold:40,
    moves:[{n:'Glacial Smash',pow:1.3},{n:'Frozen Grip',pow:.8,fx:[{k:'bind',d:1}]}],drops:[{id:'ice_crystal',chance:.7}],desc:'A walking slab of mountain ice.'},
  /* ---- Ice Temple depths (gameplay filler tied to the temple map's levels; NOT story events) ---- */
  frost_stalker:{n:'Frost Stalker',icon:'🐆',hp:110,atk:17,mag:0,def:8,spd:17,xp:52,gold:26,
    moves:[{n:'Ice Fang',pow:1.1},{n:'Pounce',pow:1.6},{n:'Stalking Chill',pow:.7,fx:[{k:'slow',d:2}]}],drops:[{id:'ice_crystal',chance:.35}],desc:'A pale hunter that prowls the temple corridors.'},
  icicle_snare:{n:'Icicle Snare',icon:'🪤',hp:90,atk:14,mag:6,def:14,spd:6,xp:46,gold:22,
    moves:[{n:'Falling Icicles',pow:1.2,all:true},{n:'Frozen Trap',pow:.8,fx:[{k:'bind',d:1}]}],drops:[{id:'ice_crystal',chance:.4}],desc:'A trap mechanism that fights back.'},
  maze_wraith:{n:'Maze Wraith',icon:'💨',hp:105,atk:8,mag:19,def:7,spd:13,xp:56,gold:28,traits:['magic'],
    moves:[{n:'Cold Drain',pow:1.1,spell:true,fx:[{k:'silence',d:1}]},{n:'Wail',pow:.8,spell:true,all:true}],drops:[{id:'rift_shard',chance:.3}],desc:'A restless chill that wanders the sealed corridors.'},
  horned_beast:{n:'Horned Beast',icon:'🦬',elite:true,hp:210,atk:19,mag:0,def:14,spd:8,xp:96,gold:50,
    moves:[{n:'Horn Charge',pow:1.5},{n:'Ground Slam',pow:.9,all:true,fx:[{k:'slow',d:1}]}],drops:[{id:'wolf_pelt',chance:.8},{id:'ice_crystal',chance:.5}],desc:'One of the arena\'s two horned beasts.'},
  cave_crawler:{n:'Cave Crawler',icon:'🕷️',hp:120,atk:18,mag:0,def:10,spd:12,xp:60,gold:30,
    moves:[{n:'Venom Bite',pow:1.1,fx:[{k:'burn',d:2}]},{n:'Web Shot',pow:.7,fx:[{k:'slow',d:2}]}],drops:[{id:'frost_herb',chance:.4}],desc:'Lives in the dark below the temple.'},
  hoard_mimic:{n:'Hoard Mimic',icon:'📦',elite:true,hp:180,atk:18,mag:8,def:16,spd:7,xp:90,gold:90,
    moves:[{n:'Snapping Lid',pow:1.4},{n:'Gold Lure',pow:.8,fx:[{k:'charm',d:1}]}],drops:[{id:'spirit_draught',chance:.4},{id:'moonlit_tonic',chance:.4}],desc:'It was never a chest.'},
  /* ---- Volume 4 training (gameplay filler; NOT story events): the Commanders' Trial Ground and the Xuancang Slopes ---- */
  sparring_construct:{n:'Sparring Construct',icon:'🛡️',hp:120,atk:14,mag:0,def:12,spd:8,xp:54,gold:26,
    moves:[{n:'Training Strike',pow:1.1},{n:'Guard Break',pow:.8,fx:[{k:'slow',d:1}]}],drops:[{id:'ice_crystal',chance:.3}],desc:'A practice partner the temple guard drills against. It hits honestly and never holds a grudge.'},
  snowfield_ram:{n:'Snowfield Ram',icon:'🐏',elite:true,hp:190,atk:17,mag:0,def:13,spd:9,xp:84,gold:42,
    moves:[{n:'Horn Rush',pow:1.4},{n:'Stamp',pow:.8,all:true,fx:[{k:'slow',d:1}]}],drops:[{id:'wolf_pelt',chance:.7},{id:'frost_herb',chance:.3}],desc:'A heavy mountain ram that holds the high slopes above the temple.'},
  ridge_yeti:{n:'Ridge Yeti',icon:'🦍',elite:true,hp:200,atk:18,mag:0,def:11,spd:10,xp:88,gold:44,
    moves:[{n:'Maul',pow:1.3},{n:'Roar',pow:.7,all:true,fx:[{k:'slow',d:2}]}],drops:[{id:'wolf_pelt',chance:.6},{id:'ice_crystal',chance:.4}],desc:'A shaggy giant of the ridgeline: wary, strong and easy to avoid for anyone who does not go looking.'},
  /* ---- Volume 2 road bounties (gameplay; the Red Lantern shadow and anchor are from V2 comic 015) ---- */
  red_lantern_shadow:{n:'Red Lantern Shadow',icon:'🏮',hp:150,atk:11,mag:10,def:7,spd:11,xp:150,gold:80,traits:['magic','layered'],
    moves:[{n:'Tangled Threads',pow:1.1},{n:'Spirit Drain',pow:.7,spell:true,fx:[{k:'drain',v:.25}]},{n:'Red Core Pulse',pow:.6,spell:true,all:true}],drops:[],desc:'A faceless shadow of tangled black threads around a pulsing red core. Its outer layer reacts to spiritual energy and halves the damage it takes; expose the core (cleansing powder, a strip or a diagnosis) or wait for the layer to crack (round 3).'},
  corrupted_anchor:{n:'Corrupted Anchor',icon:'🔻',hp:70,atk:4,mag:8,def:8,spd:4,xp:60,gold:30,traits:['magic'],
    moves:[{n:'Black Filament',pow:.5,spell:true}],drops:[],desc:'The corrupted anchor buried beneath the road that feeds the shadow.'},
  road_shade:{n:'Road Shade',icon:'👤',hp:80,atk:11,mag:10,def:6,spd:10,xp:40,gold:20,traits:['magic'],
    moves:[{n:'Chill Touch',pow:1,spell:true},{n:'Thread Snare',pow:.7,fx:[{k:'slow',d:2}]}],drops:[{id:'imp_ash',chance:.4}],desc:'A smaller road disturbance: a flicker of cold that follows travellers after dark.'},
  imp:{n:'Imp',icon:'👺',hp:60,atk:10,mag:11,def:5,spd:13,xp:32,gold:15,traits:['magic'],
    moves:[{n:'Claw',pow:1},{n:'Hex Spark',pow:1.2,spell:true}],drops:[{id:'imp_ash',chance:.5}],desc:'A lesser demon that clings to the sick.'},
  /* STORY (chapter 13): the imp afflicting Wang Xi'er */
  afflicting_imp:{n:'The Afflicting Imp',icon:'😈',boss:true,hp:260,atk:12,mag:14,def:7,spd:11,xp:120,gold:60,traits:['magic'],
    moves:[{n:'Fever Claw',pow:1.1},{n:'Hex Spark',pow:1.2,spell:true},{n:'Sickening Cackle',pow:.7,spell:true,fx:[{k:'slow',d:2}]}],
    phases:[{at:.5,msg:'The imp shrieks and clings tighter to its host!',atk:1.2}],drops:[{id:'imp_ash',chance:1}],desc:'A small, spiteful imp that fed on Wang Xi\'er\'s fever.'},
  /* Wilds boss (not a story event) */
  frost_warden:{n:'Frost Warden',icon:'❄️',boss:true,hp:420,atk:20,mag:18,def:13,spd:9,xp:200,gold:120,traits:['magic'],
    moves:[{n:'Winter Blade',pow:1.2},{n:'Hailstorm',pow:.9,spell:true,all:true,fx:[{k:'slow',d:2}]},{n:'Frozen Gaze',pow:1,spell:true,fx:[{k:'bind',d:1}]}],
    phases:[{at:.5,msg:'The temple chills: the Warden\'s eyes turn white.',atk:1.25}],drops:[{id:'ice_crystal',chance:1},{id:'moonlit_tonic',chance:.5}],desc:'A guardian of the Ice Temple. Wilds challenge, not part of the story.'},
};
function mkEnemy(key, lv){
  /* Enemy scaling steepens past the early levels so Volume 1's whole range (Lv 1-40) stays a fight: heroes grow faster than a straight line.
     hp: 1 + 0.12*(lv-1) + 0.003*(lv-1)^2 ; attack stats: 1 + 0.12*(lv-1) + 0.004*(lv-1)^2 ; def: 1 + 0.13*(lv-1) (kept linear, like hero ATK, so high-level elites stay hittable); xp/gold follow hp. */
  const e = ENEMIES[key], d = lv-1, mh = 1 + d*0.12 + d*d*0.003, ma = 1 + d*0.12 + d*d*0.004, md = 1 + d*0.13, x = Math.max(1, mh*0.85);
  return { key, name:e.n, icon:e.icon, boss:!!e.boss, elite:!!e.elite, traits:e.traits||[], moves:e.moves, drops:e.drops||[],
    hp:Math.round(e.hp*mh), mhp:Math.round(e.hp*mh), mp:0, mmp:0,
    atk:Math.round(e.atk*ma), mag:Math.round(e.mag*ma), def:Math.round(e.def*md), spd:Math.round(e.spd*(1+d*.02)),
    xp:Math.round(e.xp*x), gold:Math.round(e.gold*x), phases:e.phases ? e.phases.map(p => Object.assign({}, p)) : null };
}

/* ---- items ---- */
const ITEMS = {
  wolf_pelt:{n:'Wolf Pelt',icon:'🧶',type:'material'}, frost_herb:{n:'Frost Herb',icon:'🌿',type:'material'},
  moon_petal:{n:'Moon Petal',icon:'🌸',type:'material'}, ice_crystal:{n:'Ice Crystal',icon:'💎',type:'material'},
  imp_ash:{n:'Imp Ash',icon:'🌫️',type:'material'}, rift_shard:{n:'Rift Shard',icon:'🔹',type:'material'},
  winter_cloaks:{n:'Winter Cloaks',icon:'🧥',type:'quest'}, ice_staff:{n:'Ice Staff',icon:'🪄',type:'quest'}, higher_spellbooks:{n:'Higher-level Spellbooks',icon:'📘',type:'quest'},
  corrupted_fragment:{n:'Corrupted Fragment',icon:'🖤',type:'quest'}, departure_record:{n:'Torn Departure Record',icon:'📜',type:'quest'}, ward_silk:{n:'Ward Silk',icon:'🧶',type:'material'},
  herbal_tonic:{n:'Herbal Tonic',icon:'🍵',type:'consumable'}, moonlit_tonic:{n:'Moonlit Tonic',icon:'🌙',type:'consumable'},
  spirit_draught:{n:'Spirit Draught',icon:'🧪',type:'consumable'}, cleansing_salt:{n:'Cleansing Salt',icon:'🧂',type:'consumable'},
};
const USE = {
  herbal_tonic:{hp:60}, moonlit_tonic:{hp:180, mp:30}, spirit_draught:{mp:60}, cleansing_salt:{hp:30, cleanse:true},
};
const useText = u => [u.hp?'+'+u.hp+' HP':'', u.mp?'+'+u.mp+' MP':'', u.heat?'−'+u.heat+' heat':'', u.cleanse?'cleanses':''].filter(Boolean).join(', ');
const SHOP = { herbal_tonic:25, moonlit_tonic:80, spirit_draught:60, cleansing_salt:40 };   // sold at the Crimson Fairy
const RECIPES = [
  {out:'herbal_tonic', need:{frost_herb:3}, label:'3 Frost Herb'},
  {out:'moonlit_tonic', need:{moon_petal:2, frost_herb:1}, label:'2 Moon Petal + 1 Frost Herb'},
  {out:'cleansing_salt', need:{imp_ash:2, ice_crystal:1}, label:'2 Imp Ash + 1 Ice Crystal'},
];
function addItems(list){ list.forEach(d => G.inv[d.id] = (G.inv[d.id]||0) + (d.qty||1)); }

/* ---- Wilds zones. unlock = chapter that must be complete. Foes are level (party average + off). ---- */
const ZONES = [
  {id:'forest', n:'Muxue Forest', icon:'🌲', unlock:1, off:0, pool:['frost_wolf','snowcap_boar','moon_wisp'], boss:null, desc:'Where Xiyu went to find what shook the island.'},
  {id:'stream', n:'The Moonlit Stream', icon:'💧', unlock:6, off:0, pool:['ice_sprite','glacier_crab','moon_wisp'], boss:null, desc:'The stream beside the Crimson Fairy.'},
  {id:'chambers', n:'The Hidden Chambers', icon:'🗝️', unlock:15, off:1, pool:['ward_sentinel','imp','moon_wisp'], boss:null, desc:'Secret vaults beneath the Crimson Fairy.'},
  {id:'rift', n:'The Rift Waters', icon:'🌀', unlock:16, off:1, pool:['rift_wraith','ice_sprite','imp'], boss:null, desc:'The water where the gates opened.'},
  {id:'steps', n:'The Icy Mountain Steps', icon:'🏔️', unlock:17, off:1, pool:['frost_wolf','ice_golem','rift_wraith'], boss:null, desc:'Narrow ice steps toward the sound of chains.'},
  {id:'temple', n:'Ice Temple · Level 1', icon:'🏯', unlock:18, off:1, pool:['ice_golem','ward_sentinel','frost_stalker'], boss:'frost_warden', desc:'The upper temple of ice.'},
  {id:'maze', n:'Ice Temple · Level 2: Sealed Maze', icon:'🧩', unlock:24, off:2, pool:['icicle_snare','maze_wraith','frost_stalker'], boss:['horned_beast','horned_beast'], bossName:'The Monster Arena', desc:'Trapped corridors, puzzles and powerful foes. Opens after chapter 24 (the maze and the horned beasts).'},
  {id:'trial', n:'Ice Temple · Commanders\' Trial Ground', icon:'⚔️', unlock:117, off:1, pool:['sparring_construct','ward_sentinel','frost_stalker'], boss:['horned_beast','horned_beast'], bossName:'Trial Rounds', desc:'The temple guard\'s drill yard, run by the commanders for those staying in the temple. Sparring constructs, and Trial Rounds in the arena that each get harder.'},
  {id:'slopes', n:'The Xuancang Slopes', icon:'⛰️', unlock:117, off:1, pool:['frost_wolf','snowfield_ram','ridge_yeti','ice_golem'], boss:null, desc:'The open mountainside above the temple: wolves, rams and ridge giants. A short walk out and back, no commander required.'},
  {id:'depths', n:'Ice Temple · Level 3: Underground', icon:'⛏️', unlock:24, off:2, pool:['cave_crawler','hoard_mimic','maze_wraith'], boss:null, desc:'The underground level below the maze (ch24).'},
];
const zoneOpen = z => z.unlock!==null && G.ch >= z.unlock;

/* ---- loot ---- */
const LOOT = { afflicting_imp:{guaranteed:[{id:'imp_ash',qty:[2,3]}],rolls:[{id:'moonlit_tonic',chance:.5}],firstClear:[{id:'cleansing_salt',qty:[2,2]}]},
               frost_warden:{guaranteed:[{id:'ice_crystal',qty:[2,3]}],rolls:[{id:'moonlit_tonic',chance:.5},{id:'spirit_draught',chance:.4}],firstClear:[{id:'rift_shard',qty:[2,2]}]} };
function rollLoot(table, first){
  const out = []; if(!table) return out;
  (table.guaranteed||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  (table.rolls||[]).forEach(d => { if(Math.random() < d.chance) out.push({id:d.id, qty:rint(d.qty||[1,1])}); });
  if(first) (table.firstClear||[]).forEach(d => out.push({id:d.id, qty:rint(d.qty||[1,1])}));
  return out;
}

/* ---- consumables ---- */
function useConsumable(id, k){
  const u = USE[k]; if(!u || !(G.inv[k] > 0)) return false;
  G.inv[k]--; healUnit(id, u.hp, u.mp); if(u.heat) G.heat = Math.max(0, (G.heat||0) - u.heat); save(); return true;
}
function brew(out){
  const r = RECIPES.find(x => x.out===out); if(!r) return 'Unknown recipe.';
  if(!Object.keys(r.need).every(k => (G.inv[k]||0) >= r.need[k])) return 'Needs '+r.label+'.';
  Object.keys(r.need).forEach(k => G.inv[k] -= r.need[k]); addItems([{id:out, qty:1}]); save();
  return 'Brewed '+ITEMS[out].icon+' '+ITEMS[out].n+'.';
}
function buyItem(k){
  const p = SHOP[k]; if(!p || G.gold < p) return false;
  G.gold -= p; G.inv[k] = (G.inv[k]||0)+1; save(); return true;
}
