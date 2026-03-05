const CACHE = 'la-cuenta-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', e => {
  const req = e.request;

  if (req.method !== 'GET') return;

  // Keep navigations fresh while still supporting offline fallback.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        if (fresh.ok) await cache.put(req, fresh.clone());
        return fresh;
      } catch (_) {
        return (await cache.match(req)) || (await cache.match('./index.html'));
      }
    })());
    return;
  }

  // Static assets: return cached quickly, refresh in background.
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);

    const network = fetch(req).then(res => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);

    if (cached) {
      return cached;
    }

    const fresh = await network;
    return fresh || Response.error();
  })());
});
