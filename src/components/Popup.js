export default class Popup {
    constructor(popupSelector){
      this._popup = document.querySelector(popupSelector);      
      this._buttonClose = this._popup.querySelector('.popup__close');     
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
        this._buttonClose.removeEventListener('click', this.close);
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);

    }

    open() {         
         this._popup.classList.add('popup_opened');         
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }
 }