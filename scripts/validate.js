// Фуекция отображения элемента с ошибкой
function showInputError(formElement, inputElement, errorMessage, classes) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classes.errorClass);
}

// Функция скрытия элемента с ошибкой
function hideInputError(formElement, inputElement, classes) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classes.inputErrorClass);
    errorElement.classList.remove(classes.errorClass);
    errorElement.textContent = '';
}

// Проверка валидности поля
const checkInputValidity = (formElement, inputElement, classes) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, classes);
    } else {
        hideInputError(formElement, inputElement, classes);
    }
}

// Функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

// Функция активации/ деактивации кнопки
const toggleButtonState = (inputList, buttonElement, classes) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classes.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(classes.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

// Добавление обработчиков события input всем полям формы
const setEventListeners = (formElement, classes) => {
    const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
    const buttonElement = formElement.querySelector(classes.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, classes);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, classes);
            toggleButtonState(inputList, buttonElement, classes);
        });
    });
}

const enableValidation = (classes) => {
    const formList = Array.from(document.querySelectorAll(classes.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, classes);
    });
}

// Вызов функции валидации с входящими параметрами
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
