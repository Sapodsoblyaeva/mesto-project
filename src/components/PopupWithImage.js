import { Popup } from "./Popup.js";

import { openingImage, openingText } from "./utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  openPopup(inputName, inputImage) {
    super.openPopup();
    openingImage.src = inputImage;
    openingImage.alt = inputName + ` Фото живописного места.`;
    openingText.textContent = inputName;
  }
}
