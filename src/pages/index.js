
// Импорт главного файла стилей и компонентов
import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import { validData, apiData, popupElementProfile, popupElementCard, buttonEdit, buttonAdd, nameInput, jobInput, popupElementAvatar, avatarElement } from '../utils/constants.js';


const api = new Api(apiData);

let userId;

// Создание экземпляров класса для валидации каждой формы
const popupValitatorProfile = new FormValidator(validData, popupElementProfile);
popupValitatorProfile.enableValidation();

const popupValitatorAvatar = new FormValidator(validData, popupElementAvatar)
popupValitatorAvatar.enableValidation();

const popupValitatorCard = new FormValidator(validData, popupElementCard);
popupValitatorCard.enableValidation();


const popupWithFormProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileEdit);
const popupWithFormAvatar = new PopupWithForm('.popup_type_update-avatar', handleChangeAvatar);
const popupWithFormCard = new PopupWithForm('.popup_type_add-card', handleAddCard);

//Cоздаем экземпляр класса для попапа удаления карточки
const newPopupWithFormDelete = new PopupWithConfirmation('.popup_type_delete-confirm');

const newPopupWithImage = new PopupWithImage('.popup_type_photo');

// Экземпляр класса с данными из профайла
const newUserInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle', avatarSelector: '.profile__avatar' });

// Создание класса для добавления элементов в DOM
const cardsList = new Section({ renderer: createCard }, '.elements__list');


const userInfoGet = api.getProfileInfo();
const initialCardsGet = api.getInitialCards();

userInfoGet
  .then(res => {
    userId = res._id;
    newUserInfo.setUserInfo(res);
  })
  .catch(err => {
    console.log(err)
  })


// Функция создания карточки
function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick, userId, () => {
    newPopupWithFormDelete.open(() =>
      api.deleteCardFromServer(card.getId())
        .then(() => {
          card.deleteCard();
          newPopupWithFormDelete.close();
        })
        .catch((err) => {
          console.log(err);
        }));
  }, () => {
    api.putLike(card.getId())
      .then((res) => {
        card.likeElement();
        card.updateLikesAmount(res);
      })
      .catch((err => {
        card.log(err);
      }))
  }, () => {
    api.deleteLike(card.getId())
      .then((res) => {
        card.disLikeElement();
        card.updateLikesAmount(res)
      })
      .catch((err) => {
        console.log(err);
      })
  })
  return card.generateCard();
}


Promise.all(([userInfoGet, initialCardsGet]))
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err)
  })
buttonEdit.addEventListener('click', () => {
  const userFormValues = newUserInfo.getUserInfo();
  nameInput.value = userFormValues.name;
  jobInput.value = userFormValues.job;
  popupValitatorProfile.resetValidation();
  popupWithFormProfile.open();
});

buttonAdd.addEventListener('click', () => {
  popupValitatorCard.resetValidation();
  popupWithFormCard.open();
});

avatarElement.addEventListener('click', () => {
  popupValitatorAvatar.resetValidation()
  popupWithFormAvatar.open()
})


// Функция сохранения данных профиля
function handleProfileEdit(item) {
  popupWithFormProfile.setButtonInProgress();
  api.updateProfileInfo(item.name, item.job)
    .then((res) => {
      newUserInfo.setUserInfo(res);
      popupWithFormProfile.close();
      popupWithFormProfile.resetButtonState();
    })
    .catch((err) => {
      console.log(err)
    })
}

// Функция добавления нового элемента
function handleAddCard(item) {
  popupWithFormCard.setButtonInProgress();
  api.addNewCard(item.name, item.link)
    .then((res) => {
      cardsList.addItem(createCard(res));
      popupWithFormCard.close();
      popupWithFormCard.resetButtonState();
    })
    .catch((err) => {
      console.log(err)
    })
}

// Функция открытия попапа с изображением
function handleCardClick(name, link) {
  newPopupWithImage.open(name, link);
}

// Функция редактирования аватара
function handleChangeAvatar(item) {
  popupWithFormAvatar.setButtonInProgress();
  api.updateAvatar(item)
    .then((res) => {
      newUserInfo.setUserInfo(res);
      popupWithFormAvatar.close();
      popupWithFormAvatar.resetButtonState();
    })
    .catch((err) => {
      console.log(err);
    })
}


// Добавление слушателей событий формам
newPopupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormCard.setEventListeners();
newPopupWithFormDelete.setEventListeners();