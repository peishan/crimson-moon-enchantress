/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XINING'S HERBALISM
   Xining (the physician) gathers herbs and compounds potions. Needs her in the party (and not away).
   GATHERING: a button opens a modal of places; each trip takes 2 hours of game TIME (not a day) and brings back a few herbs. Herbs that
     bloom at night come easier after dark (see rest.js for the clock).
   CRAFTING: Xining's herbal pouch is a modal. Click herbs in the pouch to put them in the mortar (up to 3), then Combine. A mixture that
     matches a recipe she knows (or has the skill to work out) becomes a potion; anything else changes nothing and costs nothing.
   LEVELS: Herbalism Lv 1-5 (Novice .. Sage) grows with gathering and compounding; each level opens recipes and improves yields.
   Save: G.herb = { xp, known:{recipeId:true}, gathered, made }
   Weapon crafting is NOT built (docs/COMPANIONS.md lists the open questions).
   ===================================================================== */
Object.assign(ITEMS, {
  frost_herb:{n:'Frost Herb',icon:'🌿',type:'herb'}, moon_petal:{n:'Moon Petal',icon:'🌸',type:'herb'},
  glacier_mint:{n:'Glacier Mint',icon:'🍃',type:'herb'}, plum_bud:{n:'Plum Bud',icon:'🌺',type:'herb'}, silverleaf:{n:'Silverleaf',icon:'🪴',type:'herb'},
  ember_root:{n:'Ember Root',icon:'🔥',type:'herb'}, night_lotus:{n:'Night Lotus',icon:'🪷',type:'herb'},
  cooling_draught:{n:'Cooling Draught',icon:'🧊',type:'consumable'}, mending_tea:{n:'Mending Tea',icon:'🍵',type:'consumable'},
  clear_spirit_tonic:{n:'Clear Spirit Tonic',icon:'💠',type:'consumable'}, warding_elixir:{n:'Warding Elixir',icon:'🛡️',type:'consumable'},
  sage_restorative:{n:'Sage\'s Restorative',icon:'✨',type:'consumable'},
});
Object.assign(USE, {
  cooling_draught:{hp:30, heat:40}, mending_tea:{hp:120}, clear_spirit_tonic:{mp:120, cleanse:true}, warding_elixir:{hp:100, cleanse:true}, sage_restorative:{hp:300, mp:80},
});

const HERB_LV_XP = [0, 6, 18, 40, 80], HERB_RANKS = ['Novice','Apprentice','Adept','Master','Sage'], GATHER_HOURS = 2;
const herbLv = () => HERB_LV_XP.reduce((l,x,i) => ((G.herb && G.herb.xp) || 0) >= x ? i+1 : l, 1);
const herbalOpen = () => isRecruited('xining');
const herbalReady = () => herbalOpen() && !isAway('xining');
function herbXp(n){ G.herb = G.herb || {xp:0, known:{}, gathered:0, made:0}; const b = herbLv(); G.herb.xp += n; return herbLv() > b ? ['✦ Xining\'s herbalism grows: '+HERB_RANKS[herbLv()-1]+' (Lv '+herbLv()+').'] : []; }

