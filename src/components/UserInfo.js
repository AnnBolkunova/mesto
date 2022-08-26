// Класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, avatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    // Публичный метод, который возвращает объект с данными пользователя
    getUserInfo() {
        this._formValues = {};

        this._formValues.name = this._profileName.textContent;
        this._formValues.job = this._profileJob.textContent;

        return this._formValues;
    }

    // Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(info, userId) {
        this._profileName.textContent = info.name;
        this._profileJob.textContent = info.job;
        this._userId = userId;
    }

    // Метод установки нововго аватара
    setAvatar({ avatarLink }) {
        this._avatar.style.backgroundImage = `url(${avatarLink})`;
    }

    getUserId() {
        return this._userId;
    }
} 