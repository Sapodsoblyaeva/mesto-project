const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");

import {api} from "./index.js"

import {Popup} from "./Popup.js"

import {popupEditorForm} from "./index.js"
import { PopupWithForm } from "./PopupWithForm.js";

export class UserInfo {
  constructor({info}) {
    this._info = info;
    this._userName = info.name;
    this._userAbout = info.about;
    this._userAvatar = info.avatar;
    // this._renderer = renderer;
  }
  getUserInfo(popupName, popupAboutYourself) {
    api.changeProfileData(popupName, popupAboutYourself)
    .then((result) => {
      profileName.textContent = result.name;
      profileOccupation.textContent = result.about;
      // result.name = this._userName;
      // result.avatar = this._userAvatar;
      // result.about = this._userAbout;
      // console.log(result);
      new Popup(popupEditorForm).closePopup();
    })
    .catch((error) => {
      console.error(error);
    })
    // .finally((item) => {
    //   renderLoading(false, evt.submitter);
    // });
  }
  setUserInfo() {
    profileName.textContent = this._userName;
    profileAvatar.src = this._userAvatar;
    profileOccupation.textContent = this._userAbout;
  }
}
