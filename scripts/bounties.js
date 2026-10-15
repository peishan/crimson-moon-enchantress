/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — BOUNTIES
   Story bounty: THE RED LANTERN ROAD (Volume 2 comic 015 = chapter 54). Five steps, then it is done for good (its scenes never replay):
     0 not accepted · 1 accepted (interview) · 2 interviewed (inspect the ward) · 3 inspected (fight) · 4 shadow defeated (report back) · 5 reported
   Reporting back completes chapter 54 and sets red_lantern_road_cleared. The fragment flag is set when the shadow falls (not when reporting).
   Repeatable bounties: once the story bounty is cleared, small randomized road disturbances appear on the board each in-game day.
   Gate: ch53 done (Xining recruited, flag red_lantern_bounty_available).
   ===================================================================== */
const RED = () => G.bounty.red;
const bountyBoardOpen = () => !!G.flags.red_lantern_bounty_available;
const RED_FIGHT_ALLIES = ['xiyu','dongyue','cangyuan','xining'];   // the four from the comic page
const RED_STEPS = [
  'Accept the bounty from the eastern settlement\'s noticeboard',
  'Interview the survivor (Xining diagnoses him)',
  'Inspect the damaged ward (Cangyuan\'s Spirit Weaving or Xiyu\'s crimson magic)',
  'Defeat the shadow creature and destroy its corrupted anchor',
  'Report back to the guard',
];
function redAvailable(){
  const r = [];
  if(!G.party.includes('xining')) r.push('Lu Xining must be in the party (she joins in Volume 2 comic 014).');
  if(!G.party.includes('cangyuan') && !G.party.includes('xiyu')) r.push('Xiyu or Cangyuan is needed to inspect the ward.');
  return r;
}
function redAccept(){ if(RED().stage!==0) return []; RED().stage = 1; return ['📜 Bounty accepted: The Red Lantern Road. "Another ward has failed. Something is attacking travellers after sunset."']; }
function redInterview(){
  if(RED().stage!==1) return [];
  if(!G.party.includes('xining')) return ['Xining must be in the party to examine the survivor.'];
  RED().stage = 2; addItems([{id:'cleansing_salt', qty:2}]); markHook('survivor_interviewed');
  return ['🩺 Xining examines the survivor. "Your body is exhausted, but your meridians aren\'t damaged in the usual way." He says: "It didn\'t wound me. It took something away." A red light between the trees, then nothing.',
          '🧂 Xining prepares cleansing powder: Received 🧂 Cleansing Salt ×2 (use it on the shadow\'s outer layer in battle).'];
}
function redInspect(who){
  if(RED().stage!==2) return [];
  if(who==='cangyuan' && !G.party.includes('cangyuan')) return ['Cangyuan is not in the party.'];
  RED().stage = 3; RED().inspector = who; markHook('ward_corruption_found_inside_formation');
  return [who==='cangyuan' ? '🧵 Cangyuan traces golden threads around the ward: black filaments emerge from within. "The corruption was already inside the formation."'
                           : '🌹 Xiyu sends a thin crimson spell across the ward: it reconstructs for a moment, then black filaments emerge. "So it wasn\'t broken from outside."',
          '"Something changed its pattern before the ward failed." A shadow rises from beneath the broken lantern.'];
}
function redFight(){
  if(RED().stage!==3) return;
  const ids = RED_FIGHT_ALLIES.filter(id => G.party.includes(id)), lv = Math.max(1, Math.round(ids.reduce((a,id) => a + U(id).lv, 0)/Math.max(1,ids.length)) + 1);
  origin = 'bounties';
  startBattle({ foes:[{key:'red_lantern_shadow', lv},{key:'corrupted_anchor', lv}], allies:ids, rewards:true, bounty:'red',
    onWin: () => { RED().stage = 4; RED().clean = !B.drained; G.flags.corrupted_fragment_obtained = true; markHook('red_lantern_shadow_defeated'); markHook('corrupted_fragment_obtained'); addItems([{id:'corrupted_fragment', qty:1}]);
      return ['🖤 The shadow collapses, leaving a small black-red fragment. Xining wraps it without touching the residue.'].concat(RED().clean ? ['✦ Optional objective met: no one\'s spiritual energy was drained.'] : []); } });
  tab = 'battle'; render();
}
function redReport(){
  if(RED().stage!==4) return [];
  RED().stage = 5; markHook('first_bounty_reward_claimed');
  const lv = avgPartyLv(), gold = 150 + lv*4;
  G.gold += gold; addItems([{id:'frost_herb', qty:2},{id:'imp_ash', qty:2}]);
  const msgs = ['💰 The guard pays the reward: +'+gold+' gold, Frost Herb ×2, Imp Ash ×2.', '"You\'ve earned it. Travellers can use the road again." Dongyue: "For now."'];
  if(RED().clean){ addItems([{id:'ward_silk', qty:1}]); msgs.push('✦ Optional objective reward: Ward Silk ×1.'); }
  gainXp(Math.round(storyXp(54)*.25), G.party).forEach(m => msgs.push(m));
  completeChapter(54).forEach(m => msgs.push(m));   // sets red_lantern_road_cleared; the chapter's own XP and bond
  return msgs;
}
function markHook(id, ch){ if(!G.hooks[id]) G.hooks[id] = ch || 54; }

