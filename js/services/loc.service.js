import { storageService } from './storage.service.js'
import { mapService } from './map.service.js'


export const locService = {
    getLocs,
    
}



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


// function createLocation(loc) {
//     mapService.getLocation(loc)
//     const location = {
//         id,
//         name,
//         lat: loc.lat,
//         lng: loc.lng,
//         weather,
//         createdAt,
//         updatedAt,  
//     }

// }