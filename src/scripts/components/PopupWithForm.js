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

  setSubmitButtonText(text) {
    const submitButton = this._popUpSelector.querySelector(".popup__button");
    if (submitButton) {
      submitButton.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._popUpSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      const submitButton = this._popUpSelector.querySelector(".popup__button");
      const originalButtonText = submitButton?.textContent.trim() ?? "";

      this.setSubmitButtonText("Guardando...");
      Promise.resolve()
        .then(() => this._submitForm(values))
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        })
        .finally(() => {
          this.setSubmitButtonText(originalButtonText);
        });
    });

    const closeBtn = this._popUpSelector.querySelector(".popup__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.close();
      });
    }
  }

  close() {
    const form = this._popUpSelector.querySelector("form");
    if (form) form.reset();
    super.close();
  }
}

export default PopupWithForm;
