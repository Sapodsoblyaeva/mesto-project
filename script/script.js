const submitPopupButton = document.querySelector(".popup__submit-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelectorAll(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddPlaces = document.querySelector(".popup__add-places");
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
  placeholderOccupation.textContent = occupationValue;
  placeholderName.append();
  placeholderOccupation.append();
}

function openPopup(popupElement) {
  editPopupButton.addEventListener("click", function () {
    popup.classList.remove('popup_closed');
    popup.classList.add("popup_opened");
  });
  addButton.addEventListener("click", function () {
    popupAddPlaces.classList.remove('popup_closed');
    popupAddPlaces.classList.add("popup_opened");
  });
}

openPopup();

/*function closePopup(popupElement) {
  closePopupButton.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
    const myInputName = document.querySelector("#name");
    const myInputAboutYourself = document.querySelector("#about-yourself");
    myInputName.value = "";
    myInputAboutYourself.value = "";
  });

  popupCloseButtonPlaces.addEventListener("click", function () {
    popupAddPlaces.classList.remove("popup_opened");
    const myInputName = document.querySelector("#name");
    const myInputAboutYourself = document.querySelector("#about-yourself");
    myInputName.value = "";
    myInputAboutYourself.value = "";
  });
}

closePopup();*/

const seconds = 500;

function closePopup(popupElement) {
  //проходится по всем элементам с классом close-button
  closePopupButton.forEach(function (elem) {
    //слушает на какой элемент нажали
    elem.addEventListener("click", function () {
      //добавляет класс со стилями плавного закрытия
      popup.classList.add('popup_closed');
      popupAddPlaces.classList.add('popup_closed');
      //таймер, чтобы произошло плавное закрытие
      setTimeout(function () {
        popup.classList.remove('popup_opened');
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

/*const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
};]

function setUpInitialCards (image, text) {
  const placesCards = document.createElement('div');
  placesCard.classList.add('.places__cards');
  const placesImage = document.createElement('image');
  placesImage = text;
  placesImage.classList.add('.places__image');
  placesImage.append();
  const placesInfo = document.querySelector('div');
  placesInfo.classList.add('.places__info');
  const placesName = document.querySelector('h2');
  placesName.textContent = text;
  placesName.classList.add('.places__name');
  placesName.append();
  const placesLikeIcon = document.querySelector('button');
  placesLikeIcon.classList.add('.places__like-icon');
}

setUpInitialCards(image.value, text.value);
text.value = initialCards[0].name
image.value = initialCards[0].image

setUpInitialCards(image.value, text.value);
text.value = initialCards[1].name
image.value = initialCards[1].image*/

function likeCard() {
  const likeButton = document.querySelectorAll(".places__like-icon");
  likeButton.forEach(function (item) {
    item.addEventListener("click", function () {
      item.classList.toggle("places__like-icon_enabled");
    });
  });
}
likeCard();
