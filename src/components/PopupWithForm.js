import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup
{
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__info');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value});
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super._renderLoading(true, evt.submitter)
    })
  }
  closePopup() {
    super.closePopup();
    this._selector.querySelector(".popup__form").reset();
  }
}
