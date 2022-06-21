// Определение элементов попапа редактирования профиля в структуре DOM
const popupProfile = document.querySelector('.popup_type_edit-profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const formElementProfile = popupProfile.querySelector('#popup__edit');
const nameInput = popupProfile.querySelector('#edit_name');
const jobInput = popupProfile.querySelector('#edit_profession');
const profile = document.querySelector('.profile');
const profileAuthor = profile.querySelector('.profile__title');
const profileComment = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');

// Слушатель события с функцией открытия попапа редактирования профиля
editButton.addEventListener('click', openPopup => {
    popupProfile.classList.add('popup_opened');
});

// Функция присвоения значений полям ввода в форме
function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    popupProfile.classList.remove('popup_opened');
};

// Обработчик кнопки Сохранить
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

// Слушатель события с функцией закрытия попапа
closeButtonProfile.addEventListener('click', closePopup => {
    popupProfile.classList.remove('popup_opened');
});




// Определение элементов попапа добавления карточки в структуре DOM
const popupElementCard = document.querySelector('.popup_type_add-card');
const closeButtonCard = popupElementCard.querySelector('.popup__close-button');
const formElementCard = popupElementCard.querySelector('#popup__new-place');
const cardNameInput = formElementCard.querySelector('#place_name');
const cardUrlInput = formElementCard.querySelector('#place_url');
const addButton = profile.querySelector('.profile__add-button');
const saveButtonCard = formElementCard.querySelector('.popup__submit-button');

// Слушатель события с функцией открытия попапа формы добавления карточки
addButton.addEventListener('click', openPopup => {
    popupElementCard.classList.add('popup_opened');
});

// Слушатель события с функцией закрытия попапа
closeButtonCard.addEventListener('click', closePopup => {
    popupElementCard.classList.remove('popup_opened');
});


// Функция создания новой карточки
function formSubmitHandlerCard(evt) {
    evt.preventDefault();

    const newCard = [];
    newCard.name = cardNameInput.value;
    newCard.link = cardUrlInput.value;

    const newCardElement = createCard(newCard);
    addCard(newCardElement);

    cardNameInput.value = '';
    cardUrlInput.value = '';

    popupElementCard.classList.remove('popup_opened');
};


// Слушатель для кнопки submit
popupElementCard.addEventListener('submit', formSubmitHandlerCard);





// Определение элементов модального окна с изображением из карточки в структуре DOM
const popupElementImage = document.querySelector('.popup_type_photo');
const closeButtonImage = popupElementImage.querySelector('.popup__close-button');
const figureElement = document.querySelector('.popup__photo-image');
const imagePhoto = figureElement.querySelector('.popup__image');
const imageCaption = figureElement.querySelector('.popup__caption');


// Слушатель для кнопки закрытия модального окна с изображением и функции закрытия
closeButtonImage.addEventListener('click', closePupup => {
    popupElementImage.classList.remove('popup_opened');
});





// Определение элементов контейнера с карточками и шаблона для создания карточки в структуре DOM
const elementsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки с присвоением значений картинки и подписи
function createCard(element) {
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');

    cardImage.src = element.link;
    cardImage.alt = element.name;

    cardElement.querySelector('.elements__group-text').textContent = element.name;

    // Определение кнопки лайка и функция добавления класса активной кнопки
    const likeButton = cardElement.querySelector('.elements__like-button');

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });

    // Определение кнопки удаления карточки и функция удаления родительского элемента
    const cardDeleteButton = cardElement.querySelector('.elements__delete-button');

    cardDeleteButton.addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    });


    cardImage.addEventListener('click', (evt) => {
        popupElementImage.classList.add('popup_opened');
        imagePhoto.src = element.link;
        imagePhoto.alt = element.name;
        imageCaption.textContent = element.name;

    });

    return cardElement;
};

// Добавление карточки в начало контейнера
function addCard(cardElement) {
    elementsContainer.prepend(cardElement);
};

// Перебор элементов и создание карточек
initialCards.forEach(element => {
    const newCard = createCard(element);
    addCard(newCard);
});