const CACHE_NAME = 'web-apps-routing-cache-v1';
const urlsToCache = [
  '/',
  './index.html',
  './about-app.html',
  './style/index.css',
  './leaflet/leaflet.css',
  './leaflet/leaflet.js',
  './leaflet/controlLocate/L.Control.Locate.min.css',
  './leaflet/controlLocate/L.Control.Locate.min.js',
  './leaflet/leaflet-betterscale-master/L.Control.BetterScale.css',
  './leaflet/leaflet-betterscale-master/L.Control.BetterScale.js',
  './leaflet/ResetView/L.Control.ResetView.min.css',
  './leaflet/ResetView/L.Control.ResetView.min.js',
  './leaflet/leaflet-routing-machine-3.2.12/dist/leaflet-routing-machine.css',
  './leaflet/leaflet-routing-machine-3.2.12/dist/leaflet-routing-machine.js',
  './leaflet/leaflet-routing-machine-3.2.12/examples/config.js',
  './leaflet/L.Control.SlideMenu.css',
  './leaflet/L.Control.SlideMenu.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
  './Assets/Data/Kantor_Pemerintah.js',
  "./js/api.js",
  './js/App.js',
  './js/Access_realtime.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request to ensure it's safe to read when responding.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to ensure it's safe to read when caching.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
    );
});

self.addEventListener('activate', function(event) {

  const cacheWhitelist = ['web-apps-routing-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Tangani pesan dari aplikasi utama
self.addEventListener('message', function(event) {
  var message = event.data;
  if (message && message.type === 'show_notification') {
      // Tampilkan notifikasi
      self.registration.showNotification('HATI-HATI !!!!', {
          body: message.message,
          icon: './Assets/img/death-zone.png' // Ganti dengan path gambar Anda
      });
  }
});
