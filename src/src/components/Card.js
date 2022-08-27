export class Card {
    // Передача в конструктор необходимых параметров для создания карточки
    constructor(item, templateSelector, handleCardClick, userId, deleteCardFromServer, putLike, deleteLike) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._id = item._id;
        this._userId = userId;
        this._likes = item.likes;
        this._ownerId = item.owner._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCardFromServer = deleteCardFromServer;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    getId() {
        return this._id;
    }

    // Публичный метод создания карточки
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardLikesAmount = this._element.querySelector('.elements__likes-amount');

        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._element.querySelector('.elements__group-text').textContent = this._name;
        this._cardLikesAmount.textContent = this._likesAmount;

        // Скрытие иконки корзины со своей карточки
        if (this._ownerId !== this._userId) {
            this._deleteButton.remove();
        }

        this._setEventListeners();
        this.updateLikesAmount(this._item);
        this._checkLikes();

        return this._element;
    }


    likeElement() {
        this._likeButton.classList.add('elements__like-button_active');
    }

    disLikeElement() {
        this._likeButton.classList.remove('elements__like-button_active');
    }

    _checkLikes() {
        this._likes.forEach((like) => {
            if (like._id === this._userId) {
                this._likeButton.classList.add('elements__like-button_active');
            }
        });
    }

    updateLikesAmount(item) {
        this._cardLikesAmount.textContent = item.likes.length;
    }

    deleteCard() {
        this._element.closest('.elements__item').remove();
        this._element = null;
    };


    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('elements__like-button_active')) {
                this._deleteLike();
            } else {
                this._putLike();
            }
        });

        if (this._ownerId === this._userId) {
            this._deleteButton.addEventListener('click', () => {
                this._deleteCardFromServer();
            });
        }
    }
}