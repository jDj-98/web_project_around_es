class Popup {
  constructor(popUpSelector) {
    this._popUpSelector = popUpSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUpSelector.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popUpSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openPopup = document.querySelector(".popup_is-opened");
      if (openPopup) {
        this.close();
      }
    }
  }

  setEventListeners() {
    this._popUpSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
    //Recorrer los popups para agregar un event listener que cierre el popup en cuestión al hacer click fuera del contenido del mismo
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.addEventListener("click", (evt) => {
        if (evt.target === popup) {
          this.close();
        }
      });
    });
  }
}

export default Popup;
