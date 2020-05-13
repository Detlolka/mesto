const editButton = document.querySelector('.profile__editButton'); // Кнопка вызова формы
const popup = document.querySelector('.popup'); // Форма Popup
const popupClose = popup.querySelector('.popup__close'); // Кнопка закрытия Popupa
const formElement = popup.querySelector('.popup__form'); // Форма
const nameInput = formElement.querySelector('.popup__input-name'); // Поле ввода имени    
const jobInput = formElement.querySelector('.popup__input-about'); // Поле с доп.информацией
const profileName = document.querySelector('.profile__title'); // Заголовок профиля
const profileAbout = document.querySelector('.profile__subtitle'); // Подзаголовок профиля

editButton.addEventListener('click', function () {     //  Вызов формы
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;    

});

popupClose.addEventListener("click", function() {    //  Закрытие формы    
    
    popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {                  // Отправка данных в профиль
    evt.preventDefault();       
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
    
}

formElement.addEventListener('submit', formSubmitHandler);

