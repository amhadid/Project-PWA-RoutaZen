//--Posisi Peta ------------------------------------------------------------------------------------------------
var map = L.map('map').setView([-6.992, 110.418], 11);

//--Dialog Before Using Apps -----------------------------------------------------------------------------------
var popup = document.getElementById("popup");

function showPopup() {
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}

// Tambahkan event listener untuk menampilkan pop-up saat peta dimuat
map.on('load', showPopup);

// Tambahkan event listener untuk menyembunyikan pop-up saat pengguna mengklik di luar pop-up
document.addEventListener("click", function(event) {
  if (event.target.closest("#popup") === null) {
    hidePopup();
  }
});

// Fungsi untuk mengatur posisi pop-up saat jendela browser diubah ukurannya
function adjustPopupPosition() {
  var popupWidth = popup.offsetWidth;
  var popupHeight = popup.offsetHeight;
  popup.style.marginLeft = "-" + (popupWidth / 14) + "px";
  popup.style.marginTop = "-" + (popupHeight / 6) + "px";
}

// Panggil fungsi untuk mengatur posisi pop-up saat halaman dimuat dan saat ukuran jendela berubah
window.addEventListener("load", function() {
  adjustPopupPosition();
  showPopup();
});
window.addEventListener("resize", adjustPopupPosition);

//--ResetView----------------------------------------------------------------------------------------------------------
L.control.resetView({
position: "topleft",
title: "Reset view",
latlng: L.latLng([-7.052, 110.439]),
zoom: 13,
}).addTo(map);

//--fullscreen----------------------------------------------------------------------------------------------------------
map.on('enterFullscreen', function(){
if(window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function(){
if(window.console) window.console.log('exitFullscreen');
});

//--Lokasi--------------------------------------------------------------------------------------------------------------
L.control.locate().addTo(map);

//--Skala---------------------------------------------------------------------------------------------------------------
L.control.betterscale().addTo(map);

//--Geocoder------------------------------------------------------------------------------------------------------------
var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
  })
    .on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]).addTo(map);
      map.fitBounds(poly.getBounds());
    })
    .addTo(map);
         
