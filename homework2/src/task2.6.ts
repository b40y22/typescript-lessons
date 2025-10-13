type Marker = [number, number, string];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getClosestPlace(targetLat: number, targetLon: number, markers: Marker[]): Marker {
    let closestMarker: Marker = markers[0];
    let minDistance: number = calculateDistance(targetLat, targetLon, markers[0][0], markers[0][1]);

    for (let i = 1; i < markers.length; i++) {
        const distance = calculateDistance(targetLat, targetLon, markers[i][0], markers[i][1]);
        if (distance < minDistance) {
            minDistance = distance;
            closestMarker = markers[i];
        }
    }

    return closestMarker;
}

const markers: Marker[] = [
    [50.4501, 30.5234, "Київ"],
    [49.8397, 24.0297, "Львів"],
    [46.4825, 30.7233, "Одеса"],
    [49.9935, 36.2304, "Харків"],
    [48.4647, 35.0462, "Дніпро"]
];

const findBtn = document.getElementById('findBtn') as HTMLButtonElement;
const resultBlock26 = document.getElementById('resultBlock') as HTMLDivElement;
const resultContent26 = document.getElementById('result-content') as HTMLElement;

findBtn?.addEventListener('click', (): void => {
    const latInput = document.getElementById('targetLat') as HTMLInputElement;
    const lonInput = document.getElementById('targetLon') as HTMLInputElement;

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