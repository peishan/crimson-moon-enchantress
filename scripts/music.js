/* =====================================================================
   MUSIC (Pixabay free music clips, personal project)
   Ten tracks in assets/music/ (re-encoded to 96 kbps MP3). Each SCENE plays one track; the scene follows the screen the player is on and where the party is.
   The player's choices (on/off, volume, which track for which scene) are kept in localStorage, not in the save file. Playback starts after the first tap or key press
   (browsers do not allow sound before that). Music pauses while the page is hidden. Tracks crossfade.
   TRIBAL DRUMS are kept for later: the Tuoba Jingheng and Ya'Xing arcs (scene 'tribal', not triggered by anything yet; call musicForce('tribal') when those arcs exist).
   ===================================================================== */
const MUSIC_TRACKS = {
  kaze_no_kioku:    {n:'Kaze no Kioku (Memory of the Wind)', by:'Kaazoom'},
  kokoro_no_yume:   {n:'Kokoro no Yume (Dream of the Heart)', by:'Kaazoom'},
  rakuen_no_tsubasa:{n:'Rakuen no Tsubasa (Wings of Paradise)', by:'Kaazoom'},
  wandering_light:  {n:'The Wandering Light', by:'Kaazoom'},
  ancient_forest:   {n:'Shadow of the Ancient Forest', by:'Kaazoom'},
  cosmic_pond:      {n:'Cosmic Pond of Arcane Waterfowl', by:'SunSpellAuditory'},
  ruins:            {n:'Ruins', by:'Nojisuma'},
  abyssal_eclipse:  {n:'Abyssal Eclipse: Demon\'s Bane', by:'PhatPhrogStudio'},
  raining_village:  {n:'Raining Village', by:'Giri'},
  tribal_drums:     {n:'RPG Tribal Drumming Atmosphere 01', by:'VJGalaxy'},
};
const MUSIC_SCENES = {   // scene: [label, default track]
  journal:     ['Journal and menus', 'kaze_no_kioku'],
  home:        ['Bases (Muxue and Yilong)', 'rakuen_no_tsubasa'],
  story:       ['Reading the story', 'kokoro_no_yume'],
  story25:     ['Reading Volume 25 (the forgotten presence)', 'cosmic_pond'],
  wilds_muxue: ['Wilds on Muxue Island', 'ancient_forest'],
  wilds_world: ['Wilds out in the world', 'wandering_light'],
  icetemple:   ['Ice Temple, shrines and simulation', 'ruins'],
  rest:        ['Inns and rest', 'raining_village'],
  battle:      ['Battles', 'abyssal_eclipse'],
  tribal:      ['Tuoba Jingheng and Ya\'Xing arcs (reserved)', 'tribal_drums'],
};
let MUS = {on:true, vol:.35, map:{}};
try{ const s = JSON.parse(localStorage.getItem('cm_music') || 'null'); if(s){ MUS.on = s.on !== false; MUS.vol = typeof s.vol === 'number' ? Math.min(1, Math.max(0, s.vol)) : .35; MUS.map = s.map || {}; } }catch(e){}
const musicSave = () => { try{ localStorage.setItem('cm_music', JSON.stringify(MUS)); }catch(e){} };
let musArmed = false, musEl = null, musTrack = null, musForced = null, musFade = null;

