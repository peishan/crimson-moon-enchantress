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
const atIceTemple = () => !!(G && G.travel && G.travel.at === 'ice_temple');
function hereLabel(){ const d = (typeof CHAPTER_DESIGN !== 'undefined') && CHAPTER_DESIGN[G.ch]; return d && d.loc ? d.loc : 'where the party stands'; }
function useToken(){
  if(!hasToken()) return ['Xiyu does not have the token yet.'];
  G.travel = G.travel || {at:null, back:null};
  if(atIceTemple()){
    const back = G.travel.back ? G.travel.back.loc : 'where they last departed';
    G.travel.at = null; save();
    return ['❄️ The token glows and the party returns to '+back+'.'];
  }
  G.travel.back = {ch:G.ch, loc:hereLabel()}; G.travel.at = 'ice_temple'; save();
  return ['❄️ The token glows and the party arrives at the Ice Temple. The library, the research halls and the training grounds are open to them, and the guest quarters are free. (Last departed from: '+G.travel.back.loc+'.)'];
}
function tokenPanel(){
  if(!hasToken()) return '';
  const at = atIceTemple(), back = G.travel && G.travel.back ? G.travel.back.loc : null;
  return `<div class="panel"><img class="pg" src="assets/items_token_art.webp" alt="Ice Temple Access Token" style="max-width:100%" onerror="this.style.display='none'">
    <b>❄️ Ice Temple Access Token</b>
    <div class="sm">${at ? '📍 The party is at the Ice Temple. Last departed from: '+back+'.' : '📍 The party is at: '+hereLabel()+'.'}</div>
    <div class="sm">A two-way teleportation token for Xiyu and her travelling group: to the Ice Temple, and back to the place they last departed. Library, research and training grounds. It does not open other Muxue clan bases.</div>
    <div style="margin-top:6px"><button class="pri" onclick="act(useToken)">${at ? '↩️ Return to '+(back||'where we left') : '❄️ Travel to the Ice Temple'}</button>
    ${at ? `<button onclick="showTab('inns')">🍵 Rest here (free)</button><button onclick="showTab('training')">🥋 Training</button>` : ''}</div></div>`;
}

/* the story puts the party at the Ice Temple when the token is given (chapter 661); old saves and the dev jump catch up too */
function arriveIceTemple(){
  if(!G || (G.travel && G.travel.at)) return;
  const d = (typeof CHAPTER_DESIGN !== 'undefined') && CHAPTER_DESIGN[660];
  G.travel = {at:'ice_temple', back:{ch:660, loc:(d && d.loc) || 'Muxue Harbour'}};
}
