export class UserInfo {
  constructor({ info }) {
    this._info = info;
    this._userName = info.name;
    this._userAbout = info.about;
    this._userAvatar = info.avatar;
  }
  getUserInfo() {
    return this._info;
  }
  setUserInfo(profileName, profileAvatar, profileOccupation) {
    profileName.textContent = this._userName;
    profileAvatar.src = this._userAvatar;
    profileOccupation.textContent = this._userAbout;
  }
}
