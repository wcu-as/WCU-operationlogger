// v26 — index.html is now fully self-contained (xlsx/jszip bundled inline).
// This service worker only exists to enable "Add to Home Screen" / PWA install
// and does not need to cache anything — the app works from a single file
// even without a service worker (e.g. opened via file:// or email attachment).
const CACHE = 'wcu-oplog-v26';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Always network-first, no caching — index.html is self-contained anyway
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
