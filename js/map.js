// variables
let myLocation = [25.047794, 121.516947];   // default location
let myMarker = null;                        // my location marker
let map;


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
    myMarker = L.marker(myLocation).addTo(map).bindPopup('You\'re here').openPopup();
  }
  else {
    myMarker.setLatLng(myLocation);
  }

  // set map center
  map.setView(myLocation);
}

