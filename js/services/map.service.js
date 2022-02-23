import { storageService } from './storage.service.js'
import { locService } from './loc.service.js'


export const mapService = {
    initMap,
    addMarker,
    panTo,
}

const STORAGE_KEY = 'locDB'

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        gMap = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: {lat,lng}
               
            });
            console.log(infoWindow.position);
            
            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                var loc = {
                    lat:mapsMouseEvent.latLng.lat(),
                    lng:mapsMouseEvent.latLng.lng()
                }
                addMarker(loc)
            });

            console.log(gMap);
        })
}

function addMarker(loc) {
    console.log(loc);
    const contentString = 
    `<div>
    <button onclick="onSaveLocation(${loc.lng}, ${loc.lat})">Save Location</button>
    </div>`
 
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    // saveLocation(loc)
    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          gMap,
          shouldFocus: false,
        });
      });

    console.log('marker', marker.position);
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAK9Beo64o0cIwTuiJ7FeGKOj20Y0iEHjE'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    console.log(elGoogleApi.src);
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}




