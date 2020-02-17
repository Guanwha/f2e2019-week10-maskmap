
// get pharmacies info from gov
export const getPharmacies = (receiveData) => {
  // get data from api
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
  xhr.send();
  xhr.onload = () => {
    if (receiveData && xhr.status === 200) {
      receiveData(xhr.responseText);
    }
  };
}