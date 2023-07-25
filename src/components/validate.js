function showInputError(formElement, inputElement, errorMessage) {
  //подставляет конкретное id пустого поля, которое выведется
  //ошибкой пд полем ввода, например place-name-error
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__info_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__info-error_active");
}

function hideInputError(formElement, inputElement) {
  //подставляет конкретное id пустого поля,
  //которое обнулится после того как валидация пройдет
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__info_type_error");
  errorElement.classList.remove("popup__info-error_active");
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
    submitButton.classList.add("popup__submit-button_inactive");
  } else {
    submitButton.classList.remove("popup__submit-button_inactive");
  }
}

function setEventListeners(formElement) {
  //берет все поля ввода
  const inputList = Array.from(formElement.querySelectorAll(".popup__info"));
  const submitButton = formElement.querySelector(".popup__submit-button");
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
  const formList = Array.from(document.querySelectorAll(".popup__form"));
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
