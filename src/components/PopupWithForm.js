import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues
    }

    getForm() {
        return this._form;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());            
        });
    }

    open({ customEvent }) {
        this._form.dispatchEvent(customEvent);
        super.open();
    }

    close() {
        this._removeEventListeners();
        super.close();
    }
}

