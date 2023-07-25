const popupEditorForm = document.querySelector(".editor-form");
const popupAddPlace = document.querySelector(".add-places");
const formElement = document.querySelector(".popup__form");
const userPlaceForm = document.querySelector(".add-places__form");

function addData(nameValue, occupationValue) {
  //добавить имя и занятие в профайл
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  profileName.textContent = nameValue;
  profileOccupation.textContent = occupationValue;
}

export { addData, popupEditorForm, popupAddPlace, formElement, userPlaceForm };
