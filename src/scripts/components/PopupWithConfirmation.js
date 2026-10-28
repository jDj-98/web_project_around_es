import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popUpSelector, confirmAction) {
    super(popUpSelector);
    this._confirmAction = confirmAction;
  }

  setEventListeners() {
    super.setEventListeners();

    const confirmButton = this._popUpSelector.querySelector(
      ".popup__button_delete",
    );
    confirmButton.addEventListener("click", () => this._confirmAction());
  }
}

export default PopupWithConfirmation;
