import { openPopup, popupName, popupAboutYourself, closePopup } from "./modal";
import { popupEditorForm, renderLoading, resetForm } from "./utils";
import { changeProfileAvatar } from "./api.js";

const profile = document.querySelector(".profile");
const editPopupButton = document.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");
const profileAvatarEditButton = profile.querySelector(
  ".profile__avatar-edit-button"
);
const avatar = document.querySelector(".avatar");
const avatarImage = avatar.querySelector("#avatar-link");
const avatarChangeForm = document.forms["avatar__change"];

function addProfileData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
  renderLoading(true);
}

function createProfile(profileID, profileImage, profileAbout) {
  profileName.textContent = profileID;
  profileAvatar.src = profileImage;
  profileOccupation.textContent = profileAbout;
  editPopupButton.addEventListener("click", function () {
    openPopup(popupEditorForm);
    popupName.value = profileName.textContent;
    popupAboutYourself.value = profileOccupation.textContent;
  });
  profile.prepend();
}

function addAvatarUrl(avatarUrl) {
  profileAvatar.src = avatarUrl;
  renderLoading(true);
}

function changeAvatar(evt) {
  evt.preventDefault();
  closePopup(avatar);
  addAvatarUrl(avatarImage.value);
  changeProfileAvatar(avatarImage.value);
  setTimeout(() => {
    resetForm(avatarChangeForm);
  }, 1000);
}

export {
  createProfile,
  profileName,
  profileAvatarEditButton,
  changeAvatar,
  avatar,
  avatarChangeForm,
  addProfileData,
};
