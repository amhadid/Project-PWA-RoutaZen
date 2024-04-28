//Access Real-time Position
if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 1000);
}

var marker, circle;

function getPosition(position){
    // console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    if(marker) {
        map.removeLayer(marker)
    }

    if(circle) {
        map.removeLayer(circle)
    }

    // Define icon options
    var iconOptions = {
        iconUrl: './Assets/img/user-icon.png',
        iconSize: [28, 32], // Sesuaikan ukuran ikon
        iconAnchor: [16, 32], // Sesuaikan anchor ikon
    };

    // Create custom icon
    var customIcon = L.icon(iconOptions);

    // Create marker with custom icon
    marker = L.marker([lat, long], { icon: customIcon });

    // Create circle
    circle = L.circle([lat, long], { radius: 10 });

    // Add marker and circle to a feature group
    var featureGroup = L.featureGroup([marker, circle]).addTo(map);

    console.log("Your Location is: Lat: "+ lat +" Long: "+ long+ " Accuracy: "+ accuracy)
}

// If Cannot Access Geolocation
function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
        // Runs if user refuses access
    } else {
        alert("Cannot get current location");
        // Runs if there was a technical problem.
    }
}
