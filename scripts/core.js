/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CORE: state, save, party gates, progression
   ===================================================================== */
const CFG = { SAVE_KEY:'crimson_moon_v1', START_LEVEL:1 };

/* ---------- PARTY GATES (see docs/CHAPTER_GATES.md) ----------
   JOIN_CH   chapter whose completion puts the hero in the party (from the game script).
   INTRO_CH  chapter from which the hero's profile is visible before joining.
   A hero who joins starts at (average party level - 1), never below 1.
   Muxue Yan appears in ch17 and is present at the Ice Temple through the Volume 1 finale (ch34, ch39) but never travels with the party: no join chapter in Volume 1. */
const JOIN_CH  = { yanwatcher:238, hoko:119, xiyu:1, dongyue:11, xiaotian:14, yaxing:15, cangyuan:46, xining:53 };   // Volume 2: cangyuan = V2 comic 007, xining = V2 comic 014 (author)   // ya'xing: ch15 confirmed by the author. Yan does NOT join in Volume 1 (scripts 021-039: he stays at the Ice Temple)   // ya'xing: ch15 confirmed by the author
const INTRO_CH = { yanwatcher:226, hoko:119, suliechen:133, xiyu:1, dongyue:2, yaxing:2, xiaotian:2, yan:17, cangyuan:41 };   // cangyuan first appears in V2 comic 002
const NO_JOIN_YET = { yanwatcher:'Travels with the party only in the story text for now. He becomes a playable member in Volume 7 (the chapter is not decided yet), and later the caretaker of Xiyu\'s base.', suliechen:'Met briefly in Volume 4 (comic 017). He becomes a joinable member when the party reaches Yilong; the chapter is not decided yet.', yan:'Not joinable in Volume 1: he stays at the Ice Temple (ch39). His role in Volume 2 is not written yet.' };

/* ---------- CHAPTER LEVEL GATES (Crimson Tide style: gate:{type:'level', value, label}) ----------
   Milestone chapters stay locked until the party's AVERAGE level reaches a target: every recruitment
   chapter, the battle chapter, and the ch20 milestone. Target = round(chapter x GATE_RATIO). Completed chapters never lock. */
const GATE_RATIO = 1;   // gate = chapter number: "reach an average party level equal to the chapter"
const GATE_CHAPTERS = [11, 13, 14, 15, 20, 39, 46, 53, 54, 78];   // 53 = Xining joins, 54 = the first bounty   // recruitment chapters, the battle chapter, the ch20 milestone and the Volume 1 finale

/* ---------- THE LEVEL CURVE: Volume 1 = 39 comic chapters, spread evenly over levels ----------
   Story XP is set so a player who only reads the story is level (1 + chapters done): Lv 40 when Volume 1 ends at ch 39.
   STORY_PACE = levels gained per chapter (1 = one level per chapter). Wilds/Temple hunting is the optional way to get ahead. */
const VOLUME1_CHAPTERS = 39;
/* VOLUME 2 uses internal chapter numbers 40+ so the level curve, gates, hooks and saves just keep counting: Vol 2 comic 001 = chapter 40.
   Art: assets/comics/v2/chNN.webp (NN = the Volume 2 comic number). Built so far: V2 comics 001-009 and 015 (010-014 are placeholders so the story can reach 015). */
const VOL2_START = 40, VOL3_START = 79, VOL4_START = 117, VOL5_START = 169, YX_START = 199, XC_START = 204, VOL6_START = 209, VOL7_START = 238, VOL8_START = 268, VOL9_START = 302, V3_END_CH = 107, V3_LAST_OLD_CH = 116, V4_END_CH = 141, V4_LAST_OLD_CH = 168, LAST_CHAPTER = 330;
const skipRemoved = n => (n > V3_END_CH && n < V3_LAST_OLD_CH) ? V3_LAST_OLD_CH : (n > V4_END_CH && n < V4_LAST_OLD_CH) ? V4_LAST_OLD_CH : n;
   // Volume 5 side stories (Interludes) follow the finale: Ya'Xing 194-198, Xiyu & Cangyuan from 199
