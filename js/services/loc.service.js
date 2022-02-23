import { storageService } from './storage.service.js'
import { mapService } from './map.service.js'

const STORAGE_KEY = 'locDB'

var gId = 0;
export const locService = {
    getLocs,
    saveLocation
}

const gLocs = storageService.load(STORAGE_KEY) || [];
console.log(gLocs);



function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function saveLocation(pos) {
    console.log(pos);
    var newLocation = _createLocation(pos.lat, pos.lng);
    gLocs.push(newLocation)
    storageService.save(STORAGE_KEY, gLocs)
}

function _createLocation(lat, lng) {
    var location = {
        id: gId++,
        name: prompt('location name'),
        lat: lat,
        lng: lng,
        weather: 'not yet',
        createdAt: Date.now(),
        updatedAt: 'not now',
    }
    return location;
}