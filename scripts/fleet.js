/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — FLEET (story and display only)
   A "⛵ Fleet" section in the Bases tab listing the party's ships. Nothing here changes gameplay: no travel, upgrades or battles yet.
   To add a ship or change a name, edit SHIPS below. `open` = chapter whose completion makes the entry visible; `status` is shown as-is
   (use `statusFrom` to change it at a later chapter: [{ch, status, note}], the latest one reached wins).
   Names and details follow the author's Ship Reference sheet (assets/cast/ship_reference.webp).
   Ideas kept for later (not built): sea routes and ports, ship upgrades and crew, ship-fed network rumours, the Sage's Compass as a crossing key.
   ===================================================================== */
const SHIPS = [
  {id:'dongyue', n:'Dongyue\'s Ship · Zhan Family Vessel', icon:'🐉', open:599, owner:'Zhan Dongyue (the Zhan family)', port:'Left behind at Muxue / Yunling',
   status:'Left behind', cls:'Expedition / combat-ready ship',
   desc:'The main vessel used by Zhan Dongyue: a large, sturdy multi-deck ship for long-distance travel, exploration and expeditions, with a dragon figurehead and crimson sails bearing the Zhan dragon banner. A reinforced hull and long-range design suit harsh routes (the Ice Temple, for one). It sailed to Muxue Island in the Volume 1 flashback (the water pulled it and the compass jerked) and was left behind. It can be activated by a member of the Zhan family: Dongyue, Donglin, Qiumin or Yihai.',
   crew:['Unattended (activation: Zhan family)'], tags:['Zhan activation mechanism','Reinforced hull','Long-range'],
   statusFrom:[{ch:660, status:'In use: carrying the Ice Temple expedition', port:'Muxue Harbour to the Ice Temple', note:'Zhilei boards at Muxue Harbour; a spiritual disturbance at sea.'},{ch:661, status:'Moored near the Ice Temple', port:'The Ice Temple', note:'Arrived with the expedition.'}],
   areas:'Command Deck (navigation and activation) · Main Cabin (planning and discussion) · Passenger Quarters (travelling party)'},
  {id:'zhan', n:'Yihai\'s Merchant Ship', icon:'⛵', open:599, owner:'Zhan Yihai', port:'Yilong harbour',
   status:'Sailing with the party', cls:'Merchant / trade ship',
   desc:'The merchant vessel owned by Zhan Yihai: a large multi-deck cargo ship used for trade, transport and diplomatic travel, also capable of long journeys, with cream sails bearing the Zhan flower crest. Large cargo holds and comfortable travel quarters suit trade routes and group journeys. Donglin used it to escape and bring himself home; Dongyue now captains it with Yihai advising and Ya\'Xing as first officer. It carried the party across the Puying waters, through the passage to Lunareth in Dragonvale and back to Sanggui. It is meant to become the party\'s new fleet. Like the other, it can be activated by a member of the Zhan family.',
   face:'assets/party/yihai.webp', faceName:'Zhan Yihai',
   crew:['Captain: Zhan Dongyue','Advisor: Zhan Yihai','First officer: Ya\'Xing'], tags:['Puying-worthy','Passage-tested','Zhan activation mechanism'],
   areas:'Cargo Hold (trade goods and supplies) · Merchant Hall (meetings and transactions) · Guest Quarters (travellers and escorts)',
   statusFrom:[{ch:608, status:'Docked at Sanggui', note:'Returned from Lunareth with the Sage\'s Compass aboard.'}]},
  {id:'xiyu', n:'Xiyu\'s Boat', icon:'🛶', open:599, owner:'Muxue Xiyu', port:'Muxue',
   status:'Separate; Xiyu\'s personal vessel', cls:'Personal boat',
   desc:'Xiyu\'s own boat is separate from the Zhan ships and remains her personal vessel, activated by Xiyu, Muxue Yan and their future children. The ability to reach the Ice Temple does not come from the boat being magical but from Xiyu\'s bloodline: any voyage to the Ice Temple requires Xiyu to be present.',
   crew:['Activation: Xiyu, Muxue Yan and their future children'], tags:['Bloodline-activated','Ice Temple route'], areas:''},
];
const fleetOpen = () => SHIPS.some(s => G.ch >= s.open);
function shipStatus(s){ let st = {status:s.status, note:''}; (s.statusFrom||[]).forEach(x => { if(G.ch >= x.ch) st = x; }); return st; }
function rFleet(){
  const vis = SHIPS.filter(s => G.ch >= s.open);
  return vis.length ? `<div class="panel"><b>⛵ Fleet</b><div class="sm">The ships that belong to the party and its families. Display only for now: nothing here changes the game.</div></div>` +
    vis.map(s => { const st = shipStatus(s);
      return `<div class="panel"><h3>${s.icon} ${s.n}</h3>
        <div class="sm">${s.cls} · Owner: ${s.owner}</div>
        ${s.face ? `<img src="${s.face}" alt="${s.faceName||''}" style="width:56px;height:56px;border-radius:50%;float:right;margin-left:8px">` : ''}<div class="sm">⚓ ${st.port||s.port} · <b>${st.status}</b>${st.note ? ' — '+st.note : ''}</div>
        <div class="sm" style="margin-top:4px">${s.desc}</div>
        <div class="sm" style="margin-top:4px">👥 ${s.crew.join(' · ')}</div>
        <div class="sm">${s.tags.map(t => '🏷️ '+t).join(' · ')}</div>${s.areas ? `<div class="sm">🚪 ${s.areas}</div>` : ''}</div>`; }).join('') + `<div class="panel"><img class="pg" src="assets/cast/ship_reference.webp" alt="Ship Reference"></div>`
    : '<div class="panel"><div class="sm">No ships yet.</div></div>';
}
