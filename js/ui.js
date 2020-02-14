
// menu open/close
let elMenu = document.querySelector('.menu');
let elBtnMenuCtrl = document.querySelector('.btn-menu-ctrl');
let elBtnMenuCtrlIcon = document.querySelector('.btn-menu-ctrl .icon');

elMenu.dataset.isopen = 0;
elBtnMenuCtrl.addEventListener('click', () => {
  if (elMenu.dataset.isopen == 1) {
    // close menu
    elMenu.style.width = 0;
    elMenu.dataset.isopen = 0;
    elBtnMenuCtrlIcon.style.transform = "rotate(180deg)";
  }
  else {
    // open menu
    elMenu.style.width = '90%';
    elMenu.dataset.isopen = 1;
    elBtnMenuCtrlIcon.style.transform = "rotate(0deg)";
  }
});

let elMap = document.getElementById('map');
elMap.addEventListener('click', () => {
  if (elMenu.dataset.isopen == 1) {
    // close menu
    elMenu.style.width = 0;
    elMenu.dataset.isopen = 0;
    elBtnMenuCtrlIcon.style.transform = "rotate(180deg)";
  }
});

