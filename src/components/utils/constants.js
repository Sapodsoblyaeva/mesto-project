export const formList = Array.from(document.querySelectorAll(".popup__form"));
export const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__info-error",
  inputErrorTypeClass: "popup__info_type_error",
  activeInputErrorClass: "popup__info-error_active",
};
export const cardsOnLine = document.querySelector(".places");
const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileAvatar = profile.querySelector(".profile__avatar");
export const profileOccupation = profile.querySelector(".profile__occupation");
export const openingImage = document.querySelector(".image-popup__photo");
export const openingText = document.querySelector(".image-popup__text");
export const addButton = document.querySelector(".profile__add-button");
export const editPopupButton = document.querySelector(".profile__edit-button");
export const profileAvatarEditor = document.querySelector(".profile__image");
export const avatar = document.querySelector(".avatar");
export const avatarImage = avatar.querySelector("#avatar-link");
export const avatarChangeForm = document.forms["avatar__change"];
export const popupName = document.querySelector("#name");
export const popupAboutYourself = document.querySelector("#about-yourself");
export const popupEditorForm = document.querySelector(".editor-form");
export const popupAddPlace = document.querySelector(".add-places");
export const userPlaceForm = document.forms["place__adder"];
export const popupImage = document.querySelector(".image-popup");
export const userPlaceName = document.querySelector("#place-name");
export const userPlaceImage = document.querySelector("#photo-link");
export const cardsTemplate = document.querySelector("#places__cards").content;