function musicScene(){
  if(musForced) return musForced;
  if(typeof S !== 'undefined' && S && S.mode === 'read') return (S.n >= VOL25_START && S.n < VOL25_START + 40) ? 'story25' : 'story';
  if(typeof B !== 'undefined' && B && tab === 'battle') return 'battle';
  const w = (typeof where === 'function' && G && G.party) ? where() : 'muxue';
  if(tab === 'wilds' || tab === 'skirmish' || tab === 'herbal') return w === 'world' ? 'wilds_world' : w === 'icetemple' ? 'icetemple' : 'wilds_muxue';
  if(tab === 'inns') return 'rest';
  if(tab === 'temple' || tab === 'training') return 'icetemple';
  if(tab === 'base'){ try{ return curBase().id === 'icetemple' ? 'icetemple' : 'home'; }catch(e){ return 'home'; } }
  return 'journal';
}
const musicTrackFor = scene => { const t = MUS.map[scene] || MUSIC_SCENES[scene][1]; return MUSIC_TRACKS[t] ? t : MUSIC_SCENES[scene][1]; };
function musicSetEl(id){
  const old = musEl, el = new Audio('assets/music/'+id+'.mp3'); el.loop = true; el.volume = 0; el.preload = 'auto';
  musEl = el; musTrack = id;
  const p = el.play(); if(p && p.catch) p.catch(() => {});
  musicFadeTo(el, MUS.vol, 1200);
  if(old) musicFadeTo(old, 0, 1200, () => { try{ old.pause(); old.src = ''; }catch(e){} });
}
function musicFadeTo(el, target, ms, done){
  const from = el.volume, t0 = Date.now(); clearInterval(el._f);
  el._f = setInterval(() => { const k = Math.min(1, (Date.now() - t0)/ms); try{ el.volume = Math.min(1, Math.max(0, from + (target - from)*k)); }catch(e){} if(k >= 1){ clearInterval(el._f); if(done) done(); } }, 60);
}
function musicSync(){
  const btn = document.getElementById('musicbtn'); if(btn) btn.textContent = MUS.on ? '🔊' : '🔇';
  if(!musArmed) return;
  if(!MUS.on || document.hidden){ if(musEl){ musicFadeTo(musEl, 0, 400, () => { try{ musEl.pause(); }catch(e){} }); } return; }
  const id = musicTrackFor(musicScene());
  if(id !== musTrack || !musEl){ musicSetEl(id); return; }
  if(musEl.paused){ const p = musEl.play(); if(p && p.catch) p.catch(() => {}); }
  musicFadeTo(musEl, MUS.vol, 400);
}
function musicToggle(){ MUS.on = !MUS.on; musArmed = true; musicSave(); musicSync(); if(typeof tab !== 'undefined' && tab === 'save') render(); }
function musicVol(v){ MUS.vol = Math.min(1, Math.max(0, v/100)); musicSave(); if(musEl && MUS.on) musEl.volume = MUS.vol; }
function musicPick(scene, id){ MUS.map[scene] = id; musicSave(); musicSync(); }
function musicForce(scene){ musForced = scene || null; musicSync(); }   // for arcs that want a fixed track; musicForce(null) releases it
function musicPreview(id){ musArmed = true; musForced = null; MUS.on = true; musicSave(); musicSetEl(id); musTrack = id; }
['pointerdown','keydown','touchstart'].forEach(ev => document.addEventListener(ev, () => { if(!musArmed){ musArmed = true; musicSync(); } }, {passive:true}));
document.addEventListener('visibilitychange', () => musicSync());
window.addEventListener('load', () => { const r0 = render; render = function(){ r0(); try{ musicSync(); }catch(e){} }; musicSync(); });

function rMusicPanel(){
  const opts = sel => Object.keys(MUSIC_TRACKS).map(k => `<option value="${k}" ${k===sel?'selected':''}>${MUSIC_TRACKS[k].n}</option>`).join('');
  const rows = Object.keys(MUSIC_SCENES).map(sc => { const cur = musicTrackFor(sc);
    return `<div class="ev"><div><b>${MUSIC_SCENES[sc][0]}</b></div><select onchange="musicPick('${sc}', this.value)">${opts(cur)}</select> <button onclick="musicPreview(musicTrackFor('${sc}'))" title="Play now">▶</button></div>`; }).join('');
  const credits = Object.keys(MUSIC_TRACKS).map(k => `${MUSIC_TRACKS[k].n} · ${MUSIC_TRACKS[k].by}`).join('<br>');
  return `<div class="panel"><h3>🎵 Music</h3>
    <div class="sm">Free music clips from Pixabay. Each screen plays one track; choose which below. The choice is kept on this device.</div>
    <div style="margin:6px 0"><button class="${MUS.on?'pri':''}" onclick="musicToggle()">${MUS.on ? '🔊 Music on' : '🔇 Music off'}</button>
    <label class="sm" style="margin-left:8px">Volume <input type="range" min="0" max="100" value="${Math.round(MUS.vol*100)}" oninput="musicVol(+this.value)" style="vertical-align:middle"></label></div>
    ${rows}<details><summary class="sm">Credits (Pixabay)</summary><div class="sm">${credits}</div></details></div>`;
}
