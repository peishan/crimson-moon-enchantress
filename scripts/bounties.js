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
function markHook(id){ if(!G.hooks[id]) G.hooks[id] = 54; }

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
  return `<h2>Bounties</h2>${flashHtml()}${story}<h4>Road disturbances (repeatable)</h4>${rep}`;
}
