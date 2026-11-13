/* =====================================================================
   THE ICE TEMPLE ACCESS TOKEN (Volume 21 comic 011, chapter 661)
   Given on Muxue Zhiyuan's instructions. A two-way teleportation token for Xiyu and her travelling group:
     - from wherever the party is, travel to the Ice Temple;
     - from the Ice Temple, return to the place from which they last departed;
     - the Ice Temple is a place of study, research and training (library, training grounds, free rest).
     - it does NOT grant access to other Muxue clan bases.
   State: G.travel = { at:'ice_temple'|null, back:{ch, loc} }. "Where the party is" is the story location of the current chapter.
   While at the Ice Temple the Inns tab rest (The Ice Temple, free) and the Training and Temple tabs are the natural places to use; no gating is built.
   ===================================================================== */
const TOKEN_ID = 'ice_temple_token';
const hasToken = () => !!(G && G.inv && (G.inv[TOKEN_ID] || 0) > 0);
const atIceTemple = () => !!(G && typeof where === 'function' && where() === 'icetemple');
function hereLabel(){ const d = (typeof CHAPTER_DESIGN !== 'undefined') && CHAPTER_DESIGN[G.ch]; return d && d.loc ? d.loc : 'where the party stands'; }
function useToken(){
  if(!hasToken()) return ['Xiyu does not have the token yet.'];
  const w = where();
  if(w === 'world') return travelTo('icetemple');
  if(w === 'icetemple') return travelTo('world');
  return ['The token only links the Ice Temple with the world. From Muxue the party takes the boat to the Ice Temple first.'];
}
function tokenPanel(){
  if(!hasToken()) return '';
  const w = where(), back = G.travel && G.travel.back ? G.travel.back.loc : null;
  const btn = (d, label, cls) => `<button class="${cls||''}" onclick="act(()=>travelTo('${d}'))">${label}</button>`;
  const opts = w === 'world' ? btn('icetemple','❄️ Token to the Ice Temple','pri')
    : w === 'icetemple' ? btn('world','↩️ Token back to '+(back||'where we left'),'pri') + btn('muxue','⛵ Boat to Muxue (5 hours)')
    : btn('icetemple','⛵ Boat to the Ice Temple (5 hours)','pri');
  return `<div class="panel"><img class="pg" src="assets/items_token_art.webp" alt="Ice Temple Access Token" style="max-width:100%" onerror="this.style.display='none'">
    <b>❄️ Ice Temple Access Token</b>
    <div class="sm">📍 The party is at: ${whereLabel()}.${w==='icetemple' && back ? ' Last departed from: '+back+'.' : ''}</div>
    <div class="sm">The token links the world and the Ice Temple. Xiyu's boat links the Ice Temple and Muxue. Muxue's Wilds, herb spots, inn and shop are only at hand while the party is there; out in the world they are conjured in the Simulation tab instead.</div>
    <div style="margin-top:6px">${opts}${w==='icetemple' ? `<button onclick="showTab('inns')">🍵 Rest here (free)</button><button onclick="showTab('training')">🥋 Simulation</button>` : ''}</div></div>`;
}

/* the story puts the party at the Ice Temple when the token is given (chapter 661); old saves and the dev jump catch up too */
function arriveIceTemple(){
  if(!G || (G.travel && G.travel.at) || G.ch >= 675) return;   // the party leaves the temple in chapter 675
  const d = (typeof CHAPTER_DESIGN !== 'undefined') && CHAPTER_DESIGN[660];
  G.travel = {at:'ice_temple', back:{ch:660, loc:(d && d.loc) || 'Muxue Harbour'}}; G.where = 'icetemple';
}
