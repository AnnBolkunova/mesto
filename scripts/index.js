// Добавление массива из 6-ти карточек из "коробки" при загрузке страницы
const initialCards = [
    {
        name: 'Армения',
        link: 'https://images.unsplash.com/photo-1608719452475-6492c367cbc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUIwJUQxJTgwJUQwJUJDJUQwJUI1JUQwJUJEJUQwJUI4JUQxJThGfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Камчатка',
        link: 'https://images.unsplash.com/photo-1645128187991-3030aa113532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80'
    },
    {
        name: 'Алтай',
        link: 'https://images.unsplash.com/photo-1634876371724-82860814ad94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        name: 'Карелия',
        link: 'https://images.unsplash.com/photo-1575582293156-7d185b60c7bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80'
    },
    {
        name: 'Мурманская область',
        link: 'https://images.unsplash.com/photo-1624719635330-c03b1ed0c02a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUQwJUJDJUQxJTgzJUQxJTgwJUQwJUJDJUQwJUIwJUQwJUJEJUQxJTgxJUQwJUJBfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Озеро Байкал',
        link: 'https://images.unsplash.com/photo-1610984660607-90b67b18e2c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fCVEMCVCMSVEMCVCMCVEMCVCOSVEMCVCQSVEMCVCMCVEMCVCQnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    }
];


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

// Функция открытия попапа и слушатель для события
function openPopupProfile() {
    popupProfile.classList.add('popup_opened');
    nameInput.value = profileAuthor.textContent;
    jobInput.value = profileComment.textContent;
};

editButton.addEventListener('click', openPopupProfile);

// Функция присвоения значений полям ввода в форме
function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileComment.textContent = jobInput.value;
    closePopupProfile();
};

// Обработчик кнопки Сохранить
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

// Функция закрытия попапа и слушатель для события
function closePopupProfile() {
    popupProfile.classList.remove('popup_opened');
};

closeButtonProfile.addEventListener('click', closePopupProfile);




// Определение элементов попапа добавления карточки в структуре DOM
const popupElementCard = document.querySelector('.popup_type_add-card');
const closeButtonCard = popupElementCard.querySelector('.popup__close-button');
const formElementCard = popupElementCard.querySelector('#popup__new-place');
const cardNameInput = formElementCard.querySelector('#place_name');
const cardUrlInput = formElementCard.querySelector('#place_url');
const addButton = profile.querySelector('.profile__add-button');
const saveButtonCard = formElementCard.querySelector('.popup__submit-button');

// Функция открытия попапа и слушатель для события
function openPopupCard() {
    popupElementCard.classList.add('popup_opened');
};

addButton.addEventListener('click', openPopupCard);

// Функция закрытия попапа создания карточки
function closePopupCard() {
    popupElementCard.classList.remove('popup_opened');
};


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


// Слушатели для кнопки submit и кнопки закрытия формы карточки
popupElementCard.addEventListener('submit', formSubmitHandlerCard);

closeButtonCard.addEventListener('click', closePopupCard);




// Определение элементов модального окна с изображением из карточки в структуре DOM
const popupElementImage = document.querySelector('.popup_type_photo');
const closeButtonImage = popupElementImage.querySelector('.popup__close-button');
const figureElement = document.querySelector('.popup__photo-image');
const imagePhoto = figureElement.querySelector('.popup__image');
const imageCaption = figureElement.querySelector('.popup__caption');


// Слушатель для кнопки закрытия модального окна с изображением и функции открытия и закрытия
closeButtonImage.addEventListener('click', closePupupImage);

function openPopupImage() {
    popupElementImage.classList.add('popup_opened');
};

function closePupupImage() {
    popupElementImage.classList.remove('popup_opened');
};



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
        openPopupImage();
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