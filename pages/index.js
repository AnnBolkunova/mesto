const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#edit_name');
let jobInput = formElement.querySelector('#edit_profession');
let profileAuthor = document.querySelector('.profile__title');
let profileComment = document.querySelector('.profile__subtitle');
const formOpener = document.querySelector('.profile__edit-button');
const content = document.querySelector('.popup');

function popupOpened() {
    content.classList.add('popup_opened');
    nameInput.value = profileAuthor.textContent;
    jobInput.value = profileComment.textContent;
}
formOpener.addEventListener('click', popupOpened);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    popupClosed();
}

formElement.addEventListener('submit', formSubmitHandler);



const formCloser = document.querySelector('.popup__close-button');

function popupClosed() {
    content.classList.remove('popup_opened');
}

formCloser.addEventListener('click', popupClosed);