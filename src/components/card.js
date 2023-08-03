import { closePopup, openPopup } from "./modal.js";

import { popupAddPlace, userPlaceForm, resetForm } from "./utils.js";

import {
  addNewUserCard,
  deleteCardFromServer,
  likeCard,
  dislikeCard,
} from "./api.js";

import { profileName } from "./profile.js";

const popupImage = document.querySelector(".image-popup");
const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");
const cardsOnLine = document.querySelector(".places");
const userPlaceName = document.querySelector("#place-name");
const userPlaceImage = document.querySelector("#photo-link");
const cardsTemplate = document.querySelector("#places__cards").content;
const commitButton = document.querySelector(".popup__commit-button");
const requestForConfirmationPopup = document.querySelector(".delete-card");

function makeDeleteButtonInactive(deleteButton) {
  deleteButton.classList.add("places__delete-button_inactive");
  deleteButton.setAttribute("disabled", "disabled");
}

function makeDeleteButtonActive(deleteButton) {
  deleteButton.classList.remove("places__delete-button_inactive");
  deleteButton.removeAttribute("disabled");
}

function countLikes(cardLikes) {
  return cardLikes;
}

function createCard(cardName, cardLink, cardLikesCount, cardOwner, cardImageID) {
  //копировать темплейт
  const cardItem = cardsTemplate
    .querySelector(".places__cards")
    .cloneNode(true);
  const placeName = cardItem.querySelector(".places__name");
  const placeImage = cardItem.querySelector(".places__image");
  const placeLike = cardItem.querySelector(".places__like-icon");
  const placeLikeCounter = cardItem.querySelector(".places__like-counter");
  const placeDelete = cardItem.querySelector(".places__delete-button");
  placeName.textContent = cardName;
  placeImage.src = cardLink;
  placeImage.alt = cardName + `. Фото живописного места.`;
  //для первоначального отображения кол-во лайков
  placeLikeCounter.textContent = cardLikesCount;
  //слушатель для кнопки like
  placeLike.addEventListener("click", function (evt) {
    placeLike.classList.toggle("places__like-icon_enabled");
    if (evt.target.classList.contains("places__like-icon_enabled")) {
      likeCard(cardImageID);
      placeLikeCounter.textContent = cardLikesCount + 1;
    } else {
      dislikeCard(cardImageID);
      placeLikeCounter.textContent = cardLikesCount;
    }
  });
  //проверка, что карточка создана мной
  if (cardOwner === profileName.textContent) {
    makeDeleteButtonActive(placeDelete);
    //слушатель для кнопки удалить
    placeDelete.addEventListener("click", function (evt) {
      openPopup(requestForConfirmationPopup);
      commitButton.addEventListener("click", function (event) {
        event.preventDefault();
        //удалить карточку содержащую кнопку удаления
        placeDelete.closest(".places__cards").remove();
        //чтобы удалилось с сервера
        deleteCardFromServer(cardImageID);
        closePopup(requestForConfirmationPopup);
      });
    });
  } else {
    makeDeleteButtonInactive(placeDelete);
  }

  placeImage.addEventListener("click", function () {
    openPopup(popupImage);
    openingImage.src = placeImage.src;
    openingImage.alt = placeImage.alt;
    openingText.textContent = placeName.textContent;
  });
  //создать карточку, не вставляя в разметку
  return cardItem;
}

function renderCard(card) {
  cardsOnLine.prepend(card);
}

function addCard(event) {
  event.preventDefault();
  closePopup(popupAddPlace);
  //вставить в разметку
  const cardNew = createCard(userPlaceName.value, userPlaceImage.value, 0);
  renderCard(cardNew);
  addNewUserCard(userPlaceName.value, userPlaceImage.value);
  resetForm(userPlaceForm);
}

export { createCard, renderCard, addCard, cardsTemplate, countLikes };
