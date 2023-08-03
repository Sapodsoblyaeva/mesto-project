import { closePopup } from "./modal";

const popupEditorForm = document.querySelector(".editor-form");
const popupAddPlace = document.querySelector(".add-places");
const userPlaceForm = document.forms["place__adder"];
const profileSubmitButtons = Array.from(
  document.querySelectorAll(".popup__save-button")
);

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function renderLoading(isLoading) {
  if (isLoading) {
    profileSubmitButtons.forEach((item) => {
      item.textContent = "Сохранение...";
    });
  } else {
    profileSubmitButtons.forEach((item) => {
      item.textContent = "Сохранить";
    });
  }
}

function resetForm(formName) {
  formName.reset();
}

export {
  popupEditorForm,
  popupAddPlace,
  userPlaceForm,
  closeByEsc,
  renderLoading,
  resetForm,
};
