import * as map from "./map.js";

map.initMap();
map.getUserLocation();

///// buttons /////

// relocation button
let elBtnReLocation = document.querySelector('.btn-reloc');
elBtnReLocation.addEventListener('click', () => {
  map.getUserLocation();
});
