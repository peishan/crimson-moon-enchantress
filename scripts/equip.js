/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — EQUIPMENT
   Five slots: Robe / Armour · Weapon (single-handed, two-handed or dual blades) · Gloves · Shoes · Accessory.
   Owned gear is a set (G.gear.owned); each hero wears at most one piece per slot (G.gear.eq[hero][slot]); a piece can be upgraded twice (G.gear.tier).
   Pieces add stats (statsOf), may carry effects (physRed / magRed / noSlow / mechanisms) and may GRANT battle skills while worn.
   Art: assets/gear/<id>.webp (square icon); a missing file falls back to the emoji. Chapters award gear through CH_GEAR (journal.js).
   ===================================================================== */
const GEAR_SLOTS = [['outfit','Robe / Armour','👘'],['weapon','Weapon','⚔️'],['gloves','Gloves','🧤'],['shoes','Shoes','👢'],['accessory','Accessory','📿']];
const WTYPE = {one:'Single-handed', two:'Two-handed', dual:'Dual blades'};
const GEAR_TIERS = [null, {gold:60, mats:{ice_crystal:3}}, {gold:140, mats:{ice_crystal:6, rift_shard:3}}];   // cost to reach tier 1 and tier 2; +30% stats per tier
const G_ = (id,n,slot,icon,who,stats,desc,extra) => Object.assign({id,n,slot,icon,who,stats,desc}, extra||{});
const GEAR = {};
[
 /* starters: most heroes begin in a robe; the fighters in light armour */
 G_('robe_xiyu','Crimson Silk Robe','outfit','👘','xiyu',{hp:4,def:2,mag:1},'The robe she wears on the island.',{starter:true}),
 G_('robe_dongyue','Spellblade Robe','outfit','👘','dongyue',{hp:6,def:2},'Layered robes cut for a sword and a healing hand.',{starter:true}),
 G_('robe_cangyuan','Weaver\'s Robe','outfit','👘','cangyuan',{def:1,mag:2},'Dark robes with red thread worked into the hem.',{starter:true}),
 G_('robe_xining','Physician\'s Robe','outfit','👘','xining',{mp:4,def:1,mag:1},'Pale robes with deep sleeves for herbs and needles.',{starter:true}),
 G_('armor_xiaotian','Traveller\'s Leathers','outfit','🥋','xiaotian',{hp:4,def:2},'Hard-wearing leathers for the road.',{starter:true}),
 G_('armor_yaxing','Deckhand\'s Tunic','outfit','🥋','yaxing',{def:1,spd:1},'A sailor\'s working tunic.',{starter:true}),
 G_('armor_hoko','Explorer\'s Coat','outfit','🥋','hoko',{def:2,spd:1},'A fur-trimmed coat with many pockets.',{starter:true}),
 G_('armor_suliechen','Slayer\'s Coat','outfit','🥋','suliechen',{hp:4,def:2},'A long coat with sewn-in talisman pockets.',{starter:true}),
 G_('w_xiyu','Ice Staff','weapon','🪄','xiyu',{mag:4,mp:4},'A staff of old ice that steadies her spells.',{starter:true,wt:'two'}),
 G_('w_dongyue','Spellblade','weapon','🗡️','dongyue',{atk:3,mag:2},'A blade that also carries healing.',{starter:true,wt:'one'}),
 G_('w_cangyuan','Thread Spindle','weapon','🧵','cangyuan',{mag:3},'A spindle wound with spirit thread.',{starter:true,wt:'one'}),
 G_('w_xining','Self-Defence Dagger','weapon','🗡️','xining',{atk:2},'A simple dagger for self-defence. She is a physician, not a fighter.',{starter:true,wt:'one'}),
 G_('healing_staff','Healing Staff','weapon','🪄','xining',{mag:5,mp:10},'A healing staff she can earn later. (Not awarded yet: the author decides when.)',{wt:'two'}),
 G_('w_yaxing','Throwing Knives','weapon','🔪','yaxing',{atk:3,spd:2},'A pair of balanced knives.',{starter:true,wt:'dual'}),
 G_('w_hoko','Explorer\'s Blade','weapon','🗡️','hoko',{atk:3},'A short blade for cutting rope and ice.',{starter:true,wt:'one'}),
 G_('w_suliechen','Frost Saber','weapon','🗡️','suliechen',{atk:3,mag:1},'A saber that leaves a trace of cold.',{starter:true,wt:'one'}),
 /* Volume 4: the Ice Temple */
 G_('bracers_xiaotian','Mountain-Stance Bracers','gloves','🧤','xiaotian',{def:4,hp:8},'Reinforce his guard and keep him steady against heavy blows, without making him a mage.',{fx:{physRed:.10,noSlow:true},fxText:'Takes 10% less physical damage and cannot be slowed.'}),
 G_('skyshard','Arcane Sword: Skyshard','weapon','🗡️','yaxing',{atk:5,mag:3,spd:3},'A light, swift sword for his new style: a mobile swordsman with innate magic resistance and limited arcane techniques. (Working name.)',{wt:'one',fx:{magRed:.10},fxText:'Takes 10% less magic damage. Grants Spirit Snare and Arcane Disruption; Spiritual Pulse at tier 2.',grants:['spirit_snare','arcane_disruption','spiritual_pulse']}),
 G_('outfit_yaxing_sky','Commanders\' Sky-Blue Outfit','outfit','👘','yaxing',{def:3,spd:2},'The outfit the commanders gave him. He took a liking to it.',{}),
 G_('wayfinders_key','Wayfinder\'s Key','accessory','🗝️','hoko',{spd:2,mp:6,def:1},'Helps him recognise and operate ancient mechanisms: exploration utility more than combat strength.',{fx:{mechanisms:true},fxText:'Recognises and operates ancient mechanisms. Grants Operate the Mechanism.',grants:['operate_mechanism']}),
 G_('frostweave_gloves','Frostweave Gloves','gloves','🧤',null,{def:2,mag:1},'Gloves woven from temple frost-silk.'),
 G_('temple_boots','Ice Temple Boots','shoes','👢',null,{spd:2,def:1},'Spiked soles for the temple\'s icy stairs.'),
 G_('warding_charm','Temple Warding Charm','accessory','📿',null,{hp:8,def:1},'A charm cut with a small ward.',{fx:{magRed:.05},fxText:'Takes 5% less magic damage.'}),
].forEach(g => GEAR[g.id] = g);
/* Shop stock (generic pieces anyone can wear). price = gold. Hero-specific gear is never sold. */
[
 G_('sw_dagger','Plain Dagger','weapon','🗡️',null,{atk:2},'A cheap, honest dagger.',{wt:'one',price:25}),
 G_('sw_traveller','Traveller\'s Sword','weapon','🗡️',null,{atk:4},'A sturdy single-handed sword.',{wt:'one',price:50}),
 G_('sw_wand','Sparring Wand','weapon','🪄',null,{mag:3,mp:2},'A light wand for focusing spells.',{wt:'one',price:70}),
 G_('sw_twin','Twin Daggers','weapon','🔪',null,{atk:4,spd:3},'A matched pair, quick in the hand.',{wt:'dual',price:110}),
 G_('sw_staff','Oak Staff','weapon','🪄',null,{mag:4,mp:5},'A two-handed staff of seasoned oak.',{wt:'two',price:90}),
 G_('sw_broad','Broadsword','weapon','⚔️',null,{atk:7,spd:-1},'Heavy and two-handed: hits hard, swings slowly.',{wt:'two',price:130}),
 G_('ar_leather','Padded Leathers','outfit','🥋',null,{def:3,hp:6},'Quilted leather armour.',{price:60}),
 G_('ar_robe','Quilted Robe','outfit','👘',null,{def:2,mp:4,mag:1},'A warm robe lined with cotton.',{price:60}),
 G_('gl_leather','Leather Gloves','gloves','🧤',null,{def:1},'Plain leather gloves.',{price:30}),
 G_('gl_wrap','Hand Wraps','gloves','🧤',null,{atk:2},'Wraps for a firmer grip.',{price:35}),
 G_('sh_boots','Travelling Boots','shoes','👢',null,{spd:1,def:1},'Good for long roads.',{price:35}),
 G_('sh_snow','Snow Boots','shoes','👢',null,{def:2},'Fur-lined boots for the snowfields.',{price:50}),
 G_('ac_ring','Copper Ring','accessory','💍',null,{hp:6},'A plain ring said to turn small harm.',{price:45}),
].forEach(g => GEAR[g.id] = g);
/* Smiths: a weaponsmith and an armorsmith in Muxue (open from chapter 5, before Xiao Tian joins) and at the Ice Temple (LOCKED until the author's temple map: open:false). */
const SMITHS = [
 {id:'muxue_weapons', n:'Muxue Weaponsmith', icon:'⚒️', slot:['weapon'], open:() => G.ch >= 5, stock:['sw_dagger','sw_traveller','sw_wand','sw_twin','sw_staff','sw_broad']},
 {id:'muxue_armor', n:'Muxue Armorsmith', icon:'🛡️', slot:['outfit','gloves','shoes','accessory'], open:() => G.ch >= 5, stock:['ar_leather','ar_robe','gl_leather','gl_wrap','sh_boots','sh_snow','ac_ring']},
 {id:'temple_weapons', n:'Ice Temple Weaponsmith', icon:'⚒️', slot:['weapon'], open:() => false, note:'The temple forge is sealed for now.', stock:[]},
 {id:'temple_armor', n:'Ice Temple Armorsmith', icon:'🛡️', slot:['outfit','gloves','shoes','accessory'], open:() => false, note:'The temple forge is sealed for now.', stock:[]},
];
function buyGear(smithId, id){
  const sm = SMITHS.find(s => s.id===smithId), g = GEAR[id];
  if(!sm || !sm.open() || !g || !sm.stock.includes(id)) return ['That is not for sale.'];
  if(GR().owned[id]) return ['You already own the '+g.n+'.'];
  if(G.gold < g.price) return ['The '+g.n+' costs '+g.price+' gold.'];
  G.gold -= g.price; GR().owned[id] = true; save();
  return ['🛒 Bought the '+g.n+' (-'+g.price+'g). Equip it from a hero\'s Party page.'];
}
function smithsHtml(){
  return '<h4>Smiths</h4>' + SMITHS.map(sm => {
    if(!sm.open()) return `<div class="card lock" style="cursor:default"><span class="big">${sm.icon}</span><div class="fl"><b>${sm.n}</b><div class="sm">🔒 ${sm.note||'Not open yet.'}</div></div></div>`;
    return `<div class="panel"><b>${sm.icon} ${sm.n}</b>${sm.stock.map(id => { const g = GEAR[id], own = gearOwned(id);
      return `<div class="ev"><div><b>${g.icon} ${g.n}</b>${g.wt?` <span class="sm">· ${WTYPE[g.wt]}</span>`:''}<div class="sm">${gearStatText(g)} · ${GEAR_SLOTS.find(s=>s[0]===g.slot)[1]}</div></div>${own?'<span class="sm">owned</span>':`<button ${G.gold>=g.price?'':'disabled'} onclick="act(()=>buyGear('${sm.id}','${id}'))">${g.price}g</button>`}</div>`; }).join('')}</div>`; }).join('');
}

