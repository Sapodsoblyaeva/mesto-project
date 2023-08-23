import { openPopup } from "./modal.js";

import { api } from "./index.js";

import { PopupWithImage } from "./PopupWithImage.js";

const popupImage = document.querySelector(".image-popup");
const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");
const cardsOnLine = document.querySelector(".places");
const userPlaceName = document.querySelector("#place-name");
const userPlaceImage = document.querySelector("#photo-link");
const cardsTemplate = document.querySelector("#places__cards").content;

export class Card {
  constructor(data, userId, selector) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLikesCount = data.likes.length;
    this._cardLikesArr = data.likes;
    this._cardOwner = data.owner._id;
    this._cardImageID = data._id;
    this._userId = userId;
    this._selector = selector;
  }
  _getCard() {
    const cardItem = cardsTemplate
      .querySelector(this._selector)
      .cloneNode(true);
    return cardItem;
  }
  createCard() {
    this._element = this._getCard();
    const placeName = this._element.querySelector(".places__name");
    const placeImage = this._element.querySelector(".places__image");
    const placeLike = this._element.querySelector(".places__like-icon");
    const placeLikeCounter = this._element.querySelector(
      ".places__like-counter"
    );
    const placeDelete = this._element.querySelector(".places__delete-button");
    placeName.textContent = this._cardName;
    placeImage.src = this._cardLink;
    placeImage.alt = this._cardName + `. Фото живописного места.`;
    //для первоначального отображения кол-во лайков
    placeLikeCounter.textContent = this._cardLikesCount;
    if (this._cardLikesCount !== 0) {
      this._cardLikesArr.forEach((item) => {
        if (item._id === this._userId) {
          placeLike.classList.add("places__like-icon_enabled");
        }
      });
    }
    //проверка, что карточка создана мной
    if (this._cardOwner !== this._userId) {
      this._makeDeleteButtonInactive(placeDelete);
    } else {
      this._makeDeleteButtonActive(placeDelete);
    }
    this._setEventListeners();
    return this._element;
  }
  _makeDeleteButtonInactive() {
    this._element
      .querySelector(".places__delete-button")
      .classList.add("places__delete-button_inactive");
    this._element
      .querySelector(".places__delete-button")
      .setAttribute("disabled", "disabled");
  }
  _makeDeleteButtonActive() {
    this._element
      .querySelector(".places__delete-button")
      .classList.remove("places__delete-button_inactive");
    this._element
      .querySelector(".places__delete-button")
      .removeAttribute("disabled");
  }
  _toggleCardLikesState(likesCount) {
    this._element.querySelector(".places__like-icon").classList.toggle("places__like-icon_enabled");
    this._element.querySelector(".places__like-counter").textContent =
      likesCount;
  }
  _handleLikeClick(evt) {
    if (!evt.target.classList.contains("places__like-icon_enabled")) {
      api.likeCard(this._cardImageID)
        .then((result) => {
          this._toggleCardLikesState(result.likes.length);
        })
        .catch((error) => console.error(error));
    } else {
      api.dislikeCard(this._cardImageID)
        .then((result) => {
          this._toggleCardLikesState(result.likes.length);
        })
        .catch((error) => console.error(error));
    }
  }
  _handleDeleteClick() {
    api.deleteCardFromServer(this._cardImageID)
      .then((result) => {
        this._element
          .querySelector(".places__delete-button")
          .closest(".places__cards")
          .remove();
      })
      .catch((error) => console.error(error));
  }
  _handleImageClick () {
    new PopupWithImage(popupImage).openPopup();
    // openingImage.src = this._element.querySelector(".places__image").src;
    // openingImage.alt = this._element.querySelector(".places__image").alt;
    // openingText.textContent = this._element.querySelector(".places__name").textContent;
  }
  _setEventListeners() {
    this._element
      .querySelector(".places__like-icon")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });
    this._element
      .querySelector(".places__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteClick();
      });
      this._element.querySelector(".places__image").addEventListener("click", (evt) => {
        this._handleImageClick();
      });
  }
}

export {
  userPlaceName,
  userPlaceImage,
};
