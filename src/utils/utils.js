 export const popupImage = document.querySelector('.popup_image'); //popup для фото
 const popupImagePicture = popupImage.querySelector('.popup__picture'); // картинка Popup
 const popupDescription = popupImage.querySelector('.popup__description'); // Текст под картинкой
 const eventClearForm = new Event('clearForm', {}); // Пользовательский Ивент очистки формы


export function popupImageOpen ({name, link}) {
    popupDescription.textContent = name;
    popupImagePicture.src = link;
    popupImagePicture.alt = name;
    openPopup(popupImage);
}

export function closePopup(popup) {                          //закрытие Popups
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