//--Add GeoJSON---------------------------------------------------------------------------------------------------------
// Data Kejadian Kecelakaan Tahun 2021
var crashIcon = L.icon({
    iconUrl: './Assets/img/crash-marker.png',
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Membuat fungsi untuk menentukan marker (Tahun 2021)
function pointToLayer2021(feature, latlng) {
    var prop = feature.properties;
    
    var popupContent = "<b>Lokasi Kejadian:</b> " + prop.Lokasi_Kej + "<br>" +
                       "<b>Hari:</b> " + prop.Hari + "<br>" +
                       "<b>Tanggal:</b> " + prop.Tanggal + "<br>" +
                       "<b>Kendaraan:</b> " + prop.Kendaraan + "<br>" +
                       "<b>Koordinat:</b> " + prop.Lat + ", " + prop.Long;
    
    return L.marker(latlng, { icon: crashIcon }).bindPopup(popupContent);
}

// Memuat GeoJSON ke peta (Tahun 2021)
L.geoJSON(data_kecelakaan_2021, {
    pointToLayer: pointToLayer2021,
});

// Data Kejadian Kecelakaan Tahun 2022
var crashIcon1 = L.icon({
    iconUrl: './Assets/img/crash-marker-blue.png',
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Membuat fungsi untuk menentukan marker (Tahun 2022)
function pointToLayer2022(feature, latlng) {
    var prop = feature.properties;
    
    var popupContent = "<b>Lokasi Kejadian:</b> " + prop.Lokasi_Kej + "<br>" +
                       "<b>Hari:</b> " + prop.Hari + "<br>" +
                       "<b>Tanggal:</b> " + prop.Tanggal + "<br>" +
                       "<b>Kendaraan:</b> " + prop.Kendaraan + "<br>" +
                       "<b>Koordinat:</b> " + prop.Lat + ", " + prop.Long;
    
    return L.marker(latlng, { icon: crashIcon1 }).bindPopup(popupContent);
}

// Memuat GeoJSON ke peta (Tahun 2022)
L.geoJSON(data_kecelakaan_2022, {
    pointToLayer: pointToLayer2022,
});

// Data Kejadian Kecelakaan Tahun 2023
var crashIcon2 = L.icon({
    iconUrl: './Assets/img/crash-marker-yellow.png',
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Membuat fungsi untuk menentukan marker (Tahun 2023)
function pointToLayer2023(feature, latlng) {
    var prop = feature.properties;
    
    var popupContent = "<b>Lokasi Kejadian:</b> " + prop.Lokasi_Kej + "<br>" +
                       "<b>Hari:</b> " + prop.Hari + "<br>" +
                       "<b>Tanggal:</b> " + prop.Tanggal + "<br>" +
                       "<b>Kendaraan:</b> " + prop.Kendaraan + "<br>" +
                       "<b>Koordinat:</b> " + prop.Lat + ", " + prop.Long;
    
    return L.marker(latlng, { icon: crashIcon2 }).bindPopup(popupContent);
}

// Memuat GeoJSON ke peta (Tahun 2023)
L.geoJSON(data_kecelakaan_2023, {
    pointToLayer: pointToLayer2023,
});

// Data Area Rawan Kecelakaan Tinggi
// Membuat fungsi pop-up Area Rawan Kecelakaan
function pointToLayerRawan(feature, latlng) {
    var prop = feature.properties;
    
    var popupContent = "<b>Kode Jalan:</b> " + prop.code + "<br>" +
                       "<b>Nama Jalan :</b> " + prop.name + "<br>" +
                       "<b>Klasifikasi :</b> " + prop.fclass + "<br>" +
                       "<b>Geometry :</b> " + prop.geometry;
    
    return L.marker(latlng).bindPopup(popupContent);
}

// Memuat GeoJSON ke peta
L.geoJSON(area_rawan_tinggi, {
    pointToLayer: pointToLayerRawan,
    style: function(feature) {
        return {
            fillColor: 'red',
            color: 'red',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
        };
    }
}).addTo(map);

// Membuat fungsi pop-up Area Kota Semarang
function pointToLayerarea(feature, latlng) {
    var prop = feature.properties;
    
    var popupContent = "<b>Nama Kecamatan:</b> " + prop.NAME_3 + "<br>" +
                       "<b>Geometry :</b> " + prop.geometry;
    
    return L.marker(latlng).bindPopup(popupContent);
}

// Memuat GeoJSON ke peta
L.geoJSON(area_semarang, {
    pointToLayer: pointToLayerarea,
});

// Buat layer-group untuk masing-masing tahun kejadian kecelakaan
var kecelakaan2021Layer = L.geoJSON(data_kecelakaan_2021, {
    pointToLayer: pointToLayer2021,
});

var kecelakaan2022Layer = L.geoJSON(data_kecelakaan_2022, {
    pointToLayer: pointToLayer2022,
});

var kecelakaan2023Layer = L.geoJSON(data_kecelakaan_2023, {
    pointToLayer: pointToLayer2023,
});

var area_rawan = L.geoJSON(area_rawan_tinggi, {
    pointToLayer: pointToLayerRawan
}).addTo(map);

var area_kota_semarang = L.geoJSON(area_semarang, {
    pointToLayer: pointToLayerarea
});

//--BaseMaps-----------------------------------------------------------------------------------------------------------------------------
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
subdomains: ['a','b','c']
}).addTo(map);
     
var World_Imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>',
subdomains: ['a','b','c']
});

//--Layer Control---------------------------------------------------------------------------------------------------------------------------
var overlayLayers = {
    "Wilayah Penelitian": area_kota_semarang,
    "Data Kecelakaan Tahun 2021": kecelakaan2021Layer,
    "Data Kecelakaan Tahun 2022": kecelakaan2022Layer,
    "Data Kecelakaan Tahun 2023": kecelakaan2023Layer,
    "Area Rawan Kecelakaan": area_rawan
};

var baseMaps = {
"World_Imagery": World_Imagery,
"OpenStreetMap": osm, 
};

var layerControl = L.control.layers(baseMaps, overlayLayers).addTo(map);
layerControl.setPosition('topright');

//--Legenda---------------------------------------------------------------------------------------------------------------------------------
const legend = L.control.Legend({
    position: "topright",
    title: "LEGENDA",
    symbolWidth: 24,
    symbolHeight: 15,
    opacity: 1.0,
    column: 1,
    collapsed: true,
    legends: [ 
        {
            label: "Wilayah penelitian",
            type: "image",
            url: "./Assets/img/area-blue.png",
        },{
            label: "Kejadian kecelakaan tahun 2021",
            type: "image",
            url: "./Assets/img/crash-marker.png",
        },{
            label: "Kejadian kecelakaan tahun 2022",
            type: "image",
            url: "./Assets/img/crash-marker-blue.png",
        },{
            label: "Kejadian kecelakaan tahun 2023",
            type: "image",
            url: "./Assets/img/crash-marker-yellow.png",
        },{
            label: "Area Rawan Kecelakaan",
            type: "image",
            url: "./Assets/img/area-rawan.png",
        }
    ]
}).addTo(map);

//--Algoritma Routing--------------------------------------------------------------------------------------------------------
// Inisialisasi Routing control
const control = L.Routing.control({
    router: L.Routing.mapbox('pk.eyJ1IjoiYW1oYWRpZCIsImEiOiJjbHZ0ZGdwMHYwdHdtMmxueXEyYTVwejJlIn0.zaYm3Q4PwQ9IA6c0w76Yew'),
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
}).addTo(map);

// Tambahkan event listener pada peta untuk menangkap klik pengguna
map.on('click', function(event) {
    const destinationLatLng = event.latlng;

    // Tampilkan dialog konfirmasi
    if (confirm('Apakah Anda yakin ingin pergi ke lokasi ini?')) {
        // Dapatkan lokasi pengguna saat ini menggunakan geolocation (jika tersedia)
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Setel titik awal dan titik akhir pada kontrol rute
            control.setWaypoints([userLatLng, destinationLatLng]);

            // Lakukan perutean
            control.route();
        }, function(error) {
            console.error('Tidak dapat mengakses lokasi pengguna:', error);
        });
    }
});

