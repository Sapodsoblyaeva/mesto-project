const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAvatar = profile.querySelector(".profile__avatar");
const profileOccupation = profile.querySelector(".profile__occupation");

import {api} from "./index.js"

export class UserInfo {
  constructor(info) {
    this._info = info;
    this._userName = info.name;
    this._userAbout = info.about;
    this._userAvatar = info.avatar;
    // this._renderer = renderer;
  }
  getUserInfo(popupName, popupAboutYourself) {
    api.changeProfileData(popupName, popupAboutYourself)
    .then((result) => {
      result.name = this._userName;
      result.avatar = this._userAvatar;
      result.about = this._userAbout;
      this.setUserInfo();
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
