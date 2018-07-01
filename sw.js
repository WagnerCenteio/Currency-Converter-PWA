const cacheName = "currency-converter";

self.addEventListener("install", event =>
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(["/"])))
);

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  console.log('requestUrl.origin',requestUrl.origin);
  console.log('location.origin',location.origin);
  
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
