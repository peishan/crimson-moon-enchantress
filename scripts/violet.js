/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — XIYU'S VIOLET BASE
   An established part of Xiyu's network (named by Xiyu in Volume 22 comic 005, chapter 680: "I'll leave instructions with my Violet base members. If we need
   to contact you, they'll come to the Zhan Manor to deliver the message."). It is NOT a new base Xiyu builds: it has run for a long time. Where it stands is not
   stated by the story, so none is given here.
   Personnel are PROPOSALS (author, not locked canon): Zi Lan (Base Keeper), Lin Yue (Intelligence), Su He (Quartermaster), Bai Zhi (Medical), Qing Luo (Messengers),
   Feng Rui (Field Operative). They are loyal to Xiyu personally; most are not combatants (intelligence, logistics and communications matter as much).
   Operation: Xiyu leaves STANDING ORDERS with the Base Keeper; the base keeps working without her and each network check-in brings a small result from the chosen
   focus; urgent news is delivered to the Zhan Manor in Yilong (the Messages list). Everything here is optional gameplay: no story is revealed.
   Opens at chapter 680. Save data: G.violet = {order:'intel'|'supply'|'medical'|'messengers'|'field'|null, msgs:[{d,t}]}.
   ===================================================================== */
const VIOLET_OPEN = 429;   // the Violet Base IS Xiyu's Yilong base: her operational base, with hired staff, from the day she buys the residence (name 'Violet' is said aloud in chapter 680)
const VIOLET_STAFF = [
  {id:'zilan', n:'Zi Lan', zh:'紫兰', icon:'🪻', pos:'Base Keeper', spec:'Overall administration', note:'Runs the Violet Base in Xiyu\'s absence and takes her standing orders. Calm, exacting and loyal to Xiyu personally.', order:null},
  {id:'linyue', n:'Lin Yue', zh:'林月', icon:'🌙', pos:'Intelligence Officer', spec:'Information gathering', note:'Gathers rumours, records and reports for Xiyu\'s investigations.', order:'intel'},
  {id:'suhe', n:'Su He', zh:'苏禾', icon:'🌾', pos:'Quartermaster', spec:'Supplies and finances', note:'Keeps the stores and the accounts; the base never runs short.', order:'supply'},
  {id:'baizhi', n:'Bai Zhi', zh:'白芷', icon:'🌿', pos:'Medical Keeper', spec:'Medicine and healing', note:'Prepares remedies and tends the base\'s sick and injured.', order:'medical'},
  {id:'qingluo', n:'Qing Luo', zh:'青萝', icon:'🕊️', pos:'Messenger Coordinator', spec:'Communications', note:'Runs the couriers and carries urgent word to wherever Xiyu is, including the Zhan Manor in Yilong.', order:'messengers'},
  {id:'donglin', n:'Zhan Donglin', zh:'', icon:'🛡️', pos:'Caretaker', spec:'The house and its guests', from:VOL15_START, note:'Dongyue\'s younger brother, a trained trade escort. He takes over as caretaker of the Yilong base: he keeps the house, watches the door and makes guests welcome. (Chapter of arrival is provisional: author to confirm.)', order:null},
  {id:'fengrui', n:'Feng Rui', zh:'风蕊', icon:'🍃', pos:'Field Operative', spec:'Outside assignments', note:'Takes assignments beyond the base: errands, scouting and quiet inquiries.', order:'field'},
];
const VIOLET_ORDERS = {
  intel:{n:'Gather intelligence', who:'Lin Yue', d:'Each check-in adds a little to the investigations that are open (+2%, up to the informants\' limit).'},
  supply:{n:'Stock the stores', who:'Su He', d:'Each check-in brings extra gold from the base\'s accounts.'},
  medical:{n:'Prepare remedies', who:'Bai Zhi', d:'Each check-in brings a tonic or a herb.'},
  messengers:{n:'Widen the courier lines', who:'Qing Luo', d:'Each check-in has a better chance of bringing a rumour or a lead for the Dark Shrines.'},
  field:{n:'Outside assignments', who:'Feng Rui', d:'Each check-in brings a small field report: gold, and sometimes a material.'},
};
const violetOpen = () => !!G && G.ch >= VIOLET_OPEN;
const VIO = () => (G.violet = G.violet || {order:null, msgs:[]});
Object.assign(BASES.find(b => b.id === 'yilong'), {n:'Yilong Base', icon:'🪻',
  hall:'Xiyu\'s operational base in Yilong, known to her people as the Violet Base: a residence with a study, a secure communication room and the staff she has hired. It keeps running while she travels, and it is separate from the Zhan Manor (Dongyue\'s residence, where the party often stays) and from Yun He\'s sanctuary. Its people are loyal to her personally; intelligence, supplies and communications matter as much to it as anything done with a sword. Guests may stay here with nothing asked of them or of her.',
  comms:'Xiyu leaves standing orders with the Base Keeper, and the courier lines carry word both ways. Urgent messages from the base are delivered to the Zhan Manor, Dongyue\'s residence, when Xiyu is staying there.'});
BASE_SECTIONS.push(['violet_staff','👥 Staff'],['violet_orders','📋 Standing Orders']);
Object.assign(BASE_ONLY, {violet_staff:'yilong', violet_orders:'yilong'});