/* herbs: [id, weight, bloomsWhen]. Weights double for a herb whose "bloomsWhen" matches the current period. */
const GATHER_SPOTS = [
  {id:'gardens', n:'Muxue gardens', icon:'🌸', open:() => true, herbs:[['frost_herb',3],['plum_bud',2],['silverleaf',1],['moon_petal',2,'Night']]},
  {id:'forest', n:'Muxue Forest', icon:'🌲', open:() => G.ch >= 1, herbs:[['frost_herb',3],['silverleaf',2],['moon_petal',2,'Night']]},
  {id:'stream', n:'The Moonlit Stream', icon:'💧', open:() => G.ch >= 6, herbs:[['glacier_mint',3],['frost_herb',2],['night_lotus',1,'Night']]},
  {id:'chambers', n:'The Hidden Chambers', icon:'🗝️', open:() => G.ch >= 15, herbs:[['ember_root',3],['silverleaf',2],['glacier_mint',1]]},
  {id:'rift', n:'The Rift Waters', icon:'🌀', open:() => G.ch >= 16, herbs:[['night_lotus',2,'Night'],['glacier_mint',2],['ember_root',1]]},
  {id:'temple', n:'The Ice Temple\'s inner gardens', icon:'❄️', open:() => G.ch >= 18, herbs:[['glacier_mint',3],['frost_herb',2],['night_lotus',1,'Night']]},
  {id:'lantern_road', n:'Red Lantern roadside', icon:'🏮', open:() => G.ch >= 54, herbs:[['plum_bud',3],['ember_root',2],['silverleaf',2]]},
  {id:'songxia', n:'Songxia hillside', icon:'⛰️', open:() => G.ch >= 92, herbs:[['silverleaf',3],['plum_bud',2],['ember_root',2],['night_lotus',1,'Night']]},
];
/* recipes: exactly these herbs (any order, up to 3 slots). start = Xining already knows it. lv = Herbalism level needed to make it. */
const HERB_RECIPES = [
  {out:'herbal_tonic',       herbs:['frost_herb','frost_herb','frost_herb'],     lv:1, start:true},
  {out:'moonlit_tonic',      herbs:['moon_petal','moon_petal','frost_herb'],      lv:1, start:true},
  {out:'cooling_draught',    herbs:['glacier_mint','glacier_mint','frost_herb'],  lv:1, start:true},
  {out:'mending_tea',        herbs:['silverleaf','silverleaf','plum_bud'],        lv:2},
  {out:'spirit_draught',     herbs:['night_lotus','moon_petal','glacier_mint'],   lv:2},
  {out:'clear_spirit_tonic', herbs:['night_lotus','night_lotus','silverleaf'],    lv:3},
  {out:'warding_elixir',     herbs:['ember_root','silverleaf','frost_herb'],      lv:3},
  {out:'sage_restorative',   herbs:['night_lotus','plum_bud','ember_root'],       lv:4},
];
const recipeKey = list => list.slice().sort().join('+');
const recipeKnown = r => !!r.start || !!(G.herb && G.herb.known && G.herb.known[r.out]);
const herbCount = id => G.inv[id] || 0;
const pouch = () => Object.keys(ITEMS).filter(k => ITEMS[k].type === 'herb');

/* ---------- gathering ---------- */
function gatherAt(spotId){
  const s = GATHER_SPOTS.find(x => x.id === spotId); if(!s || !s.open()) return null;
  if(!herbalReady()) return {msgs:['Xining must be with the party to gather.'], got:[]};
  const lv = herbLv(), n = 2 + (lv >= 3 ? 1 : 0) + rint([0,1]), per = periodOf(G.time === undefined ? 8 : G.time)[1];
  const table = s.herbs.map(([id,w,when]) => [id, w * (when && when === per ? 2 : 1)]), total = table.reduce((a,[,w]) => a + w, 0), got = {};
  for(let i = 0; i < n; i++){ let r = Math.random()*total; for(const [id,w] of table){ r -= w; if(r <= 0){ got[id] = (got[id]||0) + 1; break; } } }
  addItems(Object.keys(got).map(id => ({id, qty:got[id]})));
  advanceTime(GATHER_HOURS); G.herb = G.herb || {xp:0, known:{}, gathered:0, made:0}; G.herb.gathered++; if(typeof ledgerUse==='function'){ ledgerUse('gathering'); ledgerUse('herbalism'); }
  const msgs = ['🌿 Xining gathers at '+s.n+': '+Object.keys(got).map(id => ITEMS[id].icon+' '+ITEMS[id].n+' ×'+got[id]).join(', ')+'. ('+GATHER_HOURS+' hours pass: '+timeLabel()+')'].concat(herbXp(1));
  save(); return {msgs, got};
}

