import { createProfile } from "./profile";
import { createCard, renderCard, countLikes } from "./card";
import { renderLoading } from "./utils.js";

const setInitialProfile = () => {
  return fetch("https://mesto.nomoreparties.co/v1/plus-cohort-27/users/me", {
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      createProfile(result.name, result.avatar, result.about);
    })
    .catch((error) => {
      console.log(error);
    });
};

function renderLikes() {
  return a;
}

const setInitialCardsSet = () => {
  fetch("https://mesto.nomoreparties.co/v1/plus-cohort-27/cards", {
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const obj = Object.entries(result);
      for (let a in obj) {
        for (let b in obj[a]) {
          if (b > 0) {
            const cardSet = createCard(
              obj[a][b].name,
              obj[a][b].link,
              obj[a][b].likes.length,
              obj[a][b].owner.name,
              obj[a][b]._id,
            );
            renderCard(cardSet);
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

function changeProfileData(nameOfTheProfile, aboutYourselfInTheProfile) {
  fetch("https://nomoreparties.co/v1/plus-cohort-27/users/me", {
    method: "PATCH",
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameOfTheProfile,
      about: aboutYourselfInTheProfile,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      renderLoading(true);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally((item) => {
      setTimeout(() => {
        renderLoading(false);
      }, 1000);
    });
}

function changeProfileAvatar(profileAvatarUrl) {
  fetch("https://nomoreparties.co/v1/plus-cohort-27/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: profileAvatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      renderLoading(true);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally((item) => {
      setTimeout(() => {
        renderLoading(false);
      }, 1000);
    });
}

function addNewUserCard(nameOfTheCard, linkToTheCardImage) {
  fetch("https://nomoreparties.co/v1/plus-cohort-27/cards", {
    method: "POST",
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameOfTheCard,
      link: linkToTheCardImage,
    }),
  }).catch((error) => console.error(error));
}

function likeCard(cardId) {
  fetch(
    "https://nomoreparties.co/v1/plus-cohort-27/cards/likes/" + `${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      countLikes(result.likes.length);
    })
    .catch((error) => console.error(error));
}

function dislikeCard(cardId) {
  fetch(
    "https://nomoreparties.co/v1/plus-cohort-27/cards/likes/" + `${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      countLikes(result.likes.length);
    })
    .catch((error) => console.error(error));
}

function deleteCardFromServer(cardId) {
  fetch("https://nomoreparties.co/v1/plus-cohort-27/cards/" + `${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "08ca101b-72c0-46c7-a5af-c036f69dd465",
      "Content-Type": "application/json",
    },
  }).catch((error) => console.error(error));
}

export {
  setInitialProfile,
  setInitialCardsSet,
  changeProfileData,
  addNewUserCard,
  deleteCardFromServer,
  likeCard,
  dislikeCard,
  changeProfileAvatar,
};
