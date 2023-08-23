export class Popup {
  constructor(selector) {
    this._selector = selector;
  }
  openPopup() {
    this._selector.classList.add("popup_opened");
    this.setEventListeners();
    this._renderLoading(false, this._selector.querySelector('.popup__submit-button'));
  }
  closePopup() {
    this._selector.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._selector.addEventListener("mousedown", (evt) => {
      //именно таргет, иначе закрывается и по клику на сам попап
      if (evt.target === this._selector) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
  _renderLoading(isLoading, buttonName) {
    if (isLoading) {
      buttonName.textContent = "Сохранение...";
    } else {
      buttonName.textContent = "Сохранить";
    }
  }
}
