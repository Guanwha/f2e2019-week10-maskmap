// variables
let myLocation = [25.047794, 121.516947];   // default location [latitude, longitude]
let myMarker = null;                        // my location marker
let map;
let markers = null;                         // MarkerClusterGroup
let range = 0.8;                            // add to menu list if location is in this range
let pharmacies = null;                      // total pharmacies data
let pharmacyItems = [];                     // save generated pharmacy info
let pharmacyMarkers = {};                   // save generated pharmacy markers
let nMaskAdult = 0;
let nMaskChild = 0;
let isGPSCatched = false;                   // check if gps is catched

// icons
let gpsIcon = new L.Icon({
  iconUrl: './images/map_marker_me.svg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  shadowSize: [43, 43],
  shadowAnchor: [14, 43],
  popupAnchor: [0, -43],
});
let adultIcon = new L.Icon({
  iconUrl: './images/map_marker_adult.svg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  shadowSize: [43, 43],
  shadowAnchor: [14, 43],
  popupAnchor: [0, -43],
});
let childIcon = new L.Icon({
  iconUrl: './images/map_marker_child.svg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  shadowSize: [43, 43],
  shadowAnchor: [14, 43],
  popupAnchor: [0, -43],
});
let bothIcon = new L.Icon({
  iconUrl: './images/map_marker_both.svg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  shadowSize: [43, 43],
  shadowAnchor: [14, 43],
  popupAnchor: [0, -43],
});
let noneIcon = new L.Icon({
  iconUrl: './images/map_marker_none.svg',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  shadowSize: [43, 43],
  shadowAnchor: [14, 43],
  popupAnchor: [0, -43],
});


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
  markers = new L.MarkerClusterGroup({disableClusteringAtZoom: 16}).addTo(map);
};

// get the location (asynchronous)
export const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(extractLatLong);
    isGPSCatched = true;
    findNearPharmacies();
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
const extractLatLong = (position) => {
  myLocation = [position.coords.latitude, position.coords.longitude];

  // create/update my location marker
  if (!myMarker) {
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
  pharmacies = data;
  nMaskAdult = 0;
  nMaskChild = 0;
  pharmacyMarkers = {};
  for (let i=0; i<data.length; i++) {
    // decide icon type
    let icon = null;
    if (data[i].properties.mask_adult == 0 && data[i].properties.mask_child == 0) {
      icon = noneIcon;
    }
    else if (data[i].properties.mask_adult == 0) {
      icon = childIcon;
    }
    else if (data[i].properties.mask_child == 0) {
      icon = adultIcon;
    }
    else {
      icon = bothIcon;
    }

    // create marker
    let marker = L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], { icon: icon })
                  .bindPopup(genPopup(data[i].properties));
    pharmacyMarkers[`${data[i].properties.id}`] = marker;
    markers.addLayer(marker);

    // statistic
    nMaskAdult += data[i].properties.mask_adult;
    nMaskChild += data[i].properties.mask_child;
  }
  map.addLayer(markers);
  console.log(`成人口罩剩餘：${nMaskAdult}。兒童口罩剩餘：${nMaskChild}。`);

  // update pharmacy list
  findNearPharmacies();
}

// popup layout
const genPopup = (property) => {
  return `
  <h1>${property.name}</h1>
  <div>成人：${property.mask_adult}</div>
  <div>兒童：${property.mask_child}</div>
  `
}

