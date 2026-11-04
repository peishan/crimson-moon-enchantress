/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XIYU'S INFORMANT NETWORK (investigations)
   A section of the Bases tab ("📡 Network"). Xiyu's people feed leads into open investigations:
     - Daily check-in (once per game day): each open investigation gains a few % from informants, up to NET_CHECKIN_CAP (rumours only).
     - Hunting: every Wilds victory in a relevant zone adds 1%, and relevant monsters can drop a clue (+4% and a bonus item).
     - Milestones at 25/50/75/100% give a report, gold, XP and an item. At 100% the flag net_<id>_complete is set.
   IMPORTANT: the reports are deliberately neutral (no new canon). The story chapters decide what is true; to give a milestone real
   content, edit its text in INVESTIGATIONS below. This system does not change the story: it is an optional side loop.
   Also: every check-in brings a reward (gold, sometimes an item) and ONE rumour or piece of hearsay from the RUMOURS table. Most are flavour; some
   hint at a main investigation (+1%); some open a SIDE CASE (CASES: small self-contained mysteries that are NOT part of the story, with their own
   solved text). Side cases play like investigations (check-in, hunting, leads) and are hidden until a rumour opens them.
   Save data: G.net = {prog:{id:%}, clues:{id:n}, day:lastCheckInDay, seen:{id:milestoneIndex}, log:[...], cases:{id:true}, solved:{id:true}, heard:{rumourIndex:true}, lastRumour}.
   ===================================================================== */
