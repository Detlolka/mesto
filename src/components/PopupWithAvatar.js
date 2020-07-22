import Popup from './Popup.js';

export default class PopupWithAvatar extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValue() {             // Данные с инпута
        const inputDate = this._popup.querySelector('.popup__input_avatar');        
        return inputDate.value;
    }

    setProfileAvatar(link) {  // Установка Аватарки
        const profileAvatar = document.querySelector('.profile__image');
        profileAvatar.src = link;
    }

    getForm() {  // Для валидации форм
        return this._form;
    }

    setEventListeners() {  // Навешивание слушателей событий 
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup__form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValue());
        })
    }

    open({customEvent}) {
        this._form.dispatchEvent(customEvent);
        super.open();
    }
}