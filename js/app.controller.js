import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLocation = onSaveLocation
window.panLocation = panLocation
window.onDeleteLocation = onDeleteLocation

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    renderLocations()

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        onInit()
    })

}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSaveLocation(lng, lat) {
    locService.saveLocation({ lng, lat })
    renderLocations()
}

function renderLocations() {
    var locations = locService.getgLocations();

    var locationsToHTML = '';
    locationsToHTML = locations.map((location) => {
        return locationsToHTML = `<li id="${location.id}">Name: ${location.name} , Lat: ${location.lat}, Lng: ${location.lng} </li><button onclick="panLocation(${location.lat},${location.lng})">Pan Location</button><button onclick="onDeleteLocation('${location.id}')">Delete Location</button>`;
    })
    document.querySelector('.locations-table').innerHTML = locationsToHTML.join('')
}

function panLocation(lat,lng) {
    mapService.panTo(lat,lng);
}

function onDeleteLocation(id) {
    console.log(id)
    locService.deleteLocation(id)
    renderLocations();
}

