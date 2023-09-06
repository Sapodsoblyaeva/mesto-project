export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      //именно таргет, иначе закрывается и по клику на сам попап
      if (evt.target === this._popup) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
}
