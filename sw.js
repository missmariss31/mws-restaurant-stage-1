
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
  '/js/dbhelper.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://api.tiles.mapbox.com/v4/mapbox.streets/12/1204/1540.jpg70?access_token=pk.eyJ1IjoibXNjaG11Y2tlcjMxIiwiYSI6ImNqbXVyZmQzdTMwMWEza21sc25zMm5lcngifQ.87ivMGNm3z_8SVlpNuF0Zw'
];

// Add all restaurant.html pages to cachedFiles
for (i=1;i<11;i++) {
  cachedFiles.push(`restaurant.html?id=${i}`);
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