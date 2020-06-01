const popupProfile = document.querySelector('.popup_profile'); // Форма Popup для профиля
const popupCard = document.querySelector('.popup_card'); // popup для добавление карточек
const formElement = popupProfile.querySelector('.popup__form'); // Форма
const formAddCard = popupCard.querySelector('.popup__form_card'); // Форма добавление карт
const popupImage = document.querySelector('.popup_image'); //popup для фото
const nameInput = formElement.querySelector('.popup__input_name'); // Поле ввода имени    
const jobInput = formElement.querySelector('.popup__input_about'); // Поле с доп.информацией
const profileName = document.querySelector('.profile__title'); // Заголовок профиля
const profileAbout = document.querySelector('.profile__subtitle'); // Подзаголовок профиля
const popupImagePicture = popupImage.querySelector('.popup__picture'); // картинка Popup
const popupDescription = popupImage.querySelector('.popup__description'); // Текст под картинкой
const placeName = document.querySelector('.popup__input_place'); // интпут места
const placeImage = document.querySelector('.popup__input_image'); // инпут для изображения карточки
const buttonsClose = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__addButton');
const editButton = document.querySelector('.profile__editButton');


function closePopup(popup) {
   if (!popup.target.closest('.popup_opened')) {
       return;
   }                            //закрытие Popups
   if (popup.target) {
     popup = popup.target.closest('.popup_opened');      
   } 
   popup.classList.remove('popup_opened');    
}



function openPopup (popup) {                           //  Открытие Popups
    popup.classList.add('popup_opened'); 
}

function popupProfileOpen () {      // открытие попапа профиля
    openPopup(popupProfile);
}

function popupCardOpen () {       // открытие попапа добавление карта
    openPopup(popupCard);
}

 
function formSubmitHandler (evt) {                  // Отправка данных в профиль
    evt.preventDefault();       
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    closePopup(popupProfile);       
}



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



const element = document.querySelector("#element").content; // нашли template элемент, стянули контент
const elements = document.querySelector(".elements"); // Блок куда добавлять template элементы


initialCards.forEach( item => {                             // функция добавления стартовых карточек из массива при загрузке страницы
        return elements.prepend(createCard(item.name, item.link));       
    });

function popupImageOpen (evt) {
    popupImagePicture.src = evt.target.src;
    popupDescription.textContent = evt.target.getAttribute('alt');
    openPopup(popupImage);
}




function createCard (placeValue, imageValue) {
    const copyCard = element.cloneNode(true);
    copyCard.querySelector(".element__title").textContent = placeValue;
    copyCard.querySelector(".element__image").src = imageValue;
    copyCard.querySelector(".element__image").alt = placeValue;
    copyCard.querySelector(".element__like").addEventListener("click", function (evt){
        evt.target.classList.toggle('element__like_active');
    });
    copyCard.querySelector(".element__del").addEventListener("click", function (evt) {
        evt.target.closest(".element").remove();
    });
    copyCard.querySelector(".element__image").addEventListener("click", function (evt) {
        popupImageOpen(evt);
    });                             
    return copyCard;
}

function cardInput (evt) {
    evt.preventDefault();       
    elements.prepend(createCard(placeName.value, placeImage.value));
    placeName.value = "";
    placeImage.value = "";
    closePopup(popupCard);       
}


editButton.addEventListener("click", popupProfileOpen);  
addButton.addEventListener('click', popupCardOpen);
buttonsClose.forEach(button => button.addEventListener('click', closePopup)); // закрытие попапов и окон
formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', cardInput);







