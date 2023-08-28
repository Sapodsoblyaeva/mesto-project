import "../pages/index.css";

import { Card } from "./card.js";

import { Api } from "./api";

import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";

import { Popup } from "./Popup.js";

import { PopupWithForm } from "./PopupWithForm.js";

import { UserInfo } from "./UserInfo.js";

import {
  formList,
  formSelectors,
  cardsOnLine,
  addButton,
  editPopupButton,
  profileAvatarEditor,
  avatar,
  avatarImage,
  profileName,
  profileAvatar,
  profileOccupation,
  popupName,
  popupAboutYourself,
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  userPlaceName,
  userPlaceImage,
} from "./utils/constants.js";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
});

let proFileUserId = "";

Promise.all([api.setInitialProfile(), api.setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    new UserInfo({ info: info }).setUserInfo();
    const renderedCards = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardSet = new Card(
            item,
            proFileUserId,
            ".places__cards"
          ).createCard();
          renderedCards.addItem(cardSet);
        },
      },
      cardsOnLine
    );
    renderedCards.renderItem();
  })
  .catch((error) => {
    console.error(error);
  });

addButton.addEventListener("click", () => {
  new Popup(popupAddPlace).openPopup();
});

function addCard() {
  api
    .addNewUserCard(userPlaceName.value, userPlaceImage.value)
    .then((result) => {
      const cardNew = new Card(
        result,
        proFileUserId,
        ".places__cards"
      ).createCard();
      const newCard = new Section({}, cardsOnLine);
      newCard.addItem(cardNew);
      new PopupWithForm({
        selector: popupAddPlace,
        handleFormSubmit: () => {},
      }).closePopup();
    })
    .catch((error) => console.error(error));
}

userPlaceForm.addEventListener("submit", addCard);

profileAvatarEditor.addEventListener("click", function () {
  new PopupWithForm({
    selector: avatar,
    handleFormSubmit: () => {},
  }).openPopup();
});

function changeAvatar() {
  new PopupWithForm({
    selector: avatar,
    handleFormSubmit: (item) => {
      new UserInfo({ info: item }).getUserAvatar(avatarImage.value);
    },
  }).setEventListeners();
}

changeAvatar();

editPopupButton.addEventListener("click", function () {
  new PopupWithForm({
    selector: popupEditorForm,
    handleFormSubmit: () => {},
  }).openPopup();
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileOccupation.textContent;
});

function handleProfileFormSubmit() {
  new PopupWithForm({
    selector: popupEditorForm,
    handleFormSubmit: (item) => {
      new UserInfo({ info: item }).getUserInfo(
        popupName.value,
        popupAboutYourself.value
      );
    },
  }).setEventListeners();
}

handleProfileFormSubmit();

formList.forEach((item) => {
  const form = new FormValidator(formSelectors, item);
  form.enableValidation();
});
