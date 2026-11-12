/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — CHAPTER JOURNAL LOGIC
   Chapters 1-20 (Season 1). Read the comic (or the script text) -> optional battle -> story XP.
   Comic art: assets/comics/chNN.webp, extra pages chNN_2.webp, chNN_3.webp ... (see README).
   ===================================================================== */
const CHAPTERS = [];
for(let n=1;n<=LAST_CHAPTER;n++) CHAPTERS.push({ n, title:CHAPTER_DESIGN[n].title, sxp:storyXp(n), battle:null, pending:!!CHAPTER_DESIGN[n].pending, removed:!!CHAPTER_DESIGN[n].removed });   // pending = no approved script yet
const chapterOf = n => CHAPTERS[n-1];

/* Chapter battles. Only one is in the script: ch13, Dongyue expels the imp afflicting Wang Xi'er.
   Fighters are listed explicitly: Xiyu is not at Hanshan's home, and Xiao Tian / Ya'Xing are his companions (guests until they join). */
chapterOf(13).battle = [{key:'afflicting_imp'}];
chapterOf(91).battle = [{key:'formation_manifestation'}];   // Volume 3 comic 013 (revised)
chapterOf(92).battle = [{key:'formation_manifestation'},{key:'awakened_manifestation'}];   // comic 014
chapterOf(95).battle = [{key:'estate_guardian'}];   // comic 017
chapterOf(122).battle = [{key:'ice_temple_guardian'}];
chapterOf(224).battle = [{key:'chamber_guardian'}];   // Volume 6 comic 016
chapterOf(186).battle = [{key:'waystation_guardian'}];   // V5 comic 018
chapterOf(133).battle = [{key:'frenzied_spirit_beast'}];   // V4 comic 017
chapterOf(134).battle = [{key:'maze_minotaur'}];   // V4 comic 018
chapterOf(136).battle = [{key:'frenzied_spirit_beast'},{key:'frenzied_spirit_beast'}];   // V4 comic 020
chapterOf(124).battle = [{key:'ward_sentinel'},{key:'ward_sentinel'}];   // Volume 4 comic 008: the small sentinels at the mechanism   // Volume 4 comic 006 (revised)
chapterOf(59).quest = true;   // V2 comic 020: completed by finishing the Portrait Without a Face investigation (scripts/bounties.js)
chapterOf(54).bounty = true;   // V2 comic 015: completed by clearing the Red Lantern Road bounty (scripts/bounties.js)
chapterOf(264).battle = [{key:'hired_fighter'},{key:'hired_fighter'},{key:'hired_fighter'}];   // Volume 7 comic 027: the ambush in the pass
chapterOf(266).battle = [{key:'hired_fighter'},{key:'hired_fighter'},{key:'hired_captain'}];   // comic 029: the camp
chapterOf(267).battle = [{key:'hired_fighter'},{key:'hired_captain'},{key:'masked_principal'}]; chapterOf(267).lead = true;   // comic 030: Xiao Tian leads (scripts/confrontation.js)
chapterOf(272).battle = [{key:'thread_puppet'}];   // Volume 8 comic 005: the puppet in the workshop
chapterOf(341).battle = [{key:'sanctuary_guardian'}];   // Volume 10 comic 011: the guardian beneath the hall
chapterOf(343).battle = [{key:'broken_figure'},{key:'broken_figure'},{key:'broken_figure'}];   // Volume 10 comic 013: the hall of broken impressions
chapterOf(346).battle = [{key:'broken_figure'},{key:'broken_figure'}];   // comic 016: the bridge over the shaft
chapterOf(347).battle = [{key:'archive_warden'}];   // comic 017: the larger guardian
chapterOf(350).battle = [{key:'fused_guardian'}];   // Volume 10 comic 020: the fused guardian
chapterOf(356).battle = [{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'spirit_wolf'}];   // Volume 11 chapter 004
chapterOf(359).battle = [{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'spirit_wolf'}];   // chapter 007
chapterOf(360).battle = [{key:'horned_ravager'}];   // chapter 008
chapterOf(362).battle = [{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'spirit_wolf'}];   // chapter 010
chapterOf(365).battle = [{key:'ravine_beast'}];   // chapter 013
chapterOf(368).battle = [{key:'frontier_raider'},{key:'frontier_raider'},{key:'frontier_raider'},{key:'frontier_raider'}];   // chapter 016
chapterOf(369).battle = [{key:'pineback_behemoth'}];   // chapter 017
chapterOf(371).battle = [{key:'frontier_raider'},{key:'frontier_raider'},{key:'spirit_wolf'},{key:'spirit_wolf'}];   // Volume 11 chapter 019: the lost supply cart
chapterOf(372).battle = [{key:'frontier_raider'},{key:'frontier_raider'},{key:'frontier_raider'},{key:'ravine_beast'}];   // chapter 020: ambush in the pines
chapterOf(374).battle = [{key:'ravine_beast'},{key:'ravine_beast'}];   // chapter 022: the herd at the fields
chapterOf(375).battle = [{key:'stonehide_beast'}];   // chapter 023: the quarry entrance
chapterOf(377).battle = [{key:'crimson_sovereign'}];   // chapter 025: the Crimson-Horned Sovereign
chapterOf(382).battle = [{key:'spirit_wolf'},{key:'spirit_wolf'},{key:'ravine_beast'},{key:'spirit_wolf'}];   // Volume 11 chapter 030: the beasts descend
chapterOf(383).battle = [{key:'mountain_devourer'}];   // chapter 031: the Mountain Devourer
chapterOf(399).battle = [{key:'lesser_demon'},{key:'lesser_demon'},{key:'lesser_demon'}];   // Volume 12 chapter 015: the landing
chapterOf(405).battle = [{key:'lesser_demon'},{key:'lesser_demon'},{key:'lesser_demon'},{key:'lesser_demon'}];   // chapter 021: the gorge closes
chapterOf(407).battle = [{key:'crimson_stranger'},{key:'lesser_demon'},{key:'lesser_demon'}];   // chapter 023: the demon in the gorge
chapterOf(469).battle = [{key:'corrupted_beast'}];   // Volume 14 comic 017: the corrupted beast in the fog
chapterOf(477).battle = [{key:'hooded_attendant'},{key:'hooded_attendant'},{key:'hooded_attendant'}];   // comic 025: the extraction site
chapterOf(484).battle = [{key:'mountain_demon'}];   // comic 032: the four channels
chapterOf(745).battle = [{key:'ward_sentinel'},{key:'ancient_sentinel'},{key:'ward_sentinel'}];   // Volume 24 comic 022: the stone guardians of the second anchor (battle added by the game)
chapterOf(734).battle = [{key:'ancient_sentinel'},{key:'ward_sentinel'},{key:'ward_sentinel'}];   // Volume 24 comic 011: the stone guardians of the ravine (battle added by the game)
chapterOf(727).battle = [{key:'demonic_beast'},{key:'demonic_beast'},{key:'demonic_beast'}];   // Volume 24 comic 004: the corrupted spirit beasts (battle added by the game)
chapterOf(729).battle = [{key:'ancient_sentinel'},{key:'ward_sentinel'}];   // Volume 24 comic 006: the shrine's guardian construct (battle added by the game)
chapterOf(721).battle = [{key:'hired_fighter'},{key:'hired_fighter'},{key:'hired_fighter'}];   // Volume 23 comic 021: the counterfeit workshop (battle added by the game)
chapterOf(671).battle = [{key:'ward_sentinel'},{key:'sparring_construct'},{key:'ward_sentinel'},{key:'sparring_construct'}];   // Volume 21 comic 021: the hidden corridor of stone guardians (battle added by the game)
chapterOf(622).battle = [{key:'hooded_attendant'},{key:'hooded_attendant'},{key:'hired_fighter'},{key:'hired_fighter'}];   // Volume 19 comic 024: the ambush outside the Gu estate (battle added by the game)
chapterOf(581).battle = [{key:'ward_sentinel'},{key:'ward_sentinel'}];   // Volume 17 comic 008: the wooden sentinel (battle added by the game)
chapterOf(585).battle = [{key:'ward_sentinel'},{key:'hired_fighter'},{key:'hired_fighter'}];   // Volume 17 comic 012: the eastern storehouse (battle added by the game)
chapterOf(568).battle = [{key:'hired_fighter'},{key:'hired_fighter'},{key:'hired_fighter'}];   // Volume 16 comic 025: the Willowbank ambush (battle added by the game)
chapterOf(505).battle = [{key:'hooded_attendant'},{key:'hooded_attendant'},{key:'hooded_attendant'},{key:'director_qiao'}];   // Volume 14 comic 053: the central facility (battle added by the game; the pages show the guard clashes)
const SOLO = { 13:['dongyue','xiaotian','yaxing'] };

