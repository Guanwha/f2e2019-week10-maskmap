
// sidebar open/close
let elNavBar = document.querySelector('.navbar');
let elBtnNavCtrl = document.querySelector('.btn-nav-ctrl');
let elBtnNavCtrlIcon = document.querySelector('.btn-nav-ctrl .icon');

elNavBar.dataset.isopen = 0;
elBtnNavCtrl.addEventListener('click', () => {
  if (elNavBar.dataset.isopen == 1) {
    // close sidebar
    elNavBar.style.width = 0;
    elNavBar.dataset.isopen = 0;
    elBtnNavCtrlIcon.style.transform = "rotate(180deg)";
  }
  else {
    // open sidebar
    elNavBar.style.width = '90%';
    elNavBar.dataset.isopen = 1;
    elBtnNavCtrlIcon.style.transform = "rotate(0deg)";
  }
});

let elMap = document.getElementById('map');
elMap.addEventListener('click', () => {
  if (elNavBar.dataset.isopen == 1) {
    // close sidebar
    elNavBar.style.width = 0;
    elNavBar.dataset.isopen = 0;
    elBtnNavCtrlIcon.style.transform = "rotate(180deg)";
  }
});

