/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — SAVE DATA (same options as Tribute / Daybreak: Crimson Tide)
   Local save (localStorage) · Export / Import JSON file · GitHub Gist backup (push / pull)
   The Gist token is stored only on this device and sent only to api.github.com.
   ===================================================================== */
const GIST_CREDS_KEY = 'crimson_moon_gist_creds', GIST_FILENAME = 'crimson-moon-save.json';
let saveStatus = '';
const setStatus = m => { saveStatus = m; const el = document.getElementById('gistStatusMsg'); if(el) el.textContent = m; };

function gistCreds(){ try{ return Object.assign({token:'', gistId:'', lastSync:null}, JSON.parse(localStorage.getItem(GIST_CREDS_KEY))||{}); }catch(e){ return {token:'', gistId:'', lastSync:null}; } }
function putGistCreds(c){ try{ localStorage.setItem(GIST_CREDS_KEY, JSON.stringify(c)); }catch(e){} }

/* ---- validate + apply a save object (shared by Import and Gist pull) ---- */
const looksLikeSave = d => d && typeof d==='object' && d.units && Array.isArray(d.party) && d.party.includes('xiyu');
function applySave(d){
  if(!looksLikeSave(d)) throw new Error('That does not look like a Crimson Moon save.');
  localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(d));
  if(!load()) throw new Error('Save could not be loaded.');
  B = null; openCh = null; save();
}

/* ---- local ---- */
function saveNow(){ save(); setStatus('Saved on this device ('+new Date().toLocaleTimeString()+').'); toast('Saved'); }
function exportSave(){
  save();
  const blob = new Blob([JSON.stringify(G, null, 2)], {type:'application/json'}), url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = 'crimson-moon-save-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  setStatus('Save exported.'); toast('Save exported');
}
function importSave(ev, fromLanding){
  const f = ev.target.files && ev.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      if(!fromLanding && !confirm('Importing replaces the save on this device. Continue?')) return;
      applySave(JSON.parse(r.result));
      if(fromLanding){ enter(false); } else { setStatus('Save imported.'); render(); }
      toast('Save imported');
    }catch(e){ toast(e.message || 'Could not import that file.'); }
    ev.target.value = '';
  };
  r.readAsText(f);
}
function newGameFromSave(){
  if(!confirm('Start a new game? All progress on this device will be lost (a Gist backup is kept).')) return;
  localStorage.removeItem(CFG.SAVE_KEY); location.reload();
}

