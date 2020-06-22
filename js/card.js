import { openPopup, popupImagePicture, popupDescription, popupImage} from "./script.js";

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;        
        this._link = data.link;
        this._cardSelector = cardSelector;               
    }

    _getTemplate() {
        const cardElement = document.
        querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);        
        
        return cardElement
    } 

    _toggleLike() {        
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
                                 
    }

    _deleteElement() {
        this._element.closest(".element").remove();
    };
    
    _popupImageOpen() {
        popupImagePicture.src = this._link;
        popupDescription.textContent = this._name;
        openPopup(popupImage);
    }

    _setEventListeners() {
        this._element.addEventListener('click', () => {            
            this._toggleLike();            
        });
        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._deleteElement();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._popupImageOpen();
        });
    }

    generateCard() {
        this._element = this._getTemplate();                
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}


