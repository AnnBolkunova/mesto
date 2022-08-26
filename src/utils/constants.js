const validData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const apiData = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: 'e5b2d37e-3b08-4a20-bb37-f335a074b4e4',
    'Content-Type': 'application/json'
  }
}

// Определение попапов и элементов формы редактирования профиля в структуре DOM
const popupElementProfile = document.querySelector('.popup_type_edit-profile');
const popupElementCard = document.querySelector('.popup_type_add-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupElementAvatar = document.querySelector('.popup_type_update-avatar')
const avatarElement = document.querySelector('.profile__avatar')

export { validData, apiData, popupElementProfile, popupElementCard, buttonEdit, buttonAdd, nameInput, jobInput, popupElementAvatar, avatarElement } 
