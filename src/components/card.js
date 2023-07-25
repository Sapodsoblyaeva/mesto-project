import { closePopup, openPopup } from "./modal.js";

import { enableValidation } from "./validate.js";

import { popupAddPlace, userPlaceForm } from "./utils.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(cardName, cardLink) {
  //копировать темплейт
  const cardsTemplate = document.querySelector("#places__cards").content;
  const cardItem = cardsTemplate
    .querySelector(".places__cards")
    .cloneNode(true);
  const placeName = cardItem.querySelector(".places__name");
  const placeImage = cardItem.querySelector(".places__image");
  const placeLike = cardItem.querySelector(".places__like-icon");
  const placeDelete = cardItem.querySelector(".places__delete-button");
  placeName.textContent = cardName;
  placeImage.src = cardLink;
  //слушатель для кнопки like
  placeLike.addEventListener("click", function () {
    placeLike.classList.toggle("places__like-icon_enabled");
  });
  //слушатель для кнопки удалить
  placeDelete.addEventListener("click", function () {
    placeDelete.closest(".places__cards").remove();
    //определяем конкретную карточку, кнопку которой нажали
    //удаляем конкретную карточку
  });
  placeImage.addEventListener("click", function () {
    //добавляем класс для открытия попапа
    const popupImage = document.querySelector(".image-popup");
    const openingImage = document.querySelector(".image-popup__photo");
    const openingText = document.querySelector(".image-popup__text");
    openPopup(popupImage);
    //выбираем какое фото отображать
    openingImage.src = placeImage.src;
    openingText.textContent = placeName.textContent;
  });
  //создать карточку, не вставляя в разметку
  return cardItem;
}

function renderCard(card) {
  //вставить в размету
  const cardsOnLine = document.querySelector(".places");
  cardsOnLine.prepend(card);
}

function setInitialCards() {
  initialCards.forEach(function (item) {
    const cardNew = createCard(item.name, item.link);
    renderCard(cardNew);
  });
}

function addCard(event) {
  //чтобы не было перезагрузки
  event.preventDefault();
  //чтобы окошко закрывалось при отправке формы с предварительной проверкой
  //состояния кнопки
  if (!popupAddPlace.querySelector(".popup__submit-button_inactive")) {
    closePopup(popupAddPlace);
    //вставить в разметку
    const userPlaceName = document.querySelector("#place-name");
    const userPlaceImage = document.querySelector("#photo-link");
    const cardNew = createCard(userPlaceName.value, userPlaceImage.value);
    renderCard(cardNew);
    userPlaceForm.reset();
  } else {
    enableValidation();
  }
}

export { initialCards, setInitialCards, createCard, renderCard, addCard };
