function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  //именно документ, все остальное не работает
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  //именно документ, все остальное не работает
  document.removeEventListener("keydown", closeByEsc);
}

export { closePopup, openPopup };
