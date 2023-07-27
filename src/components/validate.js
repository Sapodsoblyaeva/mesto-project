import { disableButton, enableButton } from "./utils.js";

function showInputError(formElement, inputElement, errorMessage, obj) {
  //подставляет конкретное id пустого поля, которое выведется
  //ошибкой пд полем ввода, например place-name-error
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorTypeClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.activeInputErrorClass);
}

function hideInputError(formElement, inputElement, obj) {
  //подставляет конкретное id пустого поля,
  //которое обнулится после того как валидация пройдет
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorTypeClass);
  errorElement.classList.remove(obj.activeInputErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, obj) {
  //проверка регулярным выражение паттерна в хтмл +
  //вывод кастомного сообщения из поля дата в хтмл
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    //сброс ошибки после валидации
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  } else {
    hideInputError(formElement, inputElement, obj);
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
    disableButton(submitButton);
  } else {
    enableButton(submitButton);
  }
}

function setEventListeners(formElement, obj) {
  //берет все поля ввода
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const submitButton = formElement.querySelector(obj.submitButtonSelector);
  //изначально они пустые и невалидные
  toggleButtonState(inputList, submitButton);
  formElement.addEventListener("reset", () => {
    disableButton(submitButton);
  });
  //проверяет каждое поле на валидность
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  //для каждой формы при сабмите отменяет перезагрузку и
  //выполняет проверку на валидность
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
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
