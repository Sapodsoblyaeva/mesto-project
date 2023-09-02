export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(
      this._obj.submitButtonSelector
    );
    this._inputList = Array.from(
      formElement.querySelectorAll(this._obj.inputSelector)
    );
  }
  enableValidation() {
    //для каждой формы при сабмите отменяет перезагрузку и
    //выполняет проверку на валидность
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener("reset", () => {
      this._disableButton();
    });
    //проверяет каждое поле на валидность
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _toggleButtonState() {
    //меняет состояние кнопки, если все инпуты из hasInvalidInput валидны
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._submitButton);
    } else {
      this._enableButton(this._submitButton);
    }
  }
  _disableButton() {
    this._submitButton.setAttribute("disabled", "disabled");
    this._submitButton.classList.add(this._obj.inactiveButtonClass);
  }
  _enableButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._obj.inactiveButtonClass);
  }
  _hasInvalidInput() {
    //проверка, что оба инпута валидны
    //возвращает тру, если все поля заполнены и валидны
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _checkInputValidity(inputElement) {
    //проверка регулярным выражение паттерна в хтмл +
    //вывод кастомного сообщения из поля дата в хтмл
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      //сброс ошибки после валидации
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    //подставляет конкретное id пустого поля, которое выведется
    //ошибкой пд полем ввода, например place-name-error
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._obj.inputErrorTypeClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._obj.activeInputErrorClass);
  }
  _hideInputError(inputElement) {
    //подставляет конкретное id пустого поля,
    //которое обнулится после того как валидация пройдет
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._obj.inputErrorTypeClass);
    errorElement.classList.remove(this._obj.activeInputErrorClass);
    errorElement.textContent = "";
  }
}
