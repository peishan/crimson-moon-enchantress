/* =====================================================================
   THE CRIMSON MOON'S ENCHANTRESS — STORY READER (adapted from Tribute / Crimson Tide Story Mode)
   Full-screen reader over the comic pages. If a chapter's comic art has not been uploaded yet, the
   short-form script (scripts/script.js) is shown one scene at a time instead, so every chapter is playable.
   Art naming: assets/comics/ch01.webp, ch01_2.webp, ch01_3.webp ... (pages are discovered automatically).
   Controls: Back/Next, arrow keys / space, swipe, Esc.
   ===================================================================== */
let S = null;   // {n, i, mode:'read'|'result', units:[{art}|{scene}], msgs}
const storyEl = () => document.getElementById('story');
const pad2 = n => (n<10?'0':'')+n;
const PAGE_CACHE = {};

function probeImage(src){ return new Promise(res => { const im = new Image(); im.onload = () => res(true); im.onerror = () => res(false); im.src = src; }); }
async function comicPages(n){
  if(PAGE_CACHE[n]) return PAGE_CACHE[n];
  const pages = [];
  for(let i=1;i<=40;i++){
    const src = (n>=VOL4_START ? 'assets/comics/v4/ch'+pad2(vnum(n)) : n>=VOL3_START ? 'assets/comics/v3/ch'+pad2(vnum(n)) : n>=VOL2_START ? 'assets/comics/v2/ch'+pad2(vnum(n)) : 'assets/comics/ch'+pad2(n))+(i>1?'_'+i:'')+'.webp';
    if(!(await probeImage(src))) break;
    pages.push(src);
  }
  if(pages.length) PAGE_CACHE[n] = pages;   // only cache hits, so art uploaded later is picked up on reload
  return pages;
}
function storyUnits(n, pages){
  if(pages.length) return pages.map(src => ({art:src}));
  const sc = (typeof SCRIPT!=='undefined' && SCRIPT[n]) ? SCRIPT[n].scenes : [];
  return sc.map(s => ({scene:s}));
}

async function openStory(n){
  S = {n, i:0, mode:'read', units:[], loading:true}; drawStory();
  const pages = await comicPages(n);
  if(!S || S.n!==n) return;
  S.units = storyUnits(n, pages); S.loading = false; S.hasArt = pages.length>0; drawStory();
}
function closeStory(){ S = null; const e = storyEl(); e.classList.remove('on'); e.innerHTML = ''; render(); }
function storyGo(d){
  if(!S || S.mode!=='read' || S.loading) return;
  S.i = clamp(S.i + d, 0, S.units.length);
  if(S.i === S.units.length){ G.read[S.n] = true; save(); }
  drawStory();
}
/* Volume covers are shown when a volume is COMPLETED (not at the start). Key = the chapter that completes the volume. */
const VOLUME_COVERS = { 39:{ v:1, n:'Volume 1', img:'assets/volume1_cover.webp' }, 78:{ v:2, n:'Volume 2', img:'assets/events/relationship_cangyuan.webp' }, 116:{ v:3, n:'Volume 3', img:'assets/volume3_cover.webp' }, 168:{ v:4, n:'Volume 4', img:'assets/volume4_cover.webp' } };
function openVolumeCover(n, after){ const c = VOLUME_COVERS[n]; if(!c) return; S = {n, mode:'cover', units:[], cover:c, after:after || null}; drawStory(); }
/* closing the finale splash: Volume 2's closes into the unlocking of the relationship option, then the chapter result */
function closeCover(){
  if(!S || S.mode!=='cover'){ closeStory(); return; }
  const n = S.n, after = S.after;
  if(!after){ closeStory(); return; }
  const msgs = after.concat(n === 78 ? relationshipUnlock() : []);
  S = {n, mode:'result', msgs, units:[]}; drawStory();
}
function storyBeginBattle(){ const n = S.n; closeStory(); chapterFight(n); }
function storyComplete(){ const n = S.n, msgs = completeChapter(n); if(VOLUME_COVERS[n]){ openVolumeCover(n, msgs); return; } S = {n, mode:'result', msgs, units:[]}; drawStory(); }

function sceneHtml(sc){
  const lines = sc.l.map(l => {
    if(l.k==='nar') return `<p class="sc-nar">${l.t}</p>`;
    if(l.k==='thought') return `<p class="sc-th"><b>${l.w}</b> <i>(thought)</i><br>${l.t}</p>`;
    if(l.k==='say') return `<p class="sc-say"><b>${l.w}</b><br>${l.t}</p>`;
    return `<p class="sc-plain">${l.t}</p>`;
  }).join('');
  return `<div class="scene"><h3>${sc.h}</h3>${lines}</div>`;
}

