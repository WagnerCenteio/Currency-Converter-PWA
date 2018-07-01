const cacheName = "currency-converter";

// -----
self.addEventListener("install", event =>
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(["/"])))
);

// ----- Hijacking fetch requests
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    event.respondWith(caches.match("/"));
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
