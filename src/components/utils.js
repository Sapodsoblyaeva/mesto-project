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

export {
  addProfileData,
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  closeByEsc,
  profileName,
  profileOccupation
};
