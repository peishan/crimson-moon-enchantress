/* Crimson Moon service worker: app shell cached for offline play; images/comics cached as you play. */
const VERSION = 'crimson-moon-v13';
const SHELL = ['./', './index.html', './styles.css', './manifest.webmanifest',
  './scripts/characters.js','./scripts/chapters.js','./scripts/script.js','./scripts/script_v2.js','./scripts/hooks.js','./scripts/bounties.js','./scripts/relations.js','./scripts/board.js','./scripts/rest.js','./scripts/herbal.js','./scripts/personal.js','./scripts/seal.js','./scripts/people.js','./scripts/core.js','./scripts/enemies.js','./scripts/battle.js','./scripts/journal.js','./scripts/temple.js','./assets/maps/ice_temple.webp','./assets/maps/ice_temple_v4.webp','./assets/volume4_cover.webp','./assets/volume5_cover.webp',
  './scripts/savedata.js','./scripts/storypopup.js','./scripts/ui.js','./assets/splash.webp','./assets/volume1_cover.webp','./assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/icons/icon-maskable-192.png','./assets/icons/icon-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isCode = /\.(js|css|html|webmanifest)$/.test(req.url) || req.mode === 'navigate';
  if(isCode){   // network first so updates arrive; cache is the offline fallback
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else {      // images: cache first (only successful responses are stored, so a not-yet-uploaded comic page is never cached as missing)
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { if(n.ok){ const c = n.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return n; })));
  }
});
