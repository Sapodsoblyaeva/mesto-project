import { closeByEsc } from "./utils.js";

import { setInitialProfile } from "./api.js";

const popupName = document.querySelector("#name");
const popupAboutYourself = document.querySelector("#about-yourself");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");

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

function addProfileData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

function createProfile(profileID, profileImage, profileAbout) {
  profileName.textContent = profileID;
  profileAvatar.src = profileImage;
  profileOccupation.textContent = profileAbout;
  popupName.value = profileID;
  popupAboutYourself.value = profileAbout;
  profile.prepend();
}

function setProfile() {
  setInitialProfile()
    .then((result) => {
      createProfile(result.name, result.avatar, result.about);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addAvatarUrl(avatarUrl) {
  profileAvatar.src = avatarUrl;
}

export {
  closePopup,
  openPopup,
  popupName,
  popupAboutYourself,
  setProfile,
  profileName,
  addAvatarUrl,
  addProfileData,
};