const NET_CHECKIN_CAP = 50;
const NET_MILESTONES = [25, 50, 75, 100];
const INVESTIGATIONS = [
  {id:'yan', n:'Where is Muxue Yan?', icon:'🧭', open:409,
   desc:'Xiyu\'s people ask after her father in every place he might have gone.',
   zones:['forest','stream','steps','slopes','northpass','archivepass'], keys:['frost_wolf','ridge_yeti','ice_golem','ward_sentinel','hired_fighter'],
   reports:['The network has started collecting accounts of Muxue Yan\'s last known movements.',
            'Several accounts agree on a few details; others contradict them. Xiyu\'s people are sorting which to trust.',
            'A pattern is emerging from the accounts, though it is not yet clear what it means.',
            'The network has gathered everything it can. What it means is for the party to decide.']},
  {id:'yihai', n:'The Missing Voyage', icon:'⚓', open:519,
   desc:'Zhan Yihai was taken at sea. Xiyu\'s people listen along the coast roads and rivers.',
   zones:['qingluo','yilongedge','westroute'], keys:['hired_fighter','lesser_demon','spirit_wolf'],
   reports:['The network is listening for word of Yihai\'s ship along the coast and rivers.',
            'Fragments about the voyage reach Xiyu, some confirmed by the records the party found.',
            'The fragments begin to line up with the harbour records; a few gaps remain.',
            'The network has gathered everything it can about the voyage. What it means is for the party to decide.']},
  {id:'demons', n:'The Demon Network', icon:'👹', open:452,
   desc:'An organised demon force works along the western roads. Hunters and informants compare notes.',
   zones:['westroute','shattered','frontier','yilongedge'], keys:['lesser_demon','ravine_beast','spirit_wolf'],
   reports:['Demon hunters and local informants have started sharing sightings with Xiyu.',
            'The sightings cluster along a few roads and a few nights of the month.',
            'The pattern of sightings suggests organisation rather than chance.',
            'The network has gathered everything it can on the demon force. What it means is for the party to decide.']},
];
/* Side cases: optional, non-canon small mysteries. `solved` is the short ending shown when a case reaches 100%. */
const CASES = [
  {id:'c_lantern', side:true, n:'The Lantern That Will Not Go Out', icon:'🏮', open:409, zones:['lantern'], keys:['moon_wisp','rift_wraith'],
   desc:'A paper lantern on the hill road burns day and night. Travellers say it moves when nobody is looking.',
   reports:['People confirm the lantern: it has burned for three weeks and nobody remembers hanging it.','It seems to drift a little further along the road each night.','Wisps gather round it after dusk, as if it were calling them.','The lantern guides lost wisps home.'],
   solved:'A wisp that had lost its way was clinging to an old festival lantern, and the lantern kept burning for it. Xiyu\'s people lead it back to the hills and the lantern finally goes dark.'},
  {id:'c_mule', side:true, n:'The Peddler\'s Lost Mule', icon:'🫏', open:409, zones:['northpass'], keys:['snowfield_ram','hired_fighter'],
   desc:'A peddler on the northern pass swears his mule walked off with a full load of spice cakes and has not been seen since.',
   reports:['The peddler is quite certain: it was a brown mule, and rather proud.','Hoofprints lead off the road and up a side trail.','Hired blades on the pass admit they saw a mule, and kept the spice cakes.','The mule is found, unharmed, in a quiet hollow.'],
   solved:'The mule had simply taken a long walk. The hired blades return what is left of the spice cakes with some embarrassment, and the peddler gives Xiyu\'s people a discount for life.'},
  {id:'c_stream', side:true, n:'Whispers at the Hollow Stream', icon:'💧', open:409, zones:['stream9'], keys:['ice_sprite','moon_wisp'],
   desc:'Villagers hear murmuring from the Hollow Stream at night, always just too soft to make out words.',
   reports:['Three villagers describe the murmuring the same way: like someone practising a song.','It is loudest after the first frost.','The sprites go quiet whenever the party walks the bank.','The murmuring is a lullaby.'],
   solved:'The sprites had picked up a lullaby from a mother singing at the stream years ago and have been rehearsing it ever since. They sing it for the party, off-key and delighted.'},
  {id:'c_stairs', side:true, n:'Songs From the Old Stairs', icon:'🎶', open:409, zones:['cloudsteps'], keys:['ward_sentinel','sparring_construct'],
   desc:'Pilgrims climbing the Cloud Steps say the stone sings under their feet on certain steps.',
   reports:['Pilgrims agree on the steps that sing: always the same eleven.','The notes only sound when someone climbs, never when they descend.','The guardian constructs seem to be listening too.','The stairs are a tuned instrument.'],
   solved:'The old builders tuned the steps like a stone harp so the climb itself would be a lesson in patience. The constructs have been keeping them in tune all this time.'},
  {id:'c_caravan', side:true, n:'The Quiet Caravan Guard', icon:'🛡️', open:409, zones:['frontier'], keys:['spirit_wolf','ridge_yeti'],
   desc:'A caravan guard on the Thousand-Mile Frontier refuses to speak of what he saw last winter.',
   reports:['The other guards say he has not slept properly since the first snow.','He starts at the sound of howling.','What he saw was a wolf that did not leave tracks.','The wolf only follows lone travellers.'],
   solved:'A lonely spirit wolf had been following solitary travellers to keep them company on dark roads. The guard, relieved, leaves it a bowl of broth on the road each winter.'},
  {id:'c_ledger', side:true, n:'The Tax Collector\'s Ledger', icon:'📒', open:425, zones:['qingluo','yilongedge'], keys:['lesser_demon','glacier_crab'],
   desc:'A riverside tax collector lost his ledger and with it a season of accounts. He is desperate.',
   reports:['The collector last had it before crossing a ford by the Qingluo River.','A glacier crab has been seen carrying something paper-like.','Lesser demons raided the ford the same night.','The ledger turns up, much chewed.'],
   solved:'The crab was using the ledger to line its burrow. Most pages are readable, and the collector is so grateful he forgives Xiyu\'s people a year of river tolls.'},
  {id:'c_echo', side:true, n:'The Echo That Answers Late', icon:'🔔', open:425, zones:['echoes','yilongedge'], keys:['rift_wraith','maze_wraith'],
   desc:'Travellers on the Corridor of Echoes say their own voices come back a day late, with new words.',
   reports:['A courier tested it: his shout returned the next evening, a little different.','The new words are always kind ones.','The echoes are strongest near the old anchors.','The echo is not a trick; it is a kindness left by someone.'],
   solved:'Whoever tuned the spatial passage left a gentle charm in the anchors so that lonely travellers would hear an encouraging word. It is old, harmless and rather sweet.'},
];
INVESTIGATIONS.push(...CASES);
/* Rumours and hearsay: one per check-in. kind: 'hearsay' = flavour only; inv = +1% to that main investigation (unverified); open = opens that side case. */
const RUMOURS = [
  {t:'A pedlar swears the moon looked redder over the western road last night. Nobody else noticed.', kind:'hearsay'},
  {t:'The noodle seller by the gate says a scholar paid for three bowls with a pearl and refused change.', kind:'hearsay'},
  {t:'Boatmen say the river has been quieter than usual. They are not sure whether that is good luck.', kind:'hearsay'},
  {t:'A child insists a talking cat told her the festival would be early this year.', kind:'hearsay'},
  {t:'Rumour has it a famous healer is passing through the region incognito. Everyone has a different guess who.', kind:'hearsay'},
  {t:'Merchants complain that the price of lamp oil doubled overnight and nobody can say why.', kind:'hearsay'},
  {t:'Two hunters argue about whether the northern wolves have grown bolder. Neither has seen one.', kind:'hearsay'},
  {t:'The inn gossips say a newlywed couple in Yilong quarrelled over how to fold the wedding lanterns.', kind:'hearsay'},
  {t:'A drunk traveller claims he met a man who sold shadows. He cannot remember where.', kind:'hearsay'},
  {t:'Washerwomen say the old well in the lower town makes a sound at midnight, like someone counting.', kind:'hearsay'},
  {t:'A caravan cook says the eastern roads smell of rain two days before it comes, and it has been right three times.', kind:'hearsay'},
  {t:'The ferryman says a very polite stranger asked him about tides and tipped him far too much.', kind:'hearsay'},
  {t:'An old woman at the market says the lanterns burn bluer than they used to. Her granddaughter says it is the new oil.', kind:'hearsay'},
  {t:'A traveller says someone asked after Muxue Yan at an inn, but he cannot say when or who. (Unverified.)', kind:'hearsay', inv:'yan'},
  {t:'Dock gossip says a ship went quiet near the coast road and no one in the harbour office will say which. (Unverified.)', kind:'hearsay', inv:'yihai', min:519},
  {t:'A hunter says the demon sightings on the western road come in threes, and always near water. (Unverified.)', kind:'hearsay', inv:'demons', min:452},
  {t:'Pilgrims say a lantern on the hill road burns day and night and seems to move when nobody is watching.', kind:'rumour', open:'c_lantern'},
  {t:'A peddler on the northern pass is loudly accusing everyone of stealing his mule.', kind:'rumour', open:'c_mule'},
  {t:'Villagers say the Hollow Stream murmurs after dark, almost like singing.', kind:'rumour', open:'c_stream'},
  {t:'Pilgrims say certain steps of the Cloud Staircase hum when climbed.', kind:'rumour', open:'c_stairs'},
  {t:'A caravan guard on the frontier has stopped sleeping and will not say why.', kind:'rumour', open:'c_caravan'},
  {t:'A tax collector on the Qingluo is offering a reward for his lost ledger, and he looks like he has not eaten.', kind:'rumour', open:'c_ledger', min:425},
  {t:'Couriers say their shouts in the Corridor of Echoes come back a day late, and a little different.', kind:'rumour', open:'c_echo', min:425},
];
const invById = id => INVESTIGATIONS.find(i => i.id === id);
const invOpen = i => G.ch >= i.open && (!i.side || !!NET().cases[i.id]);
function NET(){ G.net = G.net || {prog:{}, clues:{}, day:0, seen:{}, log:[]}; ['prog','clues','seen','cases','solved','heard'].forEach(k => G.net[k] = G.net[k] || {}); G.net.log = G.net.log || []; return G.net; }
const invProg = i => Math.min(100, Math.round(NET().prog[i.id] || 0));
const netReady = () => NET().day < G.day;
function netLog(t){ const l = NET().log; l.unshift('Day '+G.day+': '+t); if(l.length > 12) l.length = 12; }