/* ---------- repeatable road bounties ---------- */
const REP_TEMPLATES = [
  {n:'The Flickering Lantern', text:'A lantern on the old road keeps going out. Travellers say something cold watches them pass.', foes:['road_shade','road_shade']},
  {n:'The Silent Milestone', text:'A milestone ward has gone quiet and shadows gather round it after dark.', foes:['road_shade','road_shade','road_shade']},
  {n:'The Cracked Ward Post', text:'A ward post cracked overnight. Something small has crept inside.', foes:['road_shade','corrupted_anchor']},
  {n:'The Missing Lamplighter', text:'The lamplighter did not come back from the east road. His lantern was found burning red.', foes:['road_shade','road_shade','corrupted_anchor']},
];
function repBoard(){
  const r = G.bounty.rep; if(r.day !== G.day){ r.day = G.day; r.done = []; }
  const start = (G.day*7) % REP_TEMPLATES.length;
  return [0,1,2].map(i => { const t = REP_TEMPLATES[(start+i) % REP_TEMPLATES.length], lv = Math.max(1, avgPartyLv()); return Object.assign({idx:i, lv, gold:40 + lv*3}, t); });
}
function repFight(i){
  const b = repBoard()[i]; if(!b || G.bounty.rep.done.includes(i) || RED().stage<5) return;
  origin = 'bounties';
  startBattle({ foes:b.foes.map(k => ({key:k, lv:b.lv})), rewards:true, bounty:'rep',
    onWin: () => { G.bounty.rep.done.push(i); G.bounty.count++; G.gold += b.gold; const mats = [{id:'frost_herb',qty:1},{id:'imp_ash',qty:1}]; if(Math.random()<.2) mats.push({id:'ward_silk',qty:1}); addItems(mats);
      return ['💰 Bounty paid: +'+b.gold+' gold, '+mats.map(m => ITEMS[m.id].icon+' '+ITEMS[m.id].n+' ×'+m.qty).join(', ')+'.']; } });
  tab = 'battle'; render();
}

/* ---------- investigation: THE BROKEN WARD NETWORK (Arc 4) ----------
   Unlocked by Volume 2 comic 016 (chapter 55). Steps 55-58 follow the story; the last step, THE PORTRAIT WITHOUT A FACE (comic 020 = chapter 59),
   has four objectives and completes chapter 59. Flags: portrait_gallery_examined, departure_record_fragment_found, cangyuan_past_clue_found
   are set as they are done; second_door_open stays false and ruyue_identity_confirmed stays false (the party does not learn who she is yet). */
