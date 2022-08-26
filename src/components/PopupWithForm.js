import Popup from './Popup.js'

// Наследование родительского класс Popup с изменением и добавлением методов
export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleSubmitForm }) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm; // колбэк сабмита формы
        this._form = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._form.querySelector('.popup__submit-button');
        this._defaultButtonText = this._buttonSubmit.textContent;
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input')); // массив всех данных из полей формы
    }

    // Приватный метод, который собирает данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    // Метод, который добавляет слушателей клика иконке закрытия и сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });
    }

    // Закрытие попапа и сброс формы
    close() {
        super.close();
        this._form.reset();
    }

    setButtonInProgress() {
        this._buttonSubmit.textContent = "Сохранение...";
    }

    resetButtonState() {
        this._buttonSubmit.textContent = this._defaultButtonText;
    }
} 