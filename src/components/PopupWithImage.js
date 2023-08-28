import { Popup } from "./Popup.js";

const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");

export class PopupWithImage extends Popup {
  constructor(selector, inputName, inputImage) {
    super(selector);
    this._inputName = inputName;
    this._inputImage = inputImage;
  }
  openPopup() {
    super.openPopup();
    openingImage.src = this._inputImage;
    openingImage.alt = this._inputName + ` Фото живописного места.`;
    openingText.textContent = this._inputName;
  }
}
