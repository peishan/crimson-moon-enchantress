/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XIYU'S INFORMANT NETWORK (investigations)
   A section of the Bases tab ("📡 Network"). Xiyu's people feed leads into open investigations:
     - Daily check-in (once per game day): each open investigation gains a few % from informants, up to NET_CHECKIN_CAP (rumours only).
     - Hunting: every Wilds victory in a relevant zone adds 1%, and relevant monsters can drop a clue (+4% and a bonus item).
     - Milestones at 25/50/75/100% give a report, gold, XP and an item. At 100% the flag net_<id>_complete is set.
   IMPORTANT: the reports are deliberately neutral (no new canon). The story chapters decide what is true; to give a milestone real
   content, edit its text in INVESTIGATIONS below. This system does not change the story: it is an optional side loop.
   Save data: G.net = {prog:{id:%}, clues:{id:n}, day:lastCheckInDay, seen:{id:milestoneIndex}, log:[...]}.
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
const invById = id => INVESTIGATIONS.find(i => i.id === id);
const invOpen = i => G.ch >= i.open;
function NET(){ G.net = G.net || {prog:{}, clues:{}, day:0, seen:{}, log:[]}; ['prog','clues','seen'].forEach(k => G.net[k] = G.net[k] || {}); G.net.log = G.net.log || []; return G.net; }
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
      if(m === 100){ G.flags['net_'+i.id+'_complete'] = true; msgs.push('📡 '+i.n+' is complete: the network has nothing more to find.'); }
    }
  });
}
function netCheckIn(){
  if(!netReady()) return ['Xiyu\'s network has already reported today. Hunt in the relevant areas for more leads, or wait for tomorrow.'];
  const N = NET(), msgs = []; N.day = G.day;
  const open = INVESTIGATIONS.filter(invOpen);
  open.forEach(i => { const cur = N.prog[i.id] || 0; if(cur >= NET_CHECKIN_CAP) return;
    const gain = Math.min(NET_CHECKIN_CAP - cur, 2 + Math.floor(Math.random()*3)); invAdd(i, gain, msgs); });
  msgs.unshift('📡 The network reports in. Informants add what they have heard (rumours only; the rest must be hunted down).');
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
function rNetwork(){
  const N = NET(), open = INVESTIGATIONS.filter(invOpen);
  const rows = open.map(i => { const p = invProg(i), capNote = p >= NET_CHECKIN_CAP && p < 100 ? ' · informants have given all they can: hunt for the rest' : '';
    return `<div class="panel"><b>${i.icon} ${i.n}</b> <span class="sm">${p}%${p>=100?' · complete':''}</span>
      <div class="bar"><div style="width:${p}%;height:8px;background:#c33;border-radius:4px"></div></div>
      <div class="sm">${i.desc}${capNote}</div>
      <div class="sm">📍 Hunt in: ${zoneNames(i.zones)}</div>
      <div class="sm">🐾 Clue-bearers: ${i.keys.map(k => ENEMIES[k] ? ENEMIES[k].icon+' '+ENEMIES[k].n : k).join(', ')} · leads found: ${N.clues[i.id]||0}</div>
      ${(N.seen[i.id]!==undefined) ? `<div class="sm" style="margin-top:4px">📝 Latest report: ${i.reports[N.seen[i.id]]}</div>` : ''}</div>`; }).join('');
  const log = N.log.length ? `<div class="panel"><b>🗒️ Recent reports</b>${N.log.map(l => `<div class="sm">${l}</div>`).join('')}</div>` : '';
  return `<div class="panel"><h3>📡 Xiyu's network</h3><div class="sm">Her informants listen in towns and on the roads. Check in once a day for rumours (they get an investigation to ${NET_CHECKIN_CAP}%); the rest comes from hunting in the relevant areas and from the leads some monsters carry. Reports are only what people have heard: the story decides what is true.</div>
    <div style="margin-top:6px"><button class="pri" ${netReady()?'':'disabled'} onclick="act(netCheckIn)">📡 Daily check-in ${netReady()?'':'(done today)'}</button></div></div>${open.length ? rows : '<div class="panel"><div class="sm">No investigations open yet.</div></div>'}${log}`;
}
