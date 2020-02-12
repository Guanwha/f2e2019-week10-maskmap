import * as map from "./map.js";
import * as api from "./api.js";


///// main flow /////
map.initMap();
map.getUserLocation();
api.getPharmacies(map.extractPharmacies);


///// buttons /////

// relocation button
let elBtnReLocation = document.querySelector('.btn-reloc');
elBtnReLocation.addEventListener('click', () => {
  map.getUserLocation();
});
