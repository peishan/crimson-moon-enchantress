/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CORE: state, save, party gates, progression
   ===================================================================== */
const CFG = { SAVE_KEY:'crimson_moon_v1', START_LEVEL:1 };

/* ---------- PARTY GATES (see docs/CHAPTER_GATES.md) ----------
   JOIN_CH   chapter whose completion puts the hero in the party (from the game script).
   INTRO_CH  chapter from which the hero's profile is visible before joining.
   A hero who joins starts at (average party level - 1), never below 1.
   Muxue Yan appears in ch17 and is present at the Ice Temple through the Volume 1 finale (ch34, ch39) but never travels with the party: no join chapter in Volume 1. */
const JOIN_CH  = { xiyu:1, dongyue:11, xiaotian:14, yaxing:15, cangyuan:46, xining:53 };   // Volume 2: cangyuan = V2 comic 007, xining = V2 comic 014 (author)   // ya'xing: ch15 confirmed by the author. Yan does NOT join in Volume 1 (scripts 021-039: he stays at the Ice Temple)   // ya'xing: ch15 confirmed by the author
const INTRO_CH = { xiyu:1, dongyue:2, yaxing:2, xiaotian:2, yan:17, cangyuan:41 };   // cangyuan first appears in V2 comic 002
const NO_JOIN_YET = { yan:'Not joinable in Volume 1: he stays at the Ice Temple (ch39). His role in Volume 2 is not written yet.' };

/* ---------- CHAPTER LEVEL GATES (Crimson Tide style: gate:{type:'level', value, label}) ----------
   Milestone chapters stay locked until the party's AVERAGE level reaches a target: every recruitment
   chapter, the battle chapter, and the ch20 milestone. Target = round(chapter x GATE_RATIO). Completed chapters never lock. */
const GATE_RATIO = 1;   // gate = chapter number: "reach an average party level equal to the chapter"
const GATE_CHAPTERS = [11, 13, 14, 15, 20, 39, 46, 53, 54];   // 53 = Xining joins, 54 = the first bounty   // recruitment chapters, the battle chapter, the ch20 milestone and the Volume 1 finale

/* ---------- THE LEVEL CURVE: Volume 1 = 39 comic chapters, spread evenly over levels ----------
   Story XP is set so a player who only reads the story is level (1 + chapters done): Lv 40 when Volume 1 ends at ch 39.
   STORY_PACE = levels gained per chapter (1 = one level per chapter). Wilds/Temple hunting is the optional way to get ahead. */
const VOLUME1_CHAPTERS = 39;
/* VOLUME 2 uses internal chapter numbers 40+ so the level curve, gates, hooks and saves just keep counting: Vol 2 comic 001 = chapter 40.
   Art: assets/comics/v2/chNN.webp (NN = the Volume 2 comic number). Built so far: V2 comics 001-009 and 015 (010-014 are placeholders so the story can reach 015). */
const VOL2_START = 40, LAST_CHAPTER = 61;
const volOf = n => n >= VOL2_START ? 2 : 1;
const vnum = n => n >= VOL2_START ? n - (VOL2_START-1) : n;
const chName = n => volOf(n)===2 ? 'Volume 2 · Chapter '+vnum(n) : 'Chapter '+n;
const chShort = n => volOf(n)===2 ? 'V2·'+vnum(n) : 'Ch.'+n;
const STORY_PACE = 1;

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const rint = r => r[0] + Math.floor(Math.random()*(r[1]-r[0]+1));

function newState(){
  const s = { v:1, ch:0, flags:{}, units:{}, party:['xiyu'], active:['xiyu'], inv:{}, bestiary:{}, gold:50, read:{}, day:1, bondDay:{}, zone:'forest', wins:0, temple:{found:{}}, ritual:{left:null, done:false}, away:{}, hooks:{}, heat:0, attune:0, afterglow:0, resonance:0, bounty:{red:{stage:0}, rep:{day:0, done:[]}, count:0}, quest:{ward:{}}, rel:{}, convo:{}, board:{active:[], list:{day:0, items:[]}, bounties:{day:0, list:[]}, done:0, renown:0} };
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0 });
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.temple = G.temple || {found:{}}; G.ritual = G.ritual || {left:null, done:false}; G.away = G.away || {}; G.hooks = G.hooks || {}; G.bounty = G.bounty || {red:{stage:0}, rep:{day:0, done:[]}, count:0}; G.quest = G.quest || {ward:{}}; G.rel = G.rel || {}; G.convo = G.convo || {}; G.board = G.board || {active:[], list:{day:0, items:[]}, bounties:{day:0, list:[]}, done:0, renown:0}; G.resonance = G.resonance || 0; G.heat = G.heat || 0; G.attune = G.attune || 0; G.afterglow = G.afterglow || 0;
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0 }; });
    G.active = (G.active||['xiyu']).filter(id => G.party.includes(id) && !G.away[id]);
    return true;
  }catch(e){ return false; }
}
const U = id => G.units[id];
const isRecruited = id => G.party.includes(id);
const profileKnown = id => isRecruited(id) || (INTRO_CH[id]!==undefined && G.ch >= INTRO_CH[id]);
/* Portraits: a story variant is used once its hook has fired; a missing variant file falls back to the base portrait (see index.html).
   assets/party/xiyu_unveiled.webp (veil removed, ch33) · xiyu_wed.webp and dongyue_wed.webp (after the wedding, ch35) · yaxing_injured.webp (after ch36). */
