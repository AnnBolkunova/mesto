export class Card {
    // Передача в конструктор необходимых параметров для создания карточки
    constructor({name, link}, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    // Приватный метод удаления карточки
    _handleDeleteElement() {
        this._element.closest('.elements__item').remove();
    }


    // Публичный метод создания карточки
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._cardImage = this._element.querySelector('.elements__image');
        this._setEventListeners();

        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._element.querySelector('.elements__group-text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeElement();
        });

        this._deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteElement();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}