const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const setInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const setInitialCardsSet = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const changeProfileData = (nameOfTheProfile, aboutYourselfInTheProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameOfTheProfile,
      about: aboutYourselfInTheProfile,
    }),
  }).then((res) => getResponseData(res));
};

const changeProfileAvatar = (profileAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatarUrl,
    }),
  }).then((res) => getResponseData(res));
};

const addNewUserCard = (nameOfTheCard, linkToTheCardImage) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameOfTheCard,
      link: linkToTheCardImage,
    }),
  }).then((res) => getResponseData(res));
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/` + `${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/` + `${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/` + `${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export {
  setInitialCardsSet,
  changeProfileData,
  addNewUserCard,
  deleteCardFromServer,
  likeCard,
  dislikeCard,
  changeProfileAvatar,
  setInitialProfile,
};