const chapterDone = n => n <= G.ch;
const chapterAvailable = n => n <= G.ch+1 && !chapterLevelLock(n);

function fighterIds(n){ return SOLO[n] || G.active; }
function fightersLv(n){
  const ids = fighterIds(n).filter(id => G.party.includes(id));
  return ids.length ? Math.round(ids.reduce((a,id) => a + U(id).lv, 0)/ids.length) : avgPartyLv();
}
/* STORY BATTLES HAVE FIXED LEVELS (author): the enemies of chapter n no longer follow the party's level. Their level is battleLevel(n) and the chapter
   is level-gated at the same number (core.js chapterGate), so a party that out-levels a boss finds it easier and an under-levelled party is told to train first.
   A story-only player (one level per chapter) arrives at chapter n at about level n, so BATTLE_LV_RATIO < 1 leaves a margin. BATTLE_LV overrides single chapters. */
let BATTLE_LV_RATIO = 0.6;   // tuned by scripted play: at 0.6 a party that only attacks and heals wins most story battles; with skills it is comfortable
const BATTLE_LV = {};
const battleLevel = n => Math.max(1, BATTLE_LV[n] !== undefined ? BATTLE_LV[n] : Math.round(n*BATTLE_LV_RATIO));
const battleGate = n => { const c = n>=1 && n<=LAST_CHAPTER ? chapterOf(n) : null; return c && (c.battle || c.lead) ? { lv:battleLevel(n), battle:true } : null; };
function battleSpecFor(n){
  const c = chapterOf(n), lv = battleLevel(n);
  if(c.lead) return v7ConfrontationSpec(lv, { rewards:true, chapter:n, firstClear:!chapterDone(n), onWin:() => completeChapter(n) });
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
  (CH_FLAGS[n]||[]).forEach(f => { G.flags[f] = true; relOnFlag(f); if(FLAG_LABEL[f]) msgs.push('✦ Story: '+FLAG_LABEL[f]); });
  applyStoryStates(n).forEach(m => msgs.push(m));
  setHooks(n);
  relStory(n);
  enforceParty();
  giveChapterGear(n).forEach(m => msgs.push(m));
  if(typeof ledgerStory==='function') ledgerStory(n).forEach(m => msgs.push(m));
  if(n === 661 && typeof arriveIceTemple === 'function') arriveIceTemple();
  if(n === 675){ G.travel = {at:null, back:null}; if(typeof shrineUnlock === 'function') shrineUnlock().forEach(x => msgs.push(x)); }
  (CH_ITEMS[n]||[]).forEach(d => { addItems([d]); msgs.push('Received '+ITEMS[d.id].icon+' '+ITEMS[d.id].n); });
  G.day++;   // story time passes between chapters
  if(n === YX_REST_CH) G.yxRest = G.day;   // Ya'Xing needs one more game day of rest before he can party (core.js yxCheck)
  if(n !== YX_REST_CH && yxCheck()) msgs.push('🛏️ After a day of rest at the Ice Temple, Ya\'Xing rejoins the party in the outfit the commanders gave him.');
  msgs.push('Story XP +'+c.sxp);
  gainXp(c.sxp, G.party).forEach(m => msgs.push(m));
  if(n === V3_END_CH) G.ch = V3_LAST_OLD_CH;
  if(n === V4_END_CH) G.ch = V4_LAST_OLD_CH;   // Volume 4 is 25 comics (chapters 117-141); 142-168 were removed   // the revised Volume 3 ends at chapter 107; chapters 108-116 were removed
  save();
  return msgs;
}

