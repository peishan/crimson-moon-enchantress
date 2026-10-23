/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — YAN'S TRAINING LEDGER (author's Volume 7 design, docs/YAN_TRAINING.md)
   Yan keeps his Wayfinder battle skills; the ledger is his herbalist / expedition progression on top. Each skill has a mentor and four stages:
   1 Introduction (story or mentor lesson) · 2 Practice (optional, repeated use) · 3 Field application (a quest or exploration) · 4 Proficiency (a challenge).
   Story events advance the ledger through LEDGER_CH (chapter -> [skill ids]); the Volume 7 chapters are not built, so it is empty. Optional practice advances stage 1 -> 2
   by use (gathering, hot meals). Everything is optional: nothing in the main story reads it. Starting values are the author's examples, not final data.
   ===================================================================== */
const LEDGER = [
  {id:'herbalism', n:'Herbalism', mentor:'xining', start:1, st:['Basic poultice recipe','More reliable preparation','Stronger field remedies and bandaging','Advanced recipe and medical-limits dialogue']},
  {id:'cooking', n:'Cooking', mentor:'xiyu', start:1, st:['A proper meal from available ingredients','Additional recipes','Longer-lasting provisions','Better recovery from camp meals']},
  {id:'campcraft', n:'Campcraft', mentor:'cangyuan', start:1, st:['A safe camp and equipment upkeep','More efficient camp preparation','Reduced supply waste','Extra camp interactions']},
  {id:'observation', n:'Observation', mentor:'dongyue', start:1, st:['Recording plant characteristics','Evidence versus guesswork','Improved identification','A more complete field journal']},
  {id:'wilderness', n:'Wilderness discipline', mentor:'xiaotian', start:0, st:['Preparing for dangerous terrain','Staying alert while travelling','Improved expedition readiness','Safer gathering in hazardous areas']},
  {id:'gathering', n:'Plant gathering', mentor:'yaxing', start:0, st:['Collecting common plants without harming the source','Better yields','Seasonal ingredients','Rare-plant collection']},
  {id:'travelprep', n:'Travel preparation', mentor:'hoko', start:0, st:['Organising a travel kit and reading routes','Better kits','Preparation for long journeys','Extra travel dialogue']},
];
const LEDGER_CH = {};   // chapter -> skill ids advanced by that story chapter (filled when Volume 7 settles)
const LEDGER_USE = {herbalism:3, cooking:3, gathering:3};   // uses of the skill needed to move stage 1 -> 2
const ledgerOn = () => !!G && G.party.includes('yanwatcher');
function LD(){ if(!G.ledger){ G.ledger = {}; LEDGER.forEach(s => G.ledger[s.id] = s.start); G.ledgerUse = {}; } return G.ledger; }
const ledgerStage = id => ledgerOn() ? (LD()[id] || 0) : 0;
function ledgerAdvance(id, n){
  const s = LEDGER.find(x => x.id === id); if(!s || !ledgerOn()) return [];
  const L = LD(), before = L[id]; L[id] = Math.min(4, before + (n||1)); if(L[id] === before) return [];
  save(); return ['📓 Yan\'s ledger: '+s.n+' '+L[id]+'/4 ('+s.st[L[id]-1]+').'];
}
function ledgerUse(id){   // optional practice: repeated use moves a skill from stage 1 to 2
  if(!ledgerOn() || !LEDGER_USE[id]) return [];
  const L = LD(); G.ledgerUse = G.ledgerUse || {}; G.ledgerUse[id] = (G.ledgerUse[id]||0) + 1;
  if(L[id] === 1 && G.ledgerUse[id] >= LEDGER_USE[id]) return ledgerAdvance(id, 1);
  return [];
}
function ledgerStory(n){ return (LEDGER_CH[n]||[]).flatMap(id => ledgerAdvance(id, 1)); }
function ledgerHtml(){
  const L = LD();
  return '<h4>📓 Yan\'s Training Ledger</h4><div class="sm">An optional progression: story scenes teach the basics and practice unlocks more. The main story never needs it.</div>' + LEDGER.map(s => {
    const v = L[s.id]||0, taught = v>0 ? '' : ' · not yet taught';
    return `<div class="ev" style="align-items:flex-start"><div style="flex:1"><b>${s.n}</b> <span class="sm">· ${first(s.mentor)}${taught} · ${v}/4</span>${bar(v,4,'bond')}<div class="sm">${v>0 ? '✔ '+s.st.slice(0,v).join(' · ') : s.st[0]}</div></div></div>`; }).join('');
}
