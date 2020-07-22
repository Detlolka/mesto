import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__picture');
    this._popupImageDescr = this._popup.querySelector('.popup__description');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageDescr.textContent = name;
    super.open();
  }
}