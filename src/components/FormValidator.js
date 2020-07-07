export default class FormValidator {
    constructor(options, formSelector) {         // Конструктор Валидации
        this._options = options;
        this._formSelector = formSelector;
    }

    _errorSpan(input) {                       //span Ошибки
        return document.querySelector(`#${input.id}-error`)
    }

    _showInputError(input, options) {                //Выдаём ошибку
        const error = this._errorSpan(input);
        error.textContent = input.validationMessage;
        input.classList.add(options.inputErrorClass);
    }

    _hideInputError(input, options) {              //Убираем ошибку
        const error = this._errorSpan(input);
        error.textContent = '';
        input.classList.remove(options.inputErrorClass);
    }

    _checkErrors(inputElement, options) {               // Проверка инпута на валидность
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, options);
        } else {
            this._showInputError(inputElement, options);
        }
    }

    _changeButtonStatus(formElement, options, buttonSelector) {   //проверка сабмита на валидность
        const hasErrors = !formElement.checkValidity();
        buttonSelector.disabled = hasErrors;
        buttonSelector.classList.toggle(options.inactiveButtonClass, hasErrors);
    }

    enableValidation() {        //функция валидации

        const inputElements = Array.from(this._formSelector.querySelectorAll(this._options.inputSelector));
        const buttonForm = this._formSelector.querySelector(this._options.submitButtonSelector);

        inputElements.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkErrors(input, this._options);
                this._changeButtonStatus(this._formSelector, this._options, buttonForm);
            });
        });

        //пользовательское событие через  dispatchEvent, позволяющие стирать ошибки и проверять на валидность при повторном открытии формы
        this._formSelector.addEventListener('clearForm', (evt) => {
            inputElements.forEach((input) => {
                this._hideInputError(input, this._options);
                this._changeButtonStatus(this._formSelector, this._options, buttonForm);
            });
        });

    };


};



