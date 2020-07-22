export default class Section {
    constructor(itemSelector) {       
        this._container = document.querySelector(itemSelector);
    }    

    addItem(element) {   //Вывод карточек в разметку
        this._container.prepend(element);
    }

    renderer(cardData, renderer) {        //Перебор массива карт
        cardData.forEach(item => {
            renderer(item);
        });
    }
}