const interOf = n => n >= VOL6_START ? null : n >= XC_START ? 'xc' : n >= YX_START ? 'yx' : null;
const INTER_NAME = {yx:'Ya\'Xing Interlude', xc:'Xiyu & Cangyuan Interlude'};   // Volume 3 (The Roots of What Remains): comic n = chapter 78+n; comics 001-038 = chapters 79-116
const volOf = n => n >= VOL9_START ? 9 : n >= VOL8_START ? 8 : n >= VOL7_START ? 7 : n >= VOL6_START ? 6 : n >= VOL5_START ? 5 : n >= VOL4_START ? 4 : n >= VOL3_START ? 3 : n >= VOL2_START ? 2 : 1;
const vnum = n => n >= VOL9_START ? n - (VOL9_START-1) : n >= VOL8_START ? n - (VOL8_START-1) : n >= VOL7_START ? n - (VOL7_START-1) : n >= VOL6_START ? n - (VOL6_START-1) : n >= XC_START ? n - (XC_START-1) : n >= YX_START ? n - (YX_START-1) : n >= VOL5_START ? n - (VOL5_START-1) : n >= VOL4_START ? n - (VOL4_START-1) : n >= VOL3_START ? n - (VOL3_START-1) : n >= VOL2_START ? n - (VOL2_START-1) : n;   // Volume 4: comic n = chapter 116+n
const chName = n => interOf(n) ? INTER_NAME[interOf(n)]+' · Chapter '+vnum(n) : volOf(n) > 1 ? 'Volume '+volOf(n)+' · Chapter '+vnum(n) : 'Chapter '+n;
const chShort = n => interOf(n) ? (interOf(n)==='yx'?'YX':'XC')+'·'+vnum(n) : volOf(n) > 1 ? 'V'+volOf(n)+'·'+vnum(n) : 'Ch.'+n;
const STORY_PACE = 1;

let G = null;
const $ = id => document.getElementById(id);
const AR = a => a[Math.floor(Math.random()*a.length)];
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const rint = r => r[0] + Math.floor(Math.random()*(r[1]-r[0]+1));