/* ---- GitHub Gist ---- */
function saveGistCredsFromForm(){
  const c = gistCreds(), t = $('gistTokenInput').value.trim(), i = $('gistIdInput').value.trim();
  if(t) c.token = t; if(i) c.gistId = i; putGistCreds(c);
  $('gistTokenInput').value = ''; $('gistIdInput').value = '';
  setStatus('Saved. You can push or pull now.'); render();
}
function clearGistCreds(){ putGistCreds({token:'', gistId:'', lastSync:null}); setStatus('GitHub credentials cleared from this device.'); render(); }
function gistBusy(b){ ['gistPushBtn','gistPullBtn'].forEach(id => { const e = $(id); if(e) e.disabled = b; }); }
const gistHeaders = c => ({ 'Authorization':'token '+c.token, 'Accept':'application/vnd.github+json' });
async function pushToGist(){
  const c = gistCreds();
  if(!c.token){ setStatus('Add your GitHub token first, then Save Credentials.'); return; }
  save(); gistBusy(true); setStatus('Working…');
  try{
    const body = { description:'The Crimson Moon\'s Enchantress — save backup', public:false, files:{ [GIST_FILENAME]:{ content:JSON.stringify(G, null, 2) } } };
    const res = await fetch(c.gistId ? 'https://api.github.com/gists/'+c.gistId : 'https://api.github.com/gists',
      { method:c.gistId?'PATCH':'POST', headers:gistHeaders(c), body:JSON.stringify(body) });
    if(!res.ok) throw new Error('GitHub responded '+res.status);
    const data = await res.json(); c.gistId = data.id; c.lastSync = Date.now(); putGistCreds(c);
    setStatus('Backed up to Gist! ('+new Date().toLocaleTimeString()+')'); render();
  }catch(e){ setStatus("Push failed — check your token has the 'gist' scope and you're online."); }
  gistBusy(false);
}
async function pullFromGist(){
  const c = gistCreds();
  if(!c.token || !c.gistId){ setStatus('Need both a token and a Gist ID saved first.'); return; }
  if(!confirm('This will overwrite your current save with the one from GitHub. Continue?')) return;
  gistBusy(true); setStatus('Working…');
  try{
    const res = await fetch('https://api.github.com/gists/'+c.gistId, { headers:gistHeaders(c) });
    if(!res.ok) throw new Error('GitHub responded '+res.status);
    const data = await res.json(), file = data.files && data.files[GIST_FILENAME];
    if(!file) throw new Error('No save file found in that Gist.');
    applySave(JSON.parse(file.content));
    c.lastSync = Date.now(); putGistCreds(c);
    setStatus('Restored from Gist! ('+new Date().toLocaleTimeString()+')'); toast('Restored from GitHub'); gistBusy(false); render(); return;
  }catch(e){ setStatus('Pull failed — check your token, Gist ID, and connection.'); }
  gistBusy(false);
}
const copyGistId = () => {
  const id = gistCreds().gistId, done = () => toast('Gist ID copied'), fallback = () => { try{ const t = document.createElement('textarea'); t.value = id; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done(); }catch(e){ toast('Select the ID and copy it by hand'); } };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(id).then(done, fallback); else fallback();
};

/* ---- SAVE TAB ---- */
function rSave(){
  const c = gistCreds();
  return `<h2>💾 Save Data</h2>
  <div class="panel"><h3>This device</h3><div class="sm">Progress is saved automatically as you play. Last saved: ${G.savedAt?new Date(G.savedAt).toLocaleString():'—'}.</div>
   <div class="row" style="margin-top:6px"><button class="pri" onclick="saveNow()">💾 Save Game</button><button onclick="exportSave()">📤 Export</button>
   <input type="file" id="importFile" accept=".json,application/json" style="display:none" onchange="importSave(event)"><button onclick="$('importFile').click()">📥 Import</button>
   <button onclick="newGameFromSave()">🔄 New Game</button></div></div>
  <div class="panel"><h3>☁️ GitHub Gist Backup</h3>
   <div class="sm">Extra offsite copy, just in case. Needs a <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener" style="color:var(--gold)">classic GitHub token</a> with only the <b>gist</b> scope checked. Stored only on this device, sent only to GitHub's own servers.</div>
   <input type="password" id="gistTokenInput" placeholder="${c.token?'Token saved (hidden) — paste a new one to replace':'ghp_... classic token, gist scope only'}" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:rgba(0,0,0,.35);color:var(--parchment);margin:8px 0 4px">
   <input type="text" id="gistIdInput" placeholder="Gist ID (leave blank to create a new one)" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--line);background:rgba(0,0,0,.35);color:var(--parchment);margin:4px 0">
   ${c.gistId?`<div class="sm" style="margin:6px 0">Current Gist ID: <code style="user-select:all;overflow-wrap:anywhere">${c.gistId}</code> <button onclick="copyGistId()" style="padding:2px 8px">📋 Copy</button>${c.lastSync?'<br>Last sync: '+new Date(c.lastSync).toLocaleString():''}</div>`:''}
   <div class="row"><button onclick="saveGistCredsFromForm()">💾 Save Credentials</button><button onclick="clearGistCreds()">🗑️ Clear</button></div>
   <div class="row"><button class="pri" id="gistPushBtn" onclick="pushToGist()">⬆️ Push (back up)</button><button id="gistPullBtn" onclick="pullFromGist()">⬇️ Pull (restore)</button></div>
   <div id="gistStatusMsg" class="sm" style="text-align:center;min-height:1.2em;margin-top:6px">${saveStatus}</div></div>${rBackupPanel()}`;
}

