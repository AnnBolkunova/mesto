import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const validData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// Определение элементов попапа редактирования профиля в структуре DOM
const popupProfile = document.querySelector('.popup_type_edit-profile');
const formElementProfile = popupProfile.querySelector('#popup__edit');
const nameInput = popupProfile.querySelector('#edit-name');
const jobInput = popupProfile.querySelector('#edit-profession');
const profile = document.querySelector('.profile');
const profileAuthor = profile.querySelector('.profile__title');
const profileComment = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
// Находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');


// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', closeByClick);
}

// Функция закрытия попапа клавишей esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

// Функция закрытия попапа кликом на оверлэй
function closeByClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
}

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', closeByClick);
}



editButton.addEventListener('click', () => {
    nameInput.value = profileAuthor.textContent;
    jobInput.value = profileComment.textContent;
    openPopup(popupProfile);
});

// Функция присвоения значений полям ввода в форме
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    closePopup(popupProfile);
};

// Обработчик кнопки Сохранить
formElementProfile.addEventListener('submit', handleProfileFormSubmit);


// Поиск ближайшего к крестику попапа и установка обработчика закрытия по клику на крестик
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');

    button.addEventListener('click', () => closePopup(popup));
});



// Определение элементов попапа добавления карточки в структуре DOM
const popupElementCard = document.querySelector('.popup_type_add-card');
const formElementCard = popupElementCard.querySelector('#popup__new-place');
const cardNameInput = formElementCard.querySelector('#place-name');
const cardUrlInput = formElementCard.querySelector('#place-url');
const addButton = profile.querySelector('.profile__add-button');
const saveButtonCard = formElementCard.querySelector('.popup__submit-button');

// Слушатель для кнопки открытия формы добавления карточки
addButton.addEventListener('click', () => {
    openPopup(popupElementCard);
});

// Слушатель для кнопки submit
popupElementCard.addEventListener('submit', handleCardFormSubmit);


// Определение элементов модального окна с изображением из карточки в структуре DOM
const popupElementImage = document.querySelector('.popup_type_photo');
const figureElement = document.querySelector('.popup__photo-image');
const imagePhoto = figureElement.querySelector('.popup__image');
const imageCaption = figureElement.querySelector('.popup__caption');


// Определение элементов контейнера с карточками и шаблона для создания карточки в структуре DOM
const elementsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;


// Обработчик сабмита формы карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {}
    newCard.name = cardNameInput.value;
    newCard.link = cardUrlInput.value;

    // Создание новой карточки
    const card = new Card(newCard.name, newCard.link, '#card-template', popupElementImage, imagePhoto, imageCaption, openPopup)
    const cardElement = card.generateCard();

    addCard(cardElement);

    evt.target.reset();

    closePopup(popupElementCard);
}

function addCard(cardElement) {
    elementsContainer.prepend(cardElement)
}


// Перебор элементов и создание карточек
initialCards.forEach(element => {
    const card = new Card(element.name, element.link, '#card-template', popupElementImage, imagePhoto, imageCaption, openPopup)
    const cardElement = card.generateCard();
    addCard(cardElement);
})

// Добавление обработчиков всем формам
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    const formValidator = new FormValidator(validData, formElement);
    formValidator.enableValidation();
});