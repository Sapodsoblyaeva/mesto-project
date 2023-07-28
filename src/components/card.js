import { closePopup, openPopup } from "./modal.js";

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

const popupImage = document.querySelector(".image-popup");
const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");
const cardsOnLine = document.querySelector(".places");
const userPlaceName = document.querySelector("#place-name");
const userPlaceImage = document.querySelector("#photo-link");
const cardsTemplate = document.querySelector("#places__cards").content;

function createCard(cardName, cardLink) {
  //копировать темплейт
  const cardItem = cardsTemplate
    .querySelector(".places__cards")
    .cloneNode(true);
  const placeName = cardItem.querySelector(".places__name");
  const placeImage = cardItem.querySelector(".places__image");
  const placeLike = cardItem.querySelector(".places__like-icon");
  const placeDelete = cardItem.querySelector(".places__delete-button");
  placeName.textContent = cardName;
  placeImage.src = cardLink;
  placeImage.alt = cardName + `. Фото живописного места.`;
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
    openPopup(popupImage);
    //выбираем какое фото отображать
    openingImage.src = placeImage.src;
    openingImage.alt = placeImage.alt;
    openingText.textContent = placeName.textContent;
  });
  //создать карточку, не вставляя в разметку
  return cardItem;
}

function renderCard(card) {
  //вставить в размету
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
  closePopup(popupAddPlace);
  //вставить в разметку
  const cardNew = createCard(userPlaceName.value, userPlaceImage.value);
  renderCard(cardNew);
  userPlaceForm.reset();
}

export { initialCards, setInitialCards, createCard, renderCard, addCard };
