
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

// list of some map coordinates for each page
var mapCoordinates = [
  {x: '19300', y: '24639'},
  {x: '19304', y: '24646'},
  {x: '19301', y: '24632'},
  {x: '19300', y: '24638'},
  {x: '19310', y: '24642'},
  {x: '19291', y: '24650'},
  {x: '19301', y: '24635'},
  {x: '19294', y: '24637'},
  {x: '19303', y: '24633'},
  {x: '19306', y: '24633'}
];

// add mapbox urls to cachedFiles for offline use
mapCoordinates.map(function(c) {
  cachedFiles.push(`https://api.tiles.mapbox.com/v4/mapbox.streets/16/${c.x}/${c.y}.jpg70?access_token=pk.eyJ1IjoibXNjaG11Y2tlcjMxIiwiYSI6ImNqbXVyZmQzdTMwMWEza21sc25zMm5lcngifQ.87ivMGNm3z_8SVlpNuF0Zw`);
});


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