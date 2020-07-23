export default class Card {
    constructor(data, { cardSelector, handleCardClick, handleCardRemove, handleCardLike }) {         // конструктор класса Card;
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardLike = handleCardLike;
    }

    _getTemplate() {         // Метод извлечения данных из template Элемента
        const cardElement = document.
            querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement
    }

    _clickButtonLike() {
        this._handleCardLike({
            cardId: this._data.Id
        })
    }

    _clickRemoveButton() {
        this._handleCardRemove({
            cardElement: this._element,
            cardId: this._data._id
        })
    }

    isliked() {
        if (this._data.likes.some((like) => like._id === '62a85f38a6cb4f0e9b63649f')) {
            return true
        } else {
            return false
        }
    }

    _like() {
        this._element.querySelector('.element__like').classList.add('element__like_active'); // Лайк
    }

    _disLike() {
        this._element.querySelector('.element__like').classList.remove('element__like_active'); //Дизлайк
    }

    changeLikes(data) {
        this._data = data;
        this._counterLikes()
        if (this.isliked()) {
            this._like();
        } else {
            this._disLike();
        }

    }

    _counterLikes() {
        this._element.querySelector('.element__like-counter').textContent = this._data.likes.length;
    }

    _handleImageClick() {                         // метод клика по фото
        return this._handleCardClick();
    }

    _setEventListeners() {   // Метод навешивания слушателей
        this._element.querySelector('.element__image').addEventListener('click', () => {
            return this._handleImageClick();
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._clickButtonLike();
        })
        this._elementDel.addEventListener('click', () => {
            this._clickRemoveButton();
        })
    }    

    generateCard() {        //Метод геренации карт
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._name;
        this._elementDel= this._element.querySelector('.element__del');        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        if('62a85f38a6cb4f0e9b63649f' === this._data.owner._id) {
            this._elementDel.classList.add('element__del_active');
        }
        this.changeLikes(this._data);
        this._setEventListeners();
        return this._element;
    };
}


