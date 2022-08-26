export class Card {
    // Передача в конструктор необходимых параметров для создания карточки
    constructor(data, userId, templateSelector, handleCardClick, { handleTrashClick, handleLikeUpdate }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._likesAmount = data.likes.length;
        this._cardId = data._id;
        this._userId = userId;
        this._ownerIsMe = (data.owner._id === this._userId); // проверка, является ли пользователь автором карточки
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeUpdate = handleLikeUpdate;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    // Добавление лайка (изменение иконки сердца)
    handleLikeElement() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    // Удаление карточки
    handleDeleteElement() {
        this._element.remove();
        this._element = null;
    }

    // Получение id карточки
    getCardId() {
        return this._cardId;
    }

    // Получение статуса карточки
    getLikedStatus() {
        return this._likes.some((like) => like._id === this._userId);
    }

    updateLikesAmount() {
        this._cardLikesAmount.textContent = this._likes.length;
    }

    updateLikesInfo({ likes }) {
        this._likes = likes;
    }


    // Публичный метод создания карточки
    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardLikesAmount = this._element.querySelector('.elements__likes-amount');
        this._setEventListeners();

        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._element.querySelector('.elements__group-text').textContent = this._name;
        this._cardLikesAmount.textContent = this._likesAmount;

        // Скрытие иконки корзины со своей карточки
        if (!this._ownerIsMe) {
            this._deleteButton.style.display = 'none';
        }

        // Проверка, была ли карточка отмечена лайком
        this._likes.forEach(element => {
            if (Object.values(element).includes(this._userId)) {
                this.handleLikeClick();

                return;
            }
        })

        return this._element;
    }




    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeUpdate();
        });

        this._deleteButton.addEventListener('click', (evt) => {
            this._handleDeleteClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}