/* ---------- compounding ---------- */
let HM = null;   // the open modal: {mode:'gather'|'pouch', mortar:[], result:[]}
function openHerbModal(mode){ HM = {mode, mortar:[], result:[]}; drawHerbModal(); }
function closeHerbModal(){ HM = null; drawHerbModal(); render(); }
function mortarAdd(id){ if(!HM || HM.mortar.length >= 3) return; const used = HM.mortar.filter(x => x === id).length; if(used >= herbCount(id)) return; HM.mortar.push(id); HM.result = []; drawHerbModal(); }
function mortarRemove(i){ if(!HM) return; HM.mortar.splice(i,1); HM.result = []; drawHerbModal(); }
function mortarFill(out){   // clicking a known recipe in the book fills the mortar if the pouch can cover it
  const r = HERB_RECIPES.find(x => x.out === out); if(!r || !recipeKnown(r)) return;
  const need = {}; r.herbs.forEach(h => need[h] = (need[h]||0) + 1);
  if(!Object.keys(need).every(h => herbCount(h) >= need[h])){ HM.result = ['The pouch does not hold enough for this recipe.']; drawHerbModal(); return; }
  HM.mortar = r.herbs.slice(); HM.result = []; drawHerbModal();
}
function combineHerbs(){
  if(!HM || !HM.mortar.length) return;
  if(!herbalReady()){ HM.result = ['Xining must be with the party.']; drawHerbModal(); return; }
  const key = recipeKey(HM.mortar), r = HERB_RECIPES.find(x => recipeKey(x.herbs) === key);
  if(!r){ HM.result = ['🫖 Xining sniffs the mixture and shakes her head: it would do nothing useful. Nothing is used up.']; drawHerbModal(); return; }
  if(herbLv() < r.lv){ HM.result = ['Xining frowns at the mixture. "There is something here, but I am not skilled enough to work it yet." (needs Herbalism Lv '+r.lv+'; nothing is used up)']; drawHerbModal(); return; }
  HM.mortar.forEach(h => { G.inv[h]--; });
  const first = !recipeKnown(r), extra = Math.random() < .05*(herbLv()-1) ? 1 : 0;
  G.herb = G.herb || {xp:0, known:{}, gathered:0, made:0}; G.herb.known[r.out] = true; G.herb.made++;
  addItems([{id:r.out, qty:1 + extra}]);
  HM.result = ['⚗️ '+(first ? 'A new recipe! ' : '')+'Xining compounds '+ITEMS[r.out].icon+' '+ITEMS[r.out].n+(extra ? ' ×2 (a good batch)' : '')+'.'].concat(herbXp(first ? 8 : 3));
  HM.mortar = []; save(); drawHerbModal();
}

/* ---------- modal ---------- */
function drawHerbModal(){
  const el = $('modal'); if(!el) return;
  if(!HM){ el.classList.remove('on'); el.innerHTML = ''; return; }
  el.classList.add('on');
  const lv = herbLv(), rank = HERB_RANKS[lv-1], head = `<div class="mh"><b>${HM.mode === 'gather' ? '🌿 Gather herbs' : '🧪 Xining\'s herbal pouch'}</b><span class="sm">Herbalism Lv ${lv} · ${rank}</span><button onclick="closeHerbModal()" aria-label="Close">✕</button></div>`;
  let body = '';
  if(!herbalReady()){ body = '<div class="sm">Xining must be with the party for any herbalism.</div>'; }
  else if(HM.mode === 'gather'){
    const per = periodOf(G.time === undefined ? 8 : G.time), spots = GATHER_SPOTS.filter(s => s.open()).map(s => {
      const night = s.herbs.some(h => h[2]), hint = night ? ' · night blooms' : '';
      return `<div class="card" style="cursor:default"><span class="big">${s.icon}</span><div class="fl"><b>${s.n}</b><div class="sm">${s.herbs.map(h => ITEMS[h[0]].icon+' '+ITEMS[h[0]].n).join(', ')}${hint}</div></div><button class="pri" onclick="HM.result=(gatherAt('${s.id}')||{msgs:[]}).msgs;drawHerbModal()">Gather</button></div>`; }).join('');
    body = `<div class="sm">It is ${per[2]} ${per[1]}. Each trip takes ${GATHER_HOURS} hours (the day does not change). Herbs that bloom at night come easier after dark.</div>${spots}`;
  } else {
    const have = pouch().filter(id => herbCount(id) > 0 || HM.mortar.includes(id));
    const slots = [0,1,2].map(i => HM.mortar[i] ? `<button class="slot-h on" onclick="mortarRemove(${i})" title="Take it out">${ITEMS[HM.mortar[i]].icon}</button>` : `<span class="slot-h">·</span>`).join('');
    const herbs = have.length ? have.map(id => { const left = herbCount(id) - HM.mortar.filter(x => x === id).length;
      return `<button class="herb" ${left>0&&HM.mortar.length<3?'':'disabled'} onclick="mortarAdd('${id}')"><span>${ITEMS[id].icon}</span><b>${ITEMS[id].n}</b><i>×${left}</i></button>`; }).join('') : '<div class="sm">The pouch is empty. Gather some herbs first.</div>';
    const book = HERB_RECIPES.map(r => { const k = recipeKnown(r), can = lv >= r.lv;
      if(k) return `<div class="ev"><div><b>${ITEMS[r.out].icon} ${ITEMS[r.out].n}</b><div class="sm">${r.herbs.map(h => ITEMS[h].icon).join(' + ')} · ${useText(USE[r.out]||{})}</div></div><button onclick="mortarFill('${r.out}')">Use</button></div>`;
      return `<div class="ev"><div><b>❔ Unknown recipe</b><div class="sm">${can ? 'Xining could work it out: try combining something with '+ITEMS[r.herbs[0]].icon+' '+ITEMS[r.herbs[0]].n : 'Herbalism Lv '+r.lv+' needed'}</div></div></div>`; }).join('');
    body = `<div class="sm">Click herbs to put them in the mortar (up to 3), then combine them. A mixture that does nothing costs nothing.</div>
      <div class="mortar">${slots}</div><div><button class="pri" ${HM.mortar.length?'':'disabled'} onclick="combineHerbs()">⚗️ Combine</button><button ${HM.mortar.length?'':'disabled'} onclick="HM.mortar=[];HM.result=[];drawHerbModal()">Clear</button></div>
      <h4>Herbal pouch</h4><div class="herbs">${herbs}</div><h4>Recipes (click to use)</h4>${book}`;
  }
  const res = HM.result.length ? `<div class="panel good" style="margin:8px 0">${HM.result.map(m => `<div>${m}</div>`).join('')}</div>` : '';
  el.innerHTML = `<div class="mbox">${head}${res}<div class="mb">${body}</div></div>`;
}

