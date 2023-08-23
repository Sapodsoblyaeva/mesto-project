import "../pages/index.css";

import { closePopup, openPopup } from "./modal.js";

import { resetForm, renderLoading } from "./utils.js";

// import { enableValidation } from "./validate.js";

import {
  userPlaceName,
  userPlaceImage,
  renderCard,
  Card
} from "./card.js";

import {
  Api
} from "./api";

import {
  FormValidator
} from "./FormValidator.js";

import {
  Section
} from "./Section.js";

import {
  Popup
} from "./Popup.js";

import {formList, formSelectors, cardsOnLine} from "./utils/constants.js"

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

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
});

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__info",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__submit-button_inactive",
//   inputErrorClass: "popup__info-error",
//   inputErrorTypeClass: "popup__info_type_error",
//   activeInputErrorClass: "popup__info-error_active",
// });

Promise.all([api.setInitialProfile(), api.setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    createProfile(info.name, info.avatar, info.about);
    const renderedCards = new Section({items: initialCards, renderer: (item) =>{
      const cardSet = new Card(item,
        proFileUserId, ".places__cards"
      ).createCard();
      renderedCards.addItem(cardSet);
    }}, cardsOnLine );
    renderedCards.renderItem();
    // initialCards.forEach((item) => {
    //   const cardSet = new Card(item,
    //     proFileUserId, ".places__cards"
    //   ).createCard();
    //   // renderCard(cardSet);
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

addButton.addEventListener("click", () => {
  new Popup(popupAddPlace).openPopup();
});

function addCard() {
  api.addNewUserCard(userPlaceName.value, userPlaceImage.value)
    .then((result) => {
      const cardNew = new Card(result, proFileUserId, ".places__cards"
      ).createCard();
      const newCard = new Section({}, cardsOnLine);
      newCard.addItem(cardNew);
      // renderCard(cardNew);
      // closePopup(popupAddPlace);
      new Popup(popupAddPlace).closePopup();
      resetForm(userPlaceForm);
    })
    .catch((error) => console.error(error));
}

userPlaceForm.addEventListener("submit", addCard);

profileAvatarEditor.addEventListener("click", function () {
  new Popup(avatar).openPopup();
});

function changeAvatar(evt) {
  renderLoading(true, evt.submitter);
  api.changeProfileAvatar(avatarImage.value)
    .then((result) => {
      addAvatarUrl(result.avatar);
      new Popup(avatar).closePopup();
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
  new Popup(popupEditorForm).openPopup();
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileOccupation.textContent;
});

function handleProfileFormSubmit(evt) {
  renderLoading(true, evt.submitter);
  api.changeProfileData(popupName.value, popupAboutYourself.value)
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
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", function (evt) {
//     //именно таргет, иначе закрывается и по клику на сам попап
//     if (evt.target === popup) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });


formList.forEach((item) => {
    const form = new FormValidator(formSelectors, item);
    form.enableValidation();
  })
