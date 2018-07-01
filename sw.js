const cacheName = "currency-converter";

self.addEventListener("install", event =>
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(["/"])))
);

self.addEventListener("fetch", event => {
    
});