// 
export const findNearPharmacies = () => {
  if (pharmacies == null || !isGPSCatched) return;

  let elList = document.querySelector('#pharmacy-list');
  elList.innerHTML = '';
  pharmacyItems = [];

  for (let i=0; i<pharmacies.length; i++) {
    let properties = pharmacies[i].properties;
    let coordinates = pharmacies[i].geometry.coordinates;
    if (kmFromLatLong(myLocation[0], myLocation[1], coordinates[1], coordinates[0]) < range) {
      // prepare string
      let adultClassStr;
      let adultMaskStr;
      if (properties.mask_adult > 0) {
        adultClassStr = `has-adult-mask`;
        adultMaskStr = `成人：${properties.mask_adult} 個`;
      }
      else {
        adultClassStr = `none-mask`;
        adultMaskStr = `成人：已售完`;
      }
      let childClassStr;
      let childMaskStr;
      if (properties.mask_child > 0) {
        childClassStr = `has-child-mask`;
        childMaskStr = `兒童：${properties.mask_child} 個`;
      }
      else {
        childClassStr = `none-mask`;
        childMaskStr = `兒童：已售完`;
      }

      // combine the html
      let a = document.createElement('a');
      a.setAttribute('class', 'pharmacy-card list-group-item list-group-item-action');
      a.setAttribute('id', `pharmacy${properties.id}`);
      a.setAttribute('data-lat', coordinates[1]);
      a.setAttribute('data-long', coordinates[0]);
      let html = `
      <div class="pharmacy-title">${properties.name}</div>
      <div class="pharmacy-info d-flex align-items-center">
        <img class="info-icon" src="./images/icon_marker.svg" alt="">${properties.address}
      </div>
      <div class="pharmacy-info d-flex align-items-center">
        <img class="info-icon" src="./images/icon_phone.svg" alt="">${properties.phone}
      </div>
      <div class="pharmacy-mask-info clear-fix">
        <div class="mask-info mask-info-adult ${adultClassStr} float-left">${adultMaskStr}</div>
        <div class="mask-info mask-info-child ${childClassStr} float-right">${childMaskStr}</div>
      </div>
      `;
      a.innerHTML = html;

      // save to array
      let idx = pharmacyItems.length;
      let pharmacy = {};
      pharmacy.id = properties.id;
      pharmacy.lat = coordinates[1];
      pharmacy.long = coordinates[0];
      pharmacy.nMaskAdult = properties.mask_adult;
      pharmacy.nMaskChild = properties.mask_child;
      pharmacy.name = properties.name;
      pharmacy.address = properties.address;
      pharmacy.phone = properties.phone;
      pharmacy.html = html;
      pharmacyItems.push(pharmacy);

      // set listener
      a.addEventListener('click', (e) => {
        focusPharmacy(pharmacy);
      }, true);

      // push to menu list
      elList.appendChild(a);
    }
  }
}
// convert degree to radian
let deg2rad = (deg) => {
  return deg / 180 * Math.PI;
};
// calculate the distance(km) from latitude/longitude
let kmFromLatLong = (lat1, long1, lat2, long2) => {
    let radLat1 = deg2rad(lat1);
    let radLat2 = deg2rad(lat2);
    let radLng1 = deg2rad(long1);
    let radLng2 = deg2rad(long2);
    let a = radLat1 - radLat2;
    let b = radLng1 - radLng2;
    return 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2))) * 6378.137;
};

// filter nearby pharmacy list
export const filterPharmacyList = (showAdult, showChild, hideSoldOut) => {
  if (pharmacyItems.length === 0) return;

  let elList = document.querySelector('#pharmacy-list');
  elList.innerHTML = '';

  for (let i=0; i<pharmacyItems.length; i++) {
    let pharmacy = pharmacyItems[i];

    if (showAdult && pharmacy.nMaskAdult === 0) continue;
    if (showChild && pharmacy.nMaskChild === 0) continue;
    if (hideSoldOut && pharmacy.nMaskAdult === 0 && pharmacy.nMaskChild === 0) continue;

    // prepare string
    let adultClassStr;
    let adultMaskStr;
    if (pharmacy.nMaskAdult > 0) {
      adultClassStr = `has-adult-mask`;
      adultMaskStr = `成人：${pharmacy.nMaskAdult} 個`;
    }
    else {
      adultClassStr = `none-mask`;
      adultMaskStr = `成人：已售完`;
    }
    let childClassStr;
    let childMaskStr;
    if (pharmacy.nMaskChild > 0) {
      childClassStr = `has-child-mask`;
      childMaskStr = `兒童：${pharmacy.nMaskChild} 個`;
    }
    else {
      childClassStr = `none-mask`;
      childMaskStr = `兒童：已售完`;
    }

    // combine the html
    let a = document.createElement('a');
    a.setAttribute('class', 'pharmacy-card list-group-item list-group-item-action');
    a.setAttribute('id', `pharmacy${pharmacy.id}`);
    a.setAttribute('data-lat', pharmacy.lat);
    a.setAttribute('data-long', pharmacy.long);
    let html = `
    <div class="pharmacy-title">${pharmacy.name}</div>
    <div class="pharmacy-info d-flex align-items-center">
      <img class="info-icon" src="./images/icon_marker.svg" alt="">${pharmacy.address}
    </div>
    <div class="pharmacy-info d-flex align-items-center">
      <img class="info-icon" src="./images/icon_phone.svg" alt="">${pharmacy.phone}
    </div>
    <div class="pharmacy-mask-info clear-fix">
      <div class="mask-info mask-info-adult ${adultClassStr} float-left">${adultMaskStr}</div>
      <div class="mask-info mask-info-child ${childClassStr} float-right">${childMaskStr}</div>
    </div>
    `;
    a.innerHTML = html;
    a.addEventListener('click', (e) => {
      focusPharmacy(pharmacy);
    }, false);
    elList.appendChild(a);
  }
}

// click pharmacy in the pharmacy list
const focusPharmacy = (pharmacy) => {
  flyTo(pharmacy.lat, pharmacy.long, 16);
  pharmacyMarkers[pharmacy.id].openPopup();
}

// set the map center, zoom
const flyTo = (lat, long, zoom) => {
  if (map) {
    if (zoom) {
      map.flyTo([lat, long], zoom);
    }
    else {
      map.flyTo([lat, long]);
    }
  }
}

// set the filter range
export const setRange = (filterRange) => {
  range = filterRange;
}
