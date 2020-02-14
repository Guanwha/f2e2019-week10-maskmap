
// menu open/close
let elNavBar = document.querySelector('.menu');
let elBtnMenuCtrl = document.querySelector('.btn-menu-ctrl');
let elBtnMenuCtrlIcon = document.querySelector('.btn-menu-ctrl .icon');

elNavBar.dataset.isopen = 0;
elBtnMenuCtrl.addEventListener('click', () => {
  if (elNavBar.dataset.isopen == 1) {
    // close menu
    elNavBar.style.width = 0;
    elNavBar.dataset.isopen = 0;
    elBtnMenuCtrlIcon.style.transform = "rotate(180deg)";
  }
  else {
    // open menu
    elNavBar.style.width = '90%';
    elNavBar.dataset.isopen = 1;
    elBtnMenuCtrlIcon.style.transform = "rotate(0deg)";
  }
});

let elMap = document.getElementById('map');
elMap.addEventListener('click', () => {
  if (elNavBar.dataset.isopen == 1) {
    // close menu
    elNavBar.style.width = 0;
    elNavBar.dataset.isopen = 0;
    elBtnMenuCtrlIcon.style.transform = "rotate(180deg)";
  }
});

