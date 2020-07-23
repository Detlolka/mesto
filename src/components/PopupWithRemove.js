import Popup from './Popup.js';

export default class PopupWithRemove extends Popup {
    constructor(popupSelector, handleButtonDel) {
        super(popupSelector);
        this._handleButtonDel = handleButtonDel;
        this._buttonDel = this._popup.querySelector('.popup__save');
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonDel.addEventListener('click', (evt) => {
            this._handleButtonDel(this._card);
        })
    }

    open(card) {
        super.open();
        this._card = card;
    }
} 