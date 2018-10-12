
// Cache to use when offline
var cacheName = 'restrvw-static-v1';

// Files to include in cache
var cachedFiles = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js' 
];

// Add all restaurant.html pages to cachedFiles
for (i=0;i<10;i++) {
  cachedFiles.push(`restaurant.html?=${i}`);
}

// cache all files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cachedFiles).then(() => self.skipWaiting());
    })
  );
});

// activated!
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('Service Worker Active!');
});

// log fetched files
self.addEventListener('fetch', event => {
  console.log(event.request.url);

  // get files when offline
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});