export default class Card {
    constructor({ data, cardSelector, handleCardClick }) {         // конструктор класса Card;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;   // функция открытия попапа с картинкой            
    }

    _getTemplate() {         // Метод извлечения данных из template Элемента
        const cardElement = document.
            querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }

    _handleImageClick() {                         // метод клика по фото
        return this._handleCardClick();
    }

    _toggleLike() {         // Метод установки/снятия лайка
        this._element.querySelector('.element__like').classList.toggle('element__like_active');

    }

    _deleteElement() {          // Метод удаление карты
        this._element.closest(".element").remove();
    };


    _setEventListeners() {     // Метод навешивания слушателей
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._toggleLike();
        });
        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._deleteElement();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            return this._handleImageClick();
        });
    }

    generateCard() {        //Метод геренации карт
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._setEventListeners();
        return this._element;
    };
}


