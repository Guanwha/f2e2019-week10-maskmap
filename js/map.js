// variables
let myLocation = [25.047794, 121.516947];   // default location
let myMarker = null;                        // my location marker
let map;
let markers = null;                         // MarkerClusterGroup


// initialize the map on the "map" div with a given center and zoom
export const initMap = () => {
  // create a map
  map = L.map('map', {
    center: myLocation,
    zoom: 13
  });

  // add base map layer into the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  // use MarkerClusterGroup to limit marker number
  markers = new L.MarkerClusterGroup().addTo(map);
};

// get the location (asynchronous)
export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(extractLatLong);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
const extractLatLong = (position) => {
  myLocation = [position.coords.latitude, position.coords.longitude];

  // create/update my location marker
  if (!myMarker) {
    var gpsIcon = new L.Icon({
      iconUrl: '/images/map_marker_me.svg',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [32, 43],
      iconAnchor: [16, 43],
      shadowSize: [43, 43],
      shadowAnchor: [14, 43],
      popupAnchor: [0, -43],
    });
    myMarker = L.marker(myLocation, { icon: gpsIcon }).addTo(map).bindPopup('You\'re here').openPopup();
  }
  else {
    myMarker.setLatLng(myLocation);
  }

  // set map center
  map.setView(myLocation);
}

// extract pharmacies from api
export const extractPharmacies = (responseText) => {
  let data = JSON.parse(responseText).features;
  for (let i=0; i<data.length; i++) {
    markers.addLayer(L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]])
                      .bindPopup(data[i].properties.name));
  }
  map.addLayer(markers);
}

