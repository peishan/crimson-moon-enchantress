/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CHAPTER JOURNAL LOGIC
   Chapters 1-20 (Season 1). Read the comic (or the script text) -> optional battle -> story XP.
   Comic art: assets/comics/chNN.webp, extra pages chNN_2.webp, chNN_3.webp ... (see README).
   ===================================================================== */
const CHAPTERS = [];
for(let n=1;n<=LAST_CHAPTER;n++) CHAPTERS.push({ n, title:CHAPTER_DESIGN[n].title, sxp:storyXp(n), battle:null, pending:!!CHAPTER_DESIGN[n].pending });   // pending = no approved script yet
const chapterOf = n => CHAPTERS[n-1];

/* Chapter battles. Only one is in the script: ch13, Dongyue expels the imp afflicting Wang Xi'er.
   Fighters are listed explicitly: Xiyu is not at Hanshan's home, and Xiao Tian / Ya'Xing are his companions (guests until they join). */
chapterOf(13).battle = [{key:'afflicting_imp'}];
const SOLO = { 13:['dongyue','xiaotian','yaxing'] };

const chapterDone = n => n <= G.ch;
const chapterAvailable = n => n <= G.ch+1 && !chapterLevelLock(n);

function fighterIds(n){ return SOLO[n] || G.active; }
function fightersLv(n){
  const ids = fighterIds(n).filter(id => G.party.includes(id));
  return ids.length ? Math.round(ids.reduce((a,id) => a + U(id).lv, 0)/ids.length) : avgPartyLv();
}
function battleSpecFor(n){
  const c = chapterOf(n), lv = Math.max(1, fightersLv(n));
  return { foes:c.battle.map(f => ({key:f.key, lv})), allies:SOLO[n], rewards:true, chapter:n, firstClear:!chapterDone(n),
           onWin: () => completeChapter(n) };
}

function completeChapter(n){
  const msgs = [];
  if(G.ch >= n) return msgs;
  G.ch = n;
  const c = chapterOf(n);
  recruitsAtChapter(n).forEach(id => {
    const lv = joinLevel(id);
    if(recruit(id)){ U(id).lv = Math.max(U(id).lv, lv); msgs.push('★ '+CHARACTERS[id].n+' joins the party!'); }
  });
  Object.keys(CH_BOND[n]||{}).forEach(id => { if(isRecruited(id)){ U(id).bp += CH_BOND[n][id]; msgs.push('💞 Bond with Xiyu ('+CHARACTERS[id].n.split(' ')[0]+'): +'+CH_BOND[n][id]); } });
  (CH_FLAGS[n]||[]).forEach(f => { G.flags[f] = true; msgs.push('✦ Story: '+(FLAG_LABEL[f]||f)); });
  applyStoryStates(n).forEach(m => msgs.push(m));
  setHooks(n);
  (CH_ITEMS[n]||[]).forEach(d => { addItems([d]); msgs.push('Received '+ITEMS[d.id].icon+' '+ITEMS[d.id].n); });
  G.day++;   // story time passes between chapters
  msgs.push('Story XP +'+c.sxp);
  gainXp(c.sxp, G.party).forEach(m => msgs.push(m));
  save();
  return msgs;
}

/* Story states that are not flags: the ritual countdown (story-driven, never real time) and heroes who are away. Returns messages. */
function applyStoryStates(n){
  const msgs = [];
  G.ritual = G.ritual || {left:null, done:false}; G.away = G.away || {};
  if(CH_RITUAL[n]!==undefined){ G.ritual.left = G.ritual.left===null ? CH_RITUAL[n] : Math.min(G.ritual.left, CH_RITUAL[n]); msgs.push('⏳ The ritual deadline: '+G.ritual.left+' day'+(G.ritual.left===1?'':'s')+' left.'); }
  if(n>=RITUAL_DONE_CH && G.ritual.left!==null && !G.ritual.done){ G.ritual.done = true; msgs.push('⏳ The ritual is completed. The deadline no longer applies.'); }
  (CH_BACK[n]||[]).forEach(id => { if(G.away[id]){ delete G.away[id]; if(G.party.includes(id) && !G.active.includes(id) && activeCount()<ACTIVE_SLOTS) G.active.push(id); msgs.push('⚓ '+CHARACTERS[id].n+' is found, recuperating, and rejoins the party.'); } });
  Object.keys(CH_AWAY[n]||{}).forEach(id => { G.away[id] = CH_AWAY[n][id]; G.active = G.active.filter(x => x!==id); msgs.push('⚓ '+CHARACTERS[id].n+' stays behind: '+CH_AWAY[n][id]); });
  return msgs;
}
const CH_ITEMS = { 24:[{id:'winter_cloaks',qty:1},{id:'ice_staff',qty:1},{id:'higher_spellbooks',qty:1}] };   // (ch26: Hoko, not the party, unlocks the platform with the white key)
/* Mark a chapter's hooks as fired. An event hook that already fired is never fired again. */
function setHooks(n){ G.hooks = G.hooks || {}; (HOOKS[n]||[]).forEach(h => { if(!G.hooks[h.id]) G.hooks[h.id] = n; }); }

// DEV: jump the save to "story at chapter n" (recruits, flags, levels, ritual, away heroes)
function devSetChapter(n){
  G.ch = 0; G.flags = {}; G.read = {}; G.party = ['xiyu']; G.active = ['xiyu']; G.ritual = {left:null, done:false}; G.away = {}; G.hooks = {};
  for(let i=1;i<=n;i++){ G.ch = i; recruitsAtChapter(i).forEach(id => recruit(id)); (CH_FLAGS[i]||[]).forEach(f => G.flags[f]=true); applyStoryStates(i); setHooks(i); }
  G.ch = n;
  const target = Math.max(1, Math.round(1 + n*STORY_PACE));
  G.party.forEach(id => { U(id).lv = Math.max(U(id).lv, target); U(id).xp = 0; });
  save();
}
