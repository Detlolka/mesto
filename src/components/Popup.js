export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    _removeEventListeners() {
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    changeButtonName(buttonName) { //Изменения имени кнопки сабмита в зависимости от загрузки данных/простоя
        const button = this._popup.querySelector('.popup__save');
        button.textContent = buttonName;

    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }
}