/* Story states that are not flags: the ritual countdown (story-driven, never real time) and heroes who are away. Returns messages. */
function applyStoryStates(n){
  const msgs = [];
  G.ritual = G.ritual || {left:null, done:false}; G.away = G.away || {};
  if(CH_RITUAL[n]!==undefined){ G.ritual.left = G.ritual.left===null ? CH_RITUAL[n] : Math.min(G.ritual.left, CH_RITUAL[n]); msgs.push('⏳ The ritual deadline: '+G.ritual.left+' day'+(G.ritual.left===1?'':'s')+' left.'); }
  if(n>=RITUAL_DONE_CH && G.ritual.left!==null && !G.ritual.done){ G.ritual.done = true; msgs.push('⏳ The ritual is completed. The deadline no longer applies.'); }
  (CH_BACK[n]||[]).forEach(id => { if(G.away[id]){ delete G.away[id]; if(G.party.includes(id) && !G.active.includes(id) && activeCount()<activeSlots()) G.active.push(id); msgs.push('⚓ '+CHARACTERS[id].n+' is found, recuperating, and rejoins the party.'); } });
  Object.keys(CH_AWAY[n]||{}).forEach(id => { G.away[id] = CH_AWAY[n][id]; G.active = G.active.filter(x => x!==id); msgs.push('⚓ '+CHARACTERS[id].n+' stays behind: '+CH_AWAY[n][id]); });
  return msgs;
}
const CH_GEAR = { 129:['healers_scripture'], 130:['crimson_moon_hairpin','celestial_compass','spiritweave_bracers','bracers_xiaotian','skyshard','wayfinders_key'] };   // Volume 4 equipment (author); chapters are placeholders until the rebuilt Ice Temple arc settles
const CH_ITEMS = { 661:[{id:'ice_temple_token',qty:1}], 651:[{id:'feiyue_jian',qty:1},{id:'muxue_codex',qty:1}], 606:[{id:'sage_compass',qty:1}], 24:[{id:'winter_cloaks',qty:1},{id:'ice_staff',qty:1},{id:'higher_spellbooks',qty:1}] };   // (ch26: Hoko, not the party, unlocks the platform with the white key)
/* Mark a chapter's hooks as fired. An event hook that already fired is never fired again. */
function setHooks(n){ G.hooks = G.hooks || {}; (HOOKS[n]||[]).forEach(h => { if(!G.hooks[h.id]) G.hooks[h.id] = n; }); }