function portraitVariant(id){
  if(!G || !G.hooks) return '';
  if(id==='xiyu') return hook('dongyue_vows_lifelong_devotion') ? '_wed' : hook('xiyu_veil_removed') ? '_unveiled' : '';
  if(id==='dongyue') return hook('dongyue_vows_lifelong_devotion') ? '_wed' : '';
  if(id==='yaxing') return hook('ya_xing_bull_demon_injuries_revealed') ? '_injured' : '';
  return '';
}
const portrait = id => 'assets/party/'+id+portraitVariant(id)+'.webp';

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
const XP_CLASS = { xiyu:'standard', dongyue:'support', yaxing:'ranger', xiaotian:'fighter', yan:'scholar', cangyuan:'scholar', xining:'support' };
const xpToNext = (lv, id) => { const t = XP_TABLES[XP_CLASS[id] || 'standard']; return Math.round(t.a + lv*t.b + lv*lv*t.c); };
/* Story XP for chapter n on the standard curve, so the story-only level after n chapters is 1 + n*STORY_PACE (continuous cumulative curve). */
const cumXp = L => 40*(L-1) + 11*(L-1)*L + .2*(L-1)*L*(2*L-1);
const storyXp = n => Math.max(1, Math.round(cumXp(1 + n*STORY_PACE) - cumXp(1 + (n-1)*STORY_PACE)));
/* Level a joining hero arrives at, relative to the party average. Everyone arrives one level behind; Muxue Yan (an ancient sage whose power
   is returning) arrives AT the average, with his own skills gated higher so his power comes back as the party levels. */
const JOIN_LEVEL_OFFSET = { yan:0 };
const joinLevel = id => Math.max(1, avgPartyLv() + (JOIN_LEVEL_OFFSET[id]!==undefined ? JOIN_LEVEL_OFFSET[id] : -1));
const bondMult = id => 1 + .02*bondLevel(id);
/* ---------- THE CURSE (Moon-Heat) and ATTUNEMENT ----------
   Xiyu's magic builds Heat (0-100) as she casts. High Heat dulls her magic (up to -30% MAG). Resting at the inn cools 40.
   After the ritual and the wedding (hook dongyue_vows_lifelong_devotion, ch35) Dongyue can share the Moonlit Bonding once per day:
   Heat clears, Attunement rises (max 10), and Xiyu keeps a short Afterglow. Attunement is permanent: +2% MAG, +3% MP and -5% Heat gain per level,
   and it opens the bond skills. Intimacy is never shown: the game says only that he stays beside her through the night. */
const ATTUNE_MAX = 10;
const heatMult = h => 1 - clamp(((h||0)-40)/60, 0, 1)*.3;
const heatLabel = h => h>=80 ? 'Burning' : h>=50 ? 'Flushed' : h>=20 ? 'Warm' : 'Calm';
/* ---------- CRIMSON THREAD RESONANCE (Xiyu x Cangyuan, Volume 2) — see docs/BOND_SYSTEM.md ----------
   Intimacy, dual cultivation, a spiritual bond and marriage are four different things. Only dual cultivation and the resulting resonance are mechanics here
   (intimacy is never shown or tracked). It is VOLUNTARY: it opens only when the story has Xiyu choose it (flag xiyu_chooses_cangyuan; no chapter sets it yet,
   the Dev tab does), needs both of them, and can be done once a day. It is NOT a soul bond, not marriage, and it cannot force anyone to stay. */
const RES_MAX = 5;
const resLv = () => G.resonance||0;
const dualCultivationOpen = () => !!(G.flags && G.flags.xiyu_chooses_cangyuan) && G.party.includes('cangyuan');
function doDualCultivation(){
  if(!dualCultivationOpen()) return ['Dual cultivation is not open: it only begins when Xiyu chooses it.'];
  if(isAway('cangyuan')) return ['Cangyuan must be with the party.'];
  if(G.bondDay.dual === G.day) return ['They have already cultivated together today.'];
  G.bondDay.dual = G.day;
  const before = G.resonance||0; G.resonance = Math.min(RES_MAX, before+1);
  const msgs = ['🌹 Xiyu and Cangyuan cultivate together, by her choice. Their spiritual signatures grow more familiar.'];
  if(G.resonance>before) msgs.push('✦ Crimson Thread Resonance '+G.resonance+'/'+RES_MAX+(G.resonance===3?' · new paired technique: Thread-Breaker Formation':'')+(G.resonance===2?' · resonance awareness: you can sense severe disturbances':'')+'.');
  else msgs.push('Their resonance is at its limit for now.');
  const m = addBond('cangyuan', 5); if(m) msgs.push(m);
  return msgs;
}
const bondingOpen = () => hook('dongyue_vows_lifelong_devotion') || !!(G.flags && G.flags.bonding_unlocked);
/* Volume 2 comic 001: Xiyu asks for a separate residence and time apart ("I don't wish to continue as we were at the Ice Temple"). The bonding is PAUSED until the story
   brings them back together (flag bonding_resumed; no chapter yet: provisional reading, the Dev tab can resume it). Cangyuan's Steady skill is the interim relief. */
