// Класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
    constructor({ profileNameSelector, profileJobSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
    }

    // Публичный метод, который возвращает объект с данными пользователя
    getUserInfo() {
        this._formValues = {};

        this._formValues.name = this._profileName.textContent;
        this._formValues.job = this._profileJob.textContent;

        return this._formValues;
    }

    // Публичный метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(info) {
        this._profileName.textContent = info.name;
        this._profileJob.textContent = info.job;
    }
} 