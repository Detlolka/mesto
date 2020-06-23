import { openPopup, popupImagePicture, popupDescription, popupImage} from "./script.js";

export class Card {
    constructor(data, cardSelector) {         // конструктор класса Card;
        this._name = data.name;        
        this._link = data.link;
        this._cardSelector = cardSelector;               
    };

    _getTemplate () {         // Метод извлечения данных из template Элемента
        const cardElement = document.
        querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);        
        
        return cardElement
    }; 

    _toggleLike () {         // Метод установки/снятия лайка
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
                                 
    };

    _deleteElement () {          // Метод удаление карты
        this._element.closest(".element").remove();
    };
    
    _popupImageOpen () {       // Метод открытия попапа Карт
        popupImagePicture.src = this._link;
        popupDescription.textContent = this._name;
        openPopup(popupImage);
    };

    _setEventListeners () {     // Метод навешивания слушателей
        this._element.querySelector('.element__like').addEventListener('click', () => {            
            this._toggleLike();            
        });
        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._deleteElement();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._popupImageOpen();
        });
    };

    generateCard () {         // Метод геренации карт
        this._element = this._getTemplate();                
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._setEventListeners();
        return this._element;
    };
};