const bondingPaused = () => !!(G.flags && G.flags.xiyu_separate_residence && !G.flags.bonding_resumed);
function doBonding(){
  if(!bondingOpen()) return ['The Moonlit Bonding is not open yet.'];
  if(bondingPaused()) return ['Xiyu has asked for time apart. The bonding is paused until they find their way back to each other.'];
  if(!G.party.includes('dongyue') || isAway('dongyue')) return ['Dongyue must be with the party.'];
  if(G.bondDay.rite === G.day) return ['They have already shared the night. They can bond again after the next day passes.'];
  G.bondDay.rite = G.day; G.heat = 0; G.afterglow = 3;
  const before = G.attune; G.attune = Math.min(ATTUNE_MAX, G.attune+1);
  const msgs = ['🌙 Dongyue stays beside her through the night. Her heat settles, and the bond between them deepens.'];
  if(G.attune>before){ msgs.push('✦ Attunement '+G.attune+'/'+ATTUNE_MAX+': her magic grows steadier and stronger.'); skillsOf('xiyu').concat(skillsOf('dongyue')).filter(s => s.req && s.req.att===G.attune && reqMet(s.owner||'xiyu', s.req)).forEach(s => msgs.push('  ✦ New skill: '+s.n)); }
  else msgs.push('Attunement is at its limit for now.');
  const m = addBond('dongyue', 5); if(m) msgs.push(m);
  msgs.push('✨ Afterglow: Xiyu\'s magic is a little stronger for her next 3 battles.');
  return msgs;
}
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, bm = bondMult(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * bm); });
  if(id==='xiyu'){ const L = G.attune||0; out.mag = Math.round(out.mag*(1+.02*L)); out.mp = Math.round(out.mp*(1+.03*L)); }
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
  if(r.att) parts.push('Attunement '+r.att);
  if(r.res) parts.push('Resonance '+r.res);
  if(r.flag) parts.push('Story: '+(FLAG_LABEL[r.flag]||r.flag));
  return parts.join(' + ');
}
function reqMet(id, r){
  if(!r) return true;
  if(r.lvl && U(id).lv < r.lvl) return false;
  if(r.att && (G.attune||0) < r.att) return false;
  if(r.res && (G.resonance||0) < r.res) return false;
  if(r.flag && !G.flags[r.flag]) return false;
  return true;
}
const skillsOf = id => CHARACTERS[id].skills.map(s => Object.assign({}, s, { owner:id, ok:reqMet(id,s.req), why:reqText(s.req) }));

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
/* Chapter hooks (scripts/hooks.js): events fire once (never replay), states persist so later chapters can check them: hook('soul_bond_fourteen_day_deadline_active'). */
const hook = id => !!(G && G.hooks && G.hooks[id]);
const isAway = id => !!(G.away && G.away[id]);   // story states: e.g. Ya'Xing recovers at the Ice Temple after ch39
const ritualActive = () => !!G.ritual && G.ritual.left!==null && !G.ritual.done;
function recruit(id){
  if(G.party.includes(id)) return false;
  G.party.push(id);
  if(activeCount() < ACTIVE_SLOTS && !isAway(id)) G.active.push(id);
  return true;
}
function toggleActive(id){
  if(id==='xiyu' || isAway(id)) return;
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
  B.allies.forEach(a => { const u = U(a.id); if(!u || !G.party.includes(a.id)) return; u.hp = a.dead ? Math.max(1, Math.round(a.mhp*.2)) : a.hp; u.mp = a.mp;
    if(a.id==='xiyu'){ G.heat = Math.round(a.heat||0); if(a.glow && G.afterglow>0) G.afterglow--; } });
}
const REST_COST = () => 10 + avgPartyLv()*2;
function restAtInn(){
  const c = REST_COST(); if(G.gold < c) return ['A bed at the Crimson Fairy costs '+c+' gold.'];
  G.gold -= c; G.day++; restoreParty(); G.heat = Math.max(0, (G.heat||0)-40); save();
  return ['🛏️ The party sleeps beneath the eight moons. HP and MP fully restored. (-'+c+'g)'];
}
