// Класс отвечает за отрисовку элементов на странице и добавление в DOM-структуру 
// Всю разметку класс получает через функцию-колбэк и вставляет ее в контейнер

export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Публичный метод отрисовки элементов
    renderItems(items) {
        this._items = items;
        this._items.forEach((item) => {
            this.addItem(this._renderer(item));
        });
    }

    // Публичный метод, который принимает DOM-элемент и вставляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    }
} 