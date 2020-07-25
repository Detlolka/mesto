export default class Card {
    constructor(data, userData, { cardSelector, handleCardClick, handleCardRemove, handleCardLike }) {         // конструктор класса Card;
        this._data = data;
        this._userData = userData;
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
        this._handleCardLike( {
            cardId: this._data._id 
        }            
        )        
    }

    _clickRemoveButton() {
        this._handleCardRemove({
            cardElement: this._element,
            cardId: this._data._id
        })
    }

    isLiked() {
        return !!(this._data.likes.some((like) => like._id === this._userData._id))             
    }

    _like() {
        this._element.querySelector('.element__like').classList.add('element__like_active'); // Лайк
    }

    _disLike() {
        this._element.querySelector('.element__like').classList.remove('element__like_active'); // Дизлайк
    }

    _counterLikes() {
        this._element.querySelector('.element__like-counter').textContent = this._data.likes.length; // счетчик лайков
    }

    changeLikes(data) {                                // Проверка на лайк
        this._data = data;
        this._counterLikes()
        if (this.isLiked()) {
            this._like();
        } else {
            this._disLike();
        }

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
        });
        this._elementDel.addEventListener('click', () => {
            this._clickRemoveButton();
        });
    }    

    generateCard() {        //Метод геренации карт
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._name;
        this._elementDel= this._element.querySelector('.element__del');        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        if(this._userData._id === this._data.owner._id) {   // Если айди совпадает с ID карточки пользователя, то добавляется элемент  позволяющий удалять
            this._elementDel.classList.add('element__del_active');
        }
        this.changeLikes(this._data);
        this._setEventListeners();
        return this._element;
    };
}


