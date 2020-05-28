const editButton = document.querySelector('.profile__editButton'); // Кнопка вызова формы
const popupProfile = document.querySelector('.popup_profile'); // Форма Popup для профиля
const popupCard = document.querySelector('.popup_card'); // popup для добавление карточек
const popupClose = document.querySelector('.popup__close'); // Кнопка закрытия Popupa
const formElement = popupProfile.querySelector('.popup__form'); // Форма
const formAddCard = popupCard.querySelector('.popup__form_card'); // Форма добавление карт
const popupImage = document.querySelector('.popup_image'); //popup для фото
const nameInput = formElement.querySelector('.popup__input_name'); // Поле ввода имени    
const jobInput = formElement.querySelector('.popup__input_about'); // Поле с доп.информацией
const profileName = document.querySelector('.profile__title'); // Заголовок профиля
const profileAbout = document.querySelector('.profile__subtitle'); // Подзаголовок профиля
const addCard = document.querySelector('.profile__addButton') // кнопка добавления карты
const page = document.querySelector('.page'); //  для закрытия форм
const popupImagePicture = popupImage.querySelector('.popup__picture'); // картинка Popup
const popupDescription = popupImage.querySelector('.popup__description'); // Текст под картинкой



function openCloseForm (evt) {                              //  Вызов и закрытие форм
    if (evt.target.classList.contains('profile__addButton')) {
        popupCard.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileAbout.textContent;
    }
    if (evt.target.classList.contains('profile__editButton')) {
        popupProfile.classList.add('popup_opened');
    }
    if (evt.target.classList.contains('element__image')) {
        popupImage.classList.add('popup_opened');
    }
    if (evt.target.classList.contains('popup__close')) {
        popupCard.classList.remove('popup_opened');
        popupProfile.classList.remove('popup_opened');
        popupImage.classList.remove('popup_opened');
    }
    if (evt.target.classList.contains('popup__save')) {
       popupProfile.classList.remove('popup_opened');
    }
    if (evt.target.classList.contains('popup__save_card')) {
        popupCard.classList.remove('popup_opened');
    }    
}
 
function formSubmitHandler (evt) {                  // Отправка данных в профиль
    evt.preventDefault();       
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;       
}

formElement.addEventListener('submit', formSubmitHandler);
page.addEventListener("click", openCloseForm);

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


initialCards.forEach( function (item) {                             // функция добавления стартовых карточек из массива при загрузке страницы
        addCards(item.name, item.link);       
    });


function listenCards (evt) {                                    //функция условий для слушателей
    if (evt.target.classList.contains('element__like')) {
        toggLike(evt);
    }
    if (evt.target.classList.contains('element__del')) {
        delElement(evt);
    }
    if (evt.target.classList.contains('element__image')) {
        popupImageOpen(evt)
    }
}

function toggLike (evt) {                                       // лайки
    evt.target.classList.toggle('element__like_active');
}

function delElement (evt) {                                     //удаление карточек
    evt.target.closest('.element').remove();
}

function popupImageOpen (evt) {
    popupImagePicture.src = evt.target.src;
    popupDescription.textContent = evt.target.getAttribute('data-description');
}

elements.addEventListener("click", listenCards);                 // Слушатель для элементов карты


function addCards (placeValue, imageValue) {
    const copyCard = element.cloneNode(true);
    copyCard.querySelector(".element__title").textContent = placeValue;
    copyCard.querySelector(".element__image").src = imageValue;
    copyCard.querySelector(".element__image").alt = placeValue;
    copyCard.querySelector(".element__image").setAttribute("data-description", placeValue);                         
    elements.prepend(copyCard);
}

function cardInput (evt) {
    evt.preventDefault();
    const placeName = document.querySelector('.popup__input_place');
    const placeImage = document.querySelector('.popup__input_image');

    addCards(placeName.value, placeImage.value);
    
    placeName.value = "";
    placeImage.value = "";
}


formAddCard.addEventListener('submit', cardInput);







