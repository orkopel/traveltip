import { storageService } from './storage.service.js'
import { mapService } from './map.service.js'

const STORAGE_KEY = 'locDB'

var gId = 0;
export const locService = {
    getLocs,
    saveLocation,
    getgLocations,
    deleteLocation,
}

const gLocs = storageService.load(STORAGE_KEY) || [];


function getgLocations() {
    return gLocs;
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function saveLocation(pos) {
    console.log(pos);
    var newLocation = createLocation(pos.lat, pos.lng);
    gLocs.push(newLocation)
    storageService.save(STORAGE_KEY, gLocs)
}

function makeId(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function createLocation(lat, lng) {
    var location = {
        id: makeId(3),
        name: prompt('location name'),
        lat: lat,
        lng: lng,
        weather: 'not yet',
        createdAt: Date.now(),
        updatedAt: 'not now',
    }
    return location;
}

function deleteLocation(id) {
    var locationIdx = gLocs.findIndex((locs) => {
        return locs.id === id;
    })
    const marker = gLocs[locationIdx]
    gLocs.splice(locationIdx,1)
    console.log(locationIdx)
    storageService.save(STORAGE_KEY, gLocs)

}