function newState(){
  const s = { v:1, ch:0, flags:{}, units:{}, party:['xiyu'], active:['xiyu'], inv:{}, bestiary:{}, gold:50, read:{}, day:1, bondDay:{}, zone:'forest', wins:0, temple:{found:{}}, ritual:{left:null, done:false}, away:{}, hooks:{}, heat:0, attune:0, afterglow:0, resonance:0, bounty:{red:{stage:0}, rep:{day:0, done:[]}, count:0}, quest:{ward:{}}, time:8, herb:{xp:0, known:{}, gathered:0, made:0}, rel:{}, convo:{}, board:{active:[], list:{day:0, items:[]}, bounties:{day:0, list:[]}, done:0, renown:0}, xt:{wins:0}, shared:{} };
  ROSTER.forEach(id => s.units[id] = { lv:CFG.START_LEVEL, xp:0, bp:0 });
  return s;
}
function save(){ try{ G.savedAt = Date.now(); localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(G)); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(CFG.SAVE_KEY));
    if(!d) return false;
    G = Object.assign(newState(), d); G.temple = G.temple || {found:{}}; G.ritual = G.ritual || {left:null, done:false}; G.away = G.away || {}; G.hooks = G.hooks || {}; G.bounty = G.bounty || {red:{stage:0}, rep:{day:0, done:[]}, count:0}; G.quest = G.quest || {ward:{}}; G.rel = G.rel || {}; G.convo = G.convo || {}; G.xt = G.xt || {wins:0}; if(G.time === undefined) G.time = 8; G.herb = G.herb || {xp:0, known:{}, gathered:0, made:0}; G.shared = G.shared || {}; G.board = G.board || {active:[], list:{day:0, items:[]}, bounties:{day:0, list:[]}, done:0, renown:0}; G.resonance = G.resonance || 0; G.heat = G.heat || 0; G.attune = G.attune || 0; G.afterglow = G.afterglow || 0;
    G.ch = skipRemoved(G.ch);   // old saves inside removed chapters (108-115, 142-167)
    ROSTER.forEach(id => { G.units[id] = G.units[id] || { lv:1, xp:0, bp:0 }; });
    G.active = (G.active||['xiyu']).filter(id => G.party.includes(id) && !G.away[id]); enforceParty();
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
  if(id==='yaxing') return G.flags.yaxing_rejoined ? '_new' : hook('ya_xing_bull_demon_injuries_revealed') ? '_injured' : '';
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
const XP_CLASS = { xiyu:'standard', dongyue:'support', yaxing:'ranger', hoko:'ranger', yanwatcher:'support', suliechen:'fighter', xiaotian:'fighter', yan:'scholar', cangyuan:'scholar', xining:'support' };
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
   COMPANION BONDING (replaces the old Moonlit Bonding): once a day Xiyu can spend QUIET TIME with a companion in the party. Her heat settles (-30),
   she keeps a short "settled" state for her next 3 battles, and her trust and understanding with that companion grow (see scripts/relations.js).
   ATTUNEMENT is no longer a counter that is clicked up: it is derived from how deeply Xiyu is connected to the companions in the party
   (their trust and understanding with her), one level per 30 points, max 10. It is +2% MAG, +3% MP and -5% Heat gain per level, and it opens the bond skills.
   Nothing here involves intimacy: it is time spent together, conversations and shared work. */
const ATTUNE_MAX = 10;
const heatMult = h => 1 - clamp(((h||0)-40)/60, 0, 1)*.3;
const heatLabel = h => h>=80 ? 'Burning' : h>=50 ? 'Flushed' : h>=20 ? 'Warm' : 'Calm';
/* ---------- CRIMSON THREAD RESONANCE (Xiyu x Cangyuan, Volume 2) — see docs/BOND_SYSTEM.md ----------
   Intimacy, dual cultivation, a spiritual bond and marriage are four different things. Only dual cultivation and the resulting resonance are mechanics here
   (intimacy is never shown or tracked). It is VOLUNTARY: it opens only when the story has Xiyu choose it (flag xiyu_chooses_cangyuan; no chapter sets it yet,
   the Dev tab does), needs both of them, and can be done once a day. It is NOT a soul bond, not marriage, and it cannot force anyone to stay. */
const RES_MAX = 5;
const resLv = () => G.resonance||0;
/* The finale splash plays BEFORE the relationship option unlocks (author): closing it calls relationshipUnlock(). */
const relationshipOpen = () => !!(G && G.flags && G.flags.relationship_option_unlocked && G.flags.xiyu_chooses_cangyuan);
function relationshipUnlock(){
  if(relationshipOpen()) return [];
  G.flags.xiyu_chooses_cangyuan = true; G.flags.relationship_option_unlocked = true; G.hooks.xiyu_chooses_cangyuan = G.hooks.relationship_option_unlocked = G.ch || 78;
  save();
  return ['✦ Story: Xiyu chooses Cangyuan','✦ The relationship option opens: relationship bonding with Cangyuan (Crimson Thread Resonance), and a party synergy whenever they fight together.'];
}
/* PARTY SYNERGY: stat bonuses for allies who fight in the same battle.
   Comradeship: each ally you trust (trust 40/60/80 with them) gives +1/+2/+3% to ATK, MAG, DEF and SPD, up to +5% in all.
   Bond of Choice (Xiyu and Cangyuan, after the relationship option opens): +4% plus 2% per Resonance level (up to +14%) for both.
   Named pairs (PAIR_SYN): Dongyue + Xining +6%, Dongyue + Xiao Tian +5%, Dongyue + Xiyu +2% (from chapter 70). */
