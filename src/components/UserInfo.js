export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(`.${nameSelector}`);
    this._userJob = document.querySelector(`.${jobSelector}`);
    this._userAvatar = document.querySelector(`.${avatarSelector}`);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      avatar: this._userAvatar.src,
    };
  }
  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