function drawStory(){
  const e = storyEl(); e.classList.add('on');
  if(S.mode==='cover'){ const cv = S.cover; e.innerHTML = `<div class="story-shell"><div class="story-top"><div><div class="story-kicker">${cv.n} · Complete</div><div class="story-title">The Long Awaited Love Is Not a Dream</div></div><div class="story-top-r"><button class="story-x" onclick="closeCover()" aria-label="Close">✕</button></div></div><div class="story-body"><div class="story-page"><img src="${cv.img}" alt="${cv.n} cover"></div></div><div class="story-bar"><button class="pri" onclick="closeCover()">Continue</button></div></div>`; return; }
  const c = chapterOf(S.n), d = CHAPTER_DESIGN[S.n], total = S.units.length;
  const head = `<div class="story-top"><div><div class="story-kicker">${chName(S.n)}${S.mode==='result'?' · Complete':''}</div><div class="story-title">${c.title}</div></div>
    <div class="story-top-r">${S.mode==='read' && !S.loading?`<span class="story-count">${Math.min(S.i+1,total)} / ${total}</span>`:''}<button class="story-x" onclick="closeStory()" aria-label="Close">✕</button></div></div>`;
  let body = '', bar = '';
  if(S.mode==='read' && S.loading){
    body = '<div class="story-end"><p class="sm">Loading…</p></div>';
  } else if(S.mode==='read' && S.i < total){
    const u = S.units[S.i];
    body = u.art ? `<div class="story-page"><img src="${u.art}" alt="${c.title}, page ${S.i+1}"></div>` : `<div class="story-text">${sceneHtml(u.scene)}</div>`;
    bar = `<button ${S.i?'':'disabled'} onclick="storyGo(-1)">◀ Back</button><button class="pri" onclick="storyGo(1)">${S.i===total-1?'Finish':'Next ▶'}</button>`;
    if(S.units[S.i+1] && S.units[S.i+1].art){ const pre = new Image(); pre.src = S.units[S.i+1].art; }
  } else if(S.mode==='read'){
    const done = chapterDone(S.n);
    body = `<div class="story-end"><h2>End of ${chName(S.n).toLowerCase()}</h2><p>${d.sum.split('. ').slice(0,2).join('. ')}${/[.!?]$/.test(d.sum.split('. ').slice(0,2).join('. '))?'':'.'}</p>
      ${c.battle?`<div class="panel"><b>⚔️ Battle ahead</b><div class="sm">${c.battle.map(f=>ENEMIES[f.key].icon+' '+ENEMIES[f.key].n).join(' · ')}</div></div>`:''}</div>`;
    bar = `<button onclick="S.i=0;drawStory()">↺ Read again</button>`+
      (c.quest ? (done ? `<button onclick="closeStory()">Close</button>${nextChapterBtn(S.n)}` : `<button class="pri" onclick="closeStory();showTab('bounties')">Open the investigation</button>`)
      : c.bounty ? (done ? `<button onclick="closeStory()">Close</button>${nextChapterBtn(S.n)}` : `<button class="pri" onclick="closeStory();showTab('bounties')">Open the bounty board</button>`)
      : c.battle ? `<button class="pri" onclick="storyBeginBattle()">${done?'Replay battle':'Begin battle'}</button>`
                : done ? `<button onclick="closeStory()">Close</button>${nextChapterBtn(S.n)}`
                       : `<button class="pri" onclick="storyComplete()">Complete chapter (+${c.sxp} XP)</button>`);
  } else {   // result
    body = `<div class="story-end"><h2>Chapter complete</h2>
      <div class="panel good">${S.msgs.map(m=>`<div>${m}</div>`).join('')}</div>
      ${d.unlocks.length?`<div class="panel"><h4 style="margin-top:0">Opens</h4>${d.unlocks.map(u=>`<div class="li">✅ ${u}</div>`).join('')}</div>`:''}</div>`;
    bar = (VOLUME_COVERS[S.n] ? `<button class="pri" onclick="openVolumeCover(${S.n})">🏆 ${VOLUME_COVERS[S.n].n} complete: view the cover</button>` : '') + `<button onclick="closeStory()">Close</button>${nextChapterBtn(S.n)}`;
  }
  e.innerHTML = `<div class="story-shell">${head}<div class="story-body">${body}</div><div class="story-bar">${bar}</div></div>`;
  const b = e.querySelector('.story-body'); if(b) b.scrollTop = 0;
}

/* keyboard + swipe */
document.addEventListener('keydown', ev => {
  if(!S) return;
  if(ev.key==='Escape') closeStory();
  else if(ev.key==='ArrowRight' || ev.key===' ') { ev.preventDefault(); storyGo(1); }
  else if(ev.key==='ArrowLeft') storyGo(-1);
});
let _tx = null, _ty = null;
document.addEventListener('touchstart', ev => { if(S && S.mode==='read'){ _tx = ev.touches[0].clientX; _ty = ev.touches[0].clientY; } }, {passive:true});
document.addEventListener('touchend', ev => {
  if(!S || _tx===null) return;
  const dx = ev.changedTouches[0].clientX - _tx, dy = ev.changedTouches[0].clientY - _ty; _tx = _ty = null;
  if(Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)*1.6) storyGo(dx < 0 ? 1 : -1);
}, {passive:true});
