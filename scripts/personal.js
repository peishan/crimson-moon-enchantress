/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — COMPANIONS: MISSION ROLES, PERSONAL QUESTS, FIELD PROFICIENCY
   First user: XIAO TIAN (Feng Xia). Adapted from Yang Tian in Tribute, but with his own progression: his power does not return all at once and
   recovering memories never replaces who he is now.
   - MISSION ROLES: what each companion contributes to the team (shown in the Confidants tab).
   - PERSONAL QUESTS: separate from the story and the boards. Leads are tracked separately and only record what the pages have shown.
   - FIELD PROFICIENCY (Xiao Tian): grows with rewarded victories fought with him; each level makes scouting pay a little better (+4% gold, max level 5).
   - SHARED DANGER: fighting side by side slowly builds trust and understanding between companions, up to the "Growing trust" stage (40).
   Save: G.xt = {wins}, G.shared = { 'a|b': winsTogether }
   ===================================================================== */
const ROLES = [
  {id:'xiyu',     role:'Magical analysis',            text:'Detects abnormal crimson energy and magical interference, and decides whether dangerous magic should be touched or left alone.'},
  {id:'dongyue',  role:'Healing and stabilization',   text:'Stabilizes the injured and reads the state of spiritual channels without disturbing the formation.'},
  {id:'cangyuan', role:'Formation analysis',          text:'Uses Spirit Weaving to interpret patterns, compare records and manipulate spiritual structures when it is safe.'},
  {id:'xining',   role:'Medical and historical support', text:'Recognizes physical and spiritual symptoms, keeps the party functional, and reads what a formation\'s effects mean for those caught in it.'},
  {id:'xiaotian', role:'Fieldwork and tactical support', text:'Scouts ahead, checks physical passages, protects the others and notices details that specialists in spiritual energy overlook.'},
];
const FIELD_RANKS = ['Green','Steady','Sharp','Seasoned','Veteran','Pathfinder'], FIELD_MAX = 5, FIELD_WINS = 10;
const fieldLv = () => Math.min(FIELD_MAX, Math.floor(((G.xt && G.xt.wins) || 0) / FIELD_WINS));
const fieldGoldMult = allies => (allies || []).some(a => a.id === 'xiaotian') ? 1 + .04*fieldLv() : 1;
function personalOnWin(ids){   // called by battle.js after a rewarded victory
  G.xt = G.xt || {wins:0}; G.shared = G.shared || {};
  if(ids.includes('xiaotian')) G.xt.wins++;
  for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++){
    const k = relKey(ids[i], ids[j]); G.shared[k] = (G.shared[k]||0) + 1;
    if(G.shared[k] % 5 === 0){ const r = relGet(ids[i], ids[j]); if(r.t < 40) relAdd(ids[i], ids[j], {t:1, u:r.u < 40 ? 1 : 0}); }
  }
}

/* ---------- Xiao Tian's memory fragments: only the three the pages have shown (comic 036). More surface when a clue triggers recognition:
   add an entry with the hook that unlocks it. A fragment is a short journal scene; it does not restore his old personality. ---------- */
const XT_FRAGMENTS = [
  {id:'mountain', hook:'xiao_tian_was_swordsman', title:'The Mountain Practice', comic:'036', text:'He was a swordsman, practising in the mountains among his martial brothers.'},
  {id:'masks', hook:'masked_assassins_identity_revealed', title:'The Masked Invaders', comic:'036', text:'Black-clad invaders with gold details and iron masks, buckled in gold, killed his master and his martial brothers over gold.'},
  {id:'torment', hook:'xiao_tian_captured_and_tortured', title:'The Bull Demons\' Torment', comic:'036', text:'Starved, fed poisoned food, dosed with the poisons of the Xuancang Mountains and cut with small knives infused with demonic energy. Part of his memory came back afterwards, and the rest stays blurred.'},
];
/* Leads are tracked separately; nothing links any of them to the seal or to each other unless a page does. */
const XT_LEADS = [
  {id:'dream',  t:'The woman in his dreams', hook:'xiao_tian_mother_dream_seen', clue:'He dreams of a woman in grey who calls him "son".', state:'She is not identified.'},
  {id:'masks',  t:'Avenge his master and martial brothers', hook:'masked_assassins_identity_revealed', clue:'Black-clad, gold-trimmed assassins in iron masks with golden buckles killed his master and his martial brothers over gold. He wants to avenge them, and first he must get stronger.', state:'Their identity and purpose are unknown. No connection to the seal is established.'},
];
const personalOpen = () => G.ch >= 36 && isRecruited('xiaotian');

function rolesHtml(){
  const rows = ROLES.filter(r => isRecruited(r.id)).map(r => `<div class="li"><b>${CHARACTERS[r.id].icon} ${first(r.id)}</b> · ${r.role}<div class="sm">${r.text}</div></div>`).join('');
  return rows ? `<h4>Mission roles</h4><div class="sm">Everyone contributes something different. No one is equally skilled at everything.</div>${rows}` : '';
}
function xiaoTianHtml(){
  if(!personalOpen()) return '';
  const frags = XT_FRAGMENTS.filter(f => hook(f.hook)), leads = XT_LEADS.filter(l => hook(l.hook)), lv = fieldLv(), wins = (G.xt && G.xt.wins) || 0;
  const next = lv < FIELD_MAX ? (FIELD_WINS - wins % FIELD_WINS)+' more victories with him to the next rank' : 'the highest rank';
  const hurt = hook('xiao_tian_recovery_incomplete') ? '<div class="sm">His recovery is incomplete: pain, allergies and the odd burst of laughter remain.</div>' : '';
  return `<div class="panel"><h3>🍃 Xiao Tian · The Lost Swordsman</h3>
    <div class="sm">Dongyue's sworn younger brother. Under the childish amnesiac he is now, he was Feng Xia, a tough, mature swordsman. His strength is not coming back all at once, and getting his memories back will not turn him back into who he was.</div>${hurt}
    <h4 style="margin:8px 0 2px">Leads</h4>${leads.map(l => `<div class="li">○ <b>${l.t}</b><div class="sm">${l.clue}</div><div class="sm" style="color:#9aa">${l.state}</div></div>`).join('') || '<div class="sm">No leads yet.</div>'}
    <h4 style="margin:8px 0 2px">Memory fragments (${frags.length})</h4>${frags.map(f => `<div class="li">✦ <b>${f.title}</b> <span class="sm">· comic ${f.comic}</span><div class="sm">${f.text}</div></div>`).join('')}
    <div class="sm">More surface when a clue triggers recognition.</div>
    <h4 style="margin:8px 0 2px">Field proficiency · ${FIELD_RANKS[lv]}</h4><div class="sm">Fieldwork and scouting: +${4*lv}% gold while he fights beside you. ${next}.</div>${bar(wins % FIELD_WINS + (lv >= FIELD_MAX ? FIELD_WINS : 0), FIELD_WINS, 'bond')}</div>`;
}
const personalHtml = () => rolesHtml() + xiaoTianHtml();