const WQ = () => G.quest.ward;
const WARD_STORY = [
  [55, 'Notice that the fragment\'s lines converge on failed wards (comic 016)'],
  [56, 'Trace the technique and the network on the map (comic 017)'],
  [57, 'Reach the abandoned eastern shrine and read the name carved there (comic 018)'],
  [58, 'Stand before the second sealed door (comic 019)'],
];
const PORTRAIT_OBJ = [
  {k:'gallery', t:'Examine the portrait gallery', who:['xiyu','cangyuan'], all:true, need:[], btn:'🖼️ Examine the portraits'},
  {k:'record',  t:'Recover the damaged departure record', who:['xining'], all:true, need:['gallery'], btn:'📜 Search behind the empty frame'},
  {k:'seal',    t:'Investigate the second seal', who:['cangyuan','xiyu'], all:false, need:['gallery'], btn:'🧵 Study the second seal'},
  {k:'safe',    t:'Determine whether the corridor is safe', who:['dongyue','xining'], all:false, need:['record','seal'], btn:'🔦 Judge the corridor'},
];
function portraitBlock(o){
  const missing = o.who.filter(id => !G.party.includes(id)).map(id => first(id));
  if(o.all ? missing.length : missing.length === o.who.length) return (o.all ? missing.join(' and ') : o.who.map(first).join(' or ')) + ' must be in the party.';
  const prior = o.need.filter(k => !WQ()[k]); if(prior.length) return 'Finish the earlier objectives first.';
  return '';
}
function portraitDo(k){
  const o = PORTRAIT_OBJ.find(x => x.k === k); if(!o || G.ch < 58 || WQ()[k]) return [];
  const why = portraitBlock(o); if(why) return [why];
  WQ()[k] = true; const msgs = [];
  if(k === 'gallery'){
    G.flags.portrait_gallery_examined = G.flags.cangyuan_past_clue_found = true; markHook('portrait_gallery_examined', 59); markHook('cangyuan_past_clue_found', 59);
    msgs.push('🖼️ Faded portraits of cultivators in ceremonial robes line the walls. One is slashed beyond recognition; another was taken down, leaving a clean rectangle in the dust. "Someone took this one down recently." "Or someone never wanted it seen."',
              '🤚 Cangyuan\'s fingers stop above the frame in the same precise position as in his memory. "Someone once taught me not to touch what I didn\'t understand." "Did you listen?" "Not always."',
              '✦ Clue found: Cangyuan\'s past (he once belonged to the place that built this formation).');
  } else if(k === 'record'){
    G.flags.departure_record_fragment_found = true; markHook('departure_record_fragment_found', 59); addItems([{id:'departure_record', qty:1}]);
    msgs.push('📜 Behind the empty frame Xining finds a narrow compartment and a brittle strip of paper, its lower half torn away. "This isn\'t a personal letter. It looks like part of a departure record. One name has been erased; the rest mentions a departure from the sect."',
              '"Is it yours?" "I don\'t know." He answers too quickly. Xiyu notices, and does not challenge him.', 'Received 📜 Torn Departure Record.');
  } else if(k === 'seal'){
    markHook('seal_recognises_cangyuan', 59);
    msgs.push('🧵 The second door\'s hooked symbol glows. Golden Spirit Weaving patterns rise beneath the stone while the black-red corruption retreats into narrow cracks. From behind the door a quiet, almost amused voice: "Still cautious, Cangyuan? You weren\'t always so careful."',
              '"Something has disturbed the formation." "From the other side?" "Possibly."');
  } else {
    msgs.push('🔦 Dongyue and Xining read the corridor: the formation is unstable and something on the other side has disturbed it. "Then we shouldn\'t proceed until we understand what changed." Cangyuan: "We shouldn\'t mistake a familiar voice for a trustworthy one." The door\'s symbol dims, leaving a thin line of crimson light beneath its edge.',
              '✦ The corridor is not yet safe. The second door stays closed.');
  }
  gainXp(Math.round(storyXp(59)*.1), G.party).forEach(m => msgs.push(m));
  if(PORTRAIT_OBJ.every(x => WQ()[x.k])){
    G.flags.second_door_open = false; G.flags.ruyue_identity_confirmed = false;
    msgs.push('Some doors preserve what was lost. Others preserve what someone was afraid to remember.');
    completeChapter(59).forEach(m => msgs.push(m));
  }
  return msgs;
}
function wardQuestHtml(){
  if(G.ch < 55) return '';
  const story = WARD_STORY.map(([n,t]) => `<div class="li">${G.ch>=n?'✔':'○'} ${t}</div>`).join('');
  const portraitOpen = G.ch >= 58, done = PORTRAIT_OBJ.every(o => WQ()[o.k]);
  const objs = PORTRAIT_OBJ.map(o => { const d = !!WQ()[o.k], why = portraitOpen && !d ? portraitBlock(o) : '';
    return `<div class="li">${d?'✔':portraitOpen&&!why?'▶':'○'} ${o.t}${portraitOpen&&!d?`<div><button class="pri" ${why?'disabled':''} onclick="act(()=>portraitDo('${o.k}'))">${o.btn}</button>${why?`<span class="sm" style="color:#e88a8a"> ${why}</span>`:''}</div>`:''}</div>`; }).join('');
  return `<div class="panel ${done?'good':''}"><h3>🔎 The Broken Ward Network</h3><div class="sm">Arc 4 investigation · the Red Lantern Road was only one point on the map.</div>${story}
    <h4 style="margin:8px 0 2px">The Portrait Without a Face ${done?'· complete':''}</h4>${portraitOpen?'':'<div class="sm">Opens after Volume 2, comic 019.</div>'}${objs}
    ${done?'<div class="sm">The second door is still closed. Who the voice is has not been learned.</div>':''}</div>`;
}

