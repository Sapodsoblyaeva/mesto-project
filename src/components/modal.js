import { enableValidation } from "./validate.js";

import { addData, popupEditorForm } from "./utils.js";

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function submitPopup(evt) {
  //чтобы не было перезагрузки
  evt.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  //добавлена проверка на заполненность и валидность полей
  if (!popupEditorForm.querySelector(".popup__submit-button_inactive")) {
    const popupName = document.querySelector("#name");
    const popupAboutYourself = document.querySelector("#about-yourself");
    closePopup(popupEditorForm);
    addData(popupName.value, popupAboutYourself.value);
  } else {
    enableValidation();
  }
}

export { closePopup, submitPopup, openPopup };
