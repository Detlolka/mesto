import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import  { initialCards }  from '../utils/data.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { enableValidationOptions } from '../utils/constants.js';
import './index.css';

const addButton = document.querySelector('.profile__addButton');  // открытие попапа карт
const editButton = document.querySelector('.profile__editButton'); // открытие попапа профиля
const eventClearForm = new Event('clearForm', {}); // Пользовательский Ивент очистки формы
const popupPicture = new PopupWithImage('.popup_image');  // экземпляр класса карт
const profileInfo = new UserInfo({userName:'.profile__title', userAbout:'.profile__subtitle'}); // Экземпляр класса UserInfo
const profileNameInput = document.querySelector('.popup__input_name'); //Поле ввода имени профиля
const profileAboutInput = document.querySelector('.popup__input_about'); //Поле ввода информации о себе в профиле

popupPicture.setEventListeners(); //Слушатель попапа изображений

function placeCard ({name, link}) {         // Функция геренации карт
    const card = new Card({
        cardSelector : '#element',
        data: {name, link},
        handleCardClick: () => {
            popupPicture.open({name, link})
        }
    });
     return card.generateCard();
}

const cards = new Section({                //Класс секции
    itemSelector: '.elements',
    items: initialCards,   
    renderer: ({name, link}) => {
        const cardElement = placeCard({name, link});        
        cards.addItem(cardElement);
    }
});

cards.renderer();

const popupCard = new PopupWithForm({      // форма для добавление карточек
    popupSelector: '.popup_card',
    handleFormSubmit: (formdate) => {
        const {
            placeName: name,
            placePhoto: link
        } = formdate;
        const cardElem = placeCard({name, link});
        cards.addItem(cardElem);
    }
});

popupCard.setEventListeners();  // Слушатель формы карт

const popupCardValid = new FormValidator(enableValidationOptions, popupCard.getForm()); //Валидация формы карт
popupCardValid.enableValidation();


const popupProfile = new PopupWithForm({    // Попап профиля
    popupSelector: '.popup_profile',
    handleFormSubmit: (formdate) => {
        const {
            profileName: name,
            profileAbout: about
        } = formdate;        
        profileInfo.setUserInfo({name, about});
    }
});

popupProfile.setEventListeners();

const popupProfileValid = new FormValidator(enableValidationOptions, popupProfile.getForm()); // Валидация попапа профиля
popupProfileValid.enableValidation();

function getPopupProfileInputs ({name, about}) { // Функция установки изначальных полей
    profileNameInput.value = name;
    profileAboutInput.value = about;
}

function openPopupProfile () {                                      // Открытие попапа профиля
    const info = profileInfo.getUserInfo();    
    popupProfile.open({
        customEvent: eventClearForm,        
    })
    getPopupProfileInputs({name: info.name, about: info.about}); 
}

function openPopupCard () {                          // Открытие попапа карт
    popupCard.open({
        customEvent: eventClearForm
    })
}

editButton.addEventListener('click', openPopupProfile);   // Открытие попапа профиля
addButton.addEventListener('click', openPopupCard);       //Открытие попапа карт















