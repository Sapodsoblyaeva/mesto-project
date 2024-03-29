import { cardsTemplate } from "./utils/constants.js";

export class Card {
  constructor({
    data,
    handleLikeClick,
    handleDisLikeClick,
    handleDeleteClick,
    handleImageClick,
    userId,
    selector,
  }) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLikesCount = data.likes.length;
    this._cardLikesArr = data.likes;
    this._cardOwner = data.owner._id;
    this._cardImageID = data._id;
    this._userId = userId;
    this._selector = selector;
    this._handleLikeClick = handleLikeClick;
    this._handleDisLikeClick = handleDisLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleImageClick = handleImageClick;
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
  toggleCardLikesState(likesCount) {
    this._element
      .querySelector(".places__like-icon")
      .classList.toggle("places__like-icon_enabled");
    this._element.querySelector(".places__like-counter").textContent =
      likesCount;
  }
  getIdCard() {
    return this._cardImageID;
  }
  deleteCard() {
    this._element.remove();
    this._element = null;
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
  _chooseLikeIconState(evt) {
    if (!evt.target.classList.contains("places__like-icon_enabled")) {
      this._handleLikeClick(this);
    } else {
      this._handleDisLikeClick(this);
    }
  }
  _setEventListeners() {
    this._element
      .querySelector(".places__like-icon")
      .addEventListener("click", (evt) => {
        this._chooseLikeIconState(evt);
      });
    this._element
      .querySelector(".places__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._element
      .querySelector(".places__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._cardName, this._cardLink);
      });
  }
}
