// عامل خدمة صالوني (Salooni KW) — شبكة أولاً دائماً، وتخزين للأصول الثابتة فقط.
// لا نخزّن /api إطلاقاً حتى تبقى الحجوزات والتحديثات حيّة دائماً.
const CACHE = 'salooni-kw-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api')) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const cacheable =
          res.ok &&
          (/\.(?:js|css|png|jpe?g|svg|ico|webp|woff2?|ttf|json|webmanifest)$/i.test(url.pathname));
        if (cacheable) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || Response.error()))
  );
});
