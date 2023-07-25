import '../../pages/index.css';

import { closePopup, submitPopup, openPopup } from "./modal.js";

import {
  popupEditorForm,
  popupAddPlace,
  formElement,
  userPlaceForm,
} from "./utils.js";

import { enableValidation } from "./validate.js";

import { setInitialCards, addCard } from "./card.js";

const editPopupButton = document.querySelector(".profile__edit-button");
const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);
const addButton = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));

editPopupButton.addEventListener("click", function () {
  openPopup(popupEditorForm);
  //чтобы при открытии попапа, кнопка не работала из-за невалидности формы
  enableValidation();
});

addButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
  //чтобы при открытии попапа, кнопка не работала из-за невалидности формы
  enableValidation();
});

closePopupButtons.forEach(function (elem) {
  elem.addEventListener("click", function () {
    closePopup(elem.closest(".popup"));
  });
});

formElement.addEventListener("submit", submitPopup);

setInitialCards();

userPlaceForm.addEventListener("submit", addCard);

enableValidation();

//чтобы закрывались попапы по эскейпу и оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    //именно таргет, иначе закрывается и по клику на сам попап
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  //именно документ, все остальное не работает
  document.addEventListener("keydown", function (evt) {
    if (evt.key == "Escape") {
      closePopup(popup);
    }
  });
});
