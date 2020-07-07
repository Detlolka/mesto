export default class Section {
    constructor({ items, renderer, itemSelector }) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(itemSelector);

    }

    _clear() {
        this._container.innerHTML = "";
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderer() {
        this._clear();
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}

