import { Card } from './js/Card.js';
import { FormValidator } from './js/FormValidator.js';
import { initialCards } from './js/data.js';
import { popupImage, openPopup, closePopup  } from './js/utils.js';
import './pages/index.css';

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