//--Algoritma Geofence-----------------------------------------------------------------------------------------------------------------------
// Tentukan fungsi untuk memeriksa lokasi pengguna
function checkLocation() {
    map.locate({setView: true});
}

// Tentukan fungsi untuk menangani lokasi yang ditemukan
function onLocationFound(e) {
    var userLocation = e.latlng;

    // Periksa apakah lokasi pengguna berada dalam batas-batas fitur apa pun dalam lapisan GeoJSON
    var userWithinArea = false;
    area_rawan.eachLayer(function(layer) {
        if (layer.getBounds().contains(userLocation)) {
            userWithinArea = true;
        }
    });

    // Periksa apakah browser mendukung notifikasi
    if (!("Notification" in window)) {
        console.error("Browser ini tidak mendukung notifikasi desktop");
    } else {
        // Jika pengguna berada dalam fitur apa pun dalam lapisan GeoJSON, tampilkan notifikasi
        if (userWithinArea && Notification.permission === "granted") {
            showNotification(" Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
        } else if (userWithinArea && Notification.permission !== "denied") {
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    showNotification("Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
                }
            });
        }
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    new Notification('HATI-HATI !!!!', {
        body: message
    });
}

// Dengarkan acara lokasi ditemukan
map.on('locationfound', onLocationFound);

// Panggil fungsi checkLocation sekali untuk memulai
checkLocation();

// Panggil fungsi checkLocation setiap 15 detik
setInterval(checkLocation, 15000);

//--Kontak Menu--------------------------------------------------------------------------------------------------------------------------------
const left = '<div class="header"><img src="./Assets/img/notebook-of-contacts.png" alt="Image" style="width: 15px; height: 13px;"><b> Kontak</b></div>';
let contents = `
            <div class="content">
                <div class="title"><img src="./Assets/img/contact.png" alt="Image" style="width: 11px; height: 11px;"> Citra Hadi Saputri</div>
                <div class="bottom">
                    <span>-- <a href="https://api.whatsapp.com/send?phone=085172432829">+62 851-7243-2829</a> --</span>
                </div>
                <div class="title"><img src="./Assets/img/contact.png" alt="Image" style="width: 11px; height: 11px;"> Alif Marwan Hadid</div>
                <div class="bottom">
                    <span>-- <a href="https://api.whatsapp.com/send?phone=087764424810">+62 877-6442-4810</a> --</span>
                </div>
            </div>`;
const slideMenu = L.control
        .slideMenu("", {
          position: "topleft",
          menuposition: "bottomleft",
          width: "45%",
          height: "150px",
          icon: "fa fa-phone",
          delay: "50",
        })
.addTo(map);
slideMenu.setContents(left + contents);
