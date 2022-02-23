import { storageService } from './storage.service.js'
import { mapService } from './map.service.js'

const STORAGE_KEY = 'locDB'


export const locService = {
    getLocs,
    saveLocation
}

const gLocs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]






function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function saveLocation(pos) {
    console.log('pos', pos)
    gLocs.push(pos)
    storageService.save(STORAGE_KEY, gLocs)
}

