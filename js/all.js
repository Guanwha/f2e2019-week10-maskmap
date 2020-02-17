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

// filter distance dropdown
let elDist800 = document.querySelector('#dist-800');
let elDist1200 = document.querySelector('#dist-1200');
let elDist2000 = document.querySelector('#dist-2000');
$('#dist-800').on('click', (e) => {
  map.setRange(0.8);
  elDist800.setAttribute('class', 'dropdown-item active');
  elDist1200.setAttribute('class', 'dropdown-item');
  elDist2000.setAttribute('class', 'dropdown-item');
  map.findNearPharmacies();
  map.filterPharmacyList(showAdult, showChild, hideSoldOut);
});
$('#dist-1200').on('click', (e) => {
  map.setRange(1.2);
  elDist800.setAttribute('class', 'dropdown-item');
  elDist1200.setAttribute('class', 'dropdown-item active');
  elDist2000.setAttribute('class', 'dropdown-item');
  map.findNearPharmacies();
  map.filterPharmacyList(showAdult, showChild, hideSoldOut);
});
$('#dist-2000').on('click', (e) => {
  map.setRange(2);
  elDist800.setAttribute('class', 'dropdown-item');
  elDist1200.setAttribute('class', 'dropdown-item');
  elDist2000.setAttribute('class', 'dropdown-item active');
  map.findNearPharmacies();
  map.filterPharmacyList(showAdult, showChild, hideSoldOut);
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
