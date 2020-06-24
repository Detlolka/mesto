import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './data.js';



const enableValidationOptions ={               //валидация
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_invalid',
    //errorClass: 'popup__error_visible'
  };


const popupProfile = document.querySelector('.popup_profile'); // Форма Popup для профиля
const popupCard = document.querySelector('.popup_card'); // popup для добавление карточек
const formElement = popupProfile.querySelector('.popup__form'); // Форма профиля
const popupProfileValid = new FormValidator(enableValidationOptions, formElement); //Валидация формы профиля
popupProfileValid.enableValidation();
const formAddCard = popupCard.querySelector('.popup__form_card'); // Форма добавление карт
const popupCardValid = new FormValidator(enableValidationOptions, formAddCard); //Валидация формы карт
popupCardValid.enableValidation();
const popupImage = document.querySelector('.popup_image'); //popup для фото
const popupImagePicture = popupImage.querySelector('.popup__picture'); // картинка Popup
const popupDescription = popupImage.querySelector('.popup__description'); // Текст под картинкой
const nameInput = formElement.querySelector('.popup__input_name'); // Поле ввода имени    
const jobInput = formElement.querySelector('.popup__input_about'); // Поле с доп.информацией
const profileName = document.querySelector('.profile__title'); // Заголовок профиля
const profileAbout = document.querySelector('.profile__subtitle'); // Подзаголовок профиля
const placeName = document.querySelector('.popup__input_place'); // интпут места
const placeImage = document.querySelector('.popup__input_image'); // инпут для изображения карточки
const addButton = document.querySelector('.profile__addButton');  // открытие попапа карт
const editButton = document.querySelector('.profile__editButton'); // Открытие попапа профиля
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close'); // закрытие профиля
const popupCardCloseBtn = popupCard.querySelector('.popup__close');  // закрытие попапа карт
const popupImageCloseBtn = popupImage.querySelector('.popup__close');  // закрытие попапа картинки
const elements = document.querySelector(".elements"); // Блок куда добавлять template элементы
const eventClearForm = new Event('clearForm', {}); // Пользовательский Ивент очистки формы






function closePopup(popup) {                          //закрытие Popups
    popup.classList.remove('popup_opened');    
    popup.removeEventListener('click', overlayHandler);
    document.removeEventListener('keydown', escHandler);          
 };

function escHandler (evt) {                        // закрытие на кнопку Esc
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));        
    }
};

function overlayHandler (evt) {                        // закрытие по щелчку мыши на клик по фону попапов
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);        
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




function popupProfileOpen () {                 // открытие попапа профиля
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;       
    openPopup(popupProfile); 
}; 
 

function popupCardOpen () {                  // открытие попапа добавление карта 
    placeName.value = "";
    placeImage.value = "";       
    openPopup(popupCard); 
};

export function popupImageOpen ({name, link}) {
    popupDescription.textContent = name;
    popupImagePicture.src = link;
    popupImagePicture.alt = name;
    openPopup(popupImage);
}

 
function formSubmitHandler (evt) {                  // Отправка данных в профиль
    evt.preventDefault();       
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;    
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
    
    closePopup(popupCard);       
}





editButton.addEventListener('click', popupProfileOpen);   
addButton.addEventListener('click', popupCardOpen);
formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', cardInput);
popupProfileCloseBtn.addEventListener('click', () => closePopup(popupProfile));
popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));













