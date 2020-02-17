import * as map from "./map.js";
import * as api from "./api.js";
import "./ui.js";


///// variables /////
let showAdult = false;
let showChild = false;
let hideSoldOut = false;


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

// filter adult mask button
$('#showAdult').on('click', (e) => {
  if (e.target.nodeName === 'INPUT') {
    showAdult = e.target.checked;
    console.log(`adult mask is ${showAdult}`);
    map.filterPharmacyList(showAdult, showChild, hideSoldOut);
  }
})
// filter child mask button
$('#showChild').on('click', (e) => {
  if (e.target.nodeName === 'INPUT') {
    showChild = e.target.checked;
    console.log(`child mask is ${showChild}`);
    map.filterPharmacyList(showAdult, showChild, hideSoldOut);
  }
})
// filter sold-out mask button
$('#hideSoldOut').on('click', (e) => {
  if (e.target.nodeName === 'INPUT') {
    hideSoldOut = e.target.checked;
    console.log(`hide mask is ${hideSoldOut}`);
    map.filterPharmacyList(showAdult, showChild, hideSoldOut);
  }
})
