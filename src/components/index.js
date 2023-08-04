import "../pages/index.css";

import {
  setProfile,
  closePopup,
  openPopup,
  addAvatarUrl,
  addProfileData,
  popupName,
  popupAboutYourself,
} from "./modal.js";

import {
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  resetForm,
  renderLoading,
} from "./utils.js";

import { enableValidation } from "./validate.js";

import {
  setInitialCards,
  userPlaceName,
  userPlaceImage,
  createCard,
  renderCard,
} from "./card.js";

import { addNewUserCard, changeProfileAvatar, changeProfileData } from "./api";

const addButton = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopupButton = document.querySelector(".profile__edit-button");
const profileAvatarEditor = document.querySelector(".profile__image");
const avatar = document.querySelector(".avatar");
const avatarImage = avatar.querySelector("#avatar-link");
const avatarChangeForm = document.forms["avatar__change"];

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__info-error",
  inputErrorTypeClass: "popup__info_type_error",
  activeInputErrorClass: "popup__info-error_active",
});

Promise.all([setProfile(), setInitialCards()]).catch((error) => {
  console.error(error);
});

addButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
});

function addCard() {
  addNewUserCard(userPlaceName.value, userPlaceImage.value)
    .then((result) => {
      const cardNew = createCard(
        result.name,
        result.link,
        result.likes.length,
        result.owner.name,
        result._id
      );
      renderCard(cardNew);
      closePopup(popupAddPlace);
      resetForm(userPlaceForm);
    })
    .catch((error) => console.error(error));
}

userPlaceForm.addEventListener("submit", addCard);

profileAvatarEditor.addEventListener("click", function () {
  openPopup(avatar);
});

function changeAvatar() {
  renderLoading(true);
  changeProfileAvatar(avatarImage.value)
    .then((result) => {
      addAvatarUrl(result.avatar);
      closePopup(avatar);
      resetForm(avatarChangeForm);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally((item) => {
      renderLoading(false);
    });
}

avatarChangeForm.addEventListener("submit", changeAvatar);

editPopupButton.addEventListener("click", function () {
  openPopup(popupEditorForm);
});

function handleProfileFormSubmit() {
  renderLoading(true);
  changeProfileData(popupName.value, popupAboutYourself.value)
    .then((result) => {
      addProfileData(result.name, result.about);
      closePopup(popupEditorForm);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally((item) => {
      renderLoading(false);
    });
}

popupEditorForm.addEventListener("submit", handleProfileFormSubmit);

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
