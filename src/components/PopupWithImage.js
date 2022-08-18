import Popup from './Popup.js'

// Наследование родительского класса Popup с изменением метода open
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePhoto = this._popup.querySelector('.popup__image');
        this._imageCaption = this._popup.querySelector('.popup__caption');
    }

    // Метод добавления попапу изображения и подписи
    open(name, link) {
        this._imagePhoto.src = link;
        this._imagePhoto.alt = name;
        this._imageCaption.textContent = name;
        super.open();
    }
} 