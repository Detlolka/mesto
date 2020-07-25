import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithRemove from '../components/PopupWithRemove.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import { enableValidationOptions } from '../utils/constants.js';
import './index.css';

const addButton = document.querySelector('.profile__addButton');  // открытие попапа карт
const editButton = document.querySelector('.profile__editButton'); // открытие попапа профиля
const profileNameInput = document.querySelector('.popup__input_name'); //Поле ввода имени профиля
const profileAboutInput = document.querySelector('.popup__input_about'); //Поле ввода информации о себе в профиле
const cardNameInput = document.querySelector('.popup__input_place'); //Поле ввода имени карточки
const cardUrlInput = document.querySelector('.popup__input_image'); //Поля ввода урл карточки
const profileImage = document.querySelector('.profile__image'); //Аватарка профиля
const profileAvatarPopup = document.querySelector('.profile__avatar');

//Экземпляры классов
const eventClearForm = new Event('clearForm', {}); // Пользовательский Ивент очистки формы
const popupPicture = new PopupWithImage('.popup_image');  // экземпляр класса карт
const profileInfo = new UserInfo('.profile__title', '.profile__subtitle'); // Экземпляр класса UserInfo

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-13",
    headers: {
        authorization: "3d90ed66-5470-4061-9f08-ef73936051ae",
        "Content-Type": "application/json",
    }
});

popupPicture.setEventListeners(); //Слушатель попапа изображений

const popupRemove = new PopupWithRemove('.popup_delete-place', ({ cardElement, cardId }) => {   //Экземпляр попап удаления карт
    api.removeCard(cardId)
        .then(() => {
            popupRemove.changeButtonName('Удаление...')
            cardElement.remove();            
        })
        .catch((err) => console.error(err))
        .finally(() => {
            popupRemove.close();
        })        
})

popupRemove.setEventListeners() // Слушатели для попапа удаления карт

const popupAvatar = new PopupWithAvatar({   //Экземпляр попапа аватарки
    popupSelector: '.popup_avatar',
    handleFormSubmit: (formdate) => {
        popupAvatar.changeButtonName('Загрузка...');
        api.changeAvatar(formdate)
            .then((res) => {
                popupAvatar.setProfileAvatar(res.avatar);                
            })
            .catch((err) => console.error(err))
            .finally(() => {
                popupAvatar.close();
            })
    }
})

popupAvatar.setEventListeners(); //Слушатели попапа аватарки

const popupWithAvatarValid = new FormValidator(enableValidationOptions, popupAvatar.getForm()); // Валидация формы аватарки
popupWithAvatarValid.enableValidation();

function placeCard(data) {         // Функция геренации карт
    const card = new Card(data, {
        cardSelector: '#element',
        handleCardClick: () => {
            popupPicture.open(data.name, data.link)
        },
        handleCardRemove: ({ cardElement, cardId }) => {
            popupRemove.changeButtonName('Да');
            popupRemove.open({ cardElement, cardId })
        },
        handleCardLike: ({ cardId }) => {
            if (card.isLiked()) {
                api.dislikeCard(cardId)
                    .then((data) => {                        
                        card.changeLikes(data)
                    })
                    .catch((err) => console.error(err));
            } else {
                api.likeCard(cardId)
                    .then((data) => {
                        card.changeLikes(data)
                    })
                    .catch((err) => console.error(err));
            }
        }
    })
    return card.generateCard();
}

const cardItems = new Section('.elements', (data) => {    // экземляр класса секции
    const cardElement = placeCard(data);
    cardItems.addItem(cardElement);
});


// Попап формы добавление карт


const popupCard = new PopupWithForm({
    popupSelector: '.popup_card',
    handleFormSubmit: (formdate) => {
        popupCard.changeButtonName('Сохранение...')
        const {
            placeName: name,
            placePhoto: link
        } = formdate;
        api.createCard(name, link)
            .then((data) => {                
                const cardElem = placeCard(data);
                cardItems.addItem(cardElem);                
            })
            .catch((err) => console.error(err))
            .finally(() => {
                popupCard.close();
            })
    }
});

popupCard.setEventListeners();  // Слушатели формы карт

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
                popupProfile.close();
            })
            .catch((err) => console.error(`Ошибка: ${err}`))
            .finally(() => {
                popupProfile.close();
            })
    }
});

popupProfile.setEventListeners(); //Слушатели формы профиля

const popupProfileValid = new FormValidator(enableValidationOptions, popupProfile.getForm()); // Валидация попапа профиля
popupProfileValid.enableValidation();

// Конец секции попапа профиля

function clearInputsPopupCard () {   // Очищение инпутов попапа карт
    cardNameInput.value = "";
    cardUrlInput.value = "";
}

function setInputsValueProfile(name, about) { // Установка данных в инпуты попапа профиля
    profileNameInput.value = name;
    profileAboutInput.value = about;
}


function openPopupProfile() {                                     // Открытие попапа профиля
    popupProfile.changeButtonName('Сохранить');
    popupProfile.open({
        customEvent: eventClearForm
    })
}

function openPopupCard() {                     // Открытие попапа карт
    popupCard.changeButtonName('Сохранить');
    clearInputsPopupCard();                         
    popupCard.open({
        customEvent: eventClearForm
    })
}

function openPopupAvatar() {
    popupAvatar.changeButtonName('Сохранить');
    popupAvatar.open({
        customEvent: eventClearForm
    })
}


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then((res) => {
        profileInfo.setUserInfo(res[1].name, res[1].about);
        setInputsValueProfile(res[1].name, res[1].about);
        profileImage.src = res[1].avatar;
        cardItems.rendererCards(res[0], cardItems);        
    })


profileAvatarPopup.addEventListener('click', openPopupAvatar); // Открытие попапа аватарки
editButton.addEventListener('click', openPopupProfile);   // Открытие попапа профиля
addButton.addEventListener('click', openPopupCard);       //Открытие попапа карт















