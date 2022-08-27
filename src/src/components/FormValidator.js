export class FormValidator {
    constructor(validData, formSelector) {
        this._validData = validData;
        this._formSelector = formSelector;

        this._inputList = Array.from(this._formSelector.querySelectorAll(this._validData.inputSelector));
        this._buttonElement = this._formSelector.querySelector(this._validData.submitButtonSelector);
    }

    // Метод отображения элемента с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validData.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validData.errorClass);
    }

    // Метод скрытия элемента с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validData.inputErrorClass);
        errorElement.classList.remove(this._validData.errorClass);
        errorElement.textContent = '';
    }

    // Проверка валидности поля
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Метод проверки наличия невалидного поля
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    // Метод активации/деактивации кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._validData.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._validData.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    // Добавление обработчиков события input всем полям формы
    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    };
}