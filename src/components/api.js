export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  setInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }
  setInitialCardsSet() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }
  changeProfileData(nameOfTheProfile, aboutYourselfInTheProfile) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameOfTheProfile,
        about: aboutYourselfInTheProfile,
      }),
    }).then((res) => this.getResponseData(res));
  }
  changeProfileAvatar(profileAvatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: profileAvatarUrl,
      }),
    }).then((res) => this.getResponseData(res));
  }
  addNewUserCard(nameOfTheCard, linkToTheCardImage) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameOfTheCard,
        link: linkToTheCardImage,
      }),
    }).then((res) => this.getResponseData(res));
  }
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/` + `${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/` + `${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }
  deleteCardFromServer(cardId) {
    return fetch(`${this.baseUrl}/cards/` + `${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }
}