const VIOLET_MSGS = [
  'Qing Luo: a courier reached the Zhan Manor with a sealed note: nothing urgent, only the base\'s weekly report.',
  'Zi Lan: the base is in order. The storerooms were counted and the accounts balance.',
  'Lin Yue: a trader mentioned a rumour about old charts and unnamed coasts; she is collecting what else is said.',
  'Su He: prices at the Yilong market have risen a little; the stores were topped up before they did.',
  'Bai Zhi: a batch of remedies has been prepared and shelved; the base needs nothing.',
  'Feng Rui: a quiet errand in the next town is done. Nothing to report beyond a good price on lamp oil.',
];
function violetSetOrder(k){
  if(!violetOpen()) return ['The Violet Base is not part of the story yet.'];
  if(!VIOLET_ORDERS[k]) return [];
  VIO().order = k; save();
  return ['📋 Xiyu leaves standing orders with Zi Lan: '+VIOLET_ORDERS[k].n+' ('+VIOLET_ORDERS[k].who+').'];
}
function violetClearOrder(){ VIO().order = null; save(); return ['📋 Xiyu withdraws her standing orders; the base keeps to its ordinary routine.']; }
/* called from the network's daily check-in (scripts/network.js) */
function violetOnCheckIn(msgs){
  if(!violetOpen()) return;
  const v = VIO(), o = v.order;
  if(o === 'intel'){ INVESTIGATIONS.filter(invOpen).forEach(i => { if((NET().prog[i.id]||0) < NET_CHECKIN_CAP) invAdd(i, 2, msgs); }); msgs.push('🪻 Lin Yue\'s reports add to the open investigations.'); }
  if(o === 'supply'){ const g = 15 + Math.round(avgPartyLv()*.1); G.gold += g; msgs.push('🪻 Su He\'s accounts bring +'+g+'g.'); }
  if(o === 'medical'){ const it = ['herbal_tonic','frost_herb','moon_petal'][Math.floor(Math.random()*3)]; addItems([{id:it, qty:1}]); msgs.push('🪻 Bai Zhi sends a remedy: '+ITEMS[it].icon+' '+ITEMS[it].n+'.'); }
  if(o === 'messengers' && Math.random() < .5){ if(typeof shrineOnCheckIn === 'function') shrineOnCheckIn(msgs); msgs.push('🪻 Qing Luo\'s couriers bring extra word from the roads.'); }
  if(o === 'field'){ const g = 10 + Math.round(avgPartyLv()*.08); G.gold += g; let t = '🪻 Feng Rui\'s field report: +'+g+'g'; if(Math.random() < .35){ const it = ['frost_herb','ice_crystal','imp_ash'][Math.floor(Math.random()*3)]; addItems([{id:it, qty:1}]); t += ' and a '+ITEMS[it].n; } msgs.push(t+'.'); }
  if(Math.random() < .3){ const m = VIOLET_MSGS[Math.floor(Math.random()*VIOLET_MSGS.length)]; v.msgs = [{d:G.day, t:m}].concat(v.msgs||[]).slice(0,8); msgs.push('✉️ A message is delivered to the Zhan Manor from the Violet Base.'); }
}
function rVioletSection(k){
  if(k === 'violet_staff'){
    const rows = VIOLET_STAFF.filter(m => !m.from || G.ch >= m.from).map(m => `<div class="card" style="cursor:default"><span class="big">${m.icon}</span><div class="fl"><b>${m.n} ${m.zh||''}</b> <span class="sm">${m.pos}</span><div class="sm">Specialty: ${m.spec}</div><div class="sm">${m.note}</div></div></div>`).join('');
    return `<div class="panel"><b>🪻 The Violet Base</b><div class="sm">An established organisation Xiyu has built over time. Names and roles are proposals (not locked canon): individual histories and personalities are for when each member is introduced. Not everyone is a fighter.</div></div>
      <div class="panel"><b>Organisation</b><div class="sm">Founder and Principal: <b>Muxue Xiyu</b> (owner and ultimate authority)<br>└ <b>Zi Lan 紫兰</b>, Violet Base Keeper<br>&nbsp;&nbsp;├ Lin Yue 林月: Intelligence<br>&nbsp;&nbsp;├ Su He 苏禾: Supplies<br>&nbsp;&nbsp;├ Bai Zhi 白芷: Medical<br>&nbsp;&nbsp;├ Qing Luo 青萝: Communications<br>&nbsp;&nbsp;└ Feng Rui 风蕊: Field operations</div></div>${rows}`;
  }
  if(k === 'violet_orders'){
    const v = VIO(), cur = v.order, msgs = (v.msgs||[]).map(m => `<div class="sm">✉️ Day ${m.d}: ${m.t}</div>`).join('');
    const opts = Object.keys(VIOLET_ORDERS).map(o => `<div class="ev"><div><b>${VIOLET_ORDERS[o].n}</b> <span class="sm">(${VIOLET_ORDERS[o].who})</span><div class="sm">${VIOLET_ORDERS[o].d}</div></div><button class="${cur===o?'pri':''}" onclick="act(()=>violetSetOrder('${o}'))">${cur===o?'Active':'Order'}</button></div>`).join('');
    return `<div class="panel"><b>📋 Standing orders</b><div class="sm">Before travelling, Xiyu can leave instructions with the Base Keeper. The base keeps running without her and each daily network check-in brings a small result from the chosen focus. Orders can be changed any time. ${cur ? 'Current: <b>'+VIOLET_ORDERS[cur].n+'</b>.' : 'No order is set.'}</div>${cur ? `<button onclick="act(violetClearOrder)">Withdraw the order</button>` : ''}</div>${opts}
      <div class="panel"><b>✉️ Delivered to the Zhan Manor</b><div class="sm">Urgent messages from the base are delivered to the Zhan Manor, Dongyue\'s residence in Yilong, where the party stays as guests.</div>${msgs || '<div class="sm">No messages yet. Check in daily at the network.</div>'}</div>`;
  }
  return '';
}
