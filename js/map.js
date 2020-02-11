// initialize the map on the "map" div with a given center and zoom
let myLocation = [25.047794, 121.516947];   // default location
let map;

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
