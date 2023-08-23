import {
  Popup
} from "./Popup.js";

const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");

export class PopupWithImage extends Popup {
constructor(selector, inputName, inputImage) {
  super(selector)
  this._inputName = inputName;
  this._inputImage = inputImage;
  console.log(this._inputImage)
}
openPopup() {
  super.openPopup();
  this._inputName = document.querySelector(".places__name");
  this._inputImage = document.querySelector(".places__image");
}
}

// openingImage.src = placeImage.src;
// openingImage.alt = placeImage.alt;
// openingText.textContent = placeName.textContent;
