import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._buttonName = this._popup.querySelector(".popup__submit-button");
    this._handleFormSubmit = handleFormSubmit;
  }
  openPopup() {
    super.openPopup();
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__info");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  closePopup() {
    super.closePopup();
    this._popup.querySelector(".popup__form").reset();
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonName.textContent = "Сохранение...";
    } else {
      this._buttonName.textContent = "Сохранить";
    }
  }
}
