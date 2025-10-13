"use strict";
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function getClosestPlace(targetLat, targetLon, markers) {
    let closestMarker = markers[0];
    let minDistance = calculateDistance(targetLat, targetLon, markers[0][0], markers[0][1]);
    for (let i = 1; i < markers.length; i++) {
        const distance = calculateDistance(targetLat, targetLon, markers[i][0], markers[i][1]);
        if (distance < minDistance) {
            minDistance = distance;
            closestMarker = markers[i];
        }
    }
    return closestMarker;
}
const markers = [
    [50.4501, 30.5234, "Київ"],
    [49.8397, 24.0297, "Львів"],
    [46.4825, 30.7233, "Одеса"],
    [49.9935, 36.2304, "Харків"],
    [48.4647, 35.0462, "Дніпро"]
];
const findBtn = document.getElementById('findBtn');
const resultBlock26 = document.getElementById('resultBlock');
const resultContent26 = document.getElementById('result-content');
findBtn === null || findBtn === void 0 ? void 0 : findBtn.addEventListener('click', () => {
    const latInput = document.getElementById('targetLat');
    const lonInput = document.getElementById('targetLon');
    const lat = parseFloat(latInput.value);
    const lon = parseFloat(lonInput.value);
    if (isNaN(lat) || isNaN(lon)) {
        alert('Введіть коректні координати!');
        return;
    }
    const closest = getClosestPlace(lat, lon, markers);
    const distance = calculateDistance(lat, lon, closest[0], closest[1]);
    resultContent26.textContent =
        `Найближче місто: ${closest[2]}\n` +
            `Координати: ${closest[0]}, ${closest[1]}\n` +
            `Відстань: ${distance.toFixed(2)} км`;
    resultBlock26.style.display = 'block';
});