/* skills granted by worn gear (same format as hero skills; tier = upgrade tier needed) */
const GEAR_SKILLS = {
 spirit_snare:{id:'spirit_snare',n:'Spirit Snare',icon:'🪢',mp:6,kind:'phys',tgt:'foe',pow:.9,fx:[{k:'bind',d:2}],req:{lvl:1},tier:0,desc:'A short-range binding strike with the Skyshard.'},
 arcane_disruption:{id:'arcane_disruption',n:'Arcane Disruption',icon:'🌀',mp:9,kind:'magic',tgt:'foe',pow:.8,fx:[{k:'silence',d:2},{k:'strip'}],req:{lvl:1},tier:0,desc:'Interrupts a foe\'s active spell (silence) and unravels its barrier.'},
 spiritual_pulse:{id:'spiritual_pulse',n:'Spiritual Pulse',icon:'💫',mp:22,kind:'magic',tgt:'foes',pow:1.1,fx:[{k:'slow',d:2},{k:'silence',d:1}],req:{lvl:1},tier:2,desc:'A costly burst of energy that pushes enemies back: damage, slows and briefly silences every foe. (Skyshard tier 2.)'},
 operate_mechanism:{id:'operate_mechanism',n:'Operate the Mechanism',icon:'⚙️',mp:8,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'strip'},{k:'expose',d:3},{k:'slow',d:1}],req:{lvl:1},tier:0,desc:'Turns an ancient mechanism\'s own workings against a construct: analysed, stripped of its barrier, exposed and slowed.'},
};
const GEAR_START = {};   // filled below: hero -> [starter ids]
Object.values(GEAR).filter(g => g.starter).forEach(g => (GEAR_START[g.who] = GEAR_START[g.who] || []).push(g.id));

