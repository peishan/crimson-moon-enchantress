/* =====================================================================
   DEVELOPER OPTION: chapter volumes as PDF (Dev tab, behind a password).
   Builds a print-ready document of the chapter text (title, place, summary, events, who is on the page) for the chosen volumes,
   optionally with the comic pages, and opens the browser's print dialog: choose "Save as PDF". Nothing is uploaded.
   PASSWORD: only a SHA-256 hash is stored (DEV_PW_HASH). Change it with:  python3 tools/set_dev_password.py "new password"
   This is a convenience lock, NOT security: the game is a static site, so anyone who reads the code can bypass or replace the hash.
   Do not put anything secret behind it.
   ===================================================================== */
const DEV_PW_HASH = '877eb7b26727a1f88e77d92b4899302809c4a1c4eb70de30645827a645dacd6e';
const VOL_NAMES = {1:'The Long Awaited Love Is Not a Dream',2:'The Island That No Longer Feels Like Home',3:'The Roots of What Remains',4:'The Ice Temple',5:'The Ice Temple: The Truth Left Behind',6:'The Unknown World',7:'The Ruins That Remember',8:'The Strings of a Forgotten Promise',9:'A Season Between Journeys',10:'The Sanctuary of Silent Strings',11:'The Thousand-Mile Frontier',12:'A Healer\'s Journey',13:'The Witch of Zhan Manor',14:'The Demon Hunter\'s Trail',15:'The Missing Voyage',16:'The Road Ahead',17:'The Shadows of Yilong',18:'Yihai\'s Rescue',19:'Xiao Tian\'s Hidden Legacy'};
let devUnlocked = false;
try{ devUnlocked = sessionStorage.getItem('cm_dev_ok') === '1'; }catch(e){}
async function sha256(s){ const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''); }
async function devLogin(){
  const pw = ($('devpw')||{}).value || '';
  if(!(window.crypto && crypto.subtle)){ toast('This browser cannot check the password here (needs https).'); return; }
  if(DEV_PW_HASH.startsWith('__')){ toast('No developer password has been set yet.'); return; }
  if(await sha256(pw) === DEV_PW_HASH){ devUnlocked = true; try{ sessionStorage.setItem('cm_dev_ok','1'); }catch(e){} render(); }
  else toast('Wrong password');
}
function devLogout(){ devUnlocked = false; try{ sessionStorage.removeItem('cm_dev_ok'); }catch(e){} render(); }
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function exportVolumes(){ const v = {}; for(let n=1;n<=LAST_CHAPTER;n++){ if(!CHAPTER_DESIGN[n] || CHAPTER_DESIGN[n].removed) continue; const k = interOf(n) ? (interOf(n)==='yx' ? 'Ya\'Xing Interlude' : 'Xiyu & Cangyuan Interlude') : 'Volume '+volOf(n); (v[k] = v[k] || []).push(n); } return v; }
function devExportPanel(){
  if(!devUnlocked) return `<div class="panel"><b>🔒 Developer export</b><div class="sm">Download the chapter volumes as a PDF. Enter the developer password.</div>
    <div class="row" style="margin-top:6px"><input id="devpw" type="password" placeholder="Password" onkeydown="if(event.key==='Enter')devLogin()"><button onclick="devLogin()">Unlock</button></div></div>`;
  const vols = exportVolumes();
  return `<div class="panel"><b>📄 Chapter volumes to PDF</b> <button onclick="devLogout()">Lock</button>
    <div class="sm">Pick volumes, then press the button: a print view opens and you choose "Save as PDF" in the print dialog.</div>
    <div class="row" style="margin:6px 0;flex-wrap:wrap">${Object.keys(vols).map(k => `<label style="margin-right:8px"><input type="checkbox" class="expv" value="${esc(k)}" checked> ${esc(k)} (${vols[k].length})</label>`).join('')}</div>
    <label class="sm"><input type="checkbox" id="expimg"> Include the comic pages (large file, slower)</label>
    <label class="sm"><input type="checkbox" id="expplace" checked> Skip placeholder chapters (comic not received)</label>
    <div style="margin-top:6px"><button class="pri" onclick="devExportPdf()">📄 Build PDF</button></div></div>`;
}
async function devExportPdf(){
  if(!devUnlocked) return;
  const picked = Array.from(document.querySelectorAll('.expv:checked')).map(x => x.value), vols = exportVolumes();
  const img = $('expimg').checked, skip = $('expplace').checked;
  if(!picked.length){ toast('Pick at least one volume'); return; }
  const w = window.open('', '_blank'); if(!w){ toast('Allow pop-ups for this site to build the PDF'); return; }
  w.document.write('<!doctype html><title>Building…</title><body style="font-family:sans-serif">Building the document…</body>');
  let html = '';
  for(const k of picked){
    const num = /^Volume (\d+)/.exec(k), name = num ? VOL_NAMES[+num[1]] : '';
    html += `<h1 class="vol">${esc(k)}${name ? ' · '+esc(name) : ''}</h1>`;
    for(const n of vols[k]){
      const c = CHAPTER_DESIGN[n]; if(skip && c.pending) continue;
      html += `<section class="ch"><h2>${esc(chShort(n))} · ${esc(c.title)}${c.pending ? ' <i>(pending)</i>' : ''}</h2><div class="meta">Chapter ${n}${c.loc ? ' · '+esc(c.loc) : ''}</div><p>${esc(c.sum||'')}</p>`;
      if((c.events||[]).length) html += '<ul>'+c.events.map(e => `<li>${esc(e)}</li>`).join('')+'</ul>';
      if((c.chars||[]).length) html += `<div class="meta">On the page: ${c.chars.map(id => esc(CHARACTERS[id] ? CHARACTERS[id].n : id)).join(', ')}</div>`;
      if(img){ const pages = await comicPages(n); html += pages.map(p => `<img src="${new URL(p, location.href).href}">`).join(''); }
      html += '</section>';
    }
  }
  const css = 'body{font-family:Georgia,serif;margin:24px;color:#111}h1.vol{page-break-before:always;border-bottom:2px solid #933;padding-bottom:6px}h1.vol:first-of-type{page-break-before:avoid}h2{margin:18px 0 2px}.meta{color:#555;font-size:12px}section.ch{page-break-inside:avoid-page;margin-bottom:14px}img{max-width:100%;display:block;margin:8px 0;page-break-inside:avoid}li{font-size:13px}p{font-size:14px;line-height:1.45}';
  w.document.open(); w.document.write(`<!doctype html><meta charset="utf-8"><title>Crimson Moon — chapter volumes</title><style>${css}</style><body>${html}</body>`); w.document.close();
  const go = () => setTimeout(() => { try{ w.focus(); w.print(); }catch(e){} }, 600);
  if(img){ const t = setInterval(() => { const im = Array.from(w.document.images); if(im.every(i => i.complete)){ clearInterval(t); go(); } }, 500); } else go();
}