/* ---------- the Bounties tab ---------- */
function rBounties(){
  if(!bountyBoardOpen()) return '<h2>Bounties</h2><div class="sm">🔒 The bounty board opens after Volume 2, comic 014.</div>';
  const r = RED(), st = r.stage, block = redAvailable();
  const steps = RED_STEPS.map((t,i) => `<div class="li">${st>i?'✔':st===i?'▶':'○'} ${t}</div>`).join('');
  const readyBtn = st===0 ? `<button class="pri" ${block.length?'disabled':''} onclick="act(redAccept)">Accept the bounty</button>`
    : st===1 ? `<button class="pri" ${block.length?'disabled':''} onclick="act(redInterview)">🩺 Interview the survivor</button>`
    : st===2 ? `<button class="pri" onclick="act(()=>redInspect('cangyuan'))" ${G.party.includes('cangyuan')?'':'disabled'}>🧵 Inspect with Cangyuan\'s Spirit Weaving</button><button onclick="act(()=>redInspect('xiyu'))">🌹 Inspect with Xiyu\'s crimson magic</button>`
    : st===3 ? `<div class="sm">Fighting: ${RED_FIGHT_ALLIES.filter(id=>G.party.includes(id)).map(first).join(' · ')}. The shadow\'s outer layer halves damage: strip it with Cleansing Salt, a Physician\'s Insight or an Inverted Meridian, or wait for it to crack (round 3). Do not let it drain anyone for the optional reward.</div><button class="pri" onclick="redFight()">⚔️ Face the shadow</button>`
    : st===4 ? `<button class="pri" onclick="act(redReport)">💰 Report back to the guard</button>` : '';
  const story = st<5 ? `<div class="panel"><h3>🏮 The Red Lantern Road</h3><div class="sm">Eastern settlement noticeboard · a failed ward, missing travellers after sunset, a reward. Story bounty (Volume 2 comic 015).</div>${steps}
      ${block.length&&st<2?`<div class="sm" style="color:#e88a8a">${block.join(' ')}</div>`:''}<div style="margin-top:6px">${readyBtn}</div>
      <div class="sm" style="margin-top:6px">Optional: finish without letting the shadow drain anyone's spiritual energy (extra crafting material).</div></div>`
    : `<div class="panel good"><b>🏮 The Red Lantern Road — cleared</b><div class="sm">${r.clean?'Optional objective met. ':''}The corrupted fragment is kept for later investigation.</div></div>`;
  const rep = st>=5 ? repBoard().map(b => { const done = G.bounty.rep.done.includes(b.idx);
      return `<div class="card ${done?'lock':''}" style="cursor:default"><span class="big">📜</span><div class="fl"><b>${b.n}</b><div class="sm">${b.text}</div><div class="sm">💰 ${b.gold} + crafting materials · foes Lv ${b.lv}</div></div>${done?'<span class="sm">✔ done</span>':`<button onclick="repFight(${b.idx})">Take it</button>`}</div>`; }).join('')
      + `<div class="sm">New road disturbances appear each in-game day. ${G.bounty.count} completed.</div>` : '<div class="sm">Smaller road bounties appear on the board once the Red Lantern Road is cleared.</div>';
  return `<h2>Bounties</h2>${flashHtml()}${story}${wardQuestHtml()}<h4>Road disturbances (repeatable)</h4>${rep}`;
}