function GR(){
  if(!G.gear){ G.gear = {owned:{}, eq:{}, tier:{}}; }
  Object.keys(GEAR_START).forEach(h => { if(!G.gear.eq[h]){ G.gear.eq[h] = {}; GEAR_START[h].forEach(id => { G.gear.owned[id] = true; G.gear.eq[h][GEAR[id].slot] = id; }); } });
  return G.gear;
}
const gearOwned = id => !!GR().owned[id];
const gearTier = id => GR().tier[id] || 0;
const gearAt = (hero, slot) => { const id = (GR().eq[hero]||{})[slot]; return id ? GEAR[id] : null; };
const gearWorn = hero => GEAR_SLOTS.map(s => gearAt(hero, s[0])).filter(Boolean);
const gearMult = id => 1 + .3*gearTier(id);
function gearStats(hero){ const out = {}; gearWorn(hero).forEach(g => Object.keys(g.stats).forEach(k => out[k] = (out[k]||0) + Math.round(g.stats[k]*gearMult(g.id)))); return out; }
function gearFx(hero){ const out = {physRed:0, magRed:0}; gearWorn(hero).forEach(g => { const f = g.fx||{}; out.physRed += f.physRed||0; out.magRed += f.magRed||0; if(f.noSlow) out.noSlow = true; if(f.mechanisms) out.mechanisms = true; }); return out; }
function gearSkills(hero){ const out = []; gearWorn(hero).forEach(g => (g.grants||[]).forEach(sid => { const s = GEAR_SKILLS[sid]; if(s && gearTier(g.id) >= (s.tier||0)) out.push(Object.assign({}, s, {fromGear:g.id})); })); return out; }
function giveGear(id, equipNow){
  const g = GEAR[id]; if(!g) return []; GR().owned[id] = true;
  if(equipNow !== false && g.who && (g.unique !== false)){ equipGear(g.who, id, true); return ['🎁 '+g.n+' received and equipped by '+first(g.who)+'.']; }
  return ['🎁 '+g.n+' added to your gear.'];
}
function equipGear(hero, id, quiet){
  const g = GEAR[id]; if(!g || !GR().owned[id]) return [];
  if(g.who && g.who !== hero) return ['Only '+first(g.who)+' can use the '+g.n+'.'];
  Object.keys(GR().eq).forEach(h => { if(GR().eq[h][g.slot] === id && h !== hero) delete GR().eq[h][g.slot]; });   // a piece is worn by one hero at a time
  GR().eq[hero] = GR().eq[hero] || {}; GR().eq[hero][g.slot] = id;
  if(!quiet) save();
  return quiet ? [] : [first(hero)+' equips the '+g.n+'.'];
}
function unequipGear(hero, slot){ if(GR().eq[hero]) delete GR().eq[hero][slot]; save(); return []; }
function upgradeGear(id){
  const t = gearTier(id), c = GEAR_TIERS[t+1]; if(!c) return ['Already at its best.'];
  if(G.gold < c.gold || !Object.keys(c.mats).every(k => (G.inv[k]||0) >= c.mats[k])) return ['Needs '+gearCostText(c)+'.'];
  G.gold -= c.gold; Object.keys(c.mats).forEach(k => G.inv[k] -= c.mats[k]); GR().tier[id] = t+1; save();
  return ['🔨 '+GEAR[id].n+' upgraded to tier '+(t+1)+'.'+((GEAR[id].grants||[]).some(s => GEAR_SKILLS[s].tier === t+1) ? ' A new technique awakens.' : '')];
}
const gearCostText = c => c.gold+'g'+Object.keys(c.mats).map(k => ' + '+c.mats[k]+' '+ITEMS[k].n).join('');
function giveChapterGear(n, silent){ const m = []; (CH_GEAR[n]||[]).forEach(id => { const r = giveGear(id); if(!silent) r.forEach(x => m.push(x)); }); return m; }

