import {formList, formSelectors} from "./constants.js"

class FormValidator {
  constructor(obj, formElement, inputElement) {
    this._obj = obj;
    this._formElement = formElement;
    this._formElement = inputElement;
  }
 enableValidation() {
    //для каждой формы при сабмите отменяет перезагрузку и
    //выполняет проверку на валидность
      this._formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListeners(this._formElement, this._obj);
  }
  setEventListeners() {
    //берет все поля ввода
    const inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    const submitButton = this._formElement.querySelector(this._obj.submitButtonSelector);
    //изначально они пустые и невалидные
    this._toggleButtonState(inputList, submitButton);
    this._formElement.addEventListener("reset", () => {
      this._disableButton(submitButton);
    });
    //проверяет каждое поле на валидность
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }
}


formList.forEach((item) => {
  // const inputList = item.querySelector(".popup__info");
  // inputList.forEach((input) => {
    const form = new FormValidator(formSelectors, item);
    form.enablevalidation()
  })
// })
