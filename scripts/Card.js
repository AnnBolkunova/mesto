export class Card {
    // Передача в конструктор необходимых параметров для создания карточки
    constructor(name, link, templateSelector, popupElementImage, imagePhoto, imageCaption, openPopup) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._popupElementImage = popupElementImage;
        this._imagePhoto = imagePhoto;
        this._imageCaption = imageCaption;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    // Приватный метод лайка
    _handleLikeElement() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

    // Приватный метод удаления карточки
    _handleDeleteElement() {
        this._element.closest('.elements__item').remove();
    }

    // Приватный метод открытия окна с изображением из карточки
    _handleImageShow() {
        this._openPopup(this._popupElementImage);
        this._imagePhoto.src = this._link;
        this._imagePhoto.alt = this._name;
        this._imageCaption.textContent = this._name;
    }

    // Публичный метод создания карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.elements__image').alt = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__group-text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeElement();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {
            this._handleDeleteElement();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleImageShow();
        });
    }


}