/* ---------- UI (in the Party sheet) ---------- */
let eqPick = null;   // {hero, slot}
const gearStatText = g => Object.keys(g.stats).map(k => { const v = Math.round(g.stats[k]*gearMult(g.id)); return (v>=0?'+':'')+v+' '+(STAT_NAME[k]||k); }).join(' ');
const gearIcon = g => artOrIcon('assets/gear/'+g.id+'.webp', g.icon, 'gicon');
function equipHtml(hero){
  const rows = GEAR_SLOTS.map(([slot,label,ic]) => {
    const g = gearAt(hero, slot), open = eqPick && eqPick.hero===hero && eqPick.slot===slot;
    const t = g ? gearTier(g.id) : 0;
    const body = g ? `<div class="gi">${gearIcon(g)}</div><div class="fl"><b>${g.n}</b>${g.wt?` <span class="sm">· ${WTYPE[g.wt]}</span>`:''} ${t?'<em class="tag">tier '+t+'</em>':''}<div class="sm">${gearStatText(g)}${g.fxText?' · '+g.fxText:''}</div>`
      + (GEAR_TIERS[t+1] ? `<div class="sm"><button onclick="act(()=>upgradeGear('${g.id}'))" ${G.gold>=GEAR_TIERS[t+1].gold && Object.keys(GEAR_TIERS[t+1].mats).every(k=>(G.inv[k]||0)>=GEAR_TIERS[t+1].mats[k])?'':'disabled'}>🔨 Upgrade (${gearCostText(GEAR_TIERS[t+1])})</button></div>` : '') + `</div>`
      : `<div class="fl"><span class="sm">${ic} ${label}: empty</span></div>`;
    const pick = open ? `<div class="panel">${Object.keys(GR().owned).map(id => GEAR[id]).filter(x => x.slot===slot && (!x.who || x.who===hero)).map(x => `<div class="ev"><div><b>${x.icon} ${x.n}</b>${x.wt?` <span class="sm">· ${WTYPE[x.wt]}</span>`:''}<div class="sm">${gearStatText(x)}</div></div><button onclick="eqPick=null;act(()=>equipGear('${hero}','${x.id}'))">Equip</button></div>`).join('') || '<div class="sm">Nothing owned for this slot.</div>'}${g?`<button onclick="eqPick=null;act(()=>unequipGear('${hero}','${slot}'))">Remove</button>`:''}<button onclick="eqPick=null;render()">Close</button></div>` : '';
    return `<div class="ev" style="align-items:flex-start"><div style="flex:1"><div class="sm"><b>${ic} ${label}</b></div><div class="row" style="gap:8px;align-items:center">${body}</div></div><button onclick="eqPick={hero:'${hero}',slot:'${slot}'};render()">Change</button></div>${pick}`; }).join('');
  return `<h4>Equipment</h4>${rows}`;
}
