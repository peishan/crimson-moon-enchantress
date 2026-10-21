/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — EQUIPMENT
   Three slots (the author's equipment sheet): Clothing / Armour · Weapon or Tool (single-handed, two-handed, dual blades or tool) · Accessory; plus a Book slot for Xining only.
   Owned gear is a set (G.gear.owned); each hero wears at most one piece per slot (G.gear.eq[hero][slot]); a piece can be upgraded twice (G.gear.tier).
   Pieces add stats (statsOf), may carry effects (physRed / magRed / noSlow / mechanisms) and may GRANT battle skills while worn.
   Art: assets/gear/<id>.webp (square icon); a missing file falls back to the emoji. Chapters award gear through CH_GEAR (journal.js).
   ===================================================================== */
const GEAR_SLOTS = [['outfit','Clothing / Armour','👘'],['weapon','Weapon / Tool','⚔️'],['accessory','Accessory','📿'],['book','Book','📖']];   // the Book slot only shows for heroes who have book gear (Xining)
const WTYPE = {one:'Single-handed', two:'Two-handed', dual:'Dual blades', tool:'Tool', focus:'Focus'};
const GEAR_TIERS = [null, {gold:60, mats:{ice_crystal:3}}, {gold:140, mats:{ice_crystal:6, rift_shard:3}}];   // cost to reach tier 1 and tier 2; +30% stats per tier
const G_ = (id,n,slot,icon,who,stats,desc,extra) => Object.assign({id,n,slot,icon,who,stats,desc}, extra||{});
const GEAR = {};
[
 /* ---- starting equipment (author's Starting Equipment sheet, Volume 4): outfit, weapon/focus/tool, accessory each; icons assets/gear/<id>.webp ---- */
 G_('crimson_silk_robe','Crimson Silk Robe','outfit','👘','xiyu',{hp:4,def:2,mag:1},'The robe she wears on the island.',{starter:true}),
 G_('moonshadow_hairpin','Moonshadow Hairpin','weapon','🌙','xiyu',{mag:3,mp:4},'A focus aid: a hairpin that steadies her spells.',{starter:true,wt:'focus'}),
 G_('jade_charm','Jade Charm','accessory','🔴','xiyu',{hp:4,mag:1},'A basic jade charm.',{starter:true}),
 G_('travellers_sword','Traveller\'s Sword','weapon','🗡️','dongyue',{atk:3,mag:1},'A reliable blade that also carries his healing.',{starter:true,wt:'one'}),
 G_('azure_travellers_robe','Azure Traveller\'s Robe','outfit','🥼','dongyue',{def:2,hp:4},'An azure robe for the road.',{starter:true}),
 G_('travellers_jade','Traveller\'s Jade','accessory','🔵','dongyue',{hp:4,def:1},'A general-purpose jade pendant.',{starter:true}),
 G_('binding_gauntlets','Binding Gauntlets','weapon','🧤','cangyuan',{mag:2,spd:1},'Gauntlets he binds with spirit thread.',{starter:true,wt:'tool'}),
 G_('darkwood_robe','Darkwood Robe','outfit','🥼','cangyuan',{def:1,mag:1},'A dark robe with red thread in the hem.',{starter:true}),
 G_('spirit_beads','Spirit Beads','accessory','📿','cangyuan',{mp:5,mag:1},'Beads that hold a little spirit energy.',{starter:true}),
 G_('healers_needle_set','Healer\'s Needle Set','weapon','💉','xining',{mp:4,mag:1},'Silver needles for treatment and, if needed, defence.',{starter:true,wt:'tool'}),
 G_('robe_xining','Physician\'s Robe','outfit','👘','xining',{mp:3,def:1,mag:1},'Pale robes with deep sleeves.',{starter:true}),
 G_('herbal_pouch','Herbal Pouch','accessory','🌿','xining',{hp:4,mp:2},'Pressed herbs in a small pouch.',{starter:true}),
 G_('basic_medical_texts','Basic Medical Texts','book','📘','xining',{mag:2,mp:3},'Her trusted reference (no art on the sheet yet).',{starter:true}),
 G_('practice_blade','Practice Blade','weapon','🗡️','xiaotian',{atk:3},'A plain practice blade.',{starter:true,wt:'one'}),
 G_('journeymans_outfit','Journeyman\'s Outfit','outfit','🥋','xiaotian',{hp:4,def:2},'Hard-wearing travelling clothes.',{starter:true}),
 G_('wooden_talisman','Wooden Talisman','accessory','🟫','xiaotian',{def:1,hp:3},'A carved wooden talisman.',{starter:true}),
 G_('deckhands_blade','Deckhand\'s Blade','weapon','🗡️','yaxing',{atk:3,spd:1},'A plain sailor\'s blade.',{starter:true,wt:'one'}),
 G_('seafarer_outfit','Seafarer Outfit','outfit','🥋','yaxing',{def:1,spd:1},'A seafarer\'s clothes.',{starter:true}),
 G_('broken_talisman','Broken Talisman','accessory','🪧','yaxing',{spd:1,hp:3},'A cracked talisman he still keeps.',{starter:true}),
 G_('explorers_knife','Explorer\'s Knife','weapon','🔪','hoko',{atk:2,spd:2},'A knife for rope, ice and locks.',{starter:true,wt:'one'}),
 G_('fur_mantle','Fur Mantle','outfit','🧥','hoko',{def:2,hp:3},'A warm fur mantle.',{starter:true}),
 G_('lockpick_set','Lockpick Set','accessory','🗝️','hoko',{mp:4,spd:1},'A utility accessory: fine picks.',{starter:true}),
 /* ---- starting equipment (author's Party Equipment Sheet, "before the Ice Temple"): three pieces each ---- */
 G_('armor_suliechen','Slayer\'s Coat','outfit','🥋','suliechen',{hp:4,def:2},'A long coat with sewn-in talisman pockets.',{starter:true}),
 G_('w_suliechen','Frost Saber','weapon','🗡️','suliechen',{atk:3,mag:1},'A saber that leaves a trace of cold.',{starter:true,wt:'one'}),
 /* ---- Treasure Vault upgrades (hidden vault behind the Ice Temple library; Hoko picks the locks) ---- */
 G_('crimson_moon_hairpin','Crimson Moon Hairpin','accessory','🌙','xiyu',{mag:5,mp:10},'A refined hairpin imbued with eclipse energy. Helps her control her power and reduces the strain when using magic.',{fx:{mpRed:.08,fxPlus:{burn:1,slow:1,bind:1,silence:1,charm:1}},fxText:'Magic costs 8% less MP and her spell effects last a turn longer.'}),
 G_('celestial_compass','Celestial Compass Pendant','accessory','🧭','dongyue',{hp:8,def:2,mp:5},'An ancient compass that responds to celestial alignments. Identifies hidden routes and steadies the mind in spatially distorted areas.',{fx:{discRes:.5,routes:true},fxText:'Resists silence and charm; detects hidden routes (exploration use not built).'}),
 G_('spiritweave_bracers','Spiritweave Bracers','accessory','🧶','cangyuan',{mag:4,mp:8},'Bracers woven with ancient binding techniques. Improve his control over spiritual energy and complex formations.',{fx:{fxPlus:{bind:1,slow:1,thread:1},magRed:.05},fxText:'His binds and slows last a turn longer; 5% less magic damage.'}),
 G_('bracers_xiaotian','Mountain-Stance Bracers','accessory','🟢','xiaotian',{def:4,hp:8},'Reinforced bracers that enhance physical stability and endurance. Help him withstand heavy blows without relying on magic.',{fx:{physRed:.10,noSlow:true},fxText:'Takes 10% less physical damage and cannot be slowed.'}),
 G_('skyshard','Arcane Sword: Skyshard','weapon','🗡️','yaxing',{atk:5,mag:3,spd:3},'A legendary blade crafted for one with unique resistance and affinity. Enhances his speed, disrupts enemy techniques and channels his new abilities. (Working name.)',{wt:'one',fx:{magRed:.10},fxText:'Takes 10% less magic damage. Grants Spirit Snare and Arcane Disruption; Spiritual Pulse at tier 2.',grants:['spirit_snare','arcane_disruption','spiritual_pulse']}),
 G_('outfit_yaxing_sky','Commanders\' Sky-Blue Outfit','outfit','👘','yaxing',{def:3,spd:2},'The outfit the commanders gave him. He took a liking to it.',{}),
 G_('wayfinders_key','Wayfinder\'s Key','accessory','🗝️','hoko',{spd:2,mp:6,def:1},'A multi-function key that can open ancient locks and operate temple mechanisms. Increases his ability to explore and uncover hidden paths.',{fx:{mechanisms:true},fxText:'Opens ancient locks and operates devices (exploration use not built). Grants Operate the Mechanism.',grants:['operate_mechanism']}),
 /* ---- Library discovery ---- */
 G_('healers_scripture','Healer\'s Scripture','book','📜','xining',{mag:5,mp:10},'A collection of rare medical texts from the Ice Temple: advanced healing techniques, spiritual diagnosis and unique support arts.',{fxText:'Grants Meridian Sanctuary.',grants:['meridian_sanctuary']}),
 /* generic temple pieces (not awarded yet) */
 G_('frostweave_gloves','Frostweave Gloves','accessory','🧤',null,{def:2,mag:1},'Gloves woven from temple frost-silk.'),
 G_('temple_boots','Ice Temple Boots','accessory','👢',null,{spd:2,def:1},'Spiked soles for the temple\'s icy stairs.'),
 G_('warding_charm','Temple Warding Charm','accessory','📿',null,{hp:8,def:1},'A charm cut with a small ward.',{fx:{magRed:.05},fxText:'Takes 5% less magic damage.'}),
 G_('healing_staff','Healing Staff','weapon','🪄','xining',{mag:5,mp:10},'A healing staff she can earn later. (Not awarded yet.)',{wt:'two'}),
 /* starters: most heroes begin in a robe; the fighters in light armour */
 /* Volume 4: the Ice Temple */
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
 G_('gl_leather','Leather Gloves','accessory','🧤',null,{def:1},'Plain leather gloves.',{price:30}),
 G_('gl_wrap','Hand Wraps','accessory','🧤',null,{atk:2},'Wraps for a firmer grip.',{price:35}),
 G_('sh_boots','Travelling Boots','accessory','👢',null,{spd:1,def:1},'Good for long roads.',{price:35}),
 G_('sh_snow','Snow Boots','accessory','👢',null,{def:2},'Fur-lined boots for the snowfields.',{price:50}),
 G_('ac_ring','Copper Ring','accessory','💍',null,{hp:6},'A plain ring said to turn small harm.',{price:45}),
].forEach(g => GEAR[g.id] = g);
/* Smiths: a weaponsmith and an armorsmith in Muxue (open from chapter 5, before Xiao Tian joins) and at the Ice Temple (LOCKED until the author's temple map: open:false). */
const SMITHS = [
 {id:'muxue_weapons', n:'Muxue Weaponsmith', icon:'⚒️', slot:['weapon'], open:() => G.ch >= 5, stock:['sw_dagger','sw_traveller','sw_wand','sw_twin','sw_staff','sw_broad']},
 {id:'muxue_armor', n:'Muxue Armorsmith', icon:'🛡️', slot:['outfit','accessory'], open:() => G.ch >= 5, stock:['ar_leather','ar_robe','gl_leather','gl_wrap','sh_boots','sh_snow','ac_ring']},
 {id:'temple_weapons', n:'Ice Temple Weaponsmith', icon:'⚒️', slot:['weapon'], open:() => false, note:'The temple forge is sealed for now.', stock:[]},
 {id:'temple_armor', n:'Ice Temple Armorsmith', icon:'🛡️', slot:['outfit','accessory'], open:() => false, note:'The temple forge is sealed for now.', stock:[]},
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
 spirit_snare:{id:'spirit_snare',n:'Spirit Snare',icon:'🪢',mp:6,kind:'phys',tgt:'foe',pow:.9,fx:[{k:'bind',d:1},{k:'slow',d:2}],req:{lvl:1},tier:0,desc:'A short-range binding strike with the Skyshard that also slows the enemy.'},
 arcane_disruption:{id:'arcane_disruption',n:'Arcane Disruption',icon:'🌀',mp:9,kind:'magic',tgt:'foe',pow:.8,fx:[{k:'silence',d:2},{k:'strip'}],req:{lvl:1},tier:0,desc:'Interrupts a foe\'s active spell (silence) and unravels its barrier.'},
 spiritual_pulse:{id:'spiritual_pulse',n:'Spiritual Pulse',icon:'💫',mp:22,kind:'magic',tgt:'foes',pow:1.1,fx:[{k:'slow',d:2},{k:'silence',d:1}],req:{lvl:1},tier:2,desc:'A costly burst of energy that pushes enemies back: damage, slows and briefly silences every foe. (Skyshard tier 2.)'},
 meridian_sanctuary:{id:'meridian_sanctuary',n:'Meridian Sanctuary',icon:'🔷',mp:18,kind:'heal',tgt:'allies',pow:.5,fx:[{k:'shield',v:.12,d:3},{k:'regen',v:.05,d:3},{k:'ward',d:3}],req:{lvl:1},tier:0,desc:'A brief protective field: stabilises allies, reduces spiritual damage and speeds recovery.'},
 operate_mechanism:{id:'operate_mechanism',n:'Operate the Mechanism',icon:'⚙️',mp:8,kind:'support',tgt:'foe',fx:[{k:'analyze'},{k:'strip'},{k:'expose',d:3},{k:'slow',d:1}],req:{lvl:1},tier:0,desc:'Turns an ancient mechanism\'s own workings against a construct: analysed, stripped of its barrier, exposed and slowed.'},
};
const GEAR_START = {};   // filled below: hero -> [starter ids]
Object.values(GEAR).filter(g => g.starter).forEach(g => (GEAR_START[g.who] = GEAR_START[g.who] || []).push(g.id));

function GR(){
  if(!G.gear){ G.gear = {owned:{}, eq:{}, tier:{}, v:5}; }
  if(G.gear.v !== 5){ G.gear.v = 5; G.gear.eq = {}; Object.keys(G.gear.owned).forEach(id => { if(!GEAR[id]) delete G.gear.owned[id]; }); }   // starters were redesigned (author's equipment sheet)
  Object.keys(GEAR_START).forEach(h => { if(!G.gear.eq[h]){ G.gear.eq[h] = {}; GEAR_START[h].forEach(id => { G.gear.owned[id] = true; G.gear.eq[h][GEAR[id].slot] = id; }); } });
  return G.gear;
}
const gearOwned = id => !!GR().owned[id];
const gearTier = id => GR().tier[id] || 0;
const gearAt = (hero, slot) => { const id = (GR().eq[hero]||{})[slot]; return id ? GEAR[id] : null; };
const gearWorn = hero => GEAR_SLOTS.map(s => gearAt(hero, s[0])).filter(Boolean);
const gearMult = id => 1 + .3*gearTier(id);
function gearStats(hero){ const out = {}; gearWorn(hero).forEach(g => Object.keys(g.stats).forEach(k => out[k] = (out[k]||0) + Math.round(g.stats[k]*gearMult(g.id)))); return out; }
function gearFx(hero){ const out = {physRed:0, magRed:0, mpRed:0, discRes:0, fxPlus:{}}; gearWorn(hero).forEach(g => { const f = g.fx||{}; out.physRed += f.physRed||0; out.magRed += f.magRed||0; out.mpRed += f.mpRed||0; out.discRes += f.discRes||0; if(f.noSlow) out.noSlow = true; if(f.mechanisms) out.mechanisms = true; if(f.routes) out.routes = true; Object.keys(f.fxPlus||{}).forEach(k => out.fxPlus[k] = (out.fxPlus[k]||0) + f.fxPlus[k]); }); return out; }
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
  const rows = GEAR_SLOTS.filter(([slot]) => slot!=='book' || Object.values(GEAR).some(g => g.slot==='book' && g.who===hero)).map(([slot,label,ic]) => {
    const g = gearAt(hero, slot), open = eqPick && eqPick.hero===hero && eqPick.slot===slot;
    const t = g ? gearTier(g.id) : 0;
    const body = g ? `<div class="gi">${gearIcon(g)}</div><div class="fl"><b>${g.n}</b>${g.wt?` <span class="sm">· ${WTYPE[g.wt]}</span>`:''} ${t?'<em class="tag">tier '+t+'</em>':''}<div class="sm">${gearStatText(g)}${g.fxText?' · '+g.fxText:''}</div>`
      + (GEAR_TIERS[t+1] ? `<div class="sm"><button onclick="act(()=>upgradeGear('${g.id}'))" ${G.gold>=GEAR_TIERS[t+1].gold && Object.keys(GEAR_TIERS[t+1].mats).every(k=>(G.inv[k]||0)>=GEAR_TIERS[t+1].mats[k])?'':'disabled'}>🔨 Upgrade (${gearCostText(GEAR_TIERS[t+1])})</button></div>` : '') + `</div>`
      : `<div class="fl"><span class="sm">${ic} ${label}: empty</span></div>`;
    const pick = open ? `<div class="panel">${Object.keys(GR().owned).map(id => GEAR[id]).filter(x => x.slot===slot && (!x.who || x.who===hero)).map(x => `<div class="ev"><div><b>${x.icon} ${x.n}</b>${x.wt?` <span class="sm">· ${WTYPE[x.wt]}</span>`:''}<div class="sm">${gearStatText(x)}</div></div><button onclick="eqPick=null;act(()=>equipGear('${hero}','${x.id}'))">Equip</button></div>`).join('') || '<div class="sm">Nothing owned for this slot.</div>'}${g?`<button onclick="eqPick=null;act(()=>unequipGear('${hero}','${slot}'))">Remove</button>`:''}<button onclick="eqPick=null;render()">Close</button></div>` : '';
    return `<div class="ev" style="align-items:flex-start"><div style="flex:1"><div class="sm"><b>${ic} ${label}</b></div><div class="row" style="gap:8px;align-items:center">${body}</div></div><button onclick="eqPick={hero:'${hero}',slot:'${slot}'};render()">Change</button></div>${pick}`; }).join('');
  return `<h4>Equipment</h4>${rows}`;
}
