
// Импорт главного файла стилей и компонентов
import './index.css';

import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { validData, popupElementProfile, popupElementCard, editButton, addButton, nameInput, jobInput } from '../utils/constants.js';


// Создание экземпляров класса для валидации каждой формы
const popupValitatorProfile = new FormValidator(validData, popupElementProfile);
popupValitatorProfile.enableValidation();

const popupValitatorCard = new FormValidator(validData, popupElementCard);
popupValitatorCard.enableValidation();

const newPopupWithImage = new PopupWithImage('.popup_type_photo');

// Экземпляр класса с данными из профайла
const newUserInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle' });


function createCard(name, link) {
  const card = new Card({ name, link }, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание класса для добавления элементов в DOM
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCardElement = createCard(item.name, item.link);
    cardsList.addItem(newCardElement);
  }
}, '.elements__list');

cardsList.renderItems();

// Обработка кнопки редактирования профайла и кнопки добавления карточки
editButton.addEventListener('click', () => {
  const userFormValues = newUserInfo.getUserInfo();
  nameInput.value = userFormValues.name;
  jobInput.value = userFormValues.job;
  popupValitatorProfile.resetValidation();
  popupWithFormProfile.open();
});

addButton.addEventListener('click', () => {
  popupValitatorCard.resetValidation();
  popupWithFormCard.open();
});

// Экземпляры класса для каждого попапа формы
const popupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',

  handleSubmitForm: (item) => {
    newUserInfo.setUserInfo(item);
    popupWithFormProfile.close();
  }
});

const popupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',

  handleSubmitForm: (item) => {
    const newCardElement = createCard(item.name, item.link);
    cardsList.addItem(newCardElement);
    popupWithFormCard.close();
  }
});

// Функция открытия попапа с изображением
function handleCardClick(name, link) {
  newPopupWithImage.open(name, link);
}


// Добавление слушателей событий формам
newPopupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormCard.setEventListeners();