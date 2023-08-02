import { popupEditorForm, closeByEsc } from "./utils.js";
import { changeProfileData } from "./api.js";
import { addProfileData } from "./profile.js";

const popupName = document.querySelector("#name");
const popupAboutYourself = document.querySelector("#about-yourself");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  //именно документ, все остальное не работает
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  //именно документ, все остальное не работает
  document.removeEventListener("keydown", closeByEsc);
}

function handleProfileFormSubmit(evt) {
  //чтобы не было перезагрузки
  evt.preventDefault();
  //чтобы окошко закрывалось при отправке формы
  //добавлена проверка на заполненность и валидность полей
  closePopup(popupEditorForm);
  changeProfileData(popupName.value, popupAboutYourself.value);
  addProfileData(popupName.value, popupAboutYourself.value);
}

export {
  closePopup,
  handleProfileFormSubmit,
  openPopup,
  popupName,
  popupAboutYourself,
};
