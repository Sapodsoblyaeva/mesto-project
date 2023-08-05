import { openPopup } from "./modal.js";

import { deleteCardFromServer, likeCard, dislikeCard } from "./api.js";

const popupImage = document.querySelector(".image-popup");
const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");
const cardsOnLine = document.querySelector(".places");
const userPlaceName = document.querySelector("#place-name");
const userPlaceImage = document.querySelector("#photo-link");
const cardsTemplate = document.querySelector("#places__cards").content;

function makeDeleteButtonInactive(deleteButton) {
  deleteButton.classList.add("places__delete-button_inactive");
  deleteButton.setAttribute("disabled", "disabled");
}

function makeDeleteButtonActive(deleteButton) {
  deleteButton.classList.remove("places__delete-button_inactive");
  deleteButton.removeAttribute("disabled");
}

function toggleCardLikesState(likeIcon, likeCounterPlace, likeCountsQnty) {
  likeIcon.classList.toggle("places__like-icon_enabled");
  likeCounterPlace.textContent = likeCountsQnty;
}

function createCard(
  cardName,
  cardLink,
  cardLikesCount,
  cardLikesArr,
  cardOwner,
  cardImageID,
  userId
) {
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
  if (cardLikesCount !== 0) {
    cardLikesArr.forEach((item) => {
      if (item._id === userId) {
        placeLike.classList.add("places__like-icon_enabled");
      }
    });
  }
  placeLike.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("places__like-icon_enabled")) {
      likeCard(cardImageID)
        .then((result) => {
          toggleCardLikesState(
            placeLike,
            placeLikeCounter,
            result.likes.length
          );
        })
        .catch((error) => console.error(error));
    } else {
      dislikeCard(cardImageID)
        .then((result) => {
          toggleCardLikesState(
            placeLike,
            placeLikeCounter,
            result.likes.length
          );
        })
        .catch((error) => console.error(error));
    }
  });
  //проверка, что карточка создана мной
  if (cardOwner !== userId) {
    makeDeleteButtonInactive(placeDelete);
  } else {
    makeDeleteButtonActive(placeDelete);
  }
  //слушатель для кнопки удалить
  placeDelete.addEventListener("click", function () {
    //чтобы удалилось с сервера
    deleteCardFromServer(cardImageID)
      .then((result) => {
        placeDelete.closest(".places__cards").remove();
      })
      .catch((error) => console.error(error));
  });
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

export { createCard, renderCard, userPlaceName, userPlaceImage };
