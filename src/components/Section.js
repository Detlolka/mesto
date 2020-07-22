export default class Section {
    constructor(itemSelector, renderer) {       
        this._container = document.querySelector(itemSelector);
        this._renderer = renderer;
    }    

    addItem(element) {   //Вывод карточек в разметку
        this._container.prepend(element);
    }

    rendererCards(cardData, renderer) {        //Перебор массива карт
        cardData.reverse().forEach(item => {            
            return this._renderer(item)
        });
    }
}

