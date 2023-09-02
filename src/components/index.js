import "../pages/index.css";

import { Card, toggleCardLikesState } from "./Card.js";

import { Api } from "./Api";

import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";

import { Popup } from "./Popup.js";

import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";

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
  // profileAvatar,
  profileOccupation,
  popupName,
  popupAboutYourself,
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  userPlaceName,
  userPlaceImage,
  avatarChangeForm,
  popupImage
} from "./utils/constants.js";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
});

const profileEditorFormValidation = new FormValidator(formSelectors, popupEditorForm);
profileEditorFormValidation.enableValidation();

const profileAvatarEditorFormValidation = new FormValidator(formSelectors, avatarChangeForm);
profileAvatarEditorFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(formSelectors, popupAddPlace);
newCardFormValidation.enableValidation();

const profileEditorForm = new PopupWithForm({selector: popupEditorForm,
  handleFormSubmit: (item) => {
    new UserInfo({ info: item }).getUserInfo(
      popupName.value,
      popupAboutYourself.value
    );
  }})

  const profileAvatarForm = new PopupWithForm({selector: avatar,
    handleFormSubmit: (item) => {
      new UserInfo({ info: item }).getUserAvatar(avatarImage.value);
    },
    })

    const newCardForm = new PopupWithForm({selector: popupAddPlace,
      handleFormSubmit: () => {}
      })

const cardLayout = new Section({}, cardsOnLine);

const popupImageInstance = new PopupWithImage(popupImage);


let proFileUserId = "";

Promise.all([api.setInitialProfile(), api.setInitialCardsSet()])
  .then(([info, initialCards]) => {
    proFileUserId = info._id;
    // new UserInfo({ info: info }).setUserInfo();
    const renderedCards = new Section(
      {
        items: initialCards.reverse(),
        renderer: (item) => {
          const cardSet = new Card({
            data: item,
            like: () => {
      api
        .likeCard(item._id)
        .then((result) => {
          // this._toggleCardLikesState(result.likes.length);
          toggleCardLikesState(result.likes.length);
        })
        .catch((error) => console.error(error));
            },
            dislike: () => {
      api
        .dislikeCard(item._id)
        .then((result) => {
          toggleCardLikesState(result.likes.length);
        })
        .catch((error) => console.error(error));
            },
            deleteCard: () => {
              api
              .deleteCardFromServer(item._id)
              .then((result) => {
                document
          .querySelector(".places__delete-button")
          .closest(".places__cards")
          .remove();
              })
              .catch((error) => console.error(error));
            },
            openImage: () => {
              popupImageInstance.openPopup(item.name, item.link);
            },
            userId: proFileUserId,
            selector: ".places__cards",
        }).createCard();
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
      const cardNew = new Card({
        data: result,
        userId: proFileUserId,
        selector: ".places__cards"
    }).createCard();
      const newCard = new Section({}, cardsOnLine);
      newCard.addItem(cardNew);
      newCardForm.closePopup();
    })
    .catch((error) => console.error(error));
}

userPlaceForm.addEventListener("submit", addCard);

profileAvatarEditor.addEventListener("click", function () {
  profileAvatarForm.openPopup();
});

profileAvatarForm.setEventListeners();

editPopupButton.addEventListener("click", function () {
  profileEditorForm.openPopup();
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileOccupation.textContent;
});

  profileEditorForm.setEventListeners();


// formList.forEach((item) => {
//   const form = new FormValidator(formSelectors, item);
//   form.enableValidation();
// });