/* progress with milestone rewards; returns messages */
function invAdd(i, pct, msgs){
  const N = NET(), before = N.prog[i.id] || 0; if(before >= 100) return;
  N.prog[i.id] = Math.min(100, before + pct);
  NET_MILESTONES.forEach((m, idx) => {
    if(before < m && N.prog[i.id] >= m && (N.seen[i.id]||-1) < idx){
      N.seen[i.id] = idx;
      const gold = 40 + 40*idx, xp = Math.round(storyXp(Math.max(1, G.ch)) * (0.3 + 0.2*idx));
      G.gold += gold; msgs.push('📡 '+i.n+' · '+m+'%: '+i.reports[idx]+' (+'+gold+'g'+(xp ? ', +'+xp+' XP' : '')+')');
      if(xp) gainXp(xp, G.active).forEach(x => msgs.push(x));
      const bonus = idx>=2 ? 'spirit_draught' : idx===1 ? 'moonlit_tonic' : 'herbal_tonic'; addItems([{id:bonus, qty:1}]);
      netLog(i.n+' reached '+m+'%');
      if(m === 100){ G.flags['net_'+i.id+'_complete'] = true; if(i.side){ N.solved[i.id] = true; msgs.push('📖 Case closed: '+i.n+'. '+i.solved); } else msgs.push('📡 '+i.n+' is complete: the network has nothing more to find.'); }
    }
  });
}
function netCheckIn(){
  if(!netReady()) return ['Xiyu\'s network has already reported today. Hunt in the relevant areas for more leads, or wait for tomorrow.'];
  const N = NET(), msgs = []; N.day = G.day;
  const open = INVESTIGATIONS.filter(invOpen);
  open.forEach(i => { const cur = N.prog[i.id] || 0; if(cur >= NET_CHECKIN_CAP) return;
    const gain = Math.min(NET_CHECKIN_CAP - cur, 2 + Math.floor(Math.random()*3)); invAdd(i, gain, msgs); });
  /* daily reward */
  const gold = 15 + Math.floor(Math.random()*21) + Math.floor(G.ch/10); G.gold += gold;
  let rw = '+'+gold+'g';
  if(Math.random() < .4){ const it = ['herbal_tonic','frost_herb','moon_petal','ice_crystal','imp_ash','spirit_draught'][Math.floor(Math.random()*6)]; addItems([{id:it, qty:1}]); rw += ', '+ITEMS[it].icon+' '+ITEMS[it].n; }
  /* today's rumour */
  const pool = RUMOURS.map((r,idx) => ({r, idx})).filter(x => (x.r.min||0) <= G.ch && !(x.r.open && N.cases[x.r.open]) && !N.heard[x.idx]);
  const pick = pool.length ? pool[Math.floor(Math.random()*pool.length)] : null;
  if(!pick){ N.heard = {}; }
  const r = pick ? pick.r : null;
  if(r){ N.heard[pick.idx] = true; N.lastRumour = {t:r.t, kind:r.kind}; N.rumours = [{t:r.t, kind:r.kind, d:G.day}].concat(N.rumours||[]).slice(0,8);
    msgs.push('💬 '+(r.kind==='rumour' ? 'Rumour' : 'Hearsay')+': '+r.t);
    if(r.inv && invById(r.inv) && invOpen(invById(r.inv))) invAdd(invById(r.inv), 1, msgs);
    if(r.open && !N.cases[r.open]){ N.cases[r.open] = true; msgs.push('🔎 New side case opened: '+invById(r.open).n+' (not part of the story).'); netLog('new case: '+invById(r.open).n); } }
  msgs.unshift('📡 The network reports in. Day\'s takings: '+rw+'.');
  netLog('daily check-in'); return msgs;
}
/* hunting: called from finishWin with the defeated foes and the Wilds zone id (null for bosses and story fights) */
function networkOnWin(foes, zone){
  const msgs = []; if(!zone) return msgs;
  INVESTIGATIONS.filter(invOpen).forEach(i => {
    if(!i.zones.includes(zone)) return;
    invAdd(i, 1, msgs);
    foes.forEach(f => { if(i.keys.includes(f.key) && Math.random() < 0.15){
      NET().clues[i.id] = (NET().clues[i.id]||0) + 1; invAdd(i, 4, msgs);
      const it = ['moon_petal','frost_herb','ice_crystal','imp_ash'][Math.floor(Math.random()*4)]; addItems([{id:it, qty:1}]);
      msgs.push('🔎 '+i.n+': '+f.name+' was carrying a lead (+4%, and a '+ITEMS[it].n+').'); netLog(f.name+' dropped a lead for '+i.n); } });
  });
  return msgs;
}
const zoneNames = ids => ids.map(z => { const zz = zoneById(z); return zz ? (zoneOpen(zz) ? zz.icon+' '+zz.n : '🔒 ???') : ''; }).join(', ');
function invCard(i){
  const N = NET(), p = invProg(i), capNote = p >= NET_CHECKIN_CAP && p < 100 ? ' · informants have given all they can: hunt for the rest' : '';
  return `<div class="panel"><b>${i.icon} ${i.n}</b> <span class="sm">${p}%${p>=100?' · complete':''}</span>
    <div class="bar"><div style="width:${p}%;height:8px;background:#c33;border-radius:4px"></div></div>
    <div class="sm">${i.desc}${capNote}</div>
    ${p<100 ? `<div class="sm">📍 Hunt in: ${zoneNames(i.zones)}</div>
    <div class="sm">🐾 Clue-bearers: ${i.keys.map(k => ENEMIES[k] ? ENEMIES[k].icon+' '+ENEMIES[k].n : k).join(', ')} · leads found: ${N.clues[i.id]||0}</div>` : ''}
    ${(N.seen[i.id]!==undefined) ? `<div class="sm" style="margin-top:4px">📝 Latest report: ${i.reports[N.seen[i.id]]}</div>` : ''}
    ${N.solved[i.id] ? `<div class="sm" style="margin-top:4px">📖 ${i.solved}</div>` : ''}</div>`; }
