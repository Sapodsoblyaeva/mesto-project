import "../pages/index.css";

import { closePopup, handleProfileFormSubmit, openPopup } from "./modal.js";

import { popupEditorForm, popupAddPlace, userPlaceForm } from "./utils.js";

import { enableValidation } from "./validate.js";

import { setInitialCards, addCard } from "./card.js";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__info-error",
  inputErrorTypeClass: "popup__info_type_error",
  activeInputErrorClass: "popup__info-error_active",
});

const editPopupButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));

editPopupButton.addEventListener("click", function () {
  openPopup(popupEditorForm);
});

addButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
});

popupEditorForm.addEventListener("submit", handleProfileFormSubmit);

setInitialCards();

userPlaceForm.addEventListener("submit", addCard);

//чтобы закрывались попапы по эскейпу и оверлею
popups.forEach((popup) => {
  popup.addEventListener("mousedown", function (evt) {
    //именно таргет, иначе закрывается и по клику на сам попап
    if (evt.target === popup) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
