import "../pages/index.css";

import { Card } from "./Card.js";

import { Api } from "./Api";

import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";

import { Popup } from "./Popup.js";

import { PopupWithForm } from "./PopupWithForm.js";

import { PopupWithImage } from "./PopupWithImage.js";

import { UserInfo } from "./UserInfo.js";

import {
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
  userPlaceName,
  userPlaceImage,
  avatarChangeForm,
  popupImage,
} from "./utils/constants.js";

let proFileUserId = "";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
});

Promise.all([api.setInitialProfile(), api.setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    getProfile(info).setUserInfo(profileName, profileAvatar, profileOccupation);
    createCard(initialCards.reverse());
  })
  .catch((error) => {
    console.error(error);
  });

const profileEditorFormValidation = new FormValidator(
  formSelectors,
  popupEditorForm
);
profileEditorFormValidation.enableValidation();

const profileAvatarEditorFormValidation = new FormValidator(
  formSelectors,
  avatarChangeForm
);
profileAvatarEditorFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(formSelectors, popupAddPlace);
newCardFormValidation.enableValidation();

const newPopupEditorForm = new Popup(popupEditorForm);

const profileEditorForm = new PopupWithForm({
  popup: popupEditorForm,
  handleFormSubmit: () => {
    return handleEditorFormSubmit();
  },
});

function getProfile(data) {
  const newProfile = new UserInfo({ info: data });
  return newProfile;
}

function setUserInfo(data) {
  const newProfile = getProfile(data);
  return newProfile.setUserInfo(profileName, profileAvatar, profileOccupation);
}

function getProfileData() {
  api.setInitialProfile().then((result) => {
    const profile = getProfile(result);
    const profileData = profile.getUserInfo();
    popupName.value = profileData.name;
    popupAboutYourself.value = profileData.about;
  });
}

editPopupButton.addEventListener("click", function () {
  getProfileData();
  profileEditorForm.openPopup();
});

function handleEditorFormSubmit() {
  profileEditorForm.renderLoading(true);
  api
    .changeProfileData(popupName.value, popupAboutYourself.value)
    .then((result) => {
      return setUserInfo(result);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      newPopupEditorForm.closePopup();
      profileEditorForm.renderLoading(false);
    });
}

profileEditorForm.setEventListeners();

const profileAvatarForm = new PopupWithForm({
  popup: avatar,
  handleFormSubmit: () => {
    handleAvatarFormSubmit();
  },
});

profileAvatarEditor.addEventListener("click", function () {
  profileAvatarForm.openPopup();
});

function handleAvatarFormSubmit() {
  profileAvatarForm.renderLoading(true);
  api
    .changeProfileAvatar(avatarImage.value)
    .then((result) => {
      setUserInfo(result);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      profileAvatarForm.closePopup();
      profileAvatarForm.renderLoading(false);
    });
}

profileAvatarForm.setEventListeners();

const popupImageInstance = new PopupWithImage(popupImage);
popupImageInstance.setEventListeners();

function handleImageClick(inputName, inputImage) {
  popupImageInstance.openPopup(inputName, inputImage);
}

function toggleCardLikesState(likesCount, cardElement) {
  cardElement
    .querySelector(".places__like-icon")
    .classList.toggle("places__like-icon_enabled");
  cardElement.querySelector(".places__like-counter").textContent = likesCount;
}

function handleLikeClick(cardId, cardElement) {
  api
    .likeCard(cardId)
    .then((result) => {
      console.log(cardElement);
      console.log(result);
      toggleCardLikesState(result.likes.length, cardElement);
    })
    .catch((error) => console.error(error));
}

function handleDisLikeClick(cardId, cardElement) {
  api
    .dislikeCard(cardId)
    .then((result) => {
      console.log(result);
      console.log(cardElement);
      toggleCardLikesState(result.likes.length, cardElement);
    })
    .catch((error) => console.error(error));
}

function handleDeleteClick(cardId, cardElement) {
  api
    .deleteCardFromServer(cardId)
    .then((result) => {
      cardElement.remove();
      cardElement = null;
    })
    .catch((error) => console.error(error));
}

function getNewCard(cards) {
  const newCard = new Card({
    data: cards,
    handleLikeClick,
    handleDisLikeClick,
    handleDeleteClick,
    handleImageClick,
    userId: proFileUserId,
    selector: ".places__cards",
  });
  return newCard.createCard();
}

function createCard(cards) {
  const cardLayOut = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardNew = getNewCard(item);
        cardLayOut.addItem(cardNew);
      },
    },
    cardsOnLine
  );
  return cardLayOut.renderItem();
}

const newCardForm = new PopupWithForm({
  popup: popupAddPlace,
  handleFormSubmit: () => {
    addNewCard();
  },
});

addButton.addEventListener("click", () => {
  newCardForm.openPopup();
});

function addNewCard() {
  api
    .addNewUserCard(userPlaceName.value, userPlaceImage.value)
    .then((result) => {
      let newCard = [];
      newCard.push(result);
      createCard(newCard);
      newCardForm.closePopup();
    })
    .catch((error) => console.error(error));
}

newCardForm.setEventListeners();