/* ---------- the Herbalism tab ---------- */
function rHerbalism(){
  if(!herbalOpen()) return '<h2>Herbalism</h2><div class="sm">🔒 Xining\'s herbalism opens when she joins the party.</div>';
  const lv = herbLv(), xp = (G.herb && G.herb.xp) || 0, next = HERB_LV_XP[lv], pots = Object.keys(USE).filter(k => (G.inv[k]||0) > 0).map(k => ITEMS[k].icon+' '+ITEMS[k].n+' ×'+G.inv[k]).join(' · ');
  const herbs = pouch().filter(id => herbCount(id) > 0).map(id => ITEMS[id].icon+' '+ITEMS[id].n+' ×'+herbCount(id)).join(' · ');
  return `<h2>Herbalism</h2>${flashHtml()}<div class="sm">${timeLabel()} · Day ${G.day}. Xining gathers herbs and compounds potions. Gathering takes hours, not days.</div>
   <div class="panel"><b>🌿 Xining · ${HERB_RANKS[lv-1]} (Lv ${lv})</b>${next ? `<div class="sm">${xp}/${next} to the next rank</div>${bar(xp - HERB_LV_XP[lv-1], next - HERB_LV_XP[lv-1],'bond')}` : '<div class="sm">The highest rank.</div>'}
     <div class="sm" style="margin-top:6px">${isAway('xining') ? 'Xining is away.' : 'Gathered '+((G.herb&&G.herb.gathered)||0)+' times · '+((G.herb&&G.herb.made)||0)+' potions compounded.'}</div>
     <button class="pri" ${herbalReady()?'':'disabled'} onclick="openHerbModal('gather')">🌿 Gather herbs</button><button ${herbalReady()?'':'disabled'} onclick="openHerbModal('pouch')">🧪 Xining's herbal pouch</button></div>
   <div class="sm"><b>Herbs:</b> ${herbs || 'none'}</div><div class="sm"><b>Potions:</b> ${pots || 'none'}</div>
   <div class="sm" style="margin-top:8px">Potions are used from the Items tab or in battle. Each rank opens more recipes and bigger hauls. Weapon crafting is not part of the game yet.</div>`;
}
