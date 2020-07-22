import  Card  from '../components/Card.js';
import  FormValidator  from '../components/FormValidator.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import { enableValidationOptions } from '../utils/constants.js';
import './index.css';

const addButton = document.querySelector('.profile__addButton');  // открытие попапа карт
const editButton = document.querySelector('.profile__editButton'); // открытие попапа профиля
const profileNameInput = document.querySelector('.popup__input_name'); //Поле ввода имени профиля
const profileAboutInput = document.querySelector('.popup__input_about'); //Поле ввода информации о себе в профиле
const profileImage = document.querySelector('.profile__image'); //Аватарка профиля
const profileAvatarPopup = document.querySelector('.profile__avatar');

//Экземпляры классов
const eventClearForm = new Event('clearForm', {}); // Пользовательский Ивент очистки формы
const popupPicture = new PopupWithImage('.popup_image');  // экземпляр класса карт
const profileInfo = new UserInfo('.profile__title','.profile__subtitle'); // Экземпляр класса UserInfo
const cardItem = new Section('.elements'); // экземляр класса секции
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
    headers: {
      authorization: "3d90ed66-5470-4061-9f08-ef73936051ae",
      "Content-Type": "application/json",
    }
  });

popupPicture.setEventListeners(); //Слушатель попапа изображений

const popupAvatar = new PopupWithAvatar({   //Экземпляр попапа аватарки
    popupSelector: '.popup_avatar',
    handleFormSubmit: (formdate) => {        
        popupAvatar.changeButtonName('Загрузка...');
        api.changeAvatar(formdate)
        .then((res) => {
            popupAvatar.setProfileAvatar(res.avatar);
            popupAvatar.close();
        })
        .catch((err) => console.error(err));
    } 
})

popupAvatar.setEventListeners(); //Слушатели попапа аватарки

const popupWithAvatarValid = new FormValidator(enableValidationOptions, popupAvatar.getForm()); // Валидация формы аватарки
popupWithAvatarValid.enableValidation();

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


// Попап формы добавление карт

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

// Конец секции формы добавления карт

// Попап профиля

const popupProfile = new PopupWithForm({    
    popupSelector: '.popup_profile',
    handleFormSubmit: (formdate) => {
        popupProfile.changeButtonName('Загрузка...');
        const {
            profileName: name,
            profileAbout: about
        } = formdate;        
        api.changeUserInfo(name, about)
        .then(() => {
            profileInfo.setUserInfo(name, about);
            popupProfile.close()
        })
        .catch((err) => console.error(`Ошибка: ${err}`))       
    }
});

popupProfile.setEventListeners(); //Слушатели формы профиля

const popupProfileValid = new FormValidator(enableValidationOptions, popupProfile.getForm()); // Валидация попапа профиля
popupProfileValid.enableValidation();

// Конец секции попапа профиля


function openPopupProfile () {                                     // Открытие попапа профиля
    popupProfile.changeButtonName('Сохранить');    
    popupProfile.open({
        customEvent: eventClearForm        
    })     
}

function openPopupCard () {                          // Открытие попапа карт
    popupCard.open({
        customEvent: eventClearForm
    })
}

function openPopupAvatar () {
    popupAvatar.changeButtonName('Сохранить');
    popupAvatar.open({
        customEvent: eventClearForm
    })
}

function setInputsValueProfile(name, about) { // Установка данных в инпуты попапа профиля
   profileNameInput.value = name;
   profileAboutInput.value = about;
}


Promise.all([api.getInitialCards(), api.getUserInfo()])
.then((res) => {
  profileInfo.setUserInfo(res[1].name, res[1].about);
  setInputsValueProfile(res[1].name, res[1].about)  
  profileImage.src = res[1].avatar;
})


profileAvatarPopup.addEventListener('click', openPopupAvatar); // Открытие попапа аватарки
editButton.addEventListener('click', openPopupProfile);   // Открытие попапа профиля
addButton.addEventListener('click', openPopupCard);       //Открытие попапа карт















