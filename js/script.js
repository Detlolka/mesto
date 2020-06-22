import { Card } from './card.js';

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

const popupProfile = document.querySelector('.popup_profile'); // Форма Popup для профиля
const popupCard = document.querySelector('.popup_card'); // popup для добавление карточек
const formElement = popupProfile.querySelector('.popup__form'); // Форма
const formAddCard = popupCard.querySelector('.popup__form_card'); // Форма добавление карт
export const popupImage = document.querySelector('.popup_image'); //popup для фото
const nameInput = formElement.querySelector('.popup__input_name'); // Поле ввода имени    
const jobInput = formElement.querySelector('.popup__input_about'); // Поле с доп.информацией
const profileName = document.querySelector('.profile__title'); // Заголовок профиля
const profileAbout = document.querySelector('.profile__subtitle'); // Подзаголовок профиля
export const popupImagePicture = popupImage.querySelector('.popup__picture'); // картинка Popup
export const popupDescription = popupImage.querySelector('.popup__description'); // Текст под картинкой
const placeName = document.querySelector('.popup__input_place'); // интпут места
const placeImage = document.querySelector('.popup__input_image'); // инпут для изображения карточки
const addButton = document.querySelector('.profile__addButton');  // открытие попапа карт
const editButton = document.querySelector('.profile__editButton'); // Открытие попапа профиля
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close'); // закрытие профиля
const popupCardCloseBtn = popupCard.querySelector('.popup__close');  // закрытие попапа карт
export const popupImageCloseBtn = popupImage.querySelector('.popup__close');  // закрытие попапа картинки
const elements = document.querySelector(".elements"); // Блок куда добавлять template элементы
const eventClearForm = new Event('clearForm', {});


function closePopup(popup) {                          //закрытие Popups
    popup.classList.remove('popup_opened');          
 };

function escHandler (evt) {                        // закрытие на кнопку Esc
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
        this.removeEventListener('keydown', escHandler);
    }
};

function overlayHandler (evt) {                        // закрытие по щелчку мыши на клик по фону попапов
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
        this.removeEventListener('click', overlayHandler);
    }
};

export function openPopup (popup) {                       //  Открытие Popups
    popup.classList.add('popup_opened');
    popup.addEventListener('click', overlayHandler);
    document.addEventListener('keydown', escHandler);
    if (popup.querySelector('.popup__form')) {
        popup.querySelector('.popup__form').dispatchEvent(eventClearForm);
    }    
};

function popupProfileOpen () {      // открытие попапа профиля
    openPopup(popupProfile);
};

function popupCardOpen () {       // открытие попапа добавление карта
    openPopup(popupCard);
};

 
function formSubmitHandler (evt) {                  // Отправка данных в профиль
    evt.preventDefault();       
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    closePopup(popupProfile);       
};



 function renderCards(cards) {      //Подгрузка карт из массива
    cards.forEach((item) => {        
    const card = new Card(item,'#element');        
    const cardElement = card.generateCard();    
    elements.prepend(cardElement);
    }); 
};

renderCards(initialCards);


function cardInput (evt) {                   //Создание карточки через форму
    evt.preventDefault();
    const card = new Card({name:placeName.value, link:placeImage.value}, '#element');
    const cardElement = card.generateCard();                
    elements.prepend(cardElement);
    placeName.value = "";
    placeImage.value = "";
    closePopup(popupCard);       
}

const enableValidationOptions ={               //валидация
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_invalid',
    //errorClass: 'popup__error_visible'
  };

enableValidation(enableValidationOptions);

editButton.addEventListener('click', popupProfileOpen);  
addButton.addEventListener('click', popupCardOpen);
formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', cardInput);
popupProfileCloseBtn.addEventListener('click', () => closePopup(popupProfile));
popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));













