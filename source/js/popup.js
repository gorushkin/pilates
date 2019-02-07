var buttonList = document.querySelectorAll('.level-card__make-order');
var overlay = document.querySelector('.overlay');
var popup = document.querySelector('.popup');
var closeButton = document.querySelector('.popup__close');

for (var i = 0; i < buttonList.length; i++) {
  buttonHandler(i);
}

function buttonHandler(n) {
  buttonList[n].addEventListener('click', function(evt) {
    evt.preventDefault();
    console.log(n);
    showPopup();
  })
}

function showPopup() {
  overlay.classList.add('overlay--show');
  popup.classList.add('popup--show');
  closeButton.addEventListener('click', closePopup);
}

function closePopup() {
  overlay.classList.remove('overlay--show');
  popup.classList.remove('popup--show');
  closeButton.removeEventListener('click', closePopup);
}
