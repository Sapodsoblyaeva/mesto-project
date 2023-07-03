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
const popupCreateButton = document.querySelector(".popup__create-button");
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

function addData(nameValue, occupationValue) {
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
  //добавить имя в профайл
  profileName.append();
  //добавить занятие в профайл
  profileOccupation.append();
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
    //чтобы не было перезагрузки
    event.preventDefault();
    //чтобы окошко закрывалось при отправке формы
    popup.classList.remove("popup_opened");
    //взять имя и занятие из поля инпут
    const popupName = document.querySelector("#name");
    const popupAboutYourself = document.querySelector("#about-yourself");
    addData(popupName.value, popupAboutYourself.value);
  });
}

submitPopup();

function setInitialCards() {
  initialCards.forEach(function (item) {
    const cardsOnine = document.querySelector(".places");
    //копировать темплейт
    const cardsTemplate = document.querySelector("#places__cards").content;
    const cardItem = cardsTemplate
      .querySelector(".places__cards")
      .cloneNode(true);
    //добавить в карточыки значения имени и картинки из массива
    const cardsImage = cardItem.querySelector(".places__image");
    const cardsName = cardItem.querySelector(".places__name");
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    cardsName.textContent = item.name;
    //добавить карточку вначало
    cardsOnine.prepend(cardItem);
  });
}

setInitialCards();

function addCard() {
  popupCreateButton.addEventListener("click", function (event) {
    //чтобы не было перезагрузки
    event.preventDefault();
    //чтобы окошко закрывалось при отправке формы
    popupAddPlaces.classList.remove("popup_opened");
    const cardsOnine = document.querySelector(".places");
    //создать из темплейта новую карту
    const cardsTemplate = document.querySelector("#places__cards").content;
    const cardItem = cardsTemplate
      .querySelector(".places__cards")
      .cloneNode(true);
    //путь куда вставлять имя и картинку и откуда брать значения
    const cardsImage = cardItem.querySelector(".places__image");
    const cardsName = cardItem.querySelector(".places__name");
    const addPlacesName = document.querySelector("#place-name");
    const addPlacesLink = document.querySelector("#photo-link");
    cardsImage.src = addPlacesLink.value;
    cardsImage.alt = addPlacesName.value;
    cardsName.textContent = addPlacesName.value;
    //поменять перезаписать массив
    initialCards[0] = { name: addPlacesName.value, link: addPlacesLink.value };
    cardsOnine.prepend(cardItem);
  });
}

addCard();

function likeCard() {
  const likeButton = document.querySelectorAll(".places__like-icon");
  likeButton.forEach(function (item) {
    item.addEventListener("click", function () {
      //чтобы можно было снимать лайк и ставить его
      item.classList.toggle("places__like-icon_enabled");
    });
  });
}

likeCard();

function openImage() {
  const imagePopup = document.querySelectorAll(".places__image");
  const popupImage = document.querySelector(".image-popup");
  const textPopup = document.querySelectorAll(".places__name");
  imagePopup.forEach(function (elem) {
    elem.addEventListener("click", function () {
      //удаляем класс плановного закрытия, если он добавился при закрытии и потворном открытии
      popupImage.classList.remove("popup_closed");
      //добавляем класс для открытия попапа
      popupImage.classList.add("image-popup_opened");
      //выбираем какое фото отображать
      let openingImage = document.querySelector(".image-popup__photo");
      openingImage.src = elem.src;
      let openText = document.querySelector(".image-popup__text");
      openText.textContent = elem.parentNode.textContent;
    });
  });
}

openImage();

function closeImage(popupElement) {
  const imageClose = document.querySelector(".image-popup__close-button");
  const popupImage = document.querySelector(".image-popup");
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

function deleteCard() {
  const imageDeleteButton = document.querySelectorAll(".places__delete-button");
  imageDeleteButton.forEach(function (elem) {
    //Слушаем на какой элемент нажали
    elem.addEventListener("click", function () {
      //выбираем нужную карточку
      let card = document.querySelector(".places__cards");
      //определяем конкретную карточку, кнопку которой нажали
      card = elem.parentNode;
      //удаляем конкретную карточку
      card.parentNode.removeChild(card);
    });
  });
}

deleteCard();
