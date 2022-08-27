// Класс отвечает за открытие и закрытие попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClick = this._closeByClick.bind(this);
    }

    // Метод открытия попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closeByClick);
    }

    // Метод закрытия попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closeByClick);
    }

    // Добавление слушателя клика по кнопке закрытия попапа
    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });
    }

    // Привытный метод закрытия клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // Приватный метод закрытия кликом на оверлэй
    _closeByClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
} 