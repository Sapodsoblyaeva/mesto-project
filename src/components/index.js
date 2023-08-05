import "../pages/index.css";

import { closePopup, openPopup } from "./modal.js";

import { resetForm, renderLoading } from "./utils.js";

import { enableValidation } from "./validate.js";

import {
  userPlaceName,
  userPlaceImage,
  createCard,
  renderCard,
} from "./card.js";

import {
  addNewUserCard,
  changeProfileAvatar,
  changeProfileData,
  setInitialProfile,
  setInitialCardsSet,
} from "./api";

const addButton = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopupButton = document.querySelector(".profile__edit-button");
const profileAvatarEditor = document.querySelector(".profile__image");
const avatar = document.querySelector(".avatar");
const avatarImage = avatar.querySelector("#avatar-link");
const avatarChangeForm = document.forms["avatar__change"];
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");
const popupName = document.querySelector("#name");
const popupAboutYourself = document.querySelector("#about-yourself");
const popupEditorForm = document.querySelector(".editor-form");
const popupAddPlace = document.querySelector(".add-places");
const userPlaceForm = document.forms["place__adder"];
let proFileUserId = "";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__info-error",
  inputErrorTypeClass: "popup__info_type_error",
  activeInputErrorClass: "popup__info-error_active",
});

Promise.all([setInitialProfile(), setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    createProfile(info.name, info.avatar, info.about);
    initialCards.forEach((item) => {
      const cardSet = createCard(
        item.name,
        item.link,
        item.likes.length,
        item.likes,
        item.owner._id,
        item._id,
        proFileUserId
      );
      renderCard(cardSet);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function addProfileData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

function createProfile(profileID, profileImage, profileAbout) {
  profileName.textContent = profileID;
  profileAvatar.src = profileImage;
  profileOccupation.textContent = profileAbout;
}

function addAvatarUrl(avatarUrl) {
  profileAvatar.src = avatarUrl;
}

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
        result.likes,
        result.owner._id,
        result._id,
        proFileUserId
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

function changeAvatar(evt) {
  renderLoading(true, evt.submitter);
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
      renderLoading(false, evt.submitter);
    });
}

avatarChangeForm.addEventListener("submit", changeAvatar);

editPopupButton.addEventListener("click", function () {
  openPopup(popupEditorForm);
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileOccupation.textContent;
});

function handleProfileFormSubmit(evt) {
  renderLoading(true, evt.submitter);
  changeProfileData(popupName.value, popupAboutYourself.value)
    .then((result) => {
      addProfileData(result.name, result.about);
      closePopup(popupEditorForm);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally((item) => {
      renderLoading(false, evt.submitter);
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
