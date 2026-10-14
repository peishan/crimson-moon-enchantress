/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CORE: state, save, party gates, progression
   ===================================================================== */
const CFG = { SAVE_KEY:'crimson_moon_v1', START_LEVEL:1 };

/* ---------- PARTY GATES (see docs/CHAPTER_GATES.md) ----------
   JOIN_CH   chapter whose completion puts the hero in the party (from the game script).
   INTRO_CH  chapter from which the hero's profile is visible before joining.
   A hero who joins starts at (average party level - 1), never below 1.
   Muxue Yan appears in ch17, has not joined as of comic 022, and is planned to join at ch30 (not playable yet: the game scripts stop at ch20). */
const JOIN_CH  = { xiyu:1, dongyue:11, xiaotian:14, yaxing:15, yan:30 };   // yan: planned (028 crisis, 029 "The Price of Love" recruitment arc, joins on completing 030); scripts for 021+ not in the game yet   // ya'xing: ch15 confirmed by the author
const INTRO_CH = { xiyu:1, dongyue:2, yaxing:2, xiaotian:2, yan:17 };
const NO_JOIN_YET = {};

/* ---------- CHAPTER LEVEL GATES (Crimson Tide style: gate:{type:'level', value, label}) ----------
   Milestone chapters stay locked until the party's AVERAGE level reaches a target: every recruitment
   chapter, the battle chapter, and the ch20 milestone. Target = round(chapter x GATE_RATIO). Completed chapters never lock. */
const GATE_RATIO = 1;   // gate = chapter number: "reach an average party level equal to the chapter"
const GATE_CHAPTERS = [11, 13, 14, 15, 20, 30, 39];   // 30 = Yan joins (planned), 39 = Volume 1 finale (planned)

/* ---------- THE LEVEL CURVE: Volume 1 = 39 comic chapters, spread evenly over levels ----------
   Story XP is set so a player who only reads the story is level (1 + chapters done): Lv 40 when Volume 1 ends at ch 39.
   STORY_PACE = levels gained per chapter (1 = one level per chapter). Wilds/Temple hunting is the optional way to get ahead. */
const VOLUME1_CHAPTERS = 39;
const STORY_PACE = 1;

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const rint = r => r[0] + Math.floor(Math.random()*(r[1]-r[0]+1));

function newState(){
  const s = { v:1, ch:0, flags:{}, units:{}, party:['xiyu'], active:['xiyu'], inv:{}, bestiary:{}, gold:50, read:{}, day:1, bondDay:{}, zone:'forest', wins:0, temple:{found:{}} };
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0 });
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.temple = G.temple || {found:{}};
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0 }; });
    G.active = (G.active||['xiyu']).filter(id => G.party.includes(id));
    return true;
  }catch(e){ return false; }
}
const U = id => G.units[id];
const isRecruited = id => G.party.includes(id);
const profileKnown = id => isRecruited(id) || (INTRO_CH[id]!==undefined && G.ch >= INTRO_CH[id]);
const portrait = id => 'assets/party/'+id+'.webp';

/* ---------- chapter level gates ---------- */
function gateLv(){   // mean level of the real party members
  return G.party.length ? Math.round(G.party.reduce((a,id) => a + U(id).lv, 0)/G.party.length) : 1;
}
const chapterGate = n => GATE_CHAPTERS.includes(n) ? { lv:Math.max(1, Math.round(n*GATE_RATIO)) } : null;
function chapterLevelLock(n){   // '' when open
  if(!G || n <= G.ch) return '';
  const g = chapterGate(n); if(!g) return '';
  const now = gateLv();
  return now >= g.lv ? '' : '🔒 Average party level '+g.lv+' needed (now '+now+')';
}

/* ---------- levels & stats ---------- */
/* Per-class XP tables: xp to next level = a + b*lv + c*lv^2. The same XP therefore gives different levels per class:
   martial fighters climb a little faster, support and casters a little slower, the ancient sage slowest (from Tribute). */
const XP_TABLES = {
  standard:{a:40, b:22, c:1.2},
  fighter:{a:36, b:20, c:1.1},     // Xiao Tian: martial striker
  ranger:{a:38, b:21, c:1.15},     // Ya'Xing: scout / archer
  support:{a:44, b:24, c:1.3},     // Dongyue: battle cleric
  scholar:{a:46, b:25, c:1.35},    // Yan: ancient sage
};
const XP_CLASS = { xiyu:'standard', dongyue:'support', yaxing:'ranger', xiaotian:'fighter', yan:'scholar' };
const xpToNext = (lv, id) => { const t = XP_TABLES[XP_CLASS[id] || 'standard']; return Math.round(t.a + lv*t.b + lv*lv*t.c); };
/* Story XP for chapter n on the standard curve, so the story-only level after n chapters is 1 + n*STORY_PACE (continuous cumulative curve). */
const cumXp = L => 40*(L-1) + 11*(L-1)*L + .2*(L-1)*L*(2*L-1);
const storyXp = n => Math.max(1, Math.round(cumXp(1 + n*STORY_PACE) - cumXp(1 + (n-1)*STORY_PACE)));
/* Level a joining hero arrives at, relative to the party average. Everyone arrives one level behind; Muxue Yan (an ancient sage whose power
   is returning) arrives AT the average, with his own skills gated higher so his power comes back as the party levels. */