/* Named pair synergies (author): both partners gain the bonus when they fight in the same party. They lapse by themselves while one is away. */
const PAIR_SYN = [
  {a:'dongyue', b:'xining',   pct:.06, label:'Healers in step', open:() => true},
  {a:'dongyue', b:'xiaotian', pct:.05, label:'Sworn brothers',  open:() => true},
  {a:'dongyue', b:'xiyu',     pct:.02, label:'Friends',         open:() => G.ch >= 70},   // a friendly bond, minor effect
];
const pairSynActive = (p, ids) => ids.includes(p.a) && ids.includes(p.b) && p.open();
function synergyOf(id, ids){
  let b = 0, bond = 0, pair = 0;
  PAIR_SYN.forEach(p => { if((p.a===id || p.b===id) && pairSynActive(p, ids)) pair += p.pct; });
  ids.forEach(o => { if(o === id) return; const r = G.rel && G.rel[relKey(id,o)]; if(r) b += r.t >= 80 ? .03 : r.t >= 60 ? .02 : r.t >= 40 ? .01 : 0; });
  b = Math.min(b, .05);
  if(relationshipOpen() && ((id==='xiyu' && ids.includes('cangyuan')) || (id==='cangyuan' && ids.includes('xiyu')))) bond = .04 + .02*resLv();
  return {comrade:b, bond, pair, total:b+bond+pair};
}
const dualCultivationOpen = () => relationshipOpen() && G.party.includes('cangyuan');
function doDualCultivation(){
  if(!dualCultivationOpen()) return ['Dual cultivation is not open: it only begins when Xiyu chooses it.'];
  if(isAway('cangyuan')) return ['Cangyuan must be with the party.'];
  if(G.bondDay.dual === G.day) return ['They have already cultivated together today.'];
  G.bondDay.dual = G.day;
  const before = G.resonance||0; G.resonance = Math.min(RES_MAX, before+1);
  const msgs = ['🌹 Xiyu and Cangyuan spend the night together, by her choice. Their spiritual signatures grow more familiar.'];
  if(G.resonance>before) msgs.push('✦ Crimson Thread Resonance '+G.resonance+'/'+RES_MAX+(G.resonance===3?' · new paired technique: Thread-Breaker Formation':'')+(G.resonance===2?' · resonance awareness: you can sense severe disturbances':'')+'.');
  else msgs.push('Their resonance is at its limit for now.');
  const m = addBond('cangyuan', 5); if(m) msgs.push(m);
  return msgs;
}
const ATTUNE_COMPANIONS = ['dongyue','cangyuan','xining','yaxing','xiaotian'];
function attuneLv(){
  let t = 0;
  if(G.rel) ATTUNE_COMPANIONS.forEach(id => { if(G.party.includes(id)){ const r = G.rel[relKey('xiyu', id)]; if(r) t += r.t + r.u; } });
  return clamp(Math.floor(t/30), 0, ATTUNE_MAX);
}
const quietTimeReady = id => G.party.includes(id) && G.party.includes('xiyu') && !isAway(id) && id!=='xiyu' && G.bondDay.quiet !== G.day;
function doQuietTime(id){
  if(!G.party.includes(id) || id==='xiyu') return [];
  if(isAway(id)) return [first(id)+' is not with the party.'];
  if(G.bondDay.quiet === G.day) return ['Xiyu has already spent quiet time with someone today. It can be repeated after the next day passes.'];
  G.bondDay.quiet = G.day;
  const before = attuneLv(), r = relGet('xiyu', id);
  G.heat = Math.max(0, (G.heat||0) - 30); G.afterglow = 3;   // afterglow = the settled state: +10% MAG for her next 3 battles
  relAdd('xiyu', id, { t: r.t < 60 ? 2 : 0, u: r.u < 60 ? 2 : 0 });
  const msgs = ['🍵 Xiyu spends a quiet hour with '+first(id)+'. Her heat settles, and they understand each other a little better.'];
  const m = addBond(id, 3); if(m) msgs.push(m);
  const after = attuneLv();
  if(after > before){ msgs.push('✦ Attunement '+after+'/'+ATTUNE_MAX+': her bonds with her companions steady her magic.'); skillsOf('xiyu').concat(skillsOf('dongyue')).filter(s => s.req && s.req.att===after && reqMet(s.owner||'xiyu', s.req)).forEach(s => msgs.push('  ✦ New skill: '+s.n)); }
  msgs.push('✨ Settled: Xiyu\'s magic is a little stronger for her next 3 battles.');
  return msgs;
}
function statsOf(id){
  const c = CHARACTERS[id], lv = U(id).lv, bm = bondMult(id), out = {};
  STATS.forEach(s => { out[s] = Math.round((c.base[s] + c.grow[s]*(lv-1)) * bm); });
  if(id==='xiyu'){ const L = attuneLv(); out.mag = Math.round(out.mag*(1+.02*L)); out.mp = Math.round(out.mp*(1+.03*L)); }
  if(typeof gearStats === 'function'){ const gs = gearStats(id); Object.keys(gs).forEach(k => out[k] = Math.max(1, out[k] + gs[k])); }   // equipment (equip.js)
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
  if(r.att && attuneLv() < r.att) return false;
  if(r.res && (G.resonance||0) < r.res) return false;
  if(r.flag && !G.flags[r.flag]) return false;
  return true;
}
const skillsOf = id => CHARACTERS[id].skills.concat(typeof gearSkills === 'function' ? gearSkills(id) : []).map(s => Object.assign({}, s, { owner:id, ok:reqMet(id,s.req), why:reqText(s.req) }));

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
/* ---------- THE CANON PARTY (author) ----------
   The four protagonists (Xiyu, Cangyuan, Dongyue, Xining) travel together from the moment Xining joins (chapter 53). They are fielded in every
   party and cannot be taken out of the active party ("unfieldable" = cannot be un-fielded). That leaves free seats for Xiao Tian, Ya'Xing (after his
   arc) and the Miracle Healer. If an ARC needs someone present, add a row to ARC_REQUIRED: while the chapter is in range they cannot be removed either.
   Heroes who are AWAY (G.away) are never fielded, whatever the rule says. Guests (the Miracle Healer's Student, Dongyue's grandfather, in the Yilong arc)
   are planned as temporary extra seats and are not built yet (docs/COMPANIONS.md). */
