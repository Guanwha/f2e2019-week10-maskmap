
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


// menu header
let date = new Date();
let weekDay = date.getDay();
switch(weekDay) {
  case 0: $('#header-weekday')[0].textContent = '星期日'; break;
  case 1: $('#header-weekday')[0].textContent = '星期一'; break;
  case 2: $('#header-weekday')[0].textContent = '星期二'; break;
  case 3: $('#header-weekday')[0].textContent = '星期三'; break;
  case 4: $('#header-weekday')[0].textContent = '星期四'; break;
  case 5: $('#header-weekday')[0].textContent = '星期五'; break;
  case 6: $('#header-weekday')[0].textContent = '星期六'; break;
}

$('#header-date')[0].textContent = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

if (weekDay == 1 || weekDay == 3 || weekDay == 5) {
  $('#header-valid-num')[0].textContent = '1.3.5.7.9';
}
else if (weekDay == 2 || weekDay == 4 || weekDay == 6) {
  $('#header-valid-num')[0].textContent = '2.4.6.8.0';
}
else {
  $('#header-valid-num')[0].textContent = '所有';
}

