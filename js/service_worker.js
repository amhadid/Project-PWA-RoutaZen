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
  './Assets/Data/Kantor_Pemerintah.js',
  "./js/api.js",
  './js/App.js',
  './js/Access_realtime.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Clone the request to ensure it's safe to read when responding.
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response to ensure it's safe to read when caching.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        // Network request failed, try to get it from the cache.
        return caches.match(event.request);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
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

// Tentukan fungsi untuk menampilkan notifikasi
function showNotification(message) {
  // Periksa apakah browser mendukung notifikasi
  if (!("Notification" in window)) {
      console.error("Browser ini tidak mendukung notifikasi desktop");
  } else {
      // Minta izin notifikasi jika belum diberikan
      if (Notification.permission === "granted") {
          // Kirim pesan ke Service Worker untuk menampilkan notifikasi
          navigator.serviceWorker.controller.postMessage({
              type: 'show_notification',
              message: message
          });
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function(permission) {
              if (permission === "granted") {
                  // Kirim pesan ke Service Worker untuk menampilkan notifikasi
                  navigator.serviceWorker.controller.postMessage({
                      type: 'show_notification',
                      message: message
                  });
              }
          });
      }
  }
}

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
