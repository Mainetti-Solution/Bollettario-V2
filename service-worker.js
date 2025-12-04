const CACHE_NAME = "ms-bollettario-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
  // Aggiungi qui "icon-192.png", "icon-512.png" se vuoi cache anche le icone
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          cached
        )
      );
    })
  );
});