const JOIN_LEVEL_OFFSET = { yan:0 };
const joinLevel = id => Math.max(1, avgPartyLv() + (JOIN_LEVEL_OFFSET[id]!==undefined ? JOIN_LEVEL_OFFSET[id] : -1));
const bondMult = id => 1 + .02*bondLevel(id);
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, bm = bondMult(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * bm); });
  return out;
}
function gainXp(amount, ids){
  const msgs = [];
  (ids || G.party).forEach(id => {
    const u = U(id); u.xp += amount;
    while(u.xp >= xpToNext(u.lv, id)){
      u.xp -= xpToNext(u.lv, id); u.lv++;
      msgs.push(CHARACTERS[id].n+' reached Lv'+u.lv+'!');
      skillsOf(id).filter(s => s.req && s.req.lvl === u.lv && reqMet(id, s.req)).forEach(s => msgs.push('  ✦ New skill: '+s.n));
    }
  });
  return msgs;
}

/* ---------- skills & level gates ---------- */
function reqText(r){
  if(!r) return '';
  const parts = [];
  if(r.lvl) parts.push('Level '+r.lvl);
  if(r.flag) parts.push('Story: '+(FLAG_LABEL[r.flag]||r.flag));
  return parts.join(' + ');
}
function reqMet(id, r){
  if(!r) return true;
  if(r.lvl && U(id).lv < r.lvl) return false;
  if(r.flag && !G.flags[r.flag]) return false;
  return true;
}
const skillsOf = id => CHARACTERS[id].skills.map(s => Object.assign({}, s, { ok:reqMet(id,s.req), why:reqText(s.req) }));

/* ---------- bond (with Xiyu) ---------- */
function bondLevel(id){
  if(!G || !U(id)) return 0;
  if(id==='xiyu'){ const o = G.party.filter(x => x!=='xiyu'); return o.length ? Math.floor(o.reduce((a,x) => a + bondLevel(x), 0)/o.length) : 0; }
  let l = 0; BOND_LEVELS.forEach((need,i) => { if(U(id).bp >= need) l = i; });
  return l;
}
function addBond(id, pts){
  if(id==='xiyu' || !isRecruited(id)) return null;
  const before = bondLevel(id); U(id).bp += pts;
  return bondLevel(id) > before ? CHARACTERS[id].n+' reached Bond '+bondLevel(id)+'!' : null;
}

/* ---------- recruiting ---------- */
const ACTIVE_SLOTS = 4;
const activeCount = () => G.active.length;
function recruit(id){
  if(G.party.includes(id)) return false;
  G.party.push(id);
  if(activeCount() < ACTIVE_SLOTS) G.active.push(id);
  return true;
}
function toggleActive(id){
  if(id==='xiyu') return;
  const i = G.active.indexOf(id);
  if(i>=0) G.active.splice(i,1); else if(activeCount() < ACTIVE_SLOTS) G.active.push(id);
  save();
}
const recruitsAtChapter = ch => Object.keys(JOIN_CH).filter(id => JOIN_CH[id] === ch);
const avgPartyLv = () => gateLv();

/* ---------- HP / MP persist between real battles ---------- */
const curHp = id => { const m = statsOf(id).hp, v = U(id).hp; return v===undefined ? m : clamp(v,0,m); };
const curMp = id => { const m = statsOf(id).mp, v = U(id).mp; return v===undefined ? m : clamp(v,0,m); };
function healUnit(id, hp, mp){ const s = statsOf(id); U(id).hp = clamp(curHp(id)+(hp||0), 0, s.hp); U(id).mp = clamp(curMp(id)+(mp||0), 0, s.mp); }
function restoreParty(){ G.party.forEach(id => { U(id).hp = undefined; U(id).mp = undefined; }); }
function persistBattle(){
  if(!B || !B.spec.rewards) return;
  B.allies.forEach(a => { const u = U(a.id); if(!u || !G.party.includes(a.id)) return; u.hp = a.dead ? Math.max(1, Math.round(a.mhp*.2)) : a.hp; u.mp = a.mp; });
}
const REST_COST = () => 10 + avgPartyLv()*2;
function restAtInn(){
  const c = REST_COST(); if(G.gold < c) return ['A bed at the Crimson Fairy costs '+c+' gold.'];
  G.gold -= c; G.day++; restoreParty(); save();
  return ['🛏️ The party sleeps beneath the eight moons. HP and MP fully restored. (-'+c+'g)'];
}
