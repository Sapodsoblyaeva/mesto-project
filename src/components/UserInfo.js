import {
  profileName,
  profileAvatar,
  profileOccupation,
  popupEditorForm,
  avatar,
} from "./utils/constants.js";

import { api } from "./index.js";

import { Popup } from "./Popup.js";

import { PopupWithForm } from "./PopupWithForm.js";

export class UserInfo {
  constructor({ info }) {
    this._info = info;
    this._userName = info.name;
    this._userAbout = info.about;
    this._userAvatar = info.avatar;
  }
  getUserInfo(popupName, popupAboutYourself) {
    api
      .changeProfileData(popupName, popupAboutYourself)
      .then((result) => {
        profileName.textContent = result.name;
        profileOccupation.textContent = result.about;
        new Popup(popupEditorForm).closePopup();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getUserAvatar(avatarUrl) {
    api
      .changeProfileAvatar(avatarUrl)
      .then((result) => {
        profileAvatar.src = result.avatar;
        new PopupWithForm({
          selector: avatar,
          handleFormSubmit: () => {},
        }).closePopup();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  setUserInfo() {
    profileName.textContent = this._userName;
    profileAvatar.src = this._userAvatar;
    profileOccupation.textContent = this._userAbout;
  }
}
