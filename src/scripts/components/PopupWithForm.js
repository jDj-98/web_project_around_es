import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popUpSelector, submitFormFunction) {
    super(popUpSelector);
    this._submitForm = submitFormFunction;
  }

  _getInputValues() {
    const formInputs = this._popUpSelector.querySelectorAll(".popup__input");
    const formValues = {};

    formInputs.forEach((input) => {
      const clave = input.name;
      formValues[clave] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popUpSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._submitForm(values);
    });

    const closeBtn = this._popUpSelector.querySelector(".popup__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.close();
      });
    }
  }

  close() {
    // Reset only the <form> inside the popup (if present), then close
    const form = this._popUpSelector.querySelector("form");
    if (form) form.reset();
    super.close();
  }
}

export default PopupWithForm;
