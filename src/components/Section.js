export default class Section {
    constructor(itemSelector, renderer, initialArray) {       
        this._container = document.querySelector(itemSelector);
        this._renderer = renderer;
        this._initialArray = initialArray;
    }    

    addItem(element) {   //Вывод карточек в разметку
        this._container.prepend(element);
    }

    rendererCards() {        //Перебор массива карт
        this._initialArray.reverse().forEach(item => {            
            this._renderer(item)
        });
    }
}

