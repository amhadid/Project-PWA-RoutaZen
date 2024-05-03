// Connect Server
function fetchData() {
    fetch('http://localhost:4000/api/user')
        .then(response => response.json())
        .then(({ areaSemarang, areaRawan, kecelakaan2021, kecelakaan2022, kecelakaan2023 }) => {
            console.log("Area Kota Semarang:");
            console.log(areaSemarang);

            console.log("Area Rawan:");
            console.log(areaRawan);

            console.log("Kecelakaan 2021:");
            console.log(kecelakaan2021);

            console.log("Kecelakaan 2022:");
            console.log(kecelakaan2022);

            console.log("Kecelakaan 2023:");
            console.log(kecelakaan2023);
        })
        .catch(error => console.error('Error:', error));
}

// Panggil fungsi fetchData saat halaman dimuat
window.onload = fetchData;
