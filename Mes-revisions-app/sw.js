/* Service worker de « Mes révisions » : fonctionne hors ligne et se met à jour tout seul.
   Change VERSION à chaque nouvelle version de l'appli pour déclencher la mise à jour. */
const VERSION = '3.16.7';
const CACHE = 'mes-revisions-' + VERSION;
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'firebase-config.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('mes-revisions-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    /* Réseau d'abord (toujours la dernière version), cache en secours hors ligne. */
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
  } else if (url.hostname === 'www.gstatic.com') {
    /* Bibliothèques Firebase : cache d'abord, rafraîchi en arrière-plan. */
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
