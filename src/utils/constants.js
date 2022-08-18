const validData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Определение попапов и элементов формы редактирования профиля в структуре DOM
const popupElementProfile = document.querySelector('.popup_type_edit-profile');
const popupElementCard = document.querySelector('.popup_type_add-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

export { validData, popupElementProfile, popupElementCard, editButton, addButton, nameInput, jobInput } 
