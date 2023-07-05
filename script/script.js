const submitPopupButton = document.querySelector(".popup__submit-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddPlace = document.querySelector(".add-places");
const popupCreateButton = document.querySelector(".popup__create-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const popupName = document.querySelector("#name");
const popupAboutYourself = document.querySelector("#about-yourself");
const formElement = document.querySelector(".popup__form");
const userPlaceName = document.querySelector("#place-name");
const userPlaceImage = document.querySelector("#photo-link");
const userPlaceForm = document.querySelector(".add-places__form");
const popupImage = document.querySelector(".image-popup");

function addData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

function openPopup(popupElement) {
  editPopupButton.addEventListener("click", function () {
    popup.classList.add("popup_opened");
  });
  addButton.addEventListener("click", function () {
    popupAddPlace.classList.add("popup_opened");
  });
}

openPopup();

function closePopup(popupElement) {
  //проходится по всем элементам с классом close-button
  closePopupButtons.forEach(function (elem) {
    //слушает на какой элемент нажали
    elem.addEventListener("click", function () {
      elem.closest(".popup").classList.remove("popup_opened");
      //проходится по массиву, в котором записаны все значения текстовых полей
      //и убирает введенные значения, чтобы при открытии закрытии в полях не оставались
      //пользовательские данные
    });
  });
}

closePopup();

function submitPopup(event) {
  //чтобы не было перезагрузки
  event.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  popup.classList.remove("popup_opened");
  addData(popupName.value, popupAboutYourself.value);
}

formElement.addEventListener("submit", submitPopup);

function createCard(cardName, cardLink) {
  const cardsOnLine = document.querySelector(".places");
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
    popupImage.classList.add("popup_opened");
    //выбираем какое фото отображать
    let openingImage = document.querySelector(".image-popup__photo");
    openingImage.src = placeImage.src;
    let openingText = document.querySelector(".image-popup__text");
    openingText.textContent = placeName.textContent;
  });
  cardsOnLine.prepend(cardItem);
}

function setInitialCards() {
  initialCards.forEach(function (item) {
    createCard(item.name, item.link);
  });
}
setInitialCards();

function addCard(event) {
  //чтобы не было перезагрузки
  event.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  popupAddPlace.classList.remove("popup_opened");
  createCard(userPlaceName.value, userPlaceImage.value);
  userPlaceForm.reset();
}

userPlaceForm.addEventListener("submit", addCard);