// DEV: jump the save to "story at chapter n" (recruits, flags, levels, ritual, away heroes)
function devSetChapter(n){
  G.ch = 0; G.flags = {}; G.read = {}; G.party = ['xiyu']; G.active = ['xiyu']; G.ritual = {left:null, done:false}; G.away = {}; G.hooks = {}; G.rel = {}; G.convo = {}; G.xt = {wins:0}; G.shared = {}; G.board = {active:[], list:{day:0, items:[]}, bounties:{day:0, list:[]}, done:0, renown:0};
  for(let i=1;i<=n;i++){ G.ch = i; recruitsAtChapter(i).forEach(id => recruit(id)); (CH_FLAGS[i]||[]).forEach(f => G.flags[f]=true); applyStoryStates(i); setHooks(i); relStory(i); }
  for(let i=1;i<=n;i++) giveChapterGear(i, true);
  if(n >= YX_REST_CH && G.away.yaxing) G.yxRest = G.day;
  G.ch = skipRemoved(n);
  enforceParty();
  if(n >= 78) relationshipUnlock();
  if(n >= 664 && typeof yqUnlock === 'function') yqUnlock();
  if(n >= 661 && n < 675 && typeof arriveIceTemple === 'function') arriveIceTemple();
  if(n >= 675){ G.travel = G.travel || {at:null, back:null}; G.travel.at = null; }   // the dev jump skips the finale splash
  G.bounty = {red:{stage: n>=54 ? 5 : 0}, rep:{day:0, done:[]}, count:0}; G.quest = {ward:{}};
  if(n>=59){ ['gallery','record','seal','safe'].forEach(k => G.quest.ward[k] = true); G.flags.portrait_gallery_examined = G.flags.departure_record_fragment_found = G.flags.cangyuan_past_clue_found = true; G.flags.second_door_open = false; G.flags.ruyue_identity_confirmed = false; }
  const target = Math.max(1, Math.round(1 + n*STORY_PACE));
  G.party.forEach(id => { U(id).lv = Math.max(U(id).lv, target); U(id).xp = 0; });
  save();
}
