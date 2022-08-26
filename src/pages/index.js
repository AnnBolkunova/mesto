
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

// Создание экземпляров класса для валидации каждой формы
const popupValitatorProfile = new FormValidator(validData, popupElementProfile);
popupValitatorProfile.enableValidation();

const popupValitatorCard = new FormValidator(validData, popupElementCard);
popupValitatorCard.enableValidation();

const popupValitatorAvatar = new FormValidator(validData, popupElementAvatar)
popupValitatorAvatar.enableValidation();

const newPopupWithImage = new PopupWithImage('.popup_type_photo');

// Экземпляр класса с данными из профайла
const newUserInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle', avatarSelector: '.profile__image' });



// Функция создания карточки
function createCard(data) {
  const userId = newUserInfo.getUserId()
  const card = new Card(data, userId, '#card-template', handleCardClick, {
    handleDeleteClick: () => {
      newPopupWithFormDelete.getFormSubmitHandler(() => {
        //получаем id данной карточки для удаления
        const cardId = card.getCardId()
        //отправляем запрос на удаление карточки с сервера
        api.deleteCardFromServer({ cardId: cardId })
          .then(() => {
            //Удаляем карточку локально
            card.deleteCard()
            //Закрываем форму подтверждения удаления карточки
            newPopupWithFormDelete.close()
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
      })
      newPopupWithFormDelete.open()
    },

    handleLikeUpdate: () => {
      const cardId = card.getCardId()

      //Если карточка уже лайкнута, то удаляем лайк с сервера
      if (card.getLikedStatus()) {
        api.deleteLike({ cardId: cardId })
          .then((res) => {
            //При любой манипуляции с лайками на сервере обновляем информацию о лайках в классе, чтобы потом знать, была ли лайкнута мной
            card.updateLikesInfo({ likes: res.likes })
            card.updateLikesAmount()
            //переключаем цвет сердечка
            card.handleLikeClick()
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
      } else {
        api.putLike({ cardId: cardId })
          .then((res) => {
            //При любой манипуляции с лайками на сервере обновляем информацию о лайках в классе, чтобы потом знать, была ли лайкнута мной
            card.updateLikesInfo({ likes: res.likes })
            card.updateLikesAmount()
            //переключаем цвет сердечка 
            card.handleLikeClick()
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
      }
    }
  })

  const cardElement = card.generateCard()
  return cardElement
}





// Создание класса для добавления элементов в DOM
const cardsList = new Section({
  renderer: (item) => {
    const newCardElement = createCard(item.name, item.link);
    cardsList.addItem(newCardElement);
  }
}, '.elements__list');


//Отрисовка страницы с начальной информацией
Promise.all([api.getProfileInfo(), api.getInitialCards()]) //Делаем параллельные запросы
  .then(([profileInfo, initialCards]) => {
    //все данные получены, отрисовываем страницу
    //отрисовка профиля
    newUserInfo.setUserInfo({ name: profileInfo.name, job: profileInfo.about, userId: profileInfo._id })
    //передаем ссылку из ответа сервера в метод для установки аватара
    newUserInfo.setAvatar({ avatarLink: profileInfo.avatar })


    //отрисовка карточек

    cardsList.renderItems({ items: initialCards })
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })




// Обработка кнопки редактирования профайла и кнопки добавления карточки
buttonEdit.addEventListener('click', () => {
  const userFormValues = newUserInfo.getUserInfo();
  nameInput.value = userFormValues.name;
  jobInput.value = userFormValues.job;
  popupValitatorProfile.resetValidation();
  popupWithFormProfile.open();
});


// Экземпляры класса для каждого попапа формы
const popupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleSubmitForm: (item) => {
    popupWithFormProfile.setButtonInProgress();
    // Сохранение обновленных данных о пользователе на сервере
    api.updateProfileInfo({ name: item.name, about: item.job })

      .then(() => {
        newUserInfo.setUserInfo(item);
        popupWithFormProfile.close();
        popupWithFormProfile.resetButtonState();
      })

      .catch((err) => {
        console.log(err);
      })
  }
});



//Создаем класс формы редактирования аватара
const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  //обработка нажатия на sumit
  handleSubmitForm: (item) => {
    //меняем текст кнопки на Сохранение, пока не получим ответ от сервера
    popupWithFormAvatar.setButtonInProgress()
    const avatarLink = item.link

    //передаем ссылку для обновлениия ссылки на аватар на сервере
    api.updateAvatar({ avatarLink: avatarLink })
      .then(() => {
        //передаем ссылку из формы в качестве параметра метода для устновки аватара локально
        newUserInfo.setAvatar({ avatarLink: avatarLink })
        //Закрываем форму только когда получим ответ от сервера
        popupWithFormAvatar.close()
        //Меняем текст кнопки сабмит на дефолтный для этой формы
        popupWithFormAvatar.resetButtonState()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }
})

//Обработка клика на аватар
avatarElement.addEventListener('click', () => {
  //очищаем сообщение ошибки валидации
  popupValitatorAvatar.resetValidation()
  //открываем модальное окно редактирования аватара
  popupWithFormAvatar.open()
})



buttonAdd.addEventListener('click', () => {
  popupValitatorCard.resetValidation();
  popupWithFormCard.open();
});


const popupWithFormCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  // Обработчик «отправки» формы Card
  handleSubmitForm: (item) => {
    //меняем текст кнопки на Сохранение, пока не получим ответ от сервера
    popupWithFormCard.setButtonInProgress()
    //Добавляем новую карточку на сервер
    api.addNewCard({ name: item.name, url: item.link })
      //Сначала отправляем запрос на добавление карточки на сервер
      //чтобы в ответе получить _id карточки и прокинуть его в создание карточки
      //id карточки потребуется при запросе на ее удаление с сервера
      .then((res) => {
        item.likes = []
        item.myId = res.owner._id
        item.owner = { _id: item.myId }
        //добавляем id карточки при ее создании
        item._id = res._id
        const newCardElement = createCard(item.name, item.link)
        // Добавляем новую карточку в начало галереи 
        cardsList.addItemPrepend(newCardElement)

        //Закрываем форму только когда получим ответ от сервера
        popupWithFormCard.close()
        //Меняем текст кнопки сабмит на дефолтный для этой формы
        popupWithFormCard.resetButtonState()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})



//УДАЛЕНИЕ КАРТОЧКИ
//Cоздаем экземпляр класса для попапа удаления карточки
const newPopupWithFormDelete = new PopupWithConfirmation({ popupSelector: '.popup_type_delete-confirm' })




// Функция открытия попапа с изображением
function handleCardClick(name, link) {
  newPopupWithImage.open(name, link);
}


// Добавление слушателей событий формам
newPopupWithImage.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithFormCard.setEventListeners();
newPopupWithFormDelete.setEventListeners();