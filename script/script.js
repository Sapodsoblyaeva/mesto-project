const submitPopupButton = document.querySelector(".popup__submit-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddPlace = document.querySelector(".add-places");
const popupEditorForm = document.querySelector(".editor-form");
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
const cardsOnLine = document.querySelector(".places");
const openingImage = document.querySelector(".image-popup__photo");
const openingText = document.querySelector(".image-popup__text");
const cardsTemplate = document.querySelector("#places__cards").content;

function addData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

editPopupButton.addEventListener("click", function () {
  openPopup(popupEditorForm);
});

addButton.addEventListener("click", function () {
  openPopup(popupAddPlace);
});

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//Массив кнопок закрытия итерируется циклом forEach,
//на каждую кнопку устанавливается слушатель события клик.
//В колбэке слушателя происходит поиск ближайшего элемента с классом popup и
//у него удаляется класс открытого попапа.
closePopupButtons.forEach(function (elem) {
  elem.addEventListener("click", function () {
    closePopup(elem.closest(".popup"));
  });
});

function submitPopup(event) {
  //чтобы не было перезагрузки
  event.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  closePopup(popupEditorForm);
  addData(popupName.value, popupAboutYourself.value);
}

formElement.addEventListener("submit", submitPopup);

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
setInitialCards();

function addCard(event) {
  //чтобы не было перезагрузки
  event.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  closePopup(popupAddPlace);
  //вставить в разметку
  const cardNew = createCard(userPlaceName.value, userPlaceImage.value);
  renderCard(cardNew);
  userPlaceForm.reset();
}

userPlaceForm.addEventListener("submit", addCard);
