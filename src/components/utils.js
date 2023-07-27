import { closePopup } from "./modal";

const popupEditorForm = document.querySelector(".editor-form");
const popupAddPlace = document.querySelector(".add-places");
const userPlaceForm = document.forms["place__adder"];
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

function addProfileData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function disableButton(submitButton) {
  submitButton.setAttribute("disabled", "disabled");
  submitButton.classList.add("popup__submit-button_inactive");
}

function enableButton(submitButton) {
  submitButton.removeAttribute("disabled");
  submitButton.classList.remove("popup__submit-button_inactive");
}

export {
  addProfileData,
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  closeByEsc,
  disableButton,
  enableButton,
};