function rNetwork(){
  const N = NET(), main = INVESTIGATIONS.filter(i => !i.side && invOpen(i)), side = INVESTIGATIONS.filter(i => i.side && invOpen(i));
  const solved = INVESTIGATIONS.filter(i => i.side && N.solved[i.id]).length, total = INVESTIGATIONS.filter(i => i.side).length;
  const heard = (N.rumours||[]).map(r => `<div class="sm">${r.kind==='rumour'?'🗣️':'💬'} Day ${r.d}: ${r.t}</div>`).join('');
  const log = N.log.length ? `<div class="panel"><b>🗒️ Recent reports</b>${N.log.map(l => `<div class="sm">${l}</div>`).join('')}</div>` : '';
  return `<div class="panel"><h3>📡 Xiyu's network</h3><div class="sm">Her informants listen in towns and on the roads. A daily check-in brings a little coin, sometimes a gift, one rumour or piece of hearsay, and a few % of rumours toward each investigation (up to ${NET_CHECKIN_CAP}%). The rest comes from hunting in the relevant areas and from the leads some monsters carry. Some rumours open small side cases that have nothing to do with the story.</div>
    <div style="margin-top:6px"><button class="pri" ${netReady()?'':'disabled'} onclick="act(netCheckIn)">📡 Daily check-in ${netReady()?'':'(done today)'}</button></div></div>
    ${main.length ? '<h4>Investigations</h4>'+main.map(invCard).join('') : ''}
    <h4>🔎 Side cases (${solved}/${total} solved)</h4>${side.length ? side.map(invCard).join('') : '<div class="panel"><div class="sm">None yet: check in and listen for rumours.</div></div>'}
    <div class="panel"><b>🗣️ Rumour mill</b>${heard || '<div class="sm">Nothing heard yet.</div>'}</div>${log}`;
}
