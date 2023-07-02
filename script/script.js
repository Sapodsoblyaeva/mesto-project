const submitPopupButton = document.querySelector(".popup__submit-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelectorAll(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddPlaces = document.querySelector(".add-places");
const popupCloseButtonPlaces = document.querySelector(
  ".popup__close-button-places"
);
const popupInfo = document.querySelectorAll(".popup__info");

function addData(
  nameValue,
  occupationValue,
  placeholderNameValue,
  placeholderOccupationValue
) {
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
  profileName.append();
  profileOccupation.append();
  const placeholderName = document.querySelector('[name="name"]').placeholder;
  placeholderName.textContent = placeholderNameValue;
  const placeholderOccupation = document.querySelector(
    '[name="about-yourself"]'
  ).placeholder;
  placeholderOccupation.textContent = placeholderOccupationValue;
  placeholderName.append();
  placeholderOccupation.append();
}

function openPopup(popupElement) {
  editPopupButton.addEventListener("click", function () {
    popup.classList.remove("popup_closed");
    popup.classList.add("popup_opened");
  });
  addButton.addEventListener("click", function () {
    popupAddPlaces.classList.remove("popup_closed");
    popupAddPlaces.classList.add("popup_opened");
  });
}

openPopup();

function closePopup(popupElement) {
  const seconds = 500;
  //проходится по всем элементам с классом close-button
  closePopupButton.forEach(function (elem) {
    //слушает на какой элемент нажали
    elem.addEventListener("click", function () {
      //добавляет класс со стилями плавного закрытия
      popup.classList.add("popup_closed");
      popupAddPlaces.classList.add("popup_closed");
      //таймер, чтобы произошло плавное закрытие
      setTimeout(function () {
        popup.classList.remove("popup_opened");
        popupAddPlaces.classList.remove("popup_opened");
      }, 1 * seconds);
      //проходится по массиву, в котором записаны все значения текстовых полей
      //и убирает введенные значения, чтобы при открытии закрытии в полях не оставались
      //пользовательские данные
      popupInfo.forEach(function (item) {
        item.value = "";
      });
    });
  });
}

closePopup();

function submitPopup(popupElement) {
  submitPopupButton.addEventListener("click", function (event) {
    event.preventDefault();
    popup.classList.remove("popup_opened");
    const popupName = document.querySelector("#name");
    const popupAboutYourself = document.querySelector("#about-yourself");
    const popupPlaceholderName =
      document.querySelector('[name="name"]').placeholder;
    const popupPlaceholderOccupation = document.querySelector(
      '[name="about-yourself"]'
    ).placeholder;
    addData(
      popupName.value,
      popupAboutYourself.value,
      popupPlaceholderName.value,
      popupPlaceholderOccupation.value
    );
    popupName.value = "";
    popupAboutYourself.value = "";
    popupPlaceholderName.value = "";
    popupPlaceholderOccupation.value = "";
  });
}

submitPopup();

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

function setInitialCards() {
  initialCards.forEach(function (item) {
    const cardsOnine = document.querySelector(".places");
    const cardsTemplate = document.querySelector("#places__cards").content;
    const cardItem = cardsTemplate
      .querySelector(".places__cards")
      .cloneNode(true);
    const cardsImage = cardItem.querySelector(".places__image");
    const cardsName = cardItem.querySelector(".places__name");
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    cardsName.textContent = item.name;
    cardsOnine.prepend(cardItem);
  });
}
setInitialCards();

const popupCreateButton = document.querySelector(".popup__create-button");

function addCard() {
  popupCreateButton.addEventListener("click", function (event) {
    event.preventDefault();
    popupAddPlaces.classList.remove("popup_opened");
    const cardsOnine = document.querySelector(".places");
    const cardsTemplate = document.querySelector("#places__cards").content;
    const cardItem = cardsTemplate
      .querySelector(".places__cards")
      .cloneNode(true);
    const cardsImage = cardItem.querySelector(".places__image");
    const cardsName = cardItem.querySelector(".places__name");
    const addPlacesName = document.querySelector("#place-name");
    const addPlacesLink = document.querySelector("#photo-link");
    cardsImage.src = addPlacesLink.value;
    cardsImage.alt = addPlacesName.value;
    cardsName.textContent = addPlacesName.value;
    cardsOnine.prepend(cardItem);
  });
}

addCard();

function likeCard() {
  const likeButton = document.querySelectorAll(".places__like-icon");
  likeButton.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("places__like-icon_enabled");
    });
  });
}
likeCard();

const imagePopup = document.querySelectorAll(".places__image");
const popupImage = document.querySelector(".image-popup");
const imageClose = document.querySelector(".image-popup__close-button");
const openedImage = document.querySelector("places__image");
const popupContainer = document.querySelector(".image-popup__container");

function openImage() {
  //ПРоходим по массиву картинок из карточек
  imagePopup.forEach(function (elem) {
    //Слушаем на какой элемент нажали
    elem.addEventListener("click", function () {
      //удаляем класс плановного закрытия, если он добавился при закрытии и потворном открытии
      popupImage.classList.remove("popup_closed");
      //добавляем класс для открытия попапа
      popupImage.classList.add("image-popup_opened");
      //выбираем какое фото отображать
      let openingImage = document.querySelector(".image-popup__photo");
      openingImage.src = elem.src;
    });
  });
}

openImage();

function closeImage(popupElement) {
  const seconds = 500;
  //проходится по всем элементам с классом close-button
  imageClose.addEventListener("click", function () {
    //добавляет класс со стилями плавного закрытия
    popupImage.classList.add("popup_closed");
    //таймер, чтобы произошло плавное закрытие
    setTimeout(function () {
      popupImage.classList.remove("image-popup_opened");
    }, 1 * seconds);
  });
}

closeImage();

const imageDeleteButton = document.querySelectorAll(".places__delete-button");

function deleteCard() {
  imageDeleteButton.forEach(function (elem) {
    //Слушаем на какой элемент нажали
    elem.addEventListener("click", function () {
      const card = document.querySelector(".places__cards");
      card.parentNode.removeChild(card);
    });
  });
}

deleteCard();
