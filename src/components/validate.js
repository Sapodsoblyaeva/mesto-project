const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__info-error",
  inputErrorTypeClass: "popup__info_type_error",
  activeInputErrorClass: "popup__info-error_active",
};

function showInputError(formElement, inputElement, errorMessage) {
  //подставляет конкретное id пустого поля, которое выведется
  //ошибкой пд полем ввода, например place-name-error
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorTypeClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.activeInputErrorClass);
}

function hideInputError(formElement, inputElement) {
  //подставляет конкретное id пустого поля,
  //которое обнулится после того как валидация пройдет
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorTypeClass);
  errorElement.classList.remove(settings.activeInputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  //проверка регулярным выражение паттерна в хтмл +
  //вывод кастомного сообщения из поля дата в хтмл
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    //сброс ошибки после валидации
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  //проверка, что оба инпута валидны
  //возвращает тру, если все поля заполнены и валидны
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton) {
  //меняет состояние кнопки, если все инпуты из hasInvalidInput валидны
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  //берет все поля ввода
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  //изначально они пустые и невалидные
  toggleButtonState(inputList, submitButton);
  //проверяет каждое поле на валидность
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  //для каждой формы при сабмите отменяет перезагрузку и
  //выполняет проверку на валидность
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

export {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
};