const CANON_PARTY = ['xiyu','cangyuan','dongyue','xining'], CANON_LOCK_CH = 53, FLEX_SEATS = 3, FLEX_V4 = 2;
const ARC_REQUIRED = [];   // {id:'xiaotian', from:chapter, to:chapter, why:'text'}: e.g. an arc that cannot happen without him
const canonLocked = () => G.ch >= CANON_LOCK_CH && CANON_PARTY.every(id => G.party.includes(id));
/* GUESTS: temporary story-required companions. They take an EXTRA seat (not a flex seat) and are fielded while their window is open (from = the chapter whose completion recruits them; to = last chapter of the arc, Infinity until the author sets it). */
const GUESTS = { hoko:{from:119, to:Infinity, why:'Guest guide through the Ice Temple (until the arc ends).'} };   // Su Liechen is a joinable member (not a guest) once the party reaches Yilong; his join chapter is not decided yet
const guestHere = id => !!GUESTS[id] && G.ch >= GUESTS[id].from && G.ch <= GUESTS[id].to && G.party.includes(id);
const guestsHere = () => Object.keys(GUESTS).filter(guestHere).length;
const flexSeats = () => G.ch >= VOL4_START ? FLEX_V4 : FLEX_SEATS;   // Volume 4 on: 4 protagonists + Xiao Tian + Ya'Xing = 6 seats (author); guests such as Hoko take an extra seat
/* No fixed party size once the canon four travel together (author): whoever has joined by the comic chapters can be fielded. Set PARTY_CAP to a number if the game gets too easy. Before that, 4 seats. */
const PARTY_CAP = null;
const activeSlots = () => canonLocked() ? (PARTY_CAP || 99) : 4;
function lockReason(id){
  if(id === 'xiyu') return 'Xiyu always leads the party.';
  if(isAway(id)) return '';
  if(guestHere(id)) return GUESTS[id].why + ' He travels with the party until the arc ends.';
  if(canonLocked() && CANON_PARTY.includes(id)) return 'Canon party: the four protagonists travel together.';
  const r = ARC_REQUIRED.find(x => x.id === id && G.ch >= x.from && G.ch <= x.to);
  return r ? (r.why || 'This arc needs them present.') : '';
}
const partyLocked = id => !!lockReason(id);
/* Ya'Xing rejoins after one GAME day of rest (story time, never real time): the day after the chapter where he is found (YX_REST_CH), or at once via the Party screen's rest button. */
const YX_REST_CH = 126;
const yxResting = () => !!(G && G.away && G.away.yaxing && G.yxRest !== undefined && G.day <= G.yxRest);
function yxCheck(){
  if(G.away && G.away.yaxing && G.yxRest !== undefined && G.day > G.yxRest){
    delete G.away.yaxing; G.flags.yaxing_rejoined = true;
    if(typeof giveGear === 'function') giveGear('outfit_yaxing_sky');
    if(G.party.includes('yaxing') && !G.active.includes('yaxing') && G.active.length < activeSlots()) G.active.push('yaxing');
    return true; }
  return false;
}
function yxRest(){ if(!yxResting()) return []; G.day++; save(); return yxCheck() ? ['🛏️ A day of rest passes at the Ice Temple. Ya\'Xing, in the outfit the commanders gave him, rejoins the party.'] : []; }
function enforceParty(){
  if(G.away) yxCheck();   // keep every locked hero fielded (and drop un-locked heroes if the seats run short)
  G.active = G.active.filter(id => G.party.includes(id) && !isAway(id));
  G.party.filter(id => partyLocked(id) && !isAway(id) && !G.active.includes(id)).forEach(id => {
    if(G.active.length >= activeSlots()){ const out = G.active.slice().reverse().find(x => !partyLocked(x)); if(out) G.active.splice(G.active.indexOf(out), 1); else return; }
    G.active.push(id); });
  while(G.active.length > activeSlots()){ const out = G.active.slice().reverse().find(x => !partyLocked(x)); if(!out) break; G.active.splice(G.active.indexOf(out), 1); }
}
const activeCount = () => G.active.length;
/* Chapter hooks (scripts/hooks.js): events fire once (never replay), states persist so later chapters can check them: hook('soul_bond_fourteen_day_deadline_active'). */
const hook = id => !!(G && G.hooks && G.hooks[id]);
const isAway = id => !!(G.away && G.away[id]) || (!!GUESTS[id] && G.party.includes(id) && G.ch > GUESTS[id].to);   // story states: e.g. Ya'Xing recovers at the Ice Temple after ch39
const ritualActive = () => !!G.ritual && G.ritual.left!==null && !G.ritual.done;
function recruit(id){
  if(G.party.includes(id)) return false;
  G.party.push(id);
  if(activeCount() < activeSlots() && !isAway(id)) G.active.push(id);
  enforceParty();
  return true;
}
function toggleActive(id){
  if(id==='xiyu' || isAway(id)) return;
  const i = G.active.indexOf(id);
  if(i>=0){ if(partyLocked(id)) return; G.active.splice(i,1); } else if(activeCount() < activeSlots()) G.active.push(id);
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
/* Rest, time and taverns live in scripts/rest.js (restAt, advanceTime). */
