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
import { get } from "jquery";

let proFileUserId = "";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
});

const cardLayOut = new Section(
  {
    renderer: (item) => {
      const cardNew = getNewCard(item);
      cardLayOut.addItem(cardNew);
    },
    selector: cardsOnLine,
  },
);

Promise.all([api.setInitialProfile(), api.setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    getProfile(info).setUserInfo(profileName, profileAvatar, profileOccupation);
    // cardLayOut.items = initialCards.reverse();
    // cardLayOut.rendeder = () => {
    //   getNewCard(item);
    //   cardLayOut.addItem(cardNew);
    // }
    // console.log(cardLayOut.items)
    // console.log(cardLayOut)
    cardLayOut.renderItem(initialCards.reverse());
    // createCard(initialCards.reverse());
    // console.log(initialCards.reverse())
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
      setUserInfo(result);
      profileEditorForm.closePopup();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
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
      profileAvatarForm.closePopup();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      profileAvatarForm.renderLoading(false);
    });
}

profileAvatarForm.setEventListeners();

const popupImageInstance = new PopupWithImage(popupImage);
popupImageInstance.setEventListeners();

function handleImageClick(inputName, inputImage) {
  popupImageInstance.openPopup(inputName, inputImage);
}

// function toggleCardLikesState(likesCount, cardElement) {
//   cardElement
//     .querySelector(".places__like-icon")
//     .classList.toggle("places__like-icon_enabled");
//   cardElement.querySelector(".places__like-counter").textContent = likesCount;
// }

function handleLikeClick(cardInstance) {
  api
    .likeCard(cardInstance.getIdCard())
    .then((result) => {
      // console.log(cardElement);
      // console.log(result);
      cardInstance.toggleCardLikesState(result.likes.length);
    })
    .catch((error) => console.error(error));
}

function handleDisLikeClick(cardInstance) {
  api
    .dislikeCard(cardInstance.getIdCard())
    .then((result) => {
      // console.log(result);
      // console.log(cardElement);
      cardInstance.toggleCardLikesState(result.likes.length);
    })
    .catch((error) => console.error(error));
}

function handleDeleteClick(cardInstance) {
  api
    .deleteCardFromServer(cardInstance.getIdCard())
    .then(() => {
      cardInstance.deleteCard();
    })
    .catch((error) => console.error(error));
}

function getNewCard(card) {
  const newCard = new Card({
    data: card,
    handleLikeClick,
    handleDisLikeClick,
    handleDeleteClick,
    handleImageClick,
    userId: proFileUserId,
    selector: ".places__cards",
  });
  return newCard.createCard();
}

// function createCard(cards) {
//   const cardLayOut = new Section(
//     {
//       items: cards,
//       renderer: (item) => {
//         const cardNew = getNewCard(item).createCard();
//         cardLayOut.addItem(cardNew);
//       },
//     },
//     cardsOnLine
//   );
//   return cardLayOut.renderItem();
// }

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
      // console.log(result.name)
      // let newCard = [];
      // newCard.push(result);
      const thisCard = getNewCard(result);
      cardLayOut.addItem(thisCard)
      // createCard(newCard);
      newCardForm.closePopup();
    })
    .catch((error) => console.error(error));
}

newCardForm.setEventListeners();
