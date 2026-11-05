/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — FLEET (story and display only)
   A "⛵ Fleet" section in the Bases tab listing the party's ships. Nothing here changes gameplay: no travel, upgrades or battles yet.
   To add a ship or change a name, edit SHIPS below. `open` = chapter whose completion makes the entry visible; `status` is shown as-is
   (use `statusFrom` to change it at a later chapter: [{ch, status, note}], the latest one reached wins).
   NAMES ARE PLACEHOLDERS: the author has not named either ship yet.
   Ideas kept for later (not built): sea routes and ports, ship upgrades and crew, ship-fed network rumours, the Sage's Compass as a crossing key.
   ===================================================================== */
const SHIPS = [
  {id:'zhan', n:'The Zhan Family Vessel', icon:'⛵', open:599, owner:'Zhan Yihai and family', port:'Yilong harbour',
   status:'Sailing with the party', cls:'Merchant galleon',
   desc:'Yihai\'s family ship, owned long enough to weather more storms than he can count. Donglin used it to escape and bring himself home after the attack; Dongyue now captains it with Yihai advising and Ya\'Xing as first officer. It carried the party across the Puying waters, through the passage to Lunareth in Dragonvale and back to Sanggui. It is meant to become the party\'s new fleet.',
   crew:['Captain: Zhan Dongyue','Advisor: Zhan Yihai','First officer: Ya\'Xing'], tags:['Puying-worthy','Passage-tested'],
   statusFrom:[{ch:608, status:'Docked at Sanggui', note:'Returned from Lunareth with the Sage\'s Compass aboard.'}]},
  {id:'dongyue', n:'Dongyue\'s Ship', icon:'🚢', open:599, owner:'Zhan Dongyue', port:'Muxue / Yunling (to be confirmed)',
   status:'Left behind', cls:'Sea vessel',
   desc:'The ship Dongyue sailed to Muxue Island, when the water pulled it, the compass jerked and the calm sea gave way to the snowfield. It was left behind at Muxue (or Yunling) and has not been used since.',
   crew:['Unattended'], tags:['Moored','Not in use']},
];
const fleetOpen = () => SHIPS.some(s => G.ch >= s.open);
function shipStatus(s){ let st = {status:s.status, note:''}; (s.statusFrom||[]).forEach(x => { if(G.ch >= x.ch) st = x; }); return st; }
function rFleet(){
  const vis = SHIPS.filter(s => G.ch >= s.open);
  return vis.length ? `<div class="panel"><b>⛵ Fleet</b><div class="sm">The ships that belong to the party and its families. Display only for now: nothing here changes the game.</div></div>` +
    vis.map(s => { const st = shipStatus(s);
      return `<div class="panel"><h3>${s.icon} ${s.n}</h3>
        <div class="sm">${s.cls} · Owner: ${s.owner}</div>
        <div class="sm">⚓ ${s.port} · <b>${st.status}</b>${st.note ? ' — '+st.note : ''}</div>
        <div class="sm" style="margin-top:4px">${s.desc}</div>
        <div class="sm" style="margin-top:4px">👥 ${s.crew.join(' · ')}</div>
        <div class="sm">${s.tags.map(t => '🏷️ '+t).join(' · ')}</div></div>`; }).join('')
    : '<div class="panel"><div class="sm">No ships yet.</div></div>';
}
