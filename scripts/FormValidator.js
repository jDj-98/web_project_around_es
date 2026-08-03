import { openModal, closeModal } from "./Utils.js";
import { showInputError, hideInputError, toggleButtonState,handleProfileFormSubmit, handleCardFormSubmit } from "./index.js";
class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  setEventListeners() {
    console.log("entra a setEventListeners");
    this._validateForm();
  }

  _validateForm() {
    //forEach que valida en tiempo real el input del popup de edición.
    console.log("entra a validateForm");
    this._selectors.inputs.forEach((input) => {
      console.log(this._selectors.inputs);
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          console.log("antes de showInputError");
          showInputError(input, input.validationMessage, this._form);
        } else {
          hideInputError(input, this._form);
        }
        toggleButtonState(this._selectors.inputs, this._selectors.submitButton);
      });
    });
  }

}
export default FormValidator;
