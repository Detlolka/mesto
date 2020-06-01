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
const addButton = document.querySelector('.profile__addButton');
const editButton = document.querySelector('.profile__editButton');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close');
const popupCardCloseBtn = popupCard.querySelector('.popup__close');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');


function closePopup(popup) {   
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


function renderCards(cards) {
    cards.forEach(item => elements.prepend(createCard(item.name, item.link)));
}

renderCards(initialCards);

function popupImageOpen (evt) {
    popupImagePicture.src = evt.target.src;
    popupDescription.textContent = evt.target.getAttribute('alt');
    openPopup(popupImage);
}

function deleteElement (evt) {
    evt.target.closest(".element").remove();
}

function toggleLike (evt) {
    evt.target.classList.toggle('element__like_active');
}

function createCard (placeValue, imageValue) {
    const copyCard = element.cloneNode(true);
    copyCard.querySelector(".element__title").textContent = placeValue;
    copyCard.querySelector(".element__image").src = imageValue;
    copyCard.querySelector(".element__image").alt = placeValue;
    copyCard.querySelector(".element__like").addEventListener("click", toggleLike);
    copyCard.querySelector(".element__del").addEventListener("click", deleteElement);
    copyCard.querySelector(".element__image").addEventListener("click", popupImageOpen);                             
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
formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', cardInput);
popupProfileCloseBtn.addEventListener('click', () => closePopup(popupProfile));
popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));