/* ---------------- AUTO BACKUP ----------------
   After every real battle: save locally, keep a rolling set of 3 local backups, and (if a Gist token is saved) push to the Gist.
   When you leave / hide the page: save, and (if enabled) download a JSON file — at most once per 10 minutes and only if progress changed.
   Browsers may block downloads that are not started by a click; the Gist and local backups are the safety net. */
const SETTINGS_KEY = 'crimson_moon_settings', BACKUPS_KEY = 'crimson_moon_backups';
const settings = () => Object.assign({autoGist:true, autoLeaveDownload:true}, (()=>{ try{ return JSON.parse(localStorage.getItem(SETTINGS_KEY))||{}; }catch(e){ return {}; } })());
function setSetting(k, v){ const s = settings(); s[k] = v; try{ localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }catch(e){} render(); }
function backupsList(){ try{ return JSON.parse(localStorage.getItem(BACKUPS_KEY))||[]; }catch(e){ return []; } }
function rollingBackup(label){
  if(!G) return;
  const list = backupsList(); list.unshift({t:Date.now(), label, ch:G.ch, day:G.day, data:JSON.stringify(G)});
  while(list.length > 3) list.pop();
  try{ localStorage.setItem(BACKUPS_KEY, JSON.stringify(list)); }catch(e){ list.pop(); try{ localStorage.setItem(BACKUPS_KEY, JSON.stringify(list)); }catch(e2){} }
}
function restoreBackup(i){
  const b = backupsList()[i]; if(!b || !confirm('Restore the backup from '+new Date(b.t).toLocaleString()+'? This replaces the current save.')) return;
  try{ applySave(JSON.parse(b.data)); setStatus('Backup restored.'); render(); }catch(e){ toast('Could not restore that backup'); }
}
function afterBattleBackup(){
  if(!G) return;
  save(); rollingBackup('after battle');
  const c = gistCreds();
  if(settings().autoGist && c.token){ pushToGist().then(() => {}).catch(() => {}); }
}
let lastLeaveDownload = 0, lastLeaveSaved = 0;
function leaveBackup(){
  if(!G) return;
  save(); rollingBackup('on leave');
  const s = settings(), now = Date.now();
  if(s.autoLeaveDownload && G.savedAt !== lastLeaveSaved && now - lastLeaveDownload > 600000){
    lastLeaveSaved = G.savedAt; lastLeaveDownload = now;
    try{
      const blob = new Blob([JSON.stringify(G, null, 2)], {type:'application/json'}), url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = 'crimson-moon-autosave-'+new Date().toISOString().slice(0,16).replace(':','-')+'.json';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    }catch(e){}
  }
}
document.addEventListener('visibilitychange', () => { if(document.visibilityState==='hidden') leaveBackup(); });
window.addEventListener('pagehide', leaveBackup);
function rBackupPanel(){
  const s = settings(), c = gistCreds(), list = backupsList();
  return `<div class="panel"><h3>🛡️ Auto Backup</h3>
   <label class="sm" style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" ${s.autoGist?'checked':''} onchange="setSetting('autoGist',this.checked)"> After every battle, push to my GitHub Gist${c.token?'':' (needs a saved token above)'}</label>
   <label class="sm" style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" ${s.autoLeaveDownload?'checked':''} onchange="setSetting('autoLeaveDownload',this.checked)"> Download a JSON file when I leave the page (max once per 10 min; browsers may block it)</label>
   <div class="sm">A rolling set of the last 3 backups is also kept on this device (after each battle and when you leave).</div>
   ${list.map((b,i)=>`<div class="ev"><div><b>${new Date(b.t).toLocaleString()}</b><div class="sm">${b.label} · Ch.${b.ch} · Day ${b.day}</div></div><button onclick="restoreBackup(${i})">Restore</button></div>`).join('')||'<div class="sm">No backups yet.</div>'}</div>`;
}
