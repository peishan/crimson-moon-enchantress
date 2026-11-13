/* =====================================================================
   XIYU'S HOUSEHOLDS: guests at the Yilong base, and the people who work for Xiyu at the Crimson Fairy / Muxue base
   YILONG BASE (the Violet Base): Xiyu's operational base with hired staff (scripts/violet.js). Guests may reside here, as in Tribute's homes, with NOTHING required of
     either side: no fee, no upkeep, no mood to manage, no work asked of them. They arrive now and then, may stay as long as they like and may leave when they like.
     The host is Zi Lan, and Zhan Donglin from his arrival (caretaker). Story guests can be added with addGuest(). Rooms: 4. State: G.guests = [{n, note, day}].
   MUXUE BASE / CRIMSON FAIRY: a list of the people who work for Xiyu there (MUXUE_STAFF). Seeded with Sister Qing only; the author's full list is added by editing the table.
   ===================================================================== */
const GUEST_ROOMS = 4;
const GUEST_POOL = [
  ['a travelling herbalist', 'is on the way to the western markets and was glad of a dry room.'],
  ['a scribe between posts', 'asked for a quiet table and a lamp, and has been copying old letters ever since.'],
  ['a retired caravan guard', 'knew a cousin of someone on the staff and was waved in.'],
  ['a young apprentice', 'is in Yilong for a season of study and needs somewhere to sleep.'],
  ['a widow from the river towns', 'came to see a physician and found the base kinder than the inns.'],
  ['a lantern-maker', 'trades by day and sleeps here at night, leaving small gifts on the kitchen shelf.'],
];
const GUEST_NAMES = ['Wen Qiao','Hu Ming','Lan Sheng','Tao Yi','Ru Mei','Jian Pu','An Xi','Gu Rong'];
const guestList = () => G.guests = G.guests || [];
function addGuest(n, note){ if(guestList().length >= GUEST_ROOMS) return false; guestList().push({n, note:note||'', day:G.day}); return true; }
const houseHost = () => (G.ch >= VOL15_START ? 'Zhan Donglin' : 'Zi Lan');
function guestsOnCheckIn(msgs){
  if(!G || G.ch < 429) return;
  const l = guestList();
  if(l.length < GUEST_ROOMS && Math.random() < .35){
    const [job, note] = AR(GUEST_POOL), n = AR(GUEST_NAMES); if(l.some(x => x.n === n)) return;
    l.push({n:n+', '+job, note:n.split(' ')[0]+' '+note, day:G.day}); msgs.push('🏮 A guest has arrived at the Yilong base: '+n+', '+job+'. '+houseHost()+' has shown them to a room.');
  } else if(l.length && Math.random() < .12){ const g = l.splice(Math.floor(Math.random()*l.length), 1)[0]; msgs.push('🏮 '+g.n.split(',')[0]+' thanked '+houseHost()+' and moved on.'); }
}
function guestFarewell(i){ const g = guestList().splice(i,1)[0]; save(); return g ? [g.n.split(',')[0]+' says goodbye, with thanks.'] : []; }
function guestInvite(){ if(guestList().length >= GUEST_ROOMS) return ['Every guest room is taken.']; const n = AR(GUEST_NAMES), [job, note] = AR(GUEST_POOL); if(guestList().some(x => x.n.indexOf(n) === 0)) return ['Nobody new answers just now.']; addGuest(n+', '+job, n.split(' ')[0]+' '+note); save(); return [n+' accepts a room.']; }

const MUXUE_STAFF = [
  {id:'sisterqing', n:'Sister Qing', icon:'🌸', pos:'The Crimson Fairy\'s staff', note:'Has worked at the Crimson Fairy since Volume 1. Keeps the rooms, the kitchen and the hall for Xiyu\'s party. (More staff to be added from the author\'s list; the caretaker of the Muxue base is still to be established.)'},
];
const MUXUE_STAFF_OPEN = 409;
BASE_SECTIONS.push(['yilong_guests','🛏️ Guests'],['muxue_staff','👥 Staff']);
Object.assign(BASE_ONLY, {yilong_guests:'yilong', muxue_staff:'muxue'});

function rHouseSection(k){
  if(k === 'yilong_guests'){
    const l = guestList(), rows = l.map((g,i) => `<div class="ev"><div><b>🛏️ ${g.n}</b><div class="sm">${g.note} Since day ${g.day}.</div></div><button onclick="act(()=>guestFarewell(${i}))">Say goodbye</button></div>`).join('');
    return `<div class="panel"><b>🏮 Guests of the Yilong base</b><div class="sm">Guests may stay here with nothing required from Xiyu or from them: no fee, no upkeep and no favours owed. ${houseHost()} looks after the house. ${l.length}/${GUEST_ROOMS} rooms in use.</div>
      <div style="margin-top:6px"><button ${l.length<GUEST_ROOMS?'':'disabled'} onclick="act(guestInvite)">Offer a room</button></div></div>${rows || '<div class="sm">No guests at the moment. Travellers arrive now and then; the daily network check-in notices them.</div>'}`;
  }
  if(k === 'muxue_staff'){
    return `<div class="panel"><b>👥 Who works for Xiyu here</b><div class="sm">The people who keep the Crimson Fairy and the Muxue base running.</div></div>` + MUXUE_STAFF.map(m => `<div class="card" style="cursor:default"><span class="big">${m.icon}</span><div class="fl"><b>${m.n}</b> <span class="sm">${m.pos}</span><div class="sm">${m.note}</div></div></div>`).join('');
  }
  return '